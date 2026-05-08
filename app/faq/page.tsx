'use client';

import { useState, useEffect } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import FloatingButtons from '@/components/FloatingButtons';
import { getFaqItems, type FaqItem } from '@/lib/supabase';

export default function FAQ() {
  const [faqs, setFaqs] = useState<FaqItem[]>([]);

  useEffect(() => {
    getFaqItems().then(setFaqs).catch(() => {});
  }, []);

  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: '#f5f5f5' }}>
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
          <div className="space-y-4">
            {faqs.map((faq) => (
              <details key={faq.id} className="group rounded-lg bg-white shadow-sm overflow-hidden">
                <summary
                  className="flex justify-between items-center px-6 py-5 cursor-pointer font-semibold text-base select-none list-none"
                  style={{ color: '#3b696d' }}
                >
                  {faq.question}
                  <span className="ml-4 text-xl transition-transform group-open:rotate-45 flex-shrink-0">+</span>
                </summary>
                <div className="px-6 pb-6 text-sm leading-relaxed text-gray-600 border-t border-gray-100 pt-4">
                  {faq.answer}
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
