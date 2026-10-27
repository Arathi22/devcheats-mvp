'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import CodeMirror from '@uiw/react-codemirror';
import { html as htmlLanguage } from '@codemirror/lang-html';
import { css as cssLanguage } from '@codemirror/lang-css';
import { javascript as javascriptLanguage } from '@codemirror/lang-javascript';
import { AlertTriangle, Check, ChevronDown, Code2, Copy, Download, Expand, Play, RotateCcw, Trash2, X } from 'lucide-react';
import { createPreviewDocument, exportSource, hasUnsavedCode, isValidPreviewMessage, restoreDraft, serializeDraft, STARTER_EXAMPLES, type PlaygroundDraft, type PreviewMessage } from '@/lib/playground-utils';

const STORAGE_KEY = 'devcheats-playground-draft-v1';
const INITIAL = STARTER_EXAMPLES[0];
type Panel = 'html' | 'css' | 'javascript';
const panels: { id: Panel; label: string; extension: string; language: () => ReturnType<typeof htmlLanguage> }[] = [
  { id: 'html', label: 'HTML', extension: 'html', language: htmlLanguage },
  { id: 'css', label: 'CSS', extension: 'css', language: cssLanguage },
  { id: 'javascript', label: 'JavaScript', extension: 'js', language: javascriptLanguage },
];

export function Playground() {
  const [draft, setDraft] = useState<PlaygroundDraft>({ html: INITIAL.html, css: INITIAL.css, javascript: INITIAL.javascript });
  const [ready, setReady] = useState(false);
  const [autoRun, setAutoRun] = useState(true);
  const [expanded, setExpanded] = useState(false);
  const [frameSource, setFrameSource] = useState('');
  const [runToken, setRunToken] = useState('');
  const [status, setStatus] = useState('Ready to run');
  const [consoleMessages, setConsoleMessages] = useState<{ type: 'log' | 'error'; message: string }[]>([]);
  const [copied, setCopied] = useState('');
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const latestDraft = useRef(draft);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const timeout = window.setTimeout(() => {
      const restored = restoreDraft(window.localStorage.getItem(STORAGE_KEY));
      if (restored) setDraft(restored);
      setReady(true);
    }, 0);
    return () => window.clearTimeout(timeout);
  }, []);

  useEffect(() => { latestDraft.current = draft; }, [draft]);

  const run = useCallback((source = latestDraft.current) => {
    const token = `${Date.now()}-${Math.random().toString(36).slice(2)}`;
    setRunToken(token);
    setConsoleMessages([]);
    setStatus('Running preview…');
    setFrameSource(createPreviewDocument(source, token));
  }, []);

  useEffect(() => {
    if (!ready) return;
    window.localStorage.setItem(STORAGE_KEY, serializeDraft(draft));
    if (!autoRun) return;
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => run(draft), 650);
    return () => { if (timer.current) clearTimeout(timer.current); };
  }, [draft, autoRun, ready, run]);

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (!isValidPreviewMessage(event.data, event.origin, event.source, iframeRef.current?.contentWindow ?? null, runToken)) return;
      const message = event.data as PreviewMessage;
      if (message.type === 'playground:ready') setStatus(`Preview updated at ${new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`);
      if (message.type === 'playground:error') setConsoleMessages((current) => [...current, { type: 'error', message: message.message ?? 'Preview error' }]);
      if (message.type === 'playground:log') setConsoleMessages((current) => [...current, { type: 'log', message: message.message ?? '' }]);
    };
    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, [runToken]);

  function update(panel: Panel, value: string) { setDraft((current) => ({ ...current, [panel]: value })); }

  function confirmReplace(next: PlaygroundDraft, reason: string) {
    if (hasUnsavedCode(draft, next) && !window.confirm(`${reason} Your current playground code will be replaced. Continue?`)) return false;
    setDraft(next);
    setStatus('Draft updated');
    return true;
  }

  async function copy(label: string, value: string) {
    try { await navigator.clipboard.writeText(value); setCopied(label); setTimeout(() => setCopied(''), 1600); }
    catch { setStatus('Clipboard access is unavailable in this browser.'); }
  }

  function download(filename: string, content: string) {
    const url = URL.createObjectURL(new Blob([content], { type: 'text/plain;charset=utf-8' }));
    const link = document.createElement('a'); link.href = url; link.download = filename; link.click(); URL.revokeObjectURL(url);
  }

  function resetDraft() {
    const initial = { html: INITIAL.html, css: INITIAL.css, javascript: INITIAL.javascript };
    if (confirmReplace(initial, 'Reset to the Hello World starter?')) { run(initial); setStatus('Reset to Hello World'); }
  }

  function clearAll() {
    const empty = { html: '', css: '', javascript: '' };
    if (confirmReplace(empty, 'Clear all three editors?')) { setDraft(empty); setStatus('Editors cleared'); }
  }

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if ((event.ctrlKey || event.metaKey) && event.key === 'Enter') { event.preventDefault(); run(); }
      if (event.altKey && event.shiftKey && event.key.toLowerCase() === 'r') { event.preventDefault(); resetDraft(); }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  });

  const files = exportSource(draft);
  return <main className="playground-page shell">
    <div className="playground-heading">
      <div><span className="eyebrow"><span className="eyebrow-pulse" /> BROWSER CODE LAB</span><h1>Playground<span>.</span></h1><p>Build a small idea with HTML, CSS, and JavaScript. Your draft stays in this browser.</p></div>
      <div className="playground-shortcuts"><span><kbd>⌘</kbd>/<kbd>Ctrl</kbd> + <kbd>Enter</kbd> Run</span><span><kbd>Alt</kbd> + <kbd>Shift</kbd> + <kbd>R</kbd> Reset</span></div>
    </div>

    <div className="playground-toolbar">
      <label className="example-select"><span>Starter</span><ChevronDown size={14} /><select aria-label="Choose a starter example" defaultValue="custom" onChange={(event) => {
        const example = STARTER_EXAMPLES.find((item) => item.id === event.target.value);
        if (example) confirmReplace({ html: example.html, css: example.css, javascript: example.javascript }, `Load “${example.name}”?`);
        event.currentTarget.value = 'custom';
      }}><option value="custom" disabled>Choose example…</option>{STARTER_EXAMPLES.map((example) => <option value={example.id} key={example.id}>{example.name}</option>)}</select></label>
      <label className="playground-auto"><input type="checkbox" checked={autoRun} onChange={(event) => setAutoRun(event.target.checked)} /> Auto-run</label>
      <span className="playground-spacer" />
      <button className="tool-button" type="button" onClick={resetDraft} title="Reset (Alt+Shift+R)"><RotateCcw size={15} /> Reset</button>
      <button className="tool-button" type="button" onClick={clearAll}><Trash2 size={15} /> Clear</button>
      <button className="tool-button" type="button" onClick={() => { download('index.html', files.html); download('style.css', files.css); download('script.js', files.javascript); }}><Download size={15} /> Export</button>
      <button className="tool-button primary" type="button" onClick={() => run()} title="Run (Ctrl/Cmd+Enter)"><Play size={15} /> Run</button>
    </div>

    <div className={`playground-workspace ${expanded ? 'preview-expanded' : ''}`}>
      {!expanded && <section className="playground-editors" aria-label="Code editors">
        {panels.map((panel) => <div className="playground-editor-panel" key={panel.id}>
          <div className="playground-panel-heading"><label htmlFor={`editor-${panel.id}`}><span className={`editor-language-dot ${panel.id}`} />{panel.label}<small>{panel.extension}</small></label><button className="editor-copy" type="button" onClick={() => copy(panel.label, draft[panel.id])} aria-label={`Copy ${panel.label} code`}>{copied === panel.label ? <Check size={14} /> : <Copy size={14} />}</button></div>
          <div className="codemirror-wrap"><CodeMirror id={`editor-${panel.id}`} value={draft[panel.id]} height="190px" extensions={[panel.language()]} onChange={(value) => update(panel.id, value)} basicSetup={{ lineNumbers: true, foldGutter: true, highlightActiveLine: true, tabSize: 2 }} aria-label={`${panel.label} editor`} /></div>
        </div>)}
        <div className="playground-export-row"><button className="tool-copy" onClick={() => copy('All code', files.all)} type="button"><Copy size={13} /> {copied === 'All code' ? 'Copied all code' : 'Copy all code'}</button><button className="tool-copy" onClick={() => { download('index.html', files.html); download('style.css', files.css); download('script.js', files.javascript); }} type="button"><Download size={13} /> Download source files</button></div>
      </section>}

      <section className="playground-preview-panel" aria-label="Live preview">
        <div className="playground-preview-heading"><div><span className="preview-live-dot" /><strong>Preview</strong><span className="preview-status">{status}</span></div><button className="editor-copy" type="button" onClick={() => setExpanded(!expanded)} aria-label={expanded ? 'Restore editors and preview' : 'Expand preview'} title={expanded ? 'Restore layout' : 'Expand preview'}>{expanded ? <X size={15} /> : <Expand size={15} />}</button></div>
        <div className="preview-frame-wrap">{frameSource ? <iframe ref={iframeRef} title="Playground code preview" sandbox="allow-scripts" srcDoc={frameSource} /> : <div className="preview-empty"><Code2 size={25} /><strong>Your preview is ready</strong><span>Run your code to see it here.</span></div>}</div>
        <div className="preview-console"><div className="console-heading"><span><Code2 size={13} /> Console <small>{consoleMessages.length}</small></span><button type="button" onClick={() => setConsoleMessages([])} disabled={!consoleMessages.length} aria-label="Clear console">Clear</button></div>
          {consoleMessages.length ? <ul>{consoleMessages.map((message, index) => <li className={message.type} key={`${index}-${message.message}`}><span>{message.type === 'error' ? <AlertTriangle size={13} /> : <Code2 size={13} />}</span>{message.message}</li>)}</ul> : <p className="console-empty">Preview messages and errors will appear here.</p>}
        </div>
      </section>
    </div>
    <div className="playground-notice"><AlertTriangle size={15} /><p>JavaScript entered here runs inside an isolated, sandboxed preview. Treat code from other people as untrusted. Preview networking and external resources are blocked by default.</p></div>
  </main>;
}
