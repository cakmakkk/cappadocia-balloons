// The site is served from a sub-path on GitHub Pages (/cappadocia-balloons/)
// and may move to a domain root later, so every internal link goes through here.

const base = import.meta.env.BASE_URL.replace(/\/$/, '');

/** Path within the site, e.g. href('/history/'). */
export function href(path: string): string {
  return `${base}${path}`;
}

/** Absolute URL for structured data and other places that need one. */
export function absolute(path: string, site: URL | undefined): string {
  return new URL(href(path), site).href;
}
