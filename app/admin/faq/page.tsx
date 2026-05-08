'use client'

import { useEffect, useState, useCallback } from 'react'
import { supabase } from '@/lib/supabase'

interface FaqItem {
  id: string
  question: string
  answer: string
  order_index: number
  published: boolean
  created_at: string
}

export default function FaqAdminPage() {
  const [items, setItems] = useState<FaqItem[]>([])
  const [loading, setLoading] = useState(true)
  const [expandedId, setExpandedId] = useState<string | null>(null)
  const [editData, setEditData] = useState<Record<string, { question: string; answer: string }>>({})
  const [savingId, setSavingId] = useState<string | null>(null)
  const [deletingId, setDeletingId] = useState<string | null>(null)
  const [togglingId, setTogglingId] = useState<string | null>(null)
  const [movingId, setMovingId] = useState<string | null>(null)
  const [newQuestion, setNewQuestion] = useState('')
  const [newAnswer, setNewAnswer] = useState('')
  const [addingNew, setAddingNew] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetchItems = useCallback(async () => {
    setLoading(true)
    setError(null)
    const { data, error } = await supabase
      .from('faq_items')
      .select('*')
      .order('order_index', { ascending: true })

    if (error) {
      setError('Fout bij ophalen FAQ items: ' + error.message)
    } else {
      setItems(data || [])
      const initial: Record<string, { question: string; answer: string }> = {}
      for (const item of data || []) {
        initial[item.id] = { question: item.question, answer: item.answer }
      }
      setEditData(initial)
    }
    setLoading(false)
  }, [])

  useEffect(() => {
    fetchItems()
  }, [fetchItems])

  const toggleExpand = (id: string) => {
    setExpandedId(prev => (prev === id ? null : id))
  }

  const handleTogglePublished = async (item: FaqItem) => {
    setTogglingId(item.id)
    const { error } = await supabase
      .from('faq_items')
      .update({ published: !item.published })
      .eq('id', item.id)

    if (error) {
      setError('Fout bij updaten publicatiestatus: ' + error.message)
    } else {
      setItems(prev =>
        prev.map(i => (i.id === item.id ? { ...i, published: !item.published } : i))
      )
    }
    setTogglingId(null)
  }

  const handleSave = async (id: string) => {
    setSavingId(id)
    setError(null)
    const data = editData[id]
    const { error } = await supabase
      .from('faq_items')
      .update({ question: data.question, answer: data.answer })
      .eq('id', id)

    if (error) {
      setError('Fout bij opslaan: ' + error.message)
    } else {
      setItems(prev =>
        prev.map(i => (i.id === id ? { ...i, question: data.question, answer: data.answer } : i))
      )
      setExpandedId(null)
    }
    setSavingId(null)
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Weet je zeker dat je dit FAQ-item wilt verwijderen?')) return
    setDeletingId(id)
    setError(null)
    const { error } = await supabase.from('faq_items').delete().eq('id', id)
    if (error) {
      setError('Fout bij verwijderen: ' + error.message)
    } else {
      setItems(prev => prev.filter(i => i.id !== id))
    }
    setDeletingId(null)
  }

  const handleMove = async (id: string, direction: 'up' | 'down') => {
    const index = items.findIndex(i => i.id === id)
    if (direction === 'up' && index === 0) return
    if (direction === 'down' && index === items.length - 1) return

    const swapIndex = direction === 'up' ? index - 1 : index + 1
    const current = items[index]
    const swapWith = items[swapIndex]

    setMovingId(id)
    setError(null)

    const [r1, r2] = await Promise.all([
      supabase.from('faq_items').update({ order_index: swapWith.order_index }).eq('id', current.id),
      supabase.from('faq_items').update({ order_index: current.order_index }).eq('id', swapWith.id),
    ])

    if (r1.error || r2.error) {
      setError('Fout bij herordenen')
    } else {
      const newItems = [...items]
      newItems[index] = { ...current, order_index: swapWith.order_index }
      newItems[swapIndex] = { ...swapWith, order_index: current.order_index }
      newItems.sort((a, b) => a.order_index - b.order_index)
      setItems(newItems)
    }
    setMovingId(null)
  }

  const handleAddNew = async () => {
    if (!newQuestion.trim() || !newAnswer.trim()) return
    setAddingNew(true)
    setError(null)

    const maxOrder = items.length > 0 ? Math.max(...items.map(i => i.order_index)) : 0
    const { data, error } = await supabase
      .from('faq_items')
      .insert({
        question: newQuestion.trim(),
        answer: newAnswer.trim(),
        order_index: maxOrder + 1,
        published: false,
      })
      .select()
      .single()

    if (error) {
      setError('Fout bij toevoegen: ' + error.message)
    } else {
      setItems(prev => [...prev, data])
      setEditData(prev => ({ ...prev, [data.id]: { question: data.question, answer: data.answer } }))
      setNewQuestion('')
      setNewAnswer('')
    }
    setAddingNew(false)
  }

  const inputStyle: React.CSSProperties = {
    border: '1px solid #e5e7eb',
    borderRadius: '6px',
    padding: '8px 12px',
    fontSize: '14px',
    width: '100%',
    fontFamily: 'Kodchasan, sans-serif',
    color: '#1f2937',
    outline: 'none',
    boxSizing: 'border-box',
  }

  const btnBase: React.CSSProperties = {
    padding: '6px 14px',
    borderRadius: '6px',
    fontSize: '13px',
    fontFamily: 'Kodchasan, sans-serif',
    cursor: 'pointer',
    border: 'none',
    fontWeight: 600,
  }

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f7faf9', fontFamily: 'Kodchasan, sans-serif' }}>
      <style>{`
        .faq-textarea { resize: vertical; }
        .faq-input:focus { border-color: #3b696d !important; box-shadow: 0 0 0 2px rgba(59,105,109,0.15); }
        .faq-btn-icon { transition: background 0.15s; }
        .faq-btn-icon:hover { background: #e5e7eb !important; }
      `}</style>

      <div style={{ maxWidth: '56rem', margin: '0 auto', padding: '2rem 1rem' }}>
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
          <div>
            <a
              href="/admin/dashboard"
              style={{ fontSize: '13px', color: '#3b696d', textDecoration: 'none', fontWeight: 600 }}
            >
              ← Dashboard
            </a>
            <h1 style={{ fontSize: '1.75rem', fontWeight: 700, color: '#1f2937', margin: '0.25rem 0 0' }}>
              FAQ Beheer
            </h1>
            <p style={{ color: '#6b7280', fontSize: '14px', margin: '0.25rem 0 0' }}>
              {items.length} item{items.length !== 1 ? 's' : ''}
            </p>
          </div>
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
        ) : (
          <>
            {/* FAQ Items */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '2rem' }}>
              {items.length === 0 && (
                <div style={{
                  backgroundColor: '#fff',
                  borderRadius: '12px',
                  border: '2px solid #bdeffc',
                  padding: '2rem',
                  textAlign: 'center',
                  color: '#6b7280',
                  fontSize: '14px',
                }}>
                  Geen FAQ items gevonden. Voeg hieronder een nieuw item toe.
                </div>
              )}

              {items.map((item, index) => {
                const isExpanded = expandedId === item.id
                const edit = editData[item.id] || { question: item.question, answer: item.answer }

                return (
                  <div
                    key={item.id}
                    style={{
                      backgroundColor: '#fff',
                      borderRadius: '12px',
                      border: '2px solid #bdeffc',
                      overflow: 'hidden',
                    }}
                  >
                    {/* Item header row */}
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '10px',
                      padding: '14px 16px',
                      cursor: 'pointer',
                    }}
                    onClick={() => toggleExpand(item.id)}
                    >
                      {/* Order buttons */}
                      <div
                        style={{ display: 'flex', flexDirection: 'column', gap: '2px', flexShrink: 0 }}
                        onClick={e => e.stopPropagation()}
                      >
                        <button
                          className="faq-btn-icon"
                          disabled={index === 0 || movingId === item.id}
                          onClick={() => handleMove(item.id, 'up')}
                          style={{
                            ...btnBase,
                            padding: '2px 7px',
                            fontSize: '12px',
                            backgroundColor: index === 0 ? '#f3f4f6' : '#e5e7eb',
                            color: index === 0 ? '#d1d5db' : '#374151',
                          }}
                          title="Omhoog"
                        >
                          ↑
                        </button>
                        <button
                          className="faq-btn-icon"
                          disabled={index === items.length - 1 || movingId === item.id}
                          onClick={() => handleMove(item.id, 'down')}
                          style={{
                            ...btnBase,
                            padding: '2px 7px',
                            fontSize: '12px',
                            backgroundColor: index === items.length - 1 ? '#f3f4f6' : '#e5e7eb',
                            color: index === items.length - 1 ? '#d1d5db' : '#374151',
                          }}
                          title="Omlaag"
                        >
                          ↓
                        </button>
                      </div>

                      {/* Published toggle */}
                      <div onClick={e => e.stopPropagation()}>
                        <button
                          disabled={togglingId === item.id}
                          onClick={() => handleTogglePublished(item)}
                          style={{
                            ...btnBase,
                            padding: '4px 10px',
                            fontSize: '12px',
                            backgroundColor: item.published ? '#dcfce7' : '#f3f4f6',
                            color: item.published ? '#16a34a' : '#6b7280',
                            flexShrink: 0,
                          }}
                          title={item.published ? 'Klik om te verbergen' : 'Klik om te publiceren'}
                        >
                          {togglingId === item.id ? '…' : item.published ? 'Gepubliceerd' : 'Verborgen'}
                        </button>
                      </div>

                      {/* Question preview */}
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <span style={{
                          fontSize: '15px',
                          fontWeight: 600,
                          color: '#1f2937',
                          display: 'block',
                          whiteSpace: 'nowrap',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                        }}>
                          {item.question}
                        </span>
                      </div>

                      {/* Expand indicator */}
                      <span style={{ color: '#9ca3af', fontSize: '18px', flexShrink: 0 }}>
                        {isExpanded ? '▲' : '▼'}
                      </span>
                    </div>

                    {/* Expanded edit form */}
                    {isExpanded && (
                      <div
                        style={{ padding: '0 16px 16px', borderTop: '1px solid #f0f0f0' }}
                        onClick={e => e.stopPropagation()}
                      >
                        <div style={{ paddingTop: '14px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                          <div>
                            <label style={{ fontSize: '12px', fontWeight: 600, color: '#6b7280', display: 'block', marginBottom: '4px' }}>
                              VRAAG
                            </label>
                            <input
                              className="faq-input"
                              style={inputStyle}
                              value={edit.question}
                              onChange={e =>
                                setEditData(prev => ({
                                  ...prev,
                                  [item.id]: { ...prev[item.id], question: e.target.value },
                                }))
                              }
                            />
                          </div>
                          <div>
                            <label style={{ fontSize: '12px', fontWeight: 600, color: '#6b7280', display: 'block', marginBottom: '4px' }}>
                              ANTWOORD
                            </label>
                            <textarea
                              className="faq-input faq-textarea"
                              style={{ ...inputStyle, minHeight: '100px' }}
                              value={edit.answer}
                              onChange={e =>
                                setEditData(prev => ({
                                  ...prev,
                                  [item.id]: { ...prev[item.id], answer: e.target.value },
                                }))
                              }
                            />
                          </div>

                          <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end' }}>
                            <button
                              onClick={() => handleDelete(item.id)}
                              disabled={deletingId === item.id}
                              style={{
                                ...btnBase,
                                backgroundColor: '#fff',
                                color: '#dc2626',
                                border: '1px solid #dc2626',
                              }}
                            >
                              {deletingId === item.id ? 'Verwijderen…' : 'Verwijder'}
                            </button>
                            <button
                              onClick={() => {
                                setEditData(prev => ({
                                  ...prev,
                                  [item.id]: { question: item.question, answer: item.answer },
                                }))
                                setExpandedId(null)
                              }}
                              style={{
                                ...btnBase,
                                backgroundColor: '#f3f4f6',
                                color: '#374151',
                              }}
                            >
                              Annuleer
                            </button>
                            <button
                              onClick={() => handleSave(item.id)}
                              disabled={savingId === item.id}
                              style={{
                                ...btnBase,
                                backgroundColor: '#3b696d',
                                color: '#fff',
                              }}
                            >
                              {savingId === item.id ? 'Opslaan…' : 'Opslaan'}
                            </button>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                )
              })}
            </div>

            {/* Add new item */}
            <div style={{
              backgroundColor: '#fff',
              borderRadius: '12px',
              border: '2px solid #bdeffc',
              padding: '20px',
            }}>
              <h2 style={{ fontSize: '16px', fontWeight: 700, color: '#1f2937', margin: '0 0 16px' }}>
                Nieuw FAQ item toevoegen
              </h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <div>
                  <label style={{ fontSize: '12px', fontWeight: 600, color: '#6b7280', display: 'block', marginBottom: '4px' }}>
                    VRAAG
                  </label>
                  <input
                    className="faq-input"
                    style={inputStyle}
                    placeholder="Typ de vraag…"
                    value={newQuestion}
                    onChange={e => setNewQuestion(e.target.value)}
                  />
                </div>
                <div>
                  <label style={{ fontSize: '12px', fontWeight: 600, color: '#6b7280', display: 'block', marginBottom: '4px' }}>
                    ANTWOORD
                  </label>
                  <textarea
                    className="faq-input faq-textarea"
                    style={{ ...inputStyle, minHeight: '100px' }}
                    placeholder="Typ het antwoord…"
                    value={newAnswer}
                    onChange={e => setNewAnswer(e.target.value)}
                  />
                </div>
                <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                  <button
                    onClick={handleAddNew}
                    disabled={addingNew || !newQuestion.trim() || !newAnswer.trim()}
                    style={{
                      ...btnBase,
                      backgroundColor: newQuestion.trim() && newAnswer.trim() ? '#3b696d' : '#9ca3af',
                      color: '#fff',
                      cursor: newQuestion.trim() && newAnswer.trim() ? 'pointer' : 'not-allowed',
                    }}
                  >
                    {addingNew ? 'Toevoegen…' : '+ Toevoegen'}
                  </button>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
