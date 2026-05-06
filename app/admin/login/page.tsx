'use client';

import { useState } from 'react';

export default function AdminLogin() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setMessage('');

    try {
      const { supabase } = await import('@/lib/supabase');
      const { error: signInError } = await supabase.auth.signInWithOtp({
        email,
        options: {
          emailRedirectTo: `${window.location.origin}/admin/dashboard`,
        },
      });

      if (signInError) {
        setError(signInError.message);
      } else {
        setMessage(`✅ Check je email! Link naar dashboard is verstuurd naar ${email}`);
        setEmail('');
      }
    } catch (err) {
      setError('Er is een fout opgetreden. Probeer opnieuw.');
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow">
        <h1 className="text-2xl font-bold mb-6 text-center">Admin Login</h1>

        <form onSubmit={handleSignIn} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="je-email@example.com"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          {error && (
            <div className="p-4 bg-red-50 text-red-700 rounded text-sm">
              {error}
            </div>
          )}

          {message && (
            <div className="p-4 bg-green-50 text-green-700 rounded text-sm">
              {message}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2 px-4 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:bg-gray-400"
          >
            {loading ? 'Sending...' : 'Sign in with Magic Link'}
          </button>
        </form>

        <p className="text-center text-gray-500 text-sm mt-6">
          We sturen je een loginlink per email (geen wachtwoord nodig)
        </p>
      </div>
    </div>
  );
}
