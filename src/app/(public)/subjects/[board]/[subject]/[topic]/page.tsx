import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { TopicStudyWorkspace } from "@/components/study/topic-study-workspace";
import { BreadcrumbJsonLd, LearningResourceJsonLd } from "@/components/seo/json-ld";
import {
  getAdjacentTopics,
  getPublishedSubjects,
  getRevisionContent,
  getTopic,
  OFFICIAL_SPEC_URLS,
} from "@/data/revision-library";
import { createPageMetadata } from "@/lib/seo";

type PageProps = { params: Promise<{ board: string; subject: string; topic: string }> };

export function generateStaticParams() {
  return getPublishedSubjects().flatMap((subject) =>
    subject.topics.map((topic) => ({ board: "aqa", subject: subject.slug, topic: topic.slug }))
  );
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { board, subject, topic } = await params;
  const result = getTopic(subject, topic);
  if (!result) return {};
  return createPageMetadata({
    title: `${result.topic.name} - ${board.toUpperCase()} GCSE ${result.subject.name} Revision`,
    description: `Revise ${result.topic.name} with clear notes, an auto-marked quiz, flashcards and a topic tutor for ${board.toUpperCase()} GCSE ${result.subject.name}.`,
    path: `/subjects/${board}/${subject}/${topic}`,
  });
}

export default async function TopicPage({ params }: PageProps) {
  const { board, subject: subjectSlug, topic: topicSlug } = await params;
  const result = getTopic(subjectSlug, topicSlug);
  const content = getRevisionContent(subjectSlug, topicSlug);
  if (!result || !content || board !== "aqa") notFound();

  const { subject, topic } = result;
  const adjacent = getAdjacentTopics(subjectSlug, topicSlug);
  const baseUrl = "https://gcserevise.co.uk";
  const pageUrl = `${baseUrl}/subjects/${board}/${subjectSlug}/${topicSlug}`;

  return (
    <div>
      <Navbar />
      <BreadcrumbJsonLd items={[
        { name: "Home", url: baseUrl },
        { name: "Subjects", url: `${baseUrl}/subjects` },
        { name: "AQA", url: `${baseUrl}/subjects/aqa` },
        { name: subject.name, url: `${baseUrl}/subjects/aqa/${subjectSlug}` },
        { name: topic.name, url: pageUrl },
      ]} />
      <LearningResourceJsonLd name={`AQA GCSE ${subject.name}: ${topic.name}`} description={content.summary} provider="GCSERevise" url={pageUrl} />
      <TopicStudyWorkspace
        board={board}
        subjectName={subject.name}
        subjectSlug={subjectSlug}
        topicName={topic.name}
        topicSlug={topicSlug}
        specRef={topic.specRef}
        tier={topic.tier}
        estimatedMinutes={topic.estimatedMinutes}
        summary={content.summary}
        examTip={content.examTip}
        flashcards={content.flashcards}
        questions={content.questions}
        officialSpecUrl={OFFICIAL_SPEC_URLS[subjectSlug]}
        previousTopic={adjacent.previous ? { name: adjacent.previous.name, slug: adjacent.previous.slug } : null}
        nextTopic={adjacent.next ? { name: adjacent.next.name, slug: adjacent.next.slug } : null}
      />
      <Footer />
    </div>
  );
}
