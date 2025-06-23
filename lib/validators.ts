import { formatNumberWithDecimal } from "@/lib/utils";
import { z } from "zod";

const currency = z
  .string()
  .refine(
    (value) => /^\d+(\.\d{2})?$/.test(formatNumberWithDecimal(Number(value))),
    "Price must have exactly two decimal places"
  );
const threeCharError = " must be at least 3 characters";

export const insertProductSchema = z.object({
  name: z.string().min(3, `Name ${threeCharError}`),
  slug: z.string().min(3, `Slug ${threeCharError}`),
  category: z.string().min(3, `Category ${threeCharError}`),
  brand: z.string().min(3, `Brand ${threeCharError}`),
  description: z.string().min(3, `Description ${threeCharError}`),
  stock: z.coerce.number(),
  images: z.array(z.string()).min(1, "Product must have at least one image"),
  isFeatured: z.boolean(),
  banner: z.string().nullable(),
  price: currency,
});
