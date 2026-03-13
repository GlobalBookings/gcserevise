import { MetadataRoute } from "next";

const BASE_URL = "https://gcserevise.co.uk";

// All subjects and their topics for sitemap generation
const boardSubjects = [
  {
    board: "aqa",
    subjects: [
      { slug: "maths", topics: ["integers-decimals", "fractions-decimals-percentages", "indices-standard-form", "surds", "algebraic-expressions", "linear-equations", "quadratic-equations", "simultaneous-equations", "sequences", "straight-line-graphs", "quadratic-graphs", "inequalities", "ratio-proportion", "rates-of-change", "angles-polygons", "area-perimeter", "volume-surface-area", "transformations", "pythagoras-trigonometry", "vectors", "circle-theorems", "data-representation", "averages-spread", "probability"] },
      { slug: "biology", topics: ["cell-structure", "cell-division", "transport-in-cells", "organisation-animals", "organisation-plants", "communicable-diseases", "non-communicable-diseases", "photosynthesis", "respiration", "homeostasis", "hormones-reproduction", "inheritance-variation", "evolution-classification", "ecology"] },
      { slug: "chemistry", topics: ["atomic-structure", "bonding-structure", "quantitative-chemistry", "chemical-changes", "energy-changes", "rate-of-reaction", "organic-chemistry", "chemical-analysis", "atmosphere", "using-resources"] },
      { slug: "physics", topics: ["energy", "electricity", "particle-model", "atomic-radiation", "forces", "waves", "magnetism", "space-physics"] },
      { slug: "english-language", topics: ["paper1-reading-comprehension", "paper1-language-analysis", "paper1-structure-analysis", "paper1-evaluation", "paper1-creative-writing", "paper2-reading-comprehension", "paper2-comparison", "paper2-viewpoint-writing"] },
      { slug: "english-literature", topics: ["macbeth", "romeo-and-juliet", "inspector-calls", "christmas-carol", "jekyll-hyde", "power-conflict-poetry", "unseen-poetry"] },
    ],
  },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages: MetadataRoute.Sitemap = [
    { url: BASE_URL, lastModified: new Date(), changeFrequency: "weekly", priority: 1.0 },
    { url: `${BASE_URL}/subjects`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.9 },
    { url: `${BASE_URL}/past-papers`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.8 },
    { url: `${BASE_URL}/auth/signup`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE_URL}/auth/login`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.5 },
  ];

  const topicPages: MetadataRoute.Sitemap = [];

  for (const { board, subjects } of boardSubjects) {
    // Board index page
    topicPages.push({
      url: `${BASE_URL}/subjects/${board}`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    });

    for (const subject of subjects) {
      // Subject index page
      topicPages.push({
        url: `${BASE_URL}/subjects/${board}/${subject.slug}`,
        lastModified: new Date(),
        changeFrequency: "weekly",
        priority: 0.8,
      });

      // Individual topic pages
      for (const topic of subject.topics) {
        topicPages.push({
          url: `${BASE_URL}/subjects/${board}/${subject.slug}/${topic}`,
          lastModified: new Date(),
          changeFrequency: "monthly",
          priority: 0.7,
        });
      }
    }
  }

  return [...staticPages, ...topicPages];
}
