import Link from "next/link";
import {
  ArrowRight,
  Atom,
  Bot,
  BookOpenText,
  Brain,
  Check,
  ChevronRight,
  CircleCheck,
  Clock3,
  Dna,
  FileText,
  Flame,
  FlaskConical,
  History,
  LandPlot,
  Layers3,
  LibraryBig,
  Microscope,
  Sigma,
  Sparkles,
  Target,
  Trophy,
  Zap,
} from "lucide-react";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { FAQJsonLd } from "@/components/seo/json-ld";

const subjects = [
  {
    name: "Combined Science",
    slug: "combined-science",
    icon: Microscope,
    description: "AQA Trilogy Biology, Chemistry, Physics and required practicals",
    topics: 32,
    tone: "subject-teal",
  },
  {
    name: "Maths",
    slug: "maths",
    icon: Sigma,
    description: "Number, algebra, geometry, probability and statistics",
    topics: 24,
    tone: "subject-blue",
  },
  {
    name: "Biology",
    slug: "biology",
    icon: Dna,
    description: "Cells, organisation, infection, ecology and inheritance",
    topics: 14,
    tone: "subject-green",
  },
  {
    name: "Chemistry",
    slug: "chemistry",
    icon: FlaskConical,
    description: "Atomic structure, bonding, reactions and organic chemistry",
    topics: 10,
    tone: "subject-orange",
  },
  {
    name: "Physics",
    slug: "physics",
    icon: Atom,
    description: "Energy, electricity, forces, waves and magnetism",
    topics: 8,
    tone: "subject-purple",
  },
  {
    name: "Geography",
    slug: "geography",
    icon: LandPlot,
    description: "Hazards, landscapes, cities and the living world",
    topics: 8,
    tone: "subject-teal",
  },
  {
    name: "History",
    slug: "history",
    icon: History,
    description: "Germany, medicine, conflict and Elizabethan England",
    topics: 8,
    tone: "subject-rose",
  },
  {
    name: "English Language",
    slug: "english-language",
    icon: BookOpenText,
    description: "Fiction, non-fiction, comparison and confident writing",
    topics: 8,
    tone: "subject-purple",
  },
  {
    name: "English Literature",
    slug: "english-literature",
    icon: LibraryBig,
    description: "Texts, themes, quotations and essay interpretation",
    topics: 7,
    tone: "subject-blue",
  },
];

const studyTools = [
  { icon: FileText, title: "Crystal-clear notes", text: "Specification-matched explanations without the waffle.", color: "text-blue-600 bg-blue-50" },
  { icon: Brain, title: "Quick-fire quizzes", text: "Find gaps fast with instant feedback and worked answers.", color: "text-violet-600 bg-violet-50" },
  { icon: Layers3, title: "Active-recall flashcards", text: "Rate every card honestly and repeat the knowledge that needs work.", color: "text-amber-600 bg-amber-50" },
  { icon: FileText, title: "Past papers", text: "Practise exam questions with mark schemes in one place.", color: "text-emerald-600 bg-emerald-50" },
  { icon: Bot, title: "AI tutor", text: "Ask for a hint, a simpler explanation or a practice question.", color: "text-fuchsia-600 bg-fuchsia-50" },
];

const faqs = [
  { question: "Can I use GCSERevise for free?", answer: "Yes. Every published study pack, quiz, flashcard deck, guided tutor and progress dashboard is available without an account. Premium features such as cloud sync and expanded live AI support are planned for later." },
  { question: "Which subjects do you cover?", answer: "GCSERevise currently covers nine high-demand AQA routes: Combined Science, Maths, Biology, Chemistry, Physics, Geography, History, English Language and English Literature. Each is broken into manageable specification-aligned topics." },
  { question: "Which exam boards are supported?", answer: "We are building coverage for the major UK exam boards, beginning with AQA and expanding the same topic-level experience across Edexcel and OCR." },
  { question: "How does the AI tutor help?", answer: "The AI tutor is designed for revision. It can explain a topic in simpler language, give a hint without revealing the answer, quiz you, or help you understand where an exam response lost marks." },
];

export default function HomePage() {
  return (
    <div className="min-h-screen overflow-hidden bg-[#fbfcff] text-slate-950">
      <Navbar />

      <main>
        <section className="hero-grid relative border-b border-slate-200/70">
          <div className="absolute left-1/2 top-14 h-72 w-72 -translate-x-1/2 rounded-full bg-indigo-300/20 blur-3xl" />
          <div className="relative mx-auto grid max-w-7xl gap-14 px-4 pb-20 pt-16 sm:px-6 sm:pt-24 lg:grid-cols-[1.02fr_.98fr] lg:items-center lg:px-8 lg:pb-28 lg:pt-28">
            <div className="max-w-2xl">
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-indigo-200 bg-white px-3.5 py-2 text-sm font-semibold text-indigo-700 shadow-sm shadow-indigo-100">
                <Sparkles className="h-4 w-4" />
                Built for GCSE students, not textbooks
              </div>
              <h1 className="text-balance text-5xl font-black tracking-[-0.045em] text-slate-950 sm:text-6xl lg:text-[4.55rem] lg:leading-[.98]">
                Know what to revise. <span className="text-indigo-600">Remember it.</span>
              </h1>
              <p className="mt-7 max-w-xl text-lg leading-8 text-slate-600 sm:text-xl">
                Notes, quizzes, flashcards, past papers and an AI tutor—organised around the exact topics in your GCSEs.
              </p>
              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <Link href="/subjects" className="inline-flex h-13 items-center justify-center gap-2 rounded-xl bg-indigo-600 px-6 font-bold text-white shadow-lg shadow-indigo-200 transition hover:-translate-y-0.5 hover:bg-indigo-700">
                  Start revising free <ArrowRight className="h-4 w-4" />
                </Link>
                <Link href="/subjects" className="inline-flex h-13 items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white px-6 font-bold text-slate-700 shadow-sm transition hover:border-slate-400 hover:bg-slate-50">
                  Explore subjects
                </Link>
              </div>
              <div className="mt-7 flex flex-wrap gap-x-5 gap-y-2 text-sm font-medium text-slate-500">
                <span className="flex items-center gap-1.5"><CircleCheck className="h-4 w-4 text-emerald-500" /> Start for free</span>
                <span className="flex items-center gap-1.5"><CircleCheck className="h-4 w-4 text-emerald-500" /> No card needed</span>
                <span className="flex items-center gap-1.5"><CircleCheck className="h-4 w-4 text-emerald-500" /> Made for UK GCSEs</span>
              </div>
            </div>

            <div className="relative mx-auto w-full max-w-xl lg:mx-0">
              <div className="absolute -inset-8 rounded-full bg-gradient-to-br from-indigo-300/30 to-cyan-200/20 blur-3xl" />
              <div className="relative rotate-[1.5deg] rounded-[1.75rem] border border-slate-200 bg-white p-3 shadow-2xl shadow-slate-300/50">
                <div className="rounded-[1.25rem] bg-slate-50 p-4 sm:p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs font-bold uppercase tracking-[.18em] text-indigo-600">Today&apos;s plan</p>
                      <h2 className="mt-1 text-xl font-extrabold text-slate-900">Ready for a 20-minute win?</h2>
                    </div>
                    <div className="flex items-center gap-1 rounded-full bg-orange-50 px-3 py-1.5 text-sm font-bold text-orange-600"><Flame className="h-4 w-4 fill-orange-500" /> 7</div>
                  </div>

                  <div className="mt-5 rounded-2xl border border-indigo-100 bg-white p-4 shadow-sm">
                    <div className="flex items-start gap-3">
                      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-100 text-blue-700"><Sigma className="h-5 w-5" /></div>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center justify-between gap-3">
                          <div>
                            <p className="font-extrabold text-slate-900">Quadratic equations</p>
                            <p className="mt-0.5 text-sm text-slate-500">Maths · Algebra</p>
                          </div>
                          <span className="rounded-full bg-amber-50 px-2.5 py-1 text-xs font-bold text-amber-700">Needs work</span>
                        </div>
                        <div className="mt-4 grid grid-cols-3 gap-2">
                          <div className="rounded-lg bg-slate-50 px-2 py-2 text-center text-xs font-semibold text-slate-600"><FileText className="mx-auto mb-1 h-4 w-4 text-blue-500" /> Notes</div>
                          <div className="rounded-lg bg-indigo-600 px-2 py-2 text-center text-xs font-semibold text-white shadow-sm"><Brain className="mx-auto mb-1 h-4 w-4" /> Quiz</div>
                          <div className="rounded-lg bg-slate-50 px-2 py-2 text-center text-xs font-semibold text-slate-600"><Bot className="mx-auto mb-1 h-4 w-4 text-fuchsia-500" /> Ask AI</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-3 grid grid-cols-2 gap-3">
                    <div className="rounded-2xl border border-slate-200 bg-white p-4">
                      <div className="flex items-center gap-2 text-sm font-bold text-slate-700"><Target className="h-4 w-4 text-emerald-500" /> Weekly goal</div>
                      <div className="mt-4 h-2 rounded-full bg-slate-100"><div className="h-2 w-3/4 rounded-full bg-emerald-500" /></div>
                      <p className="mt-2 text-xs font-medium text-slate-500">6 of 8 sessions</p>
                    </div>
                    <div className="rounded-2xl bg-slate-950 p-4 text-white">
                      <div className="flex items-center gap-2 text-sm font-bold"><Trophy className="h-4 w-4 text-amber-400" /> Topic mastery</div>
                      <p className="mt-2 text-3xl font-black">68<span className="text-base text-slate-400">%</span></p>
                      <p className="text-xs text-slate-400">Up 12% this week</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="absolute -bottom-7 -left-3 -rotate-3 rounded-2xl border border-emerald-100 bg-white px-4 py-3 shadow-xl sm:-left-10">
                <div className="flex items-center gap-3"><div className="flex h-9 w-9 items-center justify-center rounded-full bg-emerald-100"><Check className="h-5 w-5 text-emerald-600" /></div><div><p className="text-sm font-extrabold">Answer nailed</p><p className="text-xs text-slate-500">+40 XP earned</p></div></div>
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
          <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
            <div>
              <p className="eyebrow">Pick a subject</p>
              <h2 className="mt-3 text-3xl font-black tracking-tight text-slate-950 sm:text-4xl">Nine subject routes. One place to master them.</h2>
              <p className="mt-3 max-w-2xl text-lg text-slate-600">Every topic follows the same simple path: learn it, test it, remember it.</p>
            </div>
            <Link href="/subjects" className="group flex items-center gap-1 text-sm font-bold text-indigo-600">Browse all topics <ChevronRight className="h-4 w-4 transition group-hover:translate-x-1" /></Link>
          </div>

          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {subjects.map((subject) => (
              <Link key={subject.name} href={`/subjects/aqa/${subject.slug}`} className={`subject-card ${subject.tone} group rounded-2xl border bg-white p-5 transition duration-200 hover:-translate-y-1 hover:shadow-xl`}>
                <div className="flex items-start justify-between gap-4">
                  <div className="subject-icon flex h-12 w-12 items-center justify-center rounded-xl"><subject.icon className="h-6 w-6" /></div>
                  <span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-bold text-slate-500">{subject.topics} topics</span>
                </div>
                <h3 className="mt-5 text-xl font-black text-slate-900">{subject.name}</h3>
                <p className="mt-2 min-h-12 text-sm leading-6 text-slate-500">{subject.description}</p>
                <div className="mt-5 flex items-center gap-1 text-sm font-bold text-slate-800">Start revising <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" /></div>
              </Link>
            ))}
          </div>
        </section>

        <section className="border-y border-slate-200 bg-white">
          <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
            <div className="mx-auto max-w-2xl text-center">
              <p className="eyebrow">Everything connects</p>
              <h2 className="mt-3 text-3xl font-black tracking-tight text-slate-950 sm:text-4xl">One topic. Five ways to make it stick.</h2>
              <p className="mt-4 text-lg text-slate-600">Stop hopping between tabs. Move from learning to exam practice without losing your place.</p>
            </div>
            <div className="mt-12 grid gap-4 md:grid-cols-5">
              {studyTools.map((tool, index) => (
                <div key={tool.title} className="relative rounded-2xl border border-slate-200 bg-[#fbfcff] p-5">
                  {index < studyTools.length - 1 && <ChevronRight className="absolute -right-3 top-8 z-10 hidden h-5 w-5 rounded-full border border-slate-200 bg-white text-slate-400 md:block" />}
                  <div className={`flex h-10 w-10 items-center justify-center rounded-xl ${tool.color}`}><tool.icon className="h-5 w-5" /></div>
                  <h3 className="mt-4 font-extrabold text-slate-900">{tool.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-slate-500">{tool.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="mx-auto grid max-w-7xl gap-12 px-4 py-20 sm:px-6 lg:grid-cols-2 lg:items-center lg:px-8 lg:py-28">
          <div className="relative order-2 lg:order-1">
            <div className="rounded-[1.75rem] bg-slate-950 p-6 text-white shadow-2xl shadow-slate-300 sm:p-8">
              <div className="flex items-center justify-between">
                <div><p className="text-xs font-bold uppercase tracking-[.18em] text-indigo-300">Your progress</p><h3 className="mt-2 text-2xl font-black">Strong work, Alex.</h3></div>
                <div className="rounded-xl bg-white/10 px-3 py-2 text-sm font-bold"><Zap className="mr-1 inline h-4 w-4 text-amber-400" /> 1,240 XP</div>
              </div>
              <div className="mt-8 space-y-5">
                {[{ name: "Biology", value: 82, color: "bg-emerald-400" }, { name: "Maths", value: 68, color: "bg-blue-400" }, { name: "Chemistry", value: 54, color: "bg-amber-400" }].map((item) => (
                  <div key={item.name}>
                    <div className="mb-2 flex justify-between text-sm font-bold"><span>{item.name}</span><span className="text-slate-400">{item.value}% mastered</span></div>
                    <div className="h-2.5 rounded-full bg-white/10"><div className={`h-2.5 rounded-full ${item.color}`} style={{ width: `${item.value}%` }} /></div>
                  </div>
                ))}
              </div>
              <div className="mt-8 grid grid-cols-3 gap-3 border-t border-white/10 pt-6 text-center">
                <div><p className="text-2xl font-black">12</p><p className="mt-1 text-xs text-slate-400">Topics mastered</p></div>
                <div><p className="text-2xl font-black">7</p><p className="mt-1 text-xs text-slate-400">Day streak</p></div>
                <div><p className="text-2xl font-black">84%</p><p className="mt-1 text-xs text-slate-400">Quiz average</p></div>
              </div>
            </div>
          </div>
          <div className="order-1 lg:order-2">
            <p className="eyebrow">Revision that adapts</p>
            <h2 className="mt-3 text-3xl font-black tracking-tight text-slate-950 sm:text-4xl">Always know what to do next.</h2>
            <p className="mt-5 text-lg leading-8 text-slate-600">GCSERevise turns a huge syllabus into a clear daily plan. Hard topics come back sooner; mastered topics stay fresh without wasting your time.</p>
            <div className="mt-7 space-y-4">
              {[
                { icon: Target, title: "Focus on your weakest topics", text: "Confidence and quiz results decide what appears next." },
                { icon: Clock3, title: "Fit revision into your day", text: "Short, focused sessions make it easier to stay consistent." },
                { icon: Trophy, title: "See real progress", text: "Track mastery, streaks and quiz scores across every subject." },
              ].map((item) => (
                <div key={item.title} className="flex gap-4"><div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600"><item.icon className="h-5 w-5" /></div><div><h3 className="font-extrabold text-slate-900">{item.title}</h3><p className="mt-1 text-sm leading-6 text-slate-500">{item.text}</p></div></div>
              ))}
            </div>
          </div>
        </section>

        <section id="premium" className="border-y border-indigo-100 bg-indigo-50/60">
          <div className="mx-auto grid max-w-7xl gap-10 px-4 py-20 sm:px-6 lg:grid-cols-[.9fr_1.1fr] lg:items-center lg:px-8 lg:py-24">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full bg-indigo-100 px-3 py-1.5 text-sm font-bold text-indigo-700"><Sparkles className="h-4 w-4" /> Free now. Premium later.</div>
              <h2 className="mt-5 text-3xl font-black tracking-tight text-slate-950 sm:text-4xl">Useful revision comes before the paywall.</h2>
              <p className="mt-4 text-lg leading-8 text-slate-600">The complete topic learning loop is available today. A future membership can add cloud sync, a deeper planner and expanded live tutor capacity without taking the essentials away.</p>
            </div>
            <div className="rounded-[1.75rem] border border-indigo-200 bg-white p-6 shadow-xl shadow-indigo-100 sm:p-8">
              <div className="flex items-end justify-between gap-4 border-b border-slate-100 pb-6">
                <div><p className="font-black text-slate-950">Available free today</p><p className="mt-1 text-sm text-slate-500">No card, account or upgrade required.</p></div>
                <Check className="h-7 w-7 text-emerald-600" />
              </div>
              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                {["87 complete topic workspaces", "435 auto-marked questions", "634 recall flashcards", "Guided topic tutor", "Device-saved mastery tracking", "Official AQA paper links"].map((feature) => (
                  <div key={feature} className="flex items-center gap-2 text-sm font-semibold text-slate-700"><Check className="h-4 w-4 shrink-0 text-emerald-500" /> {feature}</div>
                ))}
              </div>
              <div className="mt-7 grid gap-3 sm:grid-cols-2"><Link href="/subjects" className="flex h-12 items-center justify-center gap-2 rounded-xl bg-indigo-600 font-bold text-white shadow-lg shadow-indigo-200 transition hover:bg-indigo-700">Start revising now <ArrowRight className="h-4 w-4" /></Link><Link href="/premium" className="flex h-12 items-center justify-center rounded-xl border border-indigo-200 font-bold text-indigo-700">See Premium roadmap</Link></div>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-3xl px-4 py-20 sm:px-6 lg:py-24">
          <FAQJsonLd faqs={faqs} />
          <div className="text-center"><p className="eyebrow">Questions, answered</p><h2 className="mt-3 text-3xl font-black tracking-tight text-slate-950">Before you get started</h2></div>
          <div className="mt-10 space-y-3">
            {faqs.map((faq) => (
              <details key={faq.question} className="group rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-extrabold text-slate-900">{faq.question}<span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-slate-100 text-slate-500 transition group-open:rotate-45">+</span></summary>
                <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-600">{faq.answer}</p>
              </details>
            ))}
          </div>
        </section>

        <section className="px-4 pb-20 sm:px-6">
          <div className="mx-auto max-w-7xl overflow-hidden rounded-[2rem] bg-indigo-600 px-6 py-14 text-center text-white shadow-2xl shadow-indigo-200 sm:px-12 sm:py-16">
            <Sparkles className="mx-auto h-8 w-8 text-indigo-200" />
            <h2 className="mt-4 text-3xl font-black tracking-tight sm:text-4xl">Make today&apos;s revision count.</h2>
            <p className="mx-auto mt-4 max-w-xl text-lg text-indigo-100">Choose a subject, finish one topic, and build from there. Your future self will thank you.</p>
            <Link href="/subjects" className="mt-8 inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-white px-6 font-bold text-indigo-700 shadow-lg transition hover:-translate-y-0.5">Start revising free <ArrowRight className="h-4 w-4" /></Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
