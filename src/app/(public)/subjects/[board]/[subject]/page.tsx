import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArrowLeft, ExternalLink, Sparkles } from "lucide-react";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { SubjectTopicList } from "@/components/study/subject-topic-list";
import { BreadcrumbJsonLd, CourseJsonLd } from "@/components/seo/json-ld";
import { getPublishedSubjects, getSubject, OFFICIAL_SPEC_URLS } from "@/data/revision-library";

type PageProps = { params: Promise<{ board: string; subject: string }> };

export function generateStaticParams() {
  return getPublishedSubjects().map((subject) => ({ board: "aqa", subject: subject.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { board, subject } = await params;
  const subjectData = getSubject(subject);
  if (!subjectData) return {};
  return {
    title: `${board.toUpperCase()} GCSE ${subjectData.name} Revision`,
    description: `Complete ${board.toUpperCase()} GCSE ${subjectData.name} revision with notes, quizzes, flashcards and a guided topic tutor. Progress is saved automatically.`,
    alternates: { canonical: `https://gcserevise.co.uk/subjects/${board}/${subject}` },
  };
}

export default async function SubjectPage({ params }: PageProps) {
  const { board, subject: subjectSlug } = await params;
  const subject = getSubject(subjectSlug);
  if (!subject || board !== "aqa") notFound();
  const baseUrl = "https://gcserevise.co.uk";

  return (
    <div className="min-h-screen bg-slate-50 text-slate-950">
      <Navbar />
      <BreadcrumbJsonLd items={[
        { name: "Home", url: baseUrl },
        { name: "Subjects", url: `${baseUrl}/subjects` },
        { name: "AQA", url: `${baseUrl}/subjects/aqa` },
        { name: subject.name, url: `${baseUrl}/subjects/aqa/${subjectSlug}` },
      ]} />
      <CourseJsonLd name={`AQA GCSE ${subject.name}`} description={`Complete AQA GCSE ${subject.name} revision with notes, quizzes, flashcards and guided tutoring.`} provider="GCSERevise" url={`${baseUrl}/subjects/aqa/${subjectSlug}`} />

      <section className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
          <Link href="/subjects" className="inline-flex items-center gap-2 text-sm font-bold text-slate-500 hover:text-indigo-600"><ArrowLeft className="h-4 w-4" /> All subjects</Link>
          <div className="mt-7 flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
            <div>
              <div className="flex items-center gap-2"><span className="rounded-full bg-indigo-100 px-3 py-1 text-xs font-black text-indigo-700">AQA</span><span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-black text-emerald-700"><Sparkles className="mr-1 inline h-3 w-3" /> Ready to revise</span></div>
              <h1 className="mt-4 text-4xl font-black tracking-tight sm:text-5xl">GCSE {subject.name}</h1>
              <p className="mt-4 max-w-2xl text-lg leading-8 text-slate-600">Choose a topic and work through clear notes, a five-question knowledge check, recall flashcards and guided tutor support.</p>
            </div>
            <a href={OFFICIAL_SPEC_URLS[subjectSlug]} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-sm font-bold text-indigo-600">View official AQA specification <ExternalLink className="h-4 w-4" /></a>
          </div>
        </div>
      </section>

      <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
        <SubjectTopicList board={board} subjectSlug={subjectSlug} topics={subject.topics} />
      </main>
      <Footer />
    </div>
  );
}
