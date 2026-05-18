'use client';
/* eslint-disable @typescript-eslint/no-explicit-any -- wizard werkt met dynamische, door admin gedefinieerde velden */

import { useEffect, useMemo, useState } from 'react';
import {
  getWizardConfig,
  submitWizardApplication,
  DEFAULT_CONFIG,
  type WizardConfig,
  type WizardStep,
} from '@/lib/wizard';

const TEAL = '#3b696d';
const LIGHTBLUE = '#bdeffc';
const CREAM = '#fefdf5';

interface Prefill {
  vacatureId?: string | null;
  vacatureTitle?: string | null;
  categorie?: string;
  functie?: string;
}

export default function SollicitatieWizard({
  open,
  onClose,
  prefill,
}: {
  open: boolean;
  onClose: () => void;
  prefill?: Prefill;
}) {
  const [config, setConfig] = useState<WizardConfig>(DEFAULT_CONFIG);
  const [stepId, setStepId] = useState<string>('');
  const [data, setData] = useState<Record<string, any>>({ landcode: '+31' });
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  // Config laden zodra de wizard opent.
  useEffect(() => {
    if (!open) return;
    let active = true;
    void (async () => {
      const c = await getWizardConfig();
      if (!active) return;
      setConfig(c);
      const init: Record<string, any> = { landcode: '+31' };
      if (prefill?.categorie) init.categorie = prefill.categorie;
      if (prefill?.functie) init.functie = prefill.functie;
      setData(init);
      // Start: sla categorie/functie over indien voorgevuld.
      const first = c.steps[0];
      if (prefill?.categorie && prefill?.functie) {
        const skip = c.steps.find(s => s.type !== 'category' && s.type !== 'function');
        setStepId(skip?.id || first.id);
      } else if (prefill?.categorie) {
        const skip = c.steps.find(s => s.type === 'function') || c.steps[1];
        setStepId(skip?.id || first.id);
      } else {
        setStepId(first.id);
      }
      setSubmitError(null);
      setSubmitting(false);
    })();
    return () => { active = false; };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  // Scroll-lock terwijl modal open is.
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = prev; };
  }, [open]);

  // Route = stappen die gelden voor de gekozen categorie.
  const route = useMemo<WizardStep[]>(() => {
    const cat = data.categorie as string | undefined;
    return config.steps.filter(s => {
      if (!s.showFor || s.showFor.length === 0) return true;
      return cat ? s.showFor.includes(cat) : true;
    });
  }, [config.steps, data.categorie]);

  const idx = route.findIndex(s => s.id === stepId);
  const step = route[idx];
  const lastInputIdx = route.length - 2; // 'thanks' telt niet mee
  const progress = !step || step.type === 'thanks'
    ? 100
    : Math.round((idx / Math.max(lastInputIdx, 1)) * 100);

  if (!open || !step) return null;

  // Opslagsleutel wordt automatisch beheerd: expliciet veld, anders de stap-id.
  const fk = step.field || step.id;

  const set = (k: string, v: any) => setData(d => ({ ...d, [k]: v }));

  const goNext = async () => {
    if (idx >= route.length - 1) return;
    const next = route[idx + 1];
    if (next.type === 'thanks') {
      setStepId(next.id);
      await submit();
      return;
    }
    setStepId(next.id);
  };

  const goPrev = () => {
    if (idx > 0) setStepId(route[idx - 1].id);
  };

  const submit = async () => {
    setSubmitting(true);
    setSubmitError(null);
    try {
      await submitWizardApplication({
        vacatureId: prefill?.vacatureId ?? null,
        vacatureTitle: prefill?.vacatureTitle ?? null,
        answers: {
          ...data,
          categorieLabel: config.categories.find(c => c.id === data.categorie)?.label || data.categorie,
          vacature: prefill?.vacatureTitle ?? null,
        },
        cvFile: (data.cv as File) || null,
      });
    } catch {
      setSubmitError('Er ging iets mis bij het versturen. Probeer het opnieuw of bel ons.');
    } finally {
      setSubmitting(false);
    }
  };

  const close = () => { onClose(); };

  // ── Stap-renderers ──────────────────────────────────

  const renderOptions = (opts: string[], field: string, autoNext = true, multi = false) => {
    const cur = data[field];
    return (
      <div className="kw-opts">
        {opts.map(o => {
          const selected = multi ? Array.isArray(cur) && cur.includes(o) : cur === o;
          return (
            <button
              key={o}
              type="button"
              className={`kw-opt ${selected ? 'sel' : ''}`}
              onClick={() => {
                if (multi) {
                  const arr: string[] = Array.isArray(cur) ? cur : [];
                  set(field, arr.includes(o) ? arr.filter(x => x !== o) : [...arr, o]);
                } else {
                  set(field, o);
                  if (autoNext) setTimeout(goNext, 140);
                }
              }}
            >
              {o}
              {selected && <span className="kw-check">✓</span>}
            </button>
          );
        })}
      </div>
    );
  };

  let body: React.ReactNode = null;
  let showNext = false;
  let nextDisabled = false;

  switch (step.type) {
    case 'category':
      body = (
        <div className="kw-opts">
          {config.categories.map(c => (
            <button
              key={c.id}
              type="button"
              className={`kw-opt ${data.categorie === c.id ? 'sel' : ''}`}
              onClick={() => { set('categorie', c.id); setData(d => ({ ...d, categorie: c.id, functie: undefined })); setTimeout(goNext, 140); }}
            >
              {c.label}
              {data.categorie === c.id && <span className="kw-check">✓</span>}
            </button>
          ))}
        </div>
      );
      break;

    case 'function': {
      const fns = config.functions[data.categorie as string] || [];
      body = (
        <div className="kw-opts">
          {fns.map(f => (
            <button
              key={f}
              type="button"
              className={`kw-opt ${data.functie === f ? 'sel' : ''}`}
              onClick={() => { set('functie', f); setTimeout(goNext, 140); }}
            >
              {f}
              {data.functie === f && <span className="kw-check">✓</span>}
            </button>
          ))}
          {fns.length === 0 && <p className="kw-hint">Kies eerst een categorie.</p>}
        </div>
      );
      break;
    }

    case 'single':
      body = renderOptions(step.options || [], fk, true);
      break;

    case 'multi':
      body = renderOptions(step.options || [], fk, false, true);
      showNext = true;
      nextDisabled = step.required ? !(Array.isArray(data[fk]) && data[fk].length) : false;
      break;

    case 'text':
      body = (
        <div className="kw-fields">
          {(step.fields || []).map(f => (
            <label key={f.key} className="kw-field">
              <span className="kw-label">{f.label}</span>
              <input
                className="kw-input"
                type={f.inputType || 'text'}
                placeholder={f.placeholder}
                value={data[f.key] || ''}
                onChange={e => set(f.key, e.target.value)}
                inputMode={f.inputType === 'tel' ? 'tel' : f.inputType === 'email' ? 'email' : undefined}
              />
            </label>
          ))}
        </div>
      );
      showNext = true;
      if (step.required) {
        nextDisabled = (step.fields || []).some(f => {
          if (f.key === 'telefoon') return !String(data.telefoon || '').trim();
          if (f.key === 'email') return !/^\S+@\S+\.\S+$/.test(String(data.email || ''));
          return !String(data[f.key] || '').trim();
        });
      }
      break;

    case 'number':
      body = (
        <label className="kw-field">
          <span className="kw-label">Leeftijd</span>
          <input
            className="kw-input"
            type="number"
            inputMode="numeric"
            min={14}
            max={99}
            placeholder="Typ hier je leeftijd"
            value={data[fk] || ''}
            onChange={e => set(fk, e.target.value)}
          />
        </label>
      );
      showNext = true;
      nextDisabled = step.required ? !(Number(data[fk]) > 0) : false;
      break;

    case 'rating': {
      const scores = data[fk] || {};
      body = (
        <div className="kw-rating-grid">
          {(step.ratingItems || []).map(item => (
            <div key={item} className="kw-rating-row">
              <span className="kw-rating-name">{item}</span>
              <div className="kw-stars">
                {[1, 2, 3, 4, 5].map(n => (
                  <button
                    key={n}
                    type="button"
                    aria-label={`${item}: ${n} van 5`}
                    className={`kw-star ${(scores[item] || 0) >= n ? 'on' : ''}`}
                    onClick={() => set(fk, { ...scores, [item]: n })}
                  >
                    ★
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      );
      showNext = true;
      break;
    }

    case 'availability':
      body = (
        <div className="kw-avail">
          <button
            type="button"
            className={`kw-opt ${data[fk] === 'direct' ? 'sel' : ''}`}
            onClick={() => { set(fk, 'direct'); set('beschikbaarDatum', null); setTimeout(goNext, 140); }}
          >
            Per direct
            {data[fk] === 'direct' && <span className="kw-check">✓</span>}
          </button>
          <button
            type="button"
            className={`kw-opt ${data[fk] === 'vanaf' ? 'sel' : ''}`}
            onClick={() => set(fk, 'vanaf')}
          >
            Vanaf een datum
            {data[fk] === 'vanaf' && <span className="kw-check">✓</span>}
          </button>
          {data[fk] === 'vanaf' && (
            <input
              className="kw-input"
              type="date"
              value={data.beschikbaarDatum || ''}
              onChange={e => set('beschikbaarDatum', e.target.value)}
              style={{ marginTop: '4px' }}
            />
          )}
        </div>
      );
      if (data[fk] === 'vanaf') {
        showNext = true;
        nextDisabled = !data.beschikbaarDatum;
      }
      break;

    case 'file': {
      const f = data[fk] as File | undefined;
      body = (
        <div className="kw-cv">
          <label className="kw-cv-drop">
            <span className="kw-cv-icon">＋</span>
            <span>{f ? 'Ander bestand kiezen' : 'Upload je cv'}</span>
            <input
              type="file"
              accept=".pdf,.doc,.docx"
              style={{ display: 'none' }}
              onChange={e => { const file = e.target.files?.[0]; if (file) set(fk, file); }}
            />
          </label>
          {f && <p className="kw-cv-name">✓ {f.name}</p>}
          {f ? (
            <button type="button" className="kw-next" onClick={goNext} style={{ alignSelf: 'stretch' }}>
              Verzenden →
            </button>
          ) : (
            <button type="button" className="kw-skip" onClick={goNext}>
              Sla deze stap over en verzenden →
            </button>
          )}
        </div>
      );
      break;
    }

    case 'thanks':
      body = (
        <div className="kw-thanks">
          {submitting ? (
            <p className="kw-sub">Bezig met versturen…</p>
          ) : submitError ? (
            <>
              <p className="kw-sub" style={{ color: '#dc2626' }}>{submitError}</p>
              <button type="button" className="kw-next" onClick={submit}>Opnieuw proberen</button>
            </>
          ) : (
            <>
              <div className="kw-thanks-mark">✓</div>
              {step.subtitle && <p className="kw-sub">{step.subtitle}</p>}
              <button type="button" className="kw-next" onClick={close}>Sluiten</button>
            </>
          )}
        </div>
      );
      break;
  }

  return (
    <div className="kw-overlay" role="dialog" aria-modal="true" aria-label="Sollicitatieformulier">
      <style>{`
        .kw-overlay{position:fixed;inset:0;z-index:9999;background:rgba(20,40,42,0.5);
          display:flex;align-items:flex-end;justify-content:center;padding:0;
          font-family:'Kodchasan',sans-serif;-webkit-tap-highlight-color:transparent;
          animation:kwFade .25s ease;}
        @keyframes kwFade{from{background:rgba(20,40,42,0);}to{background:rgba(20,40,42,0.5);}}
        .kw-modal{background:${CREAM};width:560px;max-width:100vw;height:auto;
          max-height:90dvh;display:flex;flex-direction:column;color:${TEAL};
          border-radius:22px 22px 0 0;box-shadow:0 -12px 44px rgba(0,0,0,0.28);
          animation:kwUp .34s cubic-bezier(.23,1,.32,1);}
        @keyframes kwUp{from{transform:translateY(100%);}to{transform:translateY(0);}}
        @media (min-width:600px){
          .kw-overlay{align-items:center;}
          .kw-modal{max-height:88vh;border-radius:18px;
            box-shadow:0 30px 70px rgba(0,0,0,0.4);
            animation:kwPop .26s cubic-bezier(.23,1,.32,1);}
          .kw-grab{display:none;}
        }
        @keyframes kwPop{from{opacity:0;transform:scale(.96);}to{opacity:1;transform:scale(1);}}
        @media (prefers-reduced-motion:reduce){
          .kw-modal,.kw-overlay{animation:none;}
        }
        .kw-grab{width:42px;height:4px;border-radius:999px;
          background:rgba(59,105,109,0.22);margin:9px auto 0;flex-shrink:0;}
        .kw-head{display:flex;align-items:center;justify-content:space-between;
          padding:12px 20px 12px;flex-shrink:0;}
        .kw-brand{display:flex;align-items:center;gap:9px;}
        .kw-brand img{height:30px;width:auto;}
        .kw-brand span{font-family:'Pana Summer',serif;font-size:20px;letter-spacing:0.03em;
          color:${TEAL};line-height:1;padding-top:3px;}
        .kw-close{background:transparent;border:none;color:${TEAL};font-size:22px;
          line-height:1;cursor:pointer;padding:6px;opacity:0.65;}
        .kw-close:hover{opacity:1;}
        .kw-nav{display:flex;align-items:center;justify-content:space-between;
          padding:0 20px 8px;min-height:20px;}
        .kw-back{background:none;border:none;color:${TEAL};opacity:0.7;font-size:14px;
          cursor:pointer;padding:0;font-family:inherit;}
        .kw-back:hover{opacity:1;}
        .kw-bar{height:5px;background:rgba(59,105,109,0.14);margin:0 20px;border-radius:3px;flex-shrink:0;}
        .kw-bar i{display:block;height:100%;background:${TEAL};border-radius:3px;
          transition:width .35s cubic-bezier(.23,1,.32,1);}
        .kw-body{flex:1;overflow-y:auto;padding:22px 20px 28px;
          display:flex;flex-direction:column;gap:18px;}
        .kw-sub{color:rgba(59,105,109,0.7);font-size:14px;margin:0;}
        .kw-title{font-family:'Pana Summer',serif;font-size:24px;line-height:1.2;
          margin:0;color:${TEAL};letter-spacing:0.02em;}
        .kw-hint{color:rgba(59,105,109,0.65);font-size:13px;margin:0;font-style:italic;}
        .kw-opts{display:flex;flex-direction:column;gap:10px;}
        .kw-opt{position:relative;text-align:left;background:#fff;border:2px solid ${LIGHTBLUE};
          color:${TEAL};border-radius:12px;padding:15px 44px 15px 18px;cursor:pointer;
          font-size:15px;font-family:inherit;transition:border-color .15s,background .15s,transform .08s;}
        .kw-opt:hover{border-color:${TEAL};}
        .kw-opt:active{transform:scale(0.98);}
        .kw-opt.sel{border-color:${TEAL};background:${LIGHTBLUE};font-weight:600;}
        .kw-check{position:absolute;right:16px;top:50%;transform:translateY(-50%);
          font-weight:700;color:${TEAL};}
        .kw-fields{display:flex;flex-direction:column;gap:16px;}
        .kw-field{display:flex;flex-direction:column;gap:6px;}
        .kw-label{font-size:13px;font-weight:600;color:rgba(59,105,109,0.8);}
        .kw-input{background:#fff;border:2px solid ${LIGHTBLUE};border-radius:10px;
          color:${TEAL};font-size:16px;padding:13px 14px;outline:none;width:100%;
          font-family:inherit;box-sizing:border-box;}
        .kw-input:focus{border-color:${TEAL};}
        .kw-input::placeholder{color:rgba(59,105,109,0.4);}
        .kw-rating-grid{display:flex;flex-direction:column;gap:18px;}
        .kw-rating-row{display:flex;align-items:center;justify-content:space-between;gap:12px;}
        .kw-rating-name{font-size:15px;color:${TEAL};font-weight:600;}
        .kw-stars{display:flex;gap:4px;}
        .kw-star{background:none;border:none;cursor:pointer;font-size:28px;line-height:1;
          color:rgba(59,105,109,0.25);padding:2px;}
        .kw-star.on{color:#f5b301;}
        .kw-avail{display:flex;flex-direction:column;gap:10px;}
        .kw-cv{display:flex;flex-direction:column;gap:14px;align-items:stretch;}
        .kw-cv-drop{display:flex;flex-direction:column;align-items:center;gap:8px;
          border:2px dashed ${TEAL};border-radius:14px;padding:30px 16px;cursor:pointer;
          color:${TEAL};background:#fff;font-size:15px;}
        .kw-cv-icon{font-size:30px;line-height:1;}
        .kw-cv-name{margin:0;color:${TEAL};font-size:14px;text-align:center;}
        .kw-skip{background:none;border:none;color:rgba(59,105,109,0.7);cursor:pointer;
          font-size:14px;text-decoration:underline;font-family:inherit;}
        .kw-next{align-self:flex-end;background:${TEAL};color:#fff;border:none;
          border-radius:999px;padding:13px 26px;font-size:15px;font-weight:600;
          cursor:pointer;font-family:inherit;}
        .kw-next:disabled{opacity:0.4;cursor:not-allowed;}
        .kw-next:active{transform:scale(0.97);}
        .kw-thanks{display:flex;flex-direction:column;align-items:center;gap:16px;
          text-align:center;padding:20px 0;}
        .kw-thanks-mark{width:64px;height:64px;border-radius:50%;background:${TEAL};
          color:#fff;font-size:32px;display:flex;align-items:center;justify-content:center;}
        @media (prefers-reduced-motion:reduce){.kw-bar i{transition:none;}}
      `}</style>

      <div className="kw-modal">
        <div className="kw-grab" aria-hidden="true" />
        <div className="kw-head">
          <div className="kw-brand">
            <img src="/logo-header.svg" alt="" aria-hidden="true" />
            <span>Kaap Noord</span>
          </div>
          <button className="kw-close" onClick={close} aria-label="Sluiten">✕</button>
        </div>

        {step.type !== 'thanks' && (
          <>
            <div className="kw-nav">
              {idx > 0 ? (
                <button className="kw-back" onClick={goPrev}>← Vorige</button>
              ) : <span />}
              <span className="kw-hint" style={{ fontStyle: 'normal' }}>
                {progress < 60 ? 'Nog ± 2 min.' : 'Je bent er bijna…'}
              </span>
            </div>
            <div className="kw-bar"><i style={{ width: `${progress}%` }} /></div>
          </>
        )}

        <div className="kw-body">
          {step.subtitle && step.type !== 'thanks' && <p className="kw-sub">{step.subtitle}</p>}
          <h2 className="kw-title">
            {step.title.replace('{voornaam}', data.voornaam || '')}
          </h2>
          {step.hint && <p className="kw-hint">{step.hint}</p>}
          {body}
          {showNext && (
            <button
              type="button"
              className="kw-next"
              onClick={goNext}
              disabled={nextDisabled}
            >
              Volgende →
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
