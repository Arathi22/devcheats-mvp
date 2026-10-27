'use client';

import { Check, Copy, RotateCcw, Trash2 } from 'lucide-react';
import { useState } from 'react';

export function ActionButton({ children, onClick, variant = 'secondary', disabled = false }: { children: React.ReactNode; onClick: () => void; variant?: 'primary' | 'secondary' | 'quiet'; disabled?: boolean }) {
  return <button type="button" className={`tool-button ${variant}`} onClick={onClick} disabled={disabled}>{children}</button>;
}

export function CopyTextButton({ value }: { value: string }) {
  const [copied, setCopied] = useState(false);
  async function copy() {
    if (!value) return;
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1500);
    } catch {
      setCopied(false);
    }
  }
  return <button type="button" className="tool-copy" onClick={copy} disabled={!value} aria-label="Copy output">{copied ? <Check size={15} /> : <Copy size={15} />}{copied ? 'Copied' : 'Copy'}</button>;
}

export function ClearButton({ onClick }: { onClick: () => void }) {
  return <ActionButton variant="quiet" onClick={onClick}><Trash2 size={14} /> Clear</ActionButton>;
}

export function SampleButton({ onClick }: { onClick: () => void }) {
  return <ActionButton variant="quiet" onClick={onClick}><RotateCcw size={14} /> Load sample</ActionButton>;
}

export function ToolStatus({ children, kind = 'info' }: { children: React.ReactNode; kind?: 'info' | 'error' | 'success' }) {
  if (!children) return null;
  return <p className={`tool-status ${kind}`} role={kind === 'error' ? 'alert' : 'status'}>{children}</p>;
}
