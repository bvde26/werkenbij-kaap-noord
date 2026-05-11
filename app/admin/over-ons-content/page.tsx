'use client'

import { useEffect, useState, useRef, useCallback } from 'react'
import { supabase } from '@/lib/supabase'
import Link from 'next/link'

const FIELDS = [
  { key: 'over_ons_h1',        label: 'Pagina kop',      hint: 'Grote kop bovenaan de pagina' },
  { key: 'over_ons_tekst_1',   label: 'Tekst blok 1',    hint: '' },
  { key: 'over_ons_tekst_2',   label: 'Tekst blok 2',    hint: '' },
  { key: 'over_ons_tekst_3',   label: 'Tekst blok 3',    hint: '' },
  { key: 'over_ons_werken_kop', label: '"Werken bij ons" kop', hint: 'Kop van de voordelen-sectie' },
]

function TextareaAutoResize({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  const ref = useRef<HTMLTextAreaElement>(null)
  useEffect(() => {
    if (ref.current) {
      ref.current.style.height = 'auto'
      ref.current.style.height = ref.current.scrollHeight + 'px'
    }
  }, [value])
  return (
    <textarea
      ref={ref}
      value={value}
      onChange={e => onChange(e.target.value)}
      className="oo-input"
      style={{ border: '1px solid #e5e7eb', borderRadius: '6px', padding: '8px 12px', fontSize: '14px', width: '100%', fontFamily: 'Kodchasan, sans-serif', color: '#1f2937', outline: 'none', boxSizing: 'border-box', resize: 'none', overflow: 'hidden', minHeight: '60px', lineHeight: '1.5' }}
    />
  )
}

export default function OverOnsContentAdminPage() {
  const [values, setValues] = useState<Record<string, string>>({})
  const [saved, setSaved] = useState<Record<string, string>>({})
  const [saving, setSaving] = useState<string | null>(null)
  const [savedKey, setSavedKey] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const load = useCallback(async () => {
    setLoading(true)
    const { data, error } = await supabase
      .from('site_content')
      .select('key, value')
      .in('key', FIELDS.map(f => f.key))
    if (error) { setError(error.message); setLoading(false); return }
    const map: Record<string, string> = {}
    for (const row of data || []) map[row.key] = row.value
    setValues(map)
    setSaved(map)
    setLoading(false)
  }, [])

  useEffect(() => { load() }, [load])

  const handleSave = async (key: string) => {
    setSaving(key)
    const { error } = await supabase
      .from('site_content')
      .update({ value: values[key] ?? '', updated_at: new Date().toISOString() })
      .eq('key', key)
    if (error) setError(error.message)
    else {
      setSaved(prev => ({ ...prev, [key]: values[key] ?? '' }))
      setSavedKey(key)
      setTimeout(() => setSavedKey(k => k === key ? null : k), 2000)
    }
    setSaving(null)
  }

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f7faf9', fontFamily: 'Kodchasan, sans-serif', padding: '1.5rem 1rem' }}>
      <style>{`.oo-input:focus { border-color: #3b696d !important; box-shadow: 0 0 0 2px rgba(59,105,109,0.15); }`}</style>
      <div style={{ maxWidth: '48rem', margin: '0 auto' }}>
        <Link href="/admin/dashboard" style={{ fontSize: '13px', color: '#3b696d', fontWeight: 600, textDecoration: 'none' }}>← Dashboard</Link>
        <h1 style={{ fontSize: '1.75rem', fontWeight: 700, color: '#1f2937', margin: '0.25rem 0 0' }}>Over ons</h1>
        <p style={{ color: '#6b7280', fontSize: '14px', margin: '0.25rem 0 1.5rem' }}>Pagina kop en tekst blokken</p>

        {error && (
          <div style={{ background: '#fef2f2', border: '1px solid #fca5a5', borderRadius: '8px', padding: '12px 16px', color: '#dc2626', fontSize: '14px', marginBottom: '1rem' }}>{error}</div>
        )}

        {loading ? (
          <div style={{ textAlign: 'center', padding: '3rem', color: '#6b7280' }}>Laden…</div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {FIELDS.map(f => {
              const isDirty = (values[f.key] ?? '') !== (saved[f.key] ?? '')
              const isSaving = saving === f.key
              const isSaved = savedKey === f.key
              return (
                <div key={f.key} style={{ background: '#fff', borderRadius: '12px', border: '2px solid #bdeffc', padding: '16px' }}>
                  <div style={{ marginBottom: '8px' }}>
                    <div style={{ fontSize: '15px', fontWeight: 700, color: '#1f2937' }}>{f.label}</div>
                    {f.hint && <div style={{ fontSize: '12px', color: '#9ca3af', marginTop: '2px' }}>{f.hint}</div>}
                  </div>
                  <TextareaAutoResize
                    value={values[f.key] ?? ''}
                    onChange={v => setValues(prev => ({ ...prev, [f.key]: v }))}
                  />
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '10px', marginTop: '10px' }}>
                    {isSaved && <span style={{ fontSize: '13px', color: '#16a34a', fontWeight: 600 }}>Opgeslagen!</span>}
                    {isDirty && !isSaved && <span style={{ fontSize: '12px', color: '#f59e0b' }}>Niet opgeslagen</span>}
                    <button
                      onClick={() => handleSave(f.key)}
                      disabled={!isDirty || isSaving}
                      style={{ padding: '8px 14px', borderRadius: '6px', fontSize: '12px', fontWeight: 600, border: 'none', fontFamily: 'Kodchasan, sans-serif', cursor: isDirty && !isSaving ? 'pointer' : 'not-allowed', backgroundColor: isDirty ? '#3b696d' : '#d1d5db', color: '#fff' }}
                    >
                      {isSaving ? '…' : 'Opslaan'}
                    </button>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}
