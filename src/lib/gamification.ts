// XP rewards for different actions
export const XP_REWARDS = {
  COMPLETE_REVISION: 25,
  COMPLETE_QUIZ: 40,
  QUIZ_PERFECT_SCORE: 75,
  COMPLETE_FLASHCARDS: 20,
  DAILY_STREAK_BONUS: 15,
  FIRST_SESSION_TODAY: 10,
  LEVEL_UP_BONUS: 50,
  CONFIDENCE_INCREASE: 30,
  MASTER_TOPIC: 100,
} as const;

// Level thresholds - XP needed for each level
export const LEVELS = [
  { level: 1, xpRequired: 0, title: "Beginner", color: "#94a3b8" },
  { level: 2, xpRequired: 100, title: "Starter", color: "#60a5fa" },
  { level: 3, xpRequired: 250, title: "Learner", color: "#34d399" },
  { level: 4, xpRequired: 500, title: "Explorer", color: "#a78bfa" },
  { level: 5, xpRequired: 800, title: "Achiever", color: "#fbbf24" },
  { level: 6, xpRequired: 1200, title: "Scholar", color: "#f97316" },
  { level: 7, xpRequired: 1800, title: "Expert", color: "#f43f5e" },
  { level: 8, xpRequired: 2500, title: "Master", color: "#ec4899" },
  { level: 9, xpRequired: 3500, title: "Champion", color: "#8b5cf6" },
  { level: 10, xpRequired: 5000, title: "Legend", color: "#eab308" },
];

export function getLevelFromXP(xp: number) {
  let current = LEVELS[0];
  for (const level of LEVELS) {
    if (xp >= level.xpRequired) {
      current = level;
    } else {
      break;
    }
  }
  const nextLevel = LEVELS.find((l) => l.level === current.level + 1);
  const xpForNext = nextLevel ? nextLevel.xpRequired - xp : 0;
  const progressToNext = nextLevel
    ? ((xp - current.xpRequired) / (nextLevel.xpRequired - current.xpRequired)) * 100
    : 100;

  return {
    ...current,
    xp,
    xpForNext: Math.max(0, xpForNext),
    progressToNext: Math.min(100, Math.max(0, progressToNext)),
    isMaxLevel: !nextLevel,
  };
}

// Badge definitions
export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  rarity: "common" | "rare" | "epic" | "legendary";
  condition: string;
}

export const BADGES: Badge[] = [
  { id: "first-login", name: "Welcome!", description: "Created your account", icon: "🎉", rarity: "common", condition: "Sign up" },
  { id: "first-quiz", name: "Quiz Taker", description: "Completed your first quiz", icon: "🧠", rarity: "common", condition: "Complete 1 quiz" },
  { id: "streak-3", name: "On a Roll", description: "3 day study streak", icon: "🔥", rarity: "common", condition: "3 day streak" },
  { id: "streak-7", name: "Week Warrior", description: "7 day study streak", icon: "⚡", rarity: "rare", condition: "7 day streak" },
  { id: "streak-30", name: "Unstoppable", description: "30 day study streak", icon: "💎", rarity: "legendary", condition: "30 day streak" },
  { id: "perfect-quiz", name: "Flawless", description: "100% on a quiz", icon: "⭐", rarity: "rare", condition: "Perfect quiz score" },
  { id: "5-topics", name: "Explorer", description: "Revised 5 different topics", icon: "🗺️", rarity: "common", condition: "Revise 5 topics" },
  { id: "25-topics", name: "Well Rounded", description: "Revised 25 different topics", icon: "🎯", rarity: "rare", condition: "Revise 25 topics" },
  { id: "first-mastery", name: "Master Mind", description: "Mastered your first topic", icon: "👑", rarity: "rare", condition: "Level 3 confidence on a topic" },
  { id: "10-mastery", name: "Knowledge King", description: "Mastered 10 topics", icon: "🏆", rarity: "epic", condition: "Master 10 topics" },
  { id: "level-5", name: "Halfway There", description: "Reached Level 5", icon: "🚀", rarity: "rare", condition: "Reach Level 5" },
  { id: "level-10", name: "GCSE Legend", description: "Reached Level 10", icon: "🌟", rarity: "legendary", condition: "Reach Level 10" },
  { id: "night-owl", name: "Night Owl", description: "Studied after 10pm", icon: "🦉", rarity: "common", condition: "Study session after 10pm" },
  { id: "early-bird", name: "Early Bird", description: "Studied before 7am", icon: "🐦", rarity: "common", condition: "Study session before 7am" },
  { id: "all-subjects", name: "Renaissance Student", description: "Revised every subject", icon: "🎨", rarity: "epic", condition: "Activity in all chosen subjects" },
];

export function getBadgesByRarity(rarity: Badge["rarity"]) {
  return BADGES.filter((b) => b.rarity === rarity);
}

export const RARITY_COLORS = {
  common: { bg: "bg-zinc-100 dark:bg-zinc-800", border: "border-zinc-300 dark:border-zinc-600", text: "text-zinc-600 dark:text-zinc-400" },
  rare: { bg: "bg-blue-50 dark:bg-blue-950/30", border: "border-blue-300 dark:border-blue-700", text: "text-blue-600 dark:text-blue-400" },
  epic: { bg: "bg-purple-50 dark:bg-purple-950/30", border: "border-purple-300 dark:border-purple-700", text: "text-purple-600 dark:text-purple-400" },
  legendary: { bg: "bg-amber-50 dark:bg-amber-950/30", border: "border-amber-300 dark:border-amber-600", text: "text-amber-600 dark:text-amber-400" },
};

// Streak messages
export function getStreakMessage(streak: number): string {
  if (streak === 0) return "Start your streak today!";
  if (streak === 1) return "Great start! Come back tomorrow.";
  if (streak < 3) return "Keep it going!";
  if (streak < 7) return "You're on fire!";
  if (streak < 14) return "Incredible dedication!";
  if (streak < 30) return "Unstoppable! Keep pushing!";
  return "Absolute legend! 🏆";
}
