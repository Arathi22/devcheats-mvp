import type { Metadata } from 'next';
import { Playground } from '@/components/Playground';

export const metadata: Metadata = { title: 'Playground', description: 'Experiment with HTML, CSS, and JavaScript in a private browser preview.' };

export default function PlaygroundPage() {
  return <Playground />;
}
