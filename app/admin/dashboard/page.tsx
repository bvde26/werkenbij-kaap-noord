'use client';

import { useState, useEffect } from 'react';
import { getTestimonials, Testimonial } from '@/lib/supabase';

export default function AdminDashboard() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadTestimonials();
  }, []);

  async function loadTestimonials() {
    try {
      const data = await getTestimonials();
      setTestimonials(data);
    } catch (error) {
      console.error('Error loading testimonials:', error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2" style={{ color: '#3b696d' }}>
            Admin Dashboard
          </h1>
          <p className="text-gray-600">Beheer testimonials, facts en website content</p>
        </div>

        <div className="grid grid-cols-3 gap-4 mb-8">
          <div className="p-4 rounded text-center font-semibold" style={{ backgroundColor: '#bdeffc', color: '#3b696d' }}>
            📝 Testimonials
          </div>
          <div className="p-4 rounded text-center font-semibold border border-gray-300">
            ⚡ Quick Facts
          </div>
          <div className="p-4 rounded text-center font-semibold border border-gray-300">
            ⚙️ Settings
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold" style={{ color: '#3b696d' }}>
              Team Testimonials ({testimonials.length})
            </h2>
            <a href="/admin/testimonials/new" className="px-4 py-2 text-white rounded font-semibold" style={{ backgroundColor: '#3b696d' }}>
              + Nieuw
            </a>
          </div>

          {loading ? (
            <p className="text-gray-600">Laden...</p>
          ) : testimonials.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-600 mb-4">Nog geen testimonials</p>
              <a href="/admin/testimonials/new" className="px-4 py-2 text-white rounded font-semibold inline-block" style={{ backgroundColor: '#3b696d' }}>
                Voeg eerste toe
              </a>
            </div>
          ) : (
            <div className="space-y-4">
              {testimonials.map((t) => (
                <div key={t.id} className="border border-gray-200 rounded p-4 hover:bg-gray-50">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-bold text-lg" style={{ color: '#3b696d' }}>{t.name}</h3>
                      <p className="text-sm text-gray-600">{t.role}</p>
                      <p className="text-gray-700 italic">"{t.quote}"</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
