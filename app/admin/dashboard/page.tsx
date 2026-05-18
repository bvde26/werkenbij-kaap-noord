'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { signOut } from '@/lib/auth';

const tiles = [
  {
    href: '/admin/landingspagina',
    label: 'Landingspagina',
    description: 'Hero tekst, intro tekst en CTA beheren',
    icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#3b696d" strokeWidth="2" strokeLinecap="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>,
  },
  {
    href: '/admin/vacatures',
    label: 'Vacatures',
    description: 'Functies toevoegen, bewerken en publiceren',
    icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#3b696d" strokeWidth="2" strokeLinecap="round"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 3H8a2 2 0 0 0-2 2v2h12V5a2 2 0 0 0-2-2z"/></svg>,
  },
  {
    href: '/admin/usps',
    label: 'Waarom Kaap Noord',
    description: '"Waarom Kaap Noord?" lijst beheren op de homepage',
    icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#3b696d" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="m9 12 2 2 4-4"/></svg>,
  },
  {
    href: '/admin/media',
    label: "Foto's",
    description: 'Afbeeldingen uploaden en beheren per pagina',
    icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#3b696d" strokeWidth="2" strokeLinecap="round"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><path d="M21 15l-5-5L5 21"/></svg>,
  },
  {
    href: '/admin/over-ons-content',
    label: 'Over ons',
    description: 'Pagina kop en tekst blokken beheren',
    icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#3b696d" strokeWidth="2" strokeLinecap="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>,
  },
  {
    href: '/admin/voordelen',
    label: 'Voordelen',
    description: '"Werken bij ons" lijst beheren op de Over ons pagina',
    icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#3b696d" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>,
  },
  {
    href: '/admin/faq',
    label: 'FAQ',
    description: 'Veelgestelde vragen beheren en herordenen',
    icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#3b696d" strokeWidth="2" strokeLinecap="round"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><circle cx="12" cy="17" r="0.5" fill="#3b696d"/></svg>,
  },
];

export default function AdminDashboard() {
  const router = useRouter();

  const handleLogout = async () => {
    await signOut();
    router.replace('/admin/login');
  };

  return (
    <div className="min-h-screen p-4 sm:p-8" style={{ backgroundColor: '#f7faf9' }}>
      <div className="max-w-4xl mx-auto">
        <div className="flex items-start justify-between mb-10">
          <div>
            <h1 className="text-3xl font-bold mb-1" style={{ color: '#3b696d', fontFamily: "'Kodchasan', sans-serif" }}>Admin</h1>
            <p className="text-sm" style={{ color: '#6b7280' }}>Kaap Noord — beheer</p>
          </div>
          <button
            onClick={handleLogout}
            className="text-sm px-4 py-2 rounded-lg border-2 transition-colors hover:bg-white"
            style={{ borderColor: '#bdeffc', color: '#3b696d' }}
          >
            Uitloggen
          </button>
        </div>
        <div className="grid sm:grid-cols-2 gap-4">
          {tiles.map((tile) => (
            <Link key={tile.href} href={tile.href}
              className="block p-6 rounded-xl bg-white border-2 hover:border-[#3b696d] transition-colors"
              style={{ borderColor: '#bdeffc' }}>
              <div className="w-10 h-10 rounded-full flex items-center justify-center mb-4" style={{ backgroundColor: '#bdeffc' }}>
                {tile.icon}
              </div>
              <h2 className="font-bold text-base mb-1" style={{ color: '#3b696d', fontFamily: "'Kodchasan', sans-serif" }}>{tile.label}</h2>
              <p className="text-sm" style={{ color: '#6b7280' }}>{tile.description}</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
