import Link from "next/link";
import type { Metadata } from "next";
import { ArrowRight, Atom, BookOpenText, BriefcaseBusiness, Code2, Dna, FlaskConical, History, Landmark, LandPlot, LibraryBig, Microscope, Sigma } from "lucide-react";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { getPublishedSubjects } from "@/data/revision-library";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "GCSE Revision Subjects",
  description: "Explore free GCSE revision for Maths, English, Science, Geography, History, Business, Computer Science and Religious Studies, organised by topic.",
  path: "/subjects",
});

const presentation = {
  maths: { icon: Sigma, tone: "subject-blue", line: "Methods, worked knowledge and exam-style recall" },
  biology: { icon: Dna, tone: "subject-green", line: "Processes, structures, practicals and precise vocabulary" },
  chemistry: { icon: FlaskConical, tone: "subject-orange", line: "Particles, reactions, calculations and analysis" },
  physics: { icon: Atom, tone: "subject-purple", line: "Models, equations, units and explanations" },
  geography: { icon: LandPlot, tone: "subject-teal", line: "Processes, places, case-study thinking and evaluation" },
  history: { icon: History, tone: "subject-rose", line: "Evidence, causation, change and supported judgement" },
  "english-language": { icon: BookOpenText, tone: "subject-purple", line: "Reading analysis, comparison and confident writing" },
  "english-literature": { icon: LibraryBig, tone: "subject-blue", line: "Texts, themes, quotations and essay thinking" },
  "combined-science": { icon: Microscope, tone: "subject-teal", line: "A single route through Trilogy Biology, Chemistry and Physics" },
  "religious-studies": { icon: Landmark, tone: "subject-purple", line: "Beliefs, practices, ethics and supported evaluation" },
  "computer-science": { icon: Code2, tone: "subject-teal", line: "Algorithms, programming, systems, data and cyber security" },
  business: { icon: BriefcaseBusiness, tone: "subject-blue", line: "Case studies, operations, marketing, people and finance" },
};

export default function SubjectsPage() {
  const subjects = getPublishedSubjects();
  const combinedTopics = subjects.filter((subject) => ["biology", "chemistry", "physics"].includes(subject.slug)).flatMap((subject) => subject.topics);
  const subjectCards = [{ name: "Combined Science: Trilogy", slug: "combined-science", topics: combinedTopics }, ...subjects];
  return (
    <div className="min-h-screen bg-slate-50 text-slate-950">
      <Navbar />
      <section className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-16 text-center sm:px-6 lg:px-8 lg:py-20">
          <span className="rounded-full bg-indigo-100 px-3 py-1.5 text-xs font-black text-indigo-700">AQA GCSE</span>
          <h1 className="mt-5 text-4xl font-black tracking-tight sm:text-5xl">What are you revising today?</h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg leading-8 text-slate-600">Pick a subject, choose a topic and start learning immediately. Your progress is saved automatically on this device.</p>
        </div>
      </section>
      <main className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {subjectCards.map((subject) => {
            const style = presentation[subject.slug as keyof typeof presentation];
            const Icon = style.icon;
            return (
              <Link key={subject.slug} href={`/subjects/aqa/${subject.slug}`} className={`subject-card ${style.tone} group rounded-3xl border bg-white p-6 transition hover:-translate-y-1 hover:shadow-xl`}>
                <div className="flex items-start justify-between"><div className="subject-icon flex h-13 w-13 items-center justify-center rounded-2xl"><Icon className="h-6 w-6" /></div><span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-bold text-slate-500">{subject.topics.length} topics</span></div>
                <h2 className="mt-6 text-2xl font-black">{subject.name}</h2>
                <p className="mt-2 min-h-12 text-sm leading-6 text-slate-500">{style.line}</p>
                <div className="mt-6 flex items-center gap-2 text-sm font-black text-slate-900 group-hover:text-indigo-600">Start revising <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" /></div>
              </Link>
            );
          })}
        </div>
        <div className="mt-12 rounded-2xl border border-indigo-100 bg-indigo-50 p-6 text-center"><p className="font-extrabold text-indigo-950">No account needed to start.</p><p className="mt-1 text-sm text-indigo-700">Revision progress is stored on this device. Create an account later when cloud sync and premium tools launch.</p></div>
      </main>
      <Footer />
    </div>
  );
}
