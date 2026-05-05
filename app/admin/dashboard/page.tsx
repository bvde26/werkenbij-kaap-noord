'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { useRouter } from 'next/navigation';

export default function AdminDashboard() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        router.push('/admin/login');
      } else {
        setUser(user);
      }
      setLoading(false);
    };

    checkAuth();
  }, [router]);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.push('/admin/login');
  };

  if (loading) return <div className="p-8">Loading...</div>;

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow">
        <div className="max-w-6xl mx-auto px-4 py-6 flex justify-between items-center">
          <h1 className="text-2xl font-bold">Admin Dashboard</h1>
          <div className="flex items-center gap-4">
            <span className="text-gray-600">{user?.email}</span>
            <button
              onClick={handleSignOut}
              className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
            >
              Sign Out
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white p-6 rounded shadow">
            <h2 className="font-bold text-lg mb-2">Vacatures</h2>
            <p className="text-4xl font-bold text-blue-600">0</p>
            <a href="/admin/vacatures" className="text-blue-600 text-sm mt-2">Manage →</a>
          </div>
          <div className="bg-white p-6 rounded shadow">
            <h2 className="font-bold text-lg mb-2">Applicants (Meeloop)</h2>
            <p className="text-4xl font-bold text-green-600">0</p>
            <a href="/admin/inzendingen" className="text-blue-600 text-sm mt-2">View →</a>
          </div>
          <div className="bg-white p-6 rounded shadow">
            <h2 className="font-bold text-lg mb-2">Applicants (Formal)</h2>
            <p className="text-4xl font-bold text-purple-600">0</p>
            <a href="/admin/inzendingen" className="text-blue-600 text-sm mt-2">View →</a>
          </div>
        </div>

        <div className="bg-blue-50 border border-blue-200 p-6 rounded">
          <h3 className="font-bold text-blue-900 mb-2">✨ Phase 1 Complete!</h3>
          <p className="text-blue-800 text-sm">
            Tech setup is ready. Next: Website rebuild (Fase 2)
          </p>
        </div>
      </main>
    </div>
  );
}
