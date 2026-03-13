"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  GraduationCap, ArrowRight, ArrowLeft, CheckCircle2, Sparkles,
  Calculator, BookOpen, FlaskConical, Zap, Globe, Monitor, Brain,
  Palette, Music, Dumbbell, Camera, Users, UtensilsCrossed,
} from "lucide-react";
import { useConfetti } from "@/components/ui/confetti";
import { createClient } from "@/lib/supabase/client";

const steps = ["Exam Board", "Year Group", "Subjects", "Ready!"];

const examBoards = [
  { id: "aqa", name: "AQA", desc: "Most popular in England" },
  { id: "edexcel", name: "Edexcel", desc: "Pearson Edexcel" },
  { id: "ocr", name: "OCR", desc: "Oxford, Cambridge and RSA" },
  { id: "wjec", name: "WJEC", desc: "Wales & some England" },
  { id: "ccea", name: "CCEA", desc: "Northern Ireland" },
];

const allSubjects = [
  { name: "Mathematics", icon: Calculator, color: "bg-blue-500" },
  { name: "English Language", icon: BookOpen, color: "bg-purple-500" },
  { name: "English Literature", icon: BookOpen, color: "bg-violet-500" },
  { name: "Biology", icon: FlaskConical, color: "bg-emerald-500" },
  { name: "Chemistry", icon: FlaskConical, color: "bg-amber-500" },
  { name: "Physics", icon: Zap, color: "bg-red-500" },
  { name: "Combined Science", icon: FlaskConical, color: "bg-teal-500" },
  { name: "History", icon: Globe, color: "bg-orange-500" },
  { name: "Geography", icon: Globe, color: "bg-teal-400" },
  { name: "Computer Science", icon: Monitor, color: "bg-indigo-500" },
  { name: "French", icon: Globe, color: "bg-blue-400" },
  { name: "Spanish", icon: Globe, color: "bg-yellow-500" },
  { name: "German", icon: Globe, color: "bg-zinc-500" },
  { name: "Religious Studies", icon: BookOpen, color: "bg-indigo-400" },
  { name: "Business Studies", icon: Users, color: "bg-emerald-400" },
  { name: "Art & Design", icon: Palette, color: "bg-rose-500" },
  { name: "Design & Technology", icon: Monitor, color: "bg-pink-500" },
  { name: "Music", icon: Music, color: "bg-cyan-500" },
  { name: "Drama", icon: Sparkles, color: "bg-fuchsia-500" },
  { name: "PE", icon: Dumbbell, color: "bg-lime-500" },
  { name: "Psychology", icon: Brain, color: "bg-purple-400" },
  { name: "Sociology", icon: Users, color: "bg-sky-500" },
  { name: "Media Studies", icon: Camera, color: "bg-slate-500" },
  { name: "Food Prep & Nutrition", icon: UtensilsCrossed, color: "bg-orange-400" },
];

export default function OnboardingPage() {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [selectedBoard, setSelectedBoard] = useState("");
  const [yearGroup, setYearGroup] = useState(11);
  const [selectedSubjects, setSelectedSubjects] = useState<string[]>([]);
  const { fireStars } = useConfetti();

  function toggleSubject(name: string) {
    setSelectedSubjects((prev) =>
      prev.includes(name) ? prev.filter((s) => s !== name) : [...prev, name]
    );
  }

  async function handleComplete() {
    fireStars();
    // Save to Supabase
    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (user) {
      await supabase
        .from("user_profiles")
        .update({ year_group: yearGroup })
        .eq("user_id", user.id);
    }
    setTimeout(() => router.push("/dashboard"), 1500);
  }

  function canProceed() {
    if (step === 0) return selectedBoard !== "";
    if (step === 1) return true;
    if (step === 2) return selectedSubjects.length >= 1;
    return true;
  }

  return (
    <div className="flex min-h-[80vh] flex-col items-center justify-center">
      {/* Progress */}
      <div className="mb-8 w-full max-w-md">
        <div className="flex items-center justify-between mb-2">
          {steps.map((s, i) => (
            <div key={s} className="flex items-center gap-1">
              <div className={`flex h-7 w-7 items-center justify-center rounded-full text-xs font-bold ${
                i < step ? "bg-emerald-500 text-white" : i === step ? "bg-indigo-600 text-white" : "bg-zinc-200 text-zinc-500 dark:bg-zinc-700"
              }`}>
                {i < step ? <CheckCircle2 className="h-4 w-4" /> : i + 1}
              </div>
              <span className={`hidden text-xs sm:block ${i === step ? "font-semibold" : "text-zinc-400"}`}>
                {s}
              </span>
            </div>
          ))}
        </div>
        <Progress value={((step + 1) / steps.length) * 100} />
      </div>

      <AnimatePresence mode="wait">
        {/* Step 0: Exam Board */}
        {step === 0 && (
          <motion.div
            key="board"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            className="w-full max-w-md"
          >
            <div className="mb-6 text-center">
              <GraduationCap className="mx-auto h-10 w-10 text-indigo-600" />
              <h2 className="mt-3 text-2xl font-bold">Which exam board are you on?</h2>
              <p className="mt-1 text-sm text-zinc-500">This helps us show you the right content</p>
            </div>
            <div className="space-y-3">
              {examBoards.map((board) => (
                <motion.button
                  key={board.id}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setSelectedBoard(board.id)}
                  className={`flex w-full items-center justify-between rounded-xl border-2 p-4 text-left transition-all ${
                    selectedBoard === board.id
                      ? "border-indigo-500 bg-indigo-50 dark:border-indigo-600 dark:bg-indigo-950/30"
                      : "border-zinc-200 hover:border-zinc-300 dark:border-zinc-700"
                  }`}
                >
                  <div>
                    <p className="font-semibold">{board.name}</p>
                    <p className="text-sm text-zinc-500">{board.desc}</p>
                  </div>
                  {selectedBoard === board.id && (
                    <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}>
                      <CheckCircle2 className="h-5 w-5 text-indigo-600" />
                    </motion.div>
                  )}
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}

        {/* Step 1: Year Group */}
        {step === 1 && (
          <motion.div
            key="year"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            className="w-full max-w-md"
          >
            <div className="mb-6 text-center">
              <h2 className="text-2xl font-bold">What year are you in?</h2>
              <p className="mt-1 text-sm text-zinc-500">We&apos;ll tailor your revision timeline</p>
            </div>
            <div className="flex justify-center gap-4">
              {[10, 11].map((year) => (
                <motion.button
                  key={year}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setYearGroup(year)}
                  className={`flex h-32 w-32 flex-col items-center justify-center rounded-2xl border-2 transition-all ${
                    yearGroup === year
                      ? "border-indigo-500 bg-indigo-50 dark:border-indigo-600 dark:bg-indigo-950/30"
                      : "border-zinc-200 hover:border-zinc-300 dark:border-zinc-700"
                  }`}
                >
                  <span className="text-4xl font-bold">{year}</span>
                  <span className="mt-1 text-sm text-zinc-500">Year {year}</span>
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}

        {/* Step 2: Subjects */}
        {step === 2 && (
          <motion.div
            key="subjects"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            className="w-full max-w-2xl"
          >
            <div className="mb-6 text-center">
              <h2 className="text-2xl font-bold">Pick your subjects</h2>
              <p className="mt-1 text-sm text-zinc-500">
                Select all the GCSEs you&apos;re taking ({selectedSubjects.length} selected)
              </p>
            </div>
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
              {allSubjects.map((subject) => {
                const isSelected = selectedSubjects.includes(subject.name);
                return (
                  <motion.button
                    key={subject.name}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => toggleSubject(subject.name)}
                    className={`flex items-center gap-2 rounded-xl border-2 p-3 text-left text-sm transition-all ${
                      isSelected
                        ? "border-indigo-500 bg-indigo-50 dark:border-indigo-600 dark:bg-indigo-950/30"
                        : "border-zinc-200 hover:border-zinc-300 dark:border-zinc-700"
                    }`}
                  >
                    <div className={`flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg ${subject.color} text-white`}>
                      <subject.icon className="h-4 w-4" />
                    </div>
                    <span className="font-medium">{subject.name}</span>
                    {isSelected && (
                      <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="ml-auto">
                        <CheckCircle2 className="h-4 w-4 text-indigo-600" />
                      </motion.div>
                    )}
                  </motion.button>
                );
              })}
            </div>
          </motion.div>
        )}

        {/* Step 3: Ready */}
        {step === 3 && (
          <motion.div
            key="ready"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-full max-w-md text-center"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 200 }}
            >
              <Sparkles className="mx-auto h-16 w-16 text-indigo-600" />
            </motion.div>
            <h2 className="mt-4 text-3xl font-bold">You&apos;re all set!</h2>
            <p className="mt-2 text-zinc-500">
              Your personalised revision plan is ready. Let&apos;s ace those GCSEs.
            </p>
            <div className="mt-6 rounded-xl border border-zinc-200 bg-zinc-50 p-4 dark:border-zinc-800 dark:bg-zinc-900">
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-zinc-500">Exam board</span>
                  <span className="font-medium">{examBoards.find((b) => b.id === selectedBoard)?.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-zinc-500">Year group</span>
                  <span className="font-medium">Year {yearGroup}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-zinc-500">Subjects</span>
                  <span className="font-medium">{selectedSubjects.length} subjects</span>
                </div>
              </div>
            </div>
            <Button size="lg" className="mt-6" onClick={handleComplete}>
              Start revising <ArrowRight className="h-4 w-4" />
            </Button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Navigation */}
      {step < 3 && (
        <div className="mt-8 flex gap-3">
          {step > 0 && (
            <Button variant="outline" onClick={() => setStep((s) => s - 1)}>
              <ArrowLeft className="h-4 w-4" /> Back
            </Button>
          )}
          <Button onClick={() => setStep((s) => s + 1)} disabled={!canProceed()}>
            Continue <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      )}
    </div>
  );
}
