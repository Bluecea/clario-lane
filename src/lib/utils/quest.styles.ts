import { cn } from "@/lib";

export function getQuestItemStyles(
  isCompleted: boolean,
  isClaimed: boolean,
): string {
  if (isCompleted && isClaimed) {
    return cn(
      "relative p-4 border rounded-xl transition-all duration-300 ",
      "bg-linear-to-br from-green-50 to-emerald-50 border-green-300",
      "dark:from-green-950/20 dark:to-emerald-950/20 dark:border-green-800",
    );
  }

  if (isCompleted) {
    return cn(
      "relative p-4 border rounded-xl transition-all duration-300 ",
      "bg-linear-to-br from-yellow-50 to-amber-50 border-yellow-300",
      "dark:from-yellow-950/20 dark:to-amber-950/20 dark:border-yellow-800",
      "ring-2 ring-yellow-400 ring-offset-2",
    );
  }

  return cn(
    "relative p-4 border rounded-xl transition-all duration-300 ",
    "bg-linear-to-br from-white to-gray-50 border-gray-200",
    "dark:from-zinc-900 dark:to-zinc-900/50 dark:border-zinc-800",
    "hover:border-primary/50",
  );
}
