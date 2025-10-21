import { CheckCircle2, Timer } from "lucide-react";
import { motion } from "motion/react";
import { Button, Card } from "@/components";
import { useOnboardingReadingTest } from "./useOnboardingReadingTest";

export function ReadingTestIntro() {
  const { handleStartReading } = useOnboardingReadingTest();
  return (
    <div className="min-h-[80svh] bg-background flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl p-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="w-16 h-16 mx-auto mb-6 bg-primary/10 rounded-full flex items-center justify-center">
            <Timer className="w-8 h-8 text-primary" />
          </div>
          <h2 className="mb-4">Baseline Reading Test</h2>
          <p className="text-muted-foreground mb-8 max-w-lg mx-auto">
            This quick test will measure your current reading speed and
            comprehension. Read the passage at your normal pace, then answer a
            few questions.
          </p>
          <div className="space-y-3 text-sm text-muted-foreground mb-8">
            <div className="flex items-center gap-2 justify-center">
              <CheckCircle2 className="w-4 h-4 text-primary" />
              <span>Takes about 2-3 minutes</span>
            </div>
            <div className="flex items-center gap-2 justify-center">
              <CheckCircle2 className="w-4 h-4 text-primary" />
              <span>Read at your comfortable pace</span>
            </div>
            <div className="flex items-center gap-2 justify-center">
              <CheckCircle2 className="w-4 h-4 text-primary" />
              <span>No need to rush</span>
            </div>
          </div>
          <Button size="lg" onClick={handleStartReading}>
            Start Reading Test
          </Button>
        </motion.div>
      </Card>
    </div>
  );
}
