"use client";

import { motion } from "framer-motion";
import { Flame } from "lucide-react";
import { getStreakMessage } from "@/lib/gamification";

interface StreakDisplayProps {
  streak: number;
  compact?: boolean;
}

export function StreakDisplay({ streak, compact = false }: StreakDisplayProps) {
  if (compact) {
    return (
      <div className="flex items-center gap-1.5">
        <motion.div
          animate={streak > 0 ? { scale: [1, 1.2, 1] } : {}}
          transition={{ repeat: Infinity, duration: 2 }}
        >
          <Flame
            className={`h-4 w-4 ${
              streak > 0 ? "text-orange-500" : "text-zinc-300 dark:text-zinc-600"
            }`}
          />
        </motion.div>
        <span className={`text-sm font-bold ${streak > 0 ? "text-orange-500" : "text-zinc-400"}`}>
          {streak}
        </span>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center rounded-xl border border-orange-200 bg-gradient-to-b from-orange-50 to-amber-50 p-4 dark:border-orange-900 dark:from-orange-950/30 dark:to-amber-950/30">
      <motion.div
        animate={streak > 0 ? { scale: [1, 1.15, 1], rotate: [0, -5, 5, 0] } : {}}
        transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
      >
        <div className="relative">
          <Flame
            className={`h-12 w-12 ${
              streak >= 7
                ? "text-orange-500"
                : streak > 0
                ? "text-orange-400"
                : "text-zinc-300 dark:text-zinc-600"
            }`}
          />
          {streak >= 7 && (
            <motion.div
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
              className="absolute -inset-1 rounded-full bg-orange-400/20 blur-md"
            />
          )}
        </div>
      </motion.div>
      <p className="mt-2 text-3xl font-bold text-orange-600 dark:text-orange-400">
        {streak}
      </p>
      <p className="text-xs font-medium text-orange-500">
        {streak === 1 ? "day" : "days"} streak
      </p>
      <p className="mt-1 text-[11px] text-zinc-500 dark:text-zinc-400">
        {getStreakMessage(streak)}
      </p>
    </div>
  );
}
