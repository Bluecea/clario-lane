export type PreferencesType = "goals" | "challenges" | "contentTypes";
export interface Preferences {
	goals: string[];
	contentTypes: string[];
	challenges: string[];
}
