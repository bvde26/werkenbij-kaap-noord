import Header from '@/components/Header';
import Footer from '@/components/Footer';
import FloatingButtons from '@/components/FloatingButtons';

export default function Contact() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: '#fefdf5' }}>
      <style>{`
        @keyframes floatBtn {
          0%, 100% { transform: translateY(0px); box-shadow: 0 6px 16px rgba(0,0,0,0.3), 0 2px 6px rgba(0,0,0,0.2); }
          50%       { transform: translateY(-6px); box-shadow: 0 16px 32px rgba(0,0,0,0.4), 0 4px 12px rgba(0,0,0,0.2); }
        }
        .float-btn-contact {
          animation: floatBtn 2.8s ease-in-out infinite;
          will-change: transform;
        }
        .float-btn-contact:hover {
          animation: none;
          transform: translateY(-8px) scale(1.1);
          box-shadow: 0 20px 40px rgba(0,0,0,0.45) !important;
          transition: transform 0.2s ease, box-shadow 0.2s ease;
        }
      `}</style>
      <Header active="/contact" />
      <FloatingButtons />

      {/* Hero */}
      <section className="py-20 text-center" style={{ backgroundColor: '#bdeffc' }}>
        <div className="max-w-4xl mx-auto px-4">
          <h1
            className="text-5xl md:text-6xl uppercase mb-6"
            style={{ fontFamily: "'Pana Summer', serif", fontWeight: 400, color: '#3b696d', letterSpacing: '0.03em' }}
          >
            Kom je kennismaken?
          </h1>
          <p className="text-xl" style={{ color: '#3b696d', fontFamily: "'Kodchasan', sans-serif", fontWeight: 300 }}>
            Geen lange sollicitatie. Geen gekke tests. Gewoon een gesprek of een dagje meelopen.
          </p>
        </div>
      </section>

      {/* Contact opties */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8 mb-12">

            {/* WhatsApp */}
            <div className="rounded-xl p-8 text-center shadow-sm bg-white flex flex-col items-center">
              <div className="text-5xl mb-4">💬</div>
              <h2 className="text-2xl font-bold mb-3" style={{ color: '#3b696d', fontFamily: "'Kodchasan', sans-serif" }}>WhatsApp Marije</h2>
              <p className="mb-8 text-sm leading-relaxed" style={{ color: '#666' }}>
                De snelste manier. Stuur een appje en we reageren zo snel mogelijk. Gewoon in je eigen woorden.
              </p>
              <a
                href="https://wa.me/31623823324?text=Hoi!%20Ik%20wil%20graag%20Kaap%20Noord%20ontdekken!"
                target="_blank"
                rel="noopener noreferrer"
                className="float-btn-contact w-16 h-16 rounded-full flex items-center justify-center text-3xl"
                style={{ backgroundColor: '#25D366' }}
                title="Open WhatsApp"
              >
                💬
              </a>
            </div>

            {/* Bellen */}
            <div className="rounded-xl p-8 text-center shadow-sm bg-white flex flex-col items-center">
              <div className="text-5xl mb-4">📞</div>
              <h2 className="text-2xl font-bold mb-3" style={{ color: '#3b696d', fontFamily: "'Kodchasan', sans-serif" }}>Bel ons</h2>
              <p className="mb-8 text-sm leading-relaxed" style={{ color: '#666' }}>
                Liever even bellen? Marije staat voor je klaar. Geef jezelf even voor en we plannen een gesprekje.
              </p>
              <a
                href="tel:+31623823324"
                className="float-btn-contact w-16 h-16 rounded-full flex items-center justify-center"
                style={{ backgroundColor: '#3b696d', animationDelay: '0.4s' }}
                title="Bel ons"
              >
                <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Form */}
          <div className="rounded-xl p-8 md:p-12 bg-white shadow-sm">
            <h2 className="text-2xl font-bold mb-2" style={{ color: '#3b696d' }}>Stuur een berichtje</h2>
            <p className="text-gray-500 text-sm mb-8">We reageren zo snel mogelijk en plannen daarna graag een persoonlijk gesprek.</p>

            <form className="space-y-5" action="mailto:vacatures@strandpaviljoenkaapnoord.nl" method="get">
              <div className="grid md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-semibold mb-2" style={{ color: '#3b696d' }}>Naam *</label>
                  <input
                    type="text"
                    name="name"
                    required
                    placeholder="Jouw naam"
                    className="w-full border border-gray-200 px-4 py-3 text-sm focus:outline-none focus:border-[#3b696d] bg-gray-50"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2" style={{ color: '#3b696d' }}>Telefoonnummer *</label>
                  <input
                    type="tel"
                    name="phone"
                    required
                    placeholder="06-..."
                    className="w-full border border-gray-200 px-4 py-3 text-sm focus:outline-none focus:border-[#3b696d] bg-gray-50"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2" style={{ color: '#3b696d' }}>Interesse in... (optioneel)</label>
                <select className="w-full border border-gray-200 px-4 py-3 text-sm focus:outline-none focus:border-[#3b696d] bg-gray-50" name="functie">
                  <option value="">Kies een functie...</option>
                  <option>Bediening</option>
                  <option>Keuken / Kok</option>
                  <option>Weekendhulp of vakantiekracht</option>
                  <option>Tussenjaars op Texel</option>
                  <option>Chef de Partie</option>
                  <option>Open sollicitatie</option>
                  <option>Weet ik nog niet</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2" style={{ color: '#3b696d' }}>Bericht (optioneel)</label>
                <textarea
                  rows={4}
                  name="message"
                  placeholder="Vertel wat je wil — of laat dit gewoon leeg. We nemen toch contact op!"
                  className="w-full border border-gray-200 px-4 py-3 text-sm focus:outline-none focus:border-[#3b696d] bg-gray-50 resize-none"
                />
              </div>
              <button
                type="submit"
                className="w-full py-4 font-bold text-white text-sm uppercase tracking-wider transition-opacity hover:opacity-85"
                style={{ backgroundColor: '#3b696d' }}
              >
                Verstuur bericht
              </button>
            </form>

            <p className="text-center text-xs text-gray-400 mt-4">
              Of mail direct: <a href="mailto:vacatures@strandpaviljoenkaapnoord.nl" className="underline" style={{ color: '#3b696d' }}>vacatures@strandpaviljoenkaapnoord.nl</a>
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
