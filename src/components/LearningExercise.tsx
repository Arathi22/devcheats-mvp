'use client';

import { useState } from 'react';
import { Check, RotateCcw } from 'lucide-react';
import { learningExercises } from '@/data/learning-exercises';

export function LearningExercise({ exerciseId }: { exerciseId: string }) {
  const exercise = learningExercises.find((item) => item.id === exerciseId);
  const [selected, setSelected] = useState<number | null>(null);
  const [submitted, setSubmitted] = useState(false);
  if (!exercise) return null;
  const correct = selected === exercise.correctOption;
  return <section className="learning-exercise" aria-labelledby={`exercise-${exercise.id}`}>
    <span className="learning-exercise-label">OPTIONAL PRACTICE</span>
    <h3 id={`exercise-${exercise.id}`}>{exercise.question}</h3>
    <fieldset disabled={submitted && correct}>
      <legend className="sr-only">Choose an answer</legend>
      {exercise.options.map((option, index) => <label className={`learning-exercise-option ${submitted && index === exercise.correctOption ? 'correct' : ''} ${submitted && selected === index && !correct ? 'incorrect' : ''}`} key={option}>
        <input type="radio" name={`exercise-${exercise.id}`} checked={selected === index} onChange={() => setSelected(index)} />
        <span>{option}</span>
      </label>)}
    </fieldset>
    <div className="learning-exercise-actions">
      {submitted && <p className={`learning-exercise-feedback ${correct ? 'success' : 'error'}`} aria-live="polite">{correct ? 'Correct.' : 'Not quite.'} {exercise.explanation}</p>}
      {submitted && correct
        ? <button className="tool-copy" type="button" onClick={() => { setSelected(null); setSubmitted(false); }}><RotateCcw size={13} /> Try again</button>
        : <button className="tool-copy" type="button" disabled={selected === null} onClick={() => setSubmitted(true)}>{submitted ? 'Check again' : <><Check size={13} /> Check answer</>}</button>}
    </div>
  </section>;
}
