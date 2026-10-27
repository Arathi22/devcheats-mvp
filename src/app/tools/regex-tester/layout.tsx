import type { Metadata } from 'next';
import { getCanonicalMetadata } from '@/lib/site-url';

export const metadata: Metadata = {
  title: 'Regex Tester',
  description: 'Test JavaScript regular expressions against sample text in your browser.',
  openGraph: { title: 'Regex Tester', description: 'Test JavaScript regular expressions against sample text in your browser.', type: 'website' },
  ...getCanonicalMetadata('/tools/regex-tester'),
};

export default function RegexTesterLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <>{children}</>;
}
