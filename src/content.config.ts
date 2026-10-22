import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

// Long-form pages, one folder per language: src/content/docs/<locale>/<slug>.md.
const docs = defineCollection({
  loader: glob({ base: './src/content/docs', pattern: '**/*.md' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    section: z.enum(['guide', 'about']),
    order: z.number(),
    updated: z.coerce.date(),
  }),
});

export const collections = { docs };
