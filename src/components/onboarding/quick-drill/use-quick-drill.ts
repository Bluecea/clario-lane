import { useState } from "react";
import { useOnboardingStore } from "@/store";
import { DRILL_WORDS } from "./words";

export function useQuickDrill() {
  const { updateProfile, ...onboarding } = useOnboardingStore();
  const [stage, setStage] = useState<"intro" | "drill" | "results">("intro");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [drillStartTime, setDrillStartTime] = useState(0);
  const [improvement, setImprovement] = useState(0);

  const handleStartDrill = () => {
    setStage("drill");
    setDrillStartTime(Date.now());
    setCurrentIndex(0);

    // Simulate word chunking drill
    const interval = setInterval(() => {
      setCurrentIndex((prev) => {
        if (prev >= DRILL_WORDS.length - 1) {
          clearInterval(interval);
          setTimeout(() => {
            const drillTime = Date.now() - drillStartTime;
            const expectedTime = DRILL_WORDS.length * 1000;
            const improvementPercent = Math.max(
              5,
              Math.min(
                25,
                Math.round(((expectedTime - drillTime) / expectedTime) * 100),
              ),
            );
            setImprovement(improvementPercent);

            // Award first badge and XP
            updateProfile({
              badges: ["first_drill"],
              xp_earned: onboarding?.xp_earned ? onboarding.xp_earned + 50 : 50,
              total_sessions: 1,
            });

            setStage("results");
          }, 500);
          return prev;
        }
        return prev + 1;
      });
    }, 800);
  };

  return {
    stage,
    currentIndex,
    improvement,
    handleStartDrill,
  };
}
