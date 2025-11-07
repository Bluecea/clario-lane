import { clientEnv } from "@/config/env";
import { logServerError } from "@/lib";
import {
  initialUserProfile,
  OnboardingSchema,
  useOnboardingStore,
  type UserProfileType,
  useUserProfileStore,
} from "@/store";
import { createClient } from "@supabase/supabase-js";
import { apiInstance } from "../api-instance";
import type { SubscriptionRequest } from ".";

class SupabaseService {
  public supabase;
  constructor() {
    this.supabase = createClient(
      clientEnv.VITE_SUPABASE_URL,
      clientEnv.VITE_SUPABASE_ANON_KEY,
    );
  }

  public async signUp(email: string, password: string, name: string) {
    const { data, error } = await this.supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          displayName: name,
        },
      },
    });

    if (error) {
      throw new Error(error.message);
    }
    return data;
  }

  async signIn(email: string, password: string) {
    const { data, error } = await this.supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      throw new Error(error.message);
    }
    return data;
  }

  public async signOut() {
    const { error } = await this.supabase.auth.signOut();
    if (error) {
      throw new Error(error.message);
    }
  }

  public async signInWithGoogle() {
    const { data, error } = await this.supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/auth`,
      },
    });

    if (error) {
      throw new Error(error.message);
    }
    return data;
  }

  public async getSession() {
    try {
      const { data, error } = await this.supabase.auth.getSession();
      if (error) {
        throw error;
      }
      return data.session;
    } catch (error) {
      return logServerError(error);
    }
  }

  public async getUser() {
    try {
      const { error, data } = await this.supabase
        .from("users")
        .select("*")
        .single();

      if (error) {
        throw error;
      }
      useUserProfileStore.setState(data as UserProfileType);
      return data;
    } catch (error) {
      useUserProfileStore.setState(initialUserProfile);
      return logServerError(error);
    }
  }

  public async insertUser() {
    try {
      const store = useOnboardingStore.getState();
      const { success, error: zodError } = await OnboardingSchema
        .safeParseAsync(store);

      if (!success) throw zodError;

      const { error } = await this.supabase.from("users").insert({});
      //   {
      //   name: store.name,
      //   email: store.email,
      //   dateOfBirth: store.date_of_birth,
      //   achievements: store.achievements,
      //   baseLineWPM: store.baseline_wpm,
      //   badges: store.badges,
      //   goals: store.goals,
      //   contentTypes: store.content_type,
      //   challenges: store.challenges,
      //   currentComprehensionScore: store.current_comprehension_score,
      //   focusScore: store.focus_score,
      //   dailyReminder: store.daily_reminder,
      //   weeklyProgress: store.weekly_summary,
      //   streakDays: store.streak_days,
      //   xpEarned: store.xp_earned,
      //   currentWPM: store.baseline_wpm,
      //   level: store.level,
      //   baselineComprehension: store.baseline_comprehension,
      //   currentComprehension: store.current_comprehension_score,
      //   onboardingComplete: store.onboarding_completed,
      // }

      if (error) {
        throw error;
      }

      const res = await this.getUser();
      if (res) {
        useOnboardingStore.setState({
          current_step: 0,
          isSubmitting: false,
        });
        useUserProfileStore.setState({
          onboardingComplete: store.onboarding_completed,
        });
      }

      return;
    } catch (error) {
      return logServerError(error);
    }
  }

  async getChallenges() {
    const { data, error } = await this.supabase
      .from("challenges")
      .select("*");

    if (error) {
      throw new Error(error.message);
    }
    return data;
  }

  async getContentTypes() {
    const { data, error } = await this.supabase
      .from("content_types")
      .select("*")
      .in("content", ["technology", "non-fiction", "fictions", "news"]);

    if (error) {
      throw new Error(error.message);
    }
    return data;
  }

  async getGoals() {
    const { data, error } = await this.supabase.from("goals").select("*");

    if (error) {
      throw new Error(error.message);
    }
    return data;
  }

  async getUserCurrency() {
    const { data } = await apiInstance.get("subscription/user-currency");
    return data;
  }

  async initiateSubscription(params: SubscriptionRequest) {
    const { data } = await apiInstance.post("subscription/initialize", params);
    return data;
  }
}

export const supabaseService = new SupabaseService();
