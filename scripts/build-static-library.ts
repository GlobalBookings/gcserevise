import { writeFileSync } from "node:fs";
import { resolve } from "node:path";
import { flashcardsByTopicSlug } from "./seed-flashcards";
import { questionsByTopicSlug } from "./seed-quizzes";

const targetSlugs = new Set([
  "integers-decimals", "fractions-decimals-percentages", "indices-standard-form", "surds", "algebraic-expressions", "linear-equations", "quadratic-equations", "simultaneous-equations", "sequences", "straight-line-graphs", "quadratic-graphs", "inequalities", "ratio-proportion", "rates-of-change", "angles-polygons", "area-perimeter", "volume-surface-area", "transformations", "pythagoras-trigonometry", "vectors", "circle-theorems", "data-representation", "averages-spread", "probability",
  "cell-structure", "cell-division", "transport-in-cells", "organisation-animals", "organisation-plants", "communicable-diseases", "non-communicable-diseases", "photosynthesis", "respiration", "homeostasis", "hormones-reproduction", "inheritance-variation", "evolution-classification", "ecology",
  "atomic-structure", "bonding-structure", "quantitative-chemistry", "chemical-changes", "energy-changes", "rate-of-reaction", "organic-chemistry", "chemical-analysis", "atmosphere", "using-resources",
  "energy", "electricity", "particle-model", "atomic-radiation", "forces", "waves", "magnetism", "space-physics",
]);

const library = Object.fromEntries(
  [...targetSlugs].map((slug) => [
    slug,
    {
      flashcards: flashcardsByTopicSlug[slug] ?? [],
      questions: questionsByTopicSlug[slug] ?? [],
    },
  ])
);

const missing = [...targetSlugs].filter(
  (slug) => !library[slug].flashcards.length || !library[slug].questions.length
);

if (missing.length) {
  throw new Error(`Missing revision content for: ${missing.join(", ")}`);
}

const outputPath = resolve("src/data/revision-content.generated.json");
writeFileSync(outputPath, `${JSON.stringify(library, null, 2)}\n`);
console.log(`Generated ${outputPath} with ${targetSlugs.size} complete topics.`);
