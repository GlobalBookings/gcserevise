import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, CheckCircle2, ExternalLink, Info } from "lucide-react";
import { Footer } from "@/components/layout/footer";
import { Navbar } from "@/components/layout/navbar";
import { BreadcrumbJsonLd } from "@/components/seo/json-ld";
import { getPublishedSubjects } from "@/data/revision-library";
import { createPageMetadata } from "@/lib/seo";

type BoardCode = "aqa" | "edexcel" | "ocr";
type PageProps = { params: Promise<{ board: string }> };

const boardDetails: Record<BoardCode, {
  name: string;
  description: string;
  officialUrl: string;
  links: Array<{ name: string; href: string; official: string }>;
}> = {
  aqa: {
    name: "AQA",
    description: "Full GCSERevise topic routes are currently aligned to AQA specification references and official subject-content pages.",
    officialUrl: "https://www.aqa.org.uk/subjects",
    links: [],
  },
  edexcel: {
    name: "Pearson Edexcel",
    description: "Use the shared core-knowledge packs while checking Edexcel's specification structure, paper codes and assessment wording through the official qualification pages.",
    officialUrl: "https://qualifications.pearson.com/en/qualifications/edexcel-gcses.html",
    links: [
      { name: "Mathematics", href: "/subjects/aqa/maths", official: "https://qualifications.pearson.com/en/qualifications/edexcel-gcses/mathematics-2015.html" },
      { name: "Combined Science", href: "/subjects/aqa/combined-science", official: "https://qualifications.pearson.com/en/qualifications/edexcel-gcses/sciences-2016.html" },
      { name: "English Language", href: "/subjects/aqa/english-language", official: "https://qualifications.pearson.com/en/qualifications/edexcel-gcses/english-language-2015.html" },
      { name: "English Literature", href: "/subjects/aqa/english-literature", official: "https://qualifications.pearson.com/en/qualifications/edexcel-gcses/english-literature-2015.html" },
      { name: "Business", href: "/subjects/aqa/business", official: "https://qualifications.pearson.com/en/qualifications/edexcel-gcses/business-2017.html" },
    ],
  },
  ocr: {
    name: "OCR",
    description: "Use the shared core-knowledge packs alongside the exact OCR specification. OCR routes can differ in topic grouping, practical requirements and question style.",
    officialUrl: "https://www.ocr.org.uk/qualifications/gcse/",
    links: [
      { name: "Mathematics J560", href: "/subjects/aqa/maths", official: "https://www.ocr.org.uk/qualifications/gcse/mathematics-j560-from-2015/" },
      { name: "Combined Science A J250", href: "/subjects/aqa/combined-science", official: "https://www.ocr.org.uk/qualifications/gcse/gateway-science-suite-combined-science-a-j250-from-2016/" },
      { name: "English Language J351", href: "/subjects/aqa/english-language", official: "https://www.ocr.org.uk/qualifications/gcse/english-language-j351-from-2015/" },
      { name: "English Literature J352", href: "/subjects/aqa/english-literature", official: "https://www.ocr.org.uk/qualifications/gcse/english-literature-j352-from-2015/" },
      { name: "Computer Science J277", href: "/subjects/aqa/computer-science", official: "https://www.ocr.org.uk/qualifications/gcse/computer-science-j277-from-2020/" },
    ],
  },
};

export function generateStaticParams() {
  return Object.keys(boardDetails).map((board) => ({ board }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { board } = await params;
  const detail = boardDetails[board as BoardCode];
  if (!detail) return {};
  return createPageMetadata({
    title: `${detail.name} GCSE Revision Resources`,
    description: `${detail.name} GCSE revision routes, official specification links and clear guidance on using GCSERevise topic packs for your exam board.`,
    path: `/subjects/${board}`,
  });
}

export default async function BoardPage({ params }: PageProps) {
  const { board } = await params;
  const detail = boardDetails[board as BoardCode];
  if (!detail) notFound();
  const fullAqa = board === "aqa";
  const subjects = getPublishedSubjects();
  const baseUrl = "https://gcserevise.co.uk";
  return <div className="min-h-screen bg-slate-50"><Navbar /><BreadcrumbJsonLd items={[{ name: "Home", url: baseUrl }, { name: "Subjects", url: `${baseUrl}/subjects` }, { name: detail.name, url: `${baseUrl}/subjects/${board}` }]} /><section className="border-b border-slate-200 bg-white"><div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:px-8 lg:py-18"><span className="rounded-full bg-indigo-100 px-3 py-1.5 text-xs font-black text-indigo-700">{detail.name}</span><h1 className="mt-5 text-4xl font-black tracking-tight sm:text-5xl">{detail.name} GCSE revision</h1><p className="mt-4 max-w-3xl text-lg leading-8 text-slate-600">{detail.description}</p><a href={detail.officialUrl} target="_blank" rel="noopener noreferrer" className="mt-6 inline-flex items-center gap-2 text-sm font-black text-indigo-600">Open the official {detail.name} qualifications site <ExternalLink className="h-4 w-4" /></a></div></section><main className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">{!fullAqa && <div className="mb-8 flex gap-3 rounded-2xl border border-amber-200 bg-amber-50 p-5 text-sm leading-7 text-amber-950"><Info className="mt-1 h-5 w-5 shrink-0" /><p><strong>Board-aware, not falsely relabelled:</strong> the learning links below open GCSERevise&apos;s current core topic packs. Use the adjacent official link to confirm your board&apos;s exact scope, terminology and paper structure.</p></div>}{fullAqa ? <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">{subjects.map((subject) => <Link key={subject.slug} href={`/subjects/aqa/${subject.slug}`} className="group rounded-2xl border border-slate-200 bg-white p-5 transition hover:border-indigo-300 hover:shadow-lg"><div className="flex items-center justify-between"><h2 className="text-lg font-black group-hover:text-indigo-600">{subject.name}</h2><span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-bold text-slate-500">{subject.topics.length} topics</span></div><p className="mt-3 text-sm text-slate-500">Notes · Quiz · Flashcards · Practice · Tutor</p><span className="mt-5 flex items-center gap-2 text-sm font-black text-indigo-600">Open subject <ArrowRight className="h-4 w-4" /></span></Link>)}</div> : <div className="space-y-4">{detail.links.map((item) => <article key={item.name} className="grid gap-4 rounded-2xl border border-slate-200 bg-white p-5 sm:grid-cols-[1fr_auto] sm:items-center"><div><div className="flex items-center gap-2"><CheckCircle2 className="h-5 w-5 text-emerald-500" /><h2 className="text-lg font-black">{item.name}</h2></div><p className="mt-2 text-sm text-slate-500">Use the core learning pack, then confirm the exact board assessment requirements.</p></div><div className="flex flex-wrap gap-3"><Link href={item.href} className="rounded-xl bg-indigo-600 px-4 py-2.5 text-sm font-bold text-white">Core revision</Link><a href={item.official} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-xl border border-slate-300 px-4 py-2.5 text-sm font-bold">Official specification <ExternalLink className="h-4 w-4" /></a></div></article>)}</div>}</main><Footer /></div>;
}
