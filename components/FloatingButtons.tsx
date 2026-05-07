export default function FloatingButtons({ hidden = false }: { hidden?: boolean }) {
  if (hidden) return null;

  const whatsappLink = "https://wa.me/31623823324?text=Hoi!%20Ik%20wil%20graag%20Kaap%20Noord%20ontdekken!";
  const phoneLink = "tel:+31623823324";

  return (
    <>
      <style>{`
        @keyframes floatFixed {
          0%, 100% { transform: translateY(0px); box-shadow: 0 6px 20px rgba(0,0,0,0.35), 0 2px 8px rgba(0,0,0,0.2); }
          50%       { transform: translateY(-6px); box-shadow: 0 16px 32px rgba(0,0,0,0.45), 0 4px 12px rgba(0,0,0,0.2); }
        }
        .float-fixed {
          animation: floatFixed 3s ease-in-out infinite;
          will-change: transform;
          border-radius: 50% !important;
        }
        .float-fixed:hover {
          animation: none;
          transform: translateY(-8px) scale(1.1);
          box-shadow: 0 20px 40px rgba(0,0,0,0.5) !important;
          transition: transform 0.2s ease, box-shadow 0.2s ease;
        }
        .float-fixed-delay {
          animation-delay: 0.5s;
        }
      `}</style>
      <a
        href={whatsappLink}
        target="_blank"
        rel="noopener noreferrer"
        className="float-fixed fixed bottom-6 right-6 z-50"
        style={{ backgroundColor: '#25D366', borderRadius: '50%', width: '56px', height: '56px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '24px' }}
        title="WhatsApp ons"
      >
        💬
      </a>
      <a
        href={phoneLink}
        className="float-fixed float-fixed-delay fixed bottom-6 right-24 z-50"
        style={{ backgroundColor: '#3b696d', borderRadius: '50%', width: '56px', height: '56px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
        title="Bel ons"
      >
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
          <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
        </svg>
      </a>
    </>
  );
}
