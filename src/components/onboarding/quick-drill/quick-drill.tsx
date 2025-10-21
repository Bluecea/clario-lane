import { Drill } from "./drill";
import { QuickDrillIntro } from "./intro";
import { Result } from "./result";
import { useQuickDrill } from "./use-quick-drill";

type Props = {
	handleNext: () => void;
};
export function QuickDrill({ handleNext }: Props) {
	const { stage, handleStartDrill, currentIndex, improvement } =
		useQuickDrill();
	return (
		<div className="min-h-[80svh]  p-6 py-12">
			{stage === "intro" && (
				<QuickDrillIntro handleStartDrill={handleStartDrill} />
			)}
			{stage === "drill" && <Drill currentIndex={currentIndex} />}
			{stage === "results" && (
				<Result improvement={improvement} onComplete={handleNext} />
			)}
		</div>
	);
}
