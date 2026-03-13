"use client";

import { useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  BookOpen,
  Brain,
  Target,
  CheckCircle2,
  Circle,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

// Placeholder weekly plan data
const weekPlan = [
  {
    date: "Monday",
    tasks: [
      { id: "m1", subject: "Maths", topic: "Quadratic Formula", type: "revision", done: true, confidence: 2 },
      { id: "m2", subject: "Biology", topic: "Enzymes", type: "quiz", done: true, confidence: 3 },
      { id: "m3", subject: "English Lit", topic: "Inspector Calls Themes", type: "flashcards", done: false, confidence: null },
    ],
  },
  {
    date: "Tuesday",
    tasks: [
      { id: "t1", subject: "Chemistry", topic: "Electrolysis", type: "revision", done: false, confidence: null },
      { id: "t2", subject: "Physics", topic: "Wave Properties", type: "revision", done: false, confidence: null },
      { id: "t3", subject: "Maths", topic: "Trigonometry", type: "quiz", done: false, confidence: null },
    ],
  },
  {
    date: "Wednesday",
    tasks: [
      { id: "w1", subject: "English Lang", topic: "Paper 1 Q5 Writing", type: "practice", done: false, confidence: null },
      { id: "w2", subject: "Biology", topic: "Nervous System", type: "revision", done: false, confidence: null },
      { id: "w3", subject: "Chemistry", topic: "Rate of Reaction", type: "flashcards", done: false, confidence: null },
    ],
  },
  {
    date: "Thursday",
    tasks: [
      { id: "th1", subject: "Physics", topic: "P=IV Calculations", type: "quiz", done: false, confidence: null },
      { id: "th2", subject: "Maths", topic: "Probability", type: "revision", done: false, confidence: null },
      { id: "th3", subject: "English Lit", topic: "Macbeth Act 1", type: "revision", done: false, confidence: null },
    ],
  },
  {
    date: "Friday",
    tasks: [
      { id: "f1", subject: "Biology", topic: "Photosynthesis", type: "quiz", done: false, confidence: null },
      { id: "f2", subject: "Chemistry", topic: "Balancing Equations", type: "practice", done: false, confidence: null },
      { id: "f3", subject: "Physics", topic: "Forces & Motion", type: "revision", done: false, confidence: null },
    ],
  },
  {
    date: "Saturday",
    tasks: [
      { id: "s1", subject: "Maths", topic: "Algebra Review", type: "quiz", done: false, confidence: null },
      { id: "s2", subject: "English Lang", topic: "Paper 2 Q2 Summary", type: "practice", done: false, confidence: null },
    ],
  },
  {
    date: "Sunday",
    tasks: [
      { id: "su1", subject: "Weak Topics Review", topic: "All subjects - Level 1 topics", type: "revision", done: false, confidence: null },
    ],
  },
];

function taskIcon(type: string) {
  switch (type) {
    case "revision": return <BookOpen className="h-4 w-4" />;
    case "quiz": return <Brain className="h-4 w-4" />;
    case "flashcards": return <Target className="h-4 w-4" />;
    case "practice": return <BookOpen className="h-4 w-4" />;
    default: return <BookOpen className="h-4 w-4" />;
  }
}

export default function PlannerPage() {
  const [selectedDay, setSelectedDay] = useState(0);

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold">Revision Planner</h1>
        <p className="mt-1 text-zinc-500 dark:text-zinc-400">
          Your personalised weekly revision schedule
        </p>
      </div>

      {/* Week navigation */}
      <div className="mb-6 flex items-center justify-between">
        <Button variant="outline" size="sm">
          <ChevronLeft className="h-4 w-4" /> Previous week
        </Button>
        <h2 className="text-lg font-semibold">This week</h2>
        <Button variant="outline" size="sm">
          Next week <ChevronRight className="h-4 w-4" />
        </Button>
      </div>

      {/* Day tabs */}
      <div className="mb-6 flex gap-2 overflow-x-auto pb-2">
        {weekPlan.map((day, i) => {
          const completed = day.tasks.filter((t) => t.done).length;
          const total = day.tasks.length;

          return (
            <button
              key={day.date}
              onClick={() => setSelectedDay(i)}
              className={`flex min-w-[100px] flex-col items-center rounded-xl border px-4 py-3 text-sm transition-colors ${
                selectedDay === i
                  ? "border-indigo-500 bg-indigo-50 text-indigo-700 dark:border-indigo-600 dark:bg-indigo-950/50 dark:text-indigo-300"
                  : "border-zinc-200 hover:bg-zinc-50 dark:border-zinc-800 dark:hover:bg-zinc-900"
              }`}
            >
              <span className="font-medium">{day.date.slice(0, 3)}</span>
              <span className="mt-1 text-xs text-zinc-500 dark:text-zinc-400">
                {completed}/{total} done
              </span>
            </button>
          );
        })}
      </div>

      {/* Tasks for selected day */}
      <Card>
        <CardHeader>
          <CardTitle>{weekPlan[selectedDay].date}&apos;s tasks</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {weekPlan[selectedDay].tasks.map((task) => (
              <div
                key={task.id}
                className={`flex items-center justify-between rounded-lg border p-4 ${
                  task.done
                    ? "border-emerald-200 bg-emerald-50/50 dark:border-emerald-900 dark:bg-emerald-950/20"
                    : "border-zinc-200 dark:border-zinc-800"
                }`}
              >
                <div className="flex items-center gap-4">
                  <button className="flex-shrink-0">
                    {task.done ? (
                      <CheckCircle2 className="h-6 w-6 text-emerald-500" />
                    ) : (
                      <Circle className="h-6 w-6 text-zinc-300 dark:text-zinc-600" />
                    )}
                  </button>
                  <div>
                    <p className={`font-medium ${task.done ? "line-through opacity-60" : ""}`}>
                      {task.topic}
                    </p>
                    <p className="text-sm text-zinc-500 dark:text-zinc-400">{task.subject}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1.5 text-zinc-400">
                    {taskIcon(task.type)}
                    <span className="text-xs capitalize">{task.type}</span>
                  </div>
                  {task.done && task.confidence !== null && (
                    <Badge variant={task.confidence >= 3 ? "success" : task.confidence >= 2 ? "warning" : "destructive"}>
                      Level {task.confidence}
                    </Badge>
                  )}
                  {!task.done && (
                    <Button size="sm">Start</Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Confidence rating hint */}
      <div className="mt-6 rounded-lg border border-indigo-200 bg-indigo-50 p-4 dark:border-indigo-900 dark:bg-indigo-950/30">
        <p className="text-sm font-medium text-indigo-700 dark:text-indigo-300">
          After completing each task, rate your confidence:
        </p>
        <div className="mt-2 flex gap-4 text-sm text-indigo-600 dark:text-indigo-400">
          <span>Level 1: Needs Work</span>
          <span>Level 2: Getting There</span>
          <span>Level 3: Mastered</span>
        </div>
      </div>
    </div>
  );
}
