import { NextResponse, type NextRequest } from 'next/server';
import { getServerSupabase, isAllowedAdmin } from '@/lib/supabase-server';

// Magic-link landing point: exchanges the PKCE code for a session cookie.
export async function GET(request: NextRequest) {
  const { searchParams, origin } = request.nextUrl;
  const code = searchParams.get('code');
  const next = searchParams.get('next') || '/admin/dashboard';

  if (!code) {
    return NextResponse.redirect(`${origin}/admin/login?error=invalid-link`);
  }

  const supabase = await getServerSupabase();
  const { data, error } = await supabase.auth.exchangeCodeForSession(code);

  if (error || !data.user) {
    return NextResponse.redirect(`${origin}/admin/login?error=invalid-link`);
  }

  if (!isAllowedAdmin(data.user.email)) {
    await supabase.auth.signOut();
    return NextResponse.redirect(`${origin}/admin/login?error=no-access`);
  }

  return NextResponse.redirect(`${origin}${next}`);
}
