import type { Metadata } from 'next';
import './globals.css';
import Link from 'next/link';
import { SiteHeader } from '@/components/SiteHeader';
import { SavedItemsProvider } from '@/components/SavedItemsProvider';
import { LearningProgressProvider } from '@/components/LearningProgressProvider';

export const metadata: Metadata = {
  title: { default: 'devnotes — Developer field guide', template: '%s · devnotes' },
  description: 'Fast, practical cheat sheets for developers. Find syntax, commands, and examples without the noise.',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en" suppressHydrationWarning>
    <head>
      <script dangerouslySetInnerHTML={{ __html: `(() => { const saved = localStorage.getItem('devcheats-theme'); const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches; document.documentElement.dataset.theme = saved ? (saved === 'dark' ? 'dark' : 'light') : (prefersDark ? 'dark' : 'light'); })();` }} />
    </head>
    <body><SavedItemsProvider><LearningProgressProvider><SiteHeader />{children}<footer className="site-footer"><div className="footer-inner"><Link href="/" className="footer-brand">devnotes<span> / built for the curious</span></Link><span>Useful references. Less tab chaos.</span></div></LearningProgressProvider></SavedItemsProvider></body>
  </html>;
}
