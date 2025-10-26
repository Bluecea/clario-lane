import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import {
  Card,
  CardContent,
  Button,
  Badge,
  ReadingExercise,
} from "@/components";
import { BookOpen, Brain, Eye, Zap, Clock, Target, Play } from "lucide-react";
import { motion } from "motion/react";

export const Route = createFileRoute("/dashboard/_dashboardLayout/practice")({
  component: RouteComponent,
});

export function RouteComponent() {
  // const userProfile = useOnboardingStore();
  const [activeExercise, setActiveExercise] = useState<string | null>(null);

  const exercises = [
    {
      id: "speed-reading",
      title: "Speed Reading Practice",
      description:
        "Read passages at increasing speeds to build reading velocity",
      icon: Zap,
      difficulty: "Medium",
      duration: "10 min",
      xp: 50,
      color: "text-yellow-600",
      bgColor: "bg-yellow-50",
      borderColor: "border-yellow-200",
    },
    {
      id: "comprehension",
      title: "Comprehension Training",
      description: "Focus on understanding and retaining what you read",
      icon: Brain,
      difficulty: "Medium",
      duration: "15 min",
      xp: 60,
      color: "text-purple-600",
      bgColor: "bg-purple-50",
      borderColor: "border-purple-200",
    },
    {
      id: "peripheral-vision",
      title: "Peripheral Vision Expansion",
      description: "Train your eyes to see more words at once",
      icon: Eye,
      difficulty: "Easy",
      duration: "5 min",
      xp: 30,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
      borderColor: "border-blue-200",
    },
    {
      id: "word-chunking",
      title: "Word Chunking Drill",
      description: "Practice reading groups of words together",
      icon: Target,
      difficulty: "Easy",
      duration: "8 min",
      xp: 40,
      color: "text-green-600",
      bgColor: "bg-green-50",
      borderColor: "border-green-200",
    },
  ];

  const recommendedContent = [
    {
      id: 1,
      title: "The Future of Artificial Intelligence",
      category: "Technology",
      difficulty: "Medium",
      wordCount: 450,
      estimatedTime: "2 min",
    },
    {
      id: 2,
      title: "Mindfulness and Productivity",
      category: "Self-Improvement",
      difficulty: "Easy",
      wordCount: 320,
      estimatedTime: "1.5 min",
    },
    {
      id: 3,
      title: "Climate Change: Recent Findings",
      category: "Science",
      difficulty: "Hard",
      wordCount: 580,
      estimatedTime: "3 min",
    },
  ];

  if (activeExercise) {
    return (
      <ReadingExercise
        exerciseId={activeExercise}
        onComplete={() => setActiveExercise(null)}
        onExit={() => setActiveExercise(null)}
      />
    );
  }

  return (
    <motion.div
      initial={{ y: 40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: -40, opacity: 0 }}
      transition={{ type: "spring" }}
      className="space-y-6"
    >
      {/* Daily Challenge */}
      <Card className="bg-gradient-to-r from-indigo-600 to-blue-600 text-white border-0">
        <CardContent className="pt-6">
          <div className="flex items-start justify-between">
            <div>
              <div className="inline-block px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-sm mb-3">
                Daily Challenge
              </div>
              <h2 className="mb-2 text-white">3-Minute Focus Sprint</h2>
              <p className="text-indigo-100 mb-4">
                Complete a timed reading session maintaining 80%+ comprehension
              </p>
              <div className="flex items-center gap-4 text-sm">
                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  <span>3 min</span>
                </div>
                <div className="flex items-center gap-1">
                  <Zap className="w-4 h-4" />
                  <span>+100 XP</span>
                </div>
              </div>
            </div>
            <Button
              size="lg"
              className="bg-white text-indigo-600 hover:bg-indigo-50"
              onClick={() => setActiveExercise("speed-reading")}
            >
              <Play className="w-4 h-4 mr-2" />
              Start
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Exercise Library */}
      <div>
        <h2 className="mb-4 text-gray-900">Training Exercises</h2>
        <div className="grid md:grid-cols-2 gap-4">
          {exercises.map((exercise) => (
            <Card
              key={exercise.id}
              className={`${exercise.borderColor} border-2`}
            >
              <CardContent className="pt-6">
                <div className="flex items-start gap-4">
                  <div className={`${exercise.bgColor} p-3 rounded-lg`}>
                    <exercise.icon className={`w-6 h-6 ${exercise.color}`} />
                  </div>
                  <div className="flex-1">
                    <h3 className="mb-1">{exercise.title}</h3>
                    <p className="text-sm text-gray-600 mb-3">
                      {exercise.description}
                    </p>
                    <div className="flex items-center gap-3 mb-3">
                      <Badge variant="secondary" className="text-xs">
                        {exercise.difficulty}
                      </Badge>
                      <span className="text-sm text-gray-600">
                        {exercise.duration}
                      </span>
                      <span className="text-sm text-indigo-600">
                        +{exercise.xp} XP
                      </span>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full"
                      onClick={() => setActiveExercise(exercise.id)}
                    >
                      Start Exercise
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Recommended Reading */}
      <div>
        <h2 className="mb-4 text-gray-900">Recommended Reading</h2>
        <Card>
          <CardContent className="pt-6">
            <div className="space-y-3">
              {recommendedContent.map((content) => (
                <div
                  key={content.id}
                  className="flex items-center justify-between p-4 rounded-lg border-2 border-gray-200 hover:border-indigo-300 transition-colors"
                >
                  <div className="flex-1">
                    <h3 className="mb-1">{content.title}</h3>
                    <div className="flex items-center gap-3 text-sm text-gray-600">
                      <Badge variant="outline" className="text-xs">
                        {content.category}
                      </Badge>
                      <span>{content.wordCount} words</span>
                      <span>~{content.estimatedTime}</span>
                      <Badge
                        variant="secondary"
                        className={`text-xs ${
                          content.difficulty === "Easy"
                            ? "bg-green-100 text-green-700"
                            : content.difficulty === "Medium"
                              ? "bg-yellow-100 text-yellow-700"
                              : "bg-red-100 text-red-700"
                        }`}
                      >
                        {content.difficulty}
                      </Badge>
                    </div>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setActiveExercise("speed-reading")}
                  >
                    <BookOpen className="w-4 h-4 mr-2" />
                    Read
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </motion.div>
  );
}
