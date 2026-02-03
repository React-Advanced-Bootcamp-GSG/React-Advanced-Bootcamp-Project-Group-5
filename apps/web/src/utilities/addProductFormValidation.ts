import * as z from "zod";

export const addProductFormSchema = z.object({
  title: z.string().min(3).max(50, "Title must be at most 50 characters long"),
  description: z
    .string()
    .min(10, "Description must be at least 10 characters long"),
  category: z.string(),
  price: z.coerce
    .number("Price must be a number")
    .min(1, { message: "Price must be greater than 0" })
    .positive({ message: "Price must be positive" }),
  image: z.url(),
});
