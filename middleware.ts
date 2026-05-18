import { createServerClient } from '@supabase/ssr';
import { NextResponse, type NextRequest } from 'next/server';

const ADMIN_EMAILS = (process.env.ADMIN_EMAILS || '')
  .split(',')
  .map((e) => e.trim().toLowerCase())
  .filter(Boolean);

const LOGIN_PATH = '/admin/login';

export async function middleware(request: NextRequest) {
  let response = NextResponse.next({ request });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value),
          );
          response = NextResponse.next({ request });
          cookiesToSet.forEach(({ name, value, options }) =>
            response.cookies.set(name, value, options),
          );
        },
      },
    },
  );

  // IMPORTANT: getUser() revalidates the token with Supabase — do not trust getSession() alone here.
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { pathname } = request.nextUrl;
  const isLoginPage = pathname === LOGIN_PATH;
  const emailAllowed = !!user && ADMIN_EMAILS.includes((user.email || '').toLowerCase());

  // Logged-in + allowed user hitting the login page → send to dashboard.
  if (isLoginPage && emailAllowed) {
    return NextResponse.redirect(new URL('/admin/dashboard', request.url));
  }

  if (isLoginPage) {
    return response;
  }

  // Not logged in → bounce to login.
  if (!user) {
    const url = new URL(LOGIN_PATH, request.url);
    return NextResponse.redirect(url);
  }

  // Logged in but not on the allowlist → kill the session, explain why.
  if (!emailAllowed) {
    await supabase.auth.signOut();
    const url = new URL(LOGIN_PATH, request.url);
    url.searchParams.set('error', 'no-access');
    return NextResponse.redirect(url);
  }

  return response;
}

export const config = {
  matcher: ['/admin/:path*'],
};
