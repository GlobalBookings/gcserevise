import { getPublishedSubjects } from "../src/data/revision-library";

const host = "gcserevise.co.uk";
const key = "gcserevise2026indexnow9f4c2b8d1a7e6";
const keyLocation = `https://${host}/${key}.txt`;
const paths = ["/", "/subjects", "/past-papers", "/search", "/diagnostic", "/exam-resources", "/premium", "/editorial-standards", "/subjects/aqa/combined-science"];

for (const subject of getPublishedSubjects()) {
  paths.push(`/subjects/aqa/${subject.slug}`);
  for (const topic of subject.topics) paths.push(`/subjects/aqa/${subject.slug}/${topic.slug}`);
}

const response = await fetch("https://api.indexnow.org/indexnow", {
  method: "POST",
  headers: { "content-type": "application/json; charset=utf-8" },
  body: JSON.stringify({
    host,
    key,
    keyLocation,
    urlList: paths.map((path) => `https://${host}${path}`),
  }),
});

if (!response.ok) {
  throw new Error(`IndexNow returned ${response.status}: ${await response.text()}`);
}

console.log(`Submitted ${paths.length} URLs to IndexNow (${response.status}).`);
