import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

function removeDupsAndLowerCase(array: string[]) {
	return [...new Set(array.map((str) => str.toLowerCase()))];
}

const baseSchema = z.object({
	title: z.string().max(60),
	date: z.union([z.string(), z.date()]).transform((val) => new Date(val)),
	category: z.string(),
	tags: z.array(z.string()).default([]).transform(removeDupsAndLowerCase),
	lang: z.enum(["zh", "en"]),
	description: z.string(),
	draft: z.boolean().default(false),
});

const blog = defineCollection({
	loader: glob({ base: "./src/content", pattern: "*/blog/**/*.{md,mdx}" }),
	schema: baseSchema,
});

const thinking = defineCollection({
	loader: glob({ base: "./src/content", pattern: "*/thinking/**/*.{md,mdx}" }),
	schema: baseSchema,
});

export const collections = { blog, thinking };
