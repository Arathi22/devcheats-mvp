'use client';

import { Heart } from 'lucide-react';
import { useSavedItems } from '@/components/SavedItemsProvider';

export function FavoriteButton({ slug, title, compact = false }: { slug: string; title: string; compact?: boolean }) {
  const { isFavorite, toggleFavorite } = useSavedItems();
  const active = isFavorite(slug);
  return <button
    type="button"
    className={`favorite-button${compact ? ' compact' : ''}${active ? ' active' : ''}`}
    aria-label={active ? `Remove ${title} from favorites` : `Add ${title} to favorites`}
    aria-pressed={active}
    onClick={() => toggleFavorite(slug)}
  ><Heart size={compact ? 16 : 17} fill={active ? 'currentColor' : 'none'} aria-hidden="true" />{!compact && <span>{active ? 'Favorited' : 'Add to favorites'}</span>}</button>;
}
