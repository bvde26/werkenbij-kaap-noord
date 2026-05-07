'use client';

import { useEffect, useRef, useState } from 'react';
import { supabase } from '@/lib/supabase';

const PAGE = 'over-ons';
const MAX_FILE_SIZE = 8 * 1024 * 1024; // 8MB
const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/webp'];
const MIN_WIDTH = 400;

interface MediaItem {
  id: string;
  url: string;
  storage_path: string | null;
  page: string;
  alt_text: string;
  order_index: number;
  created_at: string;
}

export default function MediaAdminPage() {
  const [items, setItems] = useState<MediaItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [fetchError, setFetchError] = useState<string | null>(null);

  // Upload state
  const [file, setFile] = useState<File | null>(null);
  const [altText, setAltText] = useState('');
  const [validationError, setValidationError] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [uploadStatus, setUploadStatus] = useState<string>('Foto uploaden');
  const [uploadError, setUploadError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Delete state
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [deleteError, setDeleteError] = useState<string | null>(null);

  // Reorder state
  const [reorderingId, setReorderingId] = useState<string | null>(null);

  async function fetchItems() {
    setLoading(true);
    setFetchError(null);
    const { data, error } = await supabase
      .from('media_items')
      .select('*')
      .eq('page', PAGE)
      .order('order_index', { ascending: true });
    if (error) {
      setFetchError(error.message);
    } else {
      setItems(data || []);
    }
    setLoading(false);
  }

  useEffect(() => {
    fetchItems();
  }, []);

  function validateFile(f: File): Promise<string | null> {
    return new Promise((resolve) => {
      if (!ALLOWED_TYPES.includes(f.type)) {
        return resolve('Alleen JPG, PNG en WebP zijn toegestaan');
      }
      if (f.size > MAX_FILE_SIZE) {
        return resolve('Bestand mag maximaal 8MB zijn');
      }
      const url = URL.createObjectURL(f);
      const img = new Image();
      img.onload = () => {
        URL.revokeObjectURL(url);
        if (img.width < MIN_WIDTH) {
          resolve(`Afbeelding te klein (${img.width}×${img.height}px, minimaal 400px breed)`);
        } else {
          resolve(null);
        }
      };
      img.onerror = () => {
        URL.revokeObjectURL(url);
        resolve('Kan afbeelding niet lezen');
      };
      img.src = url;
    });
  }

  async function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    setValidationError(null);
    setUploadError(null);
    const f = e.target.files?.[0] ?? null;
    setFile(f);
    if (f) {
      const err = await validateFile(f);
      if (err) {
        setValidationError(err);
        setFile(null);
        if (fileInputRef.current) fileInputRef.current.value = '';
      }
    }
  }

  function compressImage(f: File): Promise<Blob> {
    return new Promise((resolve) => {
      const img = new Image();
      img.onload = () => {
        const maxW = 1600;
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

  async function handleUpload() {
    if (!file) return;
    setUploadError(null);
    setValidationError(null);

    // Re-validate before upload
    const err = await validateFile(file);
    if (err) {
      setValidationError(err);
      return;
    }

    setUploading(true);
    setUploadStatus('Afbeelding comprimeren…');
    try {
      const compressed = await compressImage(file);
      setUploadStatus('Uploaden…');
      const baseName = file.name.replace(/\.[^.]+$/, '').replace(/[^a-zA-Z0-9._-]/g, '_');
      const storagePath = `${PAGE}/${Date.now()}-${baseName}.webp`;

      const { error: storageError } = await supabase.storage
        .from('media')
        .upload(storagePath, compressed, { upsert: false, contentType: 'image/webp' });

      if (storageError) {
        setUploadError(`Upload mislukt: ${storageError.message}`);
        setUploading(false);
        return;
      }

      const { data: urlData } = supabase.storage
        .from('media')
        .getPublicUrl(storagePath);

      const publicUrl = urlData.publicUrl;

      const nextIndex = items.length > 0
        ? Math.max(...items.map((i) => i.order_index)) + 1
        : 0;

      const { error: dbError } = await supabase.from('media_items').insert([{
        url: publicUrl,
        storage_path: storagePath,
        page: PAGE,
        alt_text: altText.trim(),
        order_index: nextIndex,
      }]);

      if (dbError) {
        setUploadError(`Database fout: ${dbError.message}`);
        setUploading(false);
        return;
      }

      // Reset form
      setFile(null);
      setAltText('');
      if (fileInputRef.current) fileInputRef.current.value = '';
      setUploadStatus('Foto uploaden');
      await fetchItems();
    } catch (e: unknown) {
      setUploadError(`Onverwachte fout: ${e instanceof Error ? e.message : String(e)}`);
    }
    setUploading(false);
    setUploadStatus('Foto uploaden');
  }

  async function handleDelete(item: MediaItem) {
    setDeleteError(null);
    setDeletingId(item.id);
    try {
      if (item.storage_path) {
        const { error: storageError } = await supabase.storage
          .from('media')
          .remove([item.storage_path]);
        if (storageError) {
          setDeleteError(`Storage fout: ${storageError.message}`);
          setDeletingId(null);
          return;
        }
      }

      const { error: dbError } = await supabase
        .from('media_items')
        .delete()
        .eq('id', item.id);

      if (dbError) {
        setDeleteError(`Database fout: ${dbError.message}`);
        setDeletingId(null);
        return;
      }

      await fetchItems();
    } catch (e: unknown) {
      setDeleteError(`Onverwachte fout: ${e instanceof Error ? e.message : String(e)}`);
    }
    setDeletingId(null);
  }

  async function handleReorder(index: number, direction: 'up' | 'down') {
    const swapIndex = direction === 'up' ? index - 1 : index + 1;
    if (swapIndex < 0 || swapIndex >= items.length) return;

    const a = items[index];
    const b = items[swapIndex];
    setReorderingId(a.id);

    const { error: errA } = await supabase
      .from('media_items')
      .update({ order_index: b.order_index })
      .eq('id', a.id);

    const { error: errB } = await supabase
      .from('media_items')
      .update({ order_index: a.order_index })
      .eq('id', b.id);

    if (errA || errB) {
      setDeleteError(`Volgorde kon niet worden opgeslagen`);
    } else {
      await fetchItems();
    }
    setReorderingId(null);
  }

  const fontStyle = { fontFamily: "'Kodchasan', sans-serif" };
  const cardStyle = {
    backgroundColor: '#ffffff',
    borderRadius: '12px',
    border: '2px solid #bdeffc',
    padding: '24px',
  };
  const btnPrimary: React.CSSProperties = {
    backgroundColor: '#3b696d',
    color: '#ffffff',
    border: 'none',
    borderRadius: '8px',
    padding: '10px 20px',
    cursor: 'pointer',
    fontFamily: "'Kodchasan', sans-serif",
    fontWeight: 600,
    fontSize: '14px',
  };
  const btnDisabled: React.CSSProperties = {
    ...btnPrimary,
    backgroundColor: '#9cbbbd',
    cursor: 'not-allowed',
  };

  return (
    <div className="min-h-screen p-8" style={{ backgroundColor: '#f7faf9', ...fontStyle }}>
      <style>{`
        .media-del-btn { color: #dc2626; background: none; border: none; cursor: pointer; font-size: 13px; font-family: 'Kodchasan', sans-serif; font-weight: 600; padding: 4px 0; }
        .media-del-btn:hover:not(:disabled) { color: #991b1b; }
        .media-del-btn:disabled { color: #f87171; cursor: not-allowed; }
        .media-arrow-btn { background: none; border: 1px solid #bdeffc; border-radius: 6px; width: 28px; height: 28px; display: flex; align-items: center; justify-content: center; cursor: pointer; color: #3b696d; }
        .media-arrow-btn:hover:not(:disabled) { background-color: #bdeffc; }
        .media-arrow-btn:disabled { opacity: 0.3; cursor: not-allowed; }
        .media-file-input { border: 1px solid #bdeffc; border-radius: 8px; padding: 8px 12px; font-family: 'Kodchasan', sans-serif; font-size: 14px; width: 100%; background: white; cursor: pointer; }
        .media-text-input { border: 1px solid #bdeffc; border-radius: 8px; padding: 8px 12px; font-family: 'Kodchasan', sans-serif; font-size: 14px; width: 100%; outline: none; }
        .media-text-input:focus { border-color: #3b696d; }
      `}</style>

      <div style={{ maxWidth: '896px', margin: '0 auto' }}>
        {/* Header */}
        <h1 className="text-3xl font-bold mb-1" style={{ color: '#3b696d' }}>
          Media beheer
        </h1>
        <p className="text-sm mb-10" style={{ color: '#6b7280' }}>
          Kaap Noord — foto&apos;s &ldquo;Over ons&rdquo; pagina
        </p>

        {/* Current photos */}
        <div style={{ ...cardStyle, marginBottom: '32px' }}>
          <h2 className="font-bold text-lg mb-4" style={{ color: '#3b696d' }}>
            Huidige foto&apos;s
          </h2>

          {loading && (
            <p style={{ color: '#6b7280', fontSize: '14px' }}>Laden…</p>
          )}

          {fetchError && (
            <p style={{ color: '#dc2626', fontSize: '14px' }}>Fout: {fetchError}</p>
          )}

          {deleteError && (
            <p style={{ color: '#dc2626', fontSize: '14px', marginBottom: '12px' }}>
              {deleteError}
            </p>
          )}

          {!loading && !fetchError && items.length === 0 && (
            <p style={{ color: '#6b7280', fontSize: '14px' }}>
              Nog geen foto&apos;s toegevoegd. Upload je eerste foto hieronder.
            </p>
          )}

          {!loading && items.length > 0 && (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))', gap: '16px' }}>
              {items.map((item, index) => (
                <div key={item.id} style={{
                  border: '1px solid #e5f4fd',
                  borderRadius: '10px',
                  overflow: 'hidden',
                  backgroundColor: '#f7faf9',
                  position: 'relative',
                }}>
                  {/* Thumbnail */}
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={item.url}
                    alt={item.alt_text || 'Foto'}
                    style={{
                      width: '100%',
                      height: '80px',
                      objectFit: 'cover',
                      display: 'block',
                    }}
                  />

                  {/* Alt text + controls */}
                  <div style={{ padding: '8px' }}>
                    <p style={{
                      fontSize: '11px',
                      color: '#6b7280',
                      marginBottom: '8px',
                      minHeight: '16px',
                      wordBreak: 'break-word',
                      lineHeight: '1.3',
                    }}>
                      {item.alt_text || <em>geen alt tekst</em>}
                    </p>

                    {/* Reorder + delete row */}
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '4px' }}>
                      <div style={{ display: 'flex', gap: '4px' }}>
                        <button
                          className="media-arrow-btn"
                          title="Omhoog"
                          disabled={index === 0 || reorderingId !== null}
                          onClick={() => handleReorder(index, 'up')}
                          aria-label="Omhoog"
                        >
                          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M18 15l-6-6-6 6" />
                          </svg>
                        </button>
                        <button
                          className="media-arrow-btn"
                          title="Omlaag"
                          disabled={index === items.length - 1 || reorderingId !== null}
                          onClick={() => handleReorder(index, 'down')}
                          aria-label="Omlaag"
                        >
                          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M6 9l6 6 6-6" />
                          </svg>
                        </button>
                      </div>

                      <button
                        className="media-del-btn"
                        disabled={deletingId === item.id}
                        onClick={() => handleDelete(item)}
                      >
                        {deletingId === item.id ? 'Verwijderen…' : 'Verwijder'}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Upload form */}
        <div style={cardStyle}>
          <h2 className="font-bold text-lg mb-4" style={{ color: '#3b696d' }}>
            Nieuwe foto uploaden
          </h2>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {/* File input */}
            <div>
              <label style={{ fontSize: '13px', fontWeight: 600, color: '#374151', display: 'block', marginBottom: '6px' }}>
                Afbeelding <span style={{ color: '#6b7280', fontWeight: 400 }}>(JPG, PNG, WebP — max 8MB, min 400px breed)</span>
              </label>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/jpeg,image/png,image/webp"
                className="media-file-input"
                onChange={handleFileChange}
                disabled={uploading}
              />
              {validationError && (
                <p style={{ color: '#dc2626', fontSize: '13px', marginTop: '6px' }}>
                  {validationError}
                </p>
              )}
              {file && !validationError && (
                <p style={{ color: '#3b696d', fontSize: '13px', marginTop: '6px' }}>
                  ✓ {file.name} ({(file.size / 1024 / 1024).toFixed(1)} MB)
                </p>
              )}
            </div>

            {/* Alt text input */}
            <div>
              <label style={{ fontSize: '13px', fontWeight: 600, color: '#374151', display: 'block', marginBottom: '6px' }}>
                Alt tekst <span style={{ color: '#6b7280', fontWeight: 400 }}>(optioneel — beschrijving voor schermlezers)</span>
              </label>
              <input
                type="text"
                className="media-text-input"
                placeholder="bijv. Team bij het terras op een zonnige dag"
                value={altText}
                onChange={(e) => setAltText(e.target.value)}
                disabled={uploading}
                maxLength={200}
              />
            </div>

            {/* Upload error */}
            {uploadError && (
              <p style={{ color: '#dc2626', fontSize: '13px' }}>
                {uploadError}
              </p>
            )}

            {/* Upload button */}
            <div>
              <button
                style={!file || uploading ? btnDisabled : btnPrimary}
                disabled={!file || uploading || !!validationError}
                onClick={handleUpload}
              >
                {uploadStatus}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
