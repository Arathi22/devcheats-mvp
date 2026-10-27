import Link from 'next/link';
import { ArrowLeft, Search } from 'lucide-react';

export default function LearningPathNotFound() {
  return <main className="saved-page shell not-found-page">
    <span className="not-found-icon"><Search size={24} aria-hidden="true" /></span>
    <h1>Learning path not found</h1>
    <p>That path may have moved or the address may be misspelled. Browse the available learning paths instead.</p>
    <Link className="cta-link" href="/learning-paths"><ArrowLeft size={15} /> Browse learning paths</Link>
  </main>;
}
