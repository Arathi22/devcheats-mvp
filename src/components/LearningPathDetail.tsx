'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, BookOpen, Check, CheckCircle2, Clock3, RotateCcw } from 'lucide-react';
import { LearningExercise } from '@/components/LearningExercise';
import { useLearningProgress } from '@/components/LearningProgressProvider';
import type { LearningPath } from '@/data/learning-paths';
import { getPathMetrics } from '@/lib/learning-progress';

export function LearningPathDetail({ path }: { path: LearningPath }) {
  const { progress, ready, startPath, recordAccess, setLessonComplete, resetPath } = useLearningProgress();
  const saved = progress.paths[path.id];
  const metrics = getPathMetrics(path, saved?.completedStepIds);
  const firstIncomplete = metrics.firstIncompleteStepId ?? path.steps[0]?.id;
  const started = Boolean(saved?.startedAt);

  useEffect(() => { if (ready) recordAccess(path.id); }, [ready, path.id, recordAccess]);

  function reset() {
    if (window.confirm(`Reset progress for “${path.title}”? Completed lesson checkmarks will be cleared.`)) resetPath(path.id);
  }

  return <main className="learning-page shell learning-detail-page">
    <Link className="learning-back-link" href="/learning-paths"><ArrowLeft size={14} /> All learning paths</Link>
    <header className="learning-detail-heading">
      <div className="learning-path-card-meta"><span className="learning-category">{path.category}</span><span className={`learning-level level-${path.level.startsWith('Beginner') ? 'beginner' : path.level.toLowerCase()}`}>{path.level}</span></div>
      <h1>{path.title}<span>.</span></h1><p>{path.description}</p>
      <div className="learning-detail-facts"><span><BookOpen size={15} /> {path.steps.length} lessons</span><span><Clock3 size={15} /> About {path.estimatedMinutes} minutes</span></div>
      <div className="learning-detail-actions">
        {metrics.isComplete
          ? <Link className="tool-button primary" href={`#lesson-${path.steps[0]?.id}`}><RotateCcw size={15} /> Review path</Link>
          : <Link className="tool-button primary" href={firstIncomplete ? `#lesson-${firstIncomplete}` : '#lessons'} onClick={() => startPath(path.id)}>{started ? 'Continue learning' : 'Start learning'} <ArrowRight size={15} /></Link>}
        {started && <button className="tool-button" type="button" disabled={!ready} onClick={reset}><RotateCcw size={14} /> Reset progress</button>}
      </div>
    </header>

    <section className="learning-progress-panel" aria-label="Learning path progress">
      <div className="learning-progress-copy"><div><strong>Your progress</strong><span>{metrics.completedSteps} lessons complete · {metrics.remainingSteps} remaining</span></div><strong>{metrics.percentage}%</strong></div>
      <div className="learning-progress-track large" role="progressbar" aria-label={`${path.title} completion`} aria-valuemin={0} aria-valuemax={100} aria-valuenow={metrics.percentage}><span style={{ width: `${metrics.percentage}%` }} /></div>
      {metrics.isComplete && <p className="learning-complete-message"><CheckCircle2 size={17} /> Path complete. Nice work! You can review any lesson below.</p>}
    </section>

    <div className="learning-detail-columns">
      <div className="learning-detail-main">
        <section className="learning-info-panel"><h2>What you’ll learn</h2><ul className="learning-objectives">{path.objectives.map((objective) => <li key={objective}><Check size={14} />{objective}</li>)}</ul></section>
        {path.prerequisites.length > 0 && <section className="learning-info-panel"><h2>Before you start</h2><ul className="learning-prerequisites">{path.prerequisites.map((item) => <li key={item}>{item}</li>)}</ul></section>}
        <section id="lessons" className="learning-lesson-list"><div className="learning-section-title"><div><span className="eyebrow">THE CURRICULUM</span><h2>Lessons in order</h2></div><span>{metrics.completedSteps}/{metrics.totalSteps} done</span></div>
          {path.steps.map((step, index) => {
            const completed = saved?.completedStepIds.includes(step.id) ?? false;
            return <article className={`learning-lesson ${completed ? 'completed' : ''}`} id={`lesson-${step.id}`} key={step.id}>
              <div className="learning-lesson-number">{completed ? <Check size={15} /> : String(index + 1).padStart(2, '0')}</div>
              <div className="learning-lesson-body"><div className="learning-lesson-title"><h3>{step.title}</h3><span>{completed ? 'Completed' : step.cheatSheetSlug ? 'Cheat sheet' : 'Guided activity'}</span></div><p>{step.description}</p>
                {step.cheatSheetSlug && <Link className="learning-material-link" href={`/cheatsheets/${step.cheatSheetSlug}`} onClick={() => recordAccess(path.id, step.id)}><BookOpen size={14} /> Open {step.title} cheat sheet <ArrowRight size={13} /></Link>}
                {step.activity && <div className="learning-activity"><strong>{step.activity.title}</strong><p>{step.activity.content}</p>{step.activity.practice && <small><b>Try it:</b> {step.activity.practice}</small>}</div>}
                {step.exerciseId && <LearningExercise exerciseId={step.exerciseId} />}
                <button className={`learning-completion-button ${completed ? 'done' : ''}`} type="button" disabled={!ready} onClick={() => setLessonComplete(path.id, step.id, !completed)}>{completed ? <><CheckCircle2 size={14} /> Completed · Undo</> : <><Check size={14} /> Mark lesson complete</>}</button>
              </div>
            </article>;
          })}
        </section>
      </div>
      <aside className="learning-detail-aside">
        <div className="learning-aside-card"><span className="eyebrow">PATH DETAILS</span><p><strong>Level</strong><span>{path.level}</span></p><p><strong>Lessons</strong><span>{path.steps.length}</span></p><p><strong>Estimated time</strong><span>{path.estimatedMinutes} min</span></p><p><strong>Progress</strong><span>{metrics.percentage}%</span></p></div>
        {path.recommendedTools?.length ? <div className="learning-aside-card"><span className="eyebrow">TOOLS TO TRY</span>{path.recommendedTools.map((tool) => <Link className="learning-tool-link" href={tool.href} key={tool.href}><strong>{tool.title}</strong><span>{tool.description}</span></Link>)}</div> : null}
        <div className="learning-aside-card browser-storage-note"><strong>Your progress is private to this browser.</strong><p>It is saved locally and does not sync to other devices.</p></div>
      </aside>
    </div>
  </main>;
}
