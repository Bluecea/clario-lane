import { Award, Sparkles, Target, TrendingUp, Zap } from "lucide-react";
import { motion } from "motion/react";
import { Button, Card, ConfettiComponent, MetricCard } from "@/components";
import { useOnboardingStore } from "@/store";

export function Results() {
  const onboarding = useOnboardingStore();
  const onContinue = () => {
    onboarding.updateProfile({ currentStep: onboarding.currentStep + 1 });
  };
  return (
    <div className="min-h-[90svh] bg-gradient-to-b from-background to-secondary/20 flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl p-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center"
        >
          {/* Success Icon */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="w-20 h-20 mx-auto mb-6 bg-primary/10 rounded-full flex items-center justify-center"
          >
            <Sparkles className="w-10 h-10 text-primary" />
          </motion.div>

          <h2 className="mb-2">Session Complete! 🎉</h2>
          <p className="text-muted-foreground mb-8">
            Great work! You're making excellent progress.
          </p>

          {/* XP Earned */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mb-8 p-6 bg-primary/5 rounded-lg border border-primary/20"
          >
            <div className="flex items-center justify-center gap-2 mb-2">
              <Award className="w-5 h-5 text-primary" />
              <span className="text-sm text-muted-foreground">XP Earned</span>
            </div>
            <div className="text-4xl text-primary">+{onboarding.xpEarned}</div>
          </motion.div>

          {/* Performance Metrics */}
          <div className="grid sm:grid-cols-3 gap-4 mb-8">
            <MetricCard
              icon={<TrendingUp className="w-5 h-5" />}
              label="Average Speed"
              value={`${onboarding.baseLineWPM} WPM`}
              color="text-blue-600"
            />
            <MetricCard
              icon={<Target className="w-5 h-5" />}
              label="Comprehension"
              value={`${onboarding.baselineComprehension}%`}
              color="text-green-600"
            />
            <MetricCard
              icon={<Zap className="w-5 h-5" />}
              label="Focus Score"
              value={`${onboarding.focusScore}%`}
              color="text-purple-600"
            />
          </div>

          {/* Insights */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="text-left mb-8 p-6 bg-secondary/50 rounded-lg"
          >
            <h4 className="mb-3 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-primary" />
              AI Insights
            </h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex items-start gap-2">
                <span className="text-primary mt-0.5">•</span>
                <span>
                  Your reading speed improved by 12% during this session
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-0.5">•</span>
                <span>Comprehension remained strong - great balance!</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-0.5">•</span>
                <span>
                  Try focusing on reducing subvocalization in your next session
                </span>
              </li>
            </ul>
          </motion.div>

          {/* Streak Reminder */}
          <div className="mb-8 text-sm text-muted-foreground">
            <p>🔥 Come back tomorrow to keep your streak alive!</p>
          </div>

          <Button size="lg" onClick={onContinue} className="w-full">
            Continue to quick drill
          </Button>
        </motion.div>
      </Card>

      <ConfettiComponent
        particleCount={
          onboarding.currentComprehensionScore ||
          onboarding.currentComprehension ||
          1
        }
      />
    </div>
  );
}
