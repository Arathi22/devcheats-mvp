'use client';

import { useState } from 'react';
import { ArrowDownToLine, ArrowUpFromLine, Link2, Code2 } from 'lucide-react';
import { ActionButton, ClearButton, CopyTextButton, SampleButton, ToolStatus } from '@/components/tools/ToolActions';
import { ToolPage, ToolPanel } from '@/components/tools/ToolPage';
import { decodeBase64, decodeUrl, encodeBase64, encodeUrl } from '@/lib/tool-utils';

type EncoderMode = 'url' | 'base64';

export function EncoderDecoder({ mode }: { mode: EncoderMode }) {
  const isUrl = mode === 'url';
  const title = isUrl ? 'URL Encoder / Decoder' : 'Base64 Encoder / Decoder';
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState(false);
  function run(action: 'encode' | 'decode') {
    try {
      setOutput(isUrl ? (action === 'encode' ? encodeUrl(input) : decodeUrl(input)) : (action === 'encode' ? encodeBase64(input) : decodeBase64(input)));
      setMessage(action === 'encode' ? 'Text encoded.' : 'Text decoded.'); setError(false);
    } catch (problem) {
      setOutput(''); setMessage(problem instanceof Error ? problem.message : `Could not ${action} this input.`); setError(true);
    }
  }
  function clear() { setInput(''); setOutput(''); setMessage(''); }
  const sample = isUrl ? 'A query with spaces & symbols: café / tea?' : 'Hello, world! 👋 café';
  return <ToolPage title={title} description={isUrl ? 'Encode and decode URL components with a clear view of the result.' : 'Convert UTF-8 text to and from Base64, including emoji and accented characters.'} icon={isUrl ? Link2 : Code2}>
    <div className="tool-actions-row"><ActionButton variant="primary" onClick={() => run('encode')}><ArrowUpFromLine size={15} /> Encode</ActionButton><ActionButton onClick={() => run('decode')}><ArrowDownToLine size={15} /> Decode</ActionButton><SampleButton onClick={() => { setInput(sample); setOutput(''); setMessage(''); }} /><ClearButton onClick={clear} /></div>
    <div className="tool-editor-grid"><ToolPanel title="Input" hint={isUrl ? 'URL component' : 'UTF-8 text / Base64'}><textarea className="tool-textarea" aria-label="Input text" placeholder="Paste or type text here…" value={input} onChange={(event) => setInput(event.target.value)} spellCheck={false} /></ToolPanel><ToolPanel title="Output"><textarea className="tool-textarea" aria-label="Encoded or decoded output" placeholder="Your result will appear here…" value={output} readOnly spellCheck={false} /><div className="output-actions"><ToolStatus kind={error ? 'error' : 'success'}>{message}</ToolStatus><CopyTextButton value={output} /></div></ToolPanel></div>
  </ToolPage>;
}
