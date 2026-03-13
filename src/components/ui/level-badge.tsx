"use client";

import { motion } from "framer-motion";
import { getLevelFromXP } from "@/lib/gamification";

interface LevelBadgeProps {
  xp: number;
  size?: "sm" | "md" | "lg";
  showProgress?: boolean;
}

export function LevelBadge({ xp, size = "md", showProgress = false }: LevelBadgeProps) {
  const level = getLevelFromXP(xp);

  const sizes = {
    sm: { badge: "h-8 w-8 text-xs", ring: "h-10 w-10" },
    md: { badge: "h-12 w-12 text-sm", ring: "h-14 w-14" },
    lg: { badge: "h-16 w-16 text-lg", ring: "h-20 w-20" },
  };

  return (
    <div className="flex flex-col items-center gap-1">
      <div className="relative">
        {/* Progress ring */}
        <svg className={`${sizes[size].ring} -rotate-90`} viewBox="0 0 36 36">
          <circle
            className="text-zinc-200 dark:text-zinc-700"
            strokeWidth="3"
            stroke="currentColor"
            fill="transparent"
            r="15.5"
            cx="18"
            cy="18"
          />
          <motion.circle
            className="drop-shadow-sm"
            strokeWidth="3"
            stroke={level.color}
            strokeLinecap="round"
            fill="transparent"
            r="15.5"
            cx="18"
            cy="18"
            initial={{ strokeDasharray: "0 100" }}
            animate={{ strokeDasharray: `${level.progressToNext} 100` }}
            transition={{ duration: 1, ease: "easeOut" }}
          />
        </svg>
        {/* Level number */}
        <div
          className={`absolute inset-0 flex items-center justify-center`}
        >
          <div
            className={`${sizes[size].badge} flex items-center justify-center rounded-full font-bold text-white shadow-md`}
            style={{ backgroundColor: level.color }}
          >
            {level.level}
          </div>
        </div>
      </div>
      {showProgress && (
        <div className="text-center">
          <p className="text-xs font-semibold" style={{ color: level.color }}>
            {level.title}
          </p>
          <p className="text-[10px] text-zinc-400">
            {level.isMaxLevel ? "MAX LEVEL" : `${level.xpForNext} XP to next`}
          </p>
        </div>
      )}
    </div>
  );
}
