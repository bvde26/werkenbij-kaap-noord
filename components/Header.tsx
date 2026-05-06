'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 shadow" style={{ backgroundColor: '#bdeffc', color: '#3b696d' }}>
      <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="text-2xl font-bold" style={{ color: '#3b696d' }}>
          Kaap Noord
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex gap-8">
          <Link href="/vacatures" className="hover:opacity-70" style={{ color: '#3b696d' }}>
            Vacatures
          </Link>
          <Link href="/over-ons" className="hover:opacity-70" style={{ color: '#3b696d' }}>
            Over ons
          </Link>
          <Link href="/faq" className="hover:opacity-70" style={{ color: '#3b696d' }}>
            FAQ
          </Link>
          <Link href="/contact" className="hover:opacity-70" style={{ color: '#3b696d' }}>
            Contact
          </Link>
        </nav>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden p-2"
        >
          ☰
        </button>
      </div>

      {/* Mobile Nav */}
      {menuOpen && (
        <nav className="md:hidden px-4 py-4 space-y-2" style={{ backgroundColor: '#9dd8e0', color: '#3b696d' }}>
          <Link href="/vacatures" className="block hover:opacity-70" style={{ color: '#3b696d' }}>
            Vacatures
          </Link>
          <Link href="/over-ons" className="block hover:opacity-70" style={{ color: '#3b696d' }}>
            Over ons
          </Link>
          <Link href="/faq" className="block hover:opacity-70" style={{ color: '#3b696d' }}>
            FAQ
          </Link>
          <Link href="/contact" className="block hover:opacity-70" style={{ color: '#3b696d' }}>
            Contact
          </Link>
        </nav>
      )}
    </header>
  );
}
