import { redirect, useRouter } from "@tanstack/react-router";
import { toast } from "sonner";
import { supabaseService } from "~supabase/clientServices";

export const useLogout = () => {
  const route = useRouter();

  return async () => {
    try {
      await supabaseService.signOut();
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("Failed to logout");
      }
    }

    route.invalidate().then(() => {
      throw redirect({ to: "/" });
    });
  };
};
