// Run with: npx tsx scripts/seed.ts
// Populates Supabase with AQA exam board, subjects, and topics

import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://wmncmoauedmlzbfxajtj.supabase.co";
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";

if (!supabaseKey) {
  console.error("Missing SUPABASE_SERVICE_ROLE_KEY or NEXT_PUBLIC_SUPABASE_ANON_KEY");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

const AQA_SUBJECTS = [
  {
    name: "Mathematics",
    slug: "maths",
    icon: "calculator",
    color: "#3b82f6",
    topics: [
      { paper: "Paper 1/2/3", name: "Integers, Decimals & Place Value", slug: "integers-decimals", specRef: "N1-N2", tier: "both", difficulty: 1, estimatedMinutes: 25, orderIndex: 1 },
      { paper: "Paper 1/2/3", name: "Fractions, Decimals & Percentages", slug: "fractions-decimals-percentages", specRef: "N2-N12", tier: "both", difficulty: 2, estimatedMinutes: 30, orderIndex: 2 },
      { paper: "Paper 1/2/3", name: "Indices & Standard Form", slug: "indices-standard-form", specRef: "N6-N9", tier: "both", difficulty: 3, estimatedMinutes: 30, orderIndex: 3 },
      { paper: "Paper 1/2/3", name: "Surds", slug: "surds", specRef: "N8", tier: "higher", difficulty: 4, estimatedMinutes: 25, orderIndex: 4 },
      { paper: "Paper 1/2/3", name: "Algebraic Expressions", slug: "algebraic-expressions", specRef: "A1-A4", tier: "both", difficulty: 2, estimatedMinutes: 30, orderIndex: 5 },
      { paper: "Paper 1/2/3", name: "Solving Linear Equations", slug: "linear-equations", specRef: "A17", tier: "both", difficulty: 2, estimatedMinutes: 25, orderIndex: 6 },
      { paper: "Paper 1/2/3", name: "Solving Quadratic Equations", slug: "quadratic-equations", specRef: "A18", tier: "both", difficulty: 3, estimatedMinutes: 35, orderIndex: 7 },
      { paper: "Paper 1/2/3", name: "Simultaneous Equations", slug: "simultaneous-equations", specRef: "A19", tier: "both", difficulty: 4, estimatedMinutes: 30, orderIndex: 8 },
      { paper: "Paper 1/2/3", name: "Sequences", slug: "sequences", specRef: "A23-A25", tier: "both", difficulty: 2, estimatedMinutes: 25, orderIndex: 9 },
      { paper: "Paper 1/2/3", name: "Straight Line Graphs", slug: "straight-line-graphs", specRef: "A9-A11", tier: "both", difficulty: 2, estimatedMinutes: 30, orderIndex: 10 },
      { paper: "Paper 1/2/3", name: "Quadratic & Other Graphs", slug: "quadratic-graphs", specRef: "A12-A14", tier: "both", difficulty: 3, estimatedMinutes: 30, orderIndex: 11 },
      { paper: "Paper 1/2/3", name: "Inequalities", slug: "inequalities", specRef: "A22", tier: "both", difficulty: 3, estimatedMinutes: 25, orderIndex: 12 },
      { paper: "Paper 1/2/3", name: "Ratio & Proportion", slug: "ratio-proportion", specRef: "R1-R10", tier: "both", difficulty: 2, estimatedMinutes: 30, orderIndex: 13 },
      { paper: "Paper 1/2/3", name: "Rates of Change & Growth", slug: "rates-of-change", specRef: "R11-R16", tier: "both", difficulty: 3, estimatedMinutes: 30, orderIndex: 14 },
      { paper: "Paper 1/2/3", name: "Angles & Polygons", slug: "angles-polygons", specRef: "G1-G4", tier: "both", difficulty: 2, estimatedMinutes: 30, orderIndex: 15 },
      { paper: "Paper 1/2/3", name: "Area & Perimeter", slug: "area-perimeter", specRef: "G16-G17", tier: "both", difficulty: 2, estimatedMinutes: 25, orderIndex: 16 },
      { paper: "Paper 1/2/3", name: "Volume & Surface Area", slug: "volume-surface-area", specRef: "G16-G17", tier: "both", difficulty: 3, estimatedMinutes: 30, orderIndex: 17 },
      { paper: "Paper 1/2/3", name: "Transformations", slug: "transformations", specRef: "G7-G8", tier: "both", difficulty: 2, estimatedMinutes: 25, orderIndex: 18 },
      { paper: "Paper 1/2/3", name: "Pythagoras & Trigonometry", slug: "pythagoras-trigonometry", specRef: "G20-G22", tier: "both", difficulty: 3, estimatedMinutes: 35, orderIndex: 19 },
      { paper: "Paper 1/2/3", name: "Vectors", slug: "vectors", specRef: "G24-G25", tier: "higher", difficulty: 4, estimatedMinutes: 30, orderIndex: 20 },
      { paper: "Paper 1/2/3", name: "Circle Theorems", slug: "circle-theorems", specRef: "G10", tier: "higher", difficulty: 4, estimatedMinutes: 30, orderIndex: 21 },
      { paper: "Paper 1/2/3", name: "Collecting & Representing Data", slug: "data-representation", specRef: "S1-S3", tier: "both", difficulty: 1, estimatedMinutes: 25, orderIndex: 22 },
      { paper: "Paper 1/2/3", name: "Averages & Spread", slug: "averages-spread", specRef: "S4-S5", tier: "both", difficulty: 2, estimatedMinutes: 25, orderIndex: 23 },
      { paper: "Paper 1/2/3", name: "Probability", slug: "probability", specRef: "P1-P9", tier: "both", difficulty: 3, estimatedMinutes: 30, orderIndex: 24 },
    ],
  },
  {
    name: "Biology",
    slug: "biology",
    icon: "flask",
    color: "#10b981",
    topics: [
      { paper: "Paper 1", name: "Cell Structure", slug: "cell-structure", specRef: "4.1.1", tier: "both", difficulty: 2, estimatedMinutes: 30, orderIndex: 1 },
      { paper: "Paper 1", name: "Cell Division", slug: "cell-division", specRef: "4.1.2", tier: "both", difficulty: 3, estimatedMinutes: 30, orderIndex: 2 },
      { paper: "Paper 1", name: "Transport in Cells", slug: "transport-in-cells", specRef: "4.1.3", tier: "both", difficulty: 3, estimatedMinutes: 25, orderIndex: 3 },
      { paper: "Paper 1", name: "Organisation in Animals", slug: "organisation-animals", specRef: "4.2.1", tier: "both", difficulty: 2, estimatedMinutes: 30, orderIndex: 4 },
      { paper: "Paper 1", name: "Organisation in Plants", slug: "organisation-plants", specRef: "4.2.2", tier: "both", difficulty: 2, estimatedMinutes: 25, orderIndex: 5 },
      { paper: "Paper 1", name: "Communicable Diseases", slug: "communicable-diseases", specRef: "4.3.1", tier: "both", difficulty: 2, estimatedMinutes: 30, orderIndex: 6 },
      { paper: "Paper 1", name: "Non-Communicable Diseases", slug: "non-communicable-diseases", specRef: "4.3.2", tier: "both", difficulty: 2, estimatedMinutes: 25, orderIndex: 7 },
      { paper: "Paper 1", name: "Photosynthesis", slug: "photosynthesis", specRef: "4.4.1", tier: "both", difficulty: 3, estimatedMinutes: 30, orderIndex: 8 },
      { paper: "Paper 1", name: "Respiration", slug: "respiration", specRef: "4.4.2", tier: "both", difficulty: 3, estimatedMinutes: 25, orderIndex: 9 },
      { paper: "Paper 2", name: "Homeostasis & Response", slug: "homeostasis", specRef: "4.5", tier: "both", difficulty: 3, estimatedMinutes: 35, orderIndex: 10 },
      { paper: "Paper 2", name: "Hormones & Human Reproduction", slug: "hormones-reproduction", specRef: "4.5.3", tier: "both", difficulty: 3, estimatedMinutes: 30, orderIndex: 11 },
      { paper: "Paper 2", name: "Inheritance & Variation", slug: "inheritance-variation", specRef: "4.6", tier: "both", difficulty: 4, estimatedMinutes: 35, orderIndex: 12 },
      { paper: "Paper 2", name: "Evolution & Classification", slug: "evolution-classification", specRef: "4.6.3", tier: "both", difficulty: 2, estimatedMinutes: 25, orderIndex: 13 },
      { paper: "Paper 2", name: "Ecology", slug: "ecology", specRef: "4.7", tier: "both", difficulty: 2, estimatedMinutes: 30, orderIndex: 14 },
    ],
  },
  {
    name: "Chemistry",
    slug: "chemistry",
    icon: "flask",
    color: "#f59e0b",
    topics: [
      { paper: "Paper 1", name: "Atomic Structure & Periodic Table", slug: "atomic-structure", specRef: "4.1", tier: "both", difficulty: 2, estimatedMinutes: 30, orderIndex: 1 },
      { paper: "Paper 1", name: "Bonding, Structure & Properties", slug: "bonding-structure", specRef: "4.2", tier: "both", difficulty: 3, estimatedMinutes: 35, orderIndex: 2 },
      { paper: "Paper 1", name: "Quantitative Chemistry", slug: "quantitative-chemistry", specRef: "4.3", tier: "both", difficulty: 4, estimatedMinutes: 35, orderIndex: 3 },
      { paper: "Paper 1", name: "Chemical Changes", slug: "chemical-changes", specRef: "4.4", tier: "both", difficulty: 3, estimatedMinutes: 30, orderIndex: 4 },
      { paper: "Paper 1", name: "Energy Changes", slug: "energy-changes", specRef: "4.5", tier: "both", difficulty: 3, estimatedMinutes: 25, orderIndex: 5 },
      { paper: "Paper 2", name: "Rate & Extent of Reactions", slug: "rate-of-reaction", specRef: "4.6", tier: "both", difficulty: 3, estimatedMinutes: 30, orderIndex: 6 },
      { paper: "Paper 2", name: "Organic Chemistry", slug: "organic-chemistry", specRef: "4.7", tier: "both", difficulty: 3, estimatedMinutes: 30, orderIndex: 7 },
      { paper: "Paper 2", name: "Chemical Analysis", slug: "chemical-analysis", specRef: "4.8", tier: "both", difficulty: 2, estimatedMinutes: 25, orderIndex: 8 },
      { paper: "Paper 2", name: "Chemistry of the Atmosphere", slug: "atmosphere", specRef: "4.9", tier: "both", difficulty: 2, estimatedMinutes: 25, orderIndex: 9 },
      { paper: "Paper 2", name: "Using Resources", slug: "using-resources", specRef: "4.10", tier: "both", difficulty: 2, estimatedMinutes: 25, orderIndex: 10 },
    ],
  },
  {
    name: "Physics",
    slug: "physics",
    icon: "zap",
    color: "#ef4444",
    topics: [
      { paper: "Paper 1", name: "Energy Stores & Transfers", slug: "energy", specRef: "4.1", tier: "both", difficulty: 2, estimatedMinutes: 30, orderIndex: 1 },
      { paper: "Paper 1", name: "Electricity", slug: "electricity", specRef: "4.2", tier: "both", difficulty: 3, estimatedMinutes: 35, orderIndex: 2 },
      { paper: "Paper 1", name: "Particle Model of Matter", slug: "particle-model", specRef: "4.3", tier: "both", difficulty: 2, estimatedMinutes: 25, orderIndex: 3 },
      { paper: "Paper 1", name: "Atomic Structure & Radiation", slug: "atomic-radiation", specRef: "4.4", tier: "both", difficulty: 3, estimatedMinutes: 30, orderIndex: 4 },
      { paper: "Paper 2", name: "Forces", slug: "forces", specRef: "4.5", tier: "both", difficulty: 3, estimatedMinutes: 35, orderIndex: 5 },
      { paper: "Paper 2", name: "Waves", slug: "waves", specRef: "4.6", tier: "both", difficulty: 3, estimatedMinutes: 30, orderIndex: 6 },
      { paper: "Paper 2", name: "Magnetism & Electromagnetism", slug: "magnetism", specRef: "4.7", tier: "both", difficulty: 3, estimatedMinutes: 30, orderIndex: 7 },
      { paper: "Paper 2", name: "Space Physics", slug: "space-physics", specRef: "4.8", tier: "higher", difficulty: 3, estimatedMinutes: 25, orderIndex: 8 },
    ],
  },
  {
    name: "English Language",
    slug: "english-language",
    icon: "book",
    color: "#a855f7",
    topics: [
      { paper: "Paper 1", name: "Reading Fiction - Comprehension (Q1-3)", slug: "paper1-reading-comprehension", specRef: "P1", tier: "both", difficulty: 2, estimatedMinutes: 30, orderIndex: 1 },
      { paper: "Paper 1", name: "Reading Fiction - Language Analysis (Q2)", slug: "paper1-language-analysis", specRef: "P1", tier: "both", difficulty: 3, estimatedMinutes: 30, orderIndex: 2 },
      { paper: "Paper 1", name: "Reading Fiction - Structure Analysis (Q3)", slug: "paper1-structure-analysis", specRef: "P1", tier: "both", difficulty: 3, estimatedMinutes: 25, orderIndex: 3 },
      { paper: "Paper 1", name: "Reading Fiction - Evaluation (Q4)", slug: "paper1-evaluation", specRef: "P1", tier: "both", difficulty: 4, estimatedMinutes: 30, orderIndex: 4 },
      { paper: "Paper 1", name: "Creative Writing (Q5)", slug: "paper1-creative-writing", specRef: "P1", tier: "both", difficulty: 3, estimatedMinutes: 35, orderIndex: 5 },
      { paper: "Paper 2", name: "Reading Non-Fiction - Comprehension (Q1-2)", slug: "paper2-reading-comprehension", specRef: "P2", tier: "both", difficulty: 2, estimatedMinutes: 25, orderIndex: 6 },
      { paper: "Paper 2", name: "Reading Non-Fiction - Comparison (Q4)", slug: "paper2-comparison", specRef: "P2", tier: "both", difficulty: 4, estimatedMinutes: 30, orderIndex: 7 },
      { paper: "Paper 2", name: "Viewpoint Writing (Q5)", slug: "paper2-viewpoint-writing", specRef: "P2", tier: "both", difficulty: 3, estimatedMinutes: 35, orderIndex: 8 },
    ],
  },
  {
    name: "English Literature",
    slug: "english-literature",
    icon: "book",
    color: "#8b5cf6",
    topics: [
      { paper: "Paper 1", name: "Macbeth", slug: "macbeth", specRef: "Shakespeare", tier: "both", difficulty: 3, estimatedMinutes: 40, orderIndex: 1 },
      { paper: "Paper 1", name: "Romeo and Juliet", slug: "romeo-and-juliet", specRef: "Shakespeare", tier: "both", difficulty: 3, estimatedMinutes: 40, orderIndex: 2 },
      { paper: "Paper 2", name: "An Inspector Calls", slug: "inspector-calls", specRef: "Modern Text", tier: "both", difficulty: 3, estimatedMinutes: 35, orderIndex: 3 },
      { paper: "Paper 2", name: "A Christmas Carol", slug: "christmas-carol", specRef: "19th Century", tier: "both", difficulty: 3, estimatedMinutes: 35, orderIndex: 4 },
      { paper: "Paper 2", name: "Dr Jekyll & Mr Hyde", slug: "jekyll-hyde", specRef: "19th Century", tier: "both", difficulty: 3, estimatedMinutes: 35, orderIndex: 5 },
      { paper: "Paper 2", name: "Power & Conflict Poetry", slug: "power-conflict-poetry", specRef: "Poetry", tier: "both", difficulty: 4, estimatedMinutes: 40, orderIndex: 6 },
      { paper: "Paper 2", name: "Unseen Poetry", slug: "unseen-poetry", specRef: "Poetry", tier: "both", difficulty: 4, estimatedMinutes: 30, orderIndex: 7 },
    ],
  },
];

async function seed() {
  console.log("Seeding database...");

  // Insert AQA board
  const { data: board, error: boardError } = await supabase
    .from("exam_boards")
    .upsert({ name: "AQA", code: "aqa", region: "England" }, { onConflict: "code" })
    .select()
    .single();

  if (boardError) {
    console.error("Error inserting board:", boardError);
    return;
  }
  console.log("Board inserted:", board.name);

  for (const subject of AQA_SUBJECTS) {
    // Insert subject
    const { data: subjectRow, error: subjectError } = await supabase
      .from("subjects")
      .upsert(
        {
          board_id: board.id,
          name: subject.name,
          slug: subject.slug,
          icon: subject.icon,
          color: subject.color,
          topic_count: subject.topics.length,
        },
        { onConflict: "board_id,slug" }
      )
      .select()
      .single();

    if (subjectError) {
      console.error(`Error inserting subject ${subject.name}:`, subjectError);
      continue;
    }
    console.log(`  Subject: ${subjectRow.name} (${subject.topics.length} topics)`);

    // Insert topics
    for (const topic of subject.topics) {
      const { error: topicError } = await supabase
        .from("topics")
        .upsert(
          {
            subject_id: subjectRow.id,
            paper: topic.paper,
            name: topic.name,
            slug: topic.slug,
            spec_ref: topic.specRef,
            tier: topic.tier,
            difficulty: topic.difficulty,
            estimated_minutes: topic.estimatedMinutes,
            order_index: topic.orderIndex,
          },
          { onConflict: "subject_id,slug" }
        );

      if (topicError) {
        console.error(`    Error inserting topic ${topic.name}:`, topicError);
      } else {
        console.log(`    Topic: ${topic.name}`);
      }
    }
  }

  // Insert additional boards (empty for now, topics added later)
  const otherBoards = [
    { name: "Edexcel", code: "edexcel", region: "England" },
    { name: "OCR", code: "ocr", region: "England" },
    { name: "WJEC/Eduqas", code: "wjec", region: "Wales" },
    { name: "CCEA", code: "ccea", region: "Northern Ireland" },
  ];

  for (const b of otherBoards) {
    const { error } = await supabase
      .from("exam_boards")
      .upsert(b, { onConflict: "code" });
    if (error) {
      console.error(`Error inserting board ${b.name}:`, error);
    } else {
      console.log(`Board inserted: ${b.name}`);
    }
  }

  console.log("\nSeeding complete!");
}

seed().catch(console.error);
