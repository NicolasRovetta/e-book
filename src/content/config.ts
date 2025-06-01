import { defineCollection, z } from "astro:content";

// z -> zod schema validation library
// defineCollection -> function to define a collection of content

export const books = defineCollection({
    schema: z.object({
        title: z.string(),
        author: z.string(),
        description: z.string(),
        img: z.string(),
        buy: z.object({
            usa: z.string().url(),
            argentina: z.string().url(),
        })
    })
})

export const collections = {
    books: books,
    // Add more collections here    
    // example: posts: defineCollection({ schema: z.object({ ... }) })
};
