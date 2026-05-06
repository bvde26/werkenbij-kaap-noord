import Header from '@/components/Header';
import Footer from '@/components/Footer';
import FloatingButtons from '@/components/FloatingButtons';

export default function Contact() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: '#f5f5f5' }}>
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
            <div className="rounded-xl p-8 text-center shadow-sm bg-white">
              <div className="text-5xl mb-4">💬</div>
              <h2 className="text-2xl font-bold mb-3" style={{ color: '#3b696d' }}>WhatsApp Marije</h2>
              <p className="text-gray-600 mb-6 text-sm leading-relaxed">
                De snelste manier. Stuur een appje en we reageren zo snel mogelijk. Gewoon in je eigen woorden.
              </p>
              <a
                href="https://wa.me/31623823324?text=Hoi!%20Ik%20wil%20graag%20Kaap%20Noord%20ontdekken!"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block w-full py-3 font-bold text-white text-sm uppercase tracking-wider"
                style={{ backgroundColor: '#25D366' }}
              >
                Open WhatsApp
              </a>
            </div>

            {/* Bellen */}
            <div className="rounded-xl p-8 text-center shadow-sm bg-white">
              <div className="text-5xl mb-4">📞</div>
              <h2 className="text-2xl font-bold mb-3" style={{ color: '#3b696d' }}>Bel ons</h2>
              <p className="text-gray-600 mb-6 text-sm leading-relaxed">
                Liever even bellen? Marije staat voor je klaar. Geef jezelf even voor en we plannen een gesprekje.
              </p>
              <a
                href="tel:+31623823324"
                className="inline-block w-full py-3 font-bold text-white text-sm uppercase tracking-wider"
                style={{ backgroundColor: '#3b696d' }}
              >
                06-23823324 (Marije)
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
