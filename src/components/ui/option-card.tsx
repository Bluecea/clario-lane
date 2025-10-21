interface OptionCardProps {
	icon: React.ReactNode;
	title: string;
	description: string;
	selected: boolean;
	onClick: () => void;
}

export function OptionCard({
	icon,
	title,
	description,
	selected,
	onClick,
}: OptionCardProps) {
	return (
		<button
			type="button"
			onClick={onClick}
			className={`p-4 rounded-lg border-2 text-left transition-all ${
				selected
					? "border-primary bg-primary/5"
					: "border-border hover:border-primary/50"
			}`}
		>
			<div className="flex items-start gap-3">
				<div
					className={`${selected ? "text-primary" : "text-muted-foreground"}`}
				>
					{icon}
				</div>
				<div>
					<div className="mb-1">{title}</div>
					<p className="text-sm text-muted-foreground">{description}</p>
				</div>
			</div>
		</button>
	);
}
