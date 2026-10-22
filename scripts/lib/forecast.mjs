// Turns an Open-Meteo hourly forecast for Göreme into a simple outlook for
// each morning's flight window.
//
// The thresholds are our own working assumptions, not official rules. They
// are compared against recorded official decisions over time and adjusted.

import { GOREME } from '../../src/data/sectors.ts';

export const THRESHOLDS = {
  good: { wind: 12, gust: 20, visibility: 5000, precipitation: 0.2 },
  poor: { wind: 20, gust: 30, visibility: 1000, precipitation: 1 },
};

const FOG = new Set([45, 48]);
const THUNDER_OR_SNOW = new Set([71, 73, 75, 77, 85, 86, 95, 96, 99]);

export function forecastUrl() {
  const params = new URLSearchParams({
    latitude: String(GOREME.lat),
    longitude: String(GOREME.lon),
    hourly: 'wind_speed_10m,wind_gusts_10m,visibility,precipitation,weather_code',
    daily: 'sunrise',
    timezone: 'UTC',
    forecast_days: '8',
    wind_speed_unit: 'kmh',
  });
  return `https://api.open-meteo.com/v1/forecast?${params}`;
}

/** The flight window we look at: from 30 minutes before sunrise to 2 hours after. */
export function morningWindow(sunriseIso) {
  const sunrise = Date.parse(sunriseIso);
  return { start: new Date(sunrise - 30 * 60_000).toISOString(), end: new Date(sunrise + 120 * 60_000).toISOString() };
}

export function rate({ maxWind, maxGust, minVisibility, precipitation, codes }) {
  const { good, poor } = THRESHOLDS;
  if (
    maxWind > poor.wind ||
    maxGust > poor.gust ||
    (minVisibility !== null && minVisibility < poor.visibility) ||
    precipitation >= poor.precipitation ||
    codes.some((code) => THUNDER_OR_SNOW.has(code))
  ) {
    return 'poor';
  }
  if (
    maxWind <= good.wind &&
    maxGust <= good.gust &&
    (minVisibility === null || minVisibility >= good.visibility) &&
    precipitation < good.precipitation &&
    !codes.some((code) => FOG.has(code))
  ) {
    return 'good';
  }
  return 'borderline';
}

const toIso = (time) => `${time}:00Z`; // Open-Meteo returns "YYYY-MM-DDTHH:MM" in UTC.

/** One entry per morning whose window hasn't ended at `now`. */
export function summarizeMornings(api, now = new Date()) {
  const { hourly, daily } = api;
  const hours = hourly.time.map((time, i) => ({
    at: Date.parse(toIso(time)),
    wind: hourly.wind_speed_10m[i],
    gust: hourly.wind_gusts_10m[i],
    visibility: hourly.visibility?.[i] ?? null,
    precipitation: hourly.precipitation[i] ?? 0,
    code: hourly.weather_code[i],
  }));

  return daily.time
    .map((date, i) => {
      const sunrise = toIso(daily.sunrise[i]);
      const window = morningWindow(sunrise);
      // Hourly values that cover the window: the hour it starts in, through its end.
      const from = Date.parse(window.start) - (Date.parse(window.start) % 3_600_000);
      const inWindow = hours.filter((h) => h.at >= from && h.at <= Date.parse(window.end) && h.wind !== null);
      if (inWindow.length === 0) return null;

      const visibilities = inWindow.map((h) => h.visibility).filter((v) => v !== null);
      const metrics = {
        maxWind: Math.max(...inWindow.map((h) => h.wind)),
        maxGust: Math.max(...inWindow.map((h) => h.gust)),
        minVisibility: visibilities.length > 0 ? Math.min(...visibilities) : null,
        precipitation: Math.round(inWindow.reduce((sum, h) => sum + h.precipitation, 0) * 10) / 10,
        codes: [...new Set(inWindow.map((h) => h.code))],
      };
      return { date, sunrise, window, ...metrics, rating: rate(metrics) };
    })
    .filter((day) => day !== null && Date.parse(day.window.end) > now.getTime())
    .slice(0, 7);
}
