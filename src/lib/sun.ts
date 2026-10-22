import { getTimes } from 'suncalc';
import { GOREME } from '../data/sectors.ts';

/** Sunrise in Göreme on a calendar day (YYYY-MM-DD), as an ISO string. */
export function sunriseOn(isoDate: string): string {
  // Midday UTC keeps the calculation on the right local day.
  const { sunrise } = getTimes(new Date(`${isoDate}T09:00:00Z`), GOREME.lat, GOREME.lon);
  if (!sunrise) throw new Error(`No sunrise on ${isoDate}`);
  return sunrise.toISOString();
}
