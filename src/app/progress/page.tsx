import type { Metadata } from 'next';
import { LearningProgressDashboard } from '@/components/LearningProgressDashboard';

export const metadata: Metadata = { title: 'Learning Progress', description: 'Review completed lessons and continue your developer learning paths.', robots: { index: false, follow: false } };

export default function LearningProgressPage() { return <LearningProgressDashboard />; }
