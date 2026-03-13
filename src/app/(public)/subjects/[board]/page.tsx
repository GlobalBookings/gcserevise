import Link from "next/link";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BreadcrumbJsonLd } from "@/components/seo/json-ld";
import {
  Calculator, BookOpen, FlaskConical, Zap, Globe, Monitor,
} from "lucide-react";
import type { Metadata } from "next";

const boardInfo: Record<string, { name: string; fullName: string; region: string }> = {
  aqa: { name: "AQA", fullName: "Assessment and Qualifications Alliance", region: "England" },
  edexcel: { name: "Edexcel", fullName: "Pearson Edexcel", region: "England" },
  ocr: { name: "OCR", fullName: "Oxford, Cambridge and RSA", region: "England" },
  wjec: { name: "WJEC", fullName: "WJEC Eduqas", region: "Wales & England" },
  ccea: { name: "CCEA", fullName: "Council for the Curriculum, Examinations & Assessment", region: "Northern Ireland" },
};

const boardSubjects: Record<string, { name: string; slug: string; icon: typeof Calculator; color: string; topics: number }[]> = {
  aqa: [
    { name: "Mathematics", slug: "maths", icon: Calculator, color: "bg-blue-500", topics: 24 },
    { name: "English Language", slug: "english-language", icon: BookOpen, color: "bg-purple-500", topics: 8 },
    { name: "English Literature", slug: "english-literature", icon: BookOpen, color: "bg-violet-500", topics: 7 },
    { name: "Biology", slug: "biology", icon: FlaskConical, color: "bg-emerald-500", topics: 14 },
    { name: "Chemistry", slug: "chemistry", icon: FlaskConical, color: "bg-amber-500", topics: 10 },
    { name: "Physics", slug: "physics", icon: Zap, color: "bg-red-500", topics: 8 },
    { name: "History", slug: "history", icon: Globe, color: "bg-orange-500", topics: 18 },
    { name: "Geography", slug: "geography", icon: Globe, color: "bg-teal-500", topics: 16 },
    { name: "Computer Science", slug: "computer-science", icon: Monitor, color: "bg-indigo-500", topics: 15 },
  ],
  edexcel: [
    { name: "Mathematics", slug: "maths", icon: Calculator, color: "bg-blue-500", topics: 22 },
    { name: "English Language", slug: "english-language", icon: BookOpen, color: "bg-purple-500", topics: 8 },
    { name: "English Literature", slug: "english-literature", icon: BookOpen, color: "bg-violet-500", topics: 7 },
    { name: "Biology", slug: "biology", icon: FlaskConical, color: "bg-emerald-500", topics: 12 },
    { name: "Chemistry", slug: "chemistry", icon: FlaskConical, color: "bg-amber-500", topics: 12 },
    { name: "Physics", slug: "physics", icon: Zap, color: "bg-red-500", topics: 10 },
  ],
  ocr: [
    { name: "Mathematics", slug: "maths", icon: Calculator, color: "bg-blue-500", topics: 20 },
    { name: "Biology", slug: "biology", icon: FlaskConical, color: "bg-emerald-500", topics: 12 },
    { name: "Chemistry", slug: "chemistry", icon: FlaskConical, color: "bg-amber-500", topics: 11 },
    { name: "Physics", slug: "physics", icon: Zap, color: "bg-red-500", topics: 10 },
    { name: "Computer Science", slug: "computer-science", icon: Monitor, color: "bg-indigo-500", topics: 14 },
  ],
  wjec: [
    { name: "Mathematics", slug: "maths", icon: Calculator, color: "bg-blue-500", topics: 18 },
    { name: "English Language", slug: "english-language", icon: BookOpen, color: "bg-purple-500", topics: 6 },
    { name: "Biology", slug: "biology", icon: FlaskConical, color: "bg-emerald-500", topics: 10 },
    { name: "Chemistry", slug: "chemistry", icon: FlaskConical, color: "bg-amber-500", topics: 10 },
    { name: "Physics", slug: "physics", icon: Zap, color: "bg-red-500", topics: 8 },
  ],
  ccea: [
    { name: "Mathematics", slug: "maths", icon: Calculator, color: "bg-blue-500", topics: 16 },
    { name: "English Language", slug: "english-language", icon: BookOpen, color: "bg-purple-500", topics: 6 },
    { name: "Biology", slug: "biology", icon: FlaskConical, color: "bg-emerald-500", topics: 10 },
    { name: "Chemistry", slug: "chemistry", icon: FlaskConical, color: "bg-amber-500", topics: 9 },
    { name: "Physics", slug: "physics", icon: Zap, color: "bg-red-500", topics: 8 },
  ],
};

type PageProps = { params: Promise<{ board: string }> };

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { board } = await params;
  const info = boardInfo[board] || { name: board.toUpperCase(), fullName: board.toUpperCase(), region: "UK" };
  return {
    title: `${info.name} GCSE Subjects - Free Revision Notes & Quizzes`,
    description: `Free ${info.name} GCSE revision for all subjects. Notes, quizzes, flashcards and past papers aligned to the ${info.fullName} specification.`,
    alternates: { canonical: `https://gcserevise.co.uk/subjects/${board}` },
  };
}

export default async function BoardPage({ params }: PageProps) {
  const { board } = await params;
  const info = boardInfo[board] || { name: board.toUpperCase(), fullName: board.toUpperCase(), region: "UK" };
  const subjects = boardSubjects[board] || boardSubjects.aqa;

  return (
    <div className="min-h-screen bg-white dark:bg-zinc-950">
      <Navbar />
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: "https://gcserevise.co.uk" },
          { name: "Subjects", url: "https://gcserevise.co.uk/subjects" },
          { name: info.name, url: `https://gcserevise.co.uk/subjects/${board}` },
        ]}
      />

      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <nav className="mb-6 flex items-center gap-2 text-sm text-zinc-500 dark:text-zinc-400">
          <Link href="/subjects" className="hover:text-indigo-600">Subjects</Link>
          <span>/</span>
          <span className="text-zinc-900 dark:text-zinc-100">{info.name}</span>
        </nav>

        <div className="mb-10">
          <Badge className="mb-3">{info.region}</Badge>
          <h1 className="text-3xl font-bold">{info.name} GCSE Subjects</h1>
          <p className="mt-2 text-zinc-500 dark:text-zinc-400">
            Free revision notes, quizzes and flashcards for all {info.fullName} GCSE subjects.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {subjects.map((subject) => (
            <Link key={subject.slug} href={`/subjects/${board}/${subject.slug}`}>
              <Card className="group cursor-pointer border-zinc-200 transition-all hover:shadow-md dark:border-zinc-800">
                <CardContent className="p-5">
                  <div className="flex items-center gap-3">
                    <div className={`flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg ${subject.color} text-white`}>
                      <subject.icon className="h-5 w-5" />
                    </div>
                    <div>
                      <h2 className="font-semibold group-hover:text-indigo-600">{subject.name}</h2>
                      <p className="text-xs text-zinc-500 dark:text-zinc-400">{subject.topics} topics</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>

      <Footer />
    </div>
  );
}
