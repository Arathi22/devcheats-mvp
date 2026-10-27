import test from 'node:test';
import assert from 'node:assert/strict';
import { decodeBase64, decodeUrl, encodeBase64, encodeUrl, formatJson, minifyJson, validateJson } from './tool-utils.ts';

test('JSON formatting and minifying preserve parsed values', () => {
  const source = '{"greeting":"hello","items":[1,true]}';
  assert.equal(formatJson(source), '{\n  "greeting": "hello",\n  "items": [\n    1,\n    true\n  ]\n}');
  assert.equal(minifyJson(formatJson(source)), source);
});

test('JSON validation gives readable empty and syntax errors', () => {
  assert.deepEqual(validateJson(' {"ok":true} '), { valid: true });
  assert.equal(validateJson('  ').valid, false);
  const invalid = validateJson('{oops');
  assert.equal(invalid.valid, false);
  if (!invalid.valid) assert.match(invalid.message, /JSON|property|position/i);
  assert.throws(() => formatJson(''), /Enter JSON/);
});

test('URL component encoding round-trips Unicode and reserved characters', () => {
  const value = 'café / tea? & coffee';
  assert.equal(decodeUrl(encodeUrl(value)), value);
  assert.throws(() => decodeUrl('%E0%A4%A'), /malformed URL encoding/);
});

test('Base64 encoding round-trips UTF-8, including emoji', () => {
  const value = 'Hello, world! 👋 café';
  assert.equal(decodeBase64(encodeBase64(value)), value);
  assert.throws(() => decodeBase64('not!base64'), /not valid Base64/);
  assert.throws(() => decodeBase64('/w=='), /valid UTF-8/);
});
