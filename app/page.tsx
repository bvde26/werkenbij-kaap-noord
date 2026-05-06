export default function Home() {
  const whatsappLink = "https://wa.me/31623823324?text=Hoi!%20Ik%20wil%20graag%20Kaap%20Noord%20ontdekken!";
  const phoneLink = "tel:+31623823324";

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#f5f5f5' }}>
{/* Header */}
      <header className="sticky top-0 z-40 bg-white shadow-sm" style={{ backgroundColor: '#bdeffc', height: '60px' }}>
        <div className="max-w-6xl mx-auto px-4 h-full flex justify-between items-center">
          <div className="flex items-center gap-2">
            <img src="/logo.svg" alt="Kaap Noord" style={{ height: '45px' }} />
          </div>
          <nav className="hidden md:flex gap-8 text-sm font-medium" style={{ color: '#3b696d' }}>
            <a href="/jij" className="hover:opacity-70">Voor jou</a>
            <a href="/wij" className="hover:opacity-70">Over ons</a>
            <a href="#contact" className="hover:opacity-70">Contact</a>
          </nav>
        </div>
      </header>

      {/* Hero Section - Text Above Video */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-6xl mb-6 uppercase" style={{ fontFamily: "'Kodchasan', sans-serif", fontWeight: 300, letterSpacing: '0.02em', color: '#3b696d' }}>
            Onbezorgd genieten<br />op het Texelse strand
          </h1>
          <p className="text-2xl md:text-3xl" style={{ fontFamily: "'Kodchasan', sans-serif", fontWeight: 300, color: '#3b696d', letterSpacing: '0.05em' }}>
            Dat doe je natuurlijk bij Strandpaviljoen Kaap Noord
          </p>
        </div>
      </section>

      {/* Video Section */}
      <section className="h-96 md:h-screen overflow-hidden">
        <iframe
          className="w-full h-full"
          src="https://player.vimeo.com/video/711355612?background=1&muted=1&autoplay=1&dnt=1"
          frameBorder="0"
          allow="autoplay; fullscreen"
          allowFullScreen
        />
      </section>

      {/* Jij / Wij Sections */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12">
            {/* VOOR JOU */}
            <div>
              <h2 className="text-3xl md:text-4xl uppercase mb-4" style={{ fontFamily: "'Kodchasan', sans-serif", fontWeight: 300, color: '#3b696d', letterSpacing: '0.05em' }}>Voor jou</h2>
              <svg className="w-32 h-2 mb-6" viewBox="0 0 100 10" style={{ color: '#bdeffc' }}>
                <polyline points="0,5 10,0 20,10 30,0 40,10 50,0 60,10 70,0 80,10 90,0 100,10" fill="none" stroke="currentColor" strokeWidth="1"/>
              </svg>
              <p className="text-lg mb-6 leading-relaxed" style={{ color: '#3b696d' }}>
                Je zoekt een plek waar je jezelf kan zijn. Waar werk leuk is. Waar het voelt als een tweede thuis.
              </p>
              <a
                href="/jij"
                className="inline-block px-6 py-3 font-medium uppercase transition border-2"
                style={{ backgroundColor: '#bdeffc', color: '#3b696d', borderColor: '#3b696d', fontSize: '0.9rem', letterSpacing: '0.05em' }}
              >
                Voor jou
              </a>
            </div>

            {/* OVER ONS */}
            <div>
              <h2 className="text-3xl md:text-4xl uppercase mb-4" style={{ fontFamily: "'Kodchasan', sans-serif", fontWeight: 300, color: '#3b696d', letterSpacing: '0.05em' }}>Over ons</h2>
              <svg className="w-32 h-2 mb-6" viewBox="0 0 100 10" style={{ color: '#bdeffc' }}>
                <polyline points="0,5 10,0 20,10 30,0 40,10 50,0 60,10 70,0 80,10 90,0 100,10" fill="none" stroke="currentColor" strokeWidth="1"/>
              </svg>
              <p className="text-lg mb-6 leading-relaxed" style={{ color: '#3b696d' }}>
                We zijn een team dat gepassioneerd is. Dat elkaar helpt. Dat samen iets moois creëert op Texel.
              </p>
              <a
                href="/wij"
                className="inline-block px-6 py-3 font-medium uppercase transition border-2"
                style={{ backgroundColor: '#bdeffc', color: '#3b696d', borderColor: '#3b696d', fontSize: '0.9rem', letterSpacing: '0.05em' }}
              >
                Over ons
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12" style={{ color: '#3b696d' }}>
            Waarom Kaap Noord?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6 rounded-lg bg-white shadow-sm">
              <div className="text-4xl mb-4">🏝️</div>
              <h3 className="text-xl font-bold mb-3" style={{ color: '#3b696d' }}>Texel</h3>
              <p className="text-gray-700">Werk op een eiland met uitzicht. Zee in je hart.</p>
            </div>
            <div className="text-center p-6 rounded-lg bg-white shadow-sm">
              <div className="text-4xl mb-4">👥</div>
              <h3 className="text-xl font-bold mb-3" style={{ color: '#3b696d' }}>Team</h3>
              <p className="text-gray-700">Hechte groep. Elkaar helpen. Samen sterker.</p>
            </div>
            <div className="text-center p-6 rounded-lg bg-white shadow-sm">
              <div className="text-4xl mb-4">📅</div>
              <h3 className="text-xl font-bold mb-3" style={{ color: '#3b696d' }}>Flexibel</h3>
              <p className="text-gray-700">Je bepaalt mee je rooster. Werk-leven balans.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Footer */}
      <footer id="contact" className="py-12 text-white" style={{ backgroundColor: '#2a4a4d' }}>
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8 mb-8">
            <div>
              <h3 className="text-xl font-bold mb-4">Contact</h3>
              <p className="mb-2">📞 06-23823324 (Marije)</p>
              <p className="mb-2">✉️ vacatures@strandpaviljoenkaapnoord.nl</p>
              <p>📍 Volharding 4, Texel</p>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-4">Snelle link</h3>
              <a href={whatsappLink} target="_blank" rel="noopener noreferrer" className="block mb-2 hover:opacity-70">
                💬 WhatsApp
              </a>
              <a href={phoneLink} className="block hover:opacity-70">
                ☎️ Bel ons
              </a>
            </div>
          </div>
          <div className="border-t border-gray-600 pt-8 text-center text-sm text-gray-300">
            <p>Strandpaviljoen Kaap Noord © 2026</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
