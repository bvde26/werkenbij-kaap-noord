'use client';

import Link from 'next/link';

const tiles = [
  {
    href: '/admin/vacatures',
    label: 'Vacatures',
    description: 'Functies toevoegen, bewerken en publiceren',
    icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#3b696d" strokeWidth="2" strokeLinecap="round"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 3H8a2 2 0 0 0-2 2v2h12V5a2 2 0 0 0-2-2z"/></svg>,
  },
  {
    href: '/admin/faq',
    label: 'FAQ',
    description: 'Veelgestelde vragen beheren en herordenen',
    icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#3b696d" strokeWidth="2" strokeLinecap="round"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><circle cx="12" cy="17" r="0.5" fill="#3b696d"/></svg>,
  },
  {
    href: '/admin/content',
    label: 'Pagina-inhoud',
    description: 'Koppen en teksten per pagina aanpassen',
    icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#3b696d" strokeWidth="2" strokeLinecap="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>,
  },
  {
    href: '/admin/media',
    label: "Foto's",
    description: "Afbeeldingen uploaden en beheren per pagina",
    icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#3b696d" strokeWidth="2" strokeLinecap="round"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><path d="M21 15l-5-5L5 21"/></svg>,
  },
];

export default function AdminDashboard() {
  return (
    <div className="min-h-screen p-8" style={{ backgroundColor: '#f7faf9' }}>
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-1" style={{ color: '#3b696d', fontFamily: "'Kodchasan', sans-serif" }}>Admin</h1>
        <p className="text-sm mb-10" style={{ color: '#6b7280' }}>Kaap Noord — beheer</p>
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
