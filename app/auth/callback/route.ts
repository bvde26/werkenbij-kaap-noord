import { NextResponse, type NextRequest } from 'next/server';
import type { EmailOtpType } from '@supabase/supabase-js';
import { getServerSupabase, isAllowedAdmin } from '@/lib/supabase-server';

// Magic-link landing point. Supports two flows:
//  - token_hash + type  → verifyOtp (no PKCE cookie needed, works cross-device)
//  - code               → exchangeCodeForSession (PKCE fallback)
export async function GET(request: NextRequest) {
  const { searchParams, origin } = request.nextUrl;
  const next = searchParams.get('next') || '/admin/dashboard';
  const tokenHash = searchParams.get('token_hash');
  const type = searchParams.get('type') as EmailOtpType | null;
  const code = searchParams.get('code');

  const supabase = await getServerSupabase();

  let email: string | null | undefined;
  let failed = false;

  if (tokenHash && type) {
    const { data, error } = await supabase.auth.verifyOtp({
      type,
      token_hash: tokenHash,
    });
    if (error || !data.user) failed = true;
    else email = data.user.email;
  } else if (code) {
    const { data, error } = await supabase.auth.exchangeCodeForSession(code);
    if (error || !data.user) failed = true;
    else email = data.user.email;
  } else {
    failed = true;
  }

  if (failed) {
    return NextResponse.redirect(`${origin}/admin/login?error=invalid-link`);
  }

  if (!isAllowedAdmin(email)) {
    await supabase.auth.signOut();
    return NextResponse.redirect(`${origin}/admin/login?error=no-access`);
  }

  return NextResponse.redirect(`${origin}${next}`);
}
