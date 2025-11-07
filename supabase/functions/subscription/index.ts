import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { Hono } from "jsr:@hono/hono";
import { createClient } from "npm:@supabase/supabase-js@2";

const paystackSecretKey = Deno.env.get("PAYSTACK_SECRET_KEY")!;
const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
const supabase_anon_key = Deno.env.get("SUPABASE_ANON_KEY")!;
const supabase_service_key = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;

console.log({ paystackSecretKey, supabaseUrl, supabase_anon_key });

// For user-facing operations (respects RLS)
const supabase = createClient(supabaseUrl, supabase_anon_key);

// For admin operations (bypasses RLS)
const supabaseAdmin = createClient(supabaseUrl, supabase_service_key);

const planUrl = "https://api.paystack.co/plan";

const initateTransactionUrl = "https://api.paystack.co/transaction/initialize";

const app = new Hono();

app.post("/subscription/plans", async () => {
  const response = await fetch(planUrl, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${paystackSecretKey}`,
      "Content-Type": "application/json",
    },
  });

  const data = await response.json();

  const plans = data.data.map((plan: any) => ({
    id: plan.id,
    name: plan.name,
    amount: plan.amount / 100,
    interval: plan.interval,
    domain: plan.domain,
    planCode: plan.plan_code,
    description: plan.description,
    currency: plan.currency,
  }));
  return Response.json(plans);
});

app.post("/subscription/initialize", async (c) => {
  const { email, amount, plan } = await c.req.json();

  const response = await fetch(initateTransactionUrl, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${paystackSecretKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, amount: amount * 100, plan }),
  });

  const data = await response.json();

  return Response.json(data);
});

app.post("/subscription/webhook/events", async (c) => {
  c.text("got it");

  const data = await c.req.json();
  console.log({ data });
});

Deno.serve(app.fetch);
