import { create } from "zustand";
import type {
  Achievement,
  Quest,
  UserAchievement,
  UserQuest,
  UserStats,
} from "@/types";

interface GamificationState {
  stats: UserStats | null;
  achievements: Achievement[];
  userAchievements: UserAchievement[];
  quests: Quest[];
  userQuests: UserQuest[];
  isLoading: boolean;

  setStats: (stats: UserStats | null) => void;
  setAchievements: (achievements: Achievement[]) => void;
  setUserAchievements: (userAchievements: UserAchievement[]) => void;
  setQuests: (quests: Quest[]) => void;
  setUserQuests: (userQuests: UserQuest[]) => void;
  setIsLoading: (isLoading: boolean) => void;
}

export const useGamificationStore = create<GamificationState>((set) => ({
  stats: null,
  achievements: [],
  userAchievements: [],
  quests: [],
  userQuests: [],
  isLoading: true,

  setStats: (stats) => set({ stats }),
  setAchievements: (achievements) => set({ achievements }),
  setUserAchievements: (userAchievements) => set({ userAchievements }),
  setQuests: (quests) => set({ quests }),
  setUserQuests: (userQuests) => set({ userQuests }),
  setIsLoading: (isLoading) => set({ isLoading }),
}));
