"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { CheckCircle2, XCircle, ArrowRight, RotateCcw } from "lucide-react";
import { cn } from "@/lib/utils";

// Placeholder quiz data
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
  const [answers, setAnswers] = useState<(number | null)[]>([]);
  const [finished, setFinished] = useState(false);

  const question = quizData.questions[currentQ];
  const total = quizData.questions.length;

  function handleSelect(index: number) {
    if (showResult) return;
    setSelected(index);
  }

  function handleCheck() {
    if (selected === null) return;
    setShowResult(true);
    const correct = selected === question.correct;
    if (correct) setScore((s) => s + 1);
    setAnswers((prev) => [...prev, selected]);
  }

  function handleNext() {
    if (currentQ + 1 >= total) {
      setFinished(true);
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
    setAnswers([]);
    setFinished(false);
  }

  if (finished) {
    const percentage = Math.round((score / total) * 100);
    return (
      <div className="mx-auto max-w-2xl">
        <Card>
          <CardContent className="p-8 text-center">
            <div className={`mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full ${
              percentage >= 80 ? "bg-emerald-100 dark:bg-emerald-950/50" : percentage >= 50 ? "bg-amber-100 dark:bg-amber-950/50" : "bg-red-100 dark:bg-red-950/50"
            }`}>
              <span className="text-2xl font-bold">{score}/{total}</span>
            </div>
            <h2 className="text-xl font-bold">Quiz Complete!</h2>
            <p className="mt-2 text-zinc-500 dark:text-zinc-400">
              {quizData.subject} - {quizData.topic}
            </p>
            <p className="mt-1 text-3xl font-bold text-indigo-600">{percentage}%</p>
            <p className="mt-2 text-sm text-zinc-500 dark:text-zinc-400">
              {percentage >= 80
                ? "Excellent work! You've mastered this topic."
                : percentage >= 50
                ? "Good effort! A bit more revision will help."
                : "Keep practising - you'll get there!"}
            </p>

            <div className="mt-6 flex justify-center gap-3">
              <Button variant="outline" onClick={handleRestart}>
                <RotateCcw className="h-4 w-4" /> Try again
              </Button>
              <Button onClick={() => window.history.back()}>
                Back to dashboard
              </Button>
            </div>
          </CardContent>
        </Card>
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

      <Card>
        <CardHeader>
          <CardTitle className="text-base leading-relaxed">
            {question.question}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {question.options.map((option, i) => {
              let style = "border-zinc-200 hover:bg-zinc-50 dark:border-zinc-800 dark:hover:bg-zinc-900";
              if (showResult) {
                if (i === question.correct) {
                  style = "border-emerald-500 bg-emerald-50 dark:border-emerald-600 dark:bg-emerald-950/30";
                } else if (i === selected && i !== question.correct) {
                  style = "border-red-500 bg-red-50 dark:border-red-600 dark:bg-red-950/30";
                }
              } else if (i === selected) {
                style = "border-indigo-500 bg-indigo-50 dark:border-indigo-600 dark:bg-indigo-950/30";
              }

              return (
                <button
                  key={i}
                  onClick={() => handleSelect(i)}
                  disabled={showResult}
                  className={cn(
                    "flex w-full items-center gap-3 rounded-lg border p-4 text-left text-sm transition-colors",
                    style
                  )}
                >
                  <span className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full border text-xs font-medium">
                    {String.fromCharCode(65 + i)}
                  </span>
                  <span className="flex-1">{option}</span>
                  {showResult && i === question.correct && (
                    <CheckCircle2 className="h-5 w-5 text-emerald-500" />
                  )}
                  {showResult && i === selected && i !== question.correct && (
                    <XCircle className="h-5 w-5 text-red-500" />
                  )}
                </button>
              );
            })}
          </div>

          {showResult && (
            <div className="mt-4 rounded-lg bg-blue-50 p-4 text-sm text-blue-800 dark:bg-blue-950/30 dark:text-blue-300">
              <p className="font-medium">Explanation:</p>
              <p className="mt-1">{question.explanation}</p>
            </div>
          )}

          <div className="mt-6 flex justify-end">
            {!showResult ? (
              <Button onClick={handleCheck} disabled={selected === null}>
                Check answer
              </Button>
            ) : (
              <Button onClick={handleNext}>
                {currentQ + 1 >= total ? "See results" : "Next question"}
                <ArrowRight className="h-4 w-4" />
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
