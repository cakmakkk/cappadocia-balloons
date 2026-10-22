import { getCollection, type CollectionEntry } from 'astro:content';
import type { Locale } from '../i18n/locales.ts';

export type Doc = CollectionEntry<'docs'>;

/** "en/flags-and-sectors" -> "flags-and-sectors". */
export function slugOf(doc: Doc): string {
  return doc.id.split('/').slice(1).join('/');
}

export async function docsIn(locale: Locale, section?: Doc['data']['section']): Promise<Doc[]> {
  const docs = await getCollection(
    'docs',
    (doc) => doc.id.startsWith(`${locale}/`) && (section === undefined || doc.data.section === section),
  );
  return docs.sort((a, b) => a.data.order - b.data.order);
}

export async function docIn(locale: Locale, slug: string): Promise<Doc> {
  const doc = (await docsIn(locale)).find((d) => slugOf(d) === slug);
  if (!doc) throw new Error(`Missing ${locale} translation of "${slug}"`);
  return doc;
}
