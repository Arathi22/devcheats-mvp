import Link from 'next/link';
import { ArrowLeft, Search } from 'lucide-react';

export default function CheatSheetNotFound() {
  return <main className="saved-page shell not-found-page">
    <span className="not-found-icon"><Search size={24} aria-hidden="true" /></span>
    <h1>Cheat sheet not found</h1>
    <p>That guide may have moved or the address may be misspelled. Browse the library to find another reference.</p>
    <Link className="cta-link" href="/#explore"><ArrowLeft size={15} /> Browse cheat sheets</Link>
  </main>;
}
