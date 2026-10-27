import { learningPaths } from '../data/learning-paths.ts';
import type { LearningPath } from '../data/learning-paths.ts';

export const LEARNING_PROGRESS_KEY = 'devcheats-learning-progress-v1';
export type PathProgress = { startedAt: string | null; completedStepIds: string[]; lastAccessedAt: string | null; lastLessonId: string | null };
export type LearningProgress = { version: 1; paths: Record<string, PathProgress>; lastActivityAt: string | null };

export type PathMetrics = { totalSteps: number; completedSteps: number; remainingSteps: number; percentage: number; firstIncompleteStepId: string | null; isComplete: boolean };
export type DashboardMetrics = { overallPercentage: number; totalLessons: number; totalLessonsCompleted: number; startedPaths: LearningPath[]; completedPaths: LearningPath[]; inProgressPaths: LearningPath[]; recentlyAccessedPaths: LearningPath[]; completedLessons: { path: LearningPath; stepId: string; title: string }[] };

export function emptyLearningProgress(): LearningProgress { return { version: 1, paths: {}, lastActivityAt: null }; }

function validTimestamp(value: unknown): value is string { return typeof value === 'string' && Number.isFinite(Date.parse(value)); }

export function restoreLearningProgress(raw: string | null, paths: LearningPath[] = learningPaths): LearningProgress {
  if (!raw) return emptyLearningProgress();
  try {
    const parsed: unknown = JSON.parse(raw);
    if (!parsed || typeof parsed !== 'object') return emptyLearningProgress();
    const input = parsed as Record<string, unknown>;
    if (input.version !== 1 || !input.paths || typeof input.paths !== 'object' || Array.isArray(input.paths)) return emptyLearningProgress();
    const known = new Map(paths.map((path) => [path.id, path]));
    const restored: Record<string, PathProgress> = {};
    for (const [pathId, rawEntry] of Object.entries(input.paths as Record<string, unknown>)) {
      const path = known.get(pathId);
      if (!path || !rawEntry || typeof rawEntry !== 'object') continue;
      const entry = rawEntry as Record<string, unknown>;
      const validStepIds = new Set(path.steps.map((step) => step.id));
      const completed = Array.isArray(entry.completedStepIds)
        ? [...new Set(entry.completedStepIds.filter((id): id is string => typeof id === 'string' && validStepIds.has(id)))] : [];
      restored[pathId] = {
        startedAt: validTimestamp(entry.startedAt) ? entry.startedAt : null,
        completedStepIds: completed,
        lastAccessedAt: validTimestamp(entry.lastAccessedAt) ? entry.lastAccessedAt : null,
        lastLessonId: typeof entry.lastLessonId === 'string' && validStepIds.has(entry.lastLessonId) ? entry.lastLessonId : null,
      };
    }
    return { version: 1, paths: restored, lastActivityAt: validTimestamp(input.lastActivityAt) ? input.lastActivityAt : null };
  } catch { return emptyLearningProgress(); }
}

export function serializeLearningProgress(progress: LearningProgress): string { return JSON.stringify(progress); }

function updatedPath(progress: LearningProgress, pathId: string, timestamp: string, patch: Partial<PathProgress>): LearningProgress {
  const current = progress.paths[pathId] ?? { startedAt: null, completedStepIds: [], lastAccessedAt: null, lastLessonId: null };
  return { version: 1, paths: { ...progress.paths, [pathId]: { ...current, ...patch } }, lastActivityAt: timestamp };
}

export function recordPathAccess(progress: LearningProgress, pathId: string, lessonId?: string, timestamp = new Date().toISOString()): LearningProgress {
  const path = learningPaths.find((item) => item.id === pathId);
  if (!path) return progress;
  const lastLessonId = lessonId && path.steps.some((step) => step.id === lessonId) ? lessonId : progress.paths[pathId]?.lastLessonId ?? null;
  return updatedPath(progress, pathId, timestamp, { lastAccessedAt: timestamp, lastLessonId });
}

export function startLearningPath(progress: LearningProgress, pathId: string, timestamp = new Date().toISOString()): LearningProgress {
  const path = learningPaths.find((item) => item.id === pathId);
  if (!path) return progress;
  const current = progress.paths[pathId];
  return updatedPath(progress, pathId, timestamp, { startedAt: current?.startedAt ?? timestamp, lastAccessedAt: timestamp });
}

export function setLessonCompleted(progress: LearningProgress, pathId: string, stepId: string, completed: boolean, timestamp = new Date().toISOString()): LearningProgress {
  const path = learningPaths.find((item) => item.id === pathId);
  if (!path?.steps.some((step) => step.id === stepId)) return progress;
  const current = progress.paths[pathId] ?? { startedAt: null, completedStepIds: [], lastAccessedAt: null, lastLessonId: null };
  const ids = new Set(current.completedStepIds);
  if (completed) ids.add(stepId); else ids.delete(stepId);
  return updatedPath(progress, pathId, timestamp, { startedAt: current.startedAt ?? timestamp, completedStepIds: [...ids], lastAccessedAt: timestamp, lastLessonId: stepId });
}

export function resetLearningPath(progress: LearningProgress, pathId: string, timestamp = new Date().toISOString()): LearningProgress {
  if (!learningPaths.some((path) => path.id === pathId)) return progress;
  const paths = { ...progress.paths };
  delete paths[pathId];
  return { version: 1, paths, lastActivityAt: timestamp };
}

export function getPathMetrics(path: LearningPath, completedStepIds: string[] = []): PathMetrics {
  const totalSteps = path.steps.length;
  const valid = new Set(path.steps.map(({ id }) => id));
  const completed = new Set(completedStepIds.filter((id) => valid.has(id)));
  const completedSteps = completed.size;
  return { totalSteps, completedSteps, remainingSteps: Math.max(0, totalSteps - completedSteps), percentage: totalSteps === 0 ? 0 : Math.round(completedSteps / totalSteps * 100), firstIncompleteStepId: path.steps.find(({ id }) => !completed.has(id))?.id ?? null, isComplete: totalSteps > 0 && completedSteps === totalSteps };
}

export function getDashboardMetrics(progress: LearningProgress, paths: LearningPath[] = learningPaths): DashboardMetrics {
  const totalLessons = paths.reduce((sum, path) => sum + path.steps.length, 0);
  let totalLessonsCompleted = 0;
  const startedPaths = paths.filter((path) => Boolean(progress.paths[path.id]?.startedAt));
  const completedPaths = startedPaths.filter((path) => getPathMetrics(path, progress.paths[path.id]?.completedStepIds).isComplete);
  const inProgressPaths = startedPaths.filter((path) => !getPathMetrics(path, progress.paths[path.id]?.completedStepIds).isComplete);
  const recentlyAccessedPaths = paths.filter((path) => Boolean(progress.paths[path.id]?.lastAccessedAt)).sort((a, b) => Date.parse(progress.paths[b.id].lastAccessedAt!) - Date.parse(progress.paths[a.id].lastAccessedAt!));
  const completedLessons: DashboardMetrics['completedLessons'] = [];
  for (const path of paths) for (const stepId of progress.paths[path.id]?.completedStepIds ?? []) {
    const step = path.steps.find((item) => item.id === stepId);
    if (step) { totalLessonsCompleted += 1; completedLessons.push({ path, stepId, title: step.title }); }
  }
  return { overallPercentage: totalLessons === 0 ? 0 : Math.round(totalLessonsCompleted / totalLessons * 100), totalLessons, totalLessonsCompleted, startedPaths, completedPaths, inProgressPaths, recentlyAccessedPaths, completedLessons };
}
