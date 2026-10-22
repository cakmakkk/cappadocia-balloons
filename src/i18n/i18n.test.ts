import assert from 'node:assert/strict';
import { readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { test } from 'node:test';
import { DEFAULT_LOCALE, LOCALES } from './locales.ts';

const docsDir = join(process.cwd(), 'src', 'content', 'docs');
const slugsIn = (locale: string) =>
  readdirSync(join(docsDir, locale))
    .filter((name) => name.endsWith('.md'))
    .map((name) => name.replace(/\.md$/, ''))
    .sort();

test('every language has every guide', () => {
  const expected = slugsIn(DEFAULT_LOCALE);
  for (const { code } of LOCALES) {
    assert.deepEqual(slugsIn(code), expected, `${code} is missing or has extra guides`);
  }
});

test('translated guides are not copies of the English ones', () => {
  for (const slug of slugsIn(DEFAULT_LOCALE)) {
    const english = readFileSync(join(docsDir, DEFAULT_LOCALE, `${slug}.md`), 'utf8');
    for (const { code } of LOCALES.filter((l) => l.code !== DEFAULT_LOCALE)) {
      assert.notEqual(readFileSync(join(docsDir, code, `${slug}.md`), 'utf8'), english, `${code}/${slug}.md is untranslated`);
    }
  }
});
