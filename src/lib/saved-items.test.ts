import test from 'node:test';
import assert from 'node:assert/strict';
import {
  addSavedSnippet,
  readFavorites,
  readSavedSnippets,
  removeSavedSnippet,
  toggleFavoriteInList,
  updateSavedSnippetNote,
  writeFavorites,
  writeSavedSnippets,
} from './saved-items.ts';

class MemoryStorage {
  values = new Map<string, string>();
  getItem(key: string) { return this.values.get(key) ?? null; }
  setItem(key: string, value: string) { this.values.set(key, value); }
}

const snippet = {
  id: 'javascript:section-javascript-1', sourceSlug: 'javascript', sourceTitle: 'JavaScript',
  sectionTitle: 'Variables', language: 'javascript', code: 'const count = 1;', note: '', savedAt: '2026-10-27T00:00:00.000Z',
};

test('favorites persist, deduplicate, and toggle independently', () => {
  const storage = new MemoryStorage();
  const once = toggleFavoriteInList(readFavorites(storage), 'javascript');
  writeFavorites(storage, once);
  assert.deepEqual(readFavorites(storage), ['javascript']);
  const twice = toggleFavoriteInList(readFavorites(storage), 'javascript');
  writeFavorites(storage, twice);
  assert.deepEqual(readFavorites(storage), []);
  writeFavorites(storage, ['javascript', 'javascript', 'bad slug']);
  assert.deepEqual(readFavorites(storage), ['javascript']);
});

test('saved snippets persist, reject duplicate IDs, edit notes, and remove by ID', () => {
  const storage = new MemoryStorage();
  const saved = addSavedSnippet(readSavedSnippets(storage), snippet);
  writeSavedSnippets(storage, saved);
  assert.deepEqual(readSavedSnippets(storage), [snippet]);
  assert.deepEqual(addSavedSnippet(saved, snippet), saved);
  const edited = updateSavedSnippetNote(saved, snippet.id, 'Review before sharing');
  writeSavedSnippets(storage, edited);
  assert.equal(readSavedSnippets(storage)[0].note, 'Review before sharing');
  writeSavedSnippets(storage, removeSavedSnippet(edited, snippet.id));
  assert.deepEqual(readSavedSnippets(storage), []);
});

test('malformed or old browser data is ignored safely', () => {
  const storage = new MemoryStorage();
  storage.setItem('devcheats-favorites-v1', '{not json');
  storage.setItem('devcheats-saved-snippets-v1', JSON.stringify([{ id: 'old-version' }]));
  assert.deepEqual(readFavorites(storage), []);
  assert.deepEqual(readSavedSnippets(storage), []);
});
