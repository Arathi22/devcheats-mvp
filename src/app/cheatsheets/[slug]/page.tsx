import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, ChevronRight, MoveUp } from 'lucide-react';
import { notFound } from 'next/navigation';
import { CodeBlock } from '@/components/CodeBlock';
import { CopyLinkButton } from '@/components/CopyLinkButton';
import { TableOfContents } from '@/components/TableOfContents';
import { FavoriteButton } from '@/components/FavoriteButton';
import { cheatsheets, getCheatSheet } from '@/data/cheatsheets';
import { getEstimatedReadingMinutes, getRelatedCheatSheets, getSectionId } from '@/lib/cheatsheet-utils';
import { learningPaths } from '@/data/learning-paths';

type PageProps = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return cheatsheets.map((sheet) => ({ slug: sheet.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const sheet = getCheatSheet(slug);
  if (!sheet) return { title: 'Cheat sheet not found' };
  return {
    title: sheet.title,
    description: sheet.description,
    keywords: [sheet.category, ...sheet.tags],
    openGraph: { title: `${sheet.title} cheat sheet`, description: sheet.description, type: 'article' },
  };
}

export default async function CheatSheetPage({ params }: PageProps) {
  const { slug } = await params;
  const sheet = getCheatSheet(slug);
  if (!sheet) notFound();
  const related = getRelatedCheatSheets(sheet, cheatsheets);
  const relatedLearningPaths = learningPaths.filter((path) => path.steps.some((step) => step.cheatSheetSlug === sheet.slug));
  const tocItems = [{ id: 'overview', title: 'Overview' }, ...sheet.snippets.map((snippet, index) => ({ id: getSectionId(sheet.slug, index), title: snippet.title }))];

  return <main className="detail-page shell" id="cheat-sheet-top">
    <div className="breadcrumbs"><Link href="/"><ArrowLeft size={15} /> All cheat sheets</Link><ChevronRight size={14} /><span>{sheet.title}</span></div>
    <div className="detail-layout"><TableOfContents items={tocItems} />
      <article className="detail-content"><div className="detail-title-row"><div><span className="card-category">{sheet.category} / CHEAT SHEET</span><h1>{sheet.title}</h1></div><div className="detail-actions"><FavoriteButton slug={sheet.slug} title={sheet.title} compact /><span className="detail-symbol" style={{ background: sheet.color }}>{sheet.title.slice(0, 2)}</span></div></div>
        <section className="overview-section" id="overview"><div className="overview-section-heading"><h2>Overview</h2><CopyLinkButton sectionId="overview" sectionTitle="Overview" /></div><p className="detail-description">{sheet.description}</p><div className="content-meta"><span>{sheet.difficulty}</span><span>{getEstimatedReadingMinutes(sheet)} min read</span><span>Reviewed <time dateTime={sheet.lastReviewed}>{sheet.lastReviewed}</time></span></div><div className="tag-row">{sheet.tags.map((tag) => <span className="tag" key={tag}>#{tag}</span>)}</div></section>
        {sheet.snippets.map((snippet, i) => {
          const sectionId = getSectionId(sheet.slug, i);
          return <section className="snippet-section" id={sectionId} key={sectionId}><div className="snippet-heading"><span className="snippet-number">{String(i + 1).padStart(2, '0')}</span><div><h2>{snippet.title}</h2><p>{snippet.description}</p></div><CopyLinkButton sectionId={sectionId} sectionTitle={snippet.title} /></div><CodeBlock language={snippet.language} code={snippet.code} title={snippet.title} sectionId={sectionId} sourceSlug={sheet.slug} sourceTitle={sheet.title} /></section>;
        })}
        {relatedLearningPaths.length > 0 && <section className="sheet-learning-paths"><span>KEEP LEARNING</span><h2>Learning paths with {sheet.title}</h2><div>{relatedLearningPaths.map((path) => <Link href={`/learning-paths/${path.slug}`} key={path.id}>{path.title}<ArrowRight size={14} /></Link>)}</div></section>}
        <div className="detail-next"><span>KEEP EXPLORING</span><h2>Related cheat sheets</h2>{related.length
          ? <div className="related-links">{related.map((item) => <Link href={`/cheatsheets/${item.slug}`} key={item.slug}>{item.title}<ArrowRight size={15} /></Link>)}</div>
          : <p className="related-empty">No closely related guides yet. Browse the full library to find another topic.</p>}
          <a className="back-to-top" href="#cheat-sheet-top"><MoveUp size={15} /> Back to top</a>
        </div>
      </article></div>
  </main>;
}
