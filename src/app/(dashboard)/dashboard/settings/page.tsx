"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

const examBoards = [
  { id: "aqa", name: "AQA" },
  { id: "edexcel", name: "Edexcel" },
  { id: "ocr", name: "OCR" },
  { id: "wjec", name: "WJEC/Eduqas" },
  { id: "ccea", name: "CCEA" },
];

const allSubjects = [
  "Mathematics", "English Language", "English Literature",
  "Biology", "Chemistry", "Physics", "Combined Science",
  "History", "Geography", "Computer Science",
  "French", "Spanish", "German",
  "Religious Studies", "Business Studies", "Art & Design",
  "Design & Technology", "Drama", "Music", "PE",
  "Psychology", "Sociology", "Media Studies",
  "Food Preparation & Nutrition",
];

export default function SettingsPage() {
  const [displayName, setDisplayName] = useState("Student");
  const [selectedBoard, setSelectedBoard] = useState("aqa");
  const [selectedSubjects, setSelectedSubjects] = useState<string[]>([
    "Mathematics", "English Language", "English Literature",
    "Biology", "Chemistry", "Physics",
  ]);

  function toggleSubject(subject: string) {
    setSelectedSubjects((prev) =>
      prev.includes(subject)
        ? prev.filter((s) => s !== subject)
        : [...prev, subject]
    );
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold">Settings</h1>
        <p className="mt-1 text-zinc-500 dark:text-zinc-400">
          Manage your profile and revision preferences
        </p>
      </div>

      <div className="space-y-6">
        {/* Profile */}
        <Card>
          <CardHeader>
            <CardTitle>Profile</CardTitle>
            <CardDescription>Your basic account information</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="mb-1.5 block text-sm font-medium">Display name</label>
              <Input
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                className="max-w-sm"
              />
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium">Year group</label>
              <select className="h-10 max-w-sm rounded-lg border border-zinc-200 bg-white px-3 text-sm dark:border-zinc-700 dark:bg-zinc-800">
                <option value="10">Year 10</option>
                <option value="11" selected>Year 11</option>
              </select>
            </div>
            <Button>Save changes</Button>
          </CardContent>
        </Card>

        {/* Exam board */}
        <Card>
          <CardHeader>
            <CardTitle>Exam board</CardTitle>
            <CardDescription>Select your primary exam board</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {examBoards.map((board) => (
                <button
                  key={board.id}
                  onClick={() => setSelectedBoard(board.id)}
                  className={`rounded-lg border px-4 py-2 text-sm font-medium transition-colors ${
                    selectedBoard === board.id
                      ? "border-indigo-500 bg-indigo-50 text-indigo-700 dark:border-indigo-600 dark:bg-indigo-950/50 dark:text-indigo-300"
                      : "border-zinc-200 hover:bg-zinc-50 dark:border-zinc-700 dark:hover:bg-zinc-800"
                  }`}
                >
                  {board.name}
                </button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Subjects */}
        <Card>
          <CardHeader>
            <CardTitle>Your subjects</CardTitle>
            <CardDescription>
              Select the subjects you&apos;re studying. Your revision plan will be based on these.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {allSubjects.map((subject) => (
                <button
                  key={subject}
                  onClick={() => toggleSubject(subject)}
                  className={`rounded-full border px-3 py-1.5 text-sm transition-colors ${
                    selectedSubjects.includes(subject)
                      ? "border-indigo-500 bg-indigo-50 text-indigo-700 dark:border-indigo-600 dark:bg-indigo-950/50 dark:text-indigo-300"
                      : "border-zinc-200 text-zinc-600 hover:bg-zinc-50 dark:border-zinc-700 dark:text-zinc-400 dark:hover:bg-zinc-800"
                  }`}
                >
                  {subject}
                </button>
              ))}
            </div>
            <div className="mt-4">
              <p className="text-sm text-zinc-500 dark:text-zinc-400">
                {selectedSubjects.length} subjects selected
              </p>
            </div>
            <Button className="mt-4">Save subjects</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
