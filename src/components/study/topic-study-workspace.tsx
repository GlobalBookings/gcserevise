"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  Bot,
  Brain,
  Check,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  CircleAlert,
  ExternalLink,
  FileText,
  Lightbulb,
  LoaderCircle,
  RotateCcw,
  Send,
  Sparkles,
  Target,
  Trophy,
  X,
} from "lucide-react";
import type { RevisionFlashcard, RevisionQuestion } from "@/data/revision-library";
import { useLocalProgress, writeTopicProgress } from "@/hooks/use-local-progress";

type StudyTab = "learn" | "quiz" | "flashcards" | "tutor";

interface StoredProgress {
  notesRead: boolean;
  bestQuiz: number;
  flashcardsKnown: number;
  lastStudied: string;
}

interface TopicStudyWorkspaceProps {
  board: string;
  subjectName: string;
  subjectSlug: string;
  topicName: string;
  topicSlug: string;
  specRef: string;
  tier: string;
  estimatedMinutes: number;
  summary: string;
  examTip: string;
  flashcards: RevisionFlashcard[];
  questions: RevisionQuestion[];
  officialSpecUrl: string;
  previousTopic: { name: string; slug: string } | null;
  nextTopic: { name: string; slug: string } | null;
}

const EMPTY_PROGRESS: StoredProgress = {
  notesRead: false,
  bestQuiz: 0,
  flashcardsKnown: 0,
  lastStudied: "",
};

export function TopicStudyWorkspace(props: TopicStudyWorkspaceProps) {
  const {
    board,
    subjectName,
    subjectSlug,
    topicName,
    topicSlug,
    specRef,
    tier,
    estimatedMinutes,
    summary,
    examTip,
    flashcards,
    questions,
    officialSpecUrl,
    previousTopic,
    nextTopic,
  } = props;
  const progressKey = `${subjectSlug}:${topicSlug}`;
  const [tab, setTab] = useState<StudyTab>("learn");
  const progressStore = useLocalProgress();
  const progress = progressStore[progressKey] || EMPTY_PROGRESS;

  function saveProgress(update: Partial<StoredProgress>) {
    writeTopicProgress(progressKey, update);
  }

  const overallProgress = Math.round(
    (progress.notesRead ? 25 : 0) + progress.bestQuiz * 0.5 + progress.flashcardsKnown * 0.25
  );
  const mastered = progress.notesRead && progress.bestQuiz >= 80 && progress.flashcardsKnown >= 75;

  const tabs: Array<{ id: StudyTab; label: string; icon: typeof FileText; detail: string }> = [
    { id: "learn", label: "Learn", icon: FileText, detail: "Revision notes" },
    { id: "quiz", label: "Quiz", icon: Brain, detail: `${questions.length} questions` },
    { id: "flashcards", label: "Flashcards", icon: Target, detail: `${flashcards.length} cards` },
    { id: "tutor", label: "Tutor", icon: Bot, detail: "Ask for help" },
  ];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-950">
      <div className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <nav className="flex flex-wrap items-center gap-2 text-sm font-medium text-slate-500">
            <Link href="/subjects" className="hover:text-indigo-600">Subjects</Link>
            <span>/</span>
            <Link href={`/subjects/${board}/${subjectSlug}`} className="hover:text-indigo-600">{subjectName}</Link>
            <span>/</span>
            <span className="text-slate-900">{topicName}</span>
          </nav>

          <div className="mt-6 flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
            <div>
              <div className="flex flex-wrap items-center gap-2 text-xs font-bold">
                <span className="rounded-full bg-indigo-100 px-3 py-1 text-indigo-700">{board.toUpperCase()}</span>
                <span className="rounded-full bg-slate-100 px-3 py-1 text-slate-600">Spec {specRef}</span>
                <span className="rounded-full bg-slate-100 px-3 py-1 text-slate-600">{tier === "both" ? "Foundation & Higher" : `${tier[0].toUpperCase()}${tier.slice(1)} tier`}</span>
                <span className="rounded-full bg-slate-100 px-3 py-1 text-slate-600">~{estimatedMinutes} min</span>
              </div>
              <h1 className="mt-3 text-3xl font-black tracking-tight sm:text-4xl">{topicName}</h1>
              <p className="mt-2 text-slate-500">{subjectName} · Topic revision workspace</p>
            </div>
            <div className="w-full max-w-sm rounded-2xl border border-slate-200 bg-slate-50 p-4">
              <div className="flex items-center justify-between text-sm font-bold">
                <span>{mastered ? "Topic mastered" : "Topic progress"}</span>
                <span className={mastered ? "text-emerald-600" : "text-indigo-600"}>{overallProgress}%</span>
              </div>
              <div className="mt-2 h-2.5 overflow-hidden rounded-full bg-slate-200">
                <div className={`h-full rounded-full transition-all ${mastered ? "bg-emerald-500" : "bg-indigo-600"}`} style={{ width: `${overallProgress}%` }} />
              </div>
              <p className="mt-2 text-xs text-slate-500">Read the notes, score 80% and know 75% of the cards.</p>
            </div>
          </div>
        </div>
      </div>

      <div className="sticky top-16 z-30 border-b border-slate-200 bg-white/95 backdrop-blur-lg">
        <div className="mx-auto grid max-w-7xl grid-cols-4 px-2 sm:px-6 lg:px-8">
          {tabs.map((item) => (
            <button
              key={item.id}
              onClick={() => setTab(item.id)}
              className={`relative flex items-center justify-center gap-2 px-2 py-4 text-sm font-bold transition ${tab === item.id ? "text-indigo-600" : "text-slate-500 hover:text-slate-900"}`}
            >
              <item.icon className="h-4 w-4" />
              <span>{item.label}</span>
              <span className="hidden text-xs font-medium text-slate-400 md:inline">· {item.detail}</span>
              {tab === item.id && <span className="absolute inset-x-2 bottom-0 h-0.5 rounded-full bg-indigo-600" />}
            </button>
          ))}
        </div>
      </div>

      <main className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8 lg:py-12">
        {tab === "learn" && (
          <LearnPanel
            topicName={topicName}
            summary={summary}
            examTip={examTip}
            flashcards={flashcards}
            completed={progress.notesRead}
            onComplete={() => saveProgress({ notesRead: true })}
            onQuiz={() => setTab("quiz")}
          />
        )}
        {tab === "quiz" && (
          <QuizPanel
            topicName={topicName}
            questions={questions}
            bestScore={progress.bestQuiz}
            onFinish={(score) => saveProgress({ bestQuiz: Math.max(score, progress.bestQuiz) })}
            onCards={() => setTab("flashcards")}
          />
        )}
        {tab === "flashcards" && (
          <FlashcardPanel
            topicName={topicName}
            cards={flashcards}
            previousKnown={progress.flashcardsKnown}
            onFinish={(score) => saveProgress({ flashcardsKnown: Math.max(score, progress.flashcardsKnown) })}
            onTutor={() => setTab("tutor")}
          />
        )}
        {tab === "tutor" && (
          <TutorPanel subjectName={subjectName} subjectSlug={subjectSlug} topicName={topicName} topicSlug={topicSlug} />
        )}

        <div className="mt-10 grid gap-3 border-t border-slate-200 pt-6 sm:grid-cols-3">
          <div>
            {previousTopic && (
              <Link href={`/subjects/${board}/${subjectSlug}/${previousTopic.slug}`} className="flex h-full items-center gap-3 rounded-xl border border-slate-200 bg-white p-4 text-sm font-bold hover:border-indigo-300">
                <ChevronLeft className="h-4 w-4 text-slate-400" /><span><span className="block text-xs font-medium text-slate-400">Previous topic</span>{previousTopic.name}</span>
              </Link>
            )}
          </div>
          <a href={officialSpecUrl} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white p-4 text-sm font-bold text-slate-600 hover:border-indigo-300 hover:text-indigo-600">
            Official AQA specification <ExternalLink className="h-4 w-4" />
          </a>
          <div>
            {nextTopic && (
              <Link href={`/subjects/${board}/${subjectSlug}/${nextTopic.slug}`} className="flex h-full items-center justify-end gap-3 rounded-xl border border-slate-200 bg-white p-4 text-right text-sm font-bold hover:border-indigo-300">
                <span><span className="block text-xs font-medium text-slate-400">Next topic</span>{nextTopic.name}</span><ChevronRight className="h-4 w-4 text-slate-400" />
              </Link>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

function LearnPanel({ topicName, summary, examTip, flashcards, completed, onComplete, onQuiz }: {
  topicName: string;
  summary: string;
  examTip: string;
  flashcards: RevisionFlashcard[];
  completed: boolean;
  onComplete: () => void;
  onQuiz: () => void;
}) {
  return (
    <div className="space-y-6">
      <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
        <p className="text-xs font-black uppercase tracking-[.16em] text-indigo-600">Topic overview</p>
        <h2 className="mt-2 text-2xl font-black">What you need to know</h2>
        <p className="mt-4 text-base leading-8 text-slate-600">{summary}</p>
        <div className="mt-6 rounded-xl border border-amber-200 bg-amber-50 p-4">
          <div className="flex items-start gap-3">
            <Lightbulb className="mt-0.5 h-5 w-5 shrink-0 text-amber-600" />
            <div><p className="font-bold text-amber-900">Exam tip</p><p className="mt-1 text-sm leading-6 text-amber-800">{examTip}</p></div>
          </div>
        </div>
      </section>

      <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
        <div className="flex items-center justify-between gap-4">
          <div><p className="text-xs font-black uppercase tracking-[.16em] text-indigo-600">Core knowledge</p><h2 className="mt-2 text-2xl font-black">Key facts for {topicName}</h2></div>
          <span className="hidden rounded-full bg-slate-100 px-3 py-1 text-xs font-bold text-slate-500 sm:block">{flashcards.length} essentials</span>
        </div>
        <div className="mt-6 divide-y divide-slate-100">
          {flashcards.map((card, index) => (
            <div key={card.term} className="grid gap-2 py-5 sm:grid-cols-[2rem_12rem_1fr] sm:gap-4">
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-indigo-50 text-xs font-black text-indigo-600">{index + 1}</span>
              <h3 className="font-extrabold text-slate-900">{card.term}</h3>
              <p className="text-sm leading-7 text-slate-600">{card.definition}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="rounded-2xl bg-slate-950 p-6 text-white sm:flex sm:items-center sm:justify-between sm:p-8">
        <div className="flex items-start gap-4">
          <div className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full ${completed ? "bg-emerald-500" : "bg-white/10"}`}>
            {completed ? <Check className="h-5 w-5" /> : <FileText className="h-5 w-5" />}
          </div>
          <div><h2 className="text-xl font-black">{completed ? "Notes completed" : "Finished learning?"}</h2><p className="mt-1 text-sm text-slate-400">Mark the notes complete, then test what you can recall.</p></div>
        </div>
        <div className="mt-5 flex gap-3 sm:mt-0">
          {!completed && <button onClick={onComplete} className="rounded-xl bg-white/10 px-4 py-3 text-sm font-bold hover:bg-white/15">Mark complete</button>}
          <button onClick={onQuiz} className="flex items-center gap-2 rounded-xl bg-indigo-500 px-4 py-3 text-sm font-bold hover:bg-indigo-400">Take the quiz <ArrowRight className="h-4 w-4" /></button>
        </div>
      </section>
    </div>
  );
}

function QuizPanel({ topicName, questions, bestScore, onFinish, onCards }: {
  topicName: string;
  questions: RevisionQuestion[];
  bestScore: number;
  onFinish: (score: number) => void;
  onCards: () => void;
}) {
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [checked, setChecked] = useState(false);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);
  const question = questions[index];

  function checkAnswer() {
    if (selected === null || checked) return;
    setChecked(true);
    if (selected === question.correct_answer) setScore((value) => value + 1);
  }

  function nextQuestion() {
    if (index === questions.length - 1) {
      const percentage = Math.round((score / questions.length) * 100);
      setFinished(true);
      onFinish(percentage);
      return;
    }
    setIndex((value) => value + 1);
    setSelected(null);
    setChecked(false);
  }

  function restart() {
    setIndex(0); setSelected(null); setChecked(false); setScore(0); setFinished(false);
  }

  if (finished) {
    const percentage = Math.round((score / questions.length) * 100);
    return (
      <div className="rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-sm sm:p-12">
        <div className={`mx-auto flex h-20 w-20 items-center justify-center rounded-full ${percentage >= 80 ? "bg-emerald-100 text-emerald-600" : "bg-amber-100 text-amber-600"}`}>
          {percentage >= 80 ? <Trophy className="h-9 w-9" /> : <Brain className="h-9 w-9" />}
        </div>
        <p className="mt-6 text-sm font-black uppercase tracking-[.16em] text-indigo-600">Quiz complete</p>
        <h2 className="mt-2 text-3xl font-black">{percentage >= 80 ? "Brilliant recall." : "Good start—review the gaps."}</h2>
        <p className="mt-3 text-slate-500">You scored {score} out of {questions.length} on {topicName}.</p>
        <p className="mt-4 text-5xl font-black text-slate-950">{percentage}%</p>
        {bestScore > 0 && <p className="mt-2 text-sm text-slate-400">Previous best: {bestScore}%</p>}
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <button onClick={restart} className="flex items-center justify-center gap-2 rounded-xl border border-slate-300 px-5 py-3 text-sm font-bold hover:bg-slate-50"><RotateCcw className="h-4 w-4" /> Try again</button>
          <button onClick={onCards} className="flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-5 py-3 text-sm font-bold text-white hover:bg-indigo-700">Review flashcards <ArrowRight className="h-4 w-4" /></button>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl">
      <div className="mb-5 flex items-center justify-between">
        <div><p className="text-xs font-black uppercase tracking-[.16em] text-indigo-600">Question {index + 1} of {questions.length}</p><h2 className="mt-1 text-xl font-black">{topicName} quiz</h2></div>
        {bestScore > 0 && <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-700">Best {bestScore}%</span>}
      </div>
      <div className="mb-6 h-2 overflow-hidden rounded-full bg-slate-200"><div className="h-full rounded-full bg-indigo-600 transition-all" style={{ width: `${((index + 1) / questions.length) * 100}%` }} /></div>
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
        <h3 className="text-lg font-extrabold leading-8">{question.question}</h3>
        <div className="mt-6 space-y-3">
          {question.options.map((option, optionIndex) => {
            const correct = optionIndex === question.correct_answer;
            const chosen = optionIndex === selected;
            let classes = "border-slate-200 hover:border-indigo-300 hover:bg-indigo-50/40";
            if (checked && correct) classes = "border-emerald-500 bg-emerald-50 text-emerald-950";
            else if (checked && chosen) classes = "border-red-400 bg-red-50 text-red-950";
            else if (checked) classes = "border-slate-100 opacity-55";
            else if (chosen) classes = "border-indigo-500 bg-indigo-50 ring-2 ring-indigo-100";
            return (
              <button key={optionIndex} disabled={checked} onClick={() => setSelected(optionIndex)} className={`flex w-full items-start gap-3 rounded-xl border-2 p-4 text-left text-sm font-medium leading-6 transition ${classes}`}>
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-current text-xs font-black">{String.fromCharCode(65 + optionIndex)}</span>
                <span className="flex-1">{option}</span>
                {checked && correct && <CheckCircle2 className="h-5 w-5 shrink-0 text-emerald-600" />}
                {checked && chosen && !correct && <X className="h-5 w-5 shrink-0 text-red-500" />}
              </button>
            );
          })}
        </div>
        {checked && (
          <div className="mt-5 rounded-xl bg-blue-50 p-4 text-sm leading-6 text-blue-900"><strong>Why:</strong> {question.explanation}</div>
        )}
        <div className="mt-6 flex justify-end">
          {!checked ? (
            <button disabled={selected === null} onClick={checkAnswer} className="rounded-xl bg-indigo-600 px-5 py-3 text-sm font-bold text-white disabled:cursor-not-allowed disabled:opacity-40">Check answer</button>
          ) : (
            <button onClick={nextQuestion} className="flex items-center gap-2 rounded-xl bg-indigo-600 px-5 py-3 text-sm font-bold text-white">{index === questions.length - 1 ? "See results" : "Next question"}<ArrowRight className="h-4 w-4" /></button>
          )}
        </div>
      </div>
    </div>
  );
}

function FlashcardPanel({ topicName, cards, previousKnown, onFinish, onTutor }: {
  topicName: string;
  cards: RevisionFlashcard[];
  previousKnown: number;
  onFinish: (score: number) => void;
  onTutor: () => void;
}) {
  const [index, setIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [known, setKnown] = useState<Set<number>>(new Set());
  const [review, setReview] = useState<Set<number>>(new Set());
  const [finished, setFinished] = useState(false);

  function grade(gotIt: boolean) {
    const nextKnown = new Set(known);
    const nextReview = new Set(review);
    if (gotIt) { nextKnown.add(index); nextReview.delete(index); }
    else { nextReview.add(index); nextKnown.delete(index); }
    setKnown(nextKnown); setReview(nextReview);
    if (index === cards.length - 1) {
      const percentage = Math.round((nextKnown.size / cards.length) * 100);
      setFinished(true); onFinish(percentage);
    } else {
      setIndex((value) => value + 1); setFlipped(false);
    }
  }

  function restart() { setIndex(0); setFlipped(false); setKnown(new Set()); setReview(new Set()); setFinished(false); }

  if (finished) {
    const percentage = Math.round((known.size / cards.length) * 100);
    return (
      <div className="rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-sm sm:p-12">
        <Target className="mx-auto h-12 w-12 text-indigo-600" />
        <h2 className="mt-5 text-3xl font-black">Deck complete</h2>
        <p className="mt-3 text-slate-500">You knew {known.size} of {cards.length} cards for {topicName}.</p>
        <div className="mx-auto mt-7 grid max-w-sm grid-cols-2 gap-3">
          <div className="rounded-xl bg-emerald-50 p-4"><p className="text-3xl font-black text-emerald-600">{known.size}</p><p className="text-xs font-bold text-emerald-800">Got it</p></div>
          <div className="rounded-xl bg-amber-50 p-4"><p className="text-3xl font-black text-amber-600">{review.size}</p><p className="text-xs font-bold text-amber-800">Review again</p></div>
        </div>
        <p className="mt-4 text-sm font-bold text-slate-600">{percentage}% confident {previousKnown > percentage ? `· previous best ${previousKnown}%` : ""}</p>
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <button onClick={restart} className="flex items-center justify-center gap-2 rounded-xl border border-slate-300 px-5 py-3 text-sm font-bold"><RotateCcw className="h-4 w-4" /> Run the deck again</button>
          <button onClick={onTutor} className="flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-5 py-3 text-sm font-bold text-white"><Bot className="h-4 w-4" /> Ask the tutor</button>
        </div>
      </div>
    );
  }

  const card = cards[index];
  return (
    <div className="mx-auto max-w-2xl">
      <div className="mb-5 flex items-center justify-between"><div><p className="text-xs font-black uppercase tracking-[.16em] text-indigo-600">Card {index + 1} of {cards.length}</p><h2 className="mt-1 text-xl font-black">{topicName}</h2></div><div className="flex gap-2 text-xs font-bold"><span className="text-emerald-600">{known.size} known</span><span className="text-amber-600">{review.size} review</span></div></div>
      <div className="mb-6 h-2 overflow-hidden rounded-full bg-slate-200"><div className="h-full rounded-full bg-indigo-600" style={{ width: `${((index + 1) / cards.length) * 100}%` }} /></div>
      <button onClick={() => setFlipped((value) => !value)} className={`flex min-h-80 w-full flex-col items-center justify-center rounded-3xl border p-8 text-center shadow-sm transition ${flipped ? "border-indigo-200 bg-indigo-600 text-white" : "border-slate-200 bg-white hover:border-indigo-300"}`}>
        <span className={`text-xs font-black uppercase tracking-[.18em] ${flipped ? "text-indigo-200" : "text-indigo-600"}`}>{flipped ? "Answer" : "Prompt"}</span>
        <p className={`mt-5 font-black ${flipped ? "text-xl leading-9" : "text-3xl"}`}>{flipped ? card.definition : card.term}</p>
        <p className={`mt-8 text-sm ${flipped ? "text-indigo-200" : "text-slate-400"}`}>{flipped ? "How well did you know it?" : `Hint: ${card.hint} · tap to reveal`}</p>
      </button>
      <div className="mt-5 flex items-center justify-between gap-3">
        <button disabled={index === 0} onClick={() => { setIndex((value) => value - 1); setFlipped(false); }} className="rounded-xl border border-slate-200 p-3 text-slate-500 disabled:opacity-30"><ArrowLeft className="h-4 w-4" /></button>
        {flipped ? <div className="flex flex-1 gap-3"><button onClick={() => grade(false)} className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-amber-300 bg-amber-50 px-4 py-3 text-sm font-bold text-amber-800"><CircleAlert className="h-4 w-4" /> Again</button><button onClick={() => grade(true)} className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-emerald-600 px-4 py-3 text-sm font-bold text-white"><Check className="h-4 w-4" /> Got it</button></div> : <button onClick={() => setFlipped(true)} className="flex-1 rounded-xl bg-indigo-600 px-5 py-3 text-sm font-bold text-white">Reveal answer</button>}
        <button disabled={index === cards.length - 1} onClick={() => { setIndex((value) => value + 1); setFlipped(false); }} className="rounded-xl border border-slate-200 p-3 text-slate-500 disabled:opacity-30"><ArrowRight className="h-4 w-4" /></button>
      </div>
    </div>
  );
}

function TutorPanel({ subjectName, subjectSlug, topicName, topicSlug }: { subjectName: string; subjectSlug: string; topicName: string; topicSlug: string }) {
  const [question, setQuestion] = useState("");
  const [messages, setMessages] = useState<Array<{ role: "student" | "tutor"; text: string; mode?: string }>>([
    { role: "tutor", text: `I can help you understand ${topicName}. Ask for a simpler explanation, an example, a hint or a practice question.` },
  ]);
  const [loading, setLoading] = useState(false);
  const quickPrompts = useMemo(() => ["Explain this simply", "Give me a practice question", "What mistakes should I avoid?", "Quiz me one step at a time"], []);

  async function askTutor(text = question) {
    const clean = text.trim();
    if (!clean || loading) return;
    setMessages((current) => [...current, { role: "student", text: clean }]);
    setQuestion(""); setLoading(true);
    try {
      const response = await fetch("/api/tutor", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ subjectSlug, topicSlug, question: clean }),
      });
      const data = await response.json();
      setMessages((current) => [...current, { role: "tutor", text: data.answer || "I couldn't create an answer just now. Try one of the guided prompts.", mode: data.mode }]);
    } catch {
      setMessages((current) => [...current, { role: "tutor", text: "I couldn't reach the live tutor, but your notes, quiz and flashcards are still available. Try asking for a key definition." }]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mx-auto max-w-3xl overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
      <div className="border-b border-slate-200 bg-slate-950 p-5 text-white">
        <div className="flex items-center gap-3"><div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-500"><Bot className="h-5 w-5" /></div><div><h2 className="font-black">{subjectName} revision tutor</h2><p className="text-xs text-slate-400">Grounded in this {topicName} study pack</p></div></div>
      </div>
      <div className="max-h-[32rem] min-h-80 space-y-4 overflow-y-auto bg-slate-50 p-5 sm:p-6">
        {messages.map((message, index) => (
          <div key={index} className={`flex ${message.role === "student" ? "justify-end" : "justify-start"}`}>
            <div className={`max-w-[88%] rounded-2xl px-4 py-3 text-sm leading-7 ${message.role === "student" ? "bg-indigo-600 text-white" : "border border-slate-200 bg-white text-slate-700"}`}>
              <p className="whitespace-pre-wrap">{message.text}</p>
              {message.mode === "guided" && <p className="mt-2 text-[10px] font-bold uppercase tracking-wider text-slate-400">Guided study answer</p>}
            </div>
          </div>
        ))}
        {loading && <div className="flex items-center gap-2 text-sm font-medium text-slate-400"><LoaderCircle className="h-4 w-4 animate-spin" /> Building a helpful answer…</div>}
      </div>
      <div className="border-t border-slate-200 p-4 sm:p-5">
        <div className="mb-3 flex flex-wrap gap-2">
          {quickPrompts.map((prompt) => <button key={prompt} disabled={loading} onClick={() => askTutor(prompt)} className="rounded-full border border-slate-200 px-3 py-1.5 text-xs font-bold text-slate-600 hover:border-indigo-300 hover:text-indigo-600">{prompt}</button>)}
        </div>
        <form onSubmit={(event) => { event.preventDefault(); askTutor(); }} className="flex gap-2">
          <label htmlFor="tutor-question" className="sr-only">Ask the tutor a question</label>
          <input id="tutor-question" value={question} maxLength={600} onChange={(event) => setQuestion(event.target.value)} placeholder={`Ask about ${topicName}…`} className="min-w-0 flex-1 rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100" />
          <button type="submit" disabled={!question.trim() || loading} aria-label="Send question" className="flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-600 text-white disabled:opacity-40"><Send className="h-4 w-4" /></button>
        </form>
        <p className="mt-2 flex items-center gap-1 text-[11px] text-slate-400"><Sparkles className="h-3 w-3" /> Check important facts against your notes and specification.</p>
      </div>
    </div>
  );
}
