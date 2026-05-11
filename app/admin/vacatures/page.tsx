'use client';

export const dynamic = 'force-dynamic';

import { useState, useEffect, useRef } from 'react';
import { supabase } from '@/lib/supabase';
import Link from 'next/link';

const SITE_URL = 'https://werkenbij.21knots.nl';

interface Vacature {
  id: string;
  title: string;
  subtitle: string | null;
  uren_display: string | null;
  salary_display: string | null;
  description: string | null;
  extended_description: string | null;
  image_url: string | null;
  published: boolean;
  created_at: string;
  slug: string | null;
}

function toSlug(title: string) {
  return title.toLowerCase()
    .normalize('NFD').replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
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
  subtitle: '',
  uren_display: '',
  salary_display: '',
  description: '',
  extended_description: '',
  image_url: null as string | null,
  published: false,
  slug: '',
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
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const descRef = useRef<HTMLTextAreaElement>(null);
  const extRef = useRef<HTMLTextAreaElement>(null);

  const insertBold = (ref: React.RefObject<HTMLTextAreaElement | null>, field: 'description' | 'extended_description') => {
    const ta = ref.current;
    if (!ta) return;
    const start = ta.selectionStart;
    const end = ta.selectionEnd;
    const val = form[field];
    const inner = val.slice(start, end) || 'vetgedrukte tekst';
    const newVal = val.slice(0, start) + `**${inner}**` + val.slice(end);
    setForm(f => ({ ...f, [field]: newVal }));
    requestAnimationFrame(() => {
      ta.selectionStart = start + 2;
      ta.selectionEnd = start + 2 + inner.length;
      ta.focus();
    });
  };

  const insertBullet = (ref: React.RefObject<HTMLTextAreaElement | null>, field: 'description' | 'extended_description') => {
    const ta = ref.current;
    if (!ta) return;
    const start = ta.selectionStart;
    const val = form[field];
    const lineStart = val.lastIndexOf('\n', start - 1) + 1;
    const atLineStart = val.slice(lineStart, start).trim() === '' && lineStart === start;
    const newVal = atLineStart
      ? val.slice(0, lineStart) + '- ' + val.slice(lineStart)
      : val.slice(0, start) + '\n- ' + val.slice(start);
    const newPos = atLineStart ? lineStart + 2 : start + 3;
    setForm(f => ({ ...f, [field]: newVal }));
    requestAnimationFrame(() => {
      ta.selectionStart = ta.selectionEnd = newPos;
      ta.focus();
    });
  };

  const copyLink = (slug: string) => {
    navigator.clipboard.writeText(`${SITE_URL}/vacatures/${slug}`);
    setCopiedId(slug);
    setTimeout(() => setCopiedId(id => id === slug ? null : id), 2000);
  };

  const load = async () => {
    setLoading(true);
    const { data } = await supabase
      .from('vacatures')
      .select('id, title, subtitle, uren_display, salary_display, description, extended_description, image_url, published, created_at, slug')
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
      subtitle: v.subtitle || '',
      uren_display: v.uren_display || '',
      salary_display: v.salary_display || '',
      description: v.description || '',
      extended_description: v.extended_description || '',
      image_url: v.image_url,
      published: v.published,
      slug: v.slug || '',
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
      subtitle: form.subtitle?.trim() || null,
      uren_display: form.uren_display?.trim() || null,
      salary_display: form.salary_display?.trim() || null,
      description: form.description?.trim() || null,
      extended_description: form.extended_description?.trim() || null,
      image_url: form.image_url || null,
      published: form.published,
      slug: form.slug.trim() || null,
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
        <div className="flex flex-wrap items-start justify-between gap-3 mb-8">
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
              className="px-5 py-2.5 text-sm font-bold flex-shrink-0 transition-opacity hover:opacity-80"
              style={{ backgroundColor: '#3b696d', borderRadius: '8px', color: '#ffffff' }}>
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
                  Subtitel
                </label>
                <input
                  type="text"
                  value={form.subtitle}
                  onChange={e => setForm(f => ({ ...f, subtitle: e.target.value }))}
                  className="w-full px-3 py-2 border rounded text-sm outline-none"
                  style={{ borderColor: '#bdeffc', fontFamily: "'Kodchasan', sans-serif" }}
                  placeholder="bijv. Seizoenswerk · Zomer 2025"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-1" style={{ color: '#3b696d' }}>
                  Deelbare link (slug)
                </label>
                <p className="text-xs mb-1" style={{ color: '#9ca3af' }}>
                  Kort en leesbaar, bijv. <code>kok</code> of <code>bediening</code>. Wordt de URL:{' '}
                  <span style={{ color: '#3b696d' }}>werkenbijkaapnoord.nl/vacatures/</span>
                  <strong>{form.slug || '…'}</strong>
                </p>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={form.slug}
                    onChange={e => setForm(f => ({ ...f, slug: e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, '-').replace(/--+/g, '-') }))}
                    className="flex-1 px-3 py-2 border rounded text-sm outline-none"
                    style={{ borderColor: '#bdeffc', fontFamily: 'monospace' }}
                    placeholder="bijv. kok"
                  />
                  <button
                    type="button"
                    onClick={() => setForm(f => ({ ...f, slug: toSlug(f.title) }))}
                    className="px-3 py-2 text-xs font-semibold rounded border"
                    style={{ borderColor: '#bdeffc', color: '#3b696d', backgroundColor: '#f0fafe', fontFamily: "'Kodchasan', sans-serif", whiteSpace: 'nowrap' }}
                  >
                    Genereer
                  </button>
                </div>
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
                  Salaris
                </label>
                <input
                  type="text"
                  value={form.salary_display}
                  onChange={e => setForm(f => ({ ...f, salary_display: e.target.value }))}
                  className="w-full px-3 py-2 border rounded text-sm outline-none"
                  style={{ borderColor: '#bdeffc', fontFamily: "'Kodchasan', sans-serif" }}
                  placeholder="bijv. €14 – €16 per uur  /  In overleg"
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
                <div className="flex items-center gap-2 mb-1.5">
                  <button
                    type="button"
                    onClick={() => insertBullet(descRef, 'description')}
                    className="flex items-center gap-1.5 px-2 py-1 text-xs rounded border"
                    style={{ borderColor: '#bdeffc', color: '#3b696d', backgroundColor: '#f0fafe', fontFamily: "'Kodchasan', sans-serif" }}
                  >
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="10"/><path d="m9 12 2 2 4-4"/>
                    </svg>
                    Opsommingspunt
                  </button>
                  <button
                    type="button"
                    onClick={() => insertBold(descRef, 'description')}
                    className="flex items-center gap-1.5 px-2 py-1 text-xs rounded border"
                    style={{ borderColor: '#bdeffc', color: '#3b696d', backgroundColor: '#f0fafe', fontFamily: "'Kodchasan', sans-serif", fontWeight: 700 }}
                  >
                    B
                  </button>
                </div>
                <textarea
                  ref={descRef}
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
                  Zichtbaar na "Lees de volledige vacaturetekst".
                </p>
                <div className="flex items-center gap-2 mb-1.5">
                  <button
                    type="button"
                    onClick={() => insertBullet(extRef, 'extended_description')}
                    className="flex items-center gap-1.5 px-2 py-1 text-xs rounded border"
                    style={{ borderColor: '#bdeffc', color: '#3b696d', backgroundColor: '#f0fafe', fontFamily: "'Kodchasan', sans-serif" }}
                  >
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="10"/><path d="m9 12 2 2 4-4"/>
                    </svg>
                    Opsommingspunt
                  </button>
                  <button
                    type="button"
                    onClick={() => insertBold(extRef, 'extended_description')}
                    className="flex items-center gap-1.5 px-2 py-1 text-xs rounded border"
                    style={{ borderColor: '#bdeffc', color: '#3b696d', backgroundColor: '#f0fafe', fontFamily: "'Kodchasan', sans-serif", fontWeight: 700 }}
                  >
                    B
                  </button>
                </div>
                <textarea
                  ref={extRef}
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
                  className="px-6 py-2.5 text-sm font-bold disabled:opacity-50"
                  style={{ backgroundColor: '#3b696d', color: '#ffffff' }}>
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
                className="flex items-start gap-3 px-4 py-3 rounded-xl bg-white border"
                style={{ borderColor: v.published ? '#bdeffc' : '#e5e7eb' }}>

                {/* Foto thumbnail */}
                <label
                  title={v.image_url ? 'Foto vervangen' : 'Foto toevoegen'}
                  style={{ cursor: 'pointer', flexShrink: 0, marginTop: '2px' }}>
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
                      style={{ width: '48px', height: '36px', objectFit: 'cover', borderRadius: '6px', display: 'block' }}
                    />
                  ) : (
                    <div
                      style={{ width: '48px', height: '36px', borderRadius: '6px', border: '2px dashed #d1d5db', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="2" strokeLinecap="round">
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
                    {v.uren_display || '—'} · {v.image_url ? 'Foto ✓' : 'Geen foto'}
                  </p>
                  <div className="flex items-center gap-1 flex-wrap mt-2">
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
                    {v.slug && (
                      <button
                        onClick={() => copyLink(v.slug!)}
                        className="px-3 py-1 text-xs font-semibold rounded-full border transition-colors"
                        style={{
                          borderColor: copiedId === v.slug ? '#16a34a' : '#bdeffc',
                          color: copiedId === v.slug ? '#16a34a' : '#3b696d',
                          backgroundColor: copiedId === v.slug ? '#f0fdf4' : '#f0fafe',
                        }}>
                        {copiedId === v.slug ? '✓ Gekopieerd!' : '🔗 Kopieer link'}
                      </button>
                    )}
                    {!v.slug && (
                      <span className="px-3 py-1 text-xs" style={{ color: '#d1d5db' }}>
                        Geen slug — geen link
                      </span>
                    )}
                    <button
                      onClick={() => remove(v.id, v.title)}
                      className="px-3 py-1 text-xs font-semibold hover:underline text-red-500">
                      Verwijderen
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
