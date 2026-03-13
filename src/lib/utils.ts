import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(date: Date | string): string {
  return new Date(date).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export function daysUntil(date: Date | string): number {
  const now = new Date();
  const target = new Date(date);
  const diff = target.getTime() - now.getTime();
  return Math.ceil(diff / (1000 * 60 * 60 * 24));
}

export function confidenceLabel(level: number): string {
  switch (level) {
    case 1:
      return "Needs Work";
    case 2:
      return "Getting There";
    case 3:
      return "Mastered";
    default:
      return "Not Started";
  }
}

export function confidenceColor(level: number): string {
  switch (level) {
    case 1:
      return "text-red-500";
    case 2:
      return "text-amber-500";
    case 3:
      return "text-emerald-500";
    default:
      return "text-zinc-400";
  }
}

export function confidenceBg(level: number): string {
  switch (level) {
    case 1:
      return "bg-red-500/10 border-red-500/20";
    case 2:
      return "bg-amber-500/10 border-amber-500/20";
    case 3:
      return "bg-emerald-500/10 border-emerald-500/20";
    default:
      return "bg-zinc-500/10 border-zinc-500/20";
  }
}
