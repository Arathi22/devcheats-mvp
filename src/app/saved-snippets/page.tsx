import type { Metadata } from 'next';
import { SavedSnippetsPageContent } from '@/components/SavedSnippetsPageContent';

export const metadata: Metadata = { title: 'Saved snippets', description: 'Code snippets saved locally from developer cheat sheets.' };

export default function SavedSnippetsPage() {
  return <SavedSnippetsPageContent />;
}
