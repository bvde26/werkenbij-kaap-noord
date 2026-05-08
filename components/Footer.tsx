export default function Footer() {
  return (
    <footer className="py-6 text-center" style={{ backgroundColor: '#2a4a4d' }}>
      <div className="flex items-center justify-center gap-4 flex-wrap">
        <a
          href="https://www.strandpaviljoenkaapnoord.nl/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm hover:opacity-75 transition-opacity"
          style={{ color: '#9db8ba' }}
        >
          © 2026 Strandpaviljoen Kaap Noord — Texel
        </a>
        <a
          href="https://www.instagram.com/strandpaviljoen_kaapnoord/"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Instagram"
          className="hover:opacity-75 transition-opacity"
          style={{ color: '#9db8ba', display: 'flex', alignItems: 'center' }}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
            <circle cx="12" cy="12" r="4"/>
            <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none"/>
          </svg>
        </a>
      </div>
    </footer>
  );
}
