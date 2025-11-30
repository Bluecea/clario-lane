import type { OnboardingType } from "@/store";
import type { UserTable } from "@/types";
import { mutationOptions } from "@tanstack/react-query";
import { supabaseService } from "~supabase/clientServices";

export const userMutation = mutationOptions({
  mutationFn: async (params: OnboardingType) => {
    // Get the authenticated user's ID
    const { data: { user } } = await supabaseService.sp.auth.getUser();

    if (!user) {
      throw new Error("User must be authenticated to create profile");
    }

    const { id: _ignored, ...dataWithoutId } = params as unknown as UserTable;
    const queryParams = {
      id: user.id, // Must match auth.uid() for RLS policy
      ...dataWithoutId,
      current_comprehension_score: params.baseline_comprehension,
      current_wpm: params.baseline_wpm,
      total_sessions: 1,
    } satisfies UserTable;

    const { status, error } = await supabaseService.sp.from("users").insert(
      queryParams,
    );

    if (error) throw error;

    return status;
  },
});
