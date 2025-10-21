import { useState } from "react";
import { useOnboardingStore } from "@/store";
import { PASSAGE } from "./passage";

export function useOnboardingReadingTest() {
  const [answers, setAnswers] = useState<number[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const { updateProfile, startTime, readingTime, xpEarned } =
    useOnboardingStore();

  const handleStartReading = () => {
    updateProfile({ readingTestStage: "reading", startTime: Date.now() });
  };

  const handleFinishReading = () => {
    const endTime = Date.now();
    updateProfile({
      readingTestStage: "questions",
      readingTime: (endTime - startTime) / 1000,
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
    const comprehensionScore = Math.round(
      (correctAnswers / PASSAGE.questions.length) * 100,
    );
    const averageWPM = Math.round((PASSAGE.wordCount / readingTime) * 60);

    updateProfile({
      comprehensionScore,
      averageWPM,
      focusScore: 92,
      xpEarned: xpEarned ? xpEarned + 150 : 150,
      readingTestStage: "results",
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
