'use client';

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import type { ReactNode } from 'react';
import {
  addSavedSnippet,
  getStorage,
  readFavorites,
  readSavedSnippets,
  removeSavedSnippet,
  toggleFavoriteInList,
  updateSavedSnippetNote,
  writeFavorites,
  writeSavedSnippets,
} from '@/lib/saved-items';
import type { SavedSnippet } from '@/lib/saved-items';

type SavedItemsContextValue = {
  favorites: string[];
  savedSnippets: SavedSnippet[];
  isFavorite: (slug: string) => boolean;
  toggleFavorite: (slug: string) => void;
  isSnippetSaved: (id: string) => boolean;
  saveSnippet: (snippet: Omit<SavedSnippet, 'savedAt' | 'note'>) => void;
  removeSnippet: (id: string) => void;
  updateSnippetNote: (id: string, note: string) => void;
};

const SavedItemsContext = createContext<SavedItemsContextValue | null>(null);

export function SavedItemsProvider({ children }: { children: ReactNode }) {
  const [favorites, setFavorites] = useState<string[]>([]);
  const [savedSnippets, setSavedSnippets] = useState<SavedSnippet[]>([]);

  useEffect(() => {
    const storage = getStorage();
    const sync = () => {
      setFavorites(readFavorites(storage));
      setSavedSnippets(readSavedSnippets(storage));
    };
    sync();
    window.addEventListener('storage', sync);
    return () => {
      window.removeEventListener('storage', sync);
    };
  }, []);

  const toggleFavorite = useCallback((slug: string) => {
    const next = toggleFavoriteInList(favorites, slug);
    setFavorites(next);
    writeFavorites(getStorage(), next);
  }, [favorites]);

  const saveSnippet = useCallback((snippet: Omit<SavedSnippet, 'savedAt' | 'note'>) => {
    const next = addSavedSnippet(savedSnippets, { ...snippet, note: '', savedAt: new Date().toISOString() });
    setSavedSnippets(next);
    writeSavedSnippets(getStorage(), next);
  }, [savedSnippets]);

  const removeSnippet = useCallback((id: string) => {
    const next = removeSavedSnippet(savedSnippets, id);
    setSavedSnippets(next);
    writeSavedSnippets(getStorage(), next);
  }, [savedSnippets]);

  const updateSnippetNote = useCallback((id: string, note: string) => {
    const next = updateSavedSnippetNote(savedSnippets, id, note);
    setSavedSnippets(next);
    writeSavedSnippets(getStorage(), next);
  }, [savedSnippets]);

  const value = useMemo<SavedItemsContextValue>(() => ({
    favorites,
    savedSnippets,
    isFavorite: (slug) => favorites.includes(slug),
    toggleFavorite,
    isSnippetSaved: (id) => savedSnippets.some((snippet) => snippet.id === id),
    saveSnippet,
    removeSnippet,
    updateSnippetNote,
  }), [favorites, savedSnippets, toggleFavorite, saveSnippet, removeSnippet, updateSnippetNote]);

  return <SavedItemsContext.Provider value={value}>{children}</SavedItemsContext.Provider>;
}

export function useSavedItems() {
  const context = useContext(SavedItemsContext);
  if (!context) throw new Error('useSavedItems must be used inside SavedItemsProvider');
  return context;
}
