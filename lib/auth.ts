import { supabase } from './supabase';

export async function signInWithMagicLink(email: string) {
  const origin =
    typeof window !== 'undefined'
      ? window.location.origin
      : process.env.NEXT_PUBLIC_SITE_URL;

  const { error } = await supabase.auth.signInWithOtp({
    email,
    options: {
      // Only existing (pre-invited) users can receive a link — no open signups.
      shouldCreateUser: false,
      emailRedirectTo: `${origin}/auth/callback?next=/admin/dashboard`,
    },
  });
  return { error };
}

export async function signOut() {
  return supabase.auth.signOut();
}

export async function getCurrentUser() {
  const {
    data: { user },
  } = await supabase.auth.getUser();
  return user;
}

export async function getSession() {
  const {
    data: { session },
  } = await supabase.auth.getSession();
  return session;
}
