import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { FileText, Download, ExternalLink } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "GCSE Past Papers",
  description: "Free GCSE past papers and mark schemes for AQA, Edexcel, OCR and WJEC. Browse by subject, year and tier.",
};

const pastPapers = [
  {
    subject: "Mathematics",
    board: "AQA",
    papers: [
      { year: 2024, session: "June", name: "Paper 1 (Non-Calculator)", tier: "Higher", pdfUrl: "#", msUrl: "#" },
      { year: 2024, session: "June", name: "Paper 2 (Calculator)", tier: "Higher", pdfUrl: "#", msUrl: "#" },
      { year: 2024, session: "June", name: "Paper 3 (Calculator)", tier: "Higher", pdfUrl: "#", msUrl: "#" },
      { year: 2023, session: "June", name: "Paper 1 (Non-Calculator)", tier: "Higher", pdfUrl: "#", msUrl: "#" },
      { year: 2023, session: "June", name: "Paper 2 (Calculator)", tier: "Higher", pdfUrl: "#", msUrl: "#" },
    ],
  },
  {
    subject: "English Language",
    board: "AQA",
    papers: [
      { year: 2024, session: "June", name: "Paper 1 - Explorations in Creative Reading & Writing", tier: "Both", pdfUrl: "#", msUrl: "#" },
      { year: 2024, session: "June", name: "Paper 2 - Writers' Viewpoints & Perspectives", tier: "Both", pdfUrl: "#", msUrl: "#" },
      { year: 2023, session: "June", name: "Paper 1 - Explorations in Creative Reading & Writing", tier: "Both", pdfUrl: "#", msUrl: "#" },
    ],
  },
  {
    subject: "Biology",
    board: "AQA",
    papers: [
      { year: 2024, session: "June", name: "Paper 1", tier: "Higher", pdfUrl: "#", msUrl: "#" },
      { year: 2024, session: "June", name: "Paper 2", tier: "Higher", pdfUrl: "#", msUrl: "#" },
      { year: 2023, session: "June", name: "Paper 1", tier: "Higher", pdfUrl: "#", msUrl: "#" },
      { year: 2023, session: "June", name: "Paper 2", tier: "Higher", pdfUrl: "#", msUrl: "#" },
    ],
  },
  {
    subject: "Chemistry",
    board: "AQA",
    papers: [
      { year: 2024, session: "June", name: "Paper 1", tier: "Higher", pdfUrl: "#", msUrl: "#" },
      { year: 2024, session: "June", name: "Paper 2", tier: "Higher", pdfUrl: "#", msUrl: "#" },
      { year: 2023, session: "June", name: "Paper 1", tier: "Higher", pdfUrl: "#", msUrl: "#" },
    ],
  },
  {
    subject: "Physics",
    board: "AQA",
    papers: [
      { year: 2024, session: "June", name: "Paper 1", tier: "Higher", pdfUrl: "#", msUrl: "#" },
      { year: 2024, session: "June", name: "Paper 2", tier: "Higher", pdfUrl: "#", msUrl: "#" },
      { year: 2023, session: "June", name: "Paper 1", tier: "Higher", pdfUrl: "#", msUrl: "#" },
    ],
  },
];

export default function PastPapersPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-zinc-950">
      <Navbar />

      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="mb-10">
          <h1 className="text-3xl font-bold">GCSE Past Papers</h1>
          <p className="mt-2 text-zinc-500 dark:text-zinc-400">
            Free past papers and mark schemes for all major GCSE subjects. Practice with real exam questions.
          </p>
        </div>

        {/* Filter bar placeholder */}
        <div className="mb-8 flex flex-wrap gap-2">
          {["All Boards", "AQA", "Edexcel", "OCR", "WJEC"].map((board) => (
            <button
              key={board}
              className={`rounded-full border px-4 py-1.5 text-sm font-medium transition-colors ${
                board === "All Boards"
                  ? "border-indigo-500 bg-indigo-50 text-indigo-700 dark:border-indigo-600 dark:bg-indigo-950/50 dark:text-indigo-300"
                  : "border-zinc-200 text-zinc-600 hover:bg-zinc-50 dark:border-zinc-700 dark:text-zinc-400"
              }`}
            >
              {board}
            </button>
          ))}
        </div>

        <div className="space-y-8">
          {pastPapers.map((subject) => (
            <Card key={subject.subject}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>{subject.subject}</CardTitle>
                  <Badge>{subject.board}</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="divide-y divide-zinc-100 dark:divide-zinc-800">
                  {subject.papers.map((paper, i) => (
                    <div
                      key={i}
                      className="flex items-center justify-between py-3 first:pt-0 last:pb-0"
                    >
                      <div className="flex items-center gap-3">
                        <FileText className="h-4 w-4 text-zinc-400" />
                        <div>
                          <p className="text-sm font-medium">{paper.name}</p>
                          <p className="text-xs text-zinc-500 dark:text-zinc-400">
                            {paper.session} {paper.year} &middot; {paper.tier} tier
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button variant="outline" size="sm">
                          <FileText className="h-3 w-3" /> Paper
                        </Button>
                        <Button variant="ghost" size="sm">
                          <FileText className="h-3 w-3" /> Mark Scheme
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <Footer />
    </div>
  );
}
