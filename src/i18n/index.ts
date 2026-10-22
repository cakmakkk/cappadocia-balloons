import type { Locale } from './locales.ts';
import type { Messages } from './types.ts';
import de from './messages/de.ts';
import en from './messages/en.ts';
import es from './messages/es.ts';
import it from './messages/it.ts';
import ja from './messages/ja.ts';
import ko from './messages/ko.ts';
import pt from './messages/pt.ts';
import ru from './messages/ru.ts';
import tr from './messages/tr.ts';
import zh from './messages/zh.ts';

const MESSAGES: Record<Locale, Messages> = { en, tr, es, it, de, pt, ru, ko, ja, zh };

export function messages(locale: Locale): Messages {
  return MESSAGES[locale];
}
