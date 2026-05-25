import { z } from "zod";

export const LinkCreateSchema = z.object({
    title: z
        .string()
        .min(3, "Title is too short")
        .max(1000, "Title is too large"),

    description: z
        .string()
        .max(10000, "Description is too large"),

    type: z.enum([
        "X",
        "LinkedIn",
        "YouTube",
        "Link",
        "Other",
    ]),

    url: z.string().url(),
    thumbnail: z.string().optional(),
})