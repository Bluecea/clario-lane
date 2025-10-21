import { BookOpen, Briefcase, Focus, GraduationCap } from "lucide-react";
import { OptionCard } from "@/components/ui/option-card";
import { StepContainer } from "@/components/ui/step-container";
import type { PreferencesType } from "./type";

type Props = {
	goals: string[];
	toggleSelection: (category: PreferencesType, value: string) => void;
};

export function Goals({ goals, toggleSelection }: Props) {
	return (
		<StepContainer key="step-0">
			<h3 className="mb-6 text-center">What are your reading goals?</h3>
			<div className="grid sm:grid-cols-2 gap-4">
				<OptionCard
					icon={<GraduationCap className="w-6 h-6" />}
					title="Study"
					description="Academic papers and textbooks"
					selected={goals.includes("study")}
					onClick={() => toggleSelection("goals", "study")}
				/>
				<OptionCard
					icon={<Briefcase className="w-6 h-6" />}
					title="Work"
					description="Reports and professional reading"
					selected={goals.includes("work")}
					onClick={() => toggleSelection("goals", "work")}
				/>
				<OptionCard
					icon={<Focus className="w-6 h-6" />}
					title="Focus"
					description="Improve concentration"
					selected={goals.includes("focus")}
					onClick={() => toggleSelection("goals", "focus")}
				/>
				<OptionCard
					icon={<BookOpen className="w-6 h-6" />}
					title="Enjoyment"
					description="Read more books for pleasure"
					selected={goals.includes("enjoyment")}
					onClick={() => toggleSelection("goals", "enjoyment")}
				/>
			</div>
		</StepContainer>
	);
}
