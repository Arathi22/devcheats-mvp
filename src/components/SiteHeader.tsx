import Link from 'next/link';
import { Code2, Github } from 'lucide-react';
import { ThemeToggle } from '@/components/ThemeToggle';
import { SavedItemsNav } from '@/components/SavedItemsNav';

export function SiteHeader() {
  return <header className="site-header"><div className="header-inner">
    <Link href="/" className="brand"><span className="brand-mark"><Code2 size={20} /></span><span>dev<span className="brand-accent">notes</span><small>THE DEVELOPER FIELD GUIDE</small></span></Link>
    <nav className="header-nav" aria-label="Main navigation"><Link href="/#explore">Explore</Link><Link className="tools-nav-link" href="/tools">Developer Tools</Link><Link className="playground-nav-link" href="/playground">Playground</Link><details className="learning-nav-menu"><summary>Learn</summary><div><Link href="/learning-paths">Learning Paths</Link><Link href="/progress">Progress</Link></div></details><SavedItemsNav /><Link href="/#about">About</Link><a className="github-link" href="https://github.com" target="_blank" rel="noreferrer"><Github size={16} /> GitHub</a><ThemeToggle /></nav>
  </div></header>;
}
