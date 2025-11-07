import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { Hono } from "jsr:@hono/hono";
import { createClient } from "npm:@supabase/supabase-js@2";

const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
const supabase_anon_key = Deno.env.get("SUPABASE_ANON_KEY")!;
const supabase_service_key = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;

// For user-facing operations (respects RLS)
const supabase = createClient(supabaseUrl, supabase_anon_key);

// For admin operations (bypasses RLS)
const supabaseAdmin = createClient(supabaseUrl, supabase_service_key);

const app = new Hono();

app.get("onboarding/plans", (c) => {
});

Deno.serve(app.fetch);
