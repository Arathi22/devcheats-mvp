import { EncoderDecoder } from '@/components/tools/EncoderDecoder';
import type { Metadata } from 'next';
import { getCanonicalMetadata } from '@/lib/site-url';

export const metadata: Metadata = {
  title: 'URL Encoder / Decoder',
  description: 'Encode or decode URL components safely in your browser.',
  openGraph: { title: 'URL Encoder / Decoder', description: 'Encode or decode URL components safely in your browser.', type: 'website' },
  ...getCanonicalMetadata('/tools/url-encoder'),
};

export default function UrlEncoderPage() { return <EncoderDecoder mode="url" />; }
