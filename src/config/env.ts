// src/config/env.ts
import { z } from "zod";

const clientEnvSchema = z.object({
  VITE_SUPABASE_URL: z.url(),
  VITE_APP_NAME: z.string(),
  VITE_SUPABASE_ANON_KEY: z.string().min(32),
});

// Validate client environment
export const clientEnv = clientEnvSchema.parse(import.meta.env);
