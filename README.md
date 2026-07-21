# GCSERevise

GCSERevise is a Next.js revision product for six AQA GCSE subjects:

- Maths
- Biology
- Chemistry
- Physics
- Geography
- History

The public learning loop works without an account. Each published topic includes revision notes, a five-question auto-marked quiz, recall flashcards, guided tutor support and device-saved progress.

## Current revision library

- 72 topic workspaces
- 360 auto-marked questions with explanations
- 544 flashcards
- Official AQA specification and assessment-resource links
- A device-local “My Revision” dashboard
- Guided tutor fallback that works without external credentials

Maths and Science content is compiled from the original Supabase seed banks into `src/data/revision-content.generated.json`. Geography and History starter content lives in `src/data/revision-extensions.ts`.

## Local development

```bash
npm ci
npm run dev
```

Run validation with:

```bash
npm run lint
npm run build
```

Regenerate the static Maths and Science content library after editing the seed banks:

```bash
npx tsx scripts/build-static-library.ts
```

## Tutor configuration

The tutor always has a grounded, deterministic study-pack fallback. To enable live OpenAI responses, configure:

```bash
OPENAI_API_KEY=...
OPENAI_TUTOR_MODEL=gpt-5.6-terra
```

`OPENAI_TUTOR_MODEL` is optional. The API route uses the Responses API, keeps the key server-side and falls back automatically if the live request fails.

## Data and privacy

Anonymous revision progress and paper counts are stored in the browser on the current device. No account is needed. Existing Supabase authentication remains available, but authenticated users currently return to the same dependable public revision dashboard.

## Deployment

The project keeps its existing Next.js standalone/DigitalOcean architecture. Run the production build before deployment; the generated topic routes are statically rendered and the tutor endpoint is server-rendered.
