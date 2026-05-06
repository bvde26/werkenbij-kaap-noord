'use client';

export default function Home() {
  const whatsappNumber = '31623823324'; // 06-23823324 in international format
  const whatsappMessage = encodeURIComponent(
    'Hoi! Ik wil graag een dagje meelopen bij Kaap Noord! Kan ik binnenkort langskomen?'
  );
  const whatsappLink = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`;

  return (
    <div className="min-h-screen bg-white">
      {/* FLOATING WHATSAPP BUTTON */}
      <a
        href={whatsappLink}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 w-16 h-16 rounded-full flex items-center justify-center text-3xl hover:scale-110 transition-transform shadow-lg"
        style={{ backgroundColor: '#25D366' }}
        title="Stuur WhatsApp"
      >
        💬
      </a>

      {/* HEADER */}
      <header className="sticky top-0 z-40 shadow" style={{ backgroundColor: '#bdeffc', color: '#3b696d' }}>
        <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
          <div className="text-2xl font-bold" style={{ color: '#3b696d' }}>
            Kaap Noord
          </div>
          <nav className="hidden md:flex gap-8">
            <a href="#" className="hover:opacity-70" style={{ color: '#3b696d' }}>Wie we zijn</a>
            <a href="#" className="hover:opacity-70" style={{ color: '#3b696d' }}>Contact</a>
          </nav>
        </div>
      </header>

      {/* HERO SECTION */}
      <section className="py-20 md:py-32" style={{ backgroundColor: '#bdeffc', color: '#3b696d' }}>
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Wil je een dagje meelopen?
          </h1>
          <p className="text-xl md:text-2xl mb-8 opacity-90">
            Kom ontdekken hoe het bij Kaap Noord voelt
          </p>
          <a
            href={whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-8 py-4 text-white text-lg font-bold rounded hover:opacity-90 transition"
            style={{ backgroundColor: '#25D366' }}
          >
            💬 Stuur WhatsApp bericht
          </a>
        </div>
      </section>

      {/* QUICK FACTS */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12" style={{ color: '#3b696d' }}>
            Waarom werken hier?
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Rooster */}
            <div className="text-center p-6 rounded-lg" style={{ backgroundColor: '#f0f7f9' }}>
              <div className="text-4xl mb-4">📅</div>
              <h3 className="text-xl font-bold mb-3" style={{ color: '#3b696d' }}>
                Flexibel Rooster
              </h3>
              <p className="text-gray-700">
                Geheel samen bepalen in overleg. Jij bepaalt mee!
              </p>
            </div>

            {/* Woonruimte */}
            <div className="text-center p-6 rounded-lg" style={{ backgroundColor: '#f0f7f9' }}>
              <div className="text-4xl mb-4">🏠</div>
              <h3 className="text-xl font-bold mb-3" style={{ color: '#3b696d' }}>
                Woonruimte
              </h3>
              <p className="text-gray-700">
                Mogelijkheden beschikbaar op Texel (dit is echt fijn als je van ver komt)
              </p>
            </div>

            {/* Team */}
            <div className="text-center p-6 rounded-lg" style={{ backgroundColor: '#f0f7f9' }}>
              <div className="text-4xl mb-4">👥</div>
              <h3 className="text-xl font-bold mb-3" style={{ color: '#3b696d' }}>
                Team
              </h3>
              <p className="text-gray-700">
                Aanpakkers, sociaal, flexibel, leuk. Echt jouw soort mensen!
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* MEET THE TEAM TESTIMONIALS */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12" style={{ color: '#3b696d' }}>
            Wat zeggen ze zelf?
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Testimonial 1 - Placeholder */}
            <div className="bg-white p-6 rounded-lg shadow">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 rounded-full mr-4" style={{ backgroundColor: '#bdeffc' }}></div>
                <div>
                  <h3 className="font-bold" style={{ color: '#3b696d' }}>Marco</h3>
                  <p className="text-sm text-gray-600">Bediening • 3 jaar</p>
                </div>
              </div>
              <p className="text-gray-700 italic">
                "[Testimonial komt hier]"
              </p>
            </div>

            {/* Testimonial 2 - Placeholder */}
            <div className="bg-white p-6 rounded-lg shadow">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 rounded-full mr-4" style={{ backgroundColor: '#bdeffc' }}></div>
                <div>
                  <h3 className="font-bold" style={{ color: '#3b696d' }}>Lisa</h3>
                  <p className="text-sm text-gray-600">Keuken • 1 jaar</p>
                </div>
              </div>
              <p className="text-gray-700 italic">
                "[Testimonial komt hier]"
              </p>
            </div>

            {/* Testimonial 3 - Placeholder */}
            <div className="bg-white p-6 rounded-lg shadow">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 rounded-full mr-4" style={{ backgroundColor: '#bdeffc' }}></div>
                <div>
                  <h3 className="font-bold" style={{ color: '#3b696d' }}>Desiree</h3>
                  <p className="text-sm text-gray-600">Owner</p>
                </div>
              </div>
              <p className="text-gray-700 italic">
                "[Testimonial komt hier]"
              </p>
            </div>

            {/* Testimonial 4 - Placeholder */}
            <div className="bg-white p-6 rounded-lg shadow">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 rounded-full mr-4" style={{ backgroundColor: '#bdeffc' }}></div>
                <div>
                  <h3 className="font-bold" style={{ color: '#3b696d' }}>Volgende?</h3>
                  <p className="text-sm text-gray-600">Jij?</p>
                </div>
              </div>
              <p className="text-gray-700 italic">
                "Jouw verhaal kan hier staan!"
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CONTACT SECTION */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-12" style={{ color: '#3b696d' }}>
            Hoe neem je contact op?
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* WhatsApp */}
            <a
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="p-6 rounded-lg hover:shadow-lg transition"
              style={{ backgroundColor: '#e8f5e9' }}
            >
              <div className="text-4xl mb-4">💬</div>
              <h3 className="font-bold mb-2" style={{ color: '#3b696d' }}>
                WhatsApp
              </h3>
              <p className="text-sm text-gray-600">
                Stuur meteen een berichtje. Heel laagdrempelig!
              </p>
            </a>

            {/* Telefoon */}
            <a
              href="tel:+31623823324"
              className="p-6 rounded-lg hover:shadow-lg transition"
              style={{ backgroundColor: '#f3e5f5' }}
            >
              <div className="text-4xl mb-4">☎️</div>
              <h3 className="font-bold mb-2" style={{ color: '#3b696d' }}>
                Bel Marije
              </h3>
              <p className="text-sm text-gray-600">
                06 - 23 82 33 24
              </p>
            </a>

            {/* Email */}
            <a
              href="mailto:vacatures@strandpaviljoenkaapnoord.nl"
              className="p-6 rounded-lg hover:shadow-lg transition"
              style={{ backgroundColor: '#fff3e0' }}
            >
              <div className="text-4xl mb-4">📧</div>
              <h3 className="font-bold mb-2" style={{ color: '#3b696d' }}>
                Email
              </h3>
              <p className="text-sm text-gray-600">
                vacatures@strandpaviljoenkaapnoord.nl
              </p>
            </a>
          </div>
        </div>
      </section>

      {/* MAP */}
      <section className="h-96 bg-gray-200">
        <iframe
          title="Kaap Noord locatie"
          width="100%"
          height="100%"
          frameBorder="0"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2429.734944277197!2d4.86669!3d53.17498!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47cf2eee748071bf%3A0x55265a1070e618b!2sStrandpaviljoen%20Kaap%20Noord!5e0!3m2!1snl!2snl!4v1"
          allowFullScreen=""
          loading="lazy"
        />
      </section>

      {/* FOOTER */}
      <footer className="py-12 text-white" style={{ backgroundColor: '#2a4a4d' }}>
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            <div>
              <p className="font-semibold mb-4">
                Strandpaviljoen Kaap Noord<br />
                Volharding 4<br />
                1795 LH De Cocksdorp, Texel
              </p>
              <p className="text-sm">☎️ <a href="tel:+31222316340" className="hover:underline">+31 (0)222 316340</a></p>
            </div>
            <div>
              <p className="font-semibold mb-4">Solliciteer</p>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:underline">WhatsApp → 06-23823324</a></li>
                <li><a href="tel:+31623823324" className="hover:underline">Bel → Marije</a></li>
                <li><a href="mailto:vacatures@strandpaviljoenkaapnoord.nl" className="hover:underline">Email → Vacatures</a></li>
              </ul>
            </div>
            <div>
              <p className="font-semibold mb-4">Follow us</p>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:underline">Instagram</a></li>
                <li><a href="#" className="hover:underline">Facebook</a></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-400 pt-8 text-center text-sm text-gray-300">
            © 2026 Strandpaviljoen Kaap Noord
          </div>
        </div>
      </footer>
    </div>
  );
}
