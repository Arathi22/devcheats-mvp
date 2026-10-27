export const SAMPLE_JSON = `{
  "name": "Ada Lovelace",
  "role": "developer",
  "skills": ["TypeScript", "curiosity"],
  "available": true
}`;

export function formatJson(input: string): string {
  if (!input.trim()) throw new Error('Enter JSON to format.');
  return JSON.stringify(JSON.parse(input) as unknown, null, 2);
}

export function minifyJson(input: string): string {
  if (!input.trim()) throw new Error('Enter JSON to minify.');
  return JSON.stringify(JSON.parse(input) as unknown);
}

export function validateJson(input: string): { valid: true } | { valid: false; message: string } {
  if (!input.trim()) return { valid: false, message: 'Enter JSON to validate.' };
  try {
    JSON.parse(input);
    return { valid: true };
  } catch (error) {
    return { valid: false, message: error instanceof Error ? error.message : 'Invalid JSON.' };
  }
}

export function encodeUrl(input: string): string {
  return encodeURIComponent(input);
}

export function decodeUrl(input: string): string {
  try {
    return decodeURIComponent(input);
  } catch {
    throw new Error('This text contains malformed URL encoding. Check each % escape and try again.');
  }
}

export function encodeBase64(input: string): string {
  const bytes = new TextEncoder().encode(input);
  let binary = '';
  for (const byte of bytes) binary += String.fromCharCode(byte);
  return btoa(binary);
}

export function decodeBase64(input: string): string {
  const normalized = input.replace(/\s/g, '');
  if (!normalized) throw new Error('Enter Base64 text to decode.');
  if (!/^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=)?$/.test(normalized)) {
    throw new Error('This is not valid Base64. Check the characters and padding.');
  }
  try {
    const binary = atob(normalized);
    const bytes = Uint8Array.from(binary, (character) => character.charCodeAt(0));
    return new TextDecoder('utf-8', { fatal: true }).decode(bytes);
  } catch {
    throw new Error('The Base64 input does not contain valid UTF-8 text.');
  }
}
