import { z } from "zod";

export const taskSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  deadline: z.string().min(1, "Deadline is required"),
  priority: z.enum(["low", "medium", "high"], {
    errorMap: () => ({ message: "Priority is required" }),
  }),
});
