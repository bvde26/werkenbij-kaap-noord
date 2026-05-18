'use client';

import { useState } from 'react';
import SollicitatieWizard from './SollicitatieWizard';

export default function WizardApplyButton({
  vacatureId,
  vacatureTitle,
}: {
  vacatureId?: string | null;
  vacatureTitle?: string | null;
}) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="vd-btn"
        style={{ backgroundColor: '#3b696d', color: '#ffffff', cursor: 'pointer', border: 'none' }}
      >
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
          <polyline points="14 2 14 8 20 8" />
          <path d="m9 15 2 2 4-4" />
        </svg>
        Solliciteer direct online
      </button>
      <SollicitatieWizard
        open={open}
        onClose={() => setOpen(false)}
        prefill={{ vacatureId, vacatureTitle }}
      />
    </>
  );
}
