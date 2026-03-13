# GCSERevise - Project Log

## Session 1: Initial Build & Deployment (13 March 2026)

### Decisions Made
- **Tech stack:** Next.js 16 (App Router), TypeScript, Tailwind CSS
- **Hosting:** DigitalOcean App Platform ($5/mo, apps-s-1vcpu-0.5gb)
- **Database & Auth:** Supabase (Postgres + email/password auth)
- **User model:** Students only for now (parents/teachers added later)
- **Domain:** gcserevise.co.uk
- **GitHub repo:** https://github.com/GlobalBookings/gcserevise

### What Was Built
1. **Scaffolded** Next.js project with TypeScript and Tailwind CSS
2. **Installed** dependencies: @supabase/supabase-js, @supabase/ssr, lucide-react, date-fns, clsx, tailwind-merge, class-variance-authority
3. **Created Supabase project** at wmncmoauedmlzbfxajtj.supabase.co
4. **Database schema** (001_initial_schema.sql) - 15 tables:
   - exam_boards, subjects, topics, revision_notes, flashcards, quiz_questions, past_papers
   - user_profiles, user_subjects, user_topic_progress, user_quiz_attempts, user_study_sessions, plan_tasks, user_streaks
   - Row Level Security on all tables
   - Auto-profile creation trigger on signup
   - Performance indexes
5. **Seed data** (002_seed_data.sql):
   - 5 exam boards: AQA, Edexcel, OCR, WJEC, CCEA
   - 6 AQA subjects: Maths (24 topics), Biology (14), Chemistry (10), Physics (8), English Language (8), English Literature (7)
   - 71 total topics with spec refs, tiers, difficulty ratings, estimated study times

### Pages Built (17 routes)
| Route | Type | Description |
|-------|------|-------------|
| `/` | Static | Landing page with hero, features, subjects, FAQ, CTA |
| `/auth/login` | Static | Email/password login |
| `/auth/signup` | Static | Student registration |
| `/subjects` | Static | All 30+ GCSE subjects grouped by category |
| `/subjects/[board]` | Dynamic | Board-specific subject listing (AQA, Edexcel, etc.) |
| `/subjects/[board]/[subject]` | Dynamic | Topic list for a subject with spec refs |
| `/subjects/[board]/[subject]/[topic]` | Dynamic | Public revision notes, key terms, sample questions |
| `/past-papers` | Static | Past paper archive by board/subject/year |
| `/dashboard` | Static | Student portal hub: tasks, stats, progress, exam countdown |
| `/dashboard/planner` | Static | Weekly revision plan with day tabs and task completion |
| `/dashboard/progress` | Static | Subject-by-subject mastery breakdown |
| `/dashboard/quizzes/[topicId]` | Dynamic | Quiz engine: multiple choice, explanations, scoring |
| `/dashboard/flashcards/[topicId]` | Dynamic | Flashcard deck with flip, hints, known/unknown |
| `/dashboard/settings` | Static | Profile, exam board, subject selection |
| `/sitemap.xml` | Generated | Auto-generated sitemap with all topic URLs |
| `/robots.txt` | Generated | Search engine directives |

### SEO Implementation
- **Sitemap:** Auto-generated with all static + dynamic topic URLs
- **Robots.txt:** Allows all public pages, blocks /dashboard/ and /api/
- **JSON-LD structured data:** Website, Organization, Course, Breadcrumb, FAQ schemas
- **Meta tags:** Title templates, descriptions, keywords on every page
- **Open Graph:** Full OG tags with locale (en_GB)
- **Twitter cards:** summary_large_image on all pages
- **Canonical URLs:** On every page to prevent duplicate content
- **Security headers:** X-Content-Type-Options, X-Frame-Options, X-XSS-Protection, Referrer-Policy
- **Caching:** Public subject pages cached (1hr browser, 24hr CDN, stale-while-revalidate)

### Infrastructure
- **Dockerfile:** Multi-stage build (deps -> build -> runner), runs as non-root user
- **DO App Platform config:** .do/app.yaml with env vars
- **Next.js config:** Standalone output, compression, security headers, image optimization
- **Auth middleware:** Protects /dashboard/* routes, redirects unauthenticated users

### Key Files
```
/supabase/migrations/001_initial_schema.sql  -- Database tables + RLS
/supabase/migrations/002_seed_data.sql       -- Exam boards + AQA topics
/src/lib/supabase/client.ts                  -- Browser Supabase client
/src/lib/supabase/server.ts                  -- Server Supabase client
/src/lib/supabase/middleware.ts              -- Auth session management
/src/lib/planner.ts                          -- Spaced repetition algorithm
/src/data/aqa-seed.ts                        -- AQA topic data (TypeScript)
/scripts/seed.ts                             -- Programmatic seed script
/.env.local                                  -- Supabase credentials (gitignored)
```

### Deployment Steps Completed
1. Created Supabase project
2. Ran 001_initial_schema.sql in Supabase SQL Editor
3. Ran 002_seed_data.sql in Supabase SQL Editor
4. Added .env.local with Supabase URL + anon key
5. Pushed to GitHub (GlobalBookings/gcserevise)
6. Created DO App Platform app from GitHub repo
7. Set env vars (NEXT_PUBLIC_SUPABASE_URL, NEXT_PUBLIC_SUPABASE_ANON_KEY) - unencrypted
8. Selected $5/mo instance (512MB RAM, 1 shared vCPU)
9. Deployment in progress...

### Pending / Next Steps
- [ ] Connect gcserevise.co.uk domain in DO
- [ ] Verify deployment is live
- [ ] Add Edexcel + OCR topic data
- [ ] Add on-site revision notes content to database
- [ ] Add quiz questions and flashcards to database
- [ ] Wire dashboard to live Supabase data (currently placeholder)
- [ ] Add direct student sign-up flow (onboarding: pick board, subjects, tiers)
- [ ] School partnerships outreach
- [ ] TikTok/social content pipeline
- [ ] Google Search Console setup + indexing
