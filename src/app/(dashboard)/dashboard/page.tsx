import {
  CalendarDays,
  BarChart3,
  Flame,
  Clock,
  BookOpen,
  Brain,
  CheckCircle2,
  ArrowRight,
  Target,
} from "lucide-react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";

export const metadata = {
  title: "Dashboard",
};

// Placeholder data -- replaced by Supabase queries once connected
const todaysTasks = [
  { id: 1, subject: "Maths", topic: "Solving Quadratic Equations", type: "revision", done: false },
  { id: 2, subject: "Biology", topic: "Cell Division - Mitosis", type: "quiz", done: false },
  { id: 3, subject: "English Lit", topic: "Macbeth - Key Quotes", type: "flashcards", done: true },
  { id: 4, subject: "Chemistry", topic: "Ionic Bonding", type: "revision", done: false },
  { id: 5, subject: "Physics", topic: "Electricity - V=IR", type: "quiz", done: false },
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
  const completedToday = todaysTasks.filter((t) => t.done).length;
  const totalToday = todaysTasks.length;

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold">Good morning, Student</h1>
        <p className="mt-1 text-zinc-500 dark:text-zinc-400">
          Here&apos;s your revision plan for today
        </p>
      </div>

      {/* Stats cards */}
      <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardContent className="flex items-center gap-4 p-5">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-100 dark:bg-indigo-950/50">
              <CalendarDays className="h-5 w-5 text-indigo-600" />
            </div>
            <div>
              <p className="text-2xl font-bold">{completedToday}/{totalToday}</p>
              <p className="text-sm text-zinc-500 dark:text-zinc-400">Tasks today</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="flex items-center gap-4 p-5">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-amber-100 dark:bg-amber-950/50">
              <Flame className="h-5 w-5 text-amber-600" />
            </div>
            <div>
              <p className="text-2xl font-bold">7 days</p>
              <p className="text-sm text-zinc-500 dark:text-zinc-400">Study streak</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="flex items-center gap-4 p-5">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-100 dark:bg-emerald-950/50">
              <BarChart3 className="h-5 w-5 text-emerald-600" />
            </div>
            <div>
              <p className="text-2xl font-bold">46%</p>
              <p className="text-sm text-zinc-500 dark:text-zinc-400">Overall mastery</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="flex items-center gap-4 p-5">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-purple-100 dark:bg-purple-950/50">
              <Clock className="h-5 w-5 text-purple-600" />
            </div>
            <div>
              <p className="text-2xl font-bold">43 days</p>
              <p className="text-sm text-zinc-500 dark:text-zinc-400">Until first exam</p>
            </div>
          </CardContent>
        </Card>
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
                {todaysTasks.map((task) => (
                  <div
                    key={task.id}
                    className={`flex items-center justify-between rounded-lg border p-4 transition-colors ${
                      task.done
                        ? "border-emerald-200 bg-emerald-50/50 dark:border-emerald-900 dark:bg-emerald-950/20"
                        : "border-zinc-200 hover:bg-zinc-50 dark:border-zinc-800 dark:hover:bg-zinc-900"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`flex h-8 w-8 items-center justify-center rounded-full ${
                        task.done
                          ? "bg-emerald-100 text-emerald-600 dark:bg-emerald-950 dark:text-emerald-400"
                          : "bg-zinc-100 text-zinc-500 dark:bg-zinc-800"
                      }`}>
                        {task.done ? (
                          <CheckCircle2 className="h-4 w-4" />
                        ) : (
                          taskTypeIcon(task.type)
                        )}
                      </div>
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
                        <Button size="sm" variant="outline">
                          Start
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Subject progress sidebar */}
        <div>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Subject progress</CardTitle>
              <Link href="/dashboard/progress">
                <Button variant="ghost" size="sm">
                  Details <ArrowRight className="h-3 w-3" />
                </Button>
              </Link>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {subjectProgress.map((subject) => (
                  <div key={subject.name}>
                    <div className="mb-1.5 flex items-center justify-between">
                      <span className="text-sm font-medium">{subject.name}</span>
                      <span className="text-sm text-zinc-500 dark:text-zinc-400">{subject.mastery}%</span>
                    </div>
                    <Progress value={subject.mastery} indicatorClassName={subject.color} />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Exam countdown */}
          <Card className="mt-4">
            <CardContent className="p-5">
              <div className="text-center">
                <p className="text-sm font-medium text-zinc-500 dark:text-zinc-400">Next exam</p>
                <p className="mt-1 text-3xl font-bold text-indigo-600">43 days</p>
                <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
                  English Language Paper 1
                </p>
                <p className="text-xs text-zinc-400">May 2026</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
