'use client';

import { useState, useEffect } from 'react';

export default function AdminDashboard() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(false);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold mb-2" style={{ color: '#3b696d' }}>
          Admin Dashboard
        </h1>
        <p className="text-gray-600">Beheer testimonials, facts en website content</p>

        <div className="mt-8 bg-white rounded-lg shadow p-6">
          <h2 className="text-2xl font-bold mb-4" style={{ color: '#3b696d' }}>
            Team Testimonials
          </h2>
          <p className="text-gray-600">Testimonials coming soon...</p>
        </div>
      </div>
    </div>
  );
}
