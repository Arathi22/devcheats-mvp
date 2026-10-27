import type { Metadata } from 'next';
import { getCanonicalMetadata } from '@/lib/site-url';

export const metadata: Metadata = {
  title: 'JSON Formatter & Validator',
  description: 'Format, minify, and validate JSON in your browser with clear syntax errors.',
  openGraph: { title: 'JSON Formatter & Validator', description: 'Format, minify, and validate JSON in your browser with clear syntax errors.', type: 'website' },
  ...getCanonicalMetadata('/tools/json-formatter'),
};

export default function JsonFormatterLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <>{children}</>;
}
