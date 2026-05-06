import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="py-12 text-white" style={{ backgroundColor: '#2a4a4d' }}>
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          <div>
            <h4 className="font-bold mb-3 text-lg">Kaap Noord</h4>
            <p className="text-gray-300 text-sm">Strandpaviljoen Kaap Noord</p>
            <p className="text-gray-300 text-sm">Volharding 4, De Cocksdorp</p>
            <p className="text-gray-300 text-sm">1795 LH, Texel</p>
          </div>
          <div>
            <h4 className="font-bold mb-3 text-lg">Contact</h4>
            <a href="tel:+31623823324" className="block text-gray-300 text-sm mb-1 hover:text-white">
              📞 06-23823324 (Marije)
            </a>
            <a href="mailto:vacatures@strandpaviljoenkaapnoord.nl" className="block text-gray-300 text-sm hover:text-white break-all">
              ✉️ vacatures@strandpaviljoenkaapnoord.nl
            </a>
          </div>
          <div>
            <h4 className="font-bold mb-3 text-lg">Snel naar</h4>
            <div className="flex flex-col gap-2">
              <Link href="/rollen" className="text-gray-300 text-sm hover:text-white">Functies & Rollen</Link>
              <Link href="/over-ons" className="text-gray-300 text-sm hover:text-white">Over ons</Link>
              <Link href="/voor-jou" className="text-gray-300 text-sm hover:text-white">Voordelen</Link>
              <Link href="/faq" className="text-gray-300 text-sm hover:text-white">FAQ</Link>
              <Link href="/contact" className="text-gray-300 text-sm hover:text-white">Contact</Link>
            </div>
          </div>
        </div>
        <div className="border-t border-gray-600 pt-6 text-center">
          <p className="text-gray-400 text-sm">© 2026 Strandpaviljoen Kaap Noord — Texel</p>
        </div>
      </div>
    </footer>
  );
}
