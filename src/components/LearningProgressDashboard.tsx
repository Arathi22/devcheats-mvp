'use client';

import Link from 'next/link';
import { ArrowRight, CheckCircle2, Clock3, GraduationCap, ListChecks, Sparkles } from 'lucide-react';
import { LearningPathCard } from '@/components/LearningPathCard';
import { useLearningProgress } from '@/components/LearningProgressProvider';
import { getDashboardMetrics, getPathMetrics } from '@/lib/learning-progress';

export function LearningProgressDashboard() {
  const { progress, ready } = useLearningProgress();
  const metrics = getDashboardMetrics(progress);
  return <main className="learning-page shell progress-dashboard">
    <header className="learning-landing-heading"><div><span className="eyebrow"><span className="eyebrow-pulse" /> YOUR LEARNING</span><h1>Progress<span>.</span></h1><p>A clear view of the lessons you’ve chosen to complete. Progress is saved in this browser.</p></div><Link className="tool-button" href="/learning-paths">Browse learning paths <ArrowRight size={14} /></Link></header>
    <section className="progress-overview"><div className="progress-overview-main"><span className="eyebrow">ALL PATHS</span><strong>{metrics.overallPercentage}<small>%</small></strong><span>{metrics.totalLessonsCompleted} of {metrics.totalLessons} lessons completed</span><div className="learning-progress-track large" role="progressbar" aria-label="Overall learning completion" aria-valuemin={0} aria-valuemax={100} aria-valuenow={metrics.overallPercentage}><span style={{ width: `${metrics.overallPercentage}%` }} /></div></div>
      <div className="progress-metric-grid"><div><GraduationCap size={17} /><strong>{metrics.startedPaths.length}</strong><span>paths started</span></div><div><ListChecks size={17} /><strong>{metrics.totalLessonsCompleted}</strong><span>lessons completed</span></div><div><Clock3 size={17} /><strong>{metrics.inProgressPaths.length}</strong><span>in progress</span></div><div><CheckCircle2 size={17} /><strong>{metrics.completedPaths.length}</strong><span>paths completed</span></div></div>
    </section>

    {!metrics.startedPaths.length && ready ? <section className="progress-empty"><span className="progress-empty-icon"><Sparkles size={20} /></span><h2>Your learning starts here</h2><p>Choose a path, explore the lessons, and mark each lesson complete when you’re ready. Opening a lesson alone won’t mark it complete.</p><Link className="tool-button primary" href="/learning-paths">Explore learning paths <ArrowRight size={14} /></Link></section> : <>
      {metrics.inProgressPaths.length > 0 && <section className="progress-section"><div className="learning-section-title"><div><span className="eyebrow">PICK UP WHERE YOU LEFT OFF</span><h2>Continue learning</h2></div><span>{metrics.inProgressPaths.length} in progress</span></div><div className="learning-path-grid dashboard-path-grid">{metrics.inProgressPaths.map((path) => <LearningPathCard key={path.id} path={path} progress={progress.paths[path.id]} compact />)}</div></section>}
      {metrics.completedPaths.length > 0 && <section className="progress-section"><div className="learning-section-title"><div><span className="eyebrow">NICE WORK</span><h2>Completed paths</h2></div><span>{metrics.completedPaths.length} complete</span></div><div className="learning-path-grid dashboard-path-grid">{metrics.completedPaths.map((path) => <LearningPathCard key={path.id} path={path} progress={progress.paths[path.id]} compact />)}</div></section>}
      {metrics.recentlyAccessedPaths.length > 0 && <section className="progress-section"><div className="learning-section-title"><div><span className="eyebrow">RECENT ACTIVITY</span><h2>Recently accessed</h2></div></div><div className="recent-path-list">{metrics.recentlyAccessedPaths.slice(0, 5).map((path) => { const pathProgress = progress.paths[path.id]; const target = pathProgress.lastLessonId ?? getPathMetrics(path, pathProgress.completedStepIds).firstIncompleteStepId ?? path.steps[0]?.id; return <Link className="recent-path-item" href={`/learning-paths/${path.slug}${target ? `#lesson-${target}` : ''}`} key={path.id}><span><strong>{path.title}</strong><small>{pathProgress.startedAt ? `${pathProgress.completedStepIds.length} lessons checked off` : 'Viewed path'}</small></span><ArrowRight size={15} /></Link>; })}</div></section>}
      {metrics.completedLessons.length > 0 && <section className="progress-section"><div className="learning-section-title"><div><span className="eyebrow">YOUR CHECKPOINTS</span><h2>Completed lessons</h2></div><span>{metrics.completedLessons.length} lessons</span></div><ul className="completed-lesson-list">{metrics.completedLessons.map(({ path, stepId, title }) => <li key={`${path.id}:${stepId}`}><CheckCircle2 size={15} /><span><strong>{title}</strong><small>{path.title}</small></span><Link href={`/learning-paths/${path.slug}#lesson-${stepId}`} aria-label={`Review ${title}`}>Review <ArrowRight size={13} /></Link></li>)}</ul></section>}
    </>}
    <p className="learning-privacy-note">This dashboard uses only your saved lesson checkmarks. No time estimates or activity totals are inferred.</p>
  </main>;
}
