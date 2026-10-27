import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, BookOpen, ChevronRight } from 'lucide-react';
import { notFound } from 'next/navigation';
import { CodeBlock } from '@/components/CodeBlock';
import { cheatsheets, getCheatSheet } from '@/data/cheatsheets';

type PageProps = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return cheatsheets.map((sheet) => ({ slug: sheet.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const sheet = getCheatSheet(slug);
  if (!sheet) return { title: 'Cheat sheet not found' };
  return { title: sheet.title, description: sheet.description };
}

export default async function CheatSheetPage({ params }: PageProps) {
  const { slug } = await params;
  const sheet = getCheatSheet(slug);
  if (!sheet) notFound();
  const related = cheatsheets.filter((item) => item.slug !== sheet.slug && (item.category === sheet.category || item.tags.some((tag) => sheet.tags.includes(tag)))).slice(0, 3);

  return <main className="detail-page shell">
    <div className="breadcrumbs"><Link href="/"><ArrowLeft size={15} /> All cheat sheets</Link><ChevronRight size={14} /><span>{sheet.title}</span></div>
        <div className="detail-layout"><aside className="detail-sidebar"><div className="sidebar-sticky"><span className="sidebar-label">ON THIS PAGE</span><a className="sidebar-link current" href="#overview">Overview</a>{sheet.snippets.map((snippet, i) => <a className="sidebar-link" key={snippet.title} href={`#snippet-${i + 1}`}>{snippet.title}</a>)}<div className="sidebar-tip"><BookOpen size={16} /><p>Tip: use your browser&apos;s find shortcut to locate a term on this page.</p></div></div></aside>
      <article className="detail-content"><div className="detail-title-row"><div><span className="card-category">{sheet.category} / CHEAT SHEET</span><h1>{sheet.title}</h1></div><span className="detail-symbol" style={{ background: sheet.color }}>{sheet.title.slice(0, 2)}</span></div><p className="detail-description" id="overview">{sheet.description}</p><div className="tag-row">{sheet.tags.map((tag) => <span className="tag" key={tag}>#{tag}</span>)}</div>
        <div className="quick-nav"><span>IN THIS GUIDE</span>{sheet.snippets.map((snippet, i) => <a key={snippet.title} href={`#snippet-${i + 1}`}>{snippet.title}<ArrowRight size={14} /></a>)}</div>
        {sheet.snippets.map((snippet, i) => <section className="snippet-section" id={`snippet-${i + 1}`} key={snippet.title}><div className="snippet-heading"><span className="snippet-number">{String(i + 1).padStart(2, '0')}</span><div><h2>{snippet.title}</h2><p>{snippet.description}</p></div></div><CodeBlock language={snippet.language} code={snippet.code} /></section>)}
        <div className="detail-next"><span>KEEP EXPLORING</span><h2>One more thing to learn?</h2><div className="related-links">{related.map((item) => <Link href={`/cheatsheets/${item.slug}`} key={item.slug}>{item.title}<ArrowRight size={15} /></Link>)}<Link href="/">All cheat sheets <ArrowRight size={15} /></Link></div></div>
      </article></div>
  </main>;
}
