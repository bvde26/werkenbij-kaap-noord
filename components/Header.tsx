'use client';
import { useState } from 'react';
import Link from 'next/link';

export default function Header({ active = '' }: { active?: string }) {
  const [open, setOpen] = useState(false);

  const links = [
    { href: '/rollen', label: 'Functies' },
    { href: '/over-ons', label: 'Over ons' },
    { href: '/voor-jou', label: 'Voordelen' },
    { href: '/faq', label: 'FAQ' },
  ];

  return (
    <header className="sticky top-0 z-40" style={{ backgroundColor: '#bdeffc' }}>
      <div className="max-w-6xl mx-auto px-4 h-[70px] flex justify-between items-center">
        <Link href="/" className="hover:opacity-80 transition-opacity">
          <img src="/logo.svg" alt="Kaap Noord" style={{ height: '42px' }} />
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="text-sm font-semibold transition-opacity hover:opacity-70"
              style={{
                color: '#3b696d',
                borderBottom: active === l.href ? '2px solid #3b696d' : 'none',
                paddingBottom: active === l.href ? '2px' : '0',
              }}
            >
              {l.label}
            </Link>
          ))}
          <Link
            href="/contact"
            className="text-sm font-bold text-white px-5 py-2 transition-opacity hover:opacity-80"
            style={{ backgroundColor: '#3b696d' }}
          >
            Kom meelopen
          </Link>
        </nav>

        {/* Mobile hamburger */}
        <button
          className="md:hidden p-2"
          style={{ color: '#3b696d' }}
          onClick={() => setOpen(!open)}
          aria-label="Menu openen"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            {open ? (
              <path d="M18 6L6 18M6 6l12 12" />
            ) : (
              <>
                <line x1="3" y1="6" x2="21" y2="6" />
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="18" x2="21" y2="18" />
              </>
            )}
          </svg>
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden absolute top-full left-0 right-0 shadow-lg z-50" style={{ backgroundColor: '#bdeffc' }}>
          <div className="flex flex-col p-5 gap-4" style={{ color: '#3b696d' }}>
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="font-semibold text-base"
              >
                {l.label}
              </Link>
            ))}
            <Link
              href="/contact"
              onClick={() => setOpen(false)}
              className="font-bold text-white text-center py-3 mt-2"
              style={{ backgroundColor: '#3b696d' }}
            >
              Kom meelopen
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
