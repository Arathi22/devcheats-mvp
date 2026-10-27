'use client';

import Link from 'next/link';
import { Heart } from 'lucide-react';
import { LibraryGrid } from '@/components/LibraryGrid';
import { useSavedItems } from '@/components/SavedItemsProvider';
import { cheatsheets } from '@/data/cheatsheets';

export function FavoritesPageContent() {
  const { favorites } = useSavedItems();
  const sheets = cheatsheets.filter((sheet) => favorites.includes(sheet.slug));

  return <main className="saved-page shell">
    <div className="eyebrow">YOUR LIBRARY</div>
    <h1><Heart size={30} aria-hidden="true" /> Favorites</h1>
    <p className="saved-page-description">Favorite guides are stored in this browser and are not synchronized across devices.</p>
    {sheets.length ? <LibraryGrid sheets={sheets} /> : <div className="saved-empty"><Heart size={25} aria-hidden="true" /><h2>No favorites yet</h2><p>Save guides with the heart button to keep your go-to references here.</p><Link className="cta-link" href="/#explore">Browse cheat sheets</Link></div>}
  </main>;
}
