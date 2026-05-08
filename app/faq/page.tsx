'use client';

import { useState, useEffect } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import FloatingButtons from '@/components/FloatingButtons';
import { getFaqItems, type FaqItem } from '@/lib/supabase';

export default function FAQ() {
  const [faqs, setFaqs] = useState<FaqItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getFaqItems()
      .then(setFaqs)
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: '#fefdf5' }}>
      <Header active="/faq" />
      <FloatingButtons />

      <section className="py-20 text-center" style={{ backgroundColor: '#bdeffc' }}>
        <div className="max-w-4xl mx-auto px-4">
          <h1
            className="text-5xl md:text-6xl uppercase mb-6"
            style={{ fontFamily: "'Pana Summer', serif", fontWeight: 400, color: '#3b696d', letterSpacing: '0.03em' }}
          >
            Veelgestelde vragen
          </h1>
          <p className="text-xl" style={{ color: '#3b696d', fontFamily: "'Kodchasan', sans-serif", fontWeight: 300 }}>
            Alles over werken bij Kaap Noord
          </p>
        </div>
      </section>

      <section className="py-16 px-4 flex-1">
        <div className="max-w-3xl mx-auto">
          {loading ? (
            <div className="space-y-4">
              {[1, 2, 3, 4, 5].map(i => (
                <div key={i} className="rounded-lg bg-white shadow-sm animate-pulse" style={{ height: '68px' }} />
              ))}
            </div>
          ) : faqs.length === 0 ? (
            <p className="text-center py-12" style={{ color: '#3b696d', fontFamily: "'Kodchasan', sans-serif", fontSize: '16px' }}>
              Geen vragen gevonden. Kom binnenkort terug.
            </p>
          ) : (
            <div className="space-y-4">
              {faqs.map((faq) => (
                <details key={faq.id} className="group rounded-lg bg-white shadow-sm overflow-hidden">
                  <summary
                    className="flex justify-between items-center px-6 py-5 cursor-pointer font-semibold text-base select-none list-none"
                    style={{ color: '#3b696d', fontFamily: "'Kodchasan', sans-serif" }}
                  >
                    {faq.question}
                    <span className="ml-4 text-xl transition-transform group-open:rotate-45 flex-shrink-0" style={{ color: '#3b696d' }}>+</span>
                  </summary>
                  <div className="px-6 pb-6 text-sm leading-relaxed border-t border-gray-100 pt-4" style={{ color: '#3b696d', fontFamily: "'Kodchasan', sans-serif" }}>
                    {faq.answer}
                  </div>
                </details>
              ))}
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}
