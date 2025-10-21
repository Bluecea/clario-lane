import { z } from "zod";

export const ValidationSchema = z.object({
  name: z.string().optional(),
  email: z.email(),
  password: z.string(),
  confirmPassword: z.string().optional(),
  dateOfBirth: z.date().or(z.string()).optional(),
  authType: z.literal(["signin", "signup"]).optional(),
});
export type ValidationSchema = z.infer<typeof ValidationSchema>;
