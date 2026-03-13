import Link from "next/link";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { BreadcrumbJsonLd, CourseJsonLd } from "@/components/seo/json-ld";
import { ArrowRight, BookOpen, Brain, Target } from "lucide-react";
import type { Metadata } from "next";

import { AQA_SUBJECTS } from "@/data/aqa-seed";

const boardNames: Record<string, string> = {
  aqa: "AQA", edexcel: "Edexcel", ocr: "OCR", wjec: "WJEC", ccea: "CCEA",
};

type PageProps = { params: Promise<{ board: string; subject: string }> };

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { board, subject } = await params;
  const boardName = boardNames[board] || board.toUpperCase();
  const subjectName = subject.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());

  return {
    title: `${boardName} GCSE ${subjectName} - Revision Notes, Quizzes & Flashcards`,
    description: `Free ${boardName} GCSE ${subjectName} revision. Complete topic list with notes, quizzes, flashcards and past papers. Start revising today.`,
    alternates: { canonical: `https://gcserevise.co.uk/subjects/${board}/${subject}` },
  };
}

export default async function SubjectPage({ params }: PageProps) {
  const { board, subject } = await params;
  const boardName = boardNames[board] || board.toUpperCase();

  // Find subject data from seed (fallback for non-AQA)
  const subjectData = AQA_SUBJECTS.find((s) => s.slug === subject);
  const subjectName = subjectData?.name || subject.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
  const topics = subjectData?.topics || [];

  const baseUrl = "https://gcserevise.co.uk";

  return (
    <div className="min-h-screen bg-white dark:bg-zinc-950">
      <Navbar />
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: baseUrl },
          { name: "Subjects", url: `${baseUrl}/subjects` },
          { name: boardName, url: `${baseUrl}/subjects/${board}` },
          { name: subjectName, url: `${baseUrl}/subjects/${board}/${subject}` },
        ]}
      />
      <CourseJsonLd
        name={`${boardName} GCSE ${subjectName}`}
        description={`Complete free revision for ${boardName} GCSE ${subjectName} including notes, quizzes and flashcards for every topic.`}
        provider="GCSERevise"
        url={`${baseUrl}/subjects/${board}/${subject}`}
      />

      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav className="mb-6 flex items-center gap-2 text-sm text-zinc-500 dark:text-zinc-400">
          <Link href="/subjects" className="hover:text-indigo-600">Subjects</Link>
          <span>/</span>
          <Link href={`/subjects/${board}`} className="hover:text-indigo-600">{boardName}</Link>
          <span>/</span>
          <span className="text-zinc-900 dark:text-zinc-100">{subjectName}</span>
        </nav>

        <div className="mb-10">
          <div className="flex flex-wrap items-center gap-2 mb-3">
            <Badge>{boardName}</Badge>
            <Badge variant="secondary">{topics.length} topics</Badge>
          </div>
          <h1 className="text-3xl font-bold">{boardName} GCSE {subjectName}</h1>
          <p className="mt-2 text-zinc-500 dark:text-zinc-400">
            Free revision notes, quizzes and flashcards for every topic in the {boardName} GCSE {subjectName} specification.
          </p>
        </div>

        {/* Quick stats */}
        <div className="mb-8 grid gap-4 sm:grid-cols-3">
          <Card>
            <CardContent className="flex items-center gap-3 p-4">
              <BookOpen className="h-5 w-5 text-indigo-600" />
              <div>
                <p className="text-xl font-bold">{topics.length}</p>
                <p className="text-xs text-zinc-500 dark:text-zinc-400">Revision topics</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="flex items-center gap-3 p-4">
              <Brain className="h-5 w-5 text-indigo-600" />
              <div>
                <p className="text-xl font-bold">{topics.length * 5}+</p>
                <p className="text-xs text-zinc-500 dark:text-zinc-400">Quiz questions</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="flex items-center gap-3 p-4">
              <Target className="h-5 w-5 text-indigo-600" />
              <div>
                <p className="text-xl font-bold">{topics.length * 8}+</p>
                <p className="text-xs text-zinc-500 dark:text-zinc-400">Flashcards</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Topic list grouped by paper */}
        {(() => {
          const papers = [...new Set(topics.map((t) => t.paper))];
          return papers.map((paper) => {
            const paperTopics = topics.filter((t) => t.paper === paper);
            return (
              <div key={paper} className="mb-8">
                <h2 className="mb-4 text-lg font-semibold">{paper}</h2>
                <div className="space-y-2">
                  {paperTopics.map((topic, i) => (
                    <Link
                      key={topic.slug}
                      href={`/subjects/${board}/${subject}/${topic.slug}`}
                    >
                      <Card className="group cursor-pointer border-zinc-200 transition-all hover:border-indigo-300 hover:shadow-sm dark:border-zinc-800 dark:hover:border-indigo-700">
                        <CardContent className="flex items-center justify-between p-4">
                          <div className="flex items-center gap-3">
                            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-zinc-100 text-xs font-medium text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400">
                              {topic.orderIndex}
                            </span>
                            <div>
                              <p className="text-sm font-medium group-hover:text-indigo-600">
                                {topic.name}
                              </p>
                              <div className="mt-0.5 flex items-center gap-2 text-xs text-zinc-500 dark:text-zinc-400">
                                <span>Spec: {topic.specRef}</span>
                                <span>&middot;</span>
                                <span>{topic.estimatedMinutes} min</span>
                                {topic.tier !== "both" && (
                                  <>
                                    <span>&middot;</span>
                                    <Badge variant="outline" className="text-[10px] px-1.5 py-0">
                                      {topic.tier === "higher" ? "Higher only" : "Foundation"}
                                    </Badge>
                                  </>
                                )}
                              </div>
                            </div>
                          </div>
                          <ArrowRight className="h-4 w-4 text-zinc-300 transition-colors group-hover:text-indigo-600 dark:text-zinc-600" />
                        </CardContent>
                      </Card>
                    </Link>
                  ))}
                </div>
              </div>
            );
          });
        })()}

        {/* CTA */}
        <Card className="mt-8 border-indigo-200 bg-indigo-50 dark:border-indigo-900 dark:bg-indigo-950/30">
          <CardContent className="p-6 text-center">
            <h2 className="text-lg font-semibold text-indigo-900 dark:text-indigo-100">
              Get a personalised revision plan for {subjectName}
            </h2>
            <p className="mt-2 text-sm text-indigo-700 dark:text-indigo-300">
              Sign up free to track your progress, get daily tasks, and see exactly what you need to revise.
            </p>
            <Link href="/auth/signup">
              <Button className="mt-4">
                Start revising for free <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>

      <Footer />
    </div>
  );
}
