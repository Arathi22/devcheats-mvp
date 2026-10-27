import test from 'node:test';
import assert from 'node:assert/strict';
import { cheatsheets } from '../data/cheatsheets.ts';
import { createCheatSheetSearch } from './cheatsheet-search.ts';

test('global search indexes new topics, section titles, and code examples', () => {
  const search = createCheatSheetSearch(cheatsheets);
  assert.ok(search.search('Kubernetes').some(({ item }) => item.slug === 'kubernetes-kubectl'));
  assert.ok(search.search('Promise.all').some(({ item }) => item.slug === 'javascript-promises'));
  assert.ok(search.search('docker compose down').some(({ item }) => item.slug === 'docker-compose'));
});
