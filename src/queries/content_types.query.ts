import type { ContentTypesType } from "@/types";
import { queryOptions } from "@tanstack/react-query";
import { supabaseService } from "~supabase/clientServices";

export const contentTypeRequestKey = "content_types";

export const contentTypeRequest = queryOptions({
  queryKey: ["content_types"],
  queryFn: () =>
    supabaseService
      .getContentTypes()
      .then((data) => data as ContentTypesType[]),
});
