import { BookOpen, FileText, GraduationCap, Newspaper } from "lucide-react";
import { OptionCard } from "@/components/ui/option-card";
import { StepContainer } from "@/components/ui/step-container";
import type { PreferencesType } from "./type";

type Props = {
	contentTypes: string[];
	toggleSelection: (category: PreferencesType, value: string) => void;
};

export function ContentType({ contentTypes, toggleSelection }: Props) {
	return (
		<StepContainer key="step-1">
			<h3 className="mb-6 text-center">What do you like to read?</h3>
			<div className="grid sm:grid-cols-2 gap-4">
				<OptionCard
					icon={<BookOpen className="w-6 h-6" />}
					title="Fiction"
					description="Novels and stories"
					selected={contentTypes.includes("fiction")}
					onClick={() => toggleSelection("contentTypes", "fiction")}
				/>
				<OptionCard
					icon={<FileText className="w-6 h-6" />}
					title="Nonfiction"
					description="Educational and informative"
					selected={contentTypes.includes("nonfiction")}
					onClick={() => toggleSelection("contentTypes", "nonfiction")}
				/>
				<OptionCard
					icon={<GraduationCap className="w-6 h-6" />}
					title="Technical"
					description="Code, documentation, research"
					selected={contentTypes.includes("technical")}
					onClick={() => toggleSelection("contentTypes", "technical")}
				/>
				<OptionCard
					icon={<Newspaper className="w-6 h-6" />}
					title="News"
					description="Articles and journalism"
					selected={contentTypes.includes("news")}
					onClick={() => toggleSelection("contentTypes", "news")}
				/>
			</div>
		</StepContainer>
	);
}
