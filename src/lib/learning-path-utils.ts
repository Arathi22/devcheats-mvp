import { cheatsheets } from '../data/cheatsheets.ts';
import { learningExercises } from '../data/learning-exercises.ts';
import { learningPaths } from '../data/learning-paths.ts';
import type { LearningPath } from '../data/learning-paths.ts';

export function validateLearningPaths(paths: LearningPath[] = learningPaths, knownSheetSlugs: string[] = cheatsheets.map((sheet) => sheet.slug), knownExerciseIds: string[] = learningExercises.map((exercise) => exercise.id)): string[] {
  const issues: string[] = [];
  const ids = new Set<string>();
  const slugs = new Set<string>();
  const sheetSlugs = new Set(knownSheetSlugs);
  const exerciseIds = new Set(knownExerciseIds);
  for (const path of paths) {
    if (ids.has(path.id)) issues.push(`Duplicate learning path ID: ${path.id}`);
    ids.add(path.id);
    if (slugs.has(path.slug)) issues.push(`Duplicate learning path slug: ${path.slug}`);
    slugs.add(path.slug);
    if (!path.steps.length) issues.push(`Learning path ${path.slug} has no steps`);
    const stepIds = new Set<string>();
    for (const step of path.steps) {
      if (stepIds.has(step.id)) issues.push(`Duplicate step ID ${step.id} in ${path.slug}`);
      stepIds.add(step.id);
      if (!step.title.trim() || !step.description.trim()) issues.push(`Step ${step.id} in ${path.slug} is missing text`);
      const hasSheet = Boolean(step.cheatSheetSlug);
      const hasActivity = Boolean(step.activity?.title.trim() && step.activity?.content.trim());
      if (hasSheet === hasActivity) issues.push(`Step ${step.id} in ${path.slug} must have exactly one cheat sheet or learning activity`);
      if (step.cheatSheetSlug && !sheetSlugs.has(step.cheatSheetSlug)) issues.push(`Step ${step.id} in ${path.slug} references missing cheat sheet ${step.cheatSheetSlug}`);
      if (step.exerciseId && !exerciseIds.has(step.exerciseId)) issues.push(`Step ${step.id} in ${path.slug} references missing exercise ${step.exerciseId}`);
    }
  }
  return issues;
}

export function getLearningPath(slug: string) { return learningPaths.find((path) => path.slug === slug); }
