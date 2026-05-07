'use client';

import Link from 'next/link';

export default function AdminDashboard() {
  return (
    <div className="min-h-screen p-8" style={{ backgroundColor: '#f7faf9' }}>
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-1" style={{ color: '#3b696d', fontFamily: "'Kodchasan', sans-serif" }}>
          Admin
        </h1>
        <p className="text-sm mb-10" style={{ color: '#6b7280' }}>Kaap Noord — beheer</p>

        <div className="grid sm:grid-cols-2 gap-4">
          <Link href="/admin/vacatures"
            className="block p-6 rounded-xl bg-white border-2 hover:border-[#3b696d] transition-colors"
            style={{ borderColor: '#bdeffc' }}>
            <div className="w-10 h-10 rounded-full flex items-center justify-center mb-4" style={{ backgroundColor: '#bdeffc' }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#3b696d" strokeWidth="2" strokeLinecap="round">
                <rect x="2" y="7" width="20" height="14" rx="2" />
                <path d="M16 3H8a2 2 0 0 0-2 2v2h12V5a2 2 0 0 0-2-2z" />
              </svg>
            </div>
            <h2 className="font-bold text-base mb-1" style={{ color: '#3b696d', fontFamily: "'Kodchasan', sans-serif" }}>
              Vacatures
            </h2>
            <p className="text-sm" style={{ color: '#6b7280' }}>
              Functies toevoegen, bewerken en publiceren
            </p>
          </Link>
        </div>
      </div>
    </div>
  );
}
