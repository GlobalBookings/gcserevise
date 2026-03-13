import Link from "next/link";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { FAQJsonLd } from "@/components/seo/json-ld";
import {
  BookOpen,
  Brain,
  CalendarDays,
  BarChart3,
  Zap,
  Clock,
  Target,
  Users,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  GraduationCap,
  FlaskConical,
  Calculator,
  Globe,
  Monitor,
  ChevronDown,
} from "lucide-react";

const subjects = [
  { name: "Mathematics", icon: Calculator, topics: "Number, Algebra, Geometry, Statistics, Ratio", color: "bg-blue-500" },
  { name: "English Language", icon: BookOpen, topics: "Reading, Writing, Speaking & Listening", color: "bg-purple-500" },
  { name: "English Literature", icon: BookOpen, topics: "Shakespeare, Modern Texts, Poetry, Unseen Poetry", color: "bg-violet-500" },
  { name: "Biology", icon: FlaskConical, topics: "Cells, Organisation, Infection, Bioenergetics", color: "bg-emerald-500" },
  { name: "Chemistry", icon: FlaskConical, topics: "Atomic Structure, Bonding, Reactions, Organic", color: "bg-amber-500" },
  { name: "Physics", icon: Zap, topics: "Energy, Electricity, Forces, Waves, Magnetism", color: "bg-red-500" },
  { name: "History", icon: Globe, topics: "Medicine, Cold War, Elizabethan England, Weimar Germany", color: "bg-orange-500" },
  { name: "Geography", icon: Globe, topics: "Natural Hazards, Urban Issues, Physical Landscapes", color: "bg-teal-500" },
  { name: "Computer Science", icon: Monitor, topics: "Algorithms, Programming, Data, Networks, Cyber Security", color: "bg-indigo-500" },
];

const features = [
  {
    icon: CalendarDays,
    title: "Smart Revision Planner",
    description: "Get a personalised daily study plan that adapts to your confidence levels and exam dates.",
  },
  {
    icon: Brain,
    title: "Spaced Repetition",
    description: "Our algorithm ensures you review topics at the perfect intervals for maximum retention.",
  },
  {
    icon: BarChart3,
    title: "Progress Tracking",
    description: "Track your mastery across every subject. See exactly where you need to improve.",
  },
  {
    icon: Target,
    title: "All Exam Boards",
    description: "AQA, Edexcel, OCR, WJEC and CCEA. Content aligned to your specific specification.",
  },
  {
    icon: Zap,
    title: "Quizzes & Flashcards",
    description: "Test yourself with exam-style questions and flashcards for every topic.",
  },
  {
    icon: Clock,
    title: "Exam Prep Mode",
    description: "Automatically intensifies 4 weeks before your exams, focusing on weak areas.",
  },
];

const stats = [
  { value: "30+", label: "GCSE Subjects" },
  { value: "5", label: "Exam Boards" },
  { value: "1000+", label: "Topics Covered" },
  { value: "100%", label: "Free Forever" },
];

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white dark:bg-zinc-950">
      <Navbar />

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-50 via-white to-purple-50 dark:from-indigo-950/20 dark:via-zinc-950 dark:to-purple-950/20" />
        <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-28 lg:px-8 lg:py-36">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-indigo-200 bg-indigo-50 px-4 py-1.5 text-sm font-medium text-indigo-700 dark:border-indigo-800 dark:bg-indigo-950/50 dark:text-indigo-300">
              <Sparkles className="h-4 w-4" />
              Free for every UK student
            </div>
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
              GCSE revision,{" "}
              <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                sorted
              </span>
            </h1>
            <p className="mt-6 text-lg leading-8 text-zinc-600 dark:text-zinc-400">
              The free all-in-one revision platform for UK GCSE students. Personalised study plans, 
              revision notes, quizzes, and progress tracking for every subject and exam board.
            </p>
            <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
              <Link href="/auth/signup">
                <Button size="lg" className="w-full sm:w-auto">
                  Start revising for free
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <Link href="/subjects">
                <Button variant="outline" size="lg" className="w-full sm:w-auto">
                  Browse subjects
                </Button>
              </Link>
            </div>
            <p className="mt-4 text-sm text-zinc-400">
              No credit card. No catches. Just revision.
            </p>
          </div>
        </div>
      </section>

      {/* Stats bar */}
      <section className="border-y border-zinc-200 bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-900">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-4 px-4 py-8 sm:px-6 md:grid-cols-4 lg:px-8">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="text-2xl font-bold text-indigo-600 sm:text-3xl">{stat.value}</p>
              <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold">How it works</h2>
          <p className="mt-3 text-zinc-500 dark:text-zinc-400">Three steps to better revision</p>
        </div>
        <div className="mt-12 grid gap-8 md:grid-cols-3">
          {[
            { step: "1", title: "Sign up & pick your subjects", desc: "Choose your exam board and subjects. Set your tiers and target grades." },
            { step: "2", title: "Follow your daily plan", desc: "Get personalised tasks every day: revision, quizzes, and flashcards adapted to you." },
            { step: "3", title: "Track & improve", desc: "Watch your confidence grow. Our spaced repetition system ensures nothing is forgotten." },
          ].map((item) => (
            <div key={item.step} className="text-center">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-indigo-100 text-lg font-bold text-indigo-600 dark:bg-indigo-950/50">
                {item.step}
              </div>
              <h3 className="mt-4 text-lg font-semibold">{item.title}</h3>
              <p className="mt-2 text-sm text-zinc-500 dark:text-zinc-400">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="bg-zinc-50 dark:bg-zinc-900/50">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold">Everything you need to ace your GCSEs</h2>
            <p className="mt-3 text-zinc-500 dark:text-zinc-400">
              Built by students, for students
            </p>
          </div>
          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {features.map((feature) => (
              <Card key={feature.title} className="border-zinc-200 dark:border-zinc-800">
                <CardContent className="p-6">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-100 dark:bg-indigo-950/50">
                    <feature.icon className="h-5 w-5 text-indigo-600" />
                  </div>
                  <h3 className="mt-4 font-semibold">{feature.title}</h3>
                  <p className="mt-2 text-sm text-zinc-500 dark:text-zinc-400">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Subjects */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold">Complete GCSE coverage</h2>
          <p className="mt-3 text-zinc-500 dark:text-zinc-400">
            Every subject, every exam board, every topic
          </p>
        </div>
        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {subjects.map((subject) => (
            <Card key={subject.name} className="group cursor-pointer border-zinc-200 transition-shadow hover:shadow-md dark:border-zinc-800">
              <CardContent className="p-5">
                <div className="flex items-center gap-3">
                  <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${subject.color} text-white`}>
                    <subject.icon className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-semibold">{subject.name}</h3>
                    <p className="text-xs text-zinc-500 dark:text-zinc-400">{subject.topics}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        <div className="mt-8 text-center">
          <Link href="/subjects">
            <Button variant="outline">
              View all 30+ subjects
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-zinc-50 dark:bg-zinc-900/50">
        <FAQJsonLd
          faqs={[
            { question: "Is GCSERevise really free?", answer: "Yes, GCSERevise is 100% free for all UK students. No credit card required, no hidden charges, no premium tier needed to access content." },
            { question: "Which exam boards do you cover?", answer: "We cover all major UK exam boards: AQA, Edexcel (Pearson), OCR, WJEC/Eduqas, and CCEA. Content is aligned to each board's specific specification." },
            { question: "How does the revision planner work?", answer: "After you sign up and select your subjects, our algorithm generates a personalised daily revision plan using spaced repetition. Topics you find harder appear more frequently, and the system adapts based on your confidence ratings." },
            { question: "What subjects are available?", answer: "We cover 30+ GCSE subjects including Maths, English, all three Sciences, History, Geography, Computer Science, Languages, and many more. Each subject has complete topic coverage with notes, quizzes, and flashcards." },
            { question: "Can I use this on my phone?", answer: "Yes, GCSERevise is fully mobile-responsive and works on any device with a web browser. You can revise on your phone, tablet, laptop, or desktop." },
          ]}
        />
        <div className="mx-auto max-w-3xl px-4 py-20 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold">Frequently asked questions</h2>
          </div>
          <div className="space-y-4">
            {[
              { q: "Is GCSERevise really free?", a: "Yes, GCSERevise is 100% free for all UK students. No credit card required, no hidden charges, no premium tier needed to access content." },
              { q: "Which exam boards do you cover?", a: "We cover all major UK exam boards: AQA, Edexcel (Pearson), OCR, WJEC/Eduqas, and CCEA. Content is aligned to each board's specific specification." },
              { q: "How does the revision planner work?", a: "After you sign up and select your subjects, our algorithm generates a personalised daily revision plan using spaced repetition. Topics you find harder appear more frequently, and the system adapts based on your confidence ratings." },
              { q: "What subjects are available?", a: "We cover 30+ GCSE subjects including Maths, English, all three Sciences, History, Geography, Computer Science, Languages, and many more." },
              { q: "Can I use this on my phone?", a: "Yes, GCSERevise is fully mobile-responsive and works on any device with a web browser." },
            ].map((faq) => (
              <details key={faq.q} className="group rounded-lg border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-900">
                <summary className="flex cursor-pointer items-center justify-between font-medium">
                  {faq.q}
                  <ChevronDown className="h-4 w-4 text-zinc-400 transition-transform group-open:rotate-180" />
                </summary>
                <p className="mt-3 text-sm text-zinc-500 dark:text-zinc-400">{faq.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-indigo-600 dark:bg-indigo-950">
        <div className="mx-auto max-w-4xl px-4 py-16 text-center sm:px-6 lg:px-8">
          <GraduationCap className="mx-auto h-10 w-10 text-indigo-200" />
          <h2 className="mt-4 text-3xl font-bold text-white">
            Ready to start revising?
          </h2>
          <p className="mt-3 text-indigo-200">
            Join thousands of UK students preparing for their GCSEs with smart, structured revision.
          </p>
          <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
            <Link href="/auth/signup">
              <Button size="lg" className="bg-white text-indigo-600 hover:bg-indigo-50">
                Sign up for free
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
          <div className="mt-6 flex items-center justify-center gap-6 text-sm text-indigo-200">
            <span className="flex items-center gap-1"><CheckCircle2 className="h-4 w-4" /> No payment needed</span>
            <span className="flex items-center gap-1"><CheckCircle2 className="h-4 w-4" /> All exam boards</span>
            <span className="flex items-center gap-1"><CheckCircle2 className="h-4 w-4" /> All subjects</span>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
