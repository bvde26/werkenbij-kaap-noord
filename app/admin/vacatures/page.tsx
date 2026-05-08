'use client';

export const dynamic = 'force-dynamic';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import Link from 'next/link';

interface Vacature {
  id: string;
  title: string;
  uren_display: string | null;
  description: string | null;
  extended_description: string | null;
  image_url: string | null;
  published: boolean;
  created_at: string;
}

function compressImage(f: File): Promise<Blob> {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => {
      const maxW = 1200;
      const scale = Math.min(1, maxW / img.naturalWidth);
      const canvas = document.createElement('canvas');
      canvas.width = Math.round(img.naturalWidth * scale);
      canvas.height = Math.round(img.naturalHeight * scale);
      canvas.getContext('2d')!.drawImage(img, 0, 0, canvas.width, canvas.height);
      canvas.toBlob((blob) => resolve(blob!), 'image/webp', 0.82);
      URL.revokeObjectURL(img.src);
    };
    img.src = URL.createObjectURL(f);
  });
}

const emptyForm = () => ({
  title: '',
  uren_display: '',
  description: '',
  extended_description: '',
  image_url: null as string | null,
  published: false,
});

export default function AdminVacatures() {
  const [vacatures, setVacatures] = useState<Vacature[]>([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState(emptyForm());
  const [editId, setEditId] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [saving, setSaving] = useState(false);
  const [uploadStatus, setUploadStatus] = useState('');
  const [error, setError] = useState('');

  const load = async () => {
    setLoading(true);
    const { data } = await supabase
      .from('vacatures')
      .select('id, title, uren_display, description, extended_description, image_url, published, created_at')
      .order('created_at', { ascending: false });
    setVacatures(data || []);
    setLoading(false);
  };

  useEffect(() => { load(); }, []);

  const startCreate = () => {
    setEditId(null);
    setForm(emptyForm());
    setShowForm(true);
    setError('');
    setUploadStatus('');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const startEdit = (v: Vacature) => {
    setEditId(v.id);
    setForm({
      title: v.title,
      uren_display: v.uren_display || '',
      description: v.description || '',
      extended_description: v.extended_description || '',
      image_url: v.image_url,
      published: v.published,
    });
    setShowForm(true);
    setError('');
    setUploadStatus('');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const cancel = () => {
    setShowForm(false);
    setEditId(null);
    setForm(emptyForm());
    setError('');
    setUploadStatus('');
  };

  const handleImageUpload = async (file: File) => {
    setUploadStatus('Afbeelding comprimeren…');
    const blob = await compressImage(file);
    const path = `vacatures/${Date.now()}.webp`;
    setUploadStatus('Uploaden…');
    const { error: upErr } = await supabase.storage.from('media').upload(path, blob, { contentType: 'image/webp', upsert: true });
    if (upErr) { setUploadStatus(''); setError('Upload mislukt: ' + upErr.message); return; }
    const { data } = supabase.storage.from('media').getPublicUrl(path);
    setForm(f => ({ ...f, image_url: data.publicUrl }));
    setUploadStatus('Foto opgeslagen');
  };

  const quickUploadPhoto = async (vacatureId: string, file: File) => {
    const blob = await compressImage(file);
    const path = `vacatures/${Date.now()}.webp`;
    const { error: upErr } = await supabase.storage.from('media').upload(path, blob, { contentType: 'image/webp', upsert: true });
    if (upErr) { alert('Upload mislukt: ' + upErr.message); return; }
    const { data } = supabase.storage.from('media').getPublicUrl(path);
    await supabase.from('vacatures').update({ image_url: data.publicUrl }).eq('id', vacatureId);
    await load();
  };

  const save = async () => {
    if (!form.title.trim()) { setError('Functietitel is verplicht.'); return; }
    setSaving(true);
    setError('');

    const payload = {
      title: form.title.trim(),
      uren_display: form.uren_display?.trim() || null,
      description: form.description?.trim() || null,
      extended_description: form.extended_description?.trim() || null,
      image_url: form.image_url || null,
      published: form.published,
      updated_at: new Date().toISOString(),
    };

    const { error: err } = editId
      ? await supabase.from('vacatures').update(payload).eq('id', editId)
      : await supabase.from('vacatures').insert([payload]);

    if (err) {
      setError(err.message);
    } else {
      cancel();
      await load();
    }
    setSaving(false);
  };

  const togglePublished = async (v: Vacature) => {
    await supabase.from('vacatures').update({ published: !v.published }).eq('id', v.id);
    await load();
  };

  const remove = async (id: string, title: string) => {
    if (!window.confirm(`"${title}" definitief verwijderen?`)) return;
    await supabase.from('vacatures').delete().eq('id', id);
    await load();
  };

  return (
    <div className="min-h-screen p-6 md:p-10" style={{ backgroundColor: '#f7faf9' }}>
      <div className="max-w-4xl mx-auto">

        {/* Header */}
        <div className="flex items-start justify-between mb-8">
          <div>
            <Link href="/admin/dashboard"
              className="text-sm mb-2 block hover:underline"
              style={{ color: '#3b696d' }}>
              ← Dashboard
            </Link>
            <h1 className="text-3xl font-bold" style={{ fontFamily: "'Kodchasan', sans-serif", color: '#3b696d' }}>
              Vacatures
            </h1>
            <p className="text-sm mt-1" style={{ color: '#6b7280' }}>
              Alleen gepubliceerde vacatures zijn zichtbaar op de homepage.
            </p>
          </div>
          {!showForm && (
            <button
              onClick={startCreate}
              className="px-5 py-2.5 text-sm font-bold text-white flex-shrink-0"
              style={{ backgroundColor: '#3b696d' }}>
              + Nieuwe vacature
            </button>
          )}
        </div>

        {/* Form */}
        {showForm && (
          <div className="mb-8 p-6 rounded-xl border-2 bg-white" style={{ borderColor: '#3b696d' }}>
            <h2 className="text-xl font-bold mb-5" style={{ color: '#3b696d', fontFamily: "'Kodchasan', sans-serif" }}>
              {editId ? 'Vacature bewerken' : 'Nieuwe vacature'}
            </h2>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold mb-1" style={{ color: '#3b696d' }}>
                  Functietitel *
                </label>
                <input
                  type="text"
                  value={form.title}
                  onChange={e => setForm(f => ({ ...f, title: e.target.value }))}
                  className="w-full px-3 py-2 border rounded text-sm outline-none"
                  style={{ borderColor: '#bdeffc', fontFamily: "'Kodchasan', sans-serif" }}
                  placeholder="bijv. Zelfstandig werkend kok"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-1" style={{ color: '#3b696d' }}>
                  Uren
                </label>
                <input
                  type="text"
                  value={form.uren_display}
                  onChange={e => setForm(f => ({ ...f, uren_display: e.target.value }))}
                  className="w-full px-3 py-2 border rounded text-sm outline-none"
                  style={{ borderColor: '#bdeffc', fontFamily: "'Kodchasan', sans-serif" }}
                  placeholder="bijv. 38 uur  /  In overleg  /  Jouw uren"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-1" style={{ color: '#3b696d' }}>
                  Foto (polaroid op de kaart)
                </label>
                {form.image_url && (
                  <div className="mb-2 flex items-start gap-3">
                    <img src={form.image_url} alt="" className="rounded" style={{ width: '100px', height: '75px', objectFit: 'cover' }} />
                    <button
                      type="button"
                      onClick={() => setForm(f => ({ ...f, image_url: null }))}
                      className="text-xs text-red-500 hover:underline mt-1">
                      Foto verwijderen
                    </button>
                  </div>
                )}
                <input
                  type="file"
                  accept="image/*"
                  onChange={e => { if (e.target.files?.[0]) handleImageUpload(e.target.files[0]); }}
                  className="text-sm"
                  style={{ color: '#3b696d' }}
                />
                {uploadStatus && (
                  <p className="text-xs mt-1" style={{ color: '#6b7280' }}>{uploadStatus}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-semibold mb-1" style={{ color: '#3b696d' }}>
                  Korte beschrijving
                </label>
                <p className="text-xs mb-1" style={{ color: '#9ca3af' }}>
                  Zichtbaar na de eerste klik. Houd dit kort en pakkend.
                </p>
                <textarea
                  value={form.description}
                  onChange={e => setForm(f => ({ ...f, description: e.target.value }))}
                  className="w-full px-3 py-2 border rounded text-sm outline-none resize-none"
                  style={{ borderColor: '#bdeffc', fontFamily: "'Kodchasan', sans-serif" }}
                  rows={3}
                  placeholder="Wil jij werken in een team waarbij gastvrijheid hoog in het vaandel staat?"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-1" style={{ color: '#3b696d' }}>
                  Volledige vacaturetekst
                </label>
                <p className="text-xs mb-1" style={{ color: '#9ca3af' }}>
                  Zichtbaar na "Volledige vacature". Begin een regel met <strong>- </strong> voor een opsommingspunt.
                </p>
                <textarea
                  value={form.extended_description}
                  onChange={e => setForm(f => ({ ...f, extended_description: e.target.value }))}
                  className="w-full px-3 py-2 border rounded text-sm outline-none resize-none"
                  style={{ borderColor: '#bdeffc', fontFamily: "'Kodchasan', sans-serif" }}
                  rows={10}
                  placeholder="Wat ga je doen?&#10;&#10;Jij bent verantwoordelijk voor...&#10;&#10;Wat wij bieden:&#10;- Flexibele uren&#10;- ..."
                />
              </div>

              <div className="flex items-center gap-2 pt-1">
                <input
                  type="checkbox"
                  id="published"
                  checked={form.published}
                  onChange={e => setForm(f => ({ ...f, published: e.target.checked }))}
                  className="w-4 h-4 cursor-pointer"
                  style={{ accentColor: '#3b696d' }}
                />
                <label htmlFor="published" className="text-sm font-semibold cursor-pointer" style={{ color: '#3b696d' }}>
                  Direct publiceren op de homepage
                </label>
              </div>

              {error && (
                <p className="text-sm text-red-600 bg-red-50 px-3 py-2 rounded">{error}</p>
              )}

              <div className="flex gap-3 pt-2">
                <button
                  onClick={save}
                  disabled={saving}
                  className="px-6 py-2.5 text-sm font-bold text-white disabled:opacity-50"
                  style={{ backgroundColor: '#3b696d' }}>
                  {saving ? 'Opslaan...' : 'Opslaan'}
                </button>
                <button
                  onClick={cancel}
                  className="px-6 py-2.5 text-sm font-semibold border"
                  style={{ borderColor: '#3b696d', color: '#3b696d' }}>
                  Annuleren
                </button>
              </div>
            </div>
          </div>
        )}

        {/* List */}
        {loading ? (
          <div className="space-y-3">
            {[1, 2, 3].map(i => (
              <div key={i} className="h-16 rounded-xl bg-white border animate-pulse" style={{ borderColor: '#e5e7eb' }} />
            ))}
          </div>
        ) : vacatures.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-sm mb-4" style={{ color: '#6b7280' }}>Nog geen vacatures.</p>
            <button onClick={startCreate} className="text-sm font-semibold underline" style={{ color: '#3b696d' }}>
              Eerste vacature toevoegen
            </button>
          </div>
        ) : (
          <div className="space-y-2">
            {vacatures.map(v => (
              <div
                key={v.id}
                className="flex items-center gap-4 px-5 py-4 rounded-xl bg-white border"
                style={{ borderColor: v.published ? '#bdeffc' : '#e5e7eb' }}>

                {/* Foto thumbnail */}
                <label
                  title={v.image_url ? 'Foto vervangen' : 'Foto toevoegen'}
                  style={{ cursor: 'pointer', flexShrink: 0 }}>
                  <input
                    type="file"
                    accept="image/*"
                    className="sr-only"
                    onChange={e => { if (e.target.files?.[0]) quickUploadPhoto(v.id, e.target.files[0]); e.target.value = ''; }}
                  />
                  {v.image_url ? (
                    <img
                      src={v.image_url}
                      alt=""
                      style={{ width: '52px', height: '40px', objectFit: 'cover', borderRadius: '6px', display: 'block' }}
                    />
                  ) : (
                    <div
                      style={{ width: '52px', height: '40px', borderRadius: '6px', border: '2px dashed #d1d5db', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="2" strokeLinecap="round">
                        <rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/>
                        <polyline points="21 15 16 10 5 21"/>
                      </svg>
                    </div>
                  )}
                </label>

                <div className="flex-1 min-w-0">
                  <p className="font-bold text-sm truncate" style={{ color: '#3b696d', fontFamily: "'Kodchasan', sans-serif" }}>
                    {v.title}
                  </p>
                  <p className="text-xs mt-0.5" style={{ color: '#9ca3af' }}>
                    {v.uren_display || '—'} · {v.published ? 'Gepubliceerd' : 'Concept'} · {v.image_url ? 'Foto ✓' : 'Geen foto'}
                  </p>
                </div>
                <div className="flex items-center gap-1 flex-shrink-0">
                  <button
                    onClick={() => togglePublished(v)}
                    className="px-3 py-1 text-xs font-semibold rounded-full border transition-colors"
                    style={{
                      borderColor: v.published ? '#3b696d' : '#d1d5db',
                      color: v.published ? '#3b696d' : '#9ca3af',
                      backgroundColor: v.published ? '#e8f4f4' : 'transparent',
                    }}>
                    {v.published ? 'Live' : 'Concept'}
                  </button>
                  <button
                    onClick={() => startEdit(v)}
                    className="px-3 py-1 text-xs font-semibold hover:underline"
                    style={{ color: '#3b696d' }}>
                    Bewerken
                  </button>
                  <button
                    onClick={() => remove(v.id, v.title)}
                    className="px-3 py-1 text-xs font-semibold hover:underline text-red-500">
                    Verwijderen
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
