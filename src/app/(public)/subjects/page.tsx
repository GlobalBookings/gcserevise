import Link from "next/link";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Calculator,
  BookOpen,
  FlaskConical,
  Zap,
  Globe,
  Monitor,
  Users,
  Palette,
  Music,
  Dumbbell,
  Brain,
  Camera,
  UtensilsCrossed,
  Drama,
} from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "All GCSE Subjects",
  description: "Browse revision notes, quizzes and flashcards for every GCSE subject across AQA, Edexcel, OCR, WJEC and CCEA exam boards.",
};

const subjectGroups = [
  {
    category: "Core Subjects",
    subjects: [
      { name: "Mathematics", slug: "maths", icon: Calculator, color: "bg-blue-500", boards: ["AQA", "Edexcel", "OCR"], topics: 29 },
      { name: "English Language", slug: "english-language", icon: BookOpen, color: "bg-purple-500", boards: ["AQA", "Edexcel"], topics: 12 },
      { name: "English Literature", slug: "english-literature", icon: BookOpen, color: "bg-violet-500", boards: ["AQA", "Edexcel", "OCR"], topics: 15 },
    ],
  },
  {
    category: "Sciences",
    subjects: [
      { name: "Biology", slug: "biology", icon: FlaskConical, color: "bg-emerald-500", boards: ["AQA", "Edexcel", "OCR"], topics: 21 },
      { name: "Chemistry", slug: "chemistry", icon: FlaskConical, color: "bg-amber-500", boards: ["AQA", "Edexcel", "OCR"], topics: 20 },
      { name: "Physics", slug: "physics", icon: Zap, color: "bg-red-500", boards: ["AQA", "Edexcel", "OCR"], topics: 22 },
      { name: "Combined Science", slug: "combined-science", icon: FlaskConical, color: "bg-teal-500", boards: ["AQA", "Edexcel"], topics: 45 },
    ],
  },
  {
    category: "Humanities",
    subjects: [
      { name: "History", slug: "history", icon: Globe, color: "bg-orange-500", boards: ["AQA", "Edexcel", "OCR"], topics: 18 },
      { name: "Geography", slug: "geography", icon: Globe, color: "bg-teal-500", boards: ["AQA", "Edexcel", "OCR"], topics: 16 },
      { name: "Religious Studies", slug: "religious-studies", icon: BookOpen, color: "bg-indigo-500", boards: ["AQA", "Edexcel"], topics: 14 },
    ],
  },
  {
    category: "Languages",
    subjects: [
      { name: "French", slug: "french", icon: Globe, color: "bg-blue-400", boards: ["AQA", "Edexcel"], topics: 12 },
      { name: "Spanish", slug: "spanish", icon: Globe, color: "bg-yellow-500", boards: ["AQA", "Edexcel"], topics: 12 },
      { name: "German", slug: "german", icon: Globe, color: "bg-zinc-500", boards: ["AQA", "Edexcel"], topics: 12 },
    ],
  },
  {
    category: "Technology & Computing",
    subjects: [
      { name: "Computer Science", slug: "computer-science", icon: Monitor, color: "bg-indigo-500", boards: ["AQA", "Edexcel", "OCR"], topics: 15 },
      { name: "Design & Technology", slug: "design-technology", icon: Monitor, color: "bg-pink-500", boards: ["AQA", "Edexcel"], topics: 10 },
      { name: "Food Preparation & Nutrition", slug: "food-nutrition", icon: UtensilsCrossed, color: "bg-orange-400", boards: ["AQA", "Edexcel"], topics: 8 },
    ],
  },
  {
    category: "Creative & Performing Arts",
    subjects: [
      { name: "Art & Design", slug: "art-design", icon: Palette, color: "bg-rose-500", boards: ["AQA", "Edexcel", "OCR"], topics: 6 },
      { name: "Drama", slug: "drama", icon: Drama, color: "bg-fuchsia-500", boards: ["AQA", "Edexcel"], topics: 8 },
      { name: "Music", slug: "music", icon: Music, color: "bg-cyan-500", boards: ["AQA", "Edexcel", "OCR"], topics: 8 },
      { name: "Media Studies", slug: "media-studies", icon: Camera, color: "bg-slate-500", boards: ["AQA", "Edexcel"], topics: 7 },
    ],
  },
  {
    category: "Social Sciences",
    subjects: [
      { name: "Business Studies", slug: "business", icon: Users, color: "bg-emerald-400", boards: ["AQA", "Edexcel"], topics: 12 },
      { name: "Psychology", slug: "psychology", icon: Brain, color: "bg-purple-400", boards: ["AQA", "Edexcel"], topics: 10 },
      { name: "Sociology", slug: "sociology", icon: Users, color: "bg-sky-500", boards: ["AQA"], topics: 8 },
      { name: "PE", slug: "pe", icon: Dumbbell, color: "bg-lime-500", boards: ["AQA", "Edexcel", "OCR"], topics: 10 },
    ],
  },
];

export default function SubjectsPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-zinc-950">
      <Navbar />

      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="mb-10">
          <h1 className="text-3xl font-bold">All GCSE Subjects</h1>
          <p className="mt-2 text-zinc-500 dark:text-zinc-400">
            Free revision notes, quizzes and flashcards for every GCSE subject. Select your exam board and start revising.
          </p>
        </div>

        {subjectGroups.map((group) => (
          <div key={group.category} className="mb-10">
            <h2 className="mb-4 text-xl font-semibold">{group.category}</h2>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {group.subjects.map((subject) => (
                <Link key={subject.slug} href={`/subjects/aqa/${subject.slug}`}>
                  <Card className="group cursor-pointer border-zinc-200 transition-all hover:shadow-md dark:border-zinc-800">
                    <CardContent className="p-5">
                      <div className="flex items-start gap-3">
                        <div className={`flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg ${subject.color} text-white`}>
                          <subject.icon className="h-5 w-5" />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold group-hover:text-indigo-600">{subject.name}</h3>
                          <p className="mt-1 text-xs text-zinc-500 dark:text-zinc-400">
                            {subject.topics} topics
                          </p>
                          <div className="mt-2 flex flex-wrap gap-1">
                            {subject.boards.map((board) => (
                              <Badge key={board} variant="outline" className="text-[10px]">
                                {board}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>

      <Footer />
    </div>
  );
}
