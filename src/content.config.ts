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

const updateSchema = z.object({
  date: z.coerce.date(),
  title: z.string(),
  body: z.string(),
  milestone: z.boolean().default(true),
});

const iterationSchema = z.object({
  startDate: z.coerce.date(),
  endDate: z.coerce.date(),
  updates: z.array(updateSchema).default([]),
  reflection: z.string().optional(),
});

// One file per experiment — filename = experiment id
const experiments = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/experiments" }),
  schema: z.object({
    title: z.string(),
    category: z.enum(["wellness", "creativity", "learning", "productivity", "relationships"]),
    status: z.enum(["active", "completed", "paused", "released"]),
    startDate: z.coerce.date(),
    endDate: z.coerce.date(),
    background: z.string().optional(),
    output: z.string(),
    loot: z.string(),
    linkedExperiments: z.array(z.string()).default([]),
    linkedPosts: z.array(z.string()).default([]),
    linkedProjects: z.array(z.string()).default([]),
    updates: z.array(updateSchema).default([]),
    reflection: z.string().optional(),
    // Past completed rounds — current (top-level) is always the latest
    iterations: z.array(iterationSchema).default([]),
  }),
});

export const collections = { writing, experiments };
