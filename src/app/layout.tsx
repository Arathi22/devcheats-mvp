import type { Metadata } from 'next';
import './globals.css';
import Link from 'next/link';
import { SiteHeader } from '@/components/SiteHeader';
import { SavedItemsProvider } from '@/components/SavedItemsProvider';
import { LearningProgressProvider } from '@/components/LearningProgressProvider';
import { getConfiguredSiteUrl } from '@/lib/site-url';

const siteUrl = getConfiguredSiteUrl();

export const metadata: Metadata = {
  ...(siteUrl ? { metadataBase: siteUrl } : {}),
  title: { default: 'devnotes — Developer field guide', template: '%s · devnotes' },
  description: 'Fast, practical cheat sheets for developers. Find syntax, commands, and examples without the noise.',
  openGraph: {
    siteName: 'devnotes',
    title: 'devnotes — Developer field guide',
    description: 'Fast, practical cheat sheets for developers. Find syntax, commands, and examples without the noise.',
    type: 'website',
  },
  twitter: { card: 'summary', title: 'devnotes — Developer field guide', description: 'Fast, practical cheat sheets for developers. Find syntax, commands, and examples without the noise.' },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en" suppressHydrationWarning>
    <head>
      <script dangerouslySetInnerHTML={{ __html: `(() => { let saved = null; let prefersDark = false; try { saved = window.localStorage.getItem('devcheats-theme'); } catch {} try { prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches; } catch {} document.documentElement.dataset.theme = saved ? (saved === 'dark' ? 'dark' : 'light') : (prefersDark ? 'dark' : 'light'); })();` }} />
    </head>
    <body><SavedItemsProvider><LearningProgressProvider><a className="skip-link" href="#main-content">Skip to content</a><SiteHeader /><div id="main-content">{children}</div><footer className="site-footer"><div className="footer-inner"><Link href="/" className="footer-brand">devnotes<span> / built for the curious</span></Link><span>Useful references. Less tab chaos.</span></div></footer></LearningProgressProvider></SavedItemsProvider></body>
  </html>;
}
