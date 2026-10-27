'use client';

import { useState } from 'react';
import { Braces, Check, Minimize2, Sparkles } from 'lucide-react';
import { ActionButton, ClearButton, CopyTextButton, SampleButton, ToolStatus } from '@/components/tools/ToolActions';
import { ToolPage, ToolPanel } from '@/components/tools/ToolPage';
import { formatJson, minifyJson, SAMPLE_JSON, validateJson } from '@/lib/tool-utils';

export default function JsonFormatterPage() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState<'error' | 'success'>('success');
  function run(action: 'format' | 'minify' | 'validate') {
    if (!input.trim()) { setOutput(''); setMessage(action === 'validate' ? 'Enter JSON to validate.' : `Enter JSON to ${action}.`); setStatus('error'); return; }
    if (action === 'validate') {
      const result = validateJson(input);
      setMessage(result.valid ? 'Valid JSON.' : result.message);
      setStatus(result.valid ? 'success' : 'error');
      if (!result.valid) setOutput('');
      return;
    }
    try {
      setOutput(action === 'format' ? formatJson(input) : minifyJson(input));
      setMessage(action === 'format' ? 'JSON formatted.' : 'JSON minified.');
      setStatus('success');
    } catch (error) {
      setOutput(''); setMessage(error instanceof Error ? error.message : 'Could not process this JSON.'); setStatus('error');
    }
  }
  function clear() { setInput(''); setOutput(''); setMessage(''); }
  return <ToolPage title="JSON Formatter & Validator" description="Format, minify, and validate JSON without leaving your browser." icon={Braces}>
    <div className="tool-actions-row"><ActionButton variant="primary" onClick={() => run('format')}><Sparkles size={15} /> Format</ActionButton><ActionButton onClick={() => run('minify')}><Minimize2 size={15} /> Minify</ActionButton><ActionButton onClick={() => run('validate')}><Check size={15} /> Validate</ActionButton><SampleButton onClick={() => { setInput(SAMPLE_JSON); setOutput(''); setMessage(''); }} /><ClearButton onClick={clear} /></div>
    <div className="tool-editor-grid"><ToolPanel title="Input JSON"><textarea className="tool-textarea" aria-label="Input JSON" placeholder="Paste or type JSON here…" value={input} onChange={(event) => setInput(event.target.value)} spellCheck={false} /></ToolPanel><ToolPanel title="Output" hint="JSON"><textarea className="tool-textarea" aria-label="Formatted JSON output" placeholder="Your result will appear here…" value={output} readOnly spellCheck={false} /><div className="output-actions"><ToolStatus kind={status}>{message}</ToolStatus><CopyTextButton value={output} /></div></ToolPanel></div>
  </ToolPage>;
}
