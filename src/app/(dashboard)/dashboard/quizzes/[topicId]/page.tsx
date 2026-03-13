"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { XPToast } from "@/components/ui/xp-toast";
import { useConfetti } from "@/components/ui/confetti";
import { CheckCircle2, XCircle, ArrowRight, RotateCcw, Zap, Trophy, Star } from "lucide-react";
import { cn } from "@/lib/utils";
import { XP_REWARDS } from "@/lib/gamification";

const quizData = {
  subject: "Biology",
  topic: "Cell Biology",
  questions: [
    {
      id: "q1",
      question: "What is the function of mitochondria in a cell?",
      options: ["Protein synthesis", "Energy release (respiration)", "Photosynthesis", "Cell division"],
      correct: 1,
      explanation: "Mitochondria are the site of aerobic respiration, where glucose is broken down to release energy (ATP).",
    },
    {
      id: "q2",
      question: "Which structure controls what enters and leaves the cell?",
      options: ["Cell wall", "Nucleus", "Cell membrane", "Cytoplasm"],
      correct: 2,
      explanation: "The cell membrane is selectively permeable, controlling the movement of substances in and out of the cell.",
    },
    {
      id: "q3",
      question: "What is the name of the process by which cells divide for growth and repair?",
      options: ["Meiosis", "Mitosis", "Osmosis", "Diffusion"],
      correct: 1,
      explanation: "Mitosis produces two genetically identical daughter cells and is used for growth and repair.",
    },
    {
      id: "q4",
      question: "Where is DNA found in a eukaryotic cell?",
      options: ["Cytoplasm", "Cell membrane", "Nucleus", "Ribosome"],
      correct: 2,
      explanation: "In eukaryotic cells, DNA is stored in the nucleus, organised into chromosomes.",
    },
    {
      id: "q5",
      question: "Which organelle is responsible for protein synthesis?",
      options: ["Mitochondria", "Ribosome", "Vacuole", "Chloroplast"],
      correct: 1,
      explanation: "Ribosomes are the site of protein synthesis, where amino acids are assembled into proteins.",
    },
  ],
};

export default function QuizPage() {
  const [currentQ, setCurrentQ] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);
  const [showXP, setShowXP] = useState(false);
  const [xpAmount, setXpAmount] = useState(0);
  const { fireConfetti, fireStars, fireSides } = useConfetti();

  const question = quizData.questions[currentQ];
  const total = quizData.questions.length;

  function handleSelect(index: number) {
    if (showResult) return;
    setSelected(index);
  }

  const handleCheck = useCallback(() => {
    if (selected === null) return;
    setShowResult(true);
    const correct = selected === question.correct;
    if (correct) {
      setScore((s) => s + 1);
      fireConfetti();
    }
  }, [selected, question.correct, fireConfetti]);

  function handleNext() {
    if (currentQ + 1 >= total) {
      setFinished(true);
      const finalScore = score + (selected === question.correct ? 1 : 0);
      const isPerfect = finalScore === total;
      const reward = isPerfect ? XP_REWARDS.QUIZ_PERFECT_SCORE : XP_REWARDS.COMPLETE_QUIZ;
      setXpAmount(reward);
      setShowXP(true);
      if (isPerfect) {
        setTimeout(() => fireStars(), 300);
        setTimeout(() => fireSides(), 600);
      } else {
        fireSides();
      }
      return;
    }
    setCurrentQ((q) => q + 1);
    setSelected(null);
    setShowResult(false);
  }

  function handleRestart() {
    setCurrentQ(0);
    setSelected(null);
    setShowResult(false);
    setScore(0);
    setFinished(false);
    setShowXP(false);
  }

  if (finished) {
    const finalScore = score;
    const percentage = Math.round((finalScore / total) * 100);
    const isPerfect = percentage === 100;

    return (
      <div className="mx-auto max-w-2xl">
        <XPToast
          amount={xpAmount}
          message={isPerfect ? "Perfect score bonus!" : "Quiz completed!"}
          show={showXP}
          onClose={() => setShowXP(false)}
        />
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}>
          <Card className="overflow-hidden">
            <div className={`p-8 text-center ${
              isPerfect
                ? "bg-gradient-to-br from-amber-50 to-yellow-50 dark:from-amber-950/30 dark:to-yellow-950/30"
                : percentage >= 60
                ? "bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-950/30 dark:to-teal-950/30"
                : "bg-gradient-to-br from-zinc-50 to-zinc-100 dark:from-zinc-900 dark:to-zinc-800"
            }`}>
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
              >
                {isPerfect ? (
                  <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-amber-100 dark:bg-amber-900/50">
                    <Star className="h-10 w-10 text-amber-500" />
                  </div>
                ) : percentage >= 60 ? (
                  <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-emerald-100 dark:bg-emerald-900/50">
                    <Trophy className="h-10 w-10 text-emerald-500" />
                  </div>
                ) : (
                  <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-zinc-200 dark:bg-zinc-700">
                    <span className="text-3xl font-bold">{finalScore}/{total}</span>
                  </div>
                )}
              </motion.div>

              <motion.h2
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="text-2xl font-bold"
              >
                {isPerfect ? "PERFECT SCORE!" : percentage >= 60 ? "Great work!" : "Keep practising!"}
              </motion.h2>

              <p className="mt-2 text-zinc-500 dark:text-zinc-400">
                {quizData.subject} - {quizData.topic}
              </p>

              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", delay: 0.5 }}
                className="mt-4"
              >
                <span className="text-5xl font-bold" style={{
                  color: isPerfect ? "#f59e0b" : percentage >= 60 ? "#10b981" : "#71717a"
                }}>
                  {percentage}%
                </span>
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7 }}
                className="mt-4 inline-flex items-center gap-2 rounded-full bg-amber-100 px-4 py-2 dark:bg-amber-900/50"
              >
                <Zap className="h-4 w-4 text-amber-600" />
                <span className="text-sm font-bold text-amber-700 dark:text-amber-300">
                  +{xpAmount} XP earned
                </span>
              </motion.div>

              <div className="mt-6 flex justify-center gap-3">
                <Button variant="outline" onClick={handleRestart}>
                  <RotateCcw className="h-4 w-4" /> Try again
                </Button>
                <Button onClick={() => window.history.back()}>
                  Back to dashboard
                </Button>
              </div>
            </div>
          </Card>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-2xl">
      <div className="mb-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold">{quizData.topic} Quiz</h1>
            <p className="text-sm text-zinc-500 dark:text-zinc-400">{quizData.subject}</p>
          </div>
          <Badge variant="secondary">
            {currentQ + 1} of {total}
          </Badge>
        </div>
        <Progress value={((currentQ + (showResult ? 1 : 0)) / total) * 100} className="mt-4" />
      </div>

      <motion.div
        key={currentQ}
        initial={{ opacity: 0, x: 30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3 }}
      >
        <Card>
          <CardHeader>
            <CardTitle className="text-base leading-relaxed">
              {question.question}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {question.options.map((option, i) => {
                let style = "border-zinc-200 hover:bg-zinc-50 hover:border-indigo-200 dark:border-zinc-800 dark:hover:bg-zinc-900";
                if (showResult) {
                  if (i === question.correct) {
                    style = "border-emerald-500 bg-emerald-50 dark:border-emerald-600 dark:bg-emerald-950/30";
                  } else if (i === selected && i !== question.correct) {
                    style = "border-red-500 bg-red-50 dark:border-red-600 dark:bg-red-950/30";
                  } else {
                    style = "border-zinc-200 opacity-50 dark:border-zinc-800";
                  }
                } else if (i === selected) {
                  style = "border-indigo-500 bg-indigo-50 ring-2 ring-indigo-500/20 dark:border-indigo-600 dark:bg-indigo-950/30";
                }

                return (
                  <motion.button
                    key={i}
                    whileHover={!showResult ? { scale: 1.01 } : {}}
                    whileTap={!showResult ? { scale: 0.99 } : {}}
                    onClick={() => handleSelect(i)}
                    disabled={showResult}
                    className={cn(
                      "flex w-full items-center gap-3 rounded-lg border-2 p-4 text-left text-sm transition-all",
                      style
                    )}
                  >
                    <span className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full border-2 text-xs font-bold">
                      {String.fromCharCode(65 + i)}
                    </span>
                    <span className="flex-1">{option}</span>
                    {showResult && i === question.correct && (
                      <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring" }}>
                        <CheckCircle2 className="h-5 w-5 text-emerald-500" />
                      </motion.div>
                    )}
                    {showResult && i === selected && i !== question.correct && (
                      <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}>
                        <XCircle className="h-5 w-5 text-red-500" />
                      </motion.div>
                    )}
                  </motion.button>
                );
              })}
            </div>

            <AnimatePresence>
              {showResult && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mt-4 overflow-hidden rounded-lg bg-blue-50 p-4 text-sm text-blue-800 dark:bg-blue-950/30 dark:text-blue-300"
                >
                  <p className="font-medium">Explanation:</p>
                  <p className="mt-1">{question.explanation}</p>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="mt-6 flex justify-end">
              {!showResult ? (
                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <Button onClick={handleCheck} disabled={selected === null} size="lg">
                    Check answer
                  </Button>
                </motion.div>
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  whileHover={{ scale: 1.02 }}
                >
                  <Button onClick={handleNext} size="lg">
                    {currentQ + 1 >= total ? "See results" : "Next question"}
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </motion.div>
              )}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
