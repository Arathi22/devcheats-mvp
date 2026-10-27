import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { LearningPathDetail } from '@/components/LearningPathDetail';
import { getLearningPath } from '@/lib/learning-path-utils';
import { learningPaths } from '@/data/learning-paths';
import { getCanonicalMetadata } from '@/lib/site-url';

type PageProps = { params: Promise<{ slug: string }> };

export function generateStaticParams() { return learningPaths.map((path) => ({ slug: path.slug })); }

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const path = getLearningPath(slug);
  return path
    ? {
        title: path.title,
        description: path.description,
        keywords: [path.category, path.level, 'learning path'],
        openGraph: { title: path.title, description: path.description, type: 'article' },
        ...getCanonicalMetadata(`/learning-paths/${path.slug}`),
      }
    : { title: 'Learning path not found', robots: { index: false, follow: false } };
}

export default async function LearningPathPage({ params }: PageProps) {
  const { slug } = await params;
  const path = getLearningPath(slug);
  if (!path) notFound();
  return <LearningPathDetail path={path} />;
}
