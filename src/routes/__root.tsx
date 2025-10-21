import * as React from "react";
import { Outlet, createRootRoute } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";

import { Toaster } from "sonner";
import Navbar from "@/components/navbar";
import { supabaseClient } from "@/integration";
import { Footer, ThemeProvider } from "@/components";

export const Route = createRootRoute({
  component: RootComponent,
  beforeLoad: async () => {
    const { data: user, error } = await supabaseClient.auth.getUser();
    if (error) {
      console.error(error);
      return { user: null };
    }
    return { user };
  },
});

function RootComponent() {
  const { user } = Route.useRouteContext();
  return (
    <React.Fragment>
      <ThemeProvider>
        <Navbar user={user} />
        <Outlet />
        <Footer />
        <Toaster position="top-center" />
      </ThemeProvider>
      <TanStackRouterDevtools position="bottom-right" />
    </React.Fragment>
  );
}
