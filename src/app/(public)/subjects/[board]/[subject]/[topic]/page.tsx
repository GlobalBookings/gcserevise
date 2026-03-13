import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { BreadcrumbJsonLd, CourseJsonLd } from "@/components/seo/json-ld";
import { BookOpen, Brain, Target, ArrowRight, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import type { Metadata } from "next";

// In production this would fetch from Supabase based on params
// Static placeholder for the build
const topicData = {
  board: "AQA",
  subject: "Biology",
  topic: "Cell Biology",
  specRef: "4.1",
  tier: "Both",
  estimatedMinutes: 45,
  notes: `
    <h2>Cell Structure</h2>
    <p>All living things are made of <strong>cells</strong>. Cells are the basic building blocks of all organisms.</p>
    
    <h3>Eukaryotic Cells</h3>
    <p>Eukaryotic cells are complex cells found in animals, plants, and fungi. They contain a <strong>nucleus</strong> that holds genetic material (DNA).</p>
    
    <h4>Animal Cell Structures:</h4>
    <ul>
      <li><strong>Nucleus</strong> - Contains DNA, controls cell activities</li>
      <li><strong>Cell membrane</strong> - Controls what enters and leaves the cell</li>
      <li><strong>Cytoplasm</strong> - Jelly-like substance where chemical reactions occur</li>
      <li><strong>Mitochondria</strong> - Site of aerobic respiration, releases energy</li>
      <li><strong>Ribosomes</strong> - Site of protein synthesis</li>
    </ul>
    
    <h4>Plant cells also contain:</h4>
    <ul>
      <li><strong>Cell wall</strong> - Made of cellulose, provides structural support</li>
      <li><strong>Chloroplasts</strong> - Contain chlorophyll for photosynthesis</li>
      <li><strong>Permanent vacuole</strong> - Filled with cell sap, maintains turgor pressure</li>
    </ul>
    
    <h3>Prokaryotic Cells</h3>
    <p>Prokaryotic cells are smaller and simpler than eukaryotic cells. Bacteria are prokaryotes.</p>
    <ul>
      <li>No true nucleus - DNA is a single loop floating in the cytoplasm</li>
      <li>May contain <strong>plasmids</strong> - small rings of extra DNA</li>
      <li>Have a cell membrane and cell wall</li>
      <li>Some have a <strong>flagellum</strong> for movement</li>
    </ul>
    
    <h3>Key Comparison</h3>
    <p>Typical animal cell: ~10-30 micrometres. Typical bacterial cell: ~1-5 micrometres. Eukaryotic cells are much larger than prokaryotic cells.</p>
  `,
  keyTerms: [
    "Eukaryotic", "Prokaryotic", "Nucleus", "Mitochondria",
    "Ribosome", "Chloroplast", "Cell membrane", "Cytoplasm",
    "Cell wall", "Plasmid", "Flagellum",
  ],
  sampleQuestions: [
    "Name three structures found in both plant and animal cells.",
    "Describe the function of mitochondria.",
    "Explain two differences between prokaryotic and eukaryotic cells.",
  ],
};

type PageProps = {
  params: Promise<{
    board: string;
    subject: string;
    topic: string;
  }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { board, subject, topic } = await params;
  const boardUpper = board.toUpperCase();
  const subjectTitle = subject.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
  const topicTitle = topic.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());

  return {
    title: `${topicTitle} - ${boardUpper} GCSE ${subjectTitle} Revision Notes`,
    description: `Free ${boardUpper} GCSE ${subjectTitle} revision notes for ${topicTitle}. Includes key terms, practice questions, quizzes and flashcards.`,
    alternates: { canonical: `https://gcserevise.co.uk/subjects/${board}/${subject}/${topic}` },
  };
}

export default async function TopicPage({ params }: PageProps) {
  const { board } = await params;

  return (
    <div className="min-h-screen bg-white dark:bg-zinc-950">
      <Navbar />
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: "https://gcserevise.co.uk" },
          { name: "Subjects", url: "https://gcserevise.co.uk/subjects" },
          { name: topicData.board, url: `https://gcserevise.co.uk/subjects/${board}` },
          { name: topicData.subject, url: `https://gcserevise.co.uk/subjects/${board}/${topicData.subject.toLowerCase()}` },
          { name: topicData.topic, url: `https://gcserevise.co.uk/subjects/${board}/${topicData.subject.toLowerCase()}/${topicData.topic.toLowerCase().replace(/ /g, "-")}` },
        ]}
      />
      <CourseJsonLd
        name={`${topicData.board} GCSE ${topicData.subject}: ${topicData.topic}`}
        description={`Free revision notes for ${topicData.topic} in ${topicData.board} GCSE ${topicData.subject}.`}
        provider="GCSERevise"
        url={`https://gcserevise.co.uk/subjects/${board}/${topicData.subject.toLowerCase()}/${topicData.topic.toLowerCase().replace(/ /g, "-")}`}
      />

      <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav className="mb-6 flex items-center gap-2 text-sm text-zinc-500 dark:text-zinc-400">
          <Link href="/subjects" className="hover:text-indigo-600">Subjects</Link>
          <span>/</span>
          <Link href={`/subjects/${board}`} className="hover:text-indigo-600">{topicData.board}</Link>
          <span>/</span>
          <Link href={`/subjects/${board}/${topicData.subject.toLowerCase()}`} className="hover:text-indigo-600">
            {topicData.subject}
          </Link>
          <span>/</span>
          <span className="text-zinc-900 dark:text-zinc-100">{topicData.topic}</span>
        </nav>

        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-wrap items-center gap-2">
            <Badge>{topicData.board}</Badge>
            <Badge variant="secondary">{topicData.subject}</Badge>
            <Badge variant="outline">Spec: {topicData.specRef}</Badge>
            <Badge variant="outline">Tier: {topicData.tier}</Badge>
          </div>
          <h1 className="mt-3 text-3xl font-bold">{topicData.topic}</h1>
          <p className="mt-2 text-sm text-zinc-500 dark:text-zinc-400">
            Estimated study time: {topicData.estimatedMinutes} minutes
          </p>
        </div>

        {/* Quick actions */}
        <div className="mb-8 grid grid-cols-3 gap-3">
          <Link href="/auth/signup">
            <Card className="cursor-pointer border-zinc-200 transition-all hover:border-indigo-300 hover:shadow-sm dark:border-zinc-800">
              <CardContent className="flex flex-col items-center gap-2 p-4 text-center">
                <Brain className="h-5 w-5 text-indigo-600" />
                <span className="text-sm font-medium">Take Quiz</span>
              </CardContent>
            </Card>
          </Link>
          <Link href="/auth/signup">
            <Card className="cursor-pointer border-zinc-200 transition-all hover:border-indigo-300 hover:shadow-sm dark:border-zinc-800">
              <CardContent className="flex flex-col items-center gap-2 p-4 text-center">
                <Target className="h-5 w-5 text-indigo-600" />
                <span className="text-sm font-medium">Flashcards</span>
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

        {/* Revision notes */}
        <Card className="mb-8">
          <CardContent className="prose prose-zinc max-w-none p-6 dark:prose-invert prose-headings:font-semibold prose-h2:text-xl prose-h3:text-lg prose-h4:text-base prose-li:text-sm prose-p:text-sm prose-p:leading-relaxed">
            <div dangerouslySetInnerHTML={{ __html: topicData.notes }} />
          </CardContent>
        </Card>

        {/* Key terms */}
        <Card className="mb-8">
          <CardContent className="p-6">
            <h2 className="mb-4 text-lg font-semibold">Key Terms</h2>
            <div className="flex flex-wrap gap-2">
              {topicData.keyTerms.map((term) => (
                <Badge key={term} variant="secondary">{term}</Badge>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Sample questions */}
        <Card className="mb-8">
          <CardContent className="p-6">
            <h2 className="mb-4 text-lg font-semibold">Practice Questions</h2>
            <div className="space-y-3">
              {topicData.sampleQuestions.map((q, i) => (
                <div key={i} className="flex gap-3 rounded-lg border border-zinc-200 p-4 dark:border-zinc-800">
                  <span className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-indigo-100 text-xs font-medium text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300">
                    {i + 1}
                  </span>
                  <p className="text-sm">{q}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

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
