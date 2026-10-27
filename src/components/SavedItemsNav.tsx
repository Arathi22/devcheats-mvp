'use client';

import Link from 'next/link';
import { Bookmark, Heart } from 'lucide-react';
import { useSavedItems } from '@/components/SavedItemsProvider';

export function SavedItemsNav() {
  const { favorites, savedSnippets } = useSavedItems();
  return <>
    <Link className="saved-nav-link favorites-nav" href="/favorites" aria-label={`Favorites, ${favorites.length} saved`}><Heart size={15} aria-hidden="true" /><span>Favorites</span><span className="nav-count" aria-hidden="true">{favorites.length}</span></Link>
    <Link className="saved-nav-link saved-snippets-nav" href="/saved-snippets" aria-label={`Saved snippets, ${savedSnippets.length} saved`}><Bookmark size={15} aria-hidden="true" /><span>Snippets</span><span className="nav-count" aria-hidden="true">{savedSnippets.length}</span></Link>
  </>;
}
