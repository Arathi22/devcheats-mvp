import test from 'node:test';
import assert from 'node:assert/strict';
import { learningPaths } from '../data/learning-paths.ts';
import { validateLearningPaths } from './learning-path-utils.ts';
import { emptyLearningProgress, getDashboardMetrics, getPathMetrics, recordPathAccess, resetLearningPath, restoreLearningProgress, serializeLearningProgress, setLessonCompleted, startLearningPath } from './learning-progress.ts';

test('curated paths have unique IDs and slugs and valid lesson references', () => {
  assert.deepEqual(validateLearningPaths(), []);
  assert.equal(new Set(learningPaths.map((path) => path.id)).size, learningPaths.length);
  assert.equal(new Set(learningPaths.map((path) => path.slug)).size, learningPaths.length);
});

test('path validation reports duplicate identifiers, missing steps, and broken internal references', () => {
  const path = learningPaths[0];
  const invalid = [
    path,
    { ...path, id: path.id, slug: path.slug, steps: [] },
    { ...path, id: 'broken-path', slug: 'broken-path', steps: [{ ...path.steps[0], cheatSheetSlug: 'missing-cheat-sheet' }] },
  ];
  const errors = validateLearningPaths(invalid);
  assert.ok(errors.some((error) => error.includes('Duplicate learning path ID')));
  assert.ok(errors.some((error) => error.includes('Duplicate learning path slug')));
  assert.ok(errors.some((error) => error.includes('has no steps')));
  assert.ok(errors.some((error) => error.includes('missing cheat sheet')));
});

test('path progress uses completed steps and safely handles empty paths', () => {
  const path = learningPaths[0];
  const metrics = getPathMetrics(path, [path.steps[0].id, 'unknown-step']);
  assert.equal(metrics.percentage, Math.round(1 / path.steps.length * 100));
  assert.equal(metrics.completedSteps, 1);
  assert.equal(metrics.remainingSteps, path.steps.length - 1);
  assert.equal(metrics.firstIncompleteStepId, path.steps[1].id);
  assert.equal(getPathMetrics({ ...path, steps: [] }).percentage, 0);
  assert.equal(getPathMetrics({ ...path, steps: [] }).firstIncompleteStepId, null);
});

test('starting, completing, undoing, and resetting a path update its saved state', () => {
  const path = learningPaths[0];
  const time = '2026-01-02T03:04:05.000Z';
  let progress = startLearningPath(emptyLearningProgress(), path.id, time);
  assert.equal(progress.paths[path.id].startedAt, time);
  progress = setLessonCompleted(progress, path.id, path.steps[0].id, true, time);
  assert.deepEqual(progress.paths[path.id].completedStepIds, [path.steps[0].id]);
  progress = setLessonCompleted(progress, path.id, path.steps[0].id, false, time);
  assert.deepEqual(progress.paths[path.id].completedStepIds, []);
  progress = setLessonCompleted(progress, path.id, path.steps[0].id, true, time);
  progress = resetLearningPath(progress, path.id, time);
  assert.equal(progress.paths[path.id], undefined);
  assert.equal(progress.lastActivityAt, time);
});

test('first incomplete lesson advances in order and becomes null after all lessons finish', () => {
  const path = learningPaths[0];
  const completed = path.steps.slice(0, -1).map((step) => step.id);
  assert.equal(getPathMetrics(path, completed).firstIncompleteStepId, path.steps.at(-1)?.id);
  assert.equal(getPathMetrics(path, path.steps.map((step) => step.id)).firstIncompleteStepId, null);
  assert.equal(getPathMetrics(path, path.steps.map((step) => step.id)).isComplete, true);
});

test('progress persistence restores valid known lesson IDs and rejects malformed or outdated data', () => {
  const path = learningPaths[0];
  let progress = startLearningPath(emptyLearningProgress(), path.id, '2026-01-01T00:00:00.000Z');
  progress = recordPathAccess(progress, path.id, path.steps[1].id, '2026-01-02T00:00:00.000Z');
  progress = setLessonCompleted(progress, path.id, path.steps[0].id, true, '2026-01-03T00:00:00.000Z');
  const restored = restoreLearningProgress(serializeLearningProgress(progress));
  assert.deepEqual(restored, progress);
  assert.deepEqual(restoreLearningProgress('{bad json'), emptyLearningProgress());
  assert.deepEqual(restoreLearningProgress(JSON.stringify({ version: 0, paths: {} })), emptyLearningProgress());
  const partlyBad = restoreLearningProgress(JSON.stringify({ version: 1, lastActivityAt: 'bad', paths: { [path.id]: { startedAt: 'bad', completedStepIds: [path.steps[0].id, 'unknown'], lastAccessedAt: 'bad', lastLessonId: 'unknown' }, 'removed-path': { completedStepIds: [] } } }));
  assert.deepEqual(partlyBad.paths[path.id].completedStepIds, [path.steps[0].id]);
  assert.equal(partlyBad.paths[path.id].startedAt, null);
  assert.equal(partlyBad.paths['removed-path'], undefined);
  assert.equal(partlyBad.lastActivityAt, null);
  assert.deepEqual(restoreLearningProgress(null), emptyLearningProgress());
});

test('dashboard metrics derive started, completed, recent paths, lessons, and percentage from saved progress', () => {
  const first = learningPaths[0];
  const second = learningPaths[1];
  let progress = startLearningPath(emptyLearningProgress(), first.id, '2026-03-01T00:00:00.000Z');
  for (const step of first.steps) progress = setLessonCompleted(progress, first.id, step.id, true, '2026-03-02T00:00:00.000Z');
  progress = startLearningPath(progress, second.id, '2026-03-03T00:00:00.000Z');
  progress = setLessonCompleted(progress, second.id, second.steps[0].id, true, '2026-03-04T00:00:00.000Z');
  const metrics = getDashboardMetrics(progress);
  assert.equal(metrics.startedPaths.length, 2);
  assert.equal(metrics.completedPaths.length, 1);
  assert.equal(metrics.completedPaths[0].id, first.id);
  assert.equal(metrics.inProgressPaths.length, 1);
  assert.equal(metrics.totalLessonsCompleted, first.steps.length + 1);
  assert.equal(metrics.overallPercentage, Math.round(metrics.totalLessonsCompleted / metrics.totalLessons * 100));
  assert.equal(metrics.recentlyAccessedPaths[0].id, second.id);
  assert.equal(metrics.completedLessons.length, metrics.totalLessonsCompleted);
  assert.equal(getDashboardMetrics(emptyLearningProgress()).overallPercentage, 0);
});
