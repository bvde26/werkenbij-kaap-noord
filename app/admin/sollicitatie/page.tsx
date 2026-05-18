'use client';

import { useEffect, useState, useCallback, useRef } from 'react';
import {
  getWizardConfig,
  saveWizardConfig,
  DEFAULT_CONFIG,
  type WizardConfig,
  type WizardStep,
  type StepType,
} from '@/lib/wizard';

const TEAL = '#3b696d';

const STEP_TYPES: { value: StepType; label: string }[] = [
  { value: 'category', label: 'Categoriekeuze (bepaalt route)' },
  { value: 'function', label: 'Functiekeuze' },
  { value: 'single', label: 'Eén keuze (knoppen)' },
  { value: 'multi', label: 'Meerdere keuzes' },
  { value: 'text', label: 'Tekstveld(en)' },
  { value: 'number', label: 'Getal (leeftijd)' },
  { value: 'rating', label: 'Sterren-beoordeling (talen)' },
  { value: 'availability', label: 'Beschikbaarheid (datum)' },
  { value: 'file', label: 'CV-upload' },
  { value: 'thanks', label: 'Bedankt-scherm' },
];

const input: React.CSSProperties = {
  border: '1px solid #e5e7eb', borderRadius: '6px', padding: '8px 12px',
  fontSize: '14px', width: '100%', fontFamily: 'Kodchasan, sans-serif',
  color: '#1f2937', outline: 'none', boxSizing: 'border-box',
};
const lbl: React.CSSProperties = {
  fontSize: '12px', fontWeight: 600, color: '#6b7280', display: 'block', marginBottom: '4px',
};
const btn: React.CSSProperties = {
  padding: '8px 16px', borderRadius: '6px', fontSize: '13px',
  fontFamily: 'Kodchasan, sans-serif', cursor: 'pointer', border: 'none', fontWeight: 600,
};
const card: React.CSSProperties = {
  backgroundColor: '#fff', borderRadius: '12px', border: '2px solid #bdeffc', padding: '20px',
};

// Eigen tekstvak dat de ruwe tekst (incl. lege regels/Enter) lokaal bewaart
// terwijl je typt. De parent parset pas naar een lijst — zonder dat de
// textarea bij elke toets opnieuw uit de opgeschoonde lijst wordt opgebouwd.
function MultilineField({
  initial,
  onText,
  minHeight,
}: {
  initial: string;
  onText: (v: string) => void;
  minHeight: number;
}) {
  const [t, setT] = useState(initial);
  const dirty = useRef(false);
  useEffect(() => {
    if (!dirty.current) setT(initial);
  }, [initial]);
  return (
    <textarea
      style={{ ...input, minHeight: `${minHeight}px`, resize: 'vertical' }}
      value={t}
      onChange={e => { dirty.current = true; setT(e.target.value); onText(e.target.value); }}
      onBlur={() => { dirty.current = false; }}
    />
  );
}

export default function SollicitatieAdminPage() {
  const [cfg, setCfg] = useState<WizardConfig | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);
  const [openStep, setOpenStep] = useState<string | null>(null);

  const load = useCallback(async () => {
    const c = await getWizardConfig();
    setCfg(c);
    setLoading(false);
  }, []);
  useEffect(() => { void load(); }, [load]);

  const update = (fn: (c: WizardConfig) => WizardConfig) =>
    setCfg(c => (c ? fn(structuredClone(c)) : c));

  const save = async () => {
    if (!cfg) return;
    setSaving(true);
    setMsg(null);
    try {
      await saveWizardConfig(cfg);
      setMsg('Opgeslagen ✓');
    } catch (e) {
      const m = e instanceof Error ? e.message : 'onbekend';
      setMsg('Fout bij opslaan: ' + m + ' — heb je de SQL-setup uitgevoerd?');
    }
    setSaving(false);
  };

  if (loading || !cfg) {
    return <div style={{ padding: '3rem', textAlign: 'center', color: '#6b7280', fontFamily: 'Kodchasan, sans-serif' }}>Laden…</div>;
  }

  const lines = (v: string) => v.split('\n').map(s => s.trim()).filter(Boolean);

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f7faf9', fontFamily: 'Kodchasan, sans-serif' }}>
      <div style={{ maxWidth: '60rem', margin: '0 auto', padding: '2rem 1rem 5rem' }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '1.5rem', gap: '1rem', flexWrap: 'wrap' }}>
          <div>
            <a href="/admin/dashboard" style={{ fontSize: '13px', color: TEAL, textDecoration: 'none', fontWeight: 600 }}>← Dashboard</a>
            <h1 style={{ fontSize: '1.75rem', fontWeight: 700, color: '#1f2937', margin: '0.25rem 0 0' }}>Sollicitatieformulier</h1>
            <p style={{ color: '#6b7280', fontSize: '14px', margin: '0.25rem 0 0' }}>
              Categorieën, functies en de stappen van de online sollicitatie-wizard.
            </p>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            {msg && <span style={{ fontSize: '13px', color: msg.startsWith('Fout') ? '#dc2626' : '#16a34a' }}>{msg}</span>}
            <button onClick={() => { if (confirm('Alles terugzetten naar de standaardinstellingen?')) setCfg(structuredClone(DEFAULT_CONFIG)); }}
              style={{ ...btn, backgroundColor: '#fff', color: '#6b7280', border: '1px solid #d1d5db' }}>
              Standaard herstellen
            </button>
            <button onClick={save} disabled={saving} style={{ ...btn, backgroundColor: TEAL, color: '#fff' }}>
              {saving ? 'Opslaan…' : 'Opslaan'}
            </button>
          </div>
        </div>

        {/* Categorieën */}
        <div style={{ ...card, marginBottom: '1.25rem' }}>
          <h2 style={{ fontSize: '16px', fontWeight: 700, color: '#1f2937', margin: '0 0 4px' }}>Categorieën</h2>
          <p style={{ fontSize: '13px', color: '#6b7280', margin: '0 0 16px' }}>
            De hoofdkeuzes bij stap 1. De <em>sleutel</em> wordt gebruikt om functies en stappen aan een categorie te koppelen (laat staan na publicatie).
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {cfg.categories.map((c, i) => (
              <div key={i} style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                <input style={{ ...input, maxWidth: '160px' }} value={c.id}
                  onChange={e => update(cf => { cf.categories[i].id = e.target.value.trim(); return cf; })}
                  placeholder="sleutel" />
                <input style={input} value={c.label}
                  onChange={e => update(cf => { cf.categories[i].label = e.target.value; return cf; })}
                  placeholder="Zichtbare tekst" />
                <button onClick={() => update(cf => { const id = cf.categories[i].id; cf.categories.splice(i, 1); delete cf.functions[id]; return cf; })}
                  style={{ ...btn, backgroundColor: '#fff', color: '#dc2626', border: '1px solid #dc2626', flexShrink: 0 }}>Verwijder</button>
              </div>
            ))}
          </div>
          <button onClick={() => update(cf => { cf.categories.push({ id: 'nieuw', label: 'Nieuwe categorie' }); return cf; })}
            style={{ ...btn, backgroundColor: '#eef6f6', color: TEAL, marginTop: '12px' }}>+ Categorie</button>
        </div>

        {/* Functies per categorie */}
        <div style={{ ...card, marginBottom: '1.25rem' }}>
          <h2 style={{ fontSize: '16px', fontWeight: 700, color: '#1f2937', margin: '0 0 4px' }}>Functies per categorie</h2>
          <p style={{ fontSize: '13px', color: '#6b7280', margin: '0 0 16px' }}>Eén functie per regel.</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {cfg.categories.map(c => (
              <div key={c.id}>
                <label style={lbl}>{c.label} <span style={{ color: '#9ca3af' }}>({c.id})</span></label>
                <MultilineField
                  initial={(cfg.functions[c.id] || []).join('\n')}
                  minHeight={90}
                  onText={v => update(cf => { cf.functions[c.id] = lines(v); return cf; })}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Stappen */}
        <div style={card}>
          <h2 style={{ fontSize: '16px', fontWeight: 700, color: '#1f2937', margin: '0 0 4px' }}>Stappen</h2>
          <p style={{ fontSize: '13px', color: '#6b7280', margin: '0 0 16px' }}>
            Volgorde van de wizard. Klik een stap aan om te bewerken. Met <em>“Toon alleen voor”</em> beperk je een stap tot bepaalde categorieën.
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {cfg.steps.map((s, i) => {
              const isOpen = openStep === s.id;
              const mv = (dir: -1 | 1) => update(cf => {
                const j = i + dir;
                if (j < 0 || j >= cf.steps.length) return cf;
                [cf.steps[i], cf.steps[j]] = [cf.steps[j], cf.steps[i]];
                return cf;
              });
              const edit = (patch: Partial<WizardStep>) =>
                update(cf => { cf.steps[i] = { ...cf.steps[i], ...patch }; return cf; });
              return (
                <div key={s.id} style={{ border: '2px solid #bdeffc', borderRadius: '10px', overflow: 'hidden' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '12px 14px', cursor: 'pointer' }}
                    onClick={() => setOpenStep(isOpen ? null : s.id)}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }} onClick={e => e.stopPropagation()}>
                      <button onClick={() => mv(-1)} disabled={i === 0} style={{ ...btn, padding: '1px 7px', fontSize: '12px', backgroundColor: '#e5e7eb', color: '#374151' }}>↑</button>
                      <button onClick={() => mv(1)} disabled={i === cfg.steps.length - 1} style={{ ...btn, padding: '1px 7px', fontSize: '12px', backgroundColor: '#e5e7eb', color: '#374151' }}>↓</button>
                    </div>
                    <span style={{ fontSize: '11px', fontWeight: 700, color: TEAL, backgroundColor: '#eef6f6', padding: '3px 8px', borderRadius: '999px', flexShrink: 0 }}>
                      {STEP_TYPES.find(t => t.value === s.type)?.label.split(' ')[0] || s.type}
                    </span>
                    <span style={{ flex: 1, minWidth: 0, fontWeight: 600, color: '#1f2937', fontSize: '14px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                      {s.title || '(geen titel)'}
                    </span>
                    <span style={{ color: '#9ca3af', flexShrink: 0 }}>{isOpen ? '▲' : '▼'}</span>
                  </div>

                  {isOpen && (
                    <div style={{ padding: '0 14px 16px', borderTop: '1px solid #f0f0f0' }} onClick={e => e.stopPropagation()}>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', paddingTop: '14px' }}>
                        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                          <div style={{ flex: '1 1 200px' }}>
                            <label style={lbl}>TYPE</label>
                            <select style={input} value={s.type} onChange={e => edit({ type: e.target.value as StepType })}>
                              {STEP_TYPES.map(t => <option key={t.value} value={t.value}>{t.label}</option>)}
                            </select>
                          </div>
                        </div>
                        <div>
                          <label style={lbl}>VRAAG / TITEL</label>
                          <input style={input} value={s.title} onChange={e => edit({ title: e.target.value })} />
                        </div>
                        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                          <div style={{ flex: '1 1 220px' }}>
                            <label style={lbl}>SUBTITEL (optioneel)</label>
                            <input style={input} value={s.subtitle || ''} onChange={e => edit({ subtitle: e.target.value || undefined })} />
                          </div>
                          <div style={{ flex: '1 1 220px' }}>
                            <label style={lbl}>HINT (optioneel)</label>
                            <input style={input} value={s.hint || ''} onChange={e => edit({ hint: e.target.value || undefined })} />
                          </div>
                        </div>

                        {(s.type === 'single' || s.type === 'multi') && (
                          <div>
                            <label style={lbl}>KEUZE-OPTIES (één per regel)</label>
                            <MultilineField
                              initial={(s.options || []).join('\n')}
                              minHeight={90}
                              onText={v => edit({ options: lines(v) })}
                            />
                          </div>
                        )}

                        {s.type === 'rating' && (
                          <div>
                            <label style={lbl}>ITEMS OM TE BEOORDELEN (één per regel)</label>
                            <MultilineField
                              initial={(s.ratingItems || []).join('\n')}
                              minHeight={70}
                              onText={v => edit({ ratingItems: lines(v) })}
                            />
                          </div>
                        )}

                        {s.type === 'text' && (
                          <div>
                            <label style={lbl}>INVOERVELDEN — formaat per regel: sleutel | Label | placeholder | type(text/tel/email)</label>
                            <MultilineField
                              initial={(s.fields || []).map(f => [f.key, f.label, f.placeholder || '', f.inputType || 'text'].join(' | ')).join('\n')}
                              minHeight={90}
                              onText={v => edit({
                                fields: lines(v).map(row => {
                                  const [key, label, placeholder, tp] = row.split('|').map(x => x.trim());
                                  const it = (['text', 'tel', 'email'].includes(tp) ? tp : 'text') as 'text' | 'tel' | 'email';
                                  return { key: key || 'veld', label: label || key || 'Veld', placeholder: placeholder || undefined, inputType: it };
                                }),
                              })}
                            />
                          </div>
                        )}

                        <div>
                          <label style={lbl}>TOON ALLEEN VOOR (leeg = altijd tonen)</label>
                          <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap' }}>
                            {cfg.categories.map(c => {
                              const on = (s.showFor || []).includes(c.id);
                              return (
                                <label key={c.id} style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', color: '#374151' }}>
                                  <input type="checkbox" checked={on}
                                    onChange={() => edit({
                                      showFor: on
                                        ? (s.showFor || []).filter(x => x !== c.id)
                                        : [...(s.showFor || []), c.id],
                                    })} />
                                  {c.label}
                                </label>
                              );
                            })}
                          </div>
                        </div>

                        <div style={{ display: 'flex', alignItems: 'center', gap: '14px', flexWrap: 'wrap' }}>
                          <label style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', color: '#374151' }}>
                            <input type="checkbox" checked={!!s.required} onChange={() => edit({ required: !s.required })} />
                            Verplicht invullen
                          </label>
                          <button onClick={() => { update(cf => { cf.steps.splice(i, 1); return cf; }); setOpenStep(null); }}
                            style={{ ...btn, backgroundColor: '#fff', color: '#dc2626', border: '1px solid #dc2626', marginLeft: 'auto' }}>
                            Stap verwijderen
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
          <button
            onClick={() => update(cf => {
              const uid = Date.now();
              cf.steps.push({ id: 'stap-' + uid, type: 'single', title: 'Nieuwe vraag', field: 'veld_' + uid, options: [] });
              return cf;
            })}
            style={{ ...btn, backgroundColor: '#eef6f6', color: TEAL, marginTop: '14px' }}>
            + Stap toevoegen
          </button>
        </div>
      </div>
    </div>
  );
}
