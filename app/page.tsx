export default function Home() {
  const whatsappLink = "https://wa.me/31623823324?text=Hoi!%20Ik%20wil%20graag%20een%20dagje%20meelopen%20bij%20Kaap%20Noord!";

  return (
    <div className="min-h-screen bg-white">
      {/* Floating WhatsApp */}
      <a href={whatsappLink} target="_blank" rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 w-16 h-16 rounded-full flex items-center justify-center text-3xl hover:scale-110 transition-transform shadow-lg"
        style={{ backgroundColor: '#25D366' }}>
        💬
      </a>

      {/* Header */}
      <header className="sticky top-0 z-40 shadow" style={{ backgroundColor: '#bdeffc' }}>
        <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
          <div className="text-2xl font-bold" style={{ color: '#3b696d' }}>Kaap Noord</div>
        </div>
      </header>

      {/* Hero */}
      <section className="py-20 text-center" style={{ backgroundColor: '#bdeffc', color: '#3b696d' }}>
        <h1 className="text-5xl font-bold mb-6">Wil je een dagje meelopen?</h1>
        <p className="text-xl mb-8">Kom ontdekken hoe het bij Kaap Noord voelt</p>
        <a href={whatsappLink} target="_blank" rel="noopener noreferrer"
          className="inline-block px-8 py-4 text-white text-lg font-bold rounded hover:opacity-90"
          style={{ backgroundColor: '#25D366' }}>
          💬 Stuur WhatsApp
        </a>
      </section>

      {/* Quick Facts */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12" style={{ color: '#3b696d' }}>
            Waarom werken hier?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6 rounded-lg" style={{ backgroundColor: '#f0f7f9' }}>
              <div className="text-4xl mb-4">📅</div>
              <h3 className="text-xl font-bold mb-3" style={{ color: '#3b696d' }}>Flexibel Rooster</h3>
              <p className="text-gray-700">Geheel samen bepalen in overleg</p>
            </div>
            <div className="text-center p-6 rounded-lg" style={{ backgroundColor: '#f0f7f9' }}>
              <div className="text-4xl mb-4">🏠</div>
              <h3 className="text-xl font-bold mb-3" style={{ color: '#3b696d' }}>Woonruimte</h3>
              <p className="text-gray-700">Mogelijkheden beschikbaar op Texel</p>
            </div>
            <div className="text-center p-6 rounded-lg" style={{ backgroundColor: '#f0f7f9' }}>
              <div className="text-4xl mb-4">👥</div>
              <h3 className="text-xl font-bold mb-3" style={{ color: '#3b696d' }}>Team</h3>
              <p className="text-gray-700">Aanpakkers, sociaal, flexibel, leuk</p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-12" style={{ color: '#3b696d' }}>Hoe neem je contact op?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <a href={whatsappLink} target="_blank" rel="noopener noreferrer"
              className="p-6 rounded-lg hover:shadow-lg transition" style={{ backgroundColor: '#e8f5e9' }}>
              <div className="text-4xl mb-4">💬</div>
              <h3 className="font-bold mb-2" style={{ color: '#3b696d' }}>WhatsApp</h3>
              <p className="text-sm text-gray-600">Stuur meteen een berichtje</p>
            </a>
            <a href="tel:+31623823324"
              className="p-6 rounded-lg hover:shadow-lg transition" style={{ backgroundColor: '#f3e5f5' }}>
              <div className="text-4xl mb-4">☎️</div>
              <h3 className="font-bold mb-2" style={{ color: '#3b696d' }}>Bel</h3>
              <p className="text-sm text-gray-600">06-23823324</p>
            </a>
            <a href="mailto:vacatures@strandpaviljoenkaapnoord.nl"
              className="p-6 rounded-lg hover:shadow-lg transition" style={{ backgroundColor: '#fff3e0' }}>
              <div className="text-4xl mb-4">📧</div>
              <h3 className="font-bold mb-2" style={{ color: '#3b696d' }}>Email</h3>
              <p className="text-sm text-gray-600">vacatures@...</p>
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 text-white" style={{ backgroundColor: '#2a4a4d' }}>
        <div className="max-w-6xl mx-auto px-4 text-center">
          <p className="mb-2">Strandpaviljoen Kaap Noord</p>
          <p className="text-sm text-gray-300">Volharding 4, Texel</p>
        </div>
      </footer>
    </div>
  );
}
