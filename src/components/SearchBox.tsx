'use client';

import Fuse from 'fuse.js';
import { Search, ArrowUpRight, X } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useMemo, useState } from 'react';
import { cheatsheets } from '@/data/cheatsheets';

export function SearchBox() {
  const router = useRouter();
  const [query, setQuery] = useState('');
  const fuse = useMemo(() => new Fuse(cheatsheets, {
    keys: ['title', 'description', 'category', 'tags', 'snippets.title', 'snippets.description', 'snippets.code'],
    threshold: 0.35,
    ignoreLocation: true,
  }), []);
  const results = query.trim() ? fuse.search(query.trim()).slice(0, 6).map((item) => item.item) : [];

  return (
    <div className="search-wrap">
      <div className="search-input-wrap">
        <Search size={19} className="search-icon" aria-hidden="true" />
        <input
          aria-label="Search cheat sheets"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          onKeyDown={(event) => {
            if (event.key === 'Escape') setQuery('');
            if (event.key === 'Enter' && results[0]) router.push(`/cheatsheets/${results[0].slug}`);
          }}
          placeholder="Search JavaScript, Git, SQL, flexbox..."
        />
        {query && <button className="clear-search" onClick={() => setQuery('')} aria-label="Clear search"><X size={16} /></button>}
        <kbd>Enter ↵</kbd>
      </div>
      {query.trim() && <div className="search-results" role="listbox" aria-label="Search results">
        {results.length ? results.map((sheet) => <Link role="option" aria-selected="false" key={sheet.slug} href={`/cheatsheets/${sheet.slug}`} onClick={() => setQuery('')} className="search-result">
          <span className="result-dot" style={{ background: sheet.color }} />
          <span className="result-copy"><strong>{sheet.title}</strong><small>{sheet.description}</small></span>
          <ArrowUpRight size={16} />
        </Link>) : <p className="empty-search">No matches yet. Try a language, command, or keyword.</p>}
      </div>}
    </div>
  );
}
