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
        style={{ backgroundColor: '#25D366', borderRadius: '50%', width: '56px', height: '56px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
        title="WhatsApp ons"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
          <path d="M11.5 2C6.262 2 2 6.262 2 11.5c0 1.687.435 3.272 1.197 4.653L2 22l5.998-1.172A9.45 9.45 0 0 0 11.5 21c5.238 0 9.5-4.262 9.5-9.5S16.738 2 11.5 2zm0 17.3a7.792 7.792 0 0 1-3.976-1.083l-.285-.169-2.955.577.6-2.883-.186-.295A7.793 7.793 0 0 1 3.7 11.5C3.7 7.198 7.198 3.7 11.5 3.7S19.3 7.198 19.3 11.5 15.802 19.3 11.5 19.3z"/>
        </svg>
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
