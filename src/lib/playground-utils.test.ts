import test from 'node:test';
import assert from 'node:assert/strict';
import { createPreviewDocument, exportSource, hasUnsavedCode, isValidPreviewMessage, restoreDraft, serializeDraft, STARTER_EXAMPLES, type PlaygroundDraft } from './playground-utils.ts';

const sample: PlaygroundDraft = { html: '<h1>Hi</h1>', css: 'h1 { color: green; }', javascript: "console.log('hello')" };

test('starter selection exposes all required local examples with editor content', () => {
  assert.deepEqual(STARTER_EXAMPLES.map(({ id }) => id), ['hello-world', 'profile-card', 'counter', 'responsive-layout', 'form-validation']);
  for (const example of STARTER_EXAMPLES) assert.equal(typeof example.html, 'string');
  assert.match(STARTER_EXAMPLES.find(({ id }) => id === 'counter')!.javascript, /addEventListener/);
});

test('drafts serialize and restore only valid versioned source strings', () => {
  assert.deepEqual(restoreDraft(serializeDraft(sample)), sample);
  assert.equal(restoreDraft('{broken'), null);
  assert.equal(restoreDraft(JSON.stringify({ version: 1, html: '<p>', css: 2, javascript: '' })), null);
  assert.equal(restoreDraft(null), null);
});

test('exports include standalone HTML and clearly labeled all-source sections', () => {
  const result = exportSource(sample);
  assert.match(result.html, /<!doctype html>/i);
  assert.match(result.html, /href="style\.css"/);
  assert.match(result.html, /src="script\.js"/);
  assert.match(result.all, /<!-- index\.html -->[\s\S]*\/\* style\.css \*\/[\s\S]*\/\/ script\.js/);
  assert.equal(result.css, sample.css);
  assert.equal(result.javascript, sample.javascript);
});

test('reset confirmation is needed only when replacing changed editor content', () => {
  assert.equal(hasUnsavedCode(sample, sample), false);
  assert.equal(hasUnsavedCode({ ...sample, css: 'h1 { color: red; }' }, sample), true);
  assert.equal(hasUnsavedCode({ ...sample, javascript: '' }, { ...sample, javascript: '' }), false);
});

test('preview documents sandbox assets and execute source only in their iframe document', () => {
  const html = createPreviewDocument(sample, 'run-token');
  assert.match(html, /Content-Security-Policy/);
  assert.match(html, /connect-src 'none'/);
  assert.match(html, /parent\.postMessage/);
  assert.match(html, /console\.log\('hello'\)/);
  assert.match(html, /<h1>Hi<\/h1>/);
  assert.doesNotMatch(html, /allow-same-origin|top\.location|eval\s*\(|new Function/);
  assert.match(createPreviewDocument({ ...sample, javascript: '</script><script>bad()<\/script>' }, 't'), /\\u003c\/script>/);
});

test('preview message validation requires the exact iframe window and current token', () => {
  const frame = {} as Window;
  const message = { type: 'playground:error', token: 'current', message: 'SyntaxError' };
  assert.equal(isValidPreviewMessage(message, 'null', frame, frame, 'current'), true);
  assert.equal(isValidPreviewMessage(message, 'https://example.com', frame, frame, 'current'), false);
  assert.equal(isValidPreviewMessage(message, 'null', {} as Window, frame, 'current'), false);
  assert.equal(isValidPreviewMessage({ ...message, token: 'old' }, 'null', frame, frame, 'current'), false);
  assert.equal(isValidPreviewMessage({ ...message, type: 'unknown' }, 'null', frame, frame, 'current'), false);
});
