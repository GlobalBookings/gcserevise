import type { RevisionFlashcard, RevisionQuestion } from "./revision-extensions";

interface EnglishSeed {
  summary: string;
  examTip: string;
  cards: Array<[term: string, definition: string, hint: string]>;
}

const seeds: Record<string, EnglishSeed> = {
  "paper1-reading-comprehension": {
    summary: "Paper 1 reading rewards precise retrieval and clear inference. Read the question's line range, select only relevant details and distinguish what the text states from what it suggests.",
    examTip: "Use the given line range and answer exactly the requested number of points. Short, precise evidence is safer than copying a whole sentence.",
    cards: [
      ["Explicit information", "A fact or detail stated directly in the source.", "You can point to the exact words."],
      ["Inference", "A reasonable conclusion supported by clues in the text.", "Read between the lines, then prove it."],
      ["Evidence", "A short quotation or precise reference used to support an answer.", "Select only the words you need."],
      ["Line range", "The part of the source named in the question; evidence outside it will not be credited.", "Check the question before searching."],
      ["Synthesis", "Combining related details to form a clear overall understanding.", "Put clues together."],
      ["Retrieval check", "A final check that every point answers the wording of the question and comes from the correct section.", "Range, relevance, required number."],
    ],
  },
  "paper1-language-analysis": {
    summary: "Language analysis explains how a writer's choices shape meaning and reader response. Strong answers move from a precise quotation to a specific method, then explore connotations in context.",
    examTip: "Zoom in on a key word and develop a plausible interpretation. Naming a technique without explaining its effect earns little.",
    cards: [
      ["Language method", "A deliberate choice such as metaphor, simile, personification, contrast or semantic field.", "Name it only when the label helps."],
      ["Connotation", "An idea or association suggested by a word beyond its literal meaning.", "What does the word make you imagine?"],
      ["Semantic field", "A group of words connected by a shared area of meaning.", "Look for a pattern of related vocabulary."],
      ["Imagery", "Descriptive language that creates a sensory or figurative picture.", "What picture is built?"],
      ["Reader response", "A specific, text-supported reaction the writer may encourage.", "Avoid vague claims such as 'it makes you read on'."],
      ["Analysis chain", "Evidence, method, connotation, interpretation and connection to the writer's purpose.", "Move from the word to the bigger idea."],
    ],
  },
  "paper1-structure-analysis": {
    summary: "Structure is the organisation and movement of the whole source. Track where attention begins, how focus or pace shifts and why the ending changes the reader's understanding.",
    examTip: "Discuss movement across the source, not punctuation or a single word. Use the beginning, a key shift and the ending as a reliable route.",
    cards: [
      ["Narrative focus", "The person, object, place or idea to which the writer directs attention.", "What are we looking at now?"],
      ["Shift", "A change in focus, time, place, perspective, mood or pace.", "What changes, where and why?"],
      ["Pace", "The apparent speed of the narrative, shaped by the selection and sequencing of events.", "Fast action or slowed observation?"],
      ["Contrast", "The placement of different ideas, settings or moments to emphasise their differences.", "Before versus after is often useful."],
      ["Cyclical structure", "An ending that returns to an image, idea or setting from the opening.", "The ending echoes the beginning."],
      ["Structural effect", "The way an organisational choice controls information, tension, expectation or viewpoint.", "Explain what the reader knows and when."],
    ],
  },
  "paper1-evaluation": {
    summary: "Evaluation asks you to judge a statement about the source. Build a clear line of argument, choose evidence from the named section and analyse how the writing makes the judgement convincing.",
    examTip: "State how far you agree, then prove the judgement through both language and structural choices. Evaluation still needs close analysis.",
    cards: [
      ["Evaluation", "A reasoned judgement about how successfully a text creates an idea or effect.", "Judge, support and analyse."],
      ["Thesis", "A concise overall position that directly answers the statement.", "How far do you agree, and why?"],
      ["Judicious evidence", "A carefully selected quotation that strongly supports the judgement.", "Choose evidence with something to analyse."],
      ["Qualification", "A refinement that shows where or how a judgement is true rather than making an absolute claim.", "Mostly, initially, increasingly."],
      ["Writer's method", "A language or structural choice used as evidence for an evaluation.", "The judgement needs craft evidence."],
      ["Developed response", "A paragraph that links judgement, evidence, method and interpretation back to the statement.", "Keep returning to the claim."],
    ],
  },
  "paper1-creative-writing": {
    summary: "Creative writing is controlled communication, not a race to include every technique. Plan a clear viewpoint and shape, select precise details and vary sentences and paragraphs for deliberate effects.",
    examTip: "Spend a few minutes choosing a manageable moment and structural shape. Accurate, crafted writing usually outperforms an over-complicated plot.",
    cards: [
      ["Narrative viewpoint", "The position from which a story is told, commonly first or third person.", "Choose and keep it consistent."],
      ["Motif", "A recurring image, object or phrase that helps unify the writing.", "Repeat with development."],
      ["Show, not tell", "Revealing emotion through action, sensation or detail instead of simply naming it.", "What would the feeling look like?"],
      ["Sentence control", "Varying sentence length and form accurately to guide pace and emphasis.", "Variation must have a purpose."],
      ["Paragraphing", "Organising shifts in time, place, focus, speaker or idea into clear units.", "A new focus often needs a new paragraph."],
      ["Technical accuracy", "Secure spelling, punctuation and grammar used to make meaning clear.", "Accuracy is a large part of the mark."],
    ],
  },
  "paper2-reading-comprehension": {
    summary: "Paper 2 begins with non-fiction retrieval and summary. Identify the exact focus, select differences or similarities from both sources and infer what the details reveal.",
    examTip: "For summary, pair a point from Source A with a related point from Source B and add an inference; do not analyse language unless asked.",
    cards: [
      ["True statement", "A claim fully supported by the specified part of the source.", "Every word of the option must be accurate."],
      ["Summary", "A concise account of the most relevant similarities or differences between sources.", "Select, pair and infer."],
      ["Cross-reference", "Linking a relevant detail from one source with a related detail from the other.", "Use both sources in each comparison."],
      ["Difference", "A clear contrast in experience, attitude, setting or idea between the sources.", "A is..., whereas B is..."],
      ["Similarity", "A meaningful shared feature supported by evidence from both sources.", "Both writers suggest..."],
      ["Inference", "A conclusion drawn from evidence rather than directly stated.", "Explain what the detail shows."],
    ],
  },
  "paper2-comparison": {
    summary: "Comparison explores how two writers present viewpoints and perspectives. Compare their attitudes, select methods from both sources and explain how differences in context or purpose shape the writing.",
    examTip: "Compare throughout rather than writing two separate mini-essays. Use a shared point of comparison in every paragraph.",
    cards: [
      ["Viewpoint", "A writer's opinion, attitude or position towards the subject.", "What does the writer think?"],
      ["Perspective", "The writer's particular way of seeing a topic, shaped by experience and context.", "Why might they see it this way?"],
      ["Comparative thesis", "An overall argument about the most important similarity or difference between the writers.", "Both..., but..."],
      ["Tone", "The attitude conveyed by the writer's language, such as admiring, outraged or reflective.", "Choose a precise adjective."],
      ["Method comparison", "Explaining how each writer's choices present related viewpoints in similar or different ways.", "Compare choices and effects."],
      ["Contextual inference", "A careful explanation of how situation, audience or purpose may shape a viewpoint.", "Use what the source reveals; do not invent biography."],
    ],
  },
  "paper2-viewpoint-writing": {
    summary: "Viewpoint writing presents a convincing position for a stated form, audience and purpose. Develop a logical argument, anticipate objections and use rhetoric with control and accuracy.",
    examTip: "Write the form named in the task and keep the audience visible. A clear argument with developed reasons matters more than a list of devices.",
    cards: [
      ["Form", "The required text type, such as an article, speech, letter or essay.", "Use the conventions the task needs."],
      ["Audience", "The people the writing addresses; this determines tone, detail and vocabulary.", "Who must be persuaded?"],
      ["Purpose", "The intended outcome, commonly to argue, persuade, explain or advise.", "What should the reader think or do?"],
      ["Counterargument", "An opposing view that is acknowledged and answered.", "Some may argue..., however..."],
      ["Rhetorical appeal", "A persuasive appeal to reason, credibility or emotion.", "Use evidence and logic, not just questions."],
      ["Cohesion", "Clear connections between ideas created through sequencing, referencing and linking phrases.", "Make the argument build."],
    ],
  },
  macbeth: {
    summary: "Macbeth explores ambition, kingship, guilt, violence and the supernatural through a tragic collapse. Revise character arcs, recurring imagery and how Jacobean ideas shape the play's warnings.",
    examTip: "Start with the extract, then connect it to precise moments elsewhere. Track how the character or theme changes across the whole play.",
    cards: [
      ["Tragic hero", "A high-status protagonist whose choices and flaws contribute to catastrophe.", "Macbeth has agency as well as influence."],
      ["Ambition", "Macbeth's desire for power, presented as capable of overriding loyalty and moral restraint.", "A motive that develops after prophecy."],
      ["Kingship", "The play contrasts legitimate, healing rule with Macbeth's fearful tyranny.", "Duncan and Malcolm provide contrasts."],
      ["Supernatural", "The witches and visions create temptation, uncertainty and equivocation without removing Macbeth's responsibility.", "Influence is not the same as control."],
      ["Blood imagery", "Repeated references to blood connect violence with guilt and consequences.", "Its meaning develops after Duncan's murder."],
      ["Character arc", "The pattern of change from honoured warrior to isolated tyrant and defeated tragic figure.", "Track beginning, turning points and ending."],
    ],
  },
  "romeo-and-juliet": {
    summary: "Romeo and Juliet presents love within a world shaped by feud, impulsiveness, family authority and fate. Strong revision connects relationships and imagery to the play's tragic structure.",
    examTip: "Avoid treating the lovers in isolation. Link their choices to the feud, adult decisions, social expectations and dramatic timing.",
    cards: [
      ["Courtly love", "A stylised, often exaggerated form of love visible in Romeo's early language about Rosaline.", "Contrast it with his relationship with Juliet."],
      ["Feud", "The inherited conflict between the Montagues and Capulets that makes private love publicly dangerous.", "The social cause of the tragedy."],
      ["Fate", "The sense that events are destined, created through the prologue, omens and repeated celestial imagery.", "Balance fate with human choices."],
      ["Light imagery", "Images of light present love as beautiful and transformative, but also brief and exposed.", "Light exists against darkness."],
      ["Patriarchy", "A social system in which male authority shapes family decisions, especially Juliet's expected marriage.", "Consider Capulet's power."],
      ["Dramatic irony", "Tension created when the audience knows more than a character, especially around the final plan.", "Knowledge arrives too late."],
    ],
  },
  "inspector-calls": {
    summary: "An Inspector Calls uses a single evening to expose inequality, selfishness and failures of responsibility. Track how Priestley contrasts generations and uses dramatic structure to challenge the audience.",
    examTip: "Treat the Inspector as a dramatic function as well as a character. Link each revelation to Priestley's argument about collective responsibility.",
    cards: [
      ["Social responsibility", "The idea that people share obligations to protect others rather than acting only for themselves.", "The Inspector's central message."],
      ["Dramatic irony", "The audience recognises that Birling's confident predictions are wrong, weakening his authority.", "The 1945 audience knows later events."],
      ["Generational divide", "Younger characters show greater capacity to accept responsibility than their parents.", "Compare responses after the Inspector leaves."],
      ["Capitalism", "An economic system based on private ownership and profit, associated in the play with Birling's individualism.", "Priestley criticises selfish versions of it."],
      ["Inspector", "A catalyst who controls revelations, tests each character and voices the play's moral argument.", "Consider function, not just identity."],
      ["Cyclical ending", "The final phone call suggests the lesson will repeat because the family has not fully changed.", "The structure resets the crisis."],
    ],
  },
  "christmas-carol": {
    summary: "A Christmas Carol follows Scrooge's moral transformation to criticise selfishness, poverty and social neglect. Dickens uses contrasts, supernatural visits and a cyclical festive setting to argue that change is possible.",
    examTip: "Track transformation across the staves and connect Dickens's methods to Victorian inequality without replacing textual analysis with context.",
    cards: [
      ["Transformation", "Scrooge changes from isolated miser to generous participant in family and society.", "Use moments from several staves."],
      ["Social responsibility", "Dickens argues that wealthy people have a duty to recognise and relieve suffering.", "Think of the charity collectors and Cratchits."],
      ["Malthusian language", "Scrooge repeats harsh ideas that poverty should be left to institutions or death, which the novella later condemns.", "The Ghost returns his words to him."],
      ["Ignorance and Want", "Allegorical children who embody the dangers created by deprivation and social neglect.", "The warning is directed at society."],
      ["Light and warmth", "Recurring images that come to represent connection, generosity and moral renewal.", "Contrast with Scrooge's early coldness."],
      ["Redemption", "The possibility of recognising wrongdoing and changing behaviour before it is too late.", "The future shown is conditional."],
    ],
  },
  "jekyll-hyde": {
    summary: "Dr Jekyll and Mr Hyde investigates reputation, repression, duality and the danger of unchecked experimentation. Stevenson's fragmented viewpoints make truth difficult to access until the final confessions.",
    examTip: "Use the novella's delayed revelations. Explain how setting, narrative perspective and recurring descriptions shape the reader's judgement.",
    cards: [
      ["Duality", "The idea that opposing capacities for respectability and wrongdoing coexist within a person.", "Jekyll wrongly tries to separate them."],
      ["Repression", "The suppression of desires to preserve social respectability, which can intensify secrecy and conflict.", "Link private desire to public reputation."],
      ["Atavism", "A Victorian fear of regression to a more primitive state, reflected in descriptions of Hyde.", "Use as context carefully."],
      ["Gothic setting", "Dark streets, fog, doors and divided buildings make ordinary London threatening and secretive.", "Setting reflects hidden lives."],
      ["Unreliable perspective", "Limited or biased accounts delay certainty and force the reader to assemble evidence.", "Utterson does not know everything."],
      ["Science and transgression", "Jekyll's experiment crosses moral and natural boundaries without accepting responsibility for the risk.", "Ambition without ethical control."],
    ],
  },
  "power-conflict-poetry": {
    summary: "The Power and Conflict cluster explores authority, war, identity, memory and the power of nature through contrasting voices and forms. Revision should build flexible comparison routes rather than memorised essays.",
    examTip: "Choose the poem with the clearest conceptual comparison. Compare ideas and methods throughout, using short accurate quotations.",
    cards: [
      ["Conceptual comparison", "A comparison based on a shared idea, such as abuse of power, memory or human vulnerability.", "Start with meaning, not a random device."],
      ["Speaker", "The constructed voice of a poem, which should not automatically be treated as the poet.", "Speaker and poet are not always identical."],
      ["Form", "The poem's overall design, including stanza pattern, rhyme, rhythm and genre.", "Explain how form shapes the idea."],
      ["Volta", "A noticeable turn in thought, tone, argument or perspective.", "Where does the poem change direction?"],
      ["Enjambment", "A sentence continuing beyond a line break, which may shape pace, connection or disruption.", "Describe the local effect, not a fixed one."],
      ["Comparison thesis", "An argument that identifies a meaningful similarity and difference in how two poems present an idea.", "Both explore..., whereas..."],
    ],
  },
  "unseen-poetry": {
    summary: "Unseen poetry tests independent reading, not hidden knowledge. Establish the speaker, situation and central movement, then select patterns of language, form and structure that support a coherent interpretation.",
    examTip: "Read twice before annotating: first for the situation, then for changes and patterns. An interpretation must be supported, not guessed.",
    cards: [
      ["Literal situation", "The basic account of who is speaking, about what, where and when.", "Secure the surface meaning first."],
      ["Interpretation", "A supported explanation of the poem's ideas and effects.", "More than one reading can be valid with evidence."],
      ["Pattern", "A repeated or developing feature such as imagery, sound, contrast or sentence shape.", "Patterns are often stronger than isolated labels."],
      ["Tone shift", "A change in the speaker's attitude or emotional register.", "Find the turning point and its cause."],
      ["Form and structure", "The organisation of the poem and the movement of ideas across it.", "Connect design to meaning."],
      ["Unseen comparison", "A focused account of similarities and differences between two poems' ideas and methods.", "Use concise paired evidence."],
    ],
  },
};

function makeQuestions(cards: RevisionFlashcard[]): RevisionQuestion[] {
  return cards.slice(0, 5).map((card, index) => {
    const distractors = [1, 2, 3].map((offset) => cards[(index + offset) % cards.length].definition);
    const correctAnswer = index % 4;
    const options = [...distractors];
    options.splice(correctAnswer, 0, card.definition);
    return {
      question: `Which explanation best matches “${card.term}”?`,
      options,
      correct_answer: correctAnswer,
      explanation: `${card.term}: ${card.definition}`,
      difficulty: index < 2 ? 1 : 2,
    };
  });
}

export const englishRevisionContent = Object.fromEntries(
  Object.entries(seeds).map(([slug, seed]) => {
    const flashcards = seed.cards.map(([term, definition, hint]) => ({ term, definition, hint }));
    return [slug, { summary: seed.summary, examTip: seed.examTip, flashcards, questions: makeQuestions(flashcards) }];
  })
);
