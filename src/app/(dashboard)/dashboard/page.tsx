"use client";

import { useEffect, useState, useCallback } from "react";
import {
  CalendarDays,
  BarChart3,
  Clock,
  BookOpen,
  Brain,
  CheckCircle2,
  ArrowRight,
  Target,
  Trophy,
  Sparkles,
  Zap,
} from "lucide-react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { LevelBadge } from "@/components/ui/level-badge";
import { StreakDisplay } from "@/components/ui/streak-display";
import { XPToast } from "@/components/ui/xp-toast";
import { AnimatedCounter } from "@/components/ui/animated-counter";
import { useConfetti } from "@/components/ui/confetti";
import { createClient } from "@/lib/supabase/client";
import { XP_REWARDS } from "@/lib/gamification";

interface Task {
  id: string;
  subject: string;
  topic: string;
  type: string;
  done: boolean;
}

const placeholderTasks: Task[] = [
  { id: "1", subject: "Maths", topic: "Solving Quadratic Equations", type: "revision", done: false },
  { id: "2", subject: "Biology", topic: "Cell Division - Mitosis", type: "quiz", done: false },
  { id: "3", subject: "English Lit", topic: "Macbeth - Key Quotes", type: "flashcards", done: false },
  { id: "4", subject: "Chemistry", topic: "Ionic Bonding", type: "revision", done: false },
  { id: "5", subject: "Physics", topic: "Electricity - V=IR", type: "quiz", done: false },
];

const subjectProgress = [
  { name: "Maths", mastery: 42, color: "bg-blue-500" },
  { name: "English Language", mastery: 38, color: "bg-purple-500" },
  { name: "English Literature", mastery: 55, color: "bg-violet-500" },
  { name: "Biology", mastery: 61, color: "bg-emerald-500" },
  { name: "Chemistry", mastery: 33, color: "bg-amber-500" },
  { name: "Physics", mastery: 47, color: "bg-red-500" },
];

function taskTypeIcon(type: string) {
  switch (type) {
    case "revision": return <BookOpen className="h-4 w-4" />;
    case "quiz": return <Brain className="h-4 w-4" />;
    case "flashcards": return <Target className="h-4 w-4" />;
    default: return <BookOpen className="h-4 w-4" />;
  }
}

function taskTypeBadge(type: string) {
  switch (type) {
    case "revision": return <Badge variant="default">Revision</Badge>;
    case "quiz": return <Badge variant="warning">Quiz</Badge>;
    case "flashcards": return <Badge variant="secondary">Flashcards</Badge>;
    default: return <Badge>Task</Badge>;
  }
}

export default function DashboardPage() {
  const [tasks, setTasks] = useState<Task[]>(placeholderTasks);
  const [xp, setXp] = useState(320);
  const [streak, setStreak] = useState(7);
  const [displayName, setDisplayName] = useState("Student");
  const [showXPToast, setShowXPToast] = useState(false);
  const [xpGained, setXpGained] = useState(0);
  const [xpMessage, setXpMessage] = useState("");
  const { fireConfetti, fireStars } = useConfetti();

  // Fetch user profile
  useEffect(() => {
    async function loadProfile() {
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        const { data: profile } = await supabase
          .from("user_profiles")
          .select("display_name")
          .eq("user_id", user.id)
          .single();
        if (profile) setDisplayName(profile.display_name);
      }
    }
    loadProfile();
  }, []);

  const completeTask = useCallback((taskId: string) => {
    const task = tasks.find((t) => t.id === taskId);
    if (!task || task.done) return;

    setTasks((prev) => prev.map((t) => t.id === taskId ? { ...t, done: true } : t));

    const reward = task.type === "quiz" ? XP_REWARDS.COMPLETE_QUIZ : task.type === "flashcards" ? XP_REWARDS.COMPLETE_FLASHCARDS : XP_REWARDS.COMPLETE_REVISION;

    setXp((prev) => prev + reward);
    setXpGained(reward);
    setXpMessage(`${task.type.charAt(0).toUpperCase() + task.type.slice(1)} completed!`);
    setShowXPToast(true);

    const completedCount = tasks.filter((t) => t.done).length + 1;
    if (completedCount === tasks.length) {
      setTimeout(() => fireStars(), 500);
    } else {
      fireConfetti();
    }
  }, [tasks, fireConfetti, fireStars]);

  const completedToday = tasks.filter((t) => t.done).length;
  const totalToday = tasks.length;

  // Time-based greeting
  const hour = new Date().getHours();
  const greeting = hour < 12 ? "Good morning" : hour < 17 ? "Good afternoon" : "Good evening";

  return (
    <div>
      <XPToast amount={xpGained} message={xpMessage} show={showXPToast} onClose={() => setShowXPToast(false)} />

      {/* Header with level */}
      <div className="mb-8 flex items-start justify-between">
        <div>
          <motion.h1
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-2xl font-bold"
          >
            {greeting}, {displayName}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="mt-1 text-zinc-500 dark:text-zinc-400"
          >
            Here&apos;s your revision plan for today
          </motion.p>
        </div>
        <div className="flex items-center gap-4">
          <StreakDisplay streak={streak} compact />
          <LevelBadge xp={xp} size="md" showProgress />
        </div>
      </div>

      {/* Stats cards with animations */}
      <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[
          { icon: CalendarDays, iconBg: "bg-indigo-100 dark:bg-indigo-950/50", iconColor: "text-indigo-600", value: `${completedToday}/${totalToday}`, label: "Tasks today", highlight: completedToday === totalToday && totalToday > 0 },
          { icon: Zap, iconBg: "bg-amber-100 dark:bg-amber-950/50", iconColor: "text-amber-600", value: xp, label: "Total XP", isNumber: true },
          { icon: BarChart3, iconBg: "bg-emerald-100 dark:bg-emerald-950/50", iconColor: "text-emerald-600", value: 46, label: "Overall mastery %", isNumber: true },
          { icon: Clock, iconBg: "bg-purple-100 dark:bg-purple-950/50", iconColor: "text-purple-600", value: "43 days", label: "Until first exam" },
        ].map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
          >
            <Card className={stat.highlight ? "border-emerald-300 bg-emerald-50/50 dark:border-emerald-800 dark:bg-emerald-950/20" : ""}>
              <CardContent className="flex items-center gap-4 p-5">
                <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${stat.iconBg}`}>
                  <stat.icon className={`h-5 w-5 ${stat.iconColor}`} />
                </div>
                <div>
                  <p className="text-2xl font-bold">
                    {stat.isNumber ? <AnimatedCounter value={stat.value as number} /> : stat.value}
                    {stat.highlight && <Sparkles className="ml-1 inline h-4 w-4 text-emerald-500" />}
                  </p>
                  <p className="text-sm text-zinc-500 dark:text-zinc-400">{stat.label}</p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Today's tasks */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Today&apos;s revision plan</CardTitle>
              <Link href="/dashboard/planner">
                <Button variant="ghost" size="sm">
                  Full planner <ArrowRight className="h-3 w-3" />
                </Button>
              </Link>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <AnimatePresence>
                  {tasks.map((task, i) => (
                    <motion.div
                      key={task.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.05 }}
                      layout
                      className={`flex items-center justify-between rounded-lg border p-4 transition-all ${
                        task.done
                          ? "border-emerald-200 bg-emerald-50/50 dark:border-emerald-900 dark:bg-emerald-950/20"
                          : "border-zinc-200 hover:border-indigo-200 hover:bg-indigo-50/30 dark:border-zinc-800 dark:hover:border-indigo-900 dark:hover:bg-indigo-950/10"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <motion.div
                          whileTap={{ scale: 0.9 }}
                          className={`flex h-8 w-8 items-center justify-center rounded-full ${
                            task.done
                              ? "bg-emerald-100 text-emerald-600 dark:bg-emerald-950 dark:text-emerald-400"
                              : "bg-zinc-100 text-zinc-500 dark:bg-zinc-800"
                          }`}
                        >
                          {task.done ? (
                            <motion.div
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              transition={{ type: "spring", stiffness: 500 }}
                            >
                              <CheckCircle2 className="h-4 w-4" />
                            </motion.div>
                          ) : (
                            taskTypeIcon(task.type)
                          )}
                        </motion.div>
                        <div>
                          <p className={`text-sm font-medium ${task.done ? "line-through opacity-60" : ""}`}>
                            {task.topic}
                          </p>
                          <p className="text-xs text-zinc-500 dark:text-zinc-400">{task.subject}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        {taskTypeBadge(task.type)}
                        {!task.done && (
                          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                            <Button size="sm" onClick={() => completeTask(task.id)}>
                              Start
                            </Button>
                          </motion.div>
                        )}
                        {task.done && (
                          <motion.span
                            initial={{ opacity: 0, scale: 0 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="text-xs font-medium text-emerald-600"
                          >
                            +{task.type === "quiz" ? XP_REWARDS.COMPLETE_QUIZ : XP_REWARDS.COMPLETE_REVISION} XP
                          </motion.span>
                        )}
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>

              {/* All done celebration */}
              <AnimatePresence>
                {completedToday === totalToday && totalToday > 0 && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    className="mt-4 rounded-xl bg-gradient-to-r from-emerald-50 to-teal-50 p-4 text-center dark:from-emerald-950/30 dark:to-teal-950/30"
                  >
                    <Trophy className="mx-auto h-8 w-8 text-emerald-500" />
                    <p className="mt-2 font-semibold text-emerald-700 dark:text-emerald-300">
                      All tasks complete! Amazing work today!
                    </p>
                    <p className="text-sm text-emerald-600 dark:text-emerald-400">
                      Come back tomorrow to keep your streak going
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </CardContent>
          </Card>
        </div>

        {/* Right sidebar */}
        <div className="space-y-4">
          {/* Streak card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <StreakDisplay streak={streak} />
          </motion.div>

          {/* Subject progress */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="text-base">Subject progress</CardTitle>
                <Link href="/dashboard/progress">
                  <Button variant="ghost" size="sm">
                    Details <ArrowRight className="h-3 w-3" />
                  </Button>
                </Link>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {subjectProgress.map((subject, i) => (
                    <motion.div
                      key={subject.name}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.5 + i * 0.05 }}
                    >
                      <div className="mb-1.5 flex items-center justify-between">
                        <span className="text-sm font-medium">{subject.name}</span>
                        <span className="text-sm text-zinc-500 dark:text-zinc-400">{subject.mastery}%</span>
                      </div>
                      <Progress value={subject.mastery} indicatorClassName={subject.color} />
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Exam countdown */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <Card className="overflow-hidden">
              <div className="bg-gradient-to-br from-indigo-500 to-purple-600 p-5 text-center text-white">
                <p className="text-xs font-medium uppercase tracking-wider opacity-80">Next exam</p>
                <p className="mt-1 text-4xl font-bold">43</p>
                <p className="text-sm font-medium opacity-90">days to go</p>
                <p className="mt-2 text-xs opacity-70">English Language Paper 1 &middot; May 2026</p>
              </div>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
