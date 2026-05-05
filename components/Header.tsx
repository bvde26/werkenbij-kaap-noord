'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-blue-900 text-white shadow">
      <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="text-2xl font-bold">
          Kaap Noord
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex gap-8">
          <Link href="/vacatures" className="hover:text-blue-200">
            Vacatures
          </Link>
          <Link href="/over-ons" className="hover:text-blue-200">
            Over ons
          </Link>
          <Link href="/faq" className="hover:text-blue-200">
            FAQ
          </Link>
          <Link href="/contact" className="hover:text-blue-200">
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
        <nav className="md:hidden bg-blue-800 px-4 py-4 space-y-2">
          <Link href="/vacatures" className="block hover:text-blue-200">
            Vacatures
          </Link>
          <Link href="/over-ons" className="block hover:text-blue-200">
            Over ons
          </Link>
          <Link href="/faq" className="block hover:text-blue-200">
            FAQ
          </Link>
          <Link href="/contact" className="block hover:text-blue-200">
            Contact
          </Link>
        </nav>
      )}
    </header>
  );
}
