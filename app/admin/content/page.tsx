'use client'

import { useEffect, useState, useRef, useCallback } from 'react'
import { supabase } from '@/lib/supabase'

interface ContentItem {
  key: string
  value: string
  label: string
  page: string
  updated_at: string
}

type GroupedContent = Record<string, ContentItem[]>

const PAGE_LABELS: Record<string, string> = {
  homepage: 'Homepage',
  'over-ons': 'Over Ons',
  faq: 'FAQ',
  contact: 'Contact',
}

function TextareaAutoResize({
  value,
  onChange,
  style,
}: {
  value: string
  onChange: (v: string) => void
  style?: React.CSSProperties
}) {
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
      style={{
        border: '1px solid #e5e7eb',
        borderRadius: '6px',
        padding: '8px 12px',
        fontSize: '14px',
        width: '100%',
        fontFamily: 'Kodchasan, sans-serif',
        color: '#1f2937',
        outline: 'none',
        boxSizing: 'border-box',
        resize: 'none',
        overflow: 'hidden',
        minHeight: '60px',
        lineHeight: '1.5',
        ...style,
      }}
      className="content-textarea"
    />
  )
}

export default function ContentAdminPage() {
  const [items, setItems] = useState<ContentItem[]>([])
  const [editValues, setEditValues] = useState<Record<string, string>>({})
  const [loading, setLoading] = useState(true)
  const [savingKey, setSavingKey] = useState<string | null>(null)
  const [savedKey, setSavedKey] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  const fetchContent = useCallback(async () => {
    setLoading(true)
    setError(null)
    const { data, error } = await supabase
      .from('site_content')
      .select('*')
      .order('page', { ascending: true })

    if (error) {
      setError('Fout bij ophalen content: ' + error.message)
    } else {
      setItems(data || [])
      const initial: Record<string, string> = {}
      for (const item of data || []) {
        initial[item.key] = item.value
      }
      setEditValues(initial)
    }
    setLoading(false)
  }, [])

  useEffect(() => {
    fetchContent()
  }, [fetchContent])

  const handleSave = async (key: string) => {
    setSavingKey(key)
    setError(null)

    const { error } = await supabase
      .from('site_content')
      .update({ value: editValues[key], updated_at: new Date().toISOString() })
      .eq('key', key)

    if (error) {
      setError('Fout bij opslaan van "' + key + '": ' + error.message)
    } else {
      setItems(prev =>
        prev.map(i =>
          i.key === key ? { ...i, value: editValues[key], updated_at: new Date().toISOString() } : i
        )
      )
      setSavedKey(key)
      setTimeout(() => setSavedKey(prev => (prev === key ? null : prev)), 2000)
    }
    setSavingKey(null)
  }

  const groupedContent: GroupedContent = {}
  for (const item of items) {
    const page = item.page || 'overig'
    if (!groupedContent[page]) groupedContent[page] = []
    groupedContent[page].push(item)
  }

  const pageOrder = ['homepage', 'over-ons', 'faq', 'contact']
  const sortedPages = [
    ...pageOrder.filter(p => groupedContent[p]),
    ...Object.keys(groupedContent).filter(p => !pageOrder.includes(p)),
  ]

  const btnBase: React.CSSProperties = {
    padding: '6px 14px',
    borderRadius: '6px',
    fontSize: '13px',
    fontFamily: 'Kodchasan, sans-serif',
    cursor: 'pointer',
    border: 'none',
    fontWeight: 600,
  }

  const formatDate = (dateStr: string) => {
    try {
      return new Date(dateStr).toLocaleString('nl-NL', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      })
    } catch {
      return dateStr
    }
  }

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f7faf9', fontFamily: 'Kodchasan, sans-serif' }}>
      <style>{`
        .content-textarea:focus { border-color: #3b696d !important; box-shadow: 0 0 0 2px rgba(59,105,109,0.15); }
      `}</style>

      <div style={{ maxWidth: '56rem', margin: '0 auto', padding: '2rem 1rem' }}>
        {/* Header */}
        <div style={{ marginBottom: '1.5rem' }}>
          <a
            href="/admin/dashboard"
            style={{ fontSize: '13px', color: '#3b696d', textDecoration: 'none', fontWeight: 600 }}
          >
            ← Dashboard
          </a>
          <h1 style={{ fontSize: '1.75rem', fontWeight: 700, color: '#1f2937', margin: '0.25rem 0 0' }}>
            Content Beheer
          </h1>
          <p style={{ color: '#6b7280', fontSize: '14px', margin: '0.25rem 0 0' }}>
            Bewerk teksten per pagina
          </p>
        </div>

        {/* Error */}
        {error && (
          <div style={{
            backgroundColor: '#fef2f2',
            border: '1px solid #fca5a5',
            borderRadius: '8px',
            padding: '12px 16px',
            color: '#dc2626',
            fontSize: '14px',
            marginBottom: '1rem',
          }}>
            {error}
          </div>
        )}

        {/* Loading */}
        {loading ? (
          <div style={{ textAlign: 'center', padding: '3rem', color: '#6b7280' }}>
            Laden…
          </div>
        ) : items.length === 0 ? (
          <div style={{
            backgroundColor: '#fff',
            borderRadius: '12px',
            border: '2px solid #bdeffc',
            padding: '2rem',
            textAlign: 'center',
            color: '#6b7280',
            fontSize: '14px',
          }}>
            Geen content gevonden in de database.
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
            {sortedPages.map(page => (
              <div key={page}>
                {/* Page group heading */}
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  marginBottom: '12px',
                }}>
                  <h2 style={{
                    fontSize: '18px',
                    fontWeight: 700,
                    color: '#3b696d',
                    margin: 0,
                    whiteSpace: 'nowrap',
                  }}>
                    {PAGE_LABELS[page] || page.charAt(0).toUpperCase() + page.slice(1)}
                  </h2>
                  <div style={{ flex: 1, height: '2px', backgroundColor: '#bdeffc', borderRadius: '2px' }} />
                </div>

                {/* Content items */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {groupedContent[page].map(item => {
                    const isSaving = savingKey === item.key
                    const isSaved = savedKey === item.key
                    const isDirty = editValues[item.key] !== item.value

                    return (
                      <div
                        key={item.key}
                        style={{
                          backgroundColor: '#fff',
                          borderRadius: '12px',
                          border: '2px solid #bdeffc',
                          padding: '16px',
                        }}
                      >
                        {/* Item label row */}
                        <div style={{
                          display: 'flex',
                          alignItems: 'flex-start',
                          justifyContent: 'space-between',
                          gap: '12px',
                          marginBottom: '10px',
                        }}>
                          <div>
                            <div style={{ fontSize: '15px', fontWeight: 700, color: '#1f2937' }}>
                              {item.label || item.key}
                            </div>
                            <div style={{ fontSize: '11px', color: '#9ca3af', marginTop: '2px', fontFamily: 'monospace' }}>
                              {item.key}
                            </div>
                          </div>
                          <div style={{ fontSize: '11px', color: '#d1d5db', whiteSpace: 'nowrap', flexShrink: 0, paddingTop: '2px' }}>
                            {formatDate(item.updated_at)}
                          </div>
                        </div>

                        {/* Textarea */}
                        <TextareaAutoResize
                          value={editValues[item.key] ?? item.value}
                          onChange={v =>
                            setEditValues(prev => ({ ...prev, [item.key]: v }))
                          }
                        />

                        {/* Save row */}
                        <div style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'flex-end',
                          gap: '10px',
                          marginTop: '10px',
                        }}>
                          {isSaved && (
                            <span style={{
                              fontSize: '13px',
                              color: '#16a34a',
                              fontWeight: 600,
                              transition: 'opacity 0.3s',
                            }}>
                              Opgeslagen!
                            </span>
                          )}
                          {isDirty && !isSaved && (
                            <span style={{ fontSize: '12px', color: '#f59e0b' }}>
                              Niet opgeslagen
                            </span>
                          )}
                          <button
                            onClick={() => handleSave(item.key)}
                            disabled={isSaving || !isDirty}
                            style={{
                              ...btnBase,
                              backgroundColor: isDirty && !isSaving ? '#3b696d' : '#d1d5db',
                              color: '#fff',
                              cursor: isDirty && !isSaving ? 'pointer' : 'not-allowed',
                            }}
                          >
                            {isSaving ? 'Opslaan…' : 'Opslaan'}
                          </button>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
