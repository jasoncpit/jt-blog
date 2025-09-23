import { defineCollection, z } from "astro:content";

const blog = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.coerce.date(),
    draft: z.boolean().optional()
  }),
});

const work = defineCollection({
  type: "content",
  schema: z.object({
    company: z.string(),
    role: z.string(),
    dateStart: z.coerce.date(),
    dateEnd: z.union([z.coerce.date(), z.string()]),
  }),
});

const projects = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.coerce.date(),
    draft: z.boolean().optional(),
    demoURL: z.string().optional(),
    repoURL: z.string().optional()
  }),
});

const ideas = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.coerce.date(),
    draft: z.boolean().default(false),

    // New fields 
    summary: z.string().min(1), 
    stage: z.enum(["seed", "sprout", "dormant", "bloom"]).default("seed"), 
    progress: z.number().min(0).max(100).default(0), 
    nextSteps: z.string().optional(),
    
    initialResearch: z.array(z.object({
      title: z.string(),
      url: z.string().url().optional(),
      note: z.string().optional()
    })).default([]),

    progressLog: z.array(z.object({
      date: z.string(), // ISO or human string
      note: z.string()
    })).default([]),

    skills: z.array(z.string()).default([]),
    timeEstimate: z.string().optional(),

    // Keep if useful
    demoURL: z.string().url().optional(),
    repoURL: z.string().url().optional(),
    tags: z.array(z.string()).default([])
  }),
});

export const collections = { blog, work, projects, ideas };
