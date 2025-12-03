import { queryOptions } from "@tanstack/react-query";
import { supabaseService } from "~supabase/clientServices";

export const fetchWordsReadTodayKey = ["words-read-today"];

export const fetchWordsReadToday = (userId?: string) =>
  queryOptions({
    queryKey: [...fetchWordsReadTodayKey, userId],
    queryFn: async () => {
      if (!userId) return 0;

      const { data, error } = await supabaseService.sp.rpc(
        "get_words_read_today",
        { uid: userId },
      );

      if (error) {
        console.error("Error fetching words read today:", error);
        return 0;
      }

      return data as number;
    },
    enabled: !!userId,
  });
