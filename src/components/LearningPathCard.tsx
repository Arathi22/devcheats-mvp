import Link from 'next/link';
import { ArrowRight, CheckCircle2, Clock3, ListChecks } from 'lucide-react';
import type { LearningPath } from '@/data/learning-paths';
import { getPathMetrics } from '@/lib/learning-progress';
import type { PathProgress } from '@/lib/learning-progress';

export function LearningPathCard({ path, progress, compact = false }: { path: LearningPath; progress?: PathProgress; compact?: boolean }) {
  const metrics = getPathMetrics(path, progress?.completedStepIds);
  const started = Boolean(progress?.startedAt);
  const firstIncomplete = metrics.firstIncompleteStepId ?? path.steps[0]?.id;
  const href = `/learning-paths/${path.slug}${firstIncomplete ? `#lesson-${firstIncomplete}` : ''}`;
  return <article className={`learning-path-card ${compact ? 'compact' : ''}`}>
    <div className="learning-path-card-meta"><span className="learning-category">{path.category}</span><span className={`learning-level level-${path.level.startsWith('Beginner') ? 'beginner' : path.level.toLowerCase()}`}>{path.level}</span></div>
    <h2><Link href={href}>{path.title}</Link></h2>
    <p className="learning-path-description">{path.description}</p>
    <div className="learning-card-stats"><span><ListChecks size={14} /> {metrics.totalSteps} lessons</span><span><Clock3 size={14} /> {path.estimatedMinutes} min</span></div>
    {started && <div className="learning-card-progress"><div className="learning-progress-copy"><span>{metrics.completedSteps} of {metrics.totalSteps} complete</span><strong>{metrics.percentage}%</strong></div><div className="learning-progress-track" role="progressbar" aria-label={`${path.title} progress`} aria-valuemin={0} aria-valuemax={100} aria-valuenow={metrics.percentage}><span style={{ width: `${metrics.percentage}%` }} /></div></div>}
    <Link className="learning-card-action" href={href}>{started ? metrics.isComplete ? 'Review path' : 'Continue learning' : 'View learning path'} {metrics.isComplete ? <CheckCircle2 size={15} /> : <ArrowRight size={15} />}</Link>
  </article>;
}
