import type { Metadata } from 'next';
import { LearningPathsBrowser } from '@/components/LearningPathsBrowser';
import { validateLearningPaths } from '@/lib/learning-path-utils';
import { getCanonicalMetadata } from '@/lib/site-url';

export const metadata: Metadata = {
  title: 'Learning Paths',
  description: 'Follow curated developer learning paths with practical lessons and local progress tracking.',
  openGraph: { title: 'Learning Paths', description: 'Follow curated developer learning paths with practical lessons and local progress tracking.', type: 'website' },
  ...getCanonicalMetadata('/learning-paths'),
};

export default function LearningPathsPage() {
  const issues = validateLearningPaths();
  if (issues.length) throw new Error(`Invalid learning path data: ${issues.join('; ')}`);
  return <main className="learning-page shell learning-landing-page">
    <header className="learning-landing-heading"><div><span className="eyebrow"><span className="eyebrow-pulse" /> YOUR NEXT SKILL</span><h1>Learning paths<span>.</span></h1><p>Follow a curated sequence from fundamentals to practical developer workflows. Learn at your pace and track the lessons you complete.</p></div><span className="learning-path-count">07 <small>PATHS</small></span></header>
    <LearningPathsBrowser />
    <p className="learning-privacy-note">Your progress is stored in this browser and is not synchronized across devices.</p>
  </main>;
}
