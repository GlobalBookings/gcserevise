"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { BarChart3, TrendingUp, Target, BookOpen } from "lucide-react";

const subjects = [
  {
    name: "Mathematics",
    mastery: 42,
    color: "bg-blue-500",
    topics: [
      { name: "Number", confidence: 3, total: 5, mastered: 4 },
      { name: "Algebra", confidence: 2, total: 8, mastered: 3 },
      { name: "Ratio & Proportion", confidence: 2, total: 4, mastered: 2 },
      { name: "Geometry & Measures", confidence: 1, total: 7, mastered: 1 },
      { name: "Probability & Statistics", confidence: 1, total: 5, mastered: 1 },
    ],
  },
  {
    name: "English Language",
    mastery: 38,
    color: "bg-purple-500",
    topics: [
      { name: "Paper 1 Reading", confidence: 2, total: 3, mastered: 1 },
      { name: "Paper 1 Writing", confidence: 1, total: 3, mastered: 0 },
      { name: "Paper 2 Reading", confidence: 2, total: 3, mastered: 1 },
      { name: "Paper 2 Writing", confidence: 2, total: 3, mastered: 1 },
    ],
  },
  {
    name: "Biology",
    mastery: 61,
    color: "bg-emerald-500",
    topics: [
      { name: "Cell Biology", confidence: 3, total: 4, mastered: 4 },
      { name: "Organisation", confidence: 3, total: 3, mastered: 3 },
      { name: "Infection & Response", confidence: 2, total: 3, mastered: 1 },
      { name: "Bioenergetics", confidence: 2, total: 2, mastered: 1 },
      { name: "Homeostasis", confidence: 1, total: 3, mastered: 0 },
    ],
  },
  {
    name: "Chemistry",
    mastery: 33,
    color: "bg-amber-500",
    topics: [
      { name: "Atomic Structure", confidence: 2, total: 3, mastered: 2 },
      { name: "Bonding", confidence: 1, total: 3, mastered: 0 },
      { name: "Quantitative Chemistry", confidence: 1, total: 3, mastered: 0 },
      { name: "Chemical Changes", confidence: 2, total: 4, mastered: 1 },
      { name: "Energy Changes", confidence: 1, total: 2, mastered: 0 },
    ],
  },
  {
    name: "Physics",
    mastery: 47,
    color: "bg-red-500",
    topics: [
      { name: "Energy", confidence: 3, total: 3, mastered: 3 },
      { name: "Electricity", confidence: 2, total: 4, mastered: 2 },
      { name: "Particle Model", confidence: 2, total: 2, mastered: 1 },
      { name: "Forces", confidence: 1, total: 4, mastered: 0 },
      { name: "Waves", confidence: 1, total: 3, mastered: 0 },
    ],
  },
];

function confidenceBadge(level: number) {
  if (level >= 3) return <Badge variant="success">Mastered</Badge>;
  if (level >= 2) return <Badge variant="warning">Getting There</Badge>;
  return <Badge variant="destructive">Needs Work</Badge>;
}

export default function ProgressPage() {
  const overallMastery = Math.round(
    subjects.reduce((sum, s) => sum + s.mastery, 0) / subjects.length
  );

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold">Progress</h1>
        <p className="mt-1 text-zinc-500 dark:text-zinc-400">
          Track your mastery across all subjects
        </p>
      </div>

      {/* Overall stats */}
      <div className="mb-8 grid gap-4 sm:grid-cols-3">
        <Card>
          <CardContent className="flex items-center gap-4 p-5">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-100 dark:bg-indigo-950/50">
              <BarChart3 className="h-5 w-5 text-indigo-600" />
            </div>
            <div>
              <p className="text-2xl font-bold">{overallMastery}%</p>
              <p className="text-sm text-zinc-500 dark:text-zinc-400">Overall mastery</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex items-center gap-4 p-5">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-100 dark:bg-emerald-950/50">
              <TrendingUp className="h-5 w-5 text-emerald-600" />
            </div>
            <div>
              <p className="text-2xl font-bold">23</p>
              <p className="text-sm text-zinc-500 dark:text-zinc-400">Topics mastered</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex items-center gap-4 p-5">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-amber-100 dark:bg-amber-950/50">
              <Target className="h-5 w-5 text-amber-600" />
            </div>
            <div>
              <p className="text-2xl font-bold">18</p>
              <p className="text-sm text-zinc-500 dark:text-zinc-400">Topics need work</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Subject breakdown */}
      <div className="space-y-6">
        {subjects.map((subject) => (
          <Card key={subject.name}>
            <CardHeader className="flex flex-row items-center justify-between">
              <div className="flex items-center gap-3">
                <div className={`h-3 w-3 rounded-full ${subject.color}`} />
                <CardTitle className="text-base">{subject.name}</CardTitle>
              </div>
              <span className="text-sm font-semibold text-zinc-500 dark:text-zinc-400">
                {subject.mastery}% mastery
              </span>
            </CardHeader>
            <CardContent>
              <Progress value={subject.mastery} indicatorClassName={subject.color} className="mb-4" />

              <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
                {subject.topics.map((topic) => (
                  <div
                    key={topic.name}
                    className="flex items-center justify-between rounded-lg border border-zinc-200 p-3 dark:border-zinc-800"
                  >
                    <div>
                      <p className="text-sm font-medium">{topic.name}</p>
                      <p className="text-xs text-zinc-500 dark:text-zinc-400">
                        {topic.mastered}/{topic.total} topics
                      </p>
                    </div>
                    {confidenceBadge(topic.confidence)}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
