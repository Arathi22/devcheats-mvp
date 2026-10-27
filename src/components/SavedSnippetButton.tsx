'use client';

import { Bookmark } from 'lucide-react';
import { useSavedItems } from '@/components/SavedItemsProvider';

export function SavedSnippetButton({ id, sourceSlug, sourceTitle, sectionTitle, language, code }: {
  id: string;
  sourceSlug: string;
  sourceTitle: string;
  sectionTitle: string;
  language: string;
  code: string;
}) {
  const { isSnippetSaved, saveSnippet, removeSnippet } = useSavedItems();
  const saved = isSnippetSaved(id);
  return <button
    type="button"
    className={`save-snippet-button${saved ? ' active' : ''}`}
    aria-label={saved ? `Remove saved snippet: ${sectionTitle}` : `Save snippet: ${sectionTitle}`}
    aria-pressed={saved}
    onClick={() => saved ? removeSnippet(id) : saveSnippet({ id, sourceSlug, sourceTitle, sectionTitle, language, code })}
  ><Bookmark size={14} fill={saved ? 'currentColor' : 'none'} aria-hidden="true" /><span>{saved ? 'Saved' : 'Save snippet'}</span></button>;
}
