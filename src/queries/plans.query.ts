import type { PlanObject } from "@/types";
import { queryOptions } from "@tanstack/react-query";
import { supabaseService } from "~supabase/clientServices";

export const plansRequestKey = "plans";

export const plansRequest = queryOptions({
  queryKey: [plansRequestKey],
  queryFn: async () => {
    return await supabaseService.supabase.functions
      .invoke("subscription/plans")
      .then((res) => res.data as PlanObject[]);
  },
});
