import Fuse from 'fuse.js';
import type { CheatSheet } from '@/data/cheatsheets';

export function createCheatSheetSearch(sheets: CheatSheet[]) {
  return new Fuse(sheets, {
    keys: [
      { name: 'title', weight: 2 },
      { name: 'description', weight: 1.3 },
      { name: 'category', weight: 1.1 },
      { name: 'tags', weight: 1.2 },
      { name: 'snippets.title', weight: 1 },
      { name: 'snippets.description', weight: 0.8 },
      { name: 'snippets.code', weight: 0.35 },
    ],
    threshold: 0.35,
    ignoreLocation: true,
  });
}
