'use client';

import { createContext, useCallback, useContext, useEffect, useRef, useState } from 'react';
import type { ReactNode } from 'react';
import { getStorage } from '@/lib/saved-items';
import { emptyLearningProgress, LEARNING_PROGRESS_KEY, recordPathAccess, resetLearningPath, restoreLearningProgress, serializeLearningProgress, setLessonCompleted, startLearningPath } from '@/lib/learning-progress';
import type { LearningProgress } from '@/lib/learning-progress';

type LearningProgressContextValue = {
  progress: LearningProgress;
  ready: boolean;
  startPath: (pathId: string) => void;
  recordAccess: (pathId: string, lessonId?: string) => void;
  setLessonComplete: (pathId: string, lessonId: string, completed: boolean) => void;
  resetPath: (pathId: string) => void;
};

const LearningProgressContext = createContext<LearningProgressContextValue | null>(null);

export function LearningProgressProvider({ children }: { children: ReactNode }) {
  const [progress, setProgress] = useState<LearningProgress>(emptyLearningProgress);
  const [ready, setReady] = useState(false);
  const progressRef = useRef<LearningProgress>(emptyLearningProgress());

  useEffect(() => {
    const restore = () => {
      let saved: string | null = null;
      try { saved = getStorage()?.getItem(LEARNING_PROGRESS_KEY) ?? null; } catch { /* Progress remains usable in memory when storage is disabled. */ }
      const next = restoreLearningProgress(saved);
      progressRef.current = next;
      setProgress(next);
      setReady(true);
    };
    const timer = window.setTimeout(restore, 0);
    const onStorage = (event: StorageEvent) => { if (event.key === LEARNING_PROGRESS_KEY || event.key === null) restore(); };
    window.addEventListener('storage', onStorage);
    return () => { window.clearTimeout(timer); window.removeEventListener('storage', onStorage); };
  }, []);

  const commit = useCallback((transform: (current: LearningProgress) => LearningProgress) => {
    const next = transform(progressRef.current);
    progressRef.current = next;
    setProgress(next);
    try { getStorage()?.setItem(LEARNING_PROGRESS_KEY, serializeLearningProgress(next)); } catch { /* Keep progress available for this tab if storage is full or disabled. */ }
  }, []);

  const startPath = useCallback((pathId: string) => commit((current) => startLearningPath(current, pathId)), [commit]);
  const recordAccess = useCallback((pathId: string, lessonId?: string) => commit((current) => recordPathAccess(current, pathId, lessonId)), [commit]);
  const setLessonComplete = useCallback((pathId: string, lessonId: string, completed: boolean) => commit((current) => setLessonCompleted(current, pathId, lessonId, completed)), [commit]);
  const resetPath = useCallback((pathId: string) => commit((current) => resetLearningPath(current, pathId)), [commit]);

  return <LearningProgressContext.Provider value={{ progress, ready, startPath, recordAccess, setLessonComplete, resetPath }}>{children}</LearningProgressContext.Provider>;
}

export function useLearningProgress() {
  const context = useContext(LearningProgressContext);
  if (!context) throw new Error('useLearningProgress must be used inside LearningProgressProvider');
  return context;
}
