import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { BreadcrumbJsonLd, CourseJsonLd } from "@/components/seo/json-ld";
import { BookOpen, Brain, Target, ArrowRight, ExternalLink } from "lucide-react";
import Link from "next/link";
import type { Metadata } from "next";
import { createClient } from "@/lib/supabase/server";
import { BITESIZE_LINKS } from "@/data/bitesize-links";

type PageProps = {
  params: Promise<{ board: string; subject: string; topic: string }>;
};

const boardNames: Record<string, string> = {
  aqa: "AQA", edexcel: "Edexcel", ocr: "OCR", wjec: "WJEC", ccea: "CCEA",
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { board, subject, topic } = await params;
  const boardUpper = boardNames[board] || board.toUpperCase();
  const subjectTitle = subject.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
  const topicTitle = topic.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());

  return {
    title: `${topicTitle} - ${boardUpper} GCSE ${subjectTitle} Revision Notes`,
    description: `Free ${boardUpper} GCSE ${subjectTitle} revision notes for ${topicTitle}. Includes key terms, practice questions, quizzes and flashcards.`,
    alternates: { canonical: `https://gcserevise.co.uk/subjects/${board}/${subject}/${topic}` },
  };
}

export default async function TopicPage({ params }: PageProps) {
  const { board, subject, topic } = await params;
  const boardName = boardNames[board] || board.toUpperCase();
  const subjectTitle = subject.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());

  const supabase = await createClient();

  // Fetch topic data with notes, flashcards, and quiz count
  const { data: topicRow } = await supabase
    .from("topics")
    .select(`
      id, name, slug, spec_ref, tier, estimated_minutes, difficulty,
      subjects!inner(name, slug, exam_boards!inner(name, code))
    `)
    .eq("slug", topic)
    .limit(1)
    .single();

  const topicId = topicRow?.id;
  const topicName = topicRow?.name || topic.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
  const specRef = topicRow?.spec_ref || "";
  const tier = topicRow?.tier || "both";
  const estMinutes = topicRow?.estimated_minutes || 30;

  // Fetch revision notes
  const { data: notes } = topicId
    ? await supabase.from("revision_notes").select("content_html, summary, key_terms").eq("topic_id", topicId).limit(1).single()
    : { data: null };

  // Fetch flashcard count
  const { count: flashcardCount } = topicId
    ? await supabase.from("flashcards").select("id", { count: "exact", head: true }).eq("topic_id", topicId)
    : { count: 0 };

  // Fetch quiz count
  const { count: quizCount } = topicId
    ? await supabase.from("quiz_questions").select("id", { count: "exact", head: true }).eq("topic_id", topicId)
    : { count: 0 };

  // BBC Bitesize links for this topic
  const bitesizeLinks = BITESIZE_LINKS[topic] || [];

  const baseUrl = "https://gcserevise.co.uk";

  return (
    <div className="min-h-screen bg-white dark:bg-zinc-950">
      <Navbar />
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: baseUrl },
          { name: "Subjects", url: `${baseUrl}/subjects` },
          { name: boardName, url: `${baseUrl}/subjects/${board}` },
          { name: subjectTitle, url: `${baseUrl}/subjects/${board}/${subject}` },
          { name: topicName, url: `${baseUrl}/subjects/${board}/${subject}/${topic}` },
        ]}
      />
      <CourseJsonLd
        name={`${boardName} GCSE ${subjectTitle}: ${topicName}`}
        description={`Free revision notes for ${topicName} in ${boardName} GCSE ${subjectTitle}.`}
        provider="GCSERevise"
        url={`${baseUrl}/subjects/${board}/${subject}/${topic}`}
      />

      <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav className="mb-6 flex items-center gap-2 text-sm text-zinc-500 dark:text-zinc-400">
          <Link href="/subjects" className="hover:text-indigo-600">Subjects</Link>
          <span>/</span>
          <Link href={`/subjects/${board}`} className="hover:text-indigo-600">{boardName}</Link>
          <span>/</span>
          <Link href={`/subjects/${board}/${subject}`} className="hover:text-indigo-600">{subjectTitle}</Link>
          <span>/</span>
          <span className="text-zinc-900 dark:text-zinc-100">{topicName}</span>
        </nav>

        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-wrap items-center gap-2">
            <Badge>{boardName}</Badge>
            <Badge variant="secondary">{subjectTitle}</Badge>
            {specRef && <Badge variant="outline">Spec: {specRef}</Badge>}
            <Badge variant="outline">Tier: {tier === "both" ? "All tiers" : tier}</Badge>
          </div>
          <h1 className="mt-3 text-3xl font-bold">{topicName}</h1>
          <p className="mt-2 text-sm text-zinc-500 dark:text-zinc-400">
            Estimated study time: {estMinutes} minutes
            {quizCount ? ` · ${quizCount} quiz questions` : ""}
            {flashcardCount ? ` · ${flashcardCount} flashcards` : ""}
          </p>
        </div>

        {/* Quick actions */}
        <div className="mb-8 grid grid-cols-3 gap-3">
          <Link href={topicId ? `/dashboard/quizzes/${topicId}` : "/auth/signup"}>
            <Card className="cursor-pointer border-zinc-200 transition-all hover:border-indigo-300 hover:shadow-sm dark:border-zinc-800">
              <CardContent className="flex flex-col items-center gap-2 p-4 text-center">
                <Brain className="h-5 w-5 text-indigo-600" />
                <span className="text-sm font-medium">Take Quiz</span>
                {quizCount ? <span className="text-xs text-zinc-400">{quizCount} questions</span> : null}
              </CardContent>
            </Card>
          </Link>
          <Link href={topicId ? `/dashboard/flashcards/${topicId}` : "/auth/signup"}>
            <Card className="cursor-pointer border-zinc-200 transition-all hover:border-indigo-300 hover:shadow-sm dark:border-zinc-800">
              <CardContent className="flex flex-col items-center gap-2 p-4 text-center">
                <Target className="h-5 w-5 text-indigo-600" />
                <span className="text-sm font-medium">Flashcards</span>
                {flashcardCount ? <span className="text-xs text-zinc-400">{flashcardCount} cards</span> : null}
              </CardContent>
            </Card>
          </Link>
          <Link href="/auth/signup">
            <Card className="cursor-pointer border-zinc-200 transition-all hover:border-indigo-300 hover:shadow-sm dark:border-zinc-800">
              <CardContent className="flex flex-col items-center gap-2 p-4 text-center">
                <BookOpen className="h-5 w-5 text-indigo-600" />
                <span className="text-sm font-medium">Track Progress</span>
              </CardContent>
            </Card>
          </Link>
        </div>

        {/* Revision notes from Supabase */}
        {notes?.content_html && (
          <Card className="mb-8">
            <CardContent className="prose prose-zinc max-w-none p-6 dark:prose-invert prose-headings:font-semibold prose-h2:text-xl prose-h3:text-lg prose-h4:text-base prose-li:text-sm prose-p:text-sm prose-p:leading-relaxed">
              <div dangerouslySetInnerHTML={{ __html: notes.content_html }} />
            </CardContent>
          </Card>
        )}

        {/* Key terms */}
        {notes?.key_terms && notes.key_terms.length > 0 && (
          <Card className="mb-8">
            <CardContent className="p-6">
              <h2 className="mb-4 text-lg font-semibold">Key Terms</h2>
              <div className="flex flex-wrap gap-2">
                {notes.key_terms.map((term: string) => (
                  <Badge key={term} variant="secondary">{term}</Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* BBC Bitesize links */}
        {bitesizeLinks.length > 0 && (
          <Card className="mb-8">
            <CardContent className="p-6">
              <h2 className="mb-4 text-lg font-semibold">Verified Revision Resources</h2>
              <p className="mb-4 text-sm text-zinc-500 dark:text-zinc-400">
                Official curriculum-aligned content from BBC Bitesize
              </p>
              <div className="space-y-2">
                {bitesizeLinks.map((link) => (
                  <a
                    key={link.url}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between rounded-lg border border-zinc-200 p-3 transition-colors hover:border-indigo-300 hover:bg-indigo-50/50 dark:border-zinc-800 dark:hover:border-indigo-700 dark:hover:bg-indigo-950/20"
                  >
                    <div className="flex items-center gap-3">
                      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#00a651]/10">
                        <span className="text-xs font-bold text-[#00a651]">BBC</span>
                      </div>
                      <span className="text-sm font-medium">{link.title}</span>
                    </div>
                    <ExternalLink className="h-4 w-4 text-zinc-400" />
                  </a>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* No content fallback with Bitesize links */}
        {!notes?.content_html && bitesizeLinks.length === 0 && (
          <Card className="mb-8">
            <CardContent className="p-6 text-center">
              <BookOpen className="mx-auto h-8 w-8 text-zinc-300" />
              <p className="mt-3 text-sm text-zinc-500 dark:text-zinc-400">
                Revision notes for this topic are coming soon. In the meantime, use the quiz and flashcards above to test your knowledge.
              </p>
            </CardContent>
          </Card>
        )}

        {/* CTA */}
        <Card className="border-indigo-200 bg-indigo-50 dark:border-indigo-900 dark:bg-indigo-950/30">
          <CardContent className="p-6 text-center">
            <h2 className="text-lg font-semibold text-indigo-900 dark:text-indigo-100">
              Track your progress on this topic
            </h2>
            <p className="mt-2 text-sm text-indigo-700 dark:text-indigo-300">
              Sign up free to get personalised revision plans, quizzes, and progress tracking.
            </p>
            <Link href="/auth/signup">
              <Button className="mt-4">
                Sign up free <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>

      <Footer />
    </div>
  );
}
