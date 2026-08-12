import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

const work = defineCollection({
  loader: glob({ base: "./src/content/work", pattern: "**/[^_]*.{md,mdx}" }),
  schema: z.object({
    company: z.string(),
    role: z.string(),
    dateStart: z.coerce.date(),
    dateEnd: z.union([z.coerce.date(), z.string()]),
  }),
});

const projects = defineCollection({
  loader: glob({ base: "./src/content/projects", pattern: "**/[^_]*.{md,mdx}" }),
  schema: ({ image }) => z.object({
    title: z.string(),
    description: z.string(),
    date: z.coerce.date(),
    draft: z.boolean().optional(),
    kind: z.enum(["project", "note"]).default("project"),
    tags: z.array(z.string()).default([]),
    hero: image().optional(),
    demoURL: z.string().optional(),
    repoURL: z.string().optional(),
    references: z.array(z.object({
      title: z.string(),
      url: z.string().url().optional(),
      note: z.string().optional(),
    })).default([]),
    notes: z.array(z.object({ title: z.string(), body: z.string() })).default([]),
  }),
});

const ideas = defineCollection({
  loader: glob({ base: "./src/content/ideas", pattern: "**/[^_]*.{md,mdx}" }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.coerce.date(),
    draft: z.boolean().default(false),
    summary: z.string().min(1),
    stage: z.enum(["seed", "sprout", "dormant", "bloom"]).default("seed"),
    progress: z.number().min(0).max(100).default(0),
    nextSteps: z.string().optional(),
    initialResearch: z.array(z.object({
      title: z.string(),
      url: z.string().url().optional(),
      note: z.string().optional(),
    })).default([]),
    progressLog: z.array(z.object({
      date: z.string(),
      note: z.string(),
    })).default([]),
    skills: z.array(z.string()).default([]),
    timeEstimate: z.string().optional(),
    demoURL: z.string().url().optional(),
    repoURL: z.string().url().optional(),
    tags: z.array(z.string()).default([]),
  }),
});

export const collections = { work, projects, ideas };
