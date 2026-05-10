'use client'

import { useEffect, useState, useCallback } from 'react'
import { supabase } from '@/lib/supabase'
import Link from 'next/link'

const PAGE = 'over-ons'
const PREFIX = 'over_ons_voordeel_'

interface Voordeel {
  num: number
  titel: string
  tekst: string
  titelDirty: boolean
  tekstDirty: boolean
}

export default function VoordelenAdminPage() {
  const [voordelen, setVoordelen] = useState<Voordeel[]>([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState<string | null>(null)
  const [saved, setSaved] = useState<string | null>(null)
  const [deleting, setDeleting] = useState<number | null>(null)
  const [adding, setAdding] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const load = useCallback(async () => {
    setLoading(true)
    const { data, error } = await supabase
      .from('site_content')
      .select('key, value')
      .eq('page', PAGE)
      .like('key', `${PREFIX}%`)

    if (error) { setError(error.message); setLoading(false); return }

    const map: Record<string, string> = {}
    for (const row of data || []) map[row.key] = row.value

    const nums = new Set<number>()
    for (const key of Object.keys(map)) {
      const m = key.match(/^over_ons_voordeel_(\d+)_(titel|tekst)$/)
      if (m) nums.add(parseInt(m[1]))
    }

    setVoordelen(
      Array.from(nums).sort((a, b) => a - b).map(num => ({
        num,
        titel: map[`${PREFIX}${num}_titel`] || '',
        tekst: map[`${PREFIX}${num}_tekst`] || '',
        titelDirty: false,
        tekstDirty: false,
      }))
    )
    setLoading(false)
  }, [])

  useEffect(() => { load() }, [load])

  const update = (num: number, field: 'titel' | 'tekst', value: string) =>
    setVoordelen(prev => prev.map(v =>
      v.num === num ? { ...v, [field]: value, [`${field}Dirty`]: true } : v
    ))

  const save = async (num: number, field: 'titel' | 'tekst') => {
    const v = voordelen.find(v => v.num === num)
    if (!v) return
    const id = `${num}_${field}`
    setSaving(id)
    const { error } = await supabase
      .from('site_content')
      .update({ value: v[field], updated_at: new Date().toISOString() })
      .eq('key', `${PREFIX}${num}_${field}`)
    if (error) setError(error.message)
    else {
      setVoordelen(prev => prev.map(v => v.num === num ? { ...v, [`${field}Dirty`]: false } : v))
      setSaved(id)
      setTimeout(() => setSaved(s => s === id ? null : s), 2000)
    }
    setSaving(null)
  }

  const deleteVoordeel = async (num: number) => {
    if (!confirm(`Voordeel verwijderen?`)) return
    setDeleting(num)
    await supabase.from('site_content').delete().eq('key', `${PREFIX}${num}_titel`)
    await supabase.from('site_content').delete().eq('key', `${PREFIX}${num}_tekst`)
    await load()
    setDeleting(null)
  }

  const addVoordeel = async () => {
    setAdding(true)
    const maxNum = voordelen.length > 0 ? Math.max(...voordelen.map(v => v.num)) : 0
    const n = maxNum + 1
    await supabase.from('site_content').insert([
      { key: `${PREFIX}${n}_titel`, value: '', label: `Voordeel ${n} — titel`, page: PAGE },
      { key: `${PREFIX}${n}_tekst`, value: '', label: `Voordeel ${n} — tekst`, page: PAGE },
    ])
    await load()
    setAdding(false)
  }

  const btnSave = (dirty: boolean, id: string): React.CSSProperties => ({
    padding: '8px 14px', borderRadius: '6px', fontSize: '12px', fontWeight: 600,
    border: 'none', fontFamily: 'Kodchasan, sans-serif', whiteSpace: 'nowrap',
    cursor: dirty ? 'pointer' : 'not-allowed',
    backgroundColor: saved === id ? '#16a34a' : dirty ? '#3b696d' : '#d1d5db',
    color: '#fff',
  })

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f7faf9', fontFamily: 'Kodchasan, sans-serif', padding: '1.5rem 1rem' }}>
      <style>{`.vd-input:focus { border-color: #3b696d !important; box-shadow: 0 0 0 2px rgba(59,105,109,0.15); }`}</style>
      <div style={{ maxWidth: '48rem', margin: '0 auto' }}>

        <Link href="/admin/dashboard" style={{ fontSize: '13px', color: '#3b696d', fontWeight: 600, textDecoration: 'none' }}>
          ← Dashboard
        </Link>
        <h1 style={{ fontSize: '1.75rem', fontWeight: 700, color: '#1f2937', margin: '0.25rem 0 0' }}>
          Voordelen beheer
        </h1>
        <p style={{ color: '#6b7280', fontSize: '14px', margin: '0.25rem 0 1.5rem' }}>
          &ldquo;Werken bij ons&rdquo; — Over ons pagina
        </p>

        {error && (
          <div style={{ background: '#fef2f2', border: '1px solid #fca5a5', borderRadius: '8px', padding: '12px 16px', color: '#dc2626', fontSize: '14px', marginBottom: '1rem' }}>
            {error}
          </div>
        )}

        {loading ? (
          <div style={{ textAlign: 'center', padding: '3rem', color: '#6b7280' }}>Laden…</div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {voordelen.map((v, idx) => (
              <div key={v.num} style={{ background: '#fff', borderRadius: '12px', border: '2px solid #bdeffc', padding: '16px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                  <span style={{ fontSize: '13px', fontWeight: 700, color: '#3b696d' }}>Voordeel {idx + 1}</span>
                  <button
                    onClick={() => deleteVoordeel(v.num)}
                    disabled={deleting === v.num}
                    style={{ background: 'none', border: 'none', color: '#dc2626', fontSize: '12px', fontWeight: 600, cursor: 'pointer', fontFamily: 'Kodchasan, sans-serif' }}
                  >
                    {deleting === v.num ? 'Verwijderen…' : 'Verwijder'}
                  </button>
                </div>

                <div style={{ marginBottom: '10px' }}>
                  <label style={{ fontSize: '12px', fontWeight: 600, color: '#6b7280', display: 'block', marginBottom: '4px' }}>Titel</label>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <input
                      type="text"
                      value={v.titel}
                      onChange={e => update(v.num, 'titel', e.target.value)}
                      className="vd-input"
                      style={{ flex: 1, border: '1px solid #e5e7eb', borderRadius: '6px', padding: '8px 12px', fontSize: '14px', fontFamily: 'Kodchasan, sans-serif', outline: 'none' }}
                    />
                    <button onClick={() => save(v.num, 'titel')} disabled={!v.titelDirty || saving === `${v.num}_titel`} style={btnSave(v.titelDirty, `${v.num}_titel`)}>
                      {saving === `${v.num}_titel` ? '…' : saved === `${v.num}_titel` ? 'Opgeslagen!' : 'Opslaan'}
                    </button>
                  </div>
                </div>

                <div>
                  <label style={{ fontSize: '12px', fontWeight: 600, color: '#6b7280', display: 'block', marginBottom: '4px' }}>Tekst</label>
                  <div style={{ display: 'flex', gap: '8px', alignItems: 'flex-start' }}>
                    <textarea
                      value={v.tekst}
                      onChange={e => update(v.num, 'tekst', e.target.value)}
                      rows={3}
                      className="vd-input"
                      style={{ flex: 1, border: '1px solid #e5e7eb', borderRadius: '6px', padding: '8px 12px', fontSize: '14px', fontFamily: 'Kodchasan, sans-serif', outline: 'none', resize: 'vertical' }}
                    />
                    <button onClick={() => save(v.num, 'tekst')} disabled={!v.tekstDirty || saving === `${v.num}_tekst`} style={btnSave(v.tekstDirty, `${v.num}_tekst`)}>
                      {saving === `${v.num}_tekst` ? '…' : saved === `${v.num}_tekst` ? 'Opgeslagen!' : 'Opslaan'}
                    </button>
                  </div>
                </div>
              </div>
            ))}

            <button
              onClick={addVoordeel}
              disabled={adding}
              style={{ padding: '14px', borderRadius: '12px', border: '2px dashed #bdeffc', background: 'transparent', color: '#3b696d', fontSize: '14px', fontWeight: 700, cursor: adding ? 'not-allowed' : 'pointer', fontFamily: 'Kodchasan, sans-serif', transition: 'border-color 0.15s' }}
            >
              {adding ? 'Toevoegen…' : '+ Voordeel toevoegen'}
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
