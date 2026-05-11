'use client';
import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';

const MENU_LINKS = [
  { href: '/#vacatures', label: 'Alle vacatures' },
  { href: '/over-ons', label: 'Over ons' },
  { href: '/faq', label: 'FAQ' },
  { href: '/contact', label: 'Contact' },
];

export default function Header({ active = '' }: { active?: string }) {
  const [open, setOpen] = useState(false);
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const nav = navRef.current;
    if (!nav) return;
    if (open) {
      nav.removeAttribute('inert');
    } else {
      nav.setAttribute('inert', '');
    }
  }, [open]);

  return (
    <>
      <style>{`
        .hamburger-btn {
          background: transparent !important;
          border: none !important;
          box-shadow: none !important;
          cursor: pointer;
          width: 28px;
          height: 28px;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 0;
          flex-shrink: 0;
        }
        .hamburger-btn:focus-visible {
          outline: 2px solid #3b696d;
          outline-offset: 3px;
          border-radius: 4px;
        }
        .hamburger-btn:active {
          transform: scale(0.88);
          transition: transform 100ms ease-out;
        }
        .nav-backdrop {
          position: fixed;
          inset: 0;
          z-index: 140;
          background: rgba(0,0,0,0.25);
          opacity: 0;
          pointer-events: none;
          transition: opacity 0.25s ease;
        }
        .nav-backdrop.open {
          opacity: 1;
          pointer-events: all;
        }
        .nav-panel {
          position: fixed;
          top: 0;
          right: 0;
          bottom: 0;
          width: 78%;
          max-width: 300px;
          z-index: 150;
          background: #bdeffc;
          padding: 24px 28px 40px;
          transform: translateX(100%);
          transition: transform 0.32s cubic-bezier(0.23, 1, 0.32, 1);
          overflow-y: auto;
          display: flex;
          flex-direction: column;
        }
        .nav-panel.open {
          transform: translateX(0);
        }
        .nav-link {
          font-family: 'Pana Summer', serif;
          font-size: 30px;
          line-height: 1.4;
          color: #3b696d;
          text-decoration: none;
          display: inline-flex;
          align-items: center;
          gap: 8px;
        }
        .nav-link::after {
          content: '›';
          font-size: 30px;
          line-height: 1;
        }
        .nav-link-item {
          opacity: 0;
          transform: translateX(20px);
          transition: opacity 0.28s ease-out, transform 0.28s cubic-bezier(0.23, 1, 0.32, 1);
        }
        .nav-panel.open .nav-link-item {
          opacity: 1;
          transform: translateX(0);
        }
        .nav-panel.open .nav-link-item:nth-child(1) { transition-delay: 0.08s; }
        .nav-panel.open .nav-link-item:nth-child(2) { transition-delay: 0.13s; }
        .nav-panel.open .nav-link-item:nth-child(3) { transition-delay: 0.18s; }
        .nav-panel.open .nav-link-item:nth-child(4) { transition-delay: 0.23s; }
        .nav-social-item {
          opacity: 0;
          transform: translateX(20px);
          transition: opacity 0.28s ease-out, transform 0.28s cubic-bezier(0.23, 1, 0.32, 1);
          transition-delay: 0.30s;
        }
        .nav-panel.open .nav-social-item { opacity: 1; transform: translateX(0); }
        .nav-social-btn {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 10px 16px;
          border-radius: 999px;
          border: 1.5px solid rgba(59,105,109,0.35);
          color: #3b696d;
          font-family: 'Kodchasan', sans-serif;
          font-size: 14px;
          font-weight: 600;
          text-decoration: none;
          transition: background-color 0.18s ease, border-color 0.18s ease;
          background: transparent;
        }
        .nav-social-btn:hover { background: rgba(59,105,109,0.08); border-color: #3b696d; }
        @media (prefers-reduced-motion: reduce) {
          .nav-panel { transition: none; }
          .nav-backdrop { transition: none; }
          .nav-link-item { transition: none; opacity: 1; transform: none; }
        }
      `}</style>

      {/* Header bar */}
      <header className="sticky top-0 z-[200]" style={{ backgroundColor: '#bdeffc' }}>
        <div className="px-5 h-[48px] md:h-[64px] flex items-center">
          <Link href="/" className="mr-auto hover:opacity-80 transition-opacity" style={{ display: 'flex', alignItems: 'center', gap: '10px', textDecoration: 'none' }}>
            <img src="/logo-header.svg" alt="" className="h-[30px] md:h-[40px] w-auto" aria-hidden="true" />
            <span style={{ fontFamily: "'Pana Summer', serif", fontWeight: 400, fontSize: 'clamp(1rem, 3vw, 1.35rem)', color: '#3b696d', letterSpacing: '0.04em', lineHeight: 1 }}>
              Kaap Noord
            </span>
          </Link>
          <button
            className="hamburger-btn"
            onClick={() => setOpen(!open)}
            aria-label={open ? 'Menu sluiten' : 'Menu openen'}
            aria-expanded={open}
            aria-controls="nav-panel"
          >
            {open ? (
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#3b696d" strokeWidth="2.5" strokeLinecap="round" aria-hidden="true">
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            ) : (
              <svg width="28" height="22" viewBox="0 0 28 22" fill="none" stroke="#3b696d" strokeWidth="2.5" strokeLinecap="round" aria-hidden="true">
                <line x1="0" y1="2" x2="28" y2="2" />
                <line x1="0" y1="11" x2="28" y2="11" />
                <line x1="0" y1="20" x2="28" y2="20" />
              </svg>
            )}
          </button>
        </div>
      </header>

      {/* Backdrop */}
      <div className={`nav-backdrop${open ? ' open' : ''}`} onClick={() => setOpen(false)} aria-hidden="true" />

      {/* Slide-in panel */}
      <nav
        id="nav-panel"
        ref={navRef}
        className={`nav-panel${open ? ' open' : ''}`}
        aria-hidden={!open}
      >
        <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '40px' }}>
          <button className="hamburger-btn" onClick={() => setOpen(false)} aria-label="Menu sluiten">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#3b696d" strokeWidth="2.5" strokeLinecap="round" aria-hidden="true">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
        </div>
        <ul style={{ listStyle: 'none', margin: 0, padding: 0, flex: 1 }}>
          {MENU_LINKS.map((link) => (
            <li key={link.href} className="nav-link-item" style={{ marginBottom: '16px' }}>
              <Link
                href={link.href}
                className="nav-link"
                onClick={(e) => {
                  setOpen(false);
                  if (link.href === '/#vacatures' && typeof window !== 'undefined' && window.location.pathname === '/') {
                    e.preventDefault();
                    setTimeout(() => {
                      document.getElementById('vacatures')?.scrollIntoView({ behavior: 'smooth' });
                    }, 350);
                  }
                }}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Sociale links */}
        <div className="nav-social-item" style={{ borderTop: '1px solid rgba(59,105,109,0.2)', paddingTop: '20px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <a
            href="https://www.instagram.com/kaapnoord_texel"
            target="_blank"
            rel="noopener noreferrer"
            className="nav-social-btn"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
              <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
              <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
            </svg>
            Instagram
          </a>
          <a
            href="https://strandpaviljoenkaapnoord.nl"
            target="_blank"
            rel="noopener noreferrer"
            className="nav-social-btn"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <circle cx="12" cy="12" r="10"/>
              <line x1="2" y1="12" x2="22" y2="12"/>
              <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
            </svg>
            Kaap Noord
          </a>
        </div>
      </nav>
    </>
  );
}
