import { motion } from "motion/react";

export function MetricCard({
  icon,
  label,
  value,
  color,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  color: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4 }}
      className="p-4 rounded-lg border bg-card"
    >
      <div className={`flex justify-center mb-2 ${color}`}>{icon}</div>
      <div className="text-xs text-muted-foreground mb-1">{label}</div>
      <div className="text-xl">{value}</div>
    </motion.div>
  );
}
