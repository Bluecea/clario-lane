import { create } from "zustand";
import type {
  OnboardingContextType,
  OnboardingType,
} from "./onboarding-store-type";

export const useOnboardingStore = create<
  OnboardingType & OnboardingContextType
>((set) => ({
  current_step: 0,
  onboarding_completed: false,
  updateProfile: (update) => set((state) => ({ ...state, ...update })),
  goals: [],
  content_type: [],
  challenges: [],
  reading_test_stage: "intro",
  reading_time: 0,
  start_time: 0,
  daily_reminder: true,
  weekly_summary: true,
  achievements: true,
  isSubmitting: false,
  current_comprehension_score: 0,
  total_steps: 7,
  baseline_comprehension: 0,
  baseline_wpm: 0,
  email: "",
  name: "",
}));
