# Life Goals Dashboard — GitHub Issues Backlog

**[🇬🇧 English](BACKLOG.en.md)** · **[🇷🇺 Русский](BACKLOG.md)**

---

> **Repository:** life-goals-dashboard
> **Created:** 2026-04-13
> **Methodology:** GitHub Issues + GitHub Projects (Board view)
> **Story Points:** Fibonacci (1, 2, 3, 5, 8, 13)
>
> **🧪 TDD Study Plans:** All tasks from this backlog are integrated into the [learning plan](ONBOARDING_LEARNING_PLAN.md) as TDD assignments with ready-made tests. Interactive HTML modules: [`docs/study-plans/`](study-plans/index.html). For each task, tests are provided (JUnit 5 + MockK, Jest + React Testing Library, bash scripts) that need to pass by writing the implementation.

---

## GitHub Projects Setup

### Labels (create in repository)

**Type:**
- `epic` — large feature/module, combines issues through Task List
- `story` — user-facing functionality
- `subtask` — technical subtask within story
- `bug` — bug
- `chore` — tech debt, CI, infra

**Module:**
- `common` — shared framework, auth, widget system
- `interviewprep` — Interview Prep widget
- `fitness` — Fitness Tracker widget
- `budget` — Budget Planner widget
- `dashboard` — Dashboard shell
- `notification` — Notification system
- `infra` — Docker, CI/CD, deploy

**Priority:**
- `P0-critical` — blocks other tasks
- `P1-high` — core functionality
- `P2-medium` — important, but not blocking
- `P3-low` — nice to have

**Area:**
- `backend` — Kotlin/Spring Boot
- `frontend` — React/TypeScript
- `db` — migrations, schema
- `graphql` — schema, resolvers
- `testing` — tests
- `security` — credential vault, encryption, auth (M7)
- `observability` — structured logging, metrics, dashboards (M7)
- `docs` — documentation

**Phase (M7 only):**
- `phase-0`, `phase-1`, `phase-2`, `phase-3` — Budget Accounts Aggregation phases (see M7)
- `type:spike` — time-boxed investigation

**Widget tag (optional):**
- `widget:budget`, `widget:fitness`, `widget:interviewprep`

### Milestones (instead of Sprints)

| Milestone | Scope | Goal |
|-----------|-------|------|
| `M1 — Foundation` | Scaffolding + DB + Auth + Widget Framework | Project runs locally, auth works |
| `M2 — Dashboard + Interview Prep` | Dashboard shell + full Interview Prep widget | First widget works end-to-end |
| `M3 — Fitness Tracker` | Workouts + Food + Recipes + Meals | Second widget fully functional |
| `M4 — Budget Planner` | Transactions + Exchange Rates + Forecast | Third widget ready |
| `M5 — Notifications + Testing` | Real-time notifications + test coverage | Achievements, WebSocket, >80% coverage |
| `M6 — Polish + Deploy` | Export, advanced features, production | Production-ready |
| `M7 — Budget Accounts Aggregation` | Manual + crypto.com + Open Banking providers, credential vault, Accounts UI | Budget widget aggregates balances from external sources in real time |

### Custom Fields (in GitHub Projects)

| Field | Type | Values |
|-------|------|--------|
| Story Points | Number | 1, 2, 3, 5, 8, 13 |
| Sprint | Iteration | 2-week iterations |

---

## Milestone 1: Foundation

### Epic: Project Scaffolding & Infrastructure

> Bootstrapping both projects, Docker, CI/CD.

---

#### `#1` Initialize Kotlin/Spring Boot backend project
**Labels:** `story` `common` `infra` `backend` `P0-critical`
**Milestone:** M1 — Foundation
**Story Points:** 8

Create Gradle 9.4 (Kotlin DSL) project with Kotlin 2.3.20 + Spring Boot 4.0.5 on JDK 25 LTS.

**Checklist (subtasks):**
- [ ] `build.gradle.kts` — DGS, Spring Boot Starter (Web, Data JPA, Security, WebSocket), Flyway, Redis, MockK, Testcontainers, ktlint **(3 SP)**
- [ ] `application.yml` with profiles: dev, test, prod — DB, Redis, JWT, OAuth2, Feature Flags, structured logging **(2 SP)**
- [ ] Logback → structured JSON logging (logstash-encoder, JSON lines → stdout) **(1 SP)**
- [ ] ktlint plugin + `.editorconfig` **(1 SP)**
- [ ] Package structure: `com.mrurec.lifegoals/{common,interviewprep,fitness,budget,dashboard,notification}` **(1 SP)**

---

#### `#2` Initialize React/TypeScript frontend project
**Labels:** `story` `common` `frontend` `P0-critical`
**Milestone:** M1 — Foundation
**Story Points:** 8

Vite 8 (Rolldown) + React 19.2 + TypeScript 6.0 + Relay 20.1 + Jotai 2.x + CSS Modules.

**Checklist:**
- [ ] Vite project: `react-ts` template **(1 SP)**
- [ ] Relay compiler + `RelayEnvironment.ts` (fetchFunction + subscriptionFunction) **(3 SP)**
- [ ] Jotai: `<Provider>` (optional), atoms — `currentUserAtom`, `themeAtom` (`atomWithStorage`), `notificationsAtom` **(2 SP)**
- [ ] ESLint + Prettier + CSS Modules config **(1 SP)**
- [ ] Project structure: `src/{components,features,hooks,atoms,relay,styles}` **(1 SP)**

---

#### `#3` Docker Compose for local development
**Labels:** `story` `infra` `P0-critical`
**Milestone:** M1 — Foundation
**Story Points:** 3

**Checklist:**
- [ ] `docker-compose.yml`: PostgreSQL 18 + Redis 8.6, health checks, volumes **(2 SP)**
- [ ] `Dockerfile` for backend — multi-stage (Gradle build → JRE) **(1 SP)**

---

#### `#4` GitHub Actions CI/CD pipeline
**Labels:** `story` `infra` `P1-high`
**Milestone:** M1 — Foundation
**Story Points:** 5

**Checklist:**
- [ ] Backend workflow: cache → ktlint → test (Testcontainers) → build **(2 SP)**
- [ ] Frontend workflow: npm ci → ESLint → tsc → Relay compiler → test → build **(2 SP)**
- [ ] `.env.example` with complete list of variables **(1 SP)**

---

#### `#5` `.gitignore` and project-level configs
**Labels:** `chore` `infra` `P0-critical`
**Milestone:** M1 — Foundation
**Story Points:** 1

Kotlin, Node, IDE files, `.env`, `__generated__/` (don't ignore — we commit Relay output).

---

### Epic: Database Schema & Migrations

> Flyway migrations. UUID PK, `created_at`, `user_id` FK + indexes.

---

#### `#6` Core tables: user + dashboard widget

**Mockup:** [Dashboard](mockups/dashboard.html)
**Labels:** `story` `db` `common` `dashboard` `P0-critical`
**Milestone:** M1 — Foundation
**Story Points:** 3

**Checklist:**
- [ ] `V1__create_user_table.sql` — `id UUID`, `email`, `name`, `avatar_url`, `oauth_provider`, `oauth_id`, `created_at`
- [ ] `V2__create_dashboard_widget_table.sql` — `id UUID`, `user_id FK`, `widget_type`, `position`, `size`, `config JSONB`, `created_at`. Index: `(user_id)`

---

#### `#7` Interview Prep tables

**Mockup:** [Interview Prep overview](mockups/interview-prep.html) · [Problems list](mockups/coding-problems.html)
**Labels:** `story` `db` `interviewprep` `P0-critical`
**Milestone:** M1 — Foundation
**Story Points:** 5

**Checklist:**
- [ ] `V3__create_coding_problem_table.sql` — categories enum, difficulty, `is_target_company_tagged`, `tags JSONB`
- [ ] `V4__create_problem_attempt_table.sql` — `problem_id FK`, `solved`, `duration_minutes`, `quality_score`
- [ ] `V5__create_review_schedule_table.sql` — SM-2: `next_review_date`, `ease_factor`, `interval_days`, `repetitions`
- [ ] `V6__create_system_design_topic_table.sql` — `confidence_level`, `resources JSONB`
- [ ] `V7__create_behavioral_story_table.sql` — STAR: `situation`, `task`, `action`, `result`

---

#### `#8` Fitness Tracker tables

**Mockup:** [Fitness overview](mockups/fitness.html) · [Body measurements](mockups/body-weight.html)
**Labels:** `story` `db` `fitness` `P0-critical`
**Milestone:** M1 — Foundation
**Story Points:** 8

**Checklist:**
- [ ] `V8__create_workout_table.sql` — `started_at`, `finished_at`
- [ ] `V9__create_exercise_set_table.sql` — `workout_id FK`, `exercise_name`, `set_number`, `reps`, `weight_kg`
- [ ] `V10__create_body_measurement_table.sql` — `weight_kg`, `body_fat_pct`, `measured_at`
- [ ] `V11__create_food_product_table.sql` — nutrition per 100g, `is_custom`, `barcode`
- [ ] `V12__create_recipe_tables.sql` — `recipe` + `recipe_ingredient` (FK → food_product, `amount_grams`)
- [ ] `V13__create_meal_tables.sql` — `meal` (date, type) + `meal_entry` (→ food_product OR recipe, portion/servings)

---

#### `#9` Budget Planner tables

**Mockup:** [Budget overview](mockups/budget.html) · [Transactions](mockups/transactions.html)
**Labels:** `story` `db` `budget` `P0-critical`
**Milestone:** M1 — Foundation
**Story Points:** 3

**Checklist:**
- [ ] `V14__create_transaction_table.sql` — `widget_id FK`, `amount`, `currency`, `category`, `type ENUM(INCOME,EXPENSE)`
- [ ] `V15__create_savings_goal_table.sql` — `widget_id FK`, `current_amount`
- [ ] `V16__create_exchange_rate_cache_table.sql` — `base_currency`, `target_currency`, `rate`, `fetched_at`

---

#### `#10` Notification table

**Mockup:** [Notifications](mockups/notifications.html)
**Labels:** `story` `db` `notification` `P1-high`
**Milestone:** M1 — Foundation
**Story Points:** 2

- [ ] `V17__create_notification_table.sql` — `type ENUM(REMINDER,ACHIEVEMENT,WARNING,MILESTONE)`, `widget_type`, `is_read`

---

### Epic: Common Framework & Auth

> OAuth2/JWT, ViewerContext, GraphQL config, Widget framework, DataLoaders, Redis, FeatureFlags.

---

#### `#11` OAuth2 + JWT authentication

**Mockup:** [Login](mockups/login.html)
**Labels:** `story` `common` `backend` `P0-critical`
**Milestone:** M1 — Foundation
**Story Points:** 8

**Checklist:**
- [ ] Spring Security + OAuth2 client (Google, GitHub) → success handler issues JWT **(3 SP)**
- [ ] `JwtTokenService` — generate, validate, refresh. HS256, claims: userId, email **(2 SP)**
- [ ] `JwtAuthenticationFilter` — extract from header, validate, set SecurityContext **(2 SP)**
- [ ] User registration on first OAuth login **(1 SP)**

---

#### `#12` ViewerContext infrastructure
**Labels:** `story` `common` `backend` `P0-critical`
**Milestone:** M1 — Foundation
**Story Points:** 3

**Checklist:**
- [ ] `ViewerContext` data class: `userId`, `email`, `permissions`
- [ ] `ViewerContextProvider` — extract from DGS request → SecurityContext
- [ ] All repository queries scoped by `userId`

---

#### `#13` DGS GraphQL framework configuration
**Labels:** `story` `common` `backend` `graphql` `P0-critical`
**Milestone:** M1 — Foundation
**Story Points:** 8

**Checklist:**
- [ ] `schema.graphqls` — Root Query/Mutation/Subscription, `Node` interface, `PageInfo` **(2 SP)**
- [ ] `relay.graphqls` — scalars: `DateTime`, `Date`, `JSON` **(1 SP)**
- [ ] `GraphQLExceptionHandler` — map auth exceptions → GraphQL error codes **(2 SP)**
- [ ] `QueryPerformanceInstrumentation` — per-resolver latency, DataLoader batch sizes **(2 SP)**
- [ ] Persisted queries allowlist (load hash→query map at startup) **(1 SP)**

---

#### `#14` Widget Framework (`common/widget/`)

**Mockup:** [Add widget modal](mockups/add-widget.html)
**Labels:** `story` `common` `backend` `P0-critical`
**Milestone:** M1 — Foundation
**Story Points:** 5

**Checklist:**
- [ ] `WidgetProvider` interface: `type`, `metadata`, `configSchema`, `resolve()`, `validateConfig()`
- [ ] `WidgetType` enum: `INTERVIEW_PREP`, `FITNESS`, `BUDGET`
- [ ] `WidgetRegistry` — auto-discover providers from Spring context
- [ ] JSON Schema config validation

---

#### `#15` Relay Connection utilities
**Labels:** `story` `common` `backend` `graphql` `P1-high`
**Milestone:** M1 — Foundation
**Story Points:** 3

- [ ] `ConnectionUtils.kt` — `toConnection()`, cursor encode/decode (Base64)
- [ ] Generic `PageInfo` builder from `Pageable` result

---

#### `#16` DataLoader registry
**Labels:** `story` `common` `backend` `graphql` `P1-high`
**Milestone:** M1 — Foundation
**Story Points:** 3

- [ ] `DataLoaderRegistrar` implementing `DgsDataLoaderRegistryConsumer`
- [ ] Generic `mappedBatchLoader` helper

---

#### `#17` FeatureFlags service
**Labels:** `story` `common` `backend` `P2-medium`
**Milestone:** M1 — Foundation
**Story Points:** 3

- [ ] `FeatureFlags` service — load from `config/features.json`, `isEnabled(flag, userId)`
- [ ] Percentage-based rollout support
- [ ] Initial flags: `spaced_repetition`, `recipe_builder`, `budget_forecast`

---

#### `#18` Redis caching infrastructure
**Labels:** `story` `common` `backend` `P1-high`
**Milestone:** M1 — Foundation
**Story Points:** 3

- [ ] `RedisConfig.kt` — Jackson serializer, connection factory
- [ ] `CacheService` — `get/set/evict/evictByPrefix`, key pattern: `lifegoals:{module}:{entity}:{id}`

---

## Milestone 2: Dashboard + Interview Prep

### Epic: Dashboard Shell & Widget Rendering

---

#### `#19` Dashboard GraphQL schema + resolvers

**Mockup:** [Dashboard](mockups/dashboard.html)
**Labels:** `story` `dashboard` `backend` `graphql` `P0-critical`
**Milestone:** M2 — Dashboard + Interview Prep
**Story Points:** 8

**Checklist:**
- [ ] `dashboard.graphqls` — `MyDashboard`, `DashboardWidget`, `WidgetData` union, `AvailableWidget` **(2 SP)**
- [ ] `DashboardResolver` — `myDashboard` query, resolve widgets via `WidgetRegistry` **(2 SP)**
- [ ] `addWidgetToDashboard` mutation — validate config, save, return `AddWidgetPayload` **(2 SP)**
- [ ] `removeWidgetFromDashboard` mutation **(1 SP)**
- [ ] `reorderDashboardWidgets` mutation **(1 SP)**

---

#### `#20` Dashboard page (frontend)

**Mockup:** [Dashboard](mockups/dashboard.html) · [Empty state](mockups/dashboard-empty.html)
**Labels:** `story` `dashboard` `frontend` `P0-critical`
**Milestone:** M2 — Dashboard + Interview Prep
**Story Points:** 8

**Checklist:**
- [ ] `DashboardPage.tsx` + `DashboardPageQuery` — Relay query, `@defer` on `WidgetData` **(3 SP)**
- [ ] `WidgetRenderer.tsx` — union type switch, lazy-load widget components **(2 SP)**
- [ ] `WidgetSkeleton.tsx` — Suspense fallback **(1 SP)**
- [ ] `WidgetErrorBoundary.tsx` — per-widget error boundary + retry **(2 SP)**

---

#### `#21` "Add Widget" flow (frontend)

**Mockup:** [Add widget modal](mockups/add-widget.html)
**Labels:** `story` `dashboard` `frontend` `P1-high`
**Milestone:** M2 — Dashboard + Interview Prep
**Story Points:** 5

**Checklist:**
- [ ] `AddWidgetModal.tsx` — list available types from `AvailableWidget` query **(1 SP)**
- [ ] `WidgetConfigForm.tsx` — dynamic form from JSON Schema **(3 SP)**
- [ ] Wire up `addWidgetToDashboard` mutation + optimistic update **(1 SP)**

---

#### `#22` Frontend routing + app shell

**Mockup:** [Login](mockups/login.html) · [Dashboard](mockups/dashboard.html) · [Settings](mockups/settings.html)
**Labels:** `story` `common` `frontend` `P0-critical`
**Milestone:** M2 — Dashboard + Interview Prep
**Story Points:** 5

**Checklist:**
- [ ] React Router: `/login`, `/dashboard`, `/settings` + auth guard **(2 SP)**
- [ ] `AppShell.tsx` — header, sidebar, user avatar, notifications bell **(2 SP)**
- [ ] Login page with OAuth buttons (Google + GitHub) **(1 SP)**

---

### Epic: Interview Prep Widget

---

#### `#23` Interview Prep GraphQL schema

**Mockup:** [Interview Prep overview](mockups/interview-prep.html)
**Labels:** `story` `interviewprep` `backend` `graphql` `P0-critical`
**Milestone:** M2 — Dashboard + Interview Prep
**Story Points:** 5

**Checklist:**
- [ ] `interviewprep.graphqls` — `CodingProblem`, connection, filters by category/difficulty
- [ ] Mutation types: `CreateCodingProblemPayload`, `LogProblemAttemptPayload` — all with `errors: [UserError!]!`
- [ ] `InterviewPrepWidgetData` — `readinessScore`, `problemsSolvedThisWeek`, `nextReviewProblem`, `heatMapData`

---

#### `#24` CodingProblem CRUD (backend)

**Mockup:** [Problems list](mockups/coding-problems.html) · [Problem form](mockups/coding-problem-form.html)
**Labels:** `story` `interviewprep` `backend` `P0-critical`
**Milestone:** M2 — Dashboard + Interview Prep
**Story Points:** 5

**Checklist:**
- [ ] `CodingProblem` JPA entity + `CodingProblemRepository`
- [ ] `CodingProblemService` — CRUD + ViewerContext + cache invalidation
- [ ] DGS resolvers: query (cursor pagination), mutations
- [ ] `codingProblemLoader` DataLoader

---

#### `#25` Problem Attempt tracking

**Mockup:** [Problem form / log attempt](mockups/coding-problem-form.html)
**Labels:** `story` `interviewprep` `backend` `P1-high`
**Milestone:** M2 — Dashboard + Interview Prep
**Story Points:** 3

- [ ] `ProblemAttempt` entity + repository
- [ ] `ProblemAttemptService` — log attempt → trigger SM-2 update → invalidate cache
- [ ] DGS resolver for `logProblemAttempt` mutation

---

#### `#26` Spaced Repetition (SM-2) service

**Mockup:** [SM-2 quality buttons](mockups/coding-problem-form.html) · [Next review card](mockups/interview-prep.html)
**Labels:** `story` `interviewprep` `backend` `P1-high`
**Milestone:** M2 — Dashboard + Interview Prep
**Story Points:** 5

**Checklist:**
- [ ] `ReviewSchedule` entity + repository **(1 SP)**
- [ ] SM-2 algorithm in `SpacedRepetitionService` — easeFactor, interval, repetitions. Base interval from widget config **(3 SP)**
- [ ] `nextReviewProblem` resolver — earliest `nextReviewDate <= today` **(1 SP)**

---

#### `#27` Readiness Score calculator

**Mockup:** [Readiness score ring](mockups/interview-prep.html)
**Labels:** `story` `interviewprep` `backend` `P2-medium`
**Milestone:** M2 — Dashboard + Interview Prep
**Story Points:** 5

Heuristic 0-100: coverage by `focusCategories` from config, difficulty spread, recency, `weeklyProblemGoal` adherence.

---

#### `#28` Heat Map data resolver

**Mockup:** [Heat map](mockups/interview-prep.html)
**Labels:** `story` `interviewprep` `backend` `P2-medium`
**Milestone:** M2 — Dashboard + Interview Prep
**Story Points:** 3

Activity data by days over the past year (GitHub contribution style). Redis cache 10 min.

---

#### `#29` Interview Prep frontend widget

**Mockup:** [Overview](mockups/interview-prep.html) · [Problems](mockups/coding-problems.html) · [Problem form](mockups/coding-problem-form.html) · [System design / behavioral](mockups/system-design.html)
**Labels:** `story` `interviewprep` `frontend` `P1-high`
**Milestone:** M2 — Dashboard + Interview Prep
**Story Points:** 13

**Checklist:**
- [ ] `InterviewPrepWidget.tsx` — main widget, fragment colocation, Suspense **(2 SP)**
- [ ] `CodingProblemList.tsx` — `usePaginationFragment`, filters **(3 SP)**
- [ ] `CodingProblemForm.tsx` — add/edit, mutation, optimistic update **(2 SP)**
- [ ] `HeatMap.tsx` — SVG contribution graph **(3 SP)**
- [ ] `ReadinessScoreCard.tsx` — score + breakdown **(1 SP)**
- [ ] `NextReviewCard.tsx` — SM-2 next problem + quick actions **(2 SP)**

---

#### `#30` System Design + Behavioral CRUD

**Mockup:** [System design & behavioral](mockups/system-design.html)
**Labels:** `story` `interviewprep` `backend` `frontend` `P2-medium`
**Milestone:** M2 — Dashboard + Interview Prep
**Story Points:** 8

**Checklist:**
- [ ] Backend: `SystemDesignTopic` entity, service, resolvers + connection **(3 SP)**
- [ ] Backend: `BehavioralStory` entity, service, resolvers + STAR structure **(3 SP)**
- [ ] Frontend: `SystemDesignList.tsx` + `BehavioralStoryList.tsx` — Relay fragments, forms **(2 SP)**

---

#### `#31` Register `InterviewPrepWidgetProvider`

**Mockup:** [Interview Prep overview](mockups/interview-prep.html)
**Labels:** `story` `interviewprep` `backend` `P0-critical`
**Milestone:** M2 — Dashboard + Interview Prep
**Story Points:** 2

Implement `WidgetProvider` interface, define config schema (`targetCompany`, `targetLevel`, `weeklyProblemGoal`, `focusCategories[]`, `reviewIntervalDays`), Spring auto-registration.

---

## Milestone 3: Fitness Tracker

### Epic: Fitness Tracker Widget

---

#### `#32` Fitness GraphQL schema

**Mockup:** [Fitness overview](mockups/fitness.html)
**Labels:** `story` `fitness` `backend` `graphql` `P0-critical`
**Milestone:** M3 — Fitness Tracker
**Story Points:** 5

`fitness.graphqls` + `food.graphqls`: Workout, ExerciseSet, BodyMeasurement, FoodProduct, Recipe, RecipeIngredient, Meal, MealEntry + all connections + mutations with `UserError` payloads.

---

#### `#33` Workout logging (backend)

**Mockup:** [Workout logger](mockups/workout-logger.html)
**Labels:** `story` `fitness` `backend` `P0-critical`
**Milestone:** M3 — Fitness Tracker
**Story Points:** 5

**Checklist:**
- [ ] `Workout` + `ExerciseSet` entities + repositories
- [ ] `WorkoutService` — create, add sets, finish, delete. ViewerContext scoped.
- [ ] DGS resolvers + `exerciseSetLoader` DataLoader

---

#### `#34` Body Measurement tracking

**Mockup:** [Body measurements](mockups/body-weight.html)
**Labels:** `story` `fitness` `backend` `P1-high`
**Milestone:** M3 — Fitness Tracker
**Story Points:** 3

- [ ] `BodyMeasurement` entity, service, resolvers
- [ ] `TrendDirection` calculation: UP / DOWN / STABLE (from last N measurements)

---

#### `#35` Food Product catalog

**Mockup:** [Meal diary · food search](mockups/meal-diary.html)
**Labels:** `story` `fitness` `backend` `P0-critical`
**Milestone:** M3 — Fitness Tracker
**Story Points:** 8

**Checklist:**
- [ ] `FoodProduct` entity + repository — nutrition per 100g, `isCustom` **(2 SP)**
- [ ] `FoodCatalogService` — full-text search, Redis cache 30 min **(3 SP)**
- [ ] `food.graphqls` — FoodProduct, FoodProductConnection, search query, create mutation **(2 SP)**
- [ ] Seed catalog: Flyway migration with common products **(1 SP)**

---

#### `#36` Recipe builder

**Mockup:** [Recipe builder](mockups/meal-diary.html)
**Labels:** `story` `fitness` `backend` `P1-high`
**Milestone:** M3 — Fitness Tracker
**Story Points:** 5

**Checklist:**
- [ ] `Recipe` + `RecipeIngredient` entities — recipe → ingredients (food_product + amount_grams), servings
- [ ] `RecipeService` — aggregate ingredient nutrition ÷ servings
- [ ] Resolvers + `recipeIngredientLoader` DataLoader

---

#### `#37` Meal logging + NutritionCalculator

**Mockup:** [Meal diary](mockups/meal-diary.html)
**Labels:** `story` `fitness` `backend` `P1-high`
**Milestone:** M3 — Fitness Tracker
**Story Points:** 8

**Checklist:**
- [ ] `Meal` + `MealEntry` entities — entry links to FoodProduct (portion_grams) OR Recipe (servings) **(2 SP)**
- [ ] `NutritionCalculator` service — centralized, server recomputes on save **(3 SP)**
- [ ] `MealService` + resolvers: meals by date, logMeal, addMealEntry **(2 SP)**
- [ ] DataLoaders for meal entries **(1 SP)**

---

#### `#38` Fitness frontend widget

**Mockup:** [Overview](mockups/fitness.html) · [Workout](mockups/workout-logger.html) · [Meals](mockups/meal-diary.html) · [Measurements](mockups/body-weight.html)
**Labels:** `story` `fitness` `frontend` `P1-high`
**Milestone:** M3 — Fitness Tracker
**Story Points:** 13

**Checklist:**
- [ ] `FitnessWidget.tsx` — summary: weight trend, workouts/week, calories today **(2 SP)**
- [ ] `WorkoutLogger.tsx` + `ExerciseSetForm.tsx` — interactive set logging **(3 SP)**
- [ ] `BodyWeightChart.tsx` — line chart + target weight line from config **(2 SP)**
- [ ] `FoodProductSearch.tsx` — debounced search, nutrition preview **(2 SP)**
- [ ] `RecipeBuilder.tsx` — add ingredients, auto-calc nutrition **(2 SP)**
- [ ] `MealDiary.tsx` + `MealEntryCard.tsx` — daily view, meals by type, totals vs target **(2 SP)**

---

#### `#39` Register `FitnessWidgetProvider`

**Mockup:** [Fitness overview](mockups/fitness.html)
**Labels:** `story` `fitness` `backend` `P0-critical`
**Milestone:** M3 — Fitness Tracker
**Story Points:** 2

Config schema: `targetWeightKg`, `startWeightKg`, `targetWorkoutsPerWeek`, `dailyCalorieTarget`, `macroTargets{}`.

---

## Milestone 4: Budget Planner

### Epic: Budget Planner Widget

---

#### `#40` Budget GraphQL schema

**Mockup:** [Budget overview](mockups/budget.html)
**Labels:** `story` `budget` `backend` `graphql` `P0-critical`
**Milestone:** M4 — Budget Planner
**Story Points:** 3

`budget.graphqls`: Transaction, SavingsGoal, ExchangeRate, SavingsForecast, TripBudget + mutations.

---

#### `#41` Transaction CRUD (backend)

**Mockup:** [Transactions](mockups/transactions.html)
**Labels:** `story` `budget` `backend` `P0-critical`
**Milestone:** M4 — Budget Planner
**Story Points:** 5

**Checklist:**
- [ ] `Transaction` entity + repository — linked to `widget_id` (multi-widget)
- [ ] `TransactionService` — filter by category, date range, type. ViewerContext.
- [ ] DGS resolvers — `TransactionConnection`, mutations with `UserError` payloads

---

#### `#42` Exchange Rate service

**Mockup:** [Live FX rate card](mockups/budget.html)
**Labels:** `story` `budget` `backend` `P1-high`
**Milestone:** M4 — Budget Planner
**Story Points:** 5

**Checklist:**
- [ ] `ExchangeRateService` — external API fetch, Redis cache-aside (1hr TTL), DB fallback **(3 SP)**
- [ ] Scheduled hourly refresh for all active currency pairs **(2 SP)**

Redis key: `lifegoals:budget:exchange_rate:{base}:{target}` — pair from widget config.

---

#### `#43` Savings Goal + Forecast

**Mockup:** [Forecast detail](mockups/forecast.html) · [Forecast card](mockups/budget.html)
**Labels:** `story` `budget` `backend` `P1-high`
**Milestone:** M4 — Budget Planner
**Story Points:** 5

**Checklist:**
- [ ] `SavingsGoalService` — track current_amount, progress % vs config.targetAmount **(2 SP)**
- [ ] `SavingsForecastService` — 3-month average → projected date. Three scenarios: current, +10%, +20% **(3 SP)**

---

#### `#44` Trip Budget breakdown

**Mockup:** [Trip budget breakdown](mockups/trip-budget.html)
**Labels:** `story` `budget` `backend` `P2-medium`
**Milestone:** M4 — Budget Planner
**Story Points:** 3

Categories from `config.budgetCategories[]`. Estimated vs actual in both `baseCurrency` and `targetCurrency`. Exchange rate applied dynamically.

---

#### `#45` Budget frontend widget

**Mockup:** [Overview](mockups/budget.html) · [Transactions](mockups/transactions.html) · [Forecast](mockups/forecast.html) · [Trip budget](mockups/trip-budget.html)
**Labels:** `story` `budget` `frontend` `P1-high`
**Milestone:** M4 — Budget Planner
**Story Points:** 13

**Checklist:**
- [ ] `BudgetWidget.tsx` — summary: saved, progress %, forecast, rate **(2 SP)**
- [ ] `TransactionList.tsx` — Relay pagination, category/date filters **(3 SP)**
- [ ] `TransactionForm.tsx` — add income/expense + category picker **(2 SP)**
- [ ] `SavingsProgressCard.tsx` — progress bar, target, deadline countdown **(2 SP)**
- [ ] `ForecastChart.tsx` — three scenario lines **(2 SP)**
- [ ] `TripBudgetBreakdown.tsx` — categories, estimated vs actual, both currencies **(2 SP)**

---

#### `#46` Register `BudgetWidgetProvider`

**Mockup:** [Budget overview](mockups/budget.html)
**Labels:** `story` `budget` `backend` `P0-critical`
**Milestone:** M4 — Budget Planner
**Story Points:** 2

Config schema: `goalName`, `targetAmount`, `targetCurrency`, `baseCurrency`, `deadline`, `budgetCategories[]`.

---

## Milestone 5: Notifications + Testing

### Epic: Notification System

---

#### `#47` Notification service + resolvers

**Mockup:** [Notifications](mockups/notifications.html)
**Labels:** `story` `notification` `backend` `P1-high`
**Milestone:** M5 — Notifications + Testing
**Story Points:** 5

**Checklist:**
- [ ] `Notification` entity + repository (unread count query)
- [ ] `NotificationService` — create, markAsRead, getUnreadCount. ViewerContext.
- [ ] `notification.graphqls` — NotificationConnection, mutations, subscriptions

---

#### `#48` GraphQL Subscriptions (WebSocket + Redis pub/sub)

**Mockup:** [Notifications](mockups/notifications.html)
**Labels:** `story` `notification` `backend` `P1-high`
**Milestone:** M5 — Notifications + Testing
**Story Points:** 8

**Checklist:**
- [ ] WebSocket transport config in `GraphQLConfig.kt` (graphql-ws protocol, `/subscriptions`) **(2 SP)**
- [ ] Redis pub/sub: publish on mutation → channel → push **(3 SP)**
- [ ] `NotificationSubscription.kt` — DGS subscription resolver **(2 SP)**
- [ ] Frontend: subscription handler in `RelayEnvironment.ts` **(1 SP)**

---

#### `#49` Achievement system

**Mockup:** [Achievement items](mockups/notifications.html)
**Labels:** `story` `notification` `backend` `P2-medium`
**Milestone:** M5 — Notifications + Testing
**Story Points:** 8

**Checklist:**
- [ ] `AchievementChecker` interface — `checkAchievements(viewer, event): List<Achievement>` **(1 SP)**
- [ ] Fitness achievements: "3 workouts this week!", "Daily calorie goal 7 days" **(2 SP)**
- [ ] Interview Prep achievements: "10 problems solved!", "All categories covered" **(2 SP)**
- [ ] Budget achievements: "50% savings goal!", "First month complete" **(2 SP)**
- [ ] Wire into mutation services — check + notify after each write **(1 SP)**

---

#### `#50` Notification UI components

**Mockup:** [Notifications list + bell](mockups/notifications.html)
**Labels:** `story` `notification` `frontend` `P2-medium`
**Milestone:** M5 — Notifications + Testing
**Story Points:** 5

**Checklist:**
- [ ] `NotificationBell.tsx` — badge, Jotai atom for unread count **(2 SP)**
- [ ] `NotificationDropdown.tsx` — list, mark as read **(2 SP)**
- [ ] Real-time update via Relay subscription **(1 SP)**

---

### Epic: Testing

---

#### `#51` Backend test infrastructure
**Labels:** `story` `testing` `backend` `P1-high`
**Milestone:** M5 — Notifications + Testing
**Story Points:** 5

**Checklist:**
- [ ] Testcontainers config — PostgreSQL + Redis for `@SpringBootTest` **(2 SP)**
- [ ] `BaseIntegrationTest` — shared containers, test ViewerContext factory, DB cleanup **(2 SP)**
- [ ] Test utilities: entity factories, assertion helpers **(1 SP)**

---

#### `#52` Unit tests for all services
**Labels:** `story` `testing` `backend` `P1-high`
**Milestone:** M5 — Notifications + Testing
**Story Points:** 13

Target: >80% branch coverage. MockK.

**Checklist:**
- [ ] `CodingProblemService` + `SpacedRepetitionService` — SM-2 edge cases **(5 SP)**
- [ ] `WorkoutService` + `NutritionCalculator` + `MealService` — nutrition accuracy **(5 SP)**
- [ ] `TransactionService` + `ExchangeRateService` + `SavingsForecastService` — forecast scenarios **(3 SP)**

---

#### `#53` Integration tests (repository + DataLoader)
**Labels:** `story` `testing` `backend` `P1-high`
**Milestone:** M5 — Notifications + Testing
**Story Points:** 8

Testcontainers PostgreSQL. Complex queries, DataLoader batching verification, cursor pagination.

---

#### `#54` DGS resolver tests
**Labels:** `story` `testing` `backend` `graphql` `P1-high`
**Milestone:** M5 — Notifications + Testing
**Story Points:** 8

DGS test framework: request → response assertions for all queries and mutations.

---

#### `#55` Frontend component tests
**Labels:** `story` `testing` `frontend` `P2-medium`
**Milestone:** M5 — Notifications + Testing
**Story Points:** 8

React Testing Library: user interactions, Relay fragment testing, form validation, error states.

---

#### `#56` E2E tests with Playwright
**Labels:** `story` `testing` `P2-medium`
**Milestone:** M5 — Notifications + Testing
**Story Points:** 13

**Checklist:**
- [ ] Playwright config + Docker Compose test env + seed data **(3 SP)**
- [ ] E2E: Log meal → verify nutrition calculation **(3 SP)**
- [ ] E2E: Create transaction → check savings progress **(3 SP)**
- [ ] E2E: Add coding problem → log attempt → verify heat map **(2 SP)**
- [ ] E2E: Add widget → configure → verify renders on dashboard **(2 SP)**

---

## Milestone 6: Polish + Deploy

### Epic: Missing Cross-Cutting Concerns

> Issues identified during CLAUDE.md coverage verification.

---

#### `#63` Reusable ErrorBoundary + Suspense wrapper infrastructure

**Mockup:** [Dashboard (Suspense fallbacks)](mockups/dashboard.html)
**Labels:** `story` `common` `frontend` `P1-high`
**Milestone:** M2 — Dashboard + Interview Prep
**Story Points:** 3

CLAUDE.md: "Every async component is wrapped: `ErrorBoundary > Suspense > Component`". Create reusable `AsyncBoundary.tsx` = ErrorBoundary + Suspense + fallback props. Use in all widgets and pages.

---

#### `#64` New user onboarding flow

**Mockup:** [Onboarding / empty state](mockups/dashboard-empty.html) · [Add widget](mockups/add-widget.html)
**Labels:** `story` `dashboard` `frontend` `P1-high`
**Milestone:** M2 — Dashboard + Interview Prep
**Story Points:** 5

CLAUDE.md: "Default setup for new users: empty dashboard with onboarding flow to add first widget." Empty state → guided widget selection → config form → first widget appears.

---

#### `#65` Settings page

**Mockup:** [Settings](mockups/settings.html)
**Labels:** `story` `common` `frontend` `P2-medium`
**Milestone:** M6 — Polish + Deploy
**Story Points:** 5

Route `/settings` exists in #22, but no implementation. Include: theme toggle, notification preferences, account info, OAuth connections, logout.

---

#### `#66` Mutation audit logging (cross-cutting)
**Labels:** `story` `common` `backend` `P2-medium`
**Milestone:** M5 — Notifications + Testing
**Story Points:** 3

CLAUDE.md: "All mutations log before/after state for audit trail." DGS instrumentation or AOP-based aspect for structured JSON logging before/after mutation state.

---

#### `#67` ViewerContext privacy tests
**Labels:** `story` `testing` `backend` `P1-high`
**Milestone:** M5 — Notifications + Testing
**Story Points:** 3

Verify that every repository/service query is scoped by `userId`. Test: user A cannot get user B's data through any query/mutation.

---

#### `#68` Widget config schema validation tests
**Labels:** `story` `testing` `backend` `P2-medium`
**Milestone:** M5 — Notifications + Testing
**Story Points:** 2

Tests: invalid config → `AddWidgetPayload.errors` with specific `ConfigError`. Each WidgetProvider validates required fields, types, constraints.

---

### Epic: Advanced Features

---

#### `#57` CSV/PDF data export
**Labels:** `story` `common` `backend` `P2-medium`
**Milestone:** M6 — Polish + Deploy
**Story Points:** 5

**Checklist:**
- [ ] `ExportService` — generic CSV generator: data + column definitions → file **(2 SP)**
- [ ] PDF report per widget — summary with key stats **(3 SP)**

---

#### `#58` Workout Templates
**Labels:** `story` `fitness` `backend` `frontend` `P3-low`
**Milestone:** M6 — Polish + Deploy
**Story Points:** 5

Save a set of exercises as a template → quickly create a workout.

---

#### `#59` Practice Timer for Interview Prep
**Labels:** `story` `interviewprep` `frontend` `P3-low`
**Milestone:** M6 — Polish + Deploy
**Story Points:** 3

Countdown timer, auto-stop, bind to problem attempt.

---

### Epic: Production Deployment

---

#### `#60` Deploy backend to Railway/Render
**Labels:** `story` `infra` `P2-medium`
**Milestone:** M6 — Polish + Deploy
**Story Points:** 5

**Checklist:**
- [ ] Neon PostgreSQL — create DB, run migrations, connection pool **(2 SP)**
- [ ] Upstash Redis — configure connection **(1 SP)**
- [ ] Railway/Render — Docker deploy, health checks, log streaming **(2 SP)**

---

#### `#61` Deploy frontend to Vercel
**Labels:** `story` `infra` `frontend` `P2-medium`
**Milestone:** M6 — Polish + Deploy
**Story Points:** 2

Vite 8 (Rolldown) build → Vercel. Env variables, preview deployments.

---

#### `#62` Production monitoring + alerting
**Labels:** `story` `infra` `P3-low`
**Milestone:** M6 — Polish + Deploy
**Story Points:** 3

Structured logs → log aggregator, `/health` endpoint, basic alerts on error rate spike.

---

## Milestone 7: Budget Accounts Aggregation

> **Source of truth:** [`budget-accounts/PRD_budget_accounts.md`](budget-accounts/PRD_budget_accounts.md)
> **Engineering breakdown:** [`budget-accounts/ENGINEERING_BREAKDOWN_budget_accounts.md`](budget-accounts/ENGINEERING_BREAKDOWN_budget_accounts.md)
> **ADR:** [`adr/ADR-003-open-banking-aggregator.md`](adr/ADR-003-open-banking-aggregator.md)
> **Target:** 12 weeks, 4 phases, ~23 issues + parking lot.

Extends the Budget Planner widget: account balance aggregation (manual, crypto.com, Open Banking via GoCardless), credential vault with envelope encryption, real-time subscriptions, forecasting, observability.

**Prerequisites:** M4 (Budget Planner #40–#46) and base notification infra (#47–#49) completed.

---

### Epic: Phase 0 — Foundations (weeks 1–2)

---

#### `#69` Flyway: schema for accounts, credentials, snapshots, access log
**Labels:** `story` `budget` `backend` `db` `phase-0` `P0-critical`
**Milestone:** M7 — Budget Accounts Aggregation
**Story Points:** 5

Matches **LGD-101**. Blocks all other M7 issues.

**Checklist:**
- [ ] `V{N}__create_budget_account_tables.sql` — tables `account`, `account_credential`, `account_snapshot`, `account_access_log` (PRD Appendix A) **(3 SP)**
- [ ] Indexes: `account(user_id, widget_instance_id)`, `account_snapshot(account_id, taken_at DESC)`, `account_access_log(user_id, ts DESC)` **(1 SP)**
- [ ] FK cascades: widget delete → soft-disconnect; user delete → full cleanup **(1 SP)**

**Acceptance:** migration idempotent, integration test `SELECT` from each table passes.

---

#### `#70` Kotlin entities + repositories for account aggregate
**Labels:** `story` `budget` `backend` `phase-0` `P0-critical`
**Milestone:** M7 — Budget Accounts Aggregation
**Story Points:** 5
**Depends on:** #69

Matches **LGD-102**. JPA entities `Account`, `AccountCredential`, `AccountSnapshot`, `AccountAccessLog` + repositories. `@Version` for optimistic locking. ViewerContext-scoped, Testcontainers cross-user isolation tests.

---

#### `#71` `AccountProvider` interface + registry
**Labels:** `story` `budget` `backend` `phase-0` `P0-critical`
**Milestone:** M7 — Budget Accounts Aggregation
**Story Points:** 5
**Depends on:** #70

Matches **LGD-103**. Extensibility core (PRD R2).

**Checklist:**
- [ ] `AccountProvider` interface: `type`, `fetchBalance`, `validateConnection` **(2 SP)**
- [ ] `AccountProviderRegistry` — Spring auto-discovery, lookup by `type`, duplicate error **(1 SP)**
- [ ] `AccountProviderContract` — abstract provider test suite **(1 SP)**
- [ ] Value objects: `AccountSnapshot`, `ValidationResult` sealed class **(1 SP)**

---

#### `#72` Credential vault: envelope encryption + audit
**Labels:** `story` `common` `backend` `security` `phase-0` `P0-critical`
**Milestone:** M7 — Budget Accounts Aggregation
**Story Points:** 8
**Depends on:** #69

Matches **LGD-104**. PRD R6, R10. **Blocker for all live providers.**

**Checklist:**
- [ ] `CredentialVault`: `store`, `retrieve`, `rotate`, `purge` **(3 SP)**
- [ ] Envelope encryption: per-user DEK in `user_key` (KEK-encrypted), KEK in `CREDENTIAL_KEK` env **(2 SP)**
- [ ] AES-256-GCM + per-record nonce **(1 SP)**
- [ ] `@LogMask` aspect — never log plaintext **(1 SP)**
- [ ] All operations write to `account_access_log` **(1 SP)**

**Acceptance:** grep test for plaintext absence in logs; rotate re-encrypts without changing `credentials_ref`.

---

#### `#73` `ManualProvider` implementation
**Labels:** `story` `budget` `backend` `phase-0` `P0-critical`
**Milestone:** M7 — Budget Accounts Aggregation
**Story Points:** 3
**Depends on:** #71

Matches **LGD-105**. PRD R5. Smoke test for full infra before live providers. Stale detection at `taken_at < now() - 14 days`.

---

#### `#74` Observability baseline: structured logging + access log
**Labels:** `story` `common` `backend` `observability` `phase-0` `P0-critical`
**Milestone:** M7 — Budget Accounts Aggregation
**Story Points:** 3
**Depends on:** #70

Matches **LGD-106**. PRD R10.

**Checklist:**
- [ ] `ProviderCallInstrumentation` aspect — logs `provider`, hashed `userId`, `accountId`, `durationMs`, `cacheHit`, `httpStatus`, `errorCode` **(1 SP)**
- [ ] Micrometer counter + duration histogram per provider **(1 SP)**
- [ ] Centralized `AccountAccessLog` writes **(1 SP)**

---

#### `#75` GraphQL schema v1: `Account`, manual mutations

**Mockup:** [Accounts page](mockups/budget-accounts.html)
**Labels:** `story` `budget` `backend` `graphql` `phase-0` `P0-critical`
**Milestone:** M7 — Budget Accounts Aggregation
**Story Points:** 5
**Depends on:** #73

Matches **LGD-107**. PRD R8.

**Checklist:**
- [ ] Types in `budget.graphqls`: `Account`, `AccountSnapshot`, `AccountProviderType`, `SyncStatus`, `AccountConnection` **(2 SP)**
- [ ] Queries: `budgetWidget.accounts`, `account(id)` **(1 SP)**
- [ ] Mutations (manual): `addManualAccount`, `updateManualBalance`, `disconnectAccount` with `*Payload` **(1 SP)**
- [ ] DataLoader `accountSnapshotLoader`, persisted queries allowlist update **(1 SP)**

---

### Epic: Phase 1 — Crypto first (weeks 3–5)

---

#### `#76` Spike: crypto.com Exchange API auth + balance endpoint
**Labels:** `chore` `budget` `backend` `type:spike` `phase-1` `P0-critical`
**Milestone:** M7 — Budget Accounts Aggregation
**Story Points:** 2

Matches **LGD-201**. 1-day timebox. Confirm HMAC signing, rate limits, response shape. Output: `docs/spikes/2026-04-cryptocom.md` + WireMock-vs-sandbox decision.

---

#### `#77` `CryptoComProvider` implementation
**Labels:** `story` `budget` `backend` `phase-1` `P0-critical`
**Milestone:** M7 — Budget Accounts Aggregation
**Story Points:** 8
**Depends on:** #71, #72, #76

Matches **LGD-202**. PRD R4. First live provider.

**Checklist:**
- [ ] Spring `RestClient` + HMAC-SHA256, per-request nonce **(2 SP)**
- [ ] `validateConnection` — reject on `can_withdraw=true` → `ExcessivePermissions` **(2 SP)**
- [ ] `fetchBalance` — per-coin aggregation, convert via `ExchangeRateService` into `baseCurrency` **(3 SP)**
- [ ] `{apiKey, apiSecret}` stored via `CredentialVault` **(1 SP)**

---

#### `#78` Redis cache + scheduler for live accounts
**Labels:** `story` `budget` `backend` `infra` `phase-1` `P0-critical`
**Milestone:** M7 — Budget Accounts Aggregation
**Story Points:** 5
**Depends on:** #77

Matches **LGD-203**. PRD R7.

**Checklist:**
- [ ] `AccountBalanceCache` — TTL 5min, key `lifegoals:budget:balance:{userId}:{accountId}` **(1 SP)**
- [ ] `AccountBalancePuller` — `@Scheduled(fixedDelay=10min)` for `syncMode=LIVE` **(2 SP)**
- [ ] Per-provider token bucket in Redis **(1 SP)**
- [ ] User-initiated `refreshAccount(accountId)` mutation **(1 SP)**

**Acceptance:** load test — 100 concurrent `myDashboard` with warm cache → p95 < 150ms.

---

#### `#79` GraphQL: connect mutation + subscription
**Labels:** `story` `budget` `backend` `graphql` `phase-1` `P0-critical`
**Milestone:** M7 — Budget Accounts Aggregation
**Story Points:** 5
**Depends on:** #78, #75

Matches **LGD-204**. PRD R8.

- Mutation `connectCryptoComAccount(input): ConnectCryptoComPayload!`
- Subscription `accountBalanceUpdated(widgetInstanceId): Account!` via Redis pub/sub
- Publish on each successful snapshot; `UNAUTHENTICATED` for unauthorized subscribers

---

#### `#80` Frontend: Accounts tab + manual + crypto connect flow

**Mockup:** [Accounts page](mockups/budget-accounts.html)
**Labels:** `story` `budget` `frontend` `phase-1` `P0-critical`
**Milestone:** M7 — Budget Accounts Aggregation
**Story Points:** 13
**Depends on:** #79

Matches **LGD-205**. PRD R9.

**Checklist:**
- [ ] New `Accounts` tab inside `BudgetWidget` **(2 SP)**
- [ ] Accounts table + provider badge + sync badge (LIVE/STALE/MANUAL/ERROR) **(3 SP)**
- [ ] "Add account" modal + manual/crypto.com forms **(3 SP)**
- [ ] Colocated Relay fragments (`AccountRow_account`, `AccountsTable_accounts`) **(2 SP)**
- [ ] ErrorBoundary + `<AccountsSkeleton />` via Suspense **(1 SP)**
- [ ] Realtime update via Relay subscription from #79 **(2 SP)**

---

### Epic: Phase 2 — Open Banking (weeks 6–9)

---

#### `#81` Spike: GoCardless BAD sandbox coverage for Revolut
**Labels:** `chore` `budget` `backend` `type:spike` `phase-2` `P0-critical`
**Milestone:** M7 — Budget Accounts Aggregation
**Story Points:** 3

Matches **LGD-301**. 2-day timebox. Confirm Revolut coverage in sandbox (PRD Q1). Output: `docs/spikes/2026-05-gocardless.md`, possible ADR-003 update.

---

#### `#82` `OpenBankingProvider` implementation
**Labels:** `story` `budget` `backend` `phase-2` `P0-critical`
**Milestone:** M7 — Budget Accounts Aggregation
**Story Points:** 8
**Depends on:** #78, #81

Matches **LGD-302**. PRD R3. `GoCardlessClient` (OAuth, institutions, requisitions, accounts/balances), `fetchBalance` mapping, 403 → `CONSENT_EXPIRED` + notification, respect 4 non-user-initiated calls/account/day (puller every 6 hours max).

---

#### `#83` Consent flow: requisition + callback + account selection
**Labels:** `story` `budget` `backend` `frontend` `phase-2` `P0-critical`
**Milestone:** M7 — Budget Accounts Aggregation
**Story Points:** 8
**Depends on:** #82

Matches **LGD-303**. PRD R3, user story 1.

**Checklist:**
- [ ] Backend mutation `initiateOpenBankingConnection(institutionId)` → redirect URL **(2 SP)**
- [ ] Callback `/oauth/gocardless/callback?ref=...` — confirms requisition, persists account IDs in vault **(3 SP)**
- [ ] Frontend institution picker (country autocomplete) + return handling **(3 SP)**

**Acceptance:** E2E sandbox bank → mock consent → account with LIVE badge; cancel → `CONNECTION_CANCELLED`, no credentials stored.

---

#### `#84` Re-consent lifecycle + notifications
**Labels:** `story` `budget` `backend` `notification` `phase-2` `P0-critical`
**Milestone:** M7 — Budget Accounts Aggregation
**Story Points:** 5
**Depends on:** #83

Matches **LGD-304**. PRD R3 AC + user story 7.

- Daily `@Scheduled`: check `expires_at`
- 7 days before expiry → `WARNING` notification + email
- After expiry → `syncStatus=CONSENT_EXPIRED`, "Reconnect" button
- Reconnect reuses flow from #83, merges into existing `account`

**Acceptance:** fixed-clock test — exactly one notification fires 7 days before expiry; reconnect preserves `account.id` and snapshot history.

---

#### `#85` Rate-limit guard per provider
**Labels:** `story` `budget` `backend` `infra` `observability` `phase-2` `P0-critical`
**Milestone:** M7 — Budget Accounts Aggregation
**Story Points:** 5
**Depends on:** #78, #82

Matches **LGD-305**. PRD R7, R10. GoCardless: 4 calls/account/day.

- `RateLimitInterceptor` at `AccountProvider` registry layer
- Token bucket per `(provider, accountId)` in Redis
- User-initiated refresh from separate "user bucket" (reserve 1 call/day)
- Metric: `lifegoals.account.ratelimit.rejected{provider}`

---

### Epic: Phase 3 — UI polish + launch (weeks 10–12)

---

#### `#86` Frontend: donut chart (allocation)
**Labels:** `story` `budget` `frontend` `phase-3` `P0-critical`
**Milestone:** M7 — Budget Accounts Aggregation
**Story Points:** 5
**Depends on:** #80

Matches **LGD-401**. PRD R9. Chart.js, Relay fragment `AllocationDonut_accounts`, hover-tooltip (native + converted + last update), accessible labels + screen-reader table.

---

#### `#87` Frontend: 90-day total balance line chart
**Labels:** `story` `budget` `backend` `frontend` `phase-3` `P0-critical`
**Milestone:** M7 — Budget Accounts Aggregation
**Story Points:** 5
**Depends on:** #86

Matches **LGD-402**. PRD R9.

- Backend resolver `budgetWidget.balanceHistory(days: Int!): [BalancePoint!]!` aggregating snapshots by day
- Chart.js line + dashed goal line
- Empty state; cold-cache render < 600 ms for 4 accounts × 90 points

---

#### `#88` Per-row actions: refresh / reconnect / disconnect
**Labels:** `story` `budget` `frontend` `phase-3` `P0-critical`
**Milestone:** M7 — Budget Accounts Aggregation
**Story Points:** 3
**Depends on:** #87

Matches **LGD-403**. PRD user stories 7, 8. Dropdown per row: refresh (from #78), reconnect (flow from #84), disconnect (confirm → credentials purged, snapshots retained). Re-add creates a new `account`.

---

#### `#89` Accessibility audit + keyboard nav (Accounts tab)
**Labels:** `story` `budget` `frontend` `testing` `phase-3` `P0-critical`
**Milestone:** M7 — Budget Accounts Aggregation
**Story Points:** 3
**Depends on:** #86, #87, #88

Matches **LGD-404**. axe-core (0 serious/critical), keyboard tab order Add → rows → actions, `aria-live` on sync badges, keyboard-only "connect crypto.com → see update" scenario.

---

#### `#90` Observability: Grafana/OpenSearch dashboard
**Labels:** `chore` `budget` `infra` `observability` `phase-3` `P0-critical`
**Milestone:** M7 — Budget Accounts Aggregation
**Story Points:** 3
**Depends on:** #74, #85

Matches **LGD-405**. Panels: sync success rate per provider, p50/p95/p99 latency, rate-limit rejections, `CONSENT_EXPIRED` counter. Alert: success rate < 95% over 1h. JSON export to `infra/dashboards/`.

---

#### `#91` Docs + onboarding guide update (providers)
**Labels:** `chore` `docs` `phase-3` `P0-critical`
**Milestone:** M7 — Budget Accounts Aggregation
**Story Points:** 2
**Depends on:** #90

Matches **LGD-406**. Update `ARCHITECTURE.md` (AccountProvider + credential vault), `ONBOARDING_LEARNING_PLAN.md` ("External integrations", "Secrets management"), new `docs/HOW_TO_ADD_PROVIDER.md`, README note.

---

### P1 / P2 parking lot (beyond M7's 12 weeks)

| ID | LGD match | Description | Priority |
|---|---|---|---|
| `#92` | LGD-501 | CSV/OFX import provider | P2-medium |
| `#93` | LGD-502 | Unusual drop detection → `WARNING` notification | P2-medium |
| `#94` | LGD-503 | Rebalance advice in Forecast block | P2-medium |
| `#95` | LGD-504 | Plaid US provider | P3-low |
| `#96` | LGD-505 | On-chain wallet provider (read-only RPC) | P3-low |
| `#97` | LGD-506 | ML forecast over snapshot history | P3-low |

**Cross-phase risks** — see `ENGINEERING_BREAKDOWN_budget_accounts.md` (section "Cross-phase risks tracker").

---

## Milestone 8: Mobile App

> **Source of truth:** [`docs/superpowers/specs/2026-04-14-mobile-backlog-and-m8-design.md`](superpowers/specs/2026-04-14-mobile-backlog-and-m8-design.md)
>
> React Native app. Phased delivery (mirrors the M7 pattern). Reuses `packages/shared` (schema, atoms, hooks, types). Starts after M2 web is complete; mobile work runs in parallel with M3–M6 web work.
>
> **Phases:** Phase 0 — Foundation; Phase 1 — Shared Code Extraction; Phase 2 — Dashboard + Interview Prep; Phase 3 — Fitness + Budget; Phase 4 — Mobile-Specific Features; Phase 5 — Distribution.

### Epic: Phase 0 — Mobile Foundation

> Init RN project, wire Relay, navigation, auth, app shell. Depends on M2 web complete.

---

#### `#98` Init React Native project + add to workspaces
**Labels:** `story` `mobile` `frontend` `common` `P1-high` `phase-mobile-0`
**Milestone:** M8 — Mobile App
**Story Points:** 5

`npx react-native@latest init apps/mobile`. Register as a workspace. Add `@life-goals/shared` dep. Verify iOS Simulator + Android Emulator launch.

---

#### `#99` Wire Relay with the shared schema (mobile)
**Labels:** `story` `mobile` `frontend` `graphql` `P1-high` `phase-mobile-0`
**Milestone:** M8 — Mobile App
**Story Points:** 3

`relay.config.json` schema → `../packages/shared/schema.graphql`. `react-relay` matches the web version. `npm run relay` succeeds.

---

#### `#100` Mobile RelayEnvironment with RN fetch + WebSocket
**Labels:** `story` `mobile` `frontend` `graphql` `P1-high` `phase-mobile-0`
**Milestone:** M8 — Mobile App
**Story Points:** 3

`apps/mobile/src/relay/RelayEnvironment.ts` using RN fetch + `graphql-ws`. Reuses `createNetwork()` from `packages/shared/src/relay/` (#107).

---

#### `#101` React Navigation skeleton (bottom tabs + stack)
**Labels:** `story` `mobile` `frontend` `P1-high` `phase-mobile-0`
**Milestone:** M8 — Mobile App
**Story Points:** 3

`@react-navigation/native` + bottom-tabs + stack. Three placeholder tabs (Dashboard, Notifications, Settings).

---

#### `#102` Mobile auth: OAuth + secure JWT storage
**Labels:** `story` `mobile` `frontend` `common` `security` `P1-high` `phase-mobile-0`
**Milestone:** M8 — Mobile App
**Story Points:** 5

`react-native-app-auth` (Google + GitHub) + `react-native-keychain` (iOS Keychain / Android EncryptedSharedPreferences). JWT injected into the Relay Authorization header.

---

#### `#103` Mobile app shell: bottom tabs + header
**Labels:** `story` `mobile` `frontend` `common` `P1-high` `phase-mobile-0`
**Milestone:** M8 — Mobile App
**Story Points:** 3

Header with avatar/menu + notifications bell badge. Safe-area handling (`react-native-safe-area-context`).

---

### Epic: Phase 1 — Shared Code Extraction

> Move atoms / hooks / types / Relay base from `apps/web` to `packages/shared`. Web behavior unchanged. Runs in parallel with Phase 0.

---

#### `#104` Extract Jotai atoms to packages/shared/src/store/
**Labels:** `story` `mobile` `common` `frontend` `P1-high` `phase-mobile-1`
**Milestone:** M8 — Mobile App
**Story Points:** 3

`themeAtom`, `currentUserAtom`, `notificationsAtom` move to `packages/shared`. `themeAtom` accepts a storage adapter (web → `localStorage`, mobile → `AsyncStorage`).

---

#### `#105` Extract platform-agnostic hooks to packages/shared/src/hooks/
**Labels:** `story` `mobile` `common` `frontend` `P2-medium` `phase-mobile-1`
**Milestone:** M8 — Mobile App
**Story Points:** 3

Audit `apps/web/src/hooks/`; move every DOM-free hook. Add Jest tests.

---

#### `#106` Extract domain TypeScript interfaces to packages/shared/src/types/
**Labels:** `story` `mobile` `common` `frontend` `P2-medium` `phase-mobile-1`
**Milestone:** M8 — Mobile App
**Story Points:** 2

One file per domain area: `widget.ts`, `interviewprep.ts`, `fitness.ts`, `budget.ts`. Generated Relay types stay per-app.

---

#### `#107` Build the shared Relay network base in packages/shared/src/relay/
**Labels:** `story` `mobile` `common` `frontend` `graphql` `P1-high` `phase-mobile-1`
**Milestone:** M8 — Mobile App
**Story Points:** 3

`createNetwork(transport)` factory + auth header injection + error normalization. The web `RelayEnvironment` is refactored to use it; mobile (#100) unblocked.

---

#### `#108` Define design tokens in packages/shared
**Labels:** `story` `mobile` `common` `frontend` `P2-medium` `phase-mobile-1`
**Milestone:** M8 — Mobile App
**Story Points:** 3

`packages/shared/src/types/theme.ts` exports light/dark presets. Web emits CSS variables; mobile uses constants in `StyleSheet.create`. Ported from `docs/mockups/_theme.css`.

---

### Epic: Phase 2 — Mobile UI: Dashboard + Interview Prep

> First mobile widget UIs. Depends on Phases 0+1 done.

---

#### `#109` Mobile Dashboard screen (widget grid + add button)
**Labels:** `story` `mobile` `frontend` `dashboard` `P1-high` `phase-mobile-2`
**Milestone:** M8 — Mobile App
**Story Points:** 5

Vertical scrolling list of widgets. Mobile WidgetRegistry. Empty state + "Add your first widget" CTA. Pull-to-refresh.

---

#### `#110` Mobile Interview Prep widget UI
**Labels:** `story` `mobile` `frontend` `interviewprep` `P1-high` `phase-mobile-2`
**Milestone:** M8 — Mobile App
**Story Points:** 8

Summary widget + ProblemList (FlatList paginated) + ProblemDetail + heat map (`react-native-svg`).

---

#### `#111` Mobile "Add Widget" flow (type picker + config form)
**Labels:** `story` `mobile` `frontend` `dashboard` `P1-high` `phase-mobile-2`
**Milestone:** M8 — Mobile App
**Story Points:** 5

AvailableWidgets query + form generated from `configSchema` (react-hook-form + JSON schema). `addWidgetToDashboard` mutation.

---

### Epic: Phase 3 — Mobile UI: Fitness + Budget

> Depends on Phase 2, M3 web (Fitness) + M4 web (Budget) complete.

---

#### `#112` Mobile Fitness widget UI (workout log, body progress, food/meal diary)
**Labels:** `story` `mobile` `frontend` `fitness` `P1-high` `phase-mobile-3`
**Milestone:** M8 — Mobile App
**Story Points:** 13

WorkoutLog, BodyProgress chart (`victory-native`), FoodSearch (debounced), MealDiary with day picker + macro totals.

---

#### `#113` Mobile Budget widget UI (transactions, savings, exchange rate)
**Labels:** `story` `mobile` `frontend` `budget` `P1-high` `phase-mobile-3`
**Milestone:** M8 — Mobile App
**Story Points:** 10

TransactionList + add modal, SavingsGoal screen, exchange rate display, forecast chart.

---

#### `#114` Camera integration for food/progress photos
**Labels:** `story` `mobile` `frontend` `fitness` `P3-low` `phase-mobile-3`
**Milestone:** M8 — Mobile App
**Story Points:** 5

`react-native-image-picker` + permission handling + upload + thumbnail grid in MealEntry/BodyMeasurement.

---

### Epic: Phase 4 — Mobile-Specific Features

> Push, biometrics, offline-first, deep linking. Depends on M5 web (Notifications) complete.

---

#### `#115` Push notifications: FCM (Android) + APNS (iOS)
**Labels:** `story` `mobile` `frontend` `notification` `P1-high` `phase-mobile-4`
**Milestone:** M8 — Mobile App
**Story Points:** 8

`@react-native-firebase/messaging`. Device token registration mutation. Backend dispatch coordination. Settings toggle per category.

---

#### `#116` Biometric auth (Face ID / Touch ID / Fingerprint)
**Labels:** `story` `mobile` `frontend` `security` `P2-medium` `phase-mobile-4`
**Milestone:** M8 — Mobile App
**Story Points:** 5

`react-native-biometrics`. AppState listener + 5-min timeout. Fallback to PIN or full re-login.

---

#### `#117` Offline-first: Relay store persist + background sync
**Labels:** `story` `mobile` `frontend` `P2-medium` `phase-mobile-4`
**Milestone:** M8 — Mobile App
**Story Points:** 8

Relay store → `AsyncStorage`. Mutation queue + replay on reconnect (`@react-native-community/netinfo`). Conflict UX.

---

#### `#118` Deep linking: open a widget instance from a notification tap
**Labels:** `story` `mobile` `frontend` `P2-medium` `phase-mobile-4`
**Milestone:** M8 — Mobile App
**Story Points:** 5

React Navigation linking config. Universal Links (iOS) + App Links (Android). Notification payload contract.

---

### Epic: Phase 5 — Distribution

> iOS + Android pipelines, store metadata, mobile CI. Runs alongside the M6 web deploy.

---

#### `#119` iOS build pipeline + TestFlight deployment
**Labels:** `story` `mobile` `infra` `P0-critical` `phase-mobile-5`
**Milestone:** M8 — Mobile App
**Story Points:** 8

`fastlane` + `match` for code signing. App Store Connect API key stored as a secret. Tag push → TestFlight upload.

---

#### `#120` Android build pipeline + Play Store internal testing
**Labels:** `story` `mobile` `infra` `P0-critical` `phase-mobile-5`
**Milestone:** M8 — Mobile App
**Story Points:** 8

`fastlane supply`. Play Console service account. Tag push → Internal Testing track.

---

#### `#121` GitHub Actions matrix workflow for mobile builds
**Labels:** `story` `mobile` `infra` `P1-high` `phase-mobile-5`
**Milestone:** M8 — Mobile App
**Story Points:** 5

`.github/workflows/mobile.yml`. Matrix: macos-latest (iOS), ubuntu-latest (Android). CocoaPods + Gradle + Metro caches.

---

#### `#122` App Store + Play Store metadata
**Labels:** `story` `mobile` `docs` `P1-high` `phase-mobile-5`
**Milestone:** M8 — Mobile App
**Story Points:** 8

Copy, screenshots (Maestro / `fastlane snapshot`), privacy policy at lifegoals.app/privacy, icon + feature graphic, `fastlane deliver`/`supply` from `fastlane/metadata/`.

---

## Summary

| Milestone | Issues | Total SP | Focus |
|-----------|--------|----------|-------|
| M1 — Foundation | #1 – #18 | ~78 SP | Scaffolding, DB, Auth, Widget Framework |
| M2 — Dashboard + Interview Prep | #19 – #31, #63, #64 | ~83 SP | Dashboard UI, first widget, onboarding |
| M3 — Fitness Tracker | #32 – #39 | ~49 SP | Workouts, food, recipes, meals |
| M4 — Budget Planner | #40 – #46 | ~36 SP | Transactions, rates, forecast |
| M5 — Notifications + Testing | #47 – #56, #66, #67, #68 | ~89 SP | Real-time, achievements, audit, coverage |
| M6 — Polish + Deploy | #57 – #62, #65 | ~28 SP | Export, settings, deploy, monitoring |
| M7 — Budget Accounts Aggregation | #69 – #91 (+ #92–#97 parking) | ~118 SP | Account providers (manual/crypto/Open Banking), vault, aggregation UI |
| M8 — Mobile App | #98 – #122 | ~144 SP | React Native app: foundation, shared extraction, mobile UIs, push/biometric/offline, distribution |
| **Total** | **116 issues** (+ 6 parking) | **~625 SP** | |

---

## How to create in GitHub

```bash
# 1. Create labels
gh label create "epic" --color "3E4B9E" --description "Large feature/module"
gh label create "story" --color "0E8A16" --description "User-facing functionality"
gh label create "subtask" --color "C2E0C6" --description "Technical subtask"
gh label create "chore" --color "FEF2C0" --description "Tech debt, CI, infra"
gh label create "P0-critical" --color "B60205" --description "Blocks other tasks"
gh label create "P1-high" --color "D93F0B" --description "Core functionality"
gh label create "P2-medium" --color "FBCA04" --description "Important, not blocking"
gh label create "P3-low" --color "0E8A16" --description "Nice to have"
gh label create "backend" --color "1D76DB"
gh label create "frontend" --color "5319E7"
gh label create "db" --color "006B75"
gh label create "graphql" --color "E99695"
gh label create "testing" --color "BFD4F2"
gh label create "infra" --color "D4C5F9"
gh label create "common" --color "C5DEF5"
gh label create "interviewprep" --color "F9D0C4"
gh label create "fitness" --color "BFDADC"
gh label create "budget" --color "FEF2C0"
gh label create "notification" --color "D4C5F9"
gh label create "dashboard" --color "E6E6E6"

# 2. Create milestones
gh api repos/{owner}/{repo}/milestones -f title="M1 — Foundation" -f description="Scaffolding, DB, Auth, Widget Framework"
gh api repos/{owner}/{repo}/milestones -f title="M2 — Dashboard + Interview Prep" -f description="Dashboard UI, first widget end-to-end"
gh api repos/{owner}/{repo}/milestones -f title="M3 — Fitness Tracker" -f description="Workouts, food, recipes, meals"
gh api repos/{owner}/{repo}/milestones -f title="M4 — Budget Planner" -f description="Transactions, rates, forecast"
gh api repos/{owner}/{repo}/milestones -f title="M5 — Notifications + Testing" -f description="Real-time, achievements, test coverage"
gh api repos/{owner}/{repo}/milestones -f title="M6 — Polish + Deploy" -f description="Export, deploy, monitoring"
gh api repos/{owner}/{repo}/milestones -f title="M7 — Budget Accounts Aggregation" -f description="Manual + crypto.com + Open Banking providers, credential vault, Accounts UI"

# Additional M7 labels
gh label create "phase-0" --color "E6E6E6" --description "Budget Accounts: Foundations"
gh label create "phase-1" --color "C2E0C6" --description "Budget Accounts: Crypto first"
gh label create "phase-2" --color "BFD4F2" --description "Budget Accounts: Open Banking"
gh label create "phase-3" --color "F9D0C4" --description "Budget Accounts: UI polish + launch"
gh label create "security" --color "B60205" --description "Credential vault, encryption, auth"
gh label create "observability" --color "1D76DB" --description "Logging, metrics, dashboards"
gh label create "docs" --color "FEF2C0" --description "Documentation"
gh label create "type:spike" --color "FBCA04" --description "Time-boxed investigation"
gh label create "widget:budget" --color "FEF2C0" --description "Budget widget tag"

# Additional M8 labels
gh label create "mobile" --color "A855F7" --description "React Native mobile app (M8)"
gh label create "phase-mobile-0" --color "EDE9FE" --description "M8 Phase 0 — Mobile Foundation"
gh label create "phase-mobile-1" --color "DDD6FE" --description "M8 Phase 1 — Shared Code Extraction"
gh label create "phase-mobile-2" --color "C4B5FD" --description "M8 Phase 2 — Mobile UI Dashboard + Interview Prep"
gh label create "phase-mobile-3" --color "A78BFA" --description "M8 Phase 3 — Mobile UI Fitness + Budget"
gh label create "phase-mobile-4" --color "8B5CF6" --description "M8 Phase 4 — Mobile-Specific Features"
gh label create "phase-mobile-5" --color "7C3AED" --description "M8 Phase 5 — Distribution"

# M8 milestone
gh api repos/{owner}/{repo}/milestones -f title="M8 — Mobile App" -f description="React Native mobile application. Phased delivery (mirrors M7 pattern). Reuses packages/shared. Starts after M2 web is complete."

# 3. Create issues (example for #1)
gh issue create \
  --title "Initialize Kotlin/Spring Boot backend project" \
  --label "story,common,infra,backend,P0-critical" \
  --milestone "M1 — Foundation" \
  --body "Story Points: 8

Create Gradle 9.4 (Kotlin DSL) project with Kotlin 2.3.20 + Spring Boot 4.0.5 on JDK 25 LTS.

## Checklist
- [ ] build.gradle.kts — DGS, Spring Boot Starters, Flyway, Redis, MockK, Testcontainers, ktlint
- [ ] application.yml with profiles: dev, test, prod
- [ ] Logback → structured JSON logging
- [ ] ktlint plugin + .editorconfig
- [ ] Package structure: com.mrurec.lifegoals/{common,interviewprep,fitness,budget,dashboard,notification}"
```
