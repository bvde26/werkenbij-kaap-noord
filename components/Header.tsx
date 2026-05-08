'use client';
import { useState } from 'react';
import Link from 'next/link';

const MENU_LINKS = [
  { href: '/', label: 'Alle vacatures' },
  { href: '/over-ons', label: 'Over ons' },
  { href: '/faq', label: 'FAQ' },
  { href: '/contact', label: 'Contact' },
];

export default function Header({ active = '' }: { active?: string }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <style>{`
        .header-cta {
          font-family: 'Pana Summer', serif;
          font-size: 18px;
          color: #3b696d;
          text-decoration: none;
          padding: 5px 20px;
          min-height: 39px;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='186' height='40' viewBox='0 0 186 40' fill='none'%3E%3Cpath d='M0 0H186L185.177 2.20389C182.193 10.1992 181.544 18.8782 183.306 27.2285L186 40H0V0Z' fill='%23FCF8BD'/%3E%3C%2Fsvg%3E");
          background-size: auto 100%;
          background-repeat: no-repeat;
          background-position: right top;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          margin-right: 12px;
        }
        .hamburger-btn {
          position: fixed;
          right: 20px;
          top: 30px;
          transform: translateY(-50%);
          z-index: 250;
          background: none;
          border: none;
          cursor: pointer;
          width: 28px;
          height: 28px;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 0;
        }
        @media (min-width: 768px) {
          .hamburger-btn { top: 40px; }
        }
        .nav-overlay {
          position: fixed;
          inset: 0;
          z-index: 150;
          background: #bdeffc;
          padding-top: 60px;
          padding-left: 20px;
          padding-right: 20px;
          overflow-y: auto;
          opacity: 0;
          pointer-events: none;
          transition: opacity 0.3s ease-in-out;
        }
        @media (min-width: 768px) {
          .nav-overlay { padding-top: 80px; }
        }
        .nav-overlay.open {
          opacity: 1;
          pointer-events: all;
        }
        .nav-link {
          font-family: 'Pana Summer', serif;
          font-size: 32px;
          line-height: 48px;
          color: #3b696d;
          text-decoration: none;
          display: inline-flex;
          align-items: center;
          gap: 8px;
        }
        .nav-link::after {
          content: '›';
          font-size: 32px;
          line-height: 1;
        }
        .nav-link-item {
          opacity: 0;
          transform: translateY(16px);
          transition: opacity 0.35s ease, transform 0.35s ease;
        }
        .nav-overlay.open .nav-link-item {
          opacity: 1;
          transform: translateY(0);
        }
        .nav-overlay.open .nav-link-item:nth-child(1) { transition-delay: 0.08s; }
        .nav-overlay.open .nav-link-item:nth-child(2) { transition-delay: 0.15s; }
        .nav-overlay.open .nav-link-item:nth-child(3) { transition-delay: 0.22s; }
        .nav-overlay.open .nav-link-item:nth-child(4) { transition-delay: 0.29s; }
      `}</style>

      {/* Header bar — z-[200] zodat het boven de overlay (z-150) blijft */}
      <header className="sticky top-0 z-[200]" style={{ backgroundColor: '#bdeffc' }}>
        <div className="px-5 h-[60px] md:h-[80px] flex items-center">
          <Link href="/" className="mr-auto hover:opacity-80 transition-opacity">
            <img src="/logo.svg" alt="Kaap Noord" className="h-[40px] md:h-[50px] w-auto" />
          </Link>
          <Link href="/contact" className="header-cta">
            Ik wil solliciteren
          </Link>
        </div>
      </header>

      {/* Hamburger — fixed boven alles */}
      <button
        className="hamburger-btn"
        onClick={() => setOpen(!open)}
        aria-label={open ? 'Menu sluiten' : 'Menu openen'}
        aria-expanded={open}
      >
        {open ? (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#3b696d" strokeWidth="2.5" strokeLinecap="round">
            <path d="M18 6L6 18M6 6l12 12" />
          </svg>
        ) : (
          <svg width="28" height="22" viewBox="0 0 28 22" fill="none" stroke="#3b696d" strokeWidth="2.5" strokeLinecap="round">
            <line x1="0" y1="2" x2="28" y2="2" />
            <line x1="0" y1="11" x2="28" y2="11" />
            <line x1="0" y1="20" x2="28" y2="20" />
          </svg>
        )}
      </button>

      {/* Volledig scherm overlay nav */}
      <nav className={`nav-overlay${open ? ' open' : ''}`} aria-hidden={!open}>
        <ul style={{ listStyle: 'none', margin: 0, padding: 0, paddingTop: '40px' }}>
          {MENU_LINKS.map((link) => (
            <li key={link.href} className="nav-link-item" style={{ marginBottom: '10px' }}>
              <Link
                href={link.href}
                className="nav-link"
                onClick={() => setOpen(false)}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </>
  );
}
