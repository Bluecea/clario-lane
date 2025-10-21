export type OnboardingType = {
  name?: string;
  email?: string;
  dateOfBirth?: string | Date;
  achievements: boolean;
  averageWPM?: number;
  badges?: string[];
  goals: string[];
  contentTypes: string[];
  challenges: string[];
  comprehensionScore?: number;
  focusScore?: number;
  dailyReminder: boolean;
  weeklyProgress: boolean;
  streakDays?: number;
  xpEarned?: number;

  currentStep: number;
  onboardingComplete: boolean;
  readingTestStage: "intro" | "reading" | "questions" | "results";
  readingTime: number;
  startTime: number;
  totalSessions?: number;

  // readingGoal?: string;
  // dailyTime?: string;
  // baselineWPM?: number;
  // baselineComprehension?: number;
  // currentWPM?: number;
  // currentComprehension?: number;
  // level?: number;
  // exercisesCompleted?: number;
};

export type OnboardingContextType = {
  updateProfile: (updates: Partial<OnboardingType>) => void;
};
