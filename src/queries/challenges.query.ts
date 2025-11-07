import type { ChallengesType } from "@/types";
import { queryOptions } from "@tanstack/react-query";
import { supabaseService } from "~supabase/clientServices";

export const challengeRequestKey = "challenges";

export const challengeRequest = queryOptions({
  queryKey: ["challenges"],
  queryFn: async () => {
    return await supabaseService
      .getChallenges()
      .then((data) => data as ChallengesType[]);
  },
});
