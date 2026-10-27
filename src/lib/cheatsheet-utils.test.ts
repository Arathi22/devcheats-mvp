import test from 'node:test';
import assert from 'node:assert/strict';
import { cheatsheets } from '../data/cheatsheets.ts';
import { getEstimatedReadingMinutes, getRelatedCheatSheets, getSectionId } from './cheatsheet-utils.ts';

test('published cheat sheet slugs are unique and every sheet has searchable metadata', () => {
  const slugs = cheatsheets.map((sheet) => sheet.slug);
  const originalSlugs = new Set(['javascript', 'typescript', 'react', 'html', 'css', 'nodejs', 'python', 'sql', 'git', 'docker']);
  const requestedSlugs = [
    'bash', 'linux-commands', 'regular-expressions', 'markdown', 'npm', 'rest-http', 'postgresql', 'mongodb',
    'expressjs', 'redux-toolkit', 'css-flexbox-grid', 'docker-compose', 'vim', 'curl', 'go', 'kubernetes-kubectl',
    'javascript-array-methods', 'javascript-string-methods', 'javascript-objects', 'javascript-promises',
    'javascript-fetch-api', 'javascript-date-time', 'javascript-es-modules',
  ];
  assert.equal(new Set(slugs).size, slugs.length);
  assert.equal(cheatsheets.length, 33);
  assert.ok(requestedSlugs.every((slug) => slugs.includes(slug)));
  for (const sheet of cheatsheets) {
    assert.ok(sheet.description.trim().length > 20, `${sheet.slug} needs a useful description`);
    assert.ok(sheet.category);
    assert.ok(sheet.tags.length > 0);
    assert.ok(sheet.snippets.length >= 5 || originalSlugs.has(sheet.slug));
    assert.ok(sheet.snippets.every((snippet) => snippet.title && snippet.description && snippet.code));
  }
});

test('section IDs are unique per page and based on the stable sheet slug and section order', () => {
  const ids = cheatsheets[0].snippets.map((_, index) => getSectionId(cheatsheets[0].slug, index));
  assert.equal(new Set(ids).size, ids.length);
  assert.equal(getSectionId('javascript', 0), 'section-javascript-1');
  assert.notEqual(getSectionId('javascript', 0), getSectionId('typescript', 0));
});

test('related sheets exclude the current sheet, rank matches, deduplicate, and respect the limit', () => {
  const related = getRelatedCheatSheets(cheatsheets[0], [...cheatsheets, cheatsheets[1]], 4);
  assert.ok(related.length <= 4);
  assert.ok(related.every((item) => item.slug !== cheatsheets[0].slug));
  assert.equal(new Set(related.map((item) => item.slug)).size, related.length);
  assert.equal(related[0].slug, 'javascript-promises');
});

test('related sheet selection can return no matches for the page fallback', () => {
  const unrelatedSheet = { ...cheatsheets[0], category: 'Unique', tags: ['unique'] };
  assert.deepEqual(getRelatedCheatSheets(unrelatedSheet, cheatsheets), []);
});

test('estimated reading time is a positive whole number', () => {
  assert.equal(getEstimatedReadingMinutes(cheatsheets[0]), 1);
});
