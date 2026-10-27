import { Braces, Code2, Link2, Regex } from 'lucide-react';
import { ToolCard } from '@/components/tools/ToolPage';

const tools = [
  { href: '/tools/json-formatter', title: 'JSON Formatter & Validator', description: 'Pretty-print, minify, and validate JSON with clear syntax errors.', category: 'Data', icon: Braces },
  { href: '/tools/url-encoder', title: 'URL Encoder / Decoder', description: 'Encode and decode URL components safely for query values and paths.', category: 'Web', icon: Link2 },
  { href: '/tools/base64', title: 'Base64 Encoder / Decoder', description: 'Convert UTF-8 text to and from Base64, including non-ASCII characters.', category: 'Encoding', icon: Code2 },
  { href: '/tools/regex-tester', title: 'Regex Tester', description: 'Try JavaScript regular expressions, flags, and matches on sample text.', category: 'Text', icon: Regex },
];

export const metadata = { title: 'Developer Tools', description: 'Useful browser-based tools for everyday development tasks.' };

export default function ToolsPage() {
  return <main className="tools-page shell"><div className="eyebrow"><span className="eyebrow-pulse" /> THE TOOLBOX</div><div className="tools-landing-heading"><div><h1>Small tools.<br /><span>Fewer interruptions.</span></h1><p>Quick, private utilities for the little tasks that come up while you build.</p></div><span className="tools-count">04 <small>TOOLS</small></span></div><div className="tools-grid">{tools.map((tool) => <ToolCard key={tool.href} {...tool} />)}</div></main>;
}
