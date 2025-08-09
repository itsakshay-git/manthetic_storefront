import { z } from "zod";

export const filterSchema = z.object({
  search: z.string().max(100).optional().or(z.literal("")),
  category: z.string().optional().or(z.literal("")),
  stock: z.enum(["", "in", "out"]),
  is_best_selling: z.boolean(),
  size: z.enum(["", "S", "M", "L", "XL"]),
});
