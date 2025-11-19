import { PracticeStep } from "@/lib";
import { create } from "zustand";

export type Question = {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
};

export type Passage = {
  id: string;
  text: string;
  title: string;
  questions: Question[];
};

export type PracticeStore = {
  wpm: number;
  comprehension: number;
  duration?: number;
  wordsRead?: number;
  correctAnswers: number;
  totalQuestions: number;
  startTime: number;
  elapsedTime: number;
  nextWpm?: number;

  currentStep: PracticeStep;
  passage: Passage | null;
  loading: boolean;
};

type PracticeStoreActions = {
  setStep: (step: PracticeStep) => void;
  setCompleted: (
    values: Pick<PracticeStore, "wordsRead" | "duration" | "wpm">,
  ) => void;
  setWpm: (wpm: number) => void;
  updateStore: (values: Partial<PracticeStore>) => void;
  reset: () => void;
};

const initialState = {
  wpm: 200,
  currentStep: PracticeStep.enum.Reading,
  correctAnswers: 0,
  totalQuestions: 0,
  comprehension: 0,
  passage: null,
  loading: false,
  elapsedTime: 0,
  startTime: 0,
  duration: 0,
  wordsRead: 0,
};

export const usePracticeStore = create<
  PracticeStore & PracticeStoreActions
>((set) => ({
  ...initialState,
  setStep: (step: PracticeStep) => set({ currentStep: step }),
  setCompleted: (
    values: Pick<PracticeStore, "wordsRead" | "duration" | "wpm">,
  ) => set(values),
  setWpm: (wpm: number) => set({ wpm }),
  updateStore: (values: Partial<PracticeStore>) => set(values),
  reset: () => set(initialState),
}));
