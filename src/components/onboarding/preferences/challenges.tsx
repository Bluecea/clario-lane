import { BookOpen, FileText, Focus, Sparkles } from "lucide-react";
import { OptionCard, StepContainer } from "@/components";
import type { PreferencesType } from "./type";

type Props = {
  challenges: string[];
  toggleSelection: (category: PreferencesType, value: string) => void;
};

export function Challenges({ challenges, toggleSelection }: Props) {
  return (
    <StepContainer key="step-2">
      <h3 className="mb-6 text-center">What challenges do you face?</h3>
      <div className="grid sm:grid-cols-2 gap-4">
        <OptionCard
          icon={<Sparkles className="w-6 h-6" />}
          title="Speed"
          description="I read too slowly"
          selected={challenges.includes("speed")}
          onClick={() => toggleSelection("challenges", "speed")}
        />
        <OptionCard
          icon={<BookOpen className="w-6 h-6" />}
          title="Comprehension"
          description="I struggle to remember what I read"
          selected={challenges.includes("comprehension")}
          onClick={() => toggleSelection("challenges", "comprehension")}
        />
        <OptionCard
          icon={<Focus className="w-6 h-6" />}
          title="Focus"
          description="I get distracted easily"
          selected={challenges.includes("focus")}
          onClick={() => toggleSelection("challenges", "focus")}
        />
        <OptionCard
          icon={<FileText className="w-6 h-6" />}
          title="Retention"
          description="I forget details quickly"
          selected={challenges.includes("retention")}
          onClick={() => toggleSelection("challenges", "retention")}
        />
      </div>
    </StepContainer>
  );
}
