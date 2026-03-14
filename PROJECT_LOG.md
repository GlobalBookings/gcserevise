# GCSERevise - Project Log

## Session 1: Initial Build & Deployment (13 March 2026)

### Decisions Made
- **Tech stack:** Next.js 16 (App Router), TypeScript, Tailwind CSS
- **Hosting:** DigitalOcean App Platform ($5/mo, apps-s-1vcpu-0.5gb)
- **Database & Auth:** Supabase (Postgres + email/password auth)
- **User model:** Students only for now (parents/teachers added later)
- **Domain:** gcserevise.co.uk (pending DNS) + gcserevise-94yh6.ondigitalocean.app (active)
- **GitHub repo:** https://github.com/GlobalBookings/gcserevise

---

### Phase 1: Core Platform Build

#### What Was Built
1. **Scaffolded** Next.js 16 project with TypeScript, Tailwind CSS, App Router
2. **Installed dependencies:**
   - @supabase/supabase-js, @supabase/ssr (database + auth)
   - lucide-react (icons)
   - date-fns (date utilities)
   - clsx, tailwind-merge, class-variance-authority (styling)
   - framer-motion (animations - added in Phase 2)
   - canvas-confetti (celebration effects - added in Phase 2)

3. **Created Supabase project** at wmncmoauedmlzbfxajtj.supabase.co

4. **Database schema** (001_initial_schema.sql) - 15 tables:
   - `exam_boards` - AQA, Edexcel, OCR, WJEC, CCEA
   - `subjects` - Per board with slugs, icons, colors
   - `topics` - Per subject with spec refs, tiers, difficulty, estimated minutes
   - `revision_notes` - HTML content per topic
   - `flashcards` - Term/definition/hint per topic
   - `quiz_questions` - MCQ with options, correct answer, explanation
   - `past_papers` - PDF/mark scheme links
   - `user_profiles` - Extends Supabase auth (display name, year group, board)
   - `user_subjects` - Student's chosen subjects with tier and target grade
   - `user_topic_progress` - Confidence levels (0-3), review dates, spaced repetition
   - `user_quiz_attempts` - Quiz answer history
   - `user_study_sessions` - Daily study time and reflection
   - `plan_tasks` - Daily revision plan tasks
   - `user_streaks` - Current and longest streak tracking
   - Row Level Security on ALL tables
   - Auto-profile + streak creation trigger on signup
   - Performance indexes on all foreign keys and common queries

5. **Seed data** (002_seed_data.sql):
   - 5 exam boards
   - 6 AQA subjects: Maths (24 topics), Biology (14), Chemistry (10), Physics (8), English Language (8), English Literature (7)
   - **71 total topics** with spec references, tiers, difficulty ratings, estimated study times

6. **Supabase Auth:**
   - Email/password signup and login
   - Server-side session management via @supabase/ssr
   - Middleware protecting /dashboard/* routes
   - Automatic redirect: unauthenticated -> /auth/login, authenticated -> /dashboard

#### UI Components Built
- `Button` - 7 variants (default, secondary, outline, ghost, destructive, success, link)
- `Card` - Card, CardHeader, CardTitle, CardDescription, CardContent
- `Input` - Styled form input with focus ring
- `Badge` - 6 variants (default, secondary, success, warning, destructive, outline)
- `Progress` - Animated progress bar with customisable indicator
- `Navbar` - Responsive with mobile hamburger menu
- `Footer` - 4-column layout with subject/resource/board links
- `DashboardSidebar` - Fixed sidebar with nav links, streak display, sign out

#### Spaced Repetition Algorithm (src/lib/planner.ts)
- Confidence 0 (Not started) -> review next day
- Confidence 1 (Needs Work) -> review every 2 days
- Confidence 2 (Getting There) -> review every 7 days
- Confidence 3 (Mastered) -> review every 21 days
- Exam Prep Mode (4 weeks before): Level 1 daily, Level 2 every 2 days, Level 3 weekly
- Task generation prioritises by confidence ascending + days overdue

---

### Phase 2: Gamification & Visual Polish

#### Gamification System (src/lib/gamification.ts)
- **XP Rewards:**
  - Complete revision: 25 XP
  - Complete quiz: 40 XP
  - Perfect quiz score: 75 XP
  - Complete flashcards: 20 XP
  - Daily streak bonus: 15 XP
  - Confidence increase: 30 XP
  - Master a topic: 100 XP
  - Level up bonus: 50 XP

- **10 Levels:**
  1. Beginner (0 XP)
  2. Starter (100 XP)
  3. Learner (250 XP)
  4. Explorer (500 XP)
  5. Achiever (800 XP)
  6. Scholar (1200 XP)
  7. Expert (1800 XP)
  8. Master (2500 XP)
  9. Champion (3500 XP)
  10. Legend (5000 XP)

- **15 Badges** (4 rarities: common, rare, epic, legendary):
  - Welcome!, Quiz Taker, On a Roll (3-day streak) - Common
  - Week Warrior (7-day), Flawless (100% quiz), Explorer (5 topics), Level 5 - Rare
  - Well Rounded (25 topics), All Subjects, Knowledge King (10 mastered) - Epic
  - Unstoppable (30-day streak), GCSE Legend (Level 10) - Legendary
  - Night Owl, Early Bird - Common fun badges

- **Database migration** (003_gamification.sql):
  - Added total_xp and badges_earned columns to user_profiles
  - Created user_badge_events table
  - Created user_xp_log table
  - RLS policies on both
  - **STATUS: NOT YET RUN IN SUPABASE - needs manual SQL Editor paste**

#### Animation Components
- `useConfetti()` - fireConfetti (burst), fireStars (star shower), fireSides (dual side cannons)
- `XPToast` - Animated +XP notification with bounce and auto-dismiss
- `LevelBadge` - SVG progress ring around level number, animated fill
- `StreakDisplay` - Pulsing flame animation, full and compact modes
- `BadgeCard` - Hover animation, locked/unlocked states, rarity coloring
- `AnimatedCounter` - Spring-physics number counting animation

#### Onboarding Flow (/dashboard/onboarding)
- 4-step wizard: Exam Board -> Year Group -> Subject Picker -> Confirmation
- Animated transitions between steps with Framer Motion
- Subject picker with 24 subjects, icons, and color badges
- Saves year group to Supabase on completion
- Confetti celebration on final step

#### Enhanced Dashboard (/dashboard)
- Time-based greeting (morning/afternoon/evening)
- Level badge with animated progress ring in header
- Compact streak display in header
- Animated stat cards with spring counters
- Task completion: click "Start" -> XP toast + confetti
- All-tasks-done celebration with Trophy icon and star shower
- +XP labels on completed tasks
- Full streak card with pulsing flames and encouraging messages
- Gradient exam countdown card

#### Enhanced Quiz Engine (/dashboard/quizzes/[topicId])
- Slide-in animation for each question
- Ring highlight on selected answer (2px indigo border)
- Spring animation on correct/incorrect icons
- Confetti on correct answer
- Results screen: gradient background, animated score, star trophy for perfect
- XP reward display with Zap icon
- Different messaging for perfect/good/needs-work scores

#### Enhanced Flashcard Deck (/dashboard/flashcards/[topicId])
- 3D card flip animation
- "Got it!" (green) / "Still learning" (amber) tracking
- Confetti on each "Got it!" tap
- Completion screen with known/learning breakdown
- XP reward display
- Hint system with show/hide toggle

---

### Pages Built (18 routes total)

| Route | Type | Description |
|-------|------|-------------|
| `/` | Static | Landing page: hero, stats, how-it-works, features, subjects, FAQ (with JSON-LD), CTA |
| `/auth/login` | Static | Email/password login with Supabase |
| `/auth/signup` | Static | Student registration with benefits list |
| `/subjects` | Static | All 30+ GCSE subjects grouped by 7 categories |
| `/subjects/[board]` | Dynamic SSR | Board-specific subject listing with breadcrumbs + JSON-LD |
| `/subjects/[board]/[subject]` | Dynamic SSR | Topic list grouped by paper, spec refs, study times + JSON-LD |
| `/subjects/[board]/[subject]/[topic]` | Dynamic SSR | Public revision notes, key terms, sample questions + JSON-LD |
| `/past-papers` | Static | Past paper archive with board filter tabs |
| `/dashboard` | Client | Gamified hub: tasks, XP, streaks, progress, countdown |
| `/dashboard/onboarding` | Client | 4-step setup wizard for new students |
| `/dashboard/planner` | Client | Weekly plan with day tabs, task completion, confidence |
| `/dashboard/progress` | Client | Subject mastery breakdown with topic-level detail |
| `/dashboard/quizzes/[topicId]` | Client | Gamified MCQ quiz with XP rewards |
| `/dashboard/flashcards/[topicId]` | Client | Gamified flashcard deck with XP rewards |
| `/dashboard/settings` | Client | Profile, exam board, subject selection |
| `/sitemap.xml` | Generated | Auto-generated with ~100+ URLs |
| `/robots.txt` | Generated | Allows public, blocks /dashboard/ and /api/ |

---

### SEO Implementation
- **Sitemap:** Auto-generated covering all boards, subjects, and topic slugs
- **Robots.txt:** Allows all public pages, blocks /dashboard/ and /api/
- **JSON-LD structured data:**
  - WebSite schema (with SearchAction)
  - EducationalOrganization schema
  - Course schema (on subject and topic pages)
  - BreadcrumbList schema (on all nested pages)
  - FAQPage schema (on homepage)
- **Meta tags:** Title templates ("%s | GCSERevise"), unique descriptions per page
- **Open Graph:** Full tags with en_GB locale on all pages
- **Twitter cards:** summary_large_image
- **Canonical URLs:** On every page (metadataBase + alternates.canonical)
- **Google bot directives:** max-video-preview, max-image-preview, max-snippet
- **Security headers:** X-Content-Type-Options, X-Frame-Options, X-XSS-Protection, Referrer-Policy
- **Caching:** /subjects/* pages: 1hr browser, 24hr CDN, stale-while-revalidate
- **poweredByHeader: false** (removes X-Powered-By: Next.js)

---

### Infrastructure & Deployment
- **Dockerfile:** Multi-stage Alpine build (deps -> build -> runner), non-root user, port 3000
- **DO App Platform config:** .do/app.yaml
- **Next.js config:** standalone output, compression, AVIF/WebP images, security headers
- **Auth middleware:** Protects /dashboard/*, redirects appropriately

### Deployment Status (as of 13 March 2026)
- [x] Supabase project created and configured
- [x] 001_initial_schema.sql run (15 tables, RLS, triggers)
- [x] 002_seed_data.sql run (5 boards, 6 subjects, 71 topics)
- [ ] 003_gamification.sql NOT YET RUN (XP log, badge events tables)
- [x] .env.local configured with Supabase credentials
- [x] Pushed to GitHub (GlobalBookings/gcserevise) - 4 commits
- [x] DO App Platform created, deployed, and LIVE
- [x] Active at: https://gcserevise-94yh6.ondigitalocean.app
- [x] gcserevise.co.uk domain added (DNS pending)
- [x] Env vars set in DO (unencrypted, as they're NEXT_PUBLIC_)

### Database Content Status
| Table | Rows | Status |
|-------|------|--------|
| exam_boards | 5 | Done |
| subjects | 6 | Done (AQA only) |
| topics | 71 | Done (AQA only) |
| revision_notes | 0 | EMPTY - needs seeding |
| quiz_questions | 0 | EMPTY - needs seeding |
| flashcards | 568 | Done (8 per topic, all 71 topics) |
| past_papers | 0 | Empty (links to be added) |

### Key Files Reference
```
/supabase/migrations/001_initial_schema.sql     -- Core DB schema + RLS
/supabase/migrations/002_seed_data.sql          -- Boards + AQA topics
/supabase/migrations/003_gamification.sql       -- XP + badges tables (NOT RUN YET)
/scripts/seed.ts                                -- Programmatic seed script (uses anon key, blocked by RLS)
/scripts/seed-flashcards.ts                     -- Flashcard seeder (run successfully, 568 cards)
/src/lib/supabase/client.ts                     -- Browser Supabase client
/src/lib/supabase/server.ts                     -- Server Supabase client
/src/lib/supabase/middleware.ts                 -- Auth session management
/src/lib/planner.ts                             -- Spaced repetition algorithm
/src/lib/gamification.ts                        -- XP, levels, badges, streaks
/src/lib/utils.ts                               -- Utility functions (cn, formatDate, confidence helpers)
/src/components/seo/json-ld.tsx                 -- All JSON-LD schema components
/src/components/ui/confetti.tsx                 -- Confetti hook
/src/components/ui/xp-toast.tsx                 -- XP notification component
/src/components/ui/level-badge.tsx              -- Level ring component
/src/components/ui/streak-display.tsx           -- Streak flame component
/src/components/ui/badge-card.tsx               -- Achievement badge component
/src/components/ui/animated-counter.tsx         -- Spring counter component
/src/data/aqa-seed.ts                           -- AQA topic data (TypeScript)
/.env.local                                     -- Supabase credentials (GITIGNORED)
/Dockerfile                                     -- Production Docker build
/.do/app.yaml                                   -- DO App Platform config
```

---

---

## Session 2: Content, SEO & Data Wiring (13 March 2026, continued)

### Content Strategy Decision
- **Cannot scrape/republish BBC Bitesize** -- copyrighted content
- **Cannot use AI-generated revision notes as authoritative** -- risk of inaccuracies
- **Approach chosen:** Link to BBC Bitesize per topic + original quizzes/flashcards based on curriculum facts + plan for teacher-verified notes

### What Was Done
1. **003_gamification.sql** -- run successfully in Supabase SQL Editor (user did manually)
2. **355 quiz questions seeded** -- 5 per topic, all 71 topics, all 6 subjects (scripts/seed-quizzes.ts)
3. **568 flashcards seeded** -- 8 per topic, all 71 topics, all 6 subjects (scripts/seed-flashcards.ts)
4. **Topic pages wired to Supabase** -- now pull real notes, flashcard counts, quiz counts from database
5. **BBC Bitesize links added** -- direct links to verified AQA revision content per topic:
   - All 14 Biology topics mapped to Bitesize guides
   - All 10 Chemistry topics mapped (some with 3-4 guides each)
   - All 8 Physics topics mapped
   - Key Maths topics mapped
   - All 7 English Literature topics mapped
   - File: src/data/bitesize-links.ts

### Database Content Status (Updated)
| Table | Rows | Status |
|-------|------|--------|
| exam_boards | 5 | Done |
| subjects | 6 | Done (AQA only) |
| topics | 71 | Done (AQA only) |
| revision_notes | 0 | EMPTY -- needs teacher-verified content |
| quiz_questions | 355 | Done (5 per topic, AI-generated -- should be teacher-reviewed) |
| flashcards | 568 | Done (8 per topic, AI-generated -- should be teacher-reviewed) |
| past_papers | 0 | Empty (links to be added) |
| user_xp_log | 0 | Table exists (gamification migration run) |
| user_badge_events | 0 | Table exists (gamification migration run) |

### Outstanding / Next Steps
- [x] ~~Run 003_gamification.sql in Supabase SQL Editor~~
- [x] ~~Seed quiz questions for all 71 topics~~
- [x] ~~Seed flashcards for all 71 topics~~
- [x] ~~Wire topic pages to pull real content from Supabase~~
- [x] ~~Connect gcserevise.co.uk domain (DNS done by user)~~
- [ ] **Get quiz/flashcard content teacher-reviewed** for accuracy
- [ ] **Write/commission revision notes** (teacher-authored or spec-based summaries)
- [ ] **Wire quiz page** to pull questions per topic from Supabase (currently hardcoded sample)
- [ ] **Wire flashcard page** to pull cards per topic from Supabase (currently hardcoded sample)
- [ ] **Submit sitemap** to Google Search Console (https://gcserevise.co.uk/sitemap.xml)
- [ ] **Submit sitemap** to Bing Webmaster Tools
- [ ] Add Edexcel + OCR board topic data
- [ ] Add more subjects (History, Geography, Computer Science, etc.)
- [ ] School partnerships outreach
- [ ] TikTok/social content pipeline
- [ ] **IMPORTANT: Rotate Supabase service role key** (was shared in chat session)
