import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Link from 'next/link';

export default function VacatureNotFound() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: '#fefdf5' }}>
      <Header active="" />

      <section style={{ backgroundColor: '#3b696d', padding: '60px 24px 72px' }}>
        <div style={{ maxWidth: '640px', margin: '0 auto', textAlign: 'center' }}>
          <p style={{ fontSize: '13px', fontWeight: 600, color: '#bdeffc', letterSpacing: '0.12em', textTransform: 'uppercase', fontFamily: "'Kodchasan', sans-serif", marginBottom: '16px' }}>
            Kaap Noord · Texel
          </p>
          <h1 style={{ fontFamily: "'Pana Summer', serif", fontWeight: 400, fontSize: 'clamp(2rem, 6vw, 3.2rem)', color: '#ffffff', letterSpacing: '0.03em', lineHeight: 1.1, marginBottom: '20px' }}>
            Deze vacature is niet meer beschikbaar
          </h1>
          <p style={{ fontFamily: "'Kodchasan', sans-serif", fontWeight: 300, fontSize: '17px', color: 'rgba(255,255,255,0.75)', lineHeight: 1.6, marginBottom: '36px', maxWidth: '38ch', margin: '0 auto 36px' }}>
            De functie is al ingevuld of niet meer actief. Bekijk onze andere openstaande functies — misschien is er iets voor jou bij.
          </p>
          <Link
            href="/#vacatures"
            style={{ display: 'inline-block', backgroundColor: '#bdeffc', color: '#3b696d', fontFamily: "'Kodchasan', sans-serif", fontWeight: 700, fontSize: '15px', padding: '14px 32px', textDecoration: 'none', letterSpacing: '0.02em' }}>
            Bekijk alle openstaande functies →
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
