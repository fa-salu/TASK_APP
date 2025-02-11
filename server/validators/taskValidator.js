import { z } from "zod";

export const taskSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters long"),
  description: z
    .string()
    .min(10, "Description must be at least 10 characters long"),
  deadline: z
    .string()
    .refine((date) => !isNaN(Date.parse(date)), "Invalid date format"),
  priority: z.enum(
    ["low", "medium", "high"],
    "Priority must be one of: low, medium, high"
  ),
  status: z
    .enum(["pending", "completed"], {
      message: "Status must be either 'pending' or 'completed'",
    })
    .default("pending"),
});
