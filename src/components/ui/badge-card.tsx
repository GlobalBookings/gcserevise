"use client";

import { motion } from "framer-motion";
import { Badge as BadgeType, RARITY_COLORS } from "@/lib/gamification";
import { Lock } from "lucide-react";

interface BadgeCardProps {
  badge: BadgeType;
  earned: boolean;
  earnedAt?: string;
}

export function BadgeCard({ badge, earned, earnedAt }: BadgeCardProps) {
  const colors = RARITY_COLORS[badge.rarity];

  return (
    <motion.div
      whileHover={earned ? { scale: 1.05, y: -2 } : {}}
      className={`relative flex flex-col items-center rounded-xl border-2 p-4 text-center transition-all ${
        earned
          ? `${colors.bg} ${colors.border}`
          : "border-zinc-200 bg-zinc-50 opacity-50 grayscale dark:border-zinc-800 dark:bg-zinc-900"
      }`}
    >
      {!earned && (
        <div className="absolute right-2 top-2">
          <Lock className="h-3 w-3 text-zinc-400" />
        </div>
      )}
      <span className="text-3xl">{badge.icon}</span>
      <p className="mt-2 text-sm font-semibold">{badge.name}</p>
      <p className="mt-0.5 text-[11px] text-zinc-500 dark:text-zinc-400">
        {badge.description}
      </p>
      {earned && earnedAt && (
        <p className="mt-1 text-[10px] text-zinc-400">
          {new Date(earnedAt).toLocaleDateString("en-GB", { day: "numeric", month: "short" })}
        </p>
      )}
      {!earned && (
        <p className={`mt-1 text-[10px] font-medium capitalize ${colors.text}`}>
          {badge.rarity}
        </p>
      )}
    </motion.div>
  );
}
