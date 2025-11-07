import type { GoalsType } from "@/types";
import { queryOptions } from "@tanstack/react-query";
import { supabaseService } from "~supabase/clientServices";

export const goalsRequestKey = "goals";

export const goalsRequest = queryOptions({
  queryKey: ["goals"],
  queryFn: async () => {
    return await supabaseService
      .getGoals()
      .then((data) => data as GoalsType[]);
  },
});
