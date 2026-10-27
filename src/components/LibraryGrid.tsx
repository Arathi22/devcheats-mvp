'use client';

import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { useMemo, useState } from 'react';
import type { CSSProperties } from 'react';
import type { CheatSheet } from '@/data/cheatsheets';

const categories = ['All', 'Language', 'Web', 'Framework', 'Runtime', 'Database', 'Tools'];

export function LibraryGrid({ sheets }: { sheets: CheatSheet[] }) {
  const [active, setActive] = useState('All');
  const filtered = useMemo(() => active === 'All' ? sheets : sheets.filter((sheet) => sheet.category === active), [active, sheets]);

  return <>
    <div className="category-pills" aria-label="Filter cheat sheets">{categories.map((category) => <button key={category} type="button" aria-pressed={active === category} onClick={() => setActive(category)} className={active === category ? 'category-pill active' : 'category-pill'}>{category}</button>)}</div>
    <div className="sheet-grid">{filtered.map((sheet) => {
      const index = sheets.findIndex((item) => item.slug === sheet.slug);
      return <Link href={`/cheatsheets/${sheet.slug}`} key={sheet.slug} className="sheet-card" style={{ ['--sheet-color' as string]: sheet.color } as CSSProperties}>
        <div className="card-top"><span className="sheet-icon">{sheet.title === 'JavaScript' ? 'JS' : sheet.title === 'TypeScript' ? 'TS' : sheet.title === 'React' ? '⚛' : sheet.title === 'HTML' ? '</>' : sheet.title === 'CSS' ? '#' : sheet.title === 'Node.js' ? '⬡' : sheet.title === 'Python' ? 'Py' : sheet.title === 'SQL' ? 'DB' : sheet.title === 'Git' ? '⌘' : '◈'}</span><span className="card-index">{String(index + 1).padStart(2, '0')}</span></div>
        <div className="card-content"><span className="card-category">{sheet.category}</span><h3>{sheet.title}</h3><p>{sheet.description}</p></div>
        <div className="card-bottom"><span>{sheet.snippets.length} quick references</span><span className="card-arrow"><ArrowRight size={17} /></span></div>
      </Link>;
    })}</div>
    {!filtered.length && <p className="empty-search">No cheat sheets in this category yet.</p>}
  </>;
}
