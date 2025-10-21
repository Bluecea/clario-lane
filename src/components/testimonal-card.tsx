import { motion } from "motion/react";
import { Star } from "lucide-react";

export function TestimonialCard({
  name,
  department: role,
  text,
  rating,
  improvement,
}: {
  name: string;
  department: string;
  text: string;
  rating: number;
  improvement: string;
}) {
  return (
    <motion.div
      whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
      className="p-6 rounded-xl border bg-card hover:shadow-lg transition-all"
    >
      <div className="flex gap-1 mb-3">
        {Array.from({ length: rating }).map((_, i) => (
          // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
          <Star key={i} className="w-4 h-4 fill-primary text-primary" />
        ))}
      </div>
      <p className="mb-4 text-sm leading-relaxed">{text}</p>
      <div className="flex items-center justify-between">
        <div>
          <div className="text-sm">{name}</div>
          <div className="text-xs text-muted-foreground">{role}</div>
        </div>
        <div className="text-xs px-3 py-1 rounded-full bg-secondary/20 text-secondary-foreground">
          {improvement}
        </div>
      </div>
    </motion.div>
  );
}
