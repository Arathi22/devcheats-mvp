'use client';

import { useRef, useState } from 'react';
import { Regex, Sparkles } from 'lucide-react';
import { ClearButton, SampleButton, ToolStatus } from '@/components/tools/ToolActions';
import { ToolPage, ToolPanel } from '@/components/tools/ToolPage';

const MAX_PATTERN_LENGTH = 500;
const MAX_TEXT_LENGTH = 100_000;
const REGEX_TIMEOUT_MS = 350;
const SAMPLE_TEXT = 'Contact Ada at ada@example.com or Grace at grace@example.org.\nBuild 42 shipped on 2026-10-27.';
const SAMPLE_PATTERN = String.raw`[\w.+-]+@[\w.-]+\.[A-Za-z]{2,}`;

type MatchResult = { text: string; index: number };
type WorkerResponse = { matches: MatchResult[]; count: number } | { error: string };

function getMatches(pattern: string, flags: string, text: string): Promise<WorkerResponse> {
  return new Promise((resolve, reject) => {
    const source = `self.onmessage = (event) => { try { const { pattern, flags, text } = event.data; const regex = new RegExp(pattern, flags.includes('g') ? flags : flags + 'g'); const matches = []; let count = 0; let match; while ((match = regex.exec(text)) !== null) { count += 1; if (matches.length < 500) matches.push({ text: match[0], index: match.index }); if (count >= 5000) break; } self.postMessage({ matches, count }); } catch (error) { self.postMessage({ error: error instanceof Error ? error.message : 'Invalid regular expression.' }); } };`;
    const workerUrl = URL.createObjectURL(new Blob([source], { type: 'text/javascript' }));
    const worker = new Worker(workerUrl);
    const timer = window.setTimeout(() => { worker.terminate(); URL.revokeObjectURL(workerUrl); reject(new Error('This pattern took too long. Try a simpler expression.')); }, REGEX_TIMEOUT_MS);
    worker.onmessage = (event: MessageEvent<WorkerResponse>) => { window.clearTimeout(timer); worker.terminate(); URL.revokeObjectURL(workerUrl); resolve(event.data); };
    worker.onerror = () => { window.clearTimeout(timer); worker.terminate(); URL.revokeObjectURL(workerUrl); reject(new Error('The pattern could not be evaluated.')); };
    worker.postMessage({ pattern, flags, text });
  });
}

export default function RegexTesterPage() {
  const [pattern, setPattern] = useState('');
  const [flags, setFlags] = useState('g');
  const [text, setText] = useState('');
  const [matches, setMatches] = useState<MatchResult[]>([]);
  const [count, setCount] = useState(0);
  const [message, setMessage] = useState('');
  const [error, setError] = useState(false);
  const [busy, setBusy] = useState(false);
  const requestId = useRef(0);

  async function testPattern() {
    requestId.current += 1;
    const activeRequest = requestId.current;
    setMatches([]); setCount(0);
    if (!pattern) { setMessage('Enter a regular expression pattern.'); setError(true); return; }
    if (pattern.length > MAX_PATTERN_LENGTH) { setMessage(`Keep the pattern under ${MAX_PATTERN_LENGTH} characters.`); setError(true); return; }
    if (text.length > MAX_TEXT_LENGTH) { setMessage(`Keep the test text under ${MAX_TEXT_LENGTH.toLocaleString()} characters.`); setError(true); return; }
    setBusy(true); setMessage('Testing pattern…'); setError(false);
    try {
      const result = await getMatches(pattern, flags, text);
      if (requestId.current !== activeRequest) return;
      if ('error' in result) { setMessage(result.error); setError(true); return; }
      setMatches(result.matches); setCount(result.count);
      setMessage(result.count ? `${result.count}${result.count === 5000 ? '+' : ''} match${result.count === 1 ? '' : 'es'} found.` : 'No matches found.');
    } catch (problem) {
      if (requestId.current === activeRequest) { setMessage(problem instanceof Error ? problem.message : 'Could not test this pattern.'); setError(true); }
    } finally { if (requestId.current === activeRequest) setBusy(false); }
  }
  function clear() { requestId.current += 1; setPattern(''); setFlags('g'); setText(''); setMatches([]); setCount(0); setMessage(''); setBusy(false); }

  const highlighted = [] as React.ReactNode[];
  let cursor = 0;
  for (const [index, match] of matches.entries()) {
    if (match.index < cursor) continue;
    if (match.index > cursor) highlighted.push(<span key={`text-${index}`}>{text.slice(cursor, match.index)}</span>);
    highlighted.push(<mark key={`match-${index}`} className="regex-highlight">{match.text || '∅'}</mark>);
    cursor = match.index + match.text.length;
  }
  if (cursor < text.length) highlighted.push(<span key="text-tail">{text.slice(cursor)}</span>);

  return <ToolPage title="Regex Tester" description="Try JavaScript regular expressions against sample text and inspect matches safely." icon={Regex}>
    <div className="tool-actions-row"><button type="button" className="tool-button primary" onClick={testPattern} disabled={busy}><Sparkles size={15} /> {busy ? 'Testing…' : 'Test pattern'}</button><SampleButton onClick={() => { requestId.current += 1; setPattern(SAMPLE_PATTERN); setText(SAMPLE_TEXT); setMatches([]); setCount(0); setMessage(''); }} /><ClearButton onClick={clear} /></div>
    <div className="regex-input-grid"><ToolPanel title="Pattern" hint="JavaScript RegExp"><input className="tool-input" aria-label="Regular expression pattern" placeholder="e.g. \\b\w+\\b" value={pattern} onChange={(event) => setPattern(event.target.value)} /><div className="flags-row"><label htmlFor="regex-flags">Flags</label><input id="regex-flags" className="tool-input flags-input" aria-label="Regular expression flags" value={flags} onChange={(event) => setFlags(event.target.value)} placeholder="gim" /><span>Common flags: g i m s u y</span></div></ToolPanel><ToolPanel title="Test text" hint={`${text.length.toLocaleString()} / ${MAX_TEXT_LENGTH.toLocaleString()} characters`}><textarea className="tool-textarea regex-text" aria-label="Regular expression test text" placeholder="Type text to search…" value={text} onChange={(event) => setText(event.target.value)} spellCheck={false} maxLength={MAX_TEXT_LENGTH + 1} /></ToolPanel></div>
    <ToolPanel title="Matches" hint={`${count}${count === 5000 ? '+' : ''} total`} className="regex-results"><ToolStatus kind={error ? 'error' : count ? 'success' : 'info'}>{message}</ToolStatus>{matches.length > 0 && <><div className="regex-highlighted" aria-label="Test text with matches highlighted">{highlighted}</div><ol className="match-list">{matches.slice(0, 100).map((match, index) => <li key={`${match.index}-${index}`}><span>{index + 1}</span><code>{match.text || '(empty match)'}</code><small>at {match.index}</small></li>)}</ol>{matches.length > 100 && <p className="tool-muted">Showing first 100 match details and first 500 highlights.</p>}</>}</ToolPanel>
  </ToolPage>;
}
