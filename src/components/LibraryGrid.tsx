'use client';

import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { useMemo, useState } from 'react';
import type { CSSProperties } from 'react';
import type { CheatSheet } from '@/data/cheatsheets';
import { FavoriteButton } from '@/components/FavoriteButton';

export function LibraryGrid({ sheets }: { sheets: CheatSheet[] }) {
  const [active, setActive] = useState('All');
  const categories = useMemo(() => ['All', ...new Set(sheets.map((sheet) => sheet.category))], [sheets]);
  const filtered = useMemo(() => active === 'All' ? sheets : sheets.filter((sheet) => sheet.category === active), [active, sheets]);

  return <>
    <div className="category-pills" aria-label="Filter cheat sheets">{categories.map((category) => <button key={category} type="button" aria-pressed={active === category} onClick={() => setActive(category)} className={active === category ? 'category-pill active' : 'category-pill'}>{category}</button>)}</div>
    <div className="sheet-grid">{filtered.map((sheet) => {
      const index = sheets.findIndex((item) => item.slug === sheet.slug);
      const icon = sheet.category === 'Database' ? 'DB' : sheet.title.startsWith('JavaScript') ? 'JS' : sheet.title === 'TypeScript' ? 'TS' : sheet.title === 'React' ? '⚛' : sheet.title === 'HTML' ? '</>' : sheet.title.startsWith('CSS') ? '#' : sheet.title === 'Node.js' ? '⬡' : sheet.title === 'Python' ? 'Py' : sheet.title === 'Git' ? '⌘' : '◈';
      return <article key={sheet.slug} className="sheet-card" style={{ ['--sheet-color' as string]: sheet.color } as CSSProperties}>
        <div className="card-top"><span className="sheet-icon">{icon}</span><span className="card-index">{String(index + 1).padStart(2, '0')}</span><FavoriteButton slug={sheet.slug} title={sheet.title} compact /></div>
        <Link href={`/cheatsheets/${sheet.slug}`} className="sheet-card-link">
          <div className="card-content"><span className="card-category">{sheet.category}</span><h3>{sheet.title}</h3><p>{sheet.description}</p></div>
          <div className="card-bottom"><span>{sheet.snippets.length} quick references</span><span className="card-arrow"><ArrowRight size={17} /></span></div>
        </Link>
      </article>;
    })}</div>
    {!filtered.length && <p className="empty-search">No cheat sheets in this category yet.</p>}
  </>;
}
