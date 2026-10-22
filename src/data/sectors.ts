// The three primary flight sectors, as drawn on the official map
// (https://shmkapadokya.kapadokya.edu.tr/xml/sectors.xml), north to south.
// Town coordinates are from Wikipedia.

export type SectorId = 'A' | 'B' | 'C';
export type TownId = 'avanos' | 'cavusin' | 'goreme' | 'uchisar' | 'ortahisar' | 'urgup' | 'mustafapasa';

/** [latitude, longitude] corners, in the order the official file lists them. */
export const SECTOR_POLYGONS: Record<SectorId, [number, number][]> = {
  A: [
    [38.7175, 34.7675],
    [38.72861, 34.94916],
    [38.67362089412096, 34.94533015744941],
    [38.67361449052316, 34.76685428207104],
  ],
  B: [
    [38.67361449052316, 34.76685428207104],
    [38.67362089412096, 34.94533015744941],
    [38.59556555871814, 34.93988057672192],
    [38.59555637396299, 34.76579979329937],
  ],
  C: [
    [38.59555637396299, 34.76579979329937],
    [38.59556555871814, 34.93988057672192],
    [38.555, 34.93694],
    [38.55861, 34.76527],
  ],
};

export const TOWNS: { id: TownId; sector: SectorId; lat: number; lon: number }[] = [
  { id: 'avanos', sector: 'A', lat: 38.715, lon: 34.8467 },
  { id: 'cavusin', sector: 'B', lat: 38.6728, lon: 34.8394 },
  { id: 'goreme', sector: 'B', lat: 38.6431, lon: 34.8289 },
  { id: 'uchisar', sector: 'B', lat: 38.6289, lon: 34.8033 },
  { id: 'ortahisar', sector: 'B', lat: 38.6208, lon: 34.8647 },
  { id: 'urgup', sector: 'B', lat: 38.6314, lon: 34.9131 },
  { id: 'mustafapasa', sector: 'C', lat: 38.5864, lon: 34.8978 },
];

export const SECTOR_IDS: SectorId[] = ['A', 'B', 'C'];

export function townsIn(sector: SectorId): TownId[] {
  return TOWNS.filter((town) => town.sector === sector).map((town) => town.id);
}

/** Göreme, used for sunrise times and the weather forecast. */
export const GOREME = { lat: 38.6431, lon: 34.8289 };
