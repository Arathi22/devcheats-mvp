'use client';

import { Check, Link2 } from 'lucide-react';
import { useState } from 'react';

export function CopyLinkButton({ sectionId, sectionTitle }: { sectionId: string; sectionTitle: string }) {
  const [status, setStatus] = useState<'idle' | 'copied' | 'failed'>('idle');

  async function copyLink() {
    const url = `${window.location.origin}${window.location.pathname}#${sectionId}`;
    try {
      await navigator.clipboard.writeText(url);
      setStatus('copied');
      window.setTimeout(() => setStatus('idle'), 1800);
    } catch {
      setStatus('failed');
      window.setTimeout(() => setStatus('idle'), 2500);
    }
  }

  return <span className="section-link-action">
    <button type="button" className="section-link-button" onClick={copyLink} aria-label={`Copy link to ${sectionTitle}`} title={`Copy link to ${sectionTitle}`}>
      {status === 'copied' ? <Check size={15} aria-hidden="true" /> : <Link2 size={15} aria-hidden="true" />}
    </button>
    <span role="status" aria-live="polite">{status === 'copied' ? 'Link copied' : status === 'failed' ? 'Could not copy link' : ''}</span>
  </span>;
}
