import { createFileRoute, useRouter } from "@tanstack/react-router";
import { AnimatePresence } from "motion/react";
import {
  Button,
  Challenges,
  ContentType,
  Goals,
  OnboardingReadingTest,
  type Preferences,
  QuickDrill,
  Progress,
} from "@/components";
import { Card } from "@/components/ui/card";

import { useOnboardingStore } from "@/store";

export const Route = createFileRoute("/onboarding")({
  component: RouteComponent,
});

function RouteComponent() {
  const totalSteps = 4;
  const { currentStep, name, updateProfile, ...onboarding } =
    useOnboardingStore();
  const progress = ((currentStep + 1) / totalSteps) * 100;
  const route = useRouter();

  const toggleSelection = (category: keyof Preferences, value: string) => {
    updateProfile({
      [category]: onboarding[category].includes(value)
        ? onboarding[category].filter((item) => item !== value)
        : [...onboarding[category], value],
    });
  };

  const handleNext = () => {
    if (currentStep < totalSteps - 1) {
      updateProfile({ currentStep: currentStep + 1 });
    } else {
      updateProfile({
        streakDays: 1,
        onboardingComplete: true,
        currentStep: 0,
      });
      route.navigate({ to: "/dashboard" });
      console.log({ profile: onboarding, name, currentStep });
    }
  };

  const canProceed = () => {
    switch (currentStep) {
      case 0:
        return onboarding.challenges.length > 0;
      case 1:
        return onboarding.contentTypes.length > 0;
      case 2:
        return onboarding.goals.length > 0;
      default:
        return false;
    }
  };

  if (currentStep === 3) return <OnboardingReadingTest />;
  if (currentStep === 4) return <QuickDrill handleNext={handleNext} />;

  return (
    <div className="min-h-[80svh] bg-background p-4">
      <Card className="w-full mx-auto mt-10 lg:mt-20 max-w-3xl  p-8">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between mb-2 text-sm text-muted-foreground">
            <span>
              Step {currentStep + 1} of {totalSteps}
            </span>
            <span>{Math.round(progress)}%</span>
          </div>
          <Progress value={progress} />
        </div>

        {/* Welcome Message */}
        {currentStep === 0 && (
          <div className="mb-6 text-center">
            <h2 className="mb-2">Welcome, {name}! 👋</h2>
            <p className="text-muted-foreground">
              Let's personalize your learning journey
            </p>
          </div>
        )}

        {/* Steps */}
        <AnimatePresence mode="wait">
          {currentStep === 0 && (
            <Challenges
              challenges={onboarding.challenges}
              toggleSelection={toggleSelection}
            />
          )}
          {currentStep === 1 && (
            <ContentType
              contentTypes={onboarding.contentTypes}
              toggleSelection={toggleSelection}
            />
          )}
          {currentStep === 2 && (
            <Goals goals={onboarding.goals} toggleSelection={toggleSelection} />
          )}
        </AnimatePresence>

        {/* Navigation */}
        <div className="flex gap-4 mt-8">
          {currentStep > 0 && (
            <Button
              variant="outline"
              onClick={() => updateProfile({ currentStep: currentStep - 1 })}
              className="flex-1"
            >
              Back
            </Button>
          )}
          <Button
            onClick={handleNext}
            disabled={!canProceed()}
            className="flex-1"
          >
            {currentStep === totalSteps - 1 ? "Complete" : "Next"}
          </Button>
        </div>
      </Card>
    </div>
  );
}
