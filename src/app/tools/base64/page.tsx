import { EncoderDecoder } from '@/components/tools/EncoderDecoder';
import type { Metadata } from 'next';
import { getCanonicalMetadata } from '@/lib/site-url';

export const metadata: Metadata = {
  title: 'Base64 Encoder / Decoder',
  description: 'Encode and decode UTF-8 text as Base64 entirely in your browser.',
  openGraph: { title: 'Base64 Encoder / Decoder', description: 'Encode and decode UTF-8 text as Base64 entirely in your browser.', type: 'website' },
  ...getCanonicalMetadata('/tools/base64'),
};

export default function Base64Page() { return <EncoderDecoder mode="base64" />; }
