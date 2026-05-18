'use client';

import { useEffect, useState } from 'react';
import { signInWithMagicLink } from '@/lib/auth';

const ERROR_MESSAGES: Record<string, string> = {
  'no-access': 'Dit e-mailadres heeft geen toegang tot het beheer.',
  'invalid-link': 'Deze loginlink is ongeldig of verlopen. Vraag een nieuwe aan.',
};

export default function AdminLogin() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const code = params.get('error');
    if (code && ERROR_MESSAGES[code]) setError(ERROR_MESSAGES[code]);
  }, []);

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setMessage('');

    const { error: signInError } = await signInWithMagicLink(email.trim());

    // Neutral response: never reveal whether an address has access (no user enumeration).
    if (signInError && /rate|limit|too many/i.test(signInError.message)) {
      setError('Te veel pogingen. Wacht even en probeer opnieuw.');
    } else {
      setMessage(
        'Als dit e-mailadres toegang heeft, is er een loginlink gestuurd. Check je inbox.',
      );
      setEmail('');
    }
    setLoading(false);
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center p-4"
      style={{ backgroundColor: '#f7faf9' }}
    >
      <div
        className="w-full max-w-md p-8 bg-white rounded-xl border-2"
        style={{ borderColor: '#bdeffc' }}
      >
        <h1
          className="text-2xl font-bold mb-1 text-center"
          style={{ color: '#3b696d', fontFamily: "'Kodchasan', sans-serif" }}
        >
          Beheer Kaap Noord
        </h1>
        <p className="text-sm mb-6 text-center" style={{ color: '#6b7280' }}>
          Log in met je e-mailadres
        </p>

        <form onSubmit={handleSignIn} className="space-y-4">
          <div>
            <label
              className="block text-sm font-medium mb-2"
              style={{ color: '#3b696d' }}
            >
              E-mailadres
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="jij@voorbeeld.nl"
              required
              autoComplete="email"
              className="w-full px-4 py-2 border rounded-lg outline-none focus:ring-2"
              style={{ borderColor: '#bdeffc' }}
            />
          </div>

          {error && (
            <div className="p-4 bg-red-50 text-red-700 rounded-lg text-sm">
              {error}
            </div>
          )}

          {message && (
            <div className="p-4 bg-green-50 text-green-700 rounded-lg text-sm">
              {message}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2 px-4 font-medium transition-colors disabled:opacity-60"
            style={{ backgroundColor: '#3b696d', color: '#ffffff', borderRadius: '8px', border: 'none' }}
          >
            {loading ? 'Versturen…' : 'Stuur loginlink'}
          </button>
        </form>

        <p className="text-center text-sm mt-6" style={{ color: '#6b7280' }}>
          Je ontvangt een eenmalige loginlink per e-mail — geen wachtwoord nodig.
        </p>
      </div>
    </div>
  );
}
