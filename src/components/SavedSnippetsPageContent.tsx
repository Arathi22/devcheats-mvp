'use client';

import Link from 'next/link';
import { Bookmark, Search, Trash2 } from 'lucide-react';
import { useMemo, useState } from 'react';
import { CopyButton } from '@/components/CopyButton';
import { useSavedItems } from '@/components/SavedItemsProvider';

export function SavedSnippetsPageContent() {
  const { savedSnippets, removeSnippet, updateSnippetNote } = useSavedItems();
  const [query, setQuery] = useState('');
  const [language, setLanguage] = useState('all');
  const languages = useMemo(() => [...new Set(savedSnippets.map((snippet) => snippet.language))].sort(), [savedSnippets]);
  const filtered = useMemo(() => savedSnippets.filter((snippet) => {
    const text = `${snippet.sourceTitle} ${snippet.sectionTitle} ${snippet.note} ${snippet.code}`.toLowerCase();
    return text.includes(query.trim().toLowerCase()) && (language === 'all' || snippet.language === language);
  }), [savedSnippets, query, language]);

  return <main className="saved-page shell">
    <div className="eyebrow">YOUR LIBRARY</div>
    <h1><Bookmark size={30} aria-hidden="true" /> Saved snippets</h1>
    <p className="saved-page-description">Saved snippets and notes live in this browser only; they are not synchronized across devices.</p>
    {savedSnippets.length > 0 && <div className="saved-filters">
      <label className="saved-search"><Search size={17} aria-hidden="true" /><span className="sr-only">Search saved snippets</span><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search saved snippets" /></label>
      <label className="language-filter">Language <select value={language} onChange={(event) => setLanguage(event.target.value)}><option value="all">All languages</option>{languages.map((item) => <option key={item} value={item}>{item}</option>)}</select></label>
    </div>}
    {savedSnippets.length === 0
      ? <div className="saved-empty"><Bookmark size={25} aria-hidden="true" /><h2>No saved snippets yet</h2><p>Save an example from any cheat-sheet code block to keep it here with a note.</p><Link className="cta-link" href="/#explore">Browse cheat sheets</Link></div>
      : filtered.length === 0
        ? <p className="empty-search" role="status">No snippets match those filters.</p>
        : <div className="saved-snippet-list">{filtered.map((snippet) => <article className="saved-snippet-card" key={snippet.id}>
          <div className="saved-snippet-heading"><div><span className="card-category">{snippet.language}</span><h2>{snippet.sectionTitle}</h2><Link href={`/cheatsheets/${snippet.sourceSlug}`}>From {snippet.sourceTitle}</Link></div><button className="remove-saved-button" type="button" onClick={() => removeSnippet(snippet.id)} aria-label={`Remove saved snippet ${snippet.sectionTitle}`}><Trash2 size={16} aria-hidden="true" /><span>Remove</span></button></div>
          <div className="saved-snippet-code"><pre tabIndex={0} aria-label={`${snippet.sectionTitle} code`}><code>{snippet.code}</code></pre><CopyButton code={snippet.code} /></div>
          <label className="snippet-note-label">Note or label<textarea value={snippet.note} onChange={(event) => updateSnippetNote(snippet.id, event.target.value)} placeholder="Add a reminder for future you…" rows={2} /></label>
          <time className="saved-timestamp" dateTime={snippet.savedAt}>Saved {new Date(snippet.savedAt).toLocaleDateString()}</time>
        </article>)}</div>}
  </main>;
}
