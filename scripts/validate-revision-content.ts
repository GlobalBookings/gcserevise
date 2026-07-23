import { getPublishedSubjects, getRevisionContent } from "../src/data/revision-library";

const subjects = getPublishedSubjects();
const errors: string[] = [];
let topicCount = 0;
let questionCount = 0;
let flashcardCount = 0;

for (const subject of subjects) {
  for (const topic of subject.topics) {
    topicCount++;
    const content = getRevisionContent(subject.slug, topic.slug);
    if (!content) {
      errors.push(`${subject.slug}/${topic.slug}: missing content`);
      continue;
    }
    if (!content.summary.trim()) errors.push(`${subject.slug}/${topic.slug}: missing summary`);
    if (!content.examTip.trim()) errors.push(`${subject.slug}/${topic.slug}: missing exam tip`);
    if (content.objectives.length < 3) errors.push(`${subject.slug}/${topic.slug}: needs at least 3 objectives`);
    if (content.sections.length < 2) errors.push(`${subject.slug}/${topic.slug}: needs at least 2 note sections`);
    if (content.commonMistakes.length < 3) errors.push(`${subject.slug}/${topic.slug}: needs at least 3 common mistakes`);
    if (content.retrievalPractice.length < 4) errors.push(`${subject.slug}/${topic.slug}: needs at least 4 retrieval prompts`);
    if (content.flashcards.length < 6) errors.push(`${subject.slug}/${topic.slug}: needs at least 6 flashcards`);
    if (content.questions.length < 5) errors.push(`${subject.slug}/${topic.slug}: needs at least 5 questions`);
    flashcardCount += content.flashcards.length;
    questionCount += content.questions.length;
    content.questions.forEach((question, index) => {
      if (question.options.length !== 4) errors.push(`${subject.slug}/${topic.slug} question ${index + 1}: expected 4 options`);
      if (question.correct_answer < 0 || question.correct_answer >= question.options.length) errors.push(`${subject.slug}/${topic.slug} question ${index + 1}: invalid answer index`);
      if (new Set(question.options).size !== question.options.length) errors.push(`${subject.slug}/${topic.slug} question ${index + 1}: duplicate options`);
    });
  }
}

if (subjects.length !== 8) errors.push(`expected 8 published subjects, found ${subjects.length}`);
if (errors.length) {
  console.error(errors.join("\n"));
  process.exit(1);
}

console.log(`Validated ${subjects.length} subjects, ${topicCount} topics, ${questionCount} questions and ${flashcardCount} flashcards.`);
