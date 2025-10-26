import { Tabs, TabsList, TabsTrigger } from "@/components";
import { useUserProfileStore } from "@/store";
import {
  createFileRoute,
  Link,
  Outlet,
  redirect,
} from "@tanstack/react-router";
import { BookOpen, Target, TrendingUp, Trophy } from "lucide-react";
import { AnimatePresence } from "motion/react";
import { useState } from "react";

export const Route = createFileRoute("/dashboard/_dashboardLayout")({
  component: RouteComponent,
  beforeLoad: async ({ context }) => {
    if (!context.session) {
      throw redirect({ to: "/auth" });
    }

    const { onboardingComplete } = useUserProfileStore.getState();
    if (!onboardingComplete) {
      throw redirect({ to: "/onboarding" });
    }
  },
});

function RouteComponent() {
  const [activeTab, setActiveTab] = useState("overview");
  return (
    <div className="min-h-screen ">
      <div className="max-w-7xl mx-auto px-6 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full max-w-2xl mx-auto grid-cols-4 mb-8">
            <TabsTrigger
              asChild
              value="overview"
              className="flex items-center gap-2"
            >
              <Link to="/dashboard">
                <TrendingUp className="w-4 h-4" />
                <span className="hidden sm:inline">Overview</span>
              </Link>
            </TabsTrigger>

            <TabsTrigger
              asChild
              value="practice"
              className="flex items-center gap-2"
            >
              <Link to="/dashboard/practice">
                <BookOpen className="w-4 h-4" />
                <span className="hidden sm:inline">Practice</span>
              </Link>
            </TabsTrigger>

            <TabsTrigger
              asChild
              value="progress"
              className="flex items-center gap-2"
            >
              <Link to="/dashboard/progress">
                <Target className="w-4 h-4" />
                <span className="hidden sm:inline">Progress</span>
              </Link>
            </TabsTrigger>
            <TabsTrigger
              asChild
              value="challenges"
              className="flex items-center gap-2"
            >
              <Link to="/dashboard/challenges">
                <Trophy className="w-4 h-4" />
                <span className="hidden sm:inline">Challenges</span>
              </Link>
            </TabsTrigger>
          </TabsList>
        </Tabs>

        <AnimatePresence mode="wait">
          <Outlet />
        </AnimatePresence>
      </div>
    </div>
  );
}
