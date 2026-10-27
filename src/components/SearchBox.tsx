'use client';

import { Search, ArrowUpRight, X } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useId, useMemo, useRef, useState } from 'react';
import type { KeyboardEvent as ReactKeyboardEvent } from 'react';
import { cheatsheets } from '@/data/cheatsheets';
import { createCheatSheetSearch } from '@/lib/cheatsheet-search';

function HighlightMatch({ text, query }: { text: string; query: string }) {
  const terms = query.trim().split(/\s+/).filter(Boolean);
  if (!terms.length) return text;

  const pattern = new RegExp(`(${terms.map((term) => term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|')})`, 'gi');
  return <>{text.split(pattern).map((part, index) => terms.some((term) => part.toLowerCase() === term.toLowerCase())
    ? <mark className="search-highlight" key={`${part}-${index}`}>{part}</mark>
    : part)}</>;
}

export function SearchBox() {
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const listboxId = useId();
  const [query, setQuery] = useState('');
  const [activeIndex, setActiveIndex] = useState(-1);
  const [isOpen, setIsOpen] = useState(false);
  const fuse = useMemo(() => createCheatSheetSearch(cheatsheets), []);
  const results = useMemo(() => {
    const trimmedQuery = query.trim();
    if (!trimmedQuery) return [];

    const seen = new Set<string>();
    return fuse.search(trimmedQuery)
      .filter(({ item }) => {
        if (seen.has(item.slug)) return false;
        seen.add(item.slug);
        return true;
      })
      .slice(0, 6)
      .map(({ item }) => item);
  }, [fuse, query]);

  useEffect(() => {
    function handleGlobalShortcut(event: KeyboardEvent) {
      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault();
        setIsOpen(true);
        inputRef.current?.focus();
      }
    }

    window.addEventListener('keydown', handleGlobalShortcut);
    return () => window.removeEventListener('keydown', handleGlobalShortcut);
  }, []);

  function handleKeyDown(event: ReactKeyboardEvent<HTMLInputElement>) {
    if (event.key === 'Escape') {
      setIsOpen(false);
      setActiveIndex(-1);
      return;
    }

    if (event.key === 'ArrowDown' && results.length) {
      event.preventDefault();
      setIsOpen(true);
      setActiveIndex((index) => index < 0 ? 0 : (index + 1) % results.length);
    }

    if (event.key === 'ArrowUp' && results.length) {
      event.preventDefault();
      setIsOpen(true);
      setActiveIndex((index) => index < 0 ? results.length - 1 : (index - 1 + results.length) % results.length);
    }

    if (event.key === 'Enter' && results.length) {
      event.preventDefault();
      router.push(`/cheatsheets/${results[activeIndex]?.slug ?? results[0].slug}`);
      setIsOpen(false);
    }
  }

  function updateQuery(value: string) {
    setQuery(value);
      setActiveIndex(-1);
    setIsOpen(Boolean(value.trim()));
  }

  return (
    <div className="search-wrap">
      <div className="search-input-wrap">
        <Search size={19} className="search-icon" aria-hidden="true" />
        <input
          ref={inputRef}
          role="combobox"
          aria-label="Search cheat sheets"
          aria-autocomplete="list"
          aria-expanded={Boolean(isOpen && query.trim())}
          aria-controls={listboxId}
          aria-activedescendant={isOpen && results[activeIndex] ? `${listboxId}-${results[activeIndex].slug}` : undefined}
          value={query}
          onChange={(event) => updateQuery(event.target.value)}
          onFocus={() => { if (query.trim()) setIsOpen(true); }}
          onKeyDown={handleKeyDown}
          placeholder="Search JavaScript, Git, SQL, flexbox..."
        />
        {query && <button type="button" className="clear-search" onClick={() => { updateQuery(''); setIsOpen(false); inputRef.current?.focus(); }} aria-label="Clear search"><X size={16} /></button>}
        <kbd>Ctrl K</kbd>
      </div>
      {isOpen && query.trim() && <div className="search-results" id={listboxId} role="listbox" aria-label="Search results">
        {results.length ? results.map((sheet, index) => <Link
          role="option"
          aria-selected={index === activeIndex}
          id={`${listboxId}-${sheet.slug}`}
          key={sheet.slug}
          href={`/cheatsheets/${sheet.slug}`}
          onMouseEnter={() => setActiveIndex(index)}
          onClick={() => { setQuery(''); setIsOpen(false); }}
          className={`search-result${index === activeIndex ? ' active' : ''}`}
        >
          <span className="result-dot" style={{ background: sheet.color }} />
          <span className="result-copy"><strong><HighlightMatch text={sheet.title} query={query} /></strong><small><HighlightMatch text={sheet.description} query={query} /></small><span className="result-category">{sheet.category}</span></span>
          <ArrowUpRight size={16} aria-hidden="true" />
        </Link>) : <div className="empty-search" role="status">No matches. Try a language, command, or keyword.</div>}
      </div>}
    </div>
  );
}
