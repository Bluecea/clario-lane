import { useState } from "react";
import { useOnboardingStore } from "@/store";
import { PASSAGE } from "./passage";

export function useOnboardingReadingTest() {
  const [answers, setAnswers] = useState<number[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const {
    updateProfile,
    start_time: startTime,
    reading_time: readingTime,
    xp_earned: xpEarned,
  } = useOnboardingStore();

  const handleStartReading = () => {
    updateProfile({ reading_test_stage: "reading", start_time: Date.now() });
  };

  const handleFinishReading = () => {
    const endTime = Date.now();
    updateProfile({
      reading_test_stage: "questions",
      reading_time: (endTime - startTime) / 1000,
    });
  };

  const handleAnswerQuestion = (answerIndex: number) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = answerIndex;
    setAnswers(newAnswers);
  };

  const handleNextQuestion = () => {
    if (currentQuestion < PASSAGE.questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      calculateResults();
    }
  };

  const calculateResults = () => {
    const correctAnswers = answers.filter(
      (answer, index) => answer === PASSAGE.questions[index].correct,
    ).length;
    const baselineComprehension = Math.round(
      (correctAnswers / PASSAGE.questions.length) * 100,
    );
    const baseLineWPM = Math.round((PASSAGE.wordCount / readingTime) * 60);

    updateProfile({
      baseline_comprehension: baselineComprehension,
      baseline_wpm: baseLineWPM,
      focus_score: 92,
      xp_earned: xpEarned ? xpEarned + 150 : 150,
      reading_test_stage: "results",
    });
  };

  return {
    calculateResults,
    handleAnswerQuestion,
    handleNextQuestion,
    handleFinishReading,
    handleStartReading,
    currentQuestion,
    answers,
  };
}
