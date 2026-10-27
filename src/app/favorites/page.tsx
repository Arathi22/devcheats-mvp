import type { Metadata } from 'next';
import { FavoritesPageContent } from '@/components/FavoritesPageContent';

export const metadata: Metadata = { title: 'Favorites', description: 'Your browser-saved favorite developer cheat sheets.', robots: { index: false, follow: false } };

export default function FavoritesPage() {
  return <FavoritesPageContent />;
}
