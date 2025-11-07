import type { OnboardingType } from "@/store";

export type PreferencesType = keyof Pick<
	OnboardingType,
	"goals" | "challenges" | "content_type"
>;

export interface Preferences {
	goals: string[];
	content_type: string[];
	challenges: string[];
}
