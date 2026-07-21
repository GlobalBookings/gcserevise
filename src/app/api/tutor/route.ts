import { NextResponse } from "next/server";
import { getRevisionContent, getTopic } from "@/data/revision-library";

interface TutorRequest {
  subjectSlug?: string;
  topicSlug?: string;
  question?: string;
}

function guidedAnswer(question: string, topicName: string, summary: string, facts: Array<{ term: string; definition: string }>) {
  const lower = question.toLowerCase();
  const relevant = facts.find((fact) => lower.includes(fact.term.toLowerCase())) || facts[0];

  if (lower.includes("practice") || lower.includes("quiz")) {
    const target = facts[Math.min(1, facts.length - 1)];
    return `Try this without looking at the notes:\n\nExplain “${target.term}” in one precise sentence, then add why it matters in ${topicName}.\n\nWhen you are ready, compare your answer with the Learn tab and improve any missing key vocabulary.`;
  }
  if (lower.includes("mistake") || lower.includes("avoid")) {
    return `A common mistake is giving a vague description without the key link. For ${relevant.term}, make sure your answer includes this exact idea: ${relevant.definition}\n\nIn an exam, answer the command word first and then add the reason, process or evidence.`;
  }
  if (lower.includes("hint")) {
    return `Hint: focus on “${relevant.term}”. Start with: “${relevant.term} is…” Then connect it to the wider topic without copying the full definition.`;
  }
  return `${summary}\n\nA useful anchor fact is:\n${relevant.term}: ${relevant.definition}\n\nNow try explaining that idea in your own words. If you can do that accurately, ask me for a practice question.`;
}

export async function POST(request: Request) {
  let body: TutorRequest;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  const subjectSlug = body.subjectSlug || "";
  const topicSlug = body.topicSlug || "";
  const question = (body.question || "").trim().slice(0, 600);
  const topic = getTopic(subjectSlug, topicSlug);
  const content = getRevisionContent(subjectSlug, topicSlug);
  if (!topic || !content || !question) {
    return NextResponse.json({ error: "Topic and question are required" }, { status: 400 });
  }

  const fallback = guidedAnswer(question, topic.topic.name, content.summary, content.flashcards);
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) return NextResponse.json({ answer: fallback, mode: "guided" });

  const studyPack = content.flashcards.map((card) => `- ${card.term}: ${card.definition}`).join("\n");
  try {
    const response = await fetch("https://api.openai.com/v1/responses", {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${apiKey}` },
      body: JSON.stringify({
        model: process.env.OPENAI_TUTOR_MODEL || "gpt-5.6-terra",
        reasoning: { effort: "low" },
        max_output_tokens: 500,
        store: false,
        text: { verbosity: "low" },
        instructions: `Role: A patient UK GCSE revision tutor.\nGoal: Help the student understand ${topic.topic.name} for AQA GCSE ${topic.subject.name}.\nUse only the supplied study pack. If the pack does not support a claim, say so. Lead with a direct explanation, use short steps, preserve precise subject vocabulary, and finish with one active-recall check. Do not complete assessed work on the student's behalf.`,
        input: `STUDY PACK\n${content.summary}\n${studyPack}\n\nSTUDENT QUESTION\n${question}`,
      }),
    });
    if (!response.ok) return NextResponse.json({ answer: fallback, mode: "guided" });
    const data = await response.json();
    const answer = data.output?.flatMap((item: { content?: Array<{ type?: string; text?: string }> }) => item.content || []).find((item: { type?: string }) => item.type === "output_text")?.text;
    return NextResponse.json({ answer: answer || fallback, mode: answer ? "ai" : "guided" });
  } catch {
    return NextResponse.json({ answer: fallback, mode: "guided" });
  }
}
