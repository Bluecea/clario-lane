import { createClient } from "@supabase/supabase-js";
import { clientEnv } from "@/config/env";

export const supabaseClient = createClient(
  clientEnv.VITE_SUPABASE_URL,
  clientEnv.VITE_SUPABASE_ANON_KEY,
);
