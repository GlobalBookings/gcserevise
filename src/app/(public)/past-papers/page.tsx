import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { FileText, ExternalLink, Download, GraduationCap, ArrowRight } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "GCSE Past Papers & Mark Schemes - AQA",
  description: "Free AQA GCSE past papers and mark schemes for Maths, Biology, Chemistry, Physics, English Language and English Literature. Download official exam papers.",
  alternates: { canonical: "https://gcserevise.co.uk/past-papers" },
};

export default async function PastPapersPage() {
  const supabase = await createClient();

  const { data: papers } = await supabase
    .from("past_papers")
    .select("*, subjects(name, slug)")
    .order("year", { ascending: false })
    .order("session", { ascending: false });

  // Group by subject
  const grouped: Record<string, typeof papers> = {};
  for (const paper of papers || []) {
    const subjectName = (paper.subjects as { name: string })?.name || "Unknown";
    if (!grouped[subjectName]) grouped[subjectName] = [];
    grouped[subjectName]!.push(paper);
  }

  const subjectColors: Record<string, string> = {
    Mathematics: "bg-blue-500",
    Biology: "bg-emerald-500",
    Chemistry: "bg-amber-500",
    Physics: "bg-red-500",
    "English Language": "bg-purple-500",
    "English Literature": "bg-violet-500",
  };

  return (
    <div className="min-h-screen bg-white dark:bg-zinc-950">
      <Navbar />

      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-10">
          <Badge className="mb-3">AQA</Badge>
          <h1 className="text-3xl font-bold">GCSE Past Papers & Mark Schemes</h1>
          <p className="mt-2 text-zinc-500 dark:text-zinc-400">
            Official AQA GCSE past papers and mark schemes. Links go directly to AQA&apos;s website for verified, official documents.
          </p>
        </div>

        {/* Info banner */}
        <div className="mb-8 rounded-xl border border-indigo-200 bg-indigo-50 p-4 dark:border-indigo-900 dark:bg-indigo-950/30">
          <div className="flex items-start gap-3">
            <GraduationCap className="mt-0.5 h-5 w-5 flex-shrink-0 text-indigo-600" />
            <div>
              <p className="text-sm font-medium text-indigo-900 dark:text-indigo-200">
                Practising with past papers is one of the most effective revision strategies
              </p>
              <p className="mt-1 text-sm text-indigo-700 dark:text-indigo-300">
                Time yourself under exam conditions, then use the mark scheme to check your answers and identify areas to improve.
              </p>
            </div>
          </div>
        </div>

        {/* Papers by subject */}
        <div className="space-y-8">
          {Object.entries(grouped).map(([subjectName, subjectPapers]) => {
            const color = subjectColors[subjectName] || "bg-zinc-500";
            // Group by year
            const byYear: Record<number, typeof subjectPapers> = {};
            for (const p of subjectPapers || []) {
              if (!byYear[p.year]) byYear[p.year] = [];
              byYear[p.year]!.push(p);
            }

            return (
              <Card key={subjectName} className="overflow-hidden">
                <CardHeader className="border-b border-zinc-100 bg-zinc-50/50 dark:border-zinc-800 dark:bg-zinc-900/50">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`h-3 w-3 rounded-full ${color}`} />
                      <CardTitle>{subjectName}</CardTitle>
                    </div>
                    <Badge variant="outline">{(subjectPapers || []).length} papers</Badge>
                  </div>
                </CardHeader>
                <CardContent className="p-0">
                  {Object.entries(byYear)
                    .sort(([a], [b]) => Number(b) - Number(a))
                    .map(([year, yearPapers]) => (
                      <div key={year}>
                        <div className="border-b border-zinc-100 bg-zinc-50/30 px-6 py-2 dark:border-zinc-800 dark:bg-zinc-900/30">
                          <span className="text-xs font-semibold uppercase tracking-wider text-zinc-500">{year}</span>
                        </div>
                        <div className="divide-y divide-zinc-100 dark:divide-zinc-800">
                          {(yearPapers || []).map((paper, i) => (
                            <div
                              key={i}
                              className="flex items-center justify-between px-6 py-4 transition-colors hover:bg-zinc-50 dark:hover:bg-zinc-900/50"
                            >
                              <div className="flex items-center gap-3">
                                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-zinc-100 dark:bg-zinc-800">
                                  <FileText className="h-4 w-4 text-zinc-500" />
                                </div>
                                <div>
                                  <p className="text-sm font-medium">{paper.paper_name}</p>
                                  <div className="mt-0.5 flex items-center gap-2 text-xs text-zinc-500 dark:text-zinc-400">
                                    <span>{paper.session} {paper.year}</span>
                                    {paper.tier && (
                                      <>
                                        <span>&middot;</span>
                                        <Badge variant="outline" className="px-1.5 py-0 text-[10px]">
                                          {paper.tier}
                                        </Badge>
                                      </>
                                    )}
                                  </div>
                                </div>
                              </div>
                              <div className="flex items-center gap-2">
                                {paper.pdf_url && (
                                  <a href={paper.pdf_url} target="_blank" rel="noopener noreferrer">
                                    <Button variant="outline" size="sm" className="gap-1.5">
                                      <FileText className="h-3 w-3" />
                                      Paper
                                      <ExternalLink className="h-3 w-3 text-zinc-400" />
                                    </Button>
                                  </a>
                                )}
                                {paper.mark_scheme_url && (
                                  <a href={paper.mark_scheme_url} target="_blank" rel="noopener noreferrer">
                                    <Button variant="ghost" size="sm" className="gap-1.5">
                                      <FileText className="h-3 w-3" />
                                      Mark Scheme
                                      <ExternalLink className="h-3 w-3 text-zinc-400" />
                                    </Button>
                                  </a>
                                )}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* More papers link */}
        <div className="mt-8 text-center">
          <p className="text-sm text-zinc-500 dark:text-zinc-400">
            Need more papers or different tiers?
          </p>
          <a
            href="https://www.aqa.org.uk/find-past-papers-and-mark-schemes"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button variant="outline" className="mt-3">
              Browse all papers on AQA.org.uk
              <ExternalLink className="h-4 w-4" />
            </Button>
          </a>
        </div>

        {/* CTA */}
        <Card className="mt-12 border-indigo-200 bg-indigo-50 dark:border-indigo-900 dark:bg-indigo-950/30">
          <CardContent className="p-6 text-center">
            <h2 className="text-lg font-semibold text-indigo-900 dark:text-indigo-100">
              Track which papers you&apos;ve completed
            </h2>
            <p className="mt-2 text-sm text-indigo-700 dark:text-indigo-300">
              Sign up free to log your past paper practice, scores, and identify weak topics.
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
