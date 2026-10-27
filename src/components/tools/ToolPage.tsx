import Link from 'next/link';
import { ArrowLeft, ArrowUpRight, Braces, Code2, Link2, Regex, ShieldCheck } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

export function ToolPage({ title, description, icon: Icon, children }: { title: string; description: string; icon: LucideIcon; children: React.ReactNode }) {
  return <main className="tools-page shell">
    <div className="tool-breadcrumb"><Link href="/tools"><ArrowLeft size={14} /> All developer tools</Link><span>/</span><span>{title}</span></div>
    <header className="tool-heading"><span className="tool-icon"><Icon size={22} /></span><div><div className="eyebrow">DEVELOPER TOOL</div><h1>{title}</h1><p>{description}</p></div></header>
    {children}
    <aside className="tool-privacy"><ShieldCheck size={16} /><span>Everything runs in your browser. Your input is never sent to a server.</span></aside>
  </main>;
}

export function ToolPanel({ title, hint, children, className = '' }: { title: string; hint?: string; children: React.ReactNode; className?: string }) {
  return <section className={`tool-panel ${className}`}><div className="tool-panel-heading"><label>{title}</label>{hint && <span>{hint}</span>}</div>{children}</section>;
}

export function ToolCard({ href, title, description, category, icon: Icon }: { href: string; title: string; description: string; category: string; icon: LucideIcon }) {
  return <Link className="tool-card" href={href}><div className="tool-card-top"><span className="tool-icon"><Icon size={21} /></span><span className="tool-category">{category}</span></div><h2>{title}</h2><p>{description}</p><span className="tool-card-link">Open tool <ArrowUpRight size={15} /></span></Link>;
}

export const toolIcons = { Braces, Link2, Code2, Regex };
