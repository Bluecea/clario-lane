export type ChallengesType = {
  challenge: string;
  description: string;
  id?: string;
  create_at?: string;
  updated_at?: string;
};

export type ContentTypesType = {
  content: string;
  description: string;
  id?: string;
  create_at?: string;
  updated_at?: string;
};

export type GoalsType = {
  goal: string;
  description: string;
  id?: string;
  create_at?: string;
  updated_at?: string;
};

export type PlanObject = {
  id: number;
  name: string;
  amount: number;
  interval: string;
  domain: string;
  planCode: string;
  description: string;
  currency: string;
};

export type OnboardingPreferences = {
  challenges: ChallengesType[];
  contentType: ContentTypesType[];
  goals: GoalsType[];
  plans?: PlanObject[];
};
