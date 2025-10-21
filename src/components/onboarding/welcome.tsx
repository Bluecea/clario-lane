import { BookOpen, Sparkles } from "lucide-react";
import { motion } from "motion/react";
import { Button } from "@/components";

type Props = {
	username: string;
	onContinue: () => void;
};

export function OnboardingWelcome(props: Props) {
	return (
		<div className="flex justify-center items-center min-h-[90svh]">
			<motion.div
				initial={{ opacity: 0, y: 40 }}
				animate={{ opacity: 1, y: 0 }}
				className="mx-auto max-w-2xl w-full bg-card rounded-2xl shadow-2xl p-8 md:p-12 text-center space-y-8"
			>
				<div className="flex justify-center">
					<div className="size-20 bg-primary/10 rounded-full flex items-center justify-center">
						<BookOpen className="size-10 text-primary" />
					</div>
				</div>

				<div className="space-y-4">
					<h1 className="text-4xl">
						Welcome {props.username}!
						<Sparkles className="inline size-8 text-yellow-500" />
					</h1>
					<p className="text-xl text-muted-foreground">
						Let's discover your reading superpowers
					</p>
				</div>

				<div className="bg-muted/50 rounded-xl p-6 text-left space-y-3">
					<p className="text-muted-foreground">
						In the next few minutes, we'll:
					</p>
					<ul className="space-y-2">
						<li className="flex items-start gap-3">
							<span className="size-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center shrink-0 text-sm">
								1
							</span>
							<span>Measure your current reading speed</span>
						</li>
						<li className="flex items-start gap-3">
							<span className="size-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center shrink-0 text-sm">
								2
							</span>
							<span>Test your comprehension ability</span>
						</li>
						<li className="flex items-start gap-3">
							<span className="size-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center shrink-0 text-sm">
								3
							</span>
							<span>Set your personalized daily goals</span>
						</li>
					</ul>
				</div>

				<div className="space-y-3">
					<Button
						size="lg"
						onClick={props.onContinue}
						className="w-full text-lg py-6"
					>
						Let's Begin!
					</Button>
					<p className="text-sm text-muted-foreground">Takes about 3 minutes</p>
				</div>
			</motion.div>
		</div>
	);
}
