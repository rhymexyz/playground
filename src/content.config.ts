import { glob } from "astro/loaders";
import { defineCollection, z } from "astro:content";

const writing = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/writing" }),
  schema: z.object({
    title: z.string(),
    summary: z.string(),
    date: z.coerce.date(),
    tag: z.string(),
    featured: z.boolean().default(false),
    draft: z.boolean().default(false),
    image: z.string().optional(),
    imageAlt: z.string().optional(),
  }),
});

const experiments = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/experiments" }),
  schema: z.object({
    experimentId: z.string(),
    date: z.coerce.date(),
    title: z.string(),
    milestone: z.boolean().default(false),
  }),
});

export const collections = { writing, experiments };
