"use client";

import { useCallback } from "react";
import confetti from "canvas-confetti";

export function useConfetti() {
  const fireConfetti = useCallback(() => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors: ["#6366f1", "#8b5cf6", "#a855f7", "#10b981", "#f59e0b", "#ef4444"],
    });
  }, []);

  const fireStars = useCallback(() => {
    const defaults = { spread: 360, ticks: 50, gravity: 0, decay: 0.94, startVelocity: 30, colors: ["#FFE400", "#FFBD00", "#E89400", "#FFCA6C", "#FDFFB8"] };
    confetti({ ...defaults, particleCount: 40, scalar: 1.2, shapes: ["star"] });
    confetti({ ...defaults, particleCount: 10, scalar: 0.75, shapes: ["circle"] });
  }, []);

  const fireSides = useCallback(() => {
    confetti({ particleCount: 50, angle: 60, spread: 55, origin: { x: 0 }, colors: ["#6366f1", "#8b5cf6", "#10b981"] });
    confetti({ particleCount: 50, angle: 120, spread: 55, origin: { x: 1 }, colors: ["#6366f1", "#8b5cf6", "#10b981"] });
  }, []);

  return { fireConfetti, fireStars, fireSides };
}
