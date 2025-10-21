import { AnimatePresence, motion } from "motion/react";
import { Card, CardContent, Progress } from "@/components";
import { DRILL_WORDS } from "./words";

type Props = {
	currentIndex: number;
};

export function Drill({ currentIndex }: Props) {
	return (
		<motion.div
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			className="max-w-2xl mx-auto"
		>
			<div className="mb-8">
				<Progress
					value={(currentIndex / DRILL_WORDS.length) * 100}
					className="h-2"
				/>
				<p className="text-center text-sm  mt-2">
					Group {currentIndex + 1} of {DRILL_WORDS.length}
				</p>
			</div>

			<Card className="min-h-[300px] flex items-center justify-center bg-card">
				<CardContent>
					<AnimatePresence mode="wait">
						<motion.div
							key={currentIndex}
							initial={{ opacity: 0, scale: 0.8 }}
							animate={{ opacity: 1, scale: 1 }}
							exit={{ opacity: 0, scale: 1.2 }}
							transition={{ duration: 0.3 }}
							className="flex gap-8 justify-center"
						>
							{DRILL_WORDS[currentIndex]?.map((word) => (
								<span key={word} className="text-2xl lg:text-4xl ">
									{word}
								</span>
							))}
						</motion.div>
					</AnimatePresence>
				</CardContent>
			</Card>

			<p className="text-center  mt-6">
				Focus on the center word and see all three at once
			</p>
		</motion.div>
	);
}
