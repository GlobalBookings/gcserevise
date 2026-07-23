# GCSERevise

GCSERevise is a local-first Next.js revision platform for high-demand UK GCSE routes.

## Learning platform

- 11 complete AQA subjects plus a Combined Science: Trilogy route
- 111 unique topic workspaces
- 555 auto-marked questions with explanations
- 778 active-recall flashcards
- 222 exam-practice prompts with approaches, mark points and worked answers
- Structured notes, objectives, common mistakes and retrieval prompts
- Guided topic tutor with a deterministic fallback
- Diagnostic checks, adaptive daily planning and a mistake notebook
- Site-wide topic and key-term search
- Official specification and assessment-resource links
- Edexcel and OCR board hubs that clearly distinguish shared core knowledge from board-specific assessment

The public learning loop works without an account. Progress is stored on the device first. Authenticated learners can sync the same state through Supabase after migration `004_learning_platform.sql` is applied.

## Local development

```bash
npm ci
npm run dev
```

Validate the complete static library and production build:

```bash
npm run content:check
npm run lint
npm run build
```

Regenerate the original Maths and Science JSON library after editing its source seed banks:

```bash
npm run content:build
```

## Environment

Copy `.env.example` to `.env.local` and configure the public Supabase project values. The tutor always has a grounded study-pack fallback; `OPENAI_API_KEY` only enables live responses.

A Supabase user with `app_metadata.role = editor` receives access to `/editor/review` and `/editor/analytics`. The same claim is enforced by row-level security for review decisions and aggregate analytics.

## Database

Apply migrations in order through Supabase. Migration `004_learning_platform.sql` adds:

- local-first learner cloud state protected by row-level security;
- the human content-review queue;
- aggregate, no-cookie product analytics.

Analytics stores daily event counts only. It does not store IP addresses, cookies, email addresses or individual browsing histories.

## SEO and discovery

Topic routes are statically generated with canonical metadata, breadcrumbs, `LearningResource` data and visible flashcard `Quiz`/`Question` markup. The sitemap includes all public resources and exam-board hubs. Robots rules explicitly allow Googlebot, Bingbot, OAI-SearchBot and GPTBot while excluding learner, editor, authentication and API routes.

After a production deployment:

```bash
npm run seo:indexnow
```

## Deployment

The project keeps its existing Next.js standalone/DigitalOcean architecture. A push to `main` triggers production deployment for `https://gcserevise.co.uk`.
