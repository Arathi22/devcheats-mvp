import type { Metadata } from 'next';

export function getConfiguredSiteUrl(): URL | undefined {
  const value = process.env.SITE_URL?.trim();
  if (!value) return undefined;

  const url = new URL(value);
  if (!['http:', 'https:'].includes(url.protocol)) {
    throw new Error('SITE_URL must use http or https.');
  }
  return new URL(url.origin);
}

export function getCanonicalMetadata(path: string): Pick<Metadata, 'alternates'> {
  const siteUrl = getConfiguredSiteUrl();
  return siteUrl ? { alternates: { canonical: new URL(path, siteUrl).toString() } } : {};
}
