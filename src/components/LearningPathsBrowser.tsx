'use client';

import { useMemo, useState } from 'react';
import { Search, X } from 'lucide-react';
import { learningPaths } from '@/data/learning-paths';
import { LearningPathCard } from '@/components/LearningPathCard';
import { useLearningProgress } from '@/components/LearningProgressProvider';
import type { PathLevel } from '@/data/learning-paths';

const levels: ('All levels' | PathLevel)[] = ['All levels', 'Beginner', 'Beginner to Intermediate', 'Intermediate', 'Advanced'];

export function LearningPathsBrowser() {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('All topics');
  const [level, setLevel] = useState<'All levels' | PathLevel>('All levels');
  const { progress } = useLearningProgress();
  const categories = ['All topics', ...new Set(learningPaths.map((path) => path.category))];
  const filtered = useMemo(() => {
    const term = query.trim().toLowerCase();
    return learningPaths.filter((path) => {
      const matchesText = !term || [path.title, path.description, path.category, ...path.objectives, ...path.steps.flatMap((step) => [step.title, step.description])].join(' ').toLowerCase().includes(term);
      const matchesCategory = category === 'All topics' || category === path.category;
      const matchesLevel = level === 'All levels' || path.level === level || (level === 'Beginner' && path.level === 'Beginner to Intermediate') || (level === 'Intermediate' && path.level === 'Beginner to Intermediate');
      return matchesText && matchesCategory && matchesLevel;
    });
  }, [query, category, level]);
  return <>
    <div className="learning-filters">
      <label className="learning-search"><Search size={17} /><span className="sr-only">Search learning paths</span><input type="search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search paths or skills…" />{query && <button type="button" onClick={() => setQuery('')} aria-label="Clear search"><X size={15} /></button>}</label>
      <label className="learning-filter-select"><span>Topic</span><select aria-label="Filter by topic" value={category} onChange={(event) => setCategory(event.target.value)}>{categories.map((item) => <option key={item}>{item}</option>)}</select></label>
      <label className="learning-filter-select"><span>Level</span><select aria-label="Filter by difficulty" value={level} onChange={(event) => setLevel(event.target.value as typeof level)}>{levels.map((item) => <option key={item}>{item}</option>)}</select></label>
    </div>
    <div className="learning-results-summary"><span>{filtered.length} learning {filtered.length === 1 ? 'path' : 'paths'}</span><span>Curated by topic · progress stays in this browser</span></div>
    {filtered.length ? <div className="learning-path-grid">{filtered.map((path) => <LearningPathCard key={path.id} path={path} progress={progress.paths[path.id]} />)}</div>
      : <div className="learning-empty"><span>↗</span><h2>No learning paths found</h2><p>Try another search or clear a filter to see more topics.</p><button type="button" className="tool-button" onClick={() => { setQuery(''); setCategory('All topics'); setLevel('All levels'); }}>Clear filters</button></div>}
  </>;
}
