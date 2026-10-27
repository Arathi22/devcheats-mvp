export type SavedSnippet = {
  id: string;
  sourceSlug: string;
  sourceTitle: string;
  sectionTitle: string;
  language: string;
  code: string;
  note: string;
  savedAt: string;
};

export type StorageLike = Pick<Storage, 'getItem' | 'setItem'>;

const FAVORITES_KEY = 'devcheats-favorites-v1';
const SNIPPETS_KEY = 'devcheats-saved-snippets-v1';

function parseStored<T>(storage: StorageLike | null, key: string, isValid: (value: unknown) => value is T): T[] {
  if (!storage) return [];
  try {
    const parsed: unknown = JSON.parse(storage.getItem(key) ?? '[]');
    if (!Array.isArray(parsed)) return [];
    return parsed.filter(isValid);
  } catch {
    return [];
  }
}

function writeStored<T>(storage: StorageLike | null, key: string, value: T[]) {
  try {
    storage?.setItem(key, JSON.stringify(value));
  } catch {
    // Storage can be disabled or full; in-memory UI updates still work.
  }
}

function isSlug(value: unknown): value is string {
  return typeof value === 'string' && /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(value);
}

function isSavedSnippet(value: unknown): value is SavedSnippet {
  if (!value || typeof value !== 'object') return false;
  const item = value as Partial<SavedSnippet>;
  return typeof item.id === 'string' && item.id.length > 0
    && isSlug(item.sourceSlug)
    && typeof item.sourceTitle === 'string'
    && typeof item.sectionTitle === 'string'
    && typeof item.language === 'string'
    && typeof item.code === 'string'
    && typeof item.note === 'string'
    && typeof item.savedAt === 'string';
}

export function getStorage(): StorageLike | null {
  try {
    return typeof window === 'undefined' ? null : window.localStorage;
  } catch {
    return null;
  }
}

export function readFavorites(storage: StorageLike | null) {
  return [...new Set(parseStored(storage, FAVORITES_KEY, isSlug))];
}

export function writeFavorites(storage: StorageLike | null, favorites: string[]) {
  writeStored(storage, FAVORITES_KEY, [...new Set(favorites.filter(isSlug))]);
}

export function toggleFavoriteInList(favorites: string[], slug: string) {
  return favorites.includes(slug) ? favorites.filter((item) => item !== slug) : [...favorites, slug];
}

export function readSavedSnippets(storage: StorageLike | null) {
  return parseStored(storage, SNIPPETS_KEY, isSavedSnippet);
}

export function writeSavedSnippets(storage: StorageLike | null, snippets: SavedSnippet[]) {
  writeStored(storage, SNIPPETS_KEY, snippets.filter(isSavedSnippet));
}

export function addSavedSnippet(snippets: SavedSnippet[], snippet: SavedSnippet) {
  return snippets.some((item) => item.id === snippet.id) ? snippets : [snippet, ...snippets];
}

export function removeSavedSnippet(snippets: SavedSnippet[], id: string) {
  return snippets.filter((item) => item.id !== id);
}

export function updateSavedSnippetNote(snippets: SavedSnippet[], id: string, note: string) {
  return snippets.map((item) => item.id === id ? { ...item, note } : item);
}
