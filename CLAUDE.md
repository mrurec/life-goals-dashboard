# CLAUDE.md — Life Goals Dashboard

> This file is the single source of truth for any AI agent working on this project.
> Read it fully before writing any code.

## Project Identity

**Life Goals Dashboard** is a **universal, widget-based** full-stack platform for tracking any personal goals through a dynamic, configurable dashboard. The platform ships with three built-in widget types — Interview Prep, Fitness Tracker, and Budget Planner — but is designed to be extended with any new widget type without touching core code.

Any user can add, remove, and configure widget instances on their dashboard. All goal-specific parameters (deadlines, currencies, targets, company names) are user-supplied config, never hardcoded. The project is **not tied to any specific person's goals**.

The architecture, patterns, and code style are deliberately aligned with **Meta Engineering standards**, making it a strong portfolio piece for FAANG-level interviews.

**Created by:** mrurec (yura.suhodolov@gmail.com)
**Language of code:** English (all code, comments, variable names, GraphQL schema, commits)
**Language of UI:** English (all user-facing strings)

## Example Usage Scenarios

The widget types are generic. Here are examples of how different users might configure them:

**Interview Prep widget:**
- User A: `{ targetCompany: "Meta", targetLevel: "E5", focusCategories: ["GRAPH", "DP"] }`
- User B: `{ targetCompany: "Google", targetLevel: "L5", focusCategories: ["SYSTEM_DESIGN"] }`

**Fitness Tracker widget:**
- User A: `{ targetWeightKg: 80, dailyCalorieTarget: 2200 }`
- User B: `{ targetWeightKg: 65, dailyCalorieTarget: 1800, macroTargets: { proteinPct: 40 } }`

**Budget Planner widget:**
- User A: `{ goalName: "South Korea Trip", baseCurrency: "EUR", targetCurrency: "KRW", deadline: "2026-10" }`
- User B: `{ goalName: "Emergency Fund", baseCurrency: "USD", targetCurrency: "USD", deadline: "2027-06" }`

**None of these values exist in the codebase.** They all live in `user_dashboard_widget.config` (JSONB).

---

## Tech Stack

### Backend
| Component | Technology | Version |
|-----------|-----------|---------|
| JDK | Java (LTS) | 25 |
| Language | Kotlin | 2.3.20 |
| Framework | Spring Boot | 4.0.5 (Spring Framework 7, Jakarta EE 11, Jackson 3, JSpecify null-safety) |
| GraphQL | Netflix DGS (Domain Graph Service) | 11.1.0 (built on Spring Boot 4) |
| Database | PostgreSQL | 18.3 (async I/O subsystem, `uuidv7()`, virtual generated columns) |
| Cache | Redis | 8.6.2 |
| ORM | Spring Data JPA + Hibernate | 7.x (ships with Spring Boot 4) |
| Migrations | Flyway | 11.x |
| Auth | OAuth2 + JWT (Spring Security 7) | — |
| Build | Gradle (Kotlin DSL) | 9.4.1 |

### Frontend
| Component | Technology | Version |
|-----------|-----------|---------|
| Language | TypeScript | 6.0.2 |
| UI | React | 19.2.5 (Server Components, Actions, Activity API stable) |
| Data fetching | Relay (`react-relay`) | 20.1.1 |
| State management | Jotai | 2.x (replaces Recoil — Recoil is archived and no longer maintained; Jotai is the atom-based successor with full React 19 concurrent support) |
| Styling | CSS Modules | — |
| Build | Vite | 8.0.8 (Rolldown/Rust bundler, 10-30× faster builds) |

### Infrastructure
| Component | Technology |
|-----------|-----------|
| Containerization | Docker + Docker Compose |
| CI/CD | GitHub Actions |
| Hosting (backend) | Railway or Render |
| Hosting (frontend) | Vercel |
| Database (prod) | Neon PostgreSQL |
| Cache (prod) | Upstash Redis |

---

## Architecture: Widget-First Modular Monolith

This is NOT a microservice project. It is a **modular monolith** — a single Spring Boot application where each **widget type** lives in its own package with strict boundaries. Widget types communicate through defined service interfaces, never directly accessing each other's repositories.

### Core Principle: Widgets Are First-Class Citizens

The entire application is a **widget platform**. There is no "fixed dashboard with 3 sections." Instead:

- A **Widget Type** is a backend package + frontend feature folder that implements the `WidgetProvider` interface
- A **Widget Instance** is a user's configured placement of a widget type on their dashboard, stored in `user_dashboard_widget` with a `config: JSONB` column
- **All domain-specific parameters live in widget config** — deadlines, currencies, targets, thresholds. The code is generic; the config makes it personal.

### Package Structure

```
com.mrurec.lifegoals/
├── common/              # Shared: auth, GraphQL infra, Relay utils, widget framework
│   └── widget/          # WidgetProvider interface, WidgetRegistry, WidgetConfig
├── interviewprep/       # Widget Type: LeetCode tracking, system design, behavioral
├── fitness/             # Widget Type: Workouts, body measurements, food, recipes, meals
├── budget/              # Widget Type: Transactions, savings goals, exchange rates
├── dashboard/           # Dashboard shell: renders widget instances from user config
└── notification/        # Cross-cutting: in-app + subscriptions
```

**Rule:** A widget type package may depend on `common/` but NEVER imports from another widget type's `repository/` or `model/` package. Cross-widget data flows through service interfaces only. This is the key to eventual microservice extraction.

**Enforcement (Spring Modulith).** The rule above is enforced by [Spring Modulith](https://docs.spring.io/spring-modulith/reference/), not by convention or code review. Every top-level package under `com.mrurec.lifegoals/` is an `@ApplicationModule` with an explicit `allowedDependencies` list (widgets may only depend on `common`). A single JUnit test `ModularityTests#verifies module boundaries` runs `ApplicationModules.of(LifeGoalsApplication::class.java).verify()` — it fails the build on illegal cross-widget imports and on module cycles. The same test also generates PlantUML diagrams of the module graph under `build/spring-modulith-docs/`.

**Cross-widget communication** uses Spring Modulith events via `ApplicationEventPublisher` + `@ApplicationModuleListener` (backed by the transactional event publication registry), never direct method calls. Example: `fitness` publishes `WorkoutLogged` → `notification` reacts via `AchievementChecker` listener with zero compile-time dependency on `fitness` internals.

See `docs/adr/ADR-004-module-boundary-enforcement.md` for the decision record and the trade-off vs. ArchUnit.

### Widget Config (JSONB) — No Hardcoded Parameters

Every widget instance carries a `config: JSONB` with user-supplied parameters. The widget type defines a config schema; the dashboard enforces it at add-time.

```kotlin
// What the WidgetProvider receives:
interface WidgetProvider {
    val type: WidgetType
    val metadata: WidgetMetadata
    val configSchema: JsonSchema    // Defines required/optional config fields

    fun resolve(viewerContext: ViewerContext, config: JsonNode): Any
    fun validateConfig(config: JsonNode): List<ConfigError>
}
```

**Example configs per widget type:**

```jsonc
// Interview Prep widget config
{
  "targetCompany": "Meta",            // Could be "Google", "Amazon", etc.
  "targetLevel": "E5",               // User's target level
  "weeklyProblemGoal": 15,           // How many problems per week
  "focusCategories": ["GRAPH", "DYNAMIC_PROGRAMMING"],
  "reviewIntervalDays": 3            // Spaced repetition base interval
}

// Fitness Tracker widget config
{
  "targetWeightKg": 80.0,
  "startWeightKg": 95.0,
  "targetWorkoutsPerWeek": 4,
  "dailyCalorieTarget": 2200,
  "macroTargets": {                   // Optional macro split
    "proteinPct": 30,
    "carbsPct": 40,
    "fatPct": 30
  }
}

// Budget Planner widget config
{
  "goalName": "South Korea Trip",     // User-defined name
  "targetAmount": 3000,              // How much to save
  "targetCurrency": "KRW",           // Any supported currency
  "baseCurrency": "EUR",             // User's local currency
  "deadline": "2026-10",             // User-chosen deadline
  "budgetCategories": [              // Trip budget breakdown
    { "name": "Flights", "estimatedAmount": 800 },
    { "name": "Accommodation", "estimatedAmount": 900 },
    { "name": "Food", "estimatedAmount": 600 },
    { "name": "Entertainment", "estimatedAmount": 400 },
    { "name": "Transport", "estimatedAmount": 300 }
  ]
}
```

**CRITICAL RULE:** If you're about to hardcode a domain value (a deadline, a currency, a target, a threshold), STOP. It belongs in widget config. The only hardcoded values are enum lists (ProblemCategory, Difficulty, MealType) and system constants (cache TTLs, API URLs).

### Widget Lifecycle

```
1. User clicks "Add Widget" → sees available widget types from WidgetRegistry
2. User picks a type → frontend shows config form (generated from configSchema)
3. User fills config → mutation addWidgetToDashboard(type, config)
4. Backend validates config against schema → saves to user_dashboard_widget
5. Dashboard re-fetches → new widget appears, resolved with user's config
```

### Adding a New Widget Type (3 Steps)

1. **Backend:** Create package with `WidgetProvider` impl + models + services. Spring auto-discovers it.
2. **GraphQL:** Add data type to `WidgetData` union, define config schema.
3. **Frontend:** Create component + config form, register in `WidgetRegistry.ts` map (one line).

Zero changes to dashboard shell, routing, or other widget types.

---

## Meta Engineering Patterns (MANDATORY)

These patterns are non-negotiable in this project. Every PR must follow them.

### 1. Fragment Colocation (Relay)
Every React component that displays data MUST declare its own GraphQL fragment **in the same file**. Fragment naming: `ComponentName_fieldName`.

```tsx
// CORRECT — fragment lives with component
const fragment = graphql`
  fragment FoodProductCard_product on FoodProduct {
    id
    name
    caloriesPer100g
  }
`;

// WRONG — fragments in a separate queries/ folder
```

### 2. Relay Connection Pattern (Cursor Pagination)
All list types use Relay-style connections. Never use offset-based pagination.

```graphql
// CORRECT
type CodingProblemConnection {
  edges: [CodingProblemEdge!]!
  pageInfo: PageInfo!
  totalCount: Int!
}

// WRONG
type Query {
  problems(page: Int, size: Int): [CodingProblem!]!
}
```

### 3. Persisted Queries
In production, clients send only the query hash (MD5) + variables. The Relay compiler generates the hash map. Server maintains an allowlist. Configure via `GraphQLConfig.kt`.

### 4. Mutation Payloads with Errors
Every mutation returns a `*Payload` type containing the result AND an errors array. Never throw GraphQL errors for business logic — return them in the payload.

```graphql
// CORRECT
type CreateRecipePayload {
  recipe: Recipe
  errors: [UserError!]!
}

type UserError {
  field: String
  message: String!
  code: ErrorCode!
}

// WRONG — throwing for validation errors
```

### 5. DataLoaders (N+1 Prevention)
Any resolver that touches a child entity MUST use a DataLoader. Register all loaders in `DataLoaderRegistrar.kt`. This is how Meta's TAO works — batch + cache.

```kotlin
// CORRECT — batched
@DgsData(parentType = "RecipeIngredient", field = "product")
fun product(dfe: DgsDataFetchingEnvironment): CompletableFuture<FoodProduct> {
    val loader = dfe.getDataLoader<UUID, FoodProduct>("foodProductLoader")
    return loader.load(dfe.getSource<RecipeIngredient>().foodProductId)
}

// WRONG — individual fetch per ingredient
```

### 6. Privacy-Aware ViewerContext
Every service method receives a `ViewerContext` (containing userId, permissions). Data access is always scoped to the viewer. If the viewer doesn't own the resource, return null or throw — never return someone else's data.

### 7. Suspense + Error Boundaries (Frontend)
Every async component is wrapped: `ErrorBoundary > Suspense > Component`. The `@defer` directive on heavy dashboard widgets triggers Suspense fallbacks automatically.

### 8. Jotai for Global State
No Redux. Use Jotai atoms for global state (theme, user, notifications). Keep atoms granular. Components subscribe only to what they render. (Recoil is archived upstream; Jotai is the atom-based successor and is fully compatible with React 19 concurrent rendering.)

---

## Naming Conventions

| Element | Convention | Example |
|---------|-----------|---------|
| Kotlin class | UpperCamelCase | `FoodCatalogService` |
| Kotlin function | lowerCamelCase | `calculateNutrition()` |
| Kotlin file | Same as class | `FoodCatalogService.kt` |
| React component | UpperCamelCase | `FoodProductCard.tsx` |
| React hook | usePrefix | `useDebounce.ts` |
| Test file | Colocated, `.test.` suffix | `FoodProductCard.test.tsx` |
| CSS Module | Colocated, `.module.css` | `FoodProductCard.module.css` |
| GraphQL type | UpperCamelCase | `FoodProduct` |
| GraphQL field | lowerCamelCase | `caloriesPer100g` |
| GraphQL enum value | SCREAMING_SNAKE | `DYNAMIC_PROGRAMMING` |
| GraphQL input | `*Input` suffix | `CreateRecipeInput` |
| GraphQL payload | `*Payload` suffix | `CreateRecipePayload` |
| Relay fragment | `Component_field` | `FoodProductCard_product` |
| DB table | snake_case | `food_product` |
| DB column | snake_case | `calories_per_100g` |
| Flyway migration | `V{N}__{description}.sql` | `V3__create_food_tables.sql` |

---

## File Structure Rules

- One export per file (component, service, hook)
- Tests colocated with source (same directory, `.test.tsx` / `.test.kt`)
- CSS Modules colocated with component
- `__generated__/` folders contain Relay compiler output — DO commit these
- Maximum directory nesting: 3 levels from `src/`
- Backend tests mirror source structure: `src/test/kotlin/.../interviewprep/`

---

## GraphQL Schema Files

All `.graphqls` files live in `src/main/resources/schema/`:

| File | Contents |
|------|----------|
| `schema.graphqls` | Root Query, Mutation, Subscription, Node interface, PageInfo |
| `relay.graphqls` | Relay connection utilities, scalar types (DateTime, Date, JSON) |
| `interviewprep.graphqls` | CodingProblem, SystemDesignTopic, BehavioralStory types |
| `fitness.graphqls` | Workout, ExerciseSet, BodyMeasurement types |
| `food.graphqls` | FoodProduct, Recipe, RecipeIngredient, Meal, MealEntry types |
| `budget.graphqls` | Transaction, SavingsGoal, ExchangeRate, TripBudget types |
| `dashboard.graphqls` | MyDashboard, DashboardWidget, WidgetData union, widget mutations, AvailableWidget, config schema |
| `notification.graphqls` | Notification, NotificationConnection, subscriptions |

**Schema-first approach:** Write the `.graphqls` file first, then implement the resolvers. DGS generates types from the schema.

---

## Database Conventions

- All primary keys: `UUID`, generated with `gen_random_uuid()`
- All tables have `created_at TIMESTAMP DEFAULT NOW()`
- User-scoped tables always have `user_id UUID NOT NULL REFERENCES "user"(id)`
- Use JSONB for flexible fields (tags, config)
- Indexes: always on `(user_id, ...)` since every query is viewer-scoped
- Flyway migrations are sequential: `V1__`, `V2__`, etc. Never edit an existing migration.

### No Default Currency
Currencies are widget-config-driven. The Budget Planner widget receives `baseCurrency` and `targetCurrency` from user config. The exchange rate service supports any pair. Never hardcode a specific currency anywhere in the codebase.

---

## Widget Type Reference

### Interview Prep (widget type: `INTERVIEW_PREP`)

**Config fields:** `targetCompany`, `targetLevel`, `weeklyProblemGoal`, `focusCategories[]`, `reviewIntervalDays`

**Domain concepts:**
- Problem categories (enum, not config): ARRAY, STRING, LINKED_LIST, TREE, GRAPH, DYNAMIC_PROGRAMMING, BINARY_SEARCH, BACKTRACKING, SYSTEM_DESIGN, OTHER
- `isMetaTagged` flag — renamed to `isTargetCompanyTagged` — marks problems known to appear at the `config.targetCompany`
- Spaced Repetition (SM-2): `nextReviewDate`, `easeFactor`, `interval`, `repetitions` — base interval comes from `config.reviewIntervalDays`
- `readinessScore` (0-100): heuristic based on coverage of `config.focusCategories`, difficulty spread, recency, and `config.weeklyProblemGoal` adherence
- Heat map: daily problem-solving activity (like GitHub contribution graph)

### Fitness Tracker (widget type: `FITNESS`)

**Config fields:** `targetWeightKg`, `startWeightKg`, `targetWorkoutsPerWeek`, `dailyCalorieTarget`, `macroTargets{}`

**Domain concepts:**
- **FoodProduct**: nutritional info per 100g (calories, protein, carbs, fat, fiber). Can be catalog-seeded or user-created (`isCustom=true`)
- **Recipe**: composite dish made of FoodProduct ingredients. Nutrition auto-calculated. Has `servings` count.
- **MealEntry**: links either a FoodProduct (with `portionG`) or a Recipe (with `servings` count) to a Meal
- **NutritionCalculator**: centralized service that computes nutrition. Source of truth (client computes for UX, server recomputes on save)
- Targets (calorie, macro, weight, workouts/week) all come from **widget config**, compared against actual tracked data
- `TrendDirection` enum: UP, DOWN, STABLE — computed from `BodyMeasurement` history

### Budget Planner (widget type: `BUDGET`)

**Config fields:** `goalName`, `targetAmount`, `targetCurrency`, `baseCurrency`, `deadline`, `budgetCategories[]`

**Domain concepts:**
- Currencies are **config-driven**: `config.baseCurrency` ↔ `config.targetCurrency`. The exchange rate service fetches any supported pair dynamically. No hardcoded EUR or KRW anywhere.
- `SavingsForecast`: projected reach date based on average monthly savings over last 3 months vs `config.targetAmount` and `config.deadline`
- Three forecast scenarios: current pace, +10%, +20% increase
- Trip budget breakdown: categories come from `config.budgetCategories[]`, amounts shown in both `baseCurrency` and `targetCurrency`
- Exchange rate cached in Redis with 1-hour TTL, key includes the currency pair: `lifegoals:exchange:{base}:{target}`

### Dashboard Shell (not a widget type)

- Renders widget instances from `user_dashboard_widget` table
- `user_dashboard_widget` stores: widget type, position, size, **config JSONB**
- Default setup for new users: empty dashboard with onboarding flow to add first widget
- Widget config form is generated from `WidgetProvider.configSchema`

### Notification System (cross-cutting)

- Types: REMINDER, ACHIEVEMENT, WARNING, MILESTONE
- Achievements are widget-aware: "3 workouts this week!" (fitness), "10 problems solved!" (interview prep), "50% savings goal reached!" (budget)
- Each widget type registers its own achievement rules via `AchievementChecker` interface
- GraphQL Subscriptions via WebSocket + Redis pub/sub for real-time delivery

---

## Testing Requirements

| Level | Tool | Target Coverage | Scope |
|-------|------|----------------|-------|
| Unit (services) | JUnit 5 + MockK | > 80% branch | All service classes |
| Integration (repos) | Testcontainers + PostgreSQL | Critical paths | Repository queries, DataLoaders |
| GraphQL resolvers | DGS test framework | All queries/mutations | Request → response assertions |
| React components | React Testing Library + Jest | Behavior assertions | User interactions, not snapshots |
| E2E | Playwright | Critical flows | Log meal, log workout, create transaction |

### Test Naming Convention
Describe what + expect what:

```kotlin
// CORRECT
@Test
fun `logMeal with valid product should calculate correct nutrition`()

// WRONG
@Test
fun `test meal logging`()
```

### Running Tests

```bash
# Backend
./gradlew test                          # All tests
./gradlew test --tests "*FitnessService*"  # Specific service

# Frontend
npm test                                # All tests
npm test -- --watch                     # Watch mode
npm run relay                           # Re-run Relay compiler after schema changes

# Integration (requires Docker)
./gradlew integrationTest               # Testcontainers spin up PostgreSQL + Redis
```

---

## Development Commands

```bash
# Start everything locally
docker-compose -f life-goals-api/docker-compose.yml up -d   # PostgreSQL + Redis
./gradlew bootRun                                            # Backend on :8080
cd life-goals-web && npm run dev                             # Frontend on :5173

# Run the backend as a Docker container (dev — builds image from source)
docker-compose -f deploy/docker-compose.dev.yml up -d

# Run the backend as a Docker container (prod — uses pre-built image)
export API_IMAGE=ghcr.io/mrurec/life-goals-api:0.0.1-SNAPSHOT
docker-compose -f deploy/docker-compose.prod.yml up -d

# Database
./gradlew flywayMigrate                 # Run migrations
./gradlew flywayClean flywayMigrate     # Reset DB (dev only!)

# GraphQL
# After changing any .graphqls file:
./gradlew generateJava                  # DGS codegen (backend types)
cd life-goals-web && npm run relay      # Relay compiler (frontend types)

# GraphQL Playground available at http://localhost:8080/graphiql

# Lint & Format
./gradlew ktlintCheck                   # Kotlin lint
cd life-goals-web && npm run lint       # ESLint
cd life-goals-web && npm run typecheck  # TypeScript

# Build
./gradlew build                         # Backend JAR
cd life-goals-web && npm run build      # Frontend bundle
cd life-goals-api && docker build -t life-goals-api .  # Backend Docker image
```

---

## Caching Strategy

| Data | Store | TTL | Strategy | Invalidation |
|------|-------|-----|----------|-------------|
| Exchange rate (any pair) | Redis | 1 hour | Cache-aside | Hourly scheduler per active pair |
| Dashboard widget data | Redis | 5 min | Write-through | On any mutation in the module |
| Problem stats + heat map | Redis | 10 min | Cache-aside | On problem CRUD |
| Food product search | Redis | 30 min | Query-based key | On new product creation |
| Weekly nutrition summary | Redis | 15 min | Cache-aside | On meal log |
| Persisted queries map | JVM heap | Forever | Loaded at startup | Redeploy |

Redis key pattern: `lifegoals:{widget_type}:{entity}:{id_or_query_hash}`

Example: `lifegoals:budget:exchange_rate:EUR:KRW` (currency pair comes from widget config)

---

## Error Handling

### Backend
- Business logic errors → return in `Payload.errors: [UserError]` (never throw)
- Auth errors → throw, caught by `GraphQLExceptionHandler` → standard GraphQL error with `UNAUTHENTICATED` code
- System errors → throw, log with structured logging, return generic "Internal error" to client
- Never expose stack traces to the client

### Frontend
- Network errors → caught by `ErrorBoundary`
- Mutation errors → check `payload.errors` array, display to user
- Missing data → `Suspense` shows fallback, `ErrorBoundary` catches render errors
- Optimistic updates → Relay auto-rollbacks on server error

---

## Feature Flags

`FeatureFlags` service (`common/config/FeatureFlags.kt`) reads from a JSON config file (or DB table in production). Check feature availability before exposing new functionality:

```kotlin
if (featureFlags.isEnabled("spaced_repetition", viewerContext.userId)) {
    // include nextReviewProblem in response
}
```

This mirrors Meta's Gatekeeper system. Use it for gradual rollouts and A/B tests.

---

## Observability & Structured Logging

All backend logging uses structured JSON format (Logback + logstash-encoder). Every GraphQL request is logged with:

```kotlin
// Fields logged per request:
// queryHash, operationName, durationMs, resolverTimings, dataLoaderBatchSizes, userId, errorCount
```

Key instrumentation points:
- `QueryPerformanceInstrumentation` — DGS instrumentation that measures per-resolver latency
- DataLoader batch sizes are logged to detect inefficient batching
- Exchange rate API calls log response time and cache hit/miss
- All mutations log before/after state for audit trail

Log format: JSON lines → stdout (consumed by Railway/Render log aggregator).

---

## GraphQL Subscriptions

Subscriptions use WebSocket transport (graphql-ws protocol) backed by Redis pub/sub:

```
Client ←WebSocket→ DGS Subscription Handler ←pub/sub→ Redis ←publish→ Service Layer
```

- WebSocket endpoint: `/subscriptions` (configured in `GraphQLConfig.kt`)
- When a mutation occurs (e.g., logWorkout), the service publishes to Redis channel
- `NotificationSubscription.kt` listens and pushes to connected WebSocket clients
- Frontend connects via Relay subscription handler in `RelayEnvironment.ts`

Test subscriptions with: GraphQL Playground → Subscription tab, or Playwright WebSocket interception.

---

## Spaced Repetition (SM-2 Algorithm)

The Interview Prep module uses SM-2 for intelligent problem review scheduling:

```
After each attempt:
  if solved:
    easeFactor = max(1.3, easeFactor + 0.1 - (5 - quality) * (0.08 + (5 - quality) * 0.02))
    interval = previous_interval * easeFactor
    repetitions++
  else:
    interval = 1 day
    repetitions = 0
    // easeFactor unchanged

quality = 5 (solved fast) / 4 (solved) / 3 (solved slow) / 2 (attempted) / 1 (gave up)
```

`SpacedRepetitionService.kt` manages `ReviewSchedule` entities. `InterviewPrepWidgetData.nextReviewProblem` is resolved by finding the problem with the earliest `nextReviewDate <= today`.

---

## @defer Directive Usage

Heavy dashboard widgets use `@defer` to avoid blocking the initial response:

```graphql
query DashboardPageQuery {
  myDashboard {
    widgets {
      id
      type
      position
      data @defer {           # Server sends widget metadata immediately,
        __typename             # data arrives as a subsequent chunk
        ... on FitnessWidgetData { ...FitnessWidget_data }
        ... on BudgetWidgetData { ...BudgetWidget_data }
      }
    }
  }
}
```

On the frontend, Relay + Suspense handle deferred data automatically — the component shows `<WidgetSkeleton>` until the chunk arrives.

---

## Git Conventions

### Branch Naming
```
feature/LGD-{number}-short-description
fix/LGD-{number}-short-description
refactor/LGD-{number}-short-description
```

### Commit Messages
```
feat(fitness): add recipe builder with auto-nutrition calculation
fix(budget): correct KRW/EUR exchange rate cache invalidation
refactor(common): extract Relay connection utilities to shared package
test(interviewprep): add integration tests for spaced repetition service
docs: update CLAUDE.md with food module conventions
```

Format: `type(scope): lowercase description`

Types: `feat`, `fix`, `refactor`, `test`, `docs`, `chore`, `perf`

### PR Requirements
- All tests pass
- Relay compiler runs without errors
- ktlint + ESLint pass
- Branch is up to date with main

---

## Common Pitfalls — Avoid These

1. **Never use offset pagination** — always cursor-based (Relay Connection pattern)
2. **Never fetch data without ViewerContext** — every query is user-scoped
3. **Never resolve child entities without DataLoader** — causes N+1
4. **Never put GraphQL fragments in separate files** — colocate with component
5. **Never use Redux or Context for global state** — use Jotai atoms
6. **Never hardcode ANY domain parameter** — currencies, deadlines, targets, thresholds all live in widget config JSONB
7. **Never edit existing Flyway migrations** — create a new one
8. **Never skip `errors` in mutation payloads** — always include `[UserError!]!`
9. **Never use `localStorage`** — use Jotai for React state, Redis for server cache
10. **Never add a widget by modifying DashboardPage.tsx** — register in WidgetRegistry

---

## Deployment Checklist

Before deploying to production:

1. All tests green (`./gradlew test && cd life-goals-web && npm test`)
2. Relay compiler succeeds (`npm run relay`)
3. Flyway migrations are sequential and non-destructive
4. No secrets in code (check `.env.example` for required vars)
5. Docker build succeeds locally
6. Feature flags configured for new features
7. Exchange rate API key configured
8. Redis connection verified

---

## Environment Variables

```bash
# Backend (application.yml or env)
DB_URL=jdbc:postgresql://localhost:5432/lifegoals
DB_USERNAME=postgres
DB_PASSWORD=secret
REDIS_URL=redis://localhost:6379
JWT_SECRET=your-256-bit-secret
OAUTH_CLIENT_ID=...
OAUTH_CLIENT_SECRET=...
EXCHANGE_RATE_API_KEY=...          # For KRW/EUR rates
EXCHANGE_RATE_API_URL=https://api.exchangeratesapi.io/v1/latest
FEATURE_FLAGS_PATH=config/features.json

# Frontend (.env)
VITE_GRAPHQL_ENDPOINT=http://localhost:8080/graphql
VITE_GRAPHQL_WS_ENDPOINT=ws://localhost:8080/subscriptions
```

---

## Architecture Reference

For detailed architecture documentation including:
- Mermaid diagrams (component, ER, sequence)
- Full GraphQL schema with all types
- Code examples (Kotlin + React/Relay)
- Trade-off analysis and interview talking points
- Widget system internals
- Resume-worthy enhancements (Spaced Repetition, Observability, Feature Flags)

**See:** `docs/ARCHITECTURE.md`

For developer onboarding, learning plans, and TDD assignments from the project backlog:

**See:** `docs/ONBOARDING_LEARNING_PLAN.md` (17-module plan) and `docs/study-plans/` (interactive HTML modules with TDD tests from `docs/BACKLOG.md`)

## UI Mockups

Static HTML mockups for every screen of the application live under `docs/mockups/`. Open `docs/mockups/index.html` for the gallery. Each mockup uses a shared `_theme.css` (design tokens) and has a route label at the top indicating which app route it represents. Mockups are referenced per-issue in `BACKLOG.md` so you can preview the target UI before implementing a task.

**Gallery:** `docs/mockups/index.html`
