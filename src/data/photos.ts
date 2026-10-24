// Hero photos from Wikimedia Commons, one per scene, credited on the page as
// their licences require. Wolfgang Moroder asks that his photo is not used
// on social media, so it stays out of the share image (public/og.jpg).

import type { ImageMetadata } from 'astro';
import flying from '../assets/photos/flying.jpg';
import grounded from '../assets/photos/grounded.jpg';
import waiting from '../assets/photos/waiting.jpg';
import type { Scene } from '../lib/status.ts';

export interface Photo {
  src: ImageMetadata;
  author: string;
  license: string;
  licenseUrl: string;
  source: string;
  /** CSS object-position, to keep the subject in frame when cropped. */
  position: string;
}

export const PHOTOS: Record<Scene, Photo> = {
  flying: {
    src: flying,
    author: 'Wolfgang Moroder',
    license: 'CC BY-SA 3.0',
    licenseUrl: 'https://creativecommons.org/licenses/by-sa/3.0/',
    source: 'https://commons.wikimedia.org/wiki/File:Hot_air_balloon_ride_at_sunrise_in_Cappadocia.JPG',
    position: 'center 40%',
  },
  grounded: {
    src: grounded,
    author: 'Bernard Gagnon',
    license: 'CC BY-SA 3.0',
    licenseUrl: 'https://creativecommons.org/licenses/by-sa/3.0/',
    source: 'https://commons.wikimedia.org/wiki/File:Landscape_near_U%C3%A7hisar_02.jpg',
    position: 'center 55%',
  },
  night: {
    src: waiting,
    author: 'MusikAnimal',
    license: 'CC BY-SA 4.0',
    licenseUrl: 'https://creativecommons.org/licenses/by-sa/4.0/',
    source: 'https://commons.wikimedia.org/wiki/File:Hot_air_balloon_at_sunrise_over_Cappadocia,_Turkey.JPG',
    position: 'center 60%',
  },
};
