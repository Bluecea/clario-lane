import { useEffect, useRef, useState } from "react";

import { PracticeStep } from "@/lib";
import { useQuery } from "@tanstack/react-query";
import { fetchPassage } from "@/integration";
import { toast } from "sonner";
import { usePracticeStore } from "@/store";

export type RSVPReaderProps = {
  onPause?: () => void;
};

export const useRSVPReader = ({ onPause }: RSVPReaderProps) => {
  const [words, setWords] = useState<string[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [startTime, setStartTime] = useState<number | null>(null);

  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const { setWpm, wpm, nextWpm, setStep, updateStore, passage } =
    usePracticeStore();

  const { isLoading } = useQuery(fetchPassage);

  useEffect(() => {
    // Split text into words
    const wordArray = passage?.text
      ?.split(/\s+/)
      .filter((word) => word.length > 0);
    setWords(wordArray || []);
  }, [passage]);

  useEffect(() => {
    if (isPlaying && startTime === null) {
      setStartTime(Date.now());
    }
  }, [isPlaying, startTime]);

  useEffect(() => {
    if (isPlaying) {
      const msPerWord = (60 / wpm) * 1000;

      intervalRef.current = setInterval(() => {
        setCurrentIndex((prev) => {
          const next = prev + 1;
          if (next >= words.length) {
            // Stop playing when complete
            setIsPlaying(false);
            return words.length; // Set to end
          }
          return next;
        });
      }, msPerWord);

      timerRef.current = setInterval(() => {
        setElapsedTime((prev) => prev + 0.1);
      }, 100);

      return () => {
        if (intervalRef.current) clearInterval(intervalRef.current);
        if (timerRef.current) clearInterval(timerRef.current);
      };
    } else {
      if (intervalRef.current) clearInterval(intervalRef.current);
      if (timerRef.current) clearInterval(timerRef.current);
    }
  }, [isPlaying, wpm, words.length]);

  const handlePlayPause = () => {
    setIsPlaying((prev) => {
      const newState = !prev;
      if (!newState && onPause) {
        onPause();
      }
      return newState;
    });
  };

  const handleComplete = () => {
    setIsPlaying(false);
    if (intervalRef.current) clearInterval(intervalRef.current);
    if (timerRef.current) clearInterval(timerRef.current);

    const duration = startTime ? (Date.now() - startTime) / 1000 : elapsedTime;
    // Use the actual word count if completed, otherwise use current index
    const wordsRead = currentIndex >= words.length
      ? words.length
      : Math.max(currentIndex, 1);
    const actualWpm = duration > 0
      ? Math.round((wordsRead / duration) * 60)
      : wpm;

    // Ensure we have valid data
    if (!actualWpm || actualWpm <= 0) {
      toast.error(`Invalid WPM calculated, using set WPM: ${wpm}`);
    } else {
      updateStore({
        wpm: actualWpm,
        duration,
        wordsRead,
        elapsedTime,
        startTime: startTime || 0,
      });
    }

    setStep(PracticeStep.enum.Quiz);
  };

  const handleReset = () => {
    setIsPlaying(false);
    setCurrentIndex(0);
    setElapsedTime(0);
    setStartTime(null);
    if (intervalRef.current) clearInterval(intervalRef.current);
    if (timerRef.current) clearInterval(timerRef.current);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const progress = words.length > 0 ? (currentIndex / words.length) * 100 : 0;

  return {
    progress,
    handleComplete,
    handlePlayPause,
    handleReset,
    words,
    currentIndex,
    isPlaying,
    wpm: nextWpm || wpm,
    loading: isLoading,
    setWpm,
    formatTime,
    elapsedTime,
  };
};
