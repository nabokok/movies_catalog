import { z } from "zod";

export const formSchema = z.object({
  title: z.string().min(2, {
    message: "Title must be at least 2 characters.",
  }).max(50, {
    message: "Title should be no more than 50.",
  }),
  director: z.string().min(2, {
    message: "Director must be at least 2 characters.",
  }).max(50, {
    message: "Director should be no more than 50.",
  }),
  description: z.string().min(2, {
    message: "Description must be at least 2 characters.",
  }).max(500, {
    message: "Description should be no more than 500.",
  }),
  image: z.string().url().min(1, { message: "Required" }),
  rating: z.number().min(0).max(10),
  release_date: z.string().min(1, { message: "Required" }),
  genre: z.array(z.string().trim().min(2, { message: "At least 2 characters" })),
  actors: z.array(z.string().trim().min(2, { message: "At least 2 characters" })),
});
