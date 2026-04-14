# Life Goals Dashboard — Intensive Learning Plan for Junior Developers

**[🇬🇧 English](ONBOARDING_LEARNING_PLAN.en.md)** · **[🇷🇺 Русский](ONBOARDING_LEARNING_PLAN.md)**

---

> **Goal:** After completing all modules, a junior developer will be able to independently solve tasks in the Life Goals Dashboard project — from writing GraphQL resolvers in Kotlin to creating React components with Relay.
>
> **Format:** 17 modules, ~9-10 weeks at 4-6 hours/day. Each module contains theory tied to the project, practical assignments, and supplementary resources.
>
> **Module order is structured by dependencies:** first foundation (Git, languages), then databases, then frameworks, and finally infrastructure and testing.
>
> **🧪 TDD from real Backlog:** Each module includes assignments from [GitHub Issues Backlog](BACKLOG.md) (91 tasks, 7 milestones — including M7 Budget Accounts Aggregation) with ready-made tests. Approach: first read the tests → understand expectations → write implementation → run tests. Complete TDD assignments available in [interactive HTML study plans](study-plans/index.html).
>
> **Detailed HTML modules:** Each module is available as a separate HTML page with syntax highlighting, navigation, and TDD assignments: [`docs/study-plans/`](study-plans/index.html)

---

## Module Dependency Map

```
Module 1: Git & Git Flow ─────────────────────────────────────────────┐
Module 2: TypeScript ──────────────────┐                              │
Module 3: Kotlin ──────────────────┐   │                              │
Module 4: PostgreSQL + Flyway ──┐  │   │                              │
Module 5: Redis ─────────────┐  │  │   │                              │
Module 6: Spring Boot 4 ─────┤  │  │   │                              │
Module 7: Spring Data JPA ───┘──┘  │   │                              │
Module 8: GraphQL (theory) ──┐     │   │                              │
Module 9: Netflix DGS ───────┘─────┘   │                              │
Module 10: React 19 ───────────────────┤                              │
Module 11: CSS Modules + Vite ─────────┤                              │
Module 12: Relay ──────────────────────┘                              │
Module 13: Jotai ──────────────────────────────────────────────────┐  │
Module 14: Docker + Docker Compose ────────────────────────────────┤  │
Module 15: GitHub Actions ────────────────────────────────────────┘│  │
Module 16: Testing (full stack) ─────────────────────────────────────┤──┘
Module 17: Integration + Meta Interview Prep ───────────────────────┘
```

---

## Module 1: Git & Git Flow
**Duration:** 2 days | **Prerequisites:** none

### Why it's in the project
Life Goals Dashboard uses strict Git workflow: branches `feature/LGD-{N}-description`, conventional commits (`feat(fitness): ...`), mandatory PR with code review. Without confident Git mastery, you cannot contribute to the project.

### Theory

**1.1. Git Basics (day 1, first half)**

Git is a distributed version control system. Each developer stores a complete copy of the repository, not just the working directory.

Key concepts:
- **Working directory** — files you're currently working on
- **Staging area (index)** — "draft" of the next commit. `git add` moves changes here
- **Repository (.git)** — storage of all commits, branches, tags

Basic commands:
```bash
git init                          # Initialize repository
git clone <url>                   # Clone remote repository
git status                        # Current state (what changed, what's staged)
git add <file>                    # Add file to staging
git add -p                        # Add by parts (interactive mode)
git commit -m "message"           # Create commit
git log --oneline --graph         # Commit history (compact + graph)
git diff                          # What changed (unstaged)
git diff --staged                 # What's in staging
```

How Git stores data: each commit is a snapshot of all files, not a set of changes (diff). Git uses SHA-1 hashes for identifying objects. A branch is simply a pointer to a commit.

**1.2. Branching and merging (day 1, second half)**

```bash
git branch feature/my-feature     # Create branch
git checkout -b feature/my-feature # Create and switch (one command)
git switch -c feature/my-feature   # More modern syntax (Git 2.23+)
git merge feature/my-feature       # Merge branch into current
git rebase main                    # Rebase current branch onto main
```

**Merge vs Rebase:**
- `merge` creates a merge commit, preserving history of both branches. Safe for shared branches.
- `rebase` rewrites history, making it linear. Use only for local branches not yet pushed.

**Resolving conflicts:**
```bash
# On conflict, Git marks files:
<<<<<<< HEAD
your code
=======
their code
>>>>>>> feature/other-branch

# Steps:
# 1. Open file, choose needed variant (or combine)
# 2. Remove conflict markers
# 3. git add <resolved-file>
# 4. git commit (or git rebase --continue)
```

**1.3. Life Goals Dashboard project workflow (day 2, first half)**

The project uses **GitHub Flow** with conventional commits.

**Branch naming:**
```
feature/LGD-42-add-recipe-builder
fix/LGD-55-exchange-rate-cache
refactor/LGD-60-extract-widget-registry
```
Pattern: `{type}/LGD-{issue-number}-{short-description}`

**Commit format (Conventional Commits):**
```
type(scope): lowercase description

# Types: feat, fix, refactor, test, docs, chore, perf
# Scope = project module: fitness, budget, interviewprep, common, dashboard

# Examples:
feat(fitness): add recipe builder with auto-nutrition calculation
fix(budget): correct exchange rate cache invalidation
refactor(common): extract Relay connection utilities to shared package
test(interviewprep): add integration tests for spaced repetition service
```

**PR Workflow:**
1. Create branch from `main`
2. Make commits (following conventional commits)
3. Push: `git push -u origin feature/LGD-42-add-recipe-builder`
4. Open PR on GitHub
5. Pass code review + CI (tests, linters)
6. Squash & merge into `main`

**1.4. Useful techniques (day 2, second half)**

```bash
# Hide unfinished work
git stash                         # Save to stash
git stash pop                     # Return from stash

# Undo changes
git checkout -- <file>            # Revert file to last commit
git reset HEAD <file>             # Remove from staging
git reset --soft HEAD~1           # Undo last commit (keeping changes)

# Bug hunting
git bisect start                  # Binary search for breaking commit
git bisect bad                    # Current commit is bad
git bisect good <commit>          # This commit was good

# Interactive rebase (NOT used in project via CLI,
# but useful to know for local work)
git rebase -i HEAD~3              # Edit last 3 commits

# Cherry-pick
git cherry-pick <commit-hash>     # Apply specific commit to current branch
```

### Practical assignments

**Assignment 1.1.** Create a local repository. Make 5 commits in project's conventional commit format. Create branch `feature/LGD-1-practice`, add 2 commits to it, then merge into main.

**Assignment 1.2.** Simulate a conflict: create two branches from one commit, change the same line in both, merge first into main, then try to merge second. Resolve the conflict.

**Assignment 1.3.** Clone any public repository. Use `git log --oneline --graph --all` to visualize history. Find a specific commit using `git log --grep="fix"`.

**Assignment 1.4.** Practice `git stash`: start editing a file, stash changes, switch branches, return and restore stash.

### Additional resources
- [Pro Git Book (free)](https://git-scm.com/book/en/v2) — chapters 1-3, 6-7
- [Learn Git Branching](https://learngitbranching.js.org/) — interactive trainer
- [Conventional Commits](https://www.conventionalcommits.org/) — specification
- [GitHub Flow](https://docs.github.com/en/get-started/quickstart/github-flow) — workflow description

---

## Module 2: TypeScript
**Duration:** 3 days | **Prerequisites:** basic JavaScript

### Why it's in the project
All frontend of Life Goals Dashboard is written in TypeScript 6.0. Relay generates types from GraphQL schema, and without TypeScript understanding it's impossible to work with them. Jotai atoms are also typed.

### Theory

**2.1. Type basics (day 1)**

```typescript
// Primitive types
let name: string = "Life Goals Dashboard";
let version: number = 1;
let isReady: boolean = false;
let nothing: null = null;
let notDefined: undefined = undefined;

// Arrays
let categories: string[] = ["GRAPH", "DP", "BINARY_SEARCH"];
let scores: Array<number> = [85, 92, 78]; // Alternative syntax

// Tuples (Tuples) — array of fixed length with types
let entry: [string, number] = ["calories", 2200];

// Enum — in project used for fixed value sets
enum Difficulty {
  EASY = "EASY",
  MEDIUM = "MEDIUM",
  HARD = "HARD"
}

enum MealType {
  BREAKFAST = "BREAKFAST",
  LUNCH = "LUNCH",
  DINNER = "DINNER",
  SNACK = "SNACK"
}

// Union types — type can be one of several
type TrendDirection = "UP" | "DOWN" | "STABLE";
let trend: TrendDirection = "UP";

// Literal types
type WidgetType = "INTERVIEW_PREP" | "FITNESS" | "BUDGET";
```

**2.2. Interfaces and Types (day 1)**

```typescript
// Interface — describes object shape
interface FoodProduct {
  id: string;
  name: string;
  caloriesPer100g: number;
  proteinPer100g: number;
  carbsPer100g: number;
  fatPer100g: number;
  fiberPer100g?: number;  // ? = optional field
  isCustom: boolean;
}

// Type alias — more flexible, can describe union, intersection
type NutritionInfo = {
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
};

// Extension (inheritance)
interface Recipe extends FoodProduct {
  ingredients: RecipeIngredient[];
  servings: number;
  instructions: string;
}

// Intersection types
type WidgetWithPosition = WidgetData & {
  position: number;
  size: "SMALL" | "MEDIUM" | "LARGE";
};

// When to use interface vs type:
// interface — for objects that can be extended (extends)
// type — for union types, mapped types, utility types
```

**2.3. Generics (day 2)**

Generics allow writing reusable code while maintaining type safety:

```typescript
// Generic function
function getFirst<T>(items: T[]): T | undefined {
  return items[0];
}

const firstProblem = getFirst<CodingProblem>(problems); // CodingProblem | undefined
const firstName = getFirst(["Alice", "Bob"]);            // string | undefined (inferred)

// Generic interface — like Relay Connection in project
interface Connection<T> {
  edges: Array<{
    node: T;
    cursor: string;
  }>;
  pageInfo: {
    hasNextPage: boolean;
    hasPreviousPage: boolean;
    startCursor: string | null;
    endCursor: string | null;
  };
  totalCount: number;
}

// Usage
type ProblemConnection = Connection<CodingProblem>;
type RecipeConnection = Connection<Recipe>;

// Generic constraints (limitations)
function getProperty<T, K extends keyof T>(obj: T, key: K): T[K] {
  return obj[key];
}

const product: FoodProduct = { /* ... */ };
const calories = getProperty(product, "caloriesPer100g"); // number
// getProperty(product, "nonExistent"); // Compilation error!
```

**2.4. Utility Types (day 2)**

TypeScript provides built-in utility types:

```typescript
// Partial<T> — all fields optional (useful for update forms)
type UpdateWidgetConfig = Partial<FitnessWidgetConfig>;

// Required<T> — all fields mandatory
type StrictConfig = Required<FitnessWidgetConfig>;

// Pick<T, K> — select specific fields
type ProductPreview = Pick<FoodProduct, "id" | "name" | "caloriesPer100g">;

// Omit<T, K> — all fields except specified
type NewProduct = Omit<FoodProduct, "id">;

// Record<K, V> — object with keys K and values V
type MacroTargets = Record<"proteinPct" | "carbsPct" | "fatPct", number>;

// Readonly<T> — all fields read-only (immutability)
type FrozenConfig = Readonly<WidgetConfig>;

// ReturnType<T> — function return type
type CalcResult = ReturnType<typeof calculateNutrition>;
```

**2.5. Typing React components and hooks (day 3)**

```typescript
// Props interface for component
interface FoodProductCardProps {
  product: FoodProduct;
  onSelect: (productId: string) => void;
  showNutrition?: boolean; // Optional
}

// Component with typed props
const FoodProductCard: React.FC<FoodProductCardProps> = ({
  product,
  onSelect,
  showNutrition = true,
}) => {
  // ...
};

// Typed hooks
const [meals, setMeals] = useState<Meal[]>([]);
const [selectedDate, setSelectedDate] = useState<Date>(new Date());
const [error, setError] = useState<string | null>(null);

// useRef with DOM element type
const inputRef = useRef<HTMLInputElement>(null);

// Custom hook with typed return
function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);
  useEffect(() => {
    const timer = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);
  return debouncedValue;
}

// Event handlers
const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();
  // ...
};

const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  const value = e.target.value;
  // ...
};
```

### Practical assignments

**Assignment 2.1.** Describe interfaces for all three widget types in the project: `InterviewPrepConfig`, `FitnessConfig`, `BudgetConfig`. Use union type `WidgetConfig = InterviewPrepConfig | FitnessConfig | BudgetConfig`.

**Assignment 2.2.** Write generic function `paginate<T>(items: T[], pageSize: number, cursor?: string): Connection<T>`, which takes array and returns Relay Connection. Cover edge cases (empty array, invalid cursor).

**Assignment 2.3.** Implement typed custom hook `useLocalForm<T>(initial: T)`, which returns `[T, (field: keyof T, value: T[keyof T]) => void, () => void]` — current state, field update function and reset.

**Assignment 2.4.** Create type `NutritionCalculationResult` and function `calculateMealNutrition(entries: MealEntry[]): NutritionCalculationResult`, using discriminated unions for `MealEntry` (product vs recipe).

### Additional resources
- [TypeScript Handbook](https://www.typescriptlang.org/docs/handbook/) — official documentation
- [TypeScript Deep Dive](https://basarat.gitbook.io/typescript/) — free book
- [Type Challenges](https://github.com/type-challenges/type-challenges) — type tasks (start with easy)
- [Total TypeScript](https://www.totaltypescript.com/) — advanced patterns

---

## Module 3: Kotlin
**Duration:** 4 days | **Prerequisites:** any OOP language (Java, C#, TypeScript)

### Why it's in the project
Life Goals Dashboard backend is entirely written in Kotlin 2.3.20 and runs on JDK 25 LTS. Kotlin is the primary language for Spring Boot 4 in this project. Knowledge of Kotlin is necessary for writing services, models, resolvers and tests.

### Theory

**3.1. Syntax basics (day 1)**

```kotlin
// Variables
val immutable: String = "Life Goals"    // val = read-only (preferred)
var mutable: Int = 42                    // var = mutable

// Kotlin infers types automatically
val name = "FoodProduct"                 // String
val calories = 2200                       // Int
val price = 9.99                          // Double

// Null-safety — key Kotlin feature
val nonNull: String = "hello"             // Cannot be null
val nullable: String? = null              // Can be null (marked with ?)

// Safe call (?.)
val length: Int? = nullable?.length       // null if nullable == null

// Elvis operator (?:) — default value
val length: Int = nullable?.length ?: 0   // 0 if null

// Not-null assertion (!!) — throws NPE if null (AVOID)
val length: Int = nullable!!.length       // NPE if null

// String templates
val message = "Product: $name, calories: ${calories * 2}"

// Functions
fun calculateCalories(weightG: Double, caloriesPer100g: Double): Double {
    return weightG / 100.0 * caloriesPer100g
}

// One-liner function
fun calculateCalories(weightG: Double, caloriesPer100g: Double) =
    weightG / 100.0 * caloriesPer100g

// Default parameters and named arguments
fun createProduct(
    name: String,
    caloriesPer100g: Double,
    proteinPer100g: Double = 0.0,    // Default value
    isCustom: Boolean = true
): FoodProduct { /* ... */ }

// Call with named arguments (order doesn't matter)
createProduct(
    name = "Chicken Breast",
    caloriesPer100g = 165.0,
    proteinPer100g = 31.0
)
```

**3.2. Classes and Data Classes (day 1-2)**

```kotlin
// Regular class
class NutritionCalculator(
    private val defaultPortionG: Double = 100.0  // In constructor
) {
    fun calculate(product: FoodProduct, portionG: Double = defaultPortionG): NutritionInfo {
        val ratio = portionG / 100.0
        return NutritionInfo(
            calories = product.caloriesPer100g * ratio,
            protein = product.proteinPer100g * ratio,
            carbs = product.carbsPer100g * ratio,
            fat = product.fatPer100g * ratio
        )
    }
}

// Data class — automatically generates equals(), hashCode(), toString(), copy()
// Used for models/DTOs in project
data class NutritionInfo(
    val calories: Double,
    val protein: Double,
    val carbs: Double,
    val fat: Double
)

// copy() — creates copy with changed fields (immutability!)
val original = NutritionInfo(200.0, 30.0, 20.0, 8.0)
val modified = original.copy(calories = 250.0)

// Sealed class — limited hierarchy (like union type in TS)
// Perfect for WidgetData in project
sealed class WidgetData {
    data class InterviewPrep(val readinessScore: Int, val problemsSolved: Int) : WidgetData()
    data class Fitness(val currentWeight: Double, val workoutsThisWeek: Int) : WidgetData()
    data class Budget(val savedAmount: Double, val targetAmount: Double) : WidgetData()
}

// when with sealed class — compiler checks exhaustiveness
fun renderWidget(data: WidgetData): String = when (data) {
    is WidgetData.InterviewPrep -> "Readiness: ${data.readinessScore}%"
    is WidgetData.Fitness -> "Weight: ${data.currentWeight}kg"
    is WidgetData.Budget -> "Saved: ${data.savedAmount}/${data.targetAmount}"
    // No else — compiler knows all cases are covered
}

// Enum class
enum class Difficulty {
    EASY, MEDIUM, HARD
}

enum class ProblemCategory(val displayName: String) {
    ARRAY("Array"),
    STRING("String"),
    LINKED_LIST("Linked List"),
    TREE("Tree"),
    GRAPH("Graph"),
    DYNAMIC_PROGRAMMING("Dynamic Programming"),
    BINARY_SEARCH("Binary Search"),
    BACKTRACKING("Backtracking"),
    SYSTEM_DESIGN("System Design"),
    OTHER("Other")
}
```

**3.3. Collections and functional operations (day 2)**

```kotlin
// Immutable collections (by default)
val categories: List<ProblemCategory> = listOf(
    ProblemCategory.GRAPH, 
    ProblemCategory.DYNAMIC_PROGRAMMING
)

val productMap: Map<String, FoodProduct> = mapOf("chicken" to chickenProduct)

// Mutable collections (when you need to change)
val mutableList: MutableList<String> = mutableListOf("a", "b")
mutableList.add("c")

// Functional operations on collections (used EXTENSIVELY in project)
val problems: List<CodingProblem> = getProblemsByUser(userId)

// filter — select elements by condition
val hardProblems = problems.filter { it.difficulty == Difficulty.HARD }

// map — transform each element
val problemNames = problems.map { it.name }

// groupBy — grouping
val byCategory = problems.groupBy { it.category }
// Map<ProblemCategory, List<CodingProblem>>

// sortedBy / sortedByDescending
val recentFirst = problems.sortedByDescending { it.solvedAt }

// flatMap — "flatten" nested collections
val allIngredients = recipes.flatMap { it.ingredients }

// associate — create Map from list
val productById = products.associateBy { it.id }
// Map<UUID, FoodProduct>

// fold / reduce — aggregation
val totalCalories = mealEntries.fold(0.0) { acc, entry ->
    acc + entry.calculatedCalories
}

// let, also, apply, run — scope functions
product?.let { nonNullProduct ->
    // Executes only if product != null
    calculateNutrition(nonNullProduct)
}

val product = FoodProduct().apply {
    name = "Chicken"
    caloriesPer100g = 165.0
    // apply returns the object itself (for builder pattern)
}
```

**3.4. Coroutines — Basics (day 3)**

```kotlin
// Coroutines — lightweight way to write async code
// In project used for DataLoaders and external API calls

import kotlinx.coroutines.*

// suspend — function that can suspend without blocking thread
suspend fun fetchExchangeRate(base: String, target: String): Double {
    // Simulating HTTP call
    return withContext(Dispatchers.IO) {
        // IO dispatcher for network/disk operations
        exchangeRateApi.getRate(base, target)
    }
}

// Launch coroutines
// In Spring Boot, coroutines integrated via WebFlux or CompletableFuture

// async/await — parallel calls
suspend fun getDashboardData(userId: UUID): DashboardData {
    return coroutineScope {
        val fitness = async { fitnessService.getWidgetData(userId) }
        val budget = async { budgetService.getWidgetData(userId) }
        val interview = async { interviewService.getWidgetData(userId) }
        
        DashboardData(
            fitness = fitness.await(),
            budget = budget.await(),
            interview = interview.await()
        )
    }
}
```

**3.5. Extension functions and Kotlin idioms (day 3-4)**

```kotlin
// Extension function — adds method to existing class
fun Double.roundTo(decimals: Int): Double {
    val factor = Math.pow(10.0, decimals.toDouble())
    return Math.round(this * factor) / factor
}

val price = 9.876.roundTo(2) // 9.88

// Extension for project work
fun List<CodingProblem>.completionRate(): Double {
    if (isEmpty()) return 0.0
    return count { it.isSolved }.toDouble() / size * 100
}

// Destructuring
data class NutritionInfo(val calories: Double, val protein: Double, val carbs: Double, val fat: Double)
val (cal, prot, carbs, fat) = calculateNutrition(product, 150.0)

// require / check — defensive programming (use in services)
fun updateWeight(weight: Double) {
    require(weight > 0) { "Weight must be positive, got: $weight" }
    require(weight < 500) { "Weight seems unrealistic: $weight" }
    // ...
}

// use — automatic resource closing (like try-with-resources in Java)
File("data.csv").bufferedReader().use { reader ->
    reader.readLines().forEach { /* ... */ }
}
```

### Practical assignments

**Assignment 3.1.** Create data class `CodingProblem` with all fields from project (id, name, category, difficulty, isSolved, solvedAt, url, notes, isTargetCompanyTagged). Write functions: filter by category, group by difficulty, calculate solved percentage.

**Assignment 3.2.** Implement sealed class `MealEntry` with two variants (ProductEntry and RecipeEntry). Write `NutritionCalculator` that computes calories, proteins, fats and carbs for list of MealEntry.

**Assignment 3.3.** Implement simple SM-2 (Spaced Repetition) algorithm as class with method `processAttempt(quality: Int): ReviewSchedule`. Use data class for `ReviewSchedule` with fields `nextReviewDate`, `easeFactor`, `interval`, `repetitions`.

**Assignment 3.4.** Write extension functions: `List<BodyMeasurement>.trendDirection(): TrendDirection` and `List<Transaction>.monthlySummary(): Map<YearMonth, Double>`.

### Additional resources
- [Kotlin Official Documentation](https://kotlinlang.org/docs/home.html)
- [Kotlin Koans](https://play.kotlinlang.org/koans/) — interactive tasks
- [Kotlin in Action](https://www.manning.com/books/kotlin-in-action) — book from JetBrains
- [Kotlin for Java Developers (Coursera)](https://www.coursera.org/learn/kotlin-for-java-developers) — free course from JetBrains

---

## Module 4: PostgreSQL + Flyway
**Duration:** 3 days | **Prerequisites:** basic understanding of relational databases

### Why it's in the project
PostgreSQL 18.3 is the only database of the project. All widget data, users, and configurations are stored here. Version 18 introduced a new async I/O subsystem (up to 3× faster reads), a built-in `uuidv7()` function (sequential UUIDs index better than v4), and virtual generated columns (formula columns computed at query time without storage). Flyway 11 manages migrations. JSONB is used for flexible fields (widget config, tags).

### Theory

**4.1. SQL — Basics for the project (day 1)**

```sql
-- Table creation (project style: UUID PK, timestamps, user_id FK)
CREATE TABLE food_product (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES "user"(id),
    name VARCHAR(255) NOT NULL,
    calories_per_100g DOUBLE PRECISION NOT NULL,
    protein_per_100g DOUBLE PRECISION NOT NULL DEFAULT 0,
    carbs_per_100g DOUBLE PRECISION NOT NULL DEFAULT 0,
    fat_per_100g DOUBLE PRECISION NOT NULL DEFAULT 0,
    fiber_per_100g DOUBLE PRECISION,
    is_custom BOOLEAN NOT NULL DEFAULT true,
    created_at TIMESTAMP NOT NULL DEFAULT NOW()
);

-- IMPORTANT: Index on user_id — ALL queries are scoped by user
CREATE INDEX idx_food_product_user ON food_product(user_id);

-- Basic queries
-- SELECT with filtering and sorting
SELECT id, name, calories_per_100g
FROM food_product
WHERE user_id = :userId
  AND calories_per_100g < 200
ORDER BY name ASC;

-- JOIN — connect tables
SELECT r.name AS recipe_name, 
       fp.name AS ingredient_name,
       ri.weight_grams
FROM recipe r
JOIN recipe_ingredient ri ON ri.recipe_id = r.id
JOIN food_product fp ON fp.id = ri.food_product_id
WHERE r.user_id = :userId;

-- Aggregation
SELECT DATE(logged_at) AS day,
       SUM(calculated_calories) AS total_calories,
       COUNT(*) AS entries
FROM meal_entry
WHERE user_id = :userId
  AND logged_at >= :startDate
GROUP BY DATE(logged_at)
ORDER BY day DESC;

-- INSERT
INSERT INTO food_product (user_id, name, calories_per_100g, protein_per_100g)
VALUES (:userId, 'Chicken Breast', 165, 31)
RETURNING id, created_at;

-- UPDATE
UPDATE body_measurement
SET weight_kg = :newWeight
WHERE id = :measurementId AND user_id = :userId;

-- DELETE (careful!)
DELETE FROM meal_entry
WHERE id = :entryId AND user_id = :userId;
```

**4.2. PostgreSQL specifics: JSONB (day 2)**

JSONB — binary JSON, supporting indexes and queries. In the project, used for `user_dashboard_widget.config`.

```sql
-- Table with JSONB (as in project)
CREATE TABLE user_dashboard_widget (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES "user"(id),
    widget_type VARCHAR(50) NOT NULL,
    position INTEGER NOT NULL,
    config JSONB NOT NULL DEFAULT '{}',
    created_at TIMESTAMP NOT NULL DEFAULT NOW()
);

-- Reading fields from JSONB
-- -> returns JSON, ->> returns TEXT
SELECT config->>'targetCompany' AS company,
       (config->>'weeklyProblemGoal')::int AS goal
FROM user_dashboard_widget
WHERE widget_type = 'INTERVIEW_PREP'
  AND user_id = :userId;

-- Filtering by JSONB field
SELECT * FROM user_dashboard_widget
WHERE config->>'baseCurrency' = 'EUR';

-- Nested fields
SELECT config->'macroTargets'->>'proteinPct' AS protein_target
FROM user_dashboard_widget
WHERE widget_type = 'FITNESS';

-- @> operator — "contains" (uses GIN index!)
SELECT * FROM user_dashboard_widget
WHERE config @> '{"targetCompany": "Meta"}';

-- GIN index for JSONB (speeds up @> queries)
CREATE INDEX idx_widget_config ON user_dashboard_widget USING GIN (config);

-- Update JSONB field (without rewriting entire config)
UPDATE user_dashboard_widget
SET config = config || '{"weeklyProblemGoal": 20}'::jsonb
WHERE id = :widgetId AND user_id = :userId;
```

**4.3. Cursor-based pagination (Relay-style) (day 2)**

The project does NOT use offset pagination. Only cursor-based:

```sql
-- Cursor-based pagination (Relay Connection pattern)
-- cursor = Base64(created_at + id) — guarantees uniqueness

-- First page
SELECT id, name, calories_per_100g, created_at
FROM food_product
WHERE user_id = :userId
ORDER BY created_at DESC, id DESC
LIMIT :first + 1;  -- +1 to determine hasNextPage

-- Next page (after cursor)
SELECT id, name, calories_per_100g, created_at
FROM food_product
WHERE user_id = :userId
  AND (created_at, id) < (:cursorCreatedAt, :cursorId)  -- Keyset pagination
ORDER BY created_at DESC, id DESC
LIMIT :first + 1;

-- WHY NOT OFFSET:
-- OFFSET 10000 — DB still reads 10000 rows and discards them
-- Keyset pagination — DB jumps directly to needed place via index
-- This is O(1) vs O(N) for large datasets
```

**4.4. Flyway — Database migrations (day 3)**

Flyway automatically applies SQL scripts when the application starts.

```
src/main/resources/db/migration/
├── V1__create_user_table.sql
├── V2__create_interview_prep_tables.sql
├── V3__create_food_tables.sql
├── V4__create_fitness_tables.sql
├── V5__create_budget_tables.sql
├── V6__create_dashboard_tables.sql
└── V7__create_notification_tables.sql
```

Rules:
- Name format: `V{N}__{description}.sql` (two underscores!)
- **NEVER edit existing migration** — create a new one
- Migrations are idempotent — Flyway remembers what's applied (table `flyway_schema_history`)
- For schema changes — new file: `V8__add_fiber_to_food_product.sql`

```sql
-- V8__add_fiber_to_food_product.sql
ALTER TABLE food_product 
ADD COLUMN fiber_per_100g DOUBLE PRECISION;

-- V9__add_tags_to_coding_problem.sql
ALTER TABLE coding_problem
ADD COLUMN tags JSONB NOT NULL DEFAULT '[]';
CREATE INDEX idx_coding_problem_tags ON coding_problem USING GIN (tags);
```

**4.5. Indexes and performance (day 3)**

```sql
-- B-Tree index (default) — for =, <, >, BETWEEN, ORDER BY
CREATE INDEX idx_meal_entry_user_date 
ON meal_entry(user_id, logged_at DESC);

-- Composite index — column order MATTERS
-- Works for: WHERE user_id = X
-- Works for: WHERE user_id = X AND logged_at > Y
-- Does NOT work for: WHERE logged_at > Y (without user_id)
CREATE INDEX idx_transaction_user_date
ON transaction(user_id, created_at DESC);

-- GIN index — for JSONB, arrays, full-text search
CREATE INDEX idx_problem_tags ON coding_problem USING GIN (tags);

-- Partial index — index only part of table
CREATE INDEX idx_unsolved_problems 
ON coding_problem(user_id, category) 
WHERE is_solved = false;

-- EXPLAIN ANALYZE — how to understand if query is fast
EXPLAIN ANALYZE
SELECT * FROM food_product
WHERE user_id = '...' AND calories_per_100g < 200;
-- Shows: index used or not, how many rows read, time
```

### Practical assignments

**Assignment 4.1.** Write full migration for Fitness module tables: `workout`, `exercise_set`, `body_measurement`, `meal`, `meal_entry`. Include FK, indexes on `user_id`, JSONB field for tags.

**Assignment 4.2.** Write SQL query returning "heat map" of solved problems (like GitHub contributions): number of problems by days for last year for specific user.

**Assignment 4.3.** Implement cursor-based pagination for `food_product`: write query for first page and for "next page after cursor". Cursor = `created_at` + `id`.

**Assignment 4.4.** Write query that from JSONB-config of Budget widget extracts all `budgetCategories` and calculates sum of `estimatedAmount` for each widget.

### Additional resources
- [PostgreSQL Tutorial](https://www.postgresqltutorial.com/) — step-by-step lessons
- [Use The Index, Luke](https://use-the-index-luke.com/) — indexes and SQL performance
- [PostgreSQL JSONB Guide](https://www.postgresql.org/docs/16/datatype-json.html) — official documentation
- [Flyway Documentation](https://documentation.red-gate.com/fd) — migrations
- [Pagination Done The Right Way](https://brunoscheufler.com/blog/2022-01-01-paginating-large-ordered-datasets-with-cursor-based-pagination) — cursor vs offset

---

## Module 5: Redis
**Duration:** 2 days | **Prerequisites:** Module 4 (PostgreSQL)

### Why it's in the project
Redis 8.6 is used as cache (exchange rates, dashboard data, food search) and as pub/sub transport for GraphQL Subscriptions. Caching is critical: without it each dashboard request hits the DB.

### Theory

**5.1. Redis data structures (day 1)**

Redis is an in-memory key-value store with typed values.

```bash
# Strings (Strings) — basic type. Used for cache.
SET lifegoals:budget:exchange_rate:EUR:KRW "1450.50"
GET lifegoals:budget:exchange_rate:EUR:KRW
# "1450.50"

# TTL (Time To Live) — auto-delete after N seconds
SET lifegoals:budget:exchange_rate:EUR:KRW "1450.50" EX 3600
# Key disappears in 1 hour (3600 sec)

TTL lifegoals:budget:exchange_rate:EUR:KRW
# 3542 (seconds remaining)

# SETEX — SET + EX in one command
SETEX lifegoals:fitness:weekly_nutrition:user123 900 '{"calories":15400,"protein":980}'
# TTL = 15 minutes (900 sec)

# Hashes (Hashes) — object with fields. Good for structured data.
HSET lifegoals:interviewprep:stats:user123 totalSolved 142 easySolved 50 mediumSolved 67 hardSolved 25
HGET lifegoals:interviewprep:stats:user123 totalSolved
# "142"
HGETALL lifegoals:interviewprep:stats:user123
# totalSolved 142 easySolved 50 ...
HINCRBY lifegoals:interviewprep:stats:user123 totalSolved 1
# 143 (atomic increment)

# Lists (Lists) — notification queue
LPUSH lifegoals:notifications:user123 '{"type":"ACHIEVEMENT","message":"10 problems solved!"}'
LRANGE lifegoals:notifications:user123 0 9  # Last 10

# Sets (Sets) — unique values
SADD lifegoals:fitness:active_users "user123" "user456"
SISMEMBER lifegoals:fitness:active_users "user123"  # 1 (true)

# Sorted Sets — ranked data
ZADD lifegoals:interviewprep:leaderboard 142 "user123" 98 "user456"
ZREVRANGE lifegoals:interviewprep:leaderboard 0 9 WITHSCORES  # Top 10
```

**5.2. Caching patterns in project (day 1)**

```
Key pattern for project: lifegoals:{widget_type}:{entity}:{id_or_hash}
```

**Cache-Aside (Lazy Loading):**
```
1. Client requests data
2. Service checks Redis
3. Hit in cache → return (cache hit)
4. Miss in cache → fetch from PostgreSQL → write to Redis with TTL → return
```

```kotlin
// Example: caching exchange rate
fun getExchangeRate(base: String, target: String): Double {
    val cacheKey = "lifegoals:budget:exchange_rate:$base:$target"
    
    // 1. Check cache
    val cached = redis.get(cacheKey)
    if (cached != null) return cached.toDouble()
    
    // 2. Fetch from API
    val rate = exchangeRateApi.fetch(base, target)
    
    // 3. Write to cache with TTL 1 hour
    redis.setex(cacheKey, 3600, rate.toString())
    
    return rate
}
```

**Write-Through (for Dashboard widget data):**
```
1. Client makes mutation (logWorkout, addMeal)
2. Service writes to PostgreSQL
3. Service updates/invalidates cache
4. Next request gets fresh data from cache
```

```kotlin
// Example: cache invalidation on mutation
fun logWorkout(userId: UUID, workout: Workout): Workout {
    val saved = workoutRepository.save(workout)
    
    // Invalidate cache (data is stale)
    redis.del("lifegoals:fitness:widget_data:$userId")
    redis.del("lifegoals:fitness:weekly_stats:$userId")
    
    return saved
}
```

**Project caching table:**

| Data | Key | TTL | Strategy |
|--------|------|-----|-----------|
| Exchange rate | `lifegoals:budget:exchange_rate:{base}:{target}` | 1 hour | Cache-aside |
| Dashboard widget data | `lifegoals:dashboard:widget:{userId}:{widgetId}` | 5 min | Write-through |
| Problem stats | `lifegoals:interviewprep:stats:{userId}` | 10 min | Cache-aside |
| Food search | `lifegoals:fitness:food_search:{queryHash}` | 30 min | Cache-aside |
| Weekly nutrition | `lifegoals:fitness:weekly_nutrition:{userId}` | 15 min | Cache-aside |

**5.3. Pub/Sub for GraphQL Subscriptions (day 2)**

Redis pub/sub — message publishing/subscription mechanism. In project used for real-time notifications.

```bash
# Subscriber (DGS Subscription Handler listens)
SUBSCRIBE lifegoals:notifications:user123

# Publisher (Service Layer publishes on mutation)
PUBLISH lifegoals:notifications:user123 '{"type":"ACHIEVEMENT","widget":"FITNESS","message":"3 workouts this week!"}'
```

```kotlin
// How it works in project:
// 1. User logs workout → mutation logWorkout
// 2. WorkoutService saves to DB
// 3. AchievementChecker checks: "3 workouts this week!"
// 4. NotificationService publishes to Redis channel
// 5. NotificationSubscription (DGS) receives and sends to WebSocket client
```

**5.4. Redis in Spring Boot (day 2)**

```kotlin
// Configuration (application.yml)
// spring:
//   data:
//     redis:
//       url: ${REDIS_URL:redis://localhost:6379}

// Spring Data Redis — RedisTemplate
@Configuration
class RedisConfig {
    @Bean
    fun redisTemplate(connectionFactory: RedisConnectionFactory): RedisTemplate<String, String> {
        return RedisTemplate<String, String>().apply {
            setConnectionFactory(connectionFactory)
            keySerializer = StringRedisSerializer()
            valueSerializer = StringRedisSerializer()
        }
    }
}

// Usage in service
@Service
class ExchangeRateCacheService(
    private val redisTemplate: RedisTemplate<String, String>,
    private val objectMapper: ObjectMapper
) {
    fun getCachedRate(base: String, target: String): Double? {
        val key = "lifegoals:budget:exchange_rate:$base:$target"
        return redisTemplate.opsForValue().get(key)?.toDouble()
    }
    
    fun cacheRate(base: String, target: String, rate: Double) {
        val key = "lifegoals:budget:exchange_rate:$base:$target"
        redisTemplate.opsForValue().set(key, rate.toString(), Duration.ofHours(1))
    }
}
```

### Practical assignments

**Assignment 5.1.** Install Redis locally (or via Docker: `docker run -p 6379:6379 redis:8.6`). Via `redis-cli` create keys for all cache types in the project (exchange rate, stats, food search). Check TTL, try EXPIRE, DEL.

**Assignment 5.2.** Write Kotlin class `WidgetCacheService`, implementing cache-aside pattern for dashboard widget data. Use `RedisTemplate`. Handle edge case: what if Redis is unavailable? (fallback to DB).

**Assignment 5.3.** Implement pub/sub example: one process subscribes to notification channel, another publishes. Use `RedisMessageListenerContainer` in Spring Boot.

### Additional resources
- [Redis University](https://university.redis.io/) — free courses
- [Redis Documentation](https://redis.io/docs/) — official docs
- [Redis in Action](https://www.manning.com/books/redis-in-action) — book with practice
- [Spring Data Redis Reference](https://docs.spring.io/spring-data/redis/reference/html/) — Spring integration

---

## Module 6: Spring Boot 4
**Duration:** 4.5 days | **Prerequisites:** Module 3 (Kotlin)

### Why it's in the project
Spring Boot 4.0.5 is the main backend framework. All services, repositories, configurations and DI (Dependency Injection) work through Spring. Understanding Spring is mandatory for writing any backend code.

**What's new in Spring Boot 4** (and what we use in the project):
- Built on **Spring Framework 7** and **Jakarta EE 11** — packages are `jakarta.*`, no `javax.*`.
- **JSpecify null-safety** — `@Nullable` / `@NonNull` as first-class API annotations; Kotlin null-safety interop works correctly out of the box.
- **Jackson 3** — new major, slightly different API (Kotlin/JavaTime modules renamed).
- **API Versioning** is now built-in (`@Version`, header/path/media-type strategies) — useful for evolving REST endpoints (OAuth callbacks, webhooks).
- **HTTP Service Clients** — declarative clients out of the box, replacing hand-rolled `WebClient` wrappers. We use them for the Exchange Rate API (Budget widget).
- Built-in **resilience** (retry + throttling) for HTTP clients — removes the need for Resilience4j in simple cases.
- **Minimum Java version: 17**, **officially supported up to Java 25/26** — we run on JDK 25 LTS.

### Theory

**6.1. Dependency Injection and IoC Container (day 1)**

DI is a pattern where dependencies are passed to an object from outside, not created inside. Spring manages the lifecycle of all objects (beans).

```kotlin
// WITHOUT DI (bad — tight coupling):
class WorkoutService {
    private val repository = WorkoutRepository() // Creates dependency itself
    private val cache = RedisCache()              // Cannot mock in tests
}

// WITH DI (good — Spring injects dependencies):
@Service
class WorkoutService(
    private val workoutRepository: WorkoutRepository,  // Spring supplies implementation
    private val cacheService: WidgetCacheService        // Easy to mock in tests
) {
    fun getWorkoutsForUser(userId: UUID): List<Workout> {
        return workoutRepository.findByUserId(userId)
    }
}
```

**Spring annotations — who is who:**

```kotlin
@Component    // Base annotation: "Spring, manage this class"
@Service      // @Component for business logic (services)
@Repository   // @Component for data access (repositories)
@Controller   // @Component for HTTP controllers (in our case — DGS resolvers)
@Configuration // Class with settings and @Bean methods

// @Bean — manual object creation, managed by Spring
@Configuration
class AppConfig {
    @Bean
    fun objectMapper(): ObjectMapper = ObjectMapper()
        .registerModule(KotlinModule.Builder().build())
        .registerModule(JavaTimeModule())
}
```

**Constructor Injection (only way in project):**

```kotlin
// CORRECT — constructor. Spring supplies dependencies.
// In Kotlin, val in constructor = class fields.
@Service
class NutritionCalculatorService(
    private val foodProductRepository: FoodProductRepository,
    private val recipeRepository: RecipeRepository
) { /* ... */ }

// WRONG — field injection. Forbidden in project.
@Service
class NutritionCalculatorService {
    @Autowired  // DO NOT USE — dependencies not visible, test problems
    private lateinit var foodProductRepository: FoodProductRepository
}
```

**6.2. Configuration: application.yml and profiles (day 1-2)**

```yaml
# src/main/resources/application.yml
spring:
  application:
    name: life-goals-api
  datasource:
    url: ${DB_URL:jdbc:postgresql://localhost:5432/lifegoals}
    username: ${DB_USERNAME:postgres}
    password: ${DB_PASSWORD:secret}
  jpa:
    hibernate:
      ddl-auto: validate  # Flyway manages schema, Hibernate only validates
    open-in-view: false     # Close OSIV (Best practice)
  flyway:
    enabled: true
  data:
    redis:
      url: ${REDIS_URL:redis://localhost:6379}

server:
  port: 8080

# Custom properties
app:
  exchange-rate:
    api-url: ${EXCHANGE_RATE_API_URL:https://api.exchangeratesapi.io/v1/latest}
    api-key: ${EXCHANGE_RATE_API_KEY:}
  feature-flags:
    path: ${FEATURE_FLAGS_PATH:config/features.json}
```

```kotlin
// Type-safe configuration via @ConfigurationProperties
@ConfigurationProperties(prefix = "app.exchange-rate")
data class ExchangeRateProperties(
    val apiUrl: String,
    val apiKey: String
)

// Usage
@Service
class ExchangeRateService(
    private val properties: ExchangeRateProperties,
    private val restClient: RestClient
) {
    fun fetchRate(base: String, target: String): Double {
        val response = restClient.get()
            .uri("${properties.apiUrl}?base=$base&symbols=$target&access_key=${properties.apiKey}")
            .retrieve()
            .body(ExchangeRateResponse::class.java)
        return response?.rates?.get(target) ?: throw ExchangeRateException("Rate not found")
    }
}
```

**Profiles:**
```yaml
# application-dev.yml (for local development)
spring:
  jpa:
    show-sql: true
logging:
  level:
    com.mrurec.lifegoals: DEBUG

# application-prod.yml (for production)
spring:
  jpa:
    show-sql: false
logging:
  level:
    com.mrurec.lifegoals: INFO
```

```bash
# Run with profile
./gradlew bootRun --args='--spring.profiles.active=dev'
# or
SPRING_PROFILES_ACTIVE=prod java -jar app.jar
```

**6.3. REST Client and external APIs (day 2)**

```kotlin
// Spring Boot 4 offers declarative HTTP Service Clients + RestClient (replacement for RestTemplate)
@Configuration
class RestClientConfig {
    @Bean
    fun restClient(): RestClient = RestClient.builder()
        .baseUrl("https://api.exchangeratesapi.io")
        .defaultHeader("Accept", "application/json")
        .build()
}

// Usage
@Service
class ExchangeRateApiClient(
    private val restClient: RestClient,
    private val properties: ExchangeRateProperties
) {
    fun getLatestRate(base: String, target: String): ExchangeRateResponse {
        return restClient.get()
            .uri("/v1/latest?base={base}&symbols={target}&access_key={key}", 
                 base, target, properties.apiKey)
            .retrieve()
            .body(ExchangeRateResponse::class.java)
            ?: throw ExchangeRateException("Failed to fetch rate")
    }
}
```

**6.4. Error handling (day 3)**

In project, business errors are NOT thrown as exceptions (except auth). They're returned in GraphQL Payload:

```kotlin
// UserError — project standard for business errors
data class UserError(
    val field: String?,
    val message: String,
    val code: ErrorCode
)

enum class ErrorCode {
    NOT_FOUND, 
    VALIDATION_ERROR, 
    DUPLICATE, 
    PERMISSION_DENIED,
    RATE_LIMIT_EXCEEDED
}

// Mutation payload always contains errors
data class CreateRecipePayload(
    val recipe: Recipe?,
    val errors: List<UserError>
)

// In service:
fun createRecipe(input: CreateRecipeInput, viewer: ViewerContext): CreateRecipePayload {
    // Validation → UserError, NOT exception
    if (input.name.isBlank()) {
        return CreateRecipePayload(
            recipe = null,
            errors = listOf(UserError("name", "Recipe name cannot be empty", ErrorCode.VALIDATION_ERROR))
        )
    }
    
    val recipe = recipeRepository.save(input.toEntity(viewer.userId))
    return CreateRecipePayload(recipe = recipe, errors = emptyList())
}

// Exceptions — only for system errors and auth
@Component
class GraphQLExceptionHandler {
    fun handleException(ex: Exception): GraphQLError = when (ex) {
        is AuthenticationException -> GraphQLError.newError()
            .message("Authentication required")
            .errorType(ErrorType.UNAUTHENTICATED)
            .build()
        else -> {
            logger.error("Unexpected error", ex)
            GraphQLError.newError()
                .message("Internal server error")
                .errorType(ErrorType.INTERNAL)
                .build()
        }
    }
}
```

**6.5. Security: OAuth2 + JWT (day 3-4)**

```kotlin
@Configuration
@EnableWebSecurity
class SecurityConfig {
    @Bean
    fun securityFilterChain(http: HttpSecurity): SecurityFilterChain {
        return http
            .csrf { it.disable() }  // GraphQL uses POST — CSRF not needed
            .sessionManagement { it.sessionCreationPolicy(SessionCreationPolicy.STATELESS) }
            .oauth2ResourceServer { oauth2 ->
                oauth2.jwt { jwt ->
                    jwt.decoder(jwtDecoder())
                }
            }
            .authorizeHttpRequests { auth ->
                auth.requestMatchers("/graphql").authenticated()
                auth.requestMatchers("/graphiql").permitAll()  // Playground — dev only
                auth.anyRequest().denyAll()
            }
            .build()
    }
}

// ViewerContext — extracted from JWT in each request
data class ViewerContext(
    val userId: UUID,
    val email: String,
    val permissions: Set<String>
)

// Used in EVERY service method
@Service
class FoodProductService(
    private val repository: FoodProductRepository
) {
    fun getProducts(viewer: ViewerContext): List<FoodProduct> {
        // ALWAYS scope by viewer.userId
        return repository.findByUserId(viewer.userId)
    }
}
```

**6.6. Task scheduler (day 4)**

```kotlin
// Update exchange rates every hour
@Configuration
@EnableScheduling
class SchedulerConfig

@Component
class ExchangeRateScheduler(
    private val exchangeRateService: ExchangeRateService,
    private val widgetRepository: UserDashboardWidgetRepository
) {
    @Scheduled(fixedRate = 3600000) // Every hour (in ms)
    fun refreshActiveExchangeRates() {
        // Find all unique currency pairs from Budget widget configs
        val activePairs = widgetRepository
            .findByWidgetType("BUDGET")
            .map { it.config.baseCurrency to it.config.targetCurrency }
            .distinct()
        
        activePairs.forEach { (base, target) ->
            try {
                exchangeRateService.refreshRate(base, target)
            } catch (e: Exception) {
                logger.error("Failed to refresh rate $base/$target", e)
            }
        }
    }
}
```

**6.7. Modular Monolith with Spring Modulith (day 4.5)**

The project is a **widget-first modular monolith** (see `CLAUDE.md` → *Architecture*). Every top-level package (`interviewprep`, `fitness`, `budget`, `dashboard`, `notification`, `common`) is a module with explicit boundaries. Widgets may depend only on `common` — never on each other's `repository/` or `model/`. `Spring Modulith` is the tool that enforces this in CI, not by convention or code review.

**Why not just discipline?** Three reasons:
1. **Code review doesn't scale.** Even on a 1-person project, a tired Friday merge will cross a boundary. CI catches it 100% of the time.
2. **No documentation drift.** Modulith generates PlantUML diagrams from the code itself — the diagram can never diverge from reality.
3. **Events replace hidden coupling.** Without a formal event bus, cross-module features (e.g., `notification` reacting to `fitness.WorkoutLogged`) silently become direct calls. Modulith's transactional event publication registry makes async communication the default.

**Module declaration:**

```kotlin
// com/mrurec/lifegoals/fitness/package-info.kt
@org.springframework.modulith.ApplicationModule(
    displayName = "Fitness Widget",
    allowedDependencies = ["common"]
)
package com.mrurec.lifegoals.fitness
```

**One test enforces everything:**

```kotlin
class ModularityTests {
    private val modules = ApplicationModules.of(LifeGoalsApplication::class.java)

    @Test fun `verifies module boundaries`() = modules.verify()
    // Fails the build if: illegal cross-module imports, cycles,
    // or if a module exposes internals it hasn't declared public.

    @Test fun `writes documentation`() {
        Documenter(modules)
            .writeModulesAsPlantUml()              // ./build/spring-modulith-docs/
            .writeIndividualModulesAsPlantUml()
    }
}
```

**Cross-module events — no direct dependencies:**

```kotlin
// fitness module publishes — knows nothing about listeners
data class WorkoutLogged(val userId: UUID, val workoutId: UUID, val at: Instant)

@Service
class WorkoutService(private val events: ApplicationEventPublisher) {
    @Transactional
    fun logWorkout(/* ... */) {
        // ... persist workout ...
        events.publishEvent(WorkoutLogged(viewer.userId, workout.id, Instant.now()))
    }
}

// notification module reacts — zero compile-time dep on fitness internals
@Component
class WorkoutAchievementListener(
    private val notifications: NotificationService,
    private val achievements: AchievementChecker
) {
    @ApplicationModuleListener            // = @TransactionalEventListener + @Async + persistence
    fun on(event: WorkoutLogged) {
        val earned = achievements.check(event.userId)
        earned.forEach { notifications.publish(event.userId, it) }
    }
}
```

`@ApplicationModuleListener` is key: the event is persisted in the `event_publication` table inside the same transaction that wrote the workout. If the listener fails or the app crashes, Modulith retries on restart — this is the **transactional outbox pattern**, the same approach Meta/LinkedIn use for reliable cross-service writes, but without Kafka in the way.

**Per-module tests:**

```kotlin
@ApplicationModuleTest                    // loads only the `fitness` module context
class FitnessServiceTest {
    @Autowired lateinit var workoutService: WorkoutService

    @Test fun `logWorkout publishes WorkoutLogged event`(events: PublishedEvents) {
        workoutService.logWorkout(/* ... */)
        assertThat(events.ofType(WorkoutLogged::class.java)).hasSize(1)
    }
}
```

This runs 10× faster than `@SpringBootTest` and proves the module works in isolation — the contract it exposes and the events it publishes are all that matter for its callers.

**Trade-off vs ArchUnit.** ArchUnit is library-agnostic and maximally flexible — you write any rule you want in DSL. Modulith ships with the modular-monolith model built in: it knows what a module is, what a cycle is, and what public API means. For this project's rule set, Modulith covers everything and adds per-module tests, events, and auto-docs that ArchUnit does not. We keep ArchUnit in reserve for rare rules Modulith cannot express (e.g., banning `java.util.logging` globally). See `docs/adr/ADR-004-module-boundary-enforcement.md` for the full decision.

**FAANG-interview framing.** When asked «Why this architecture?» you have a structured answer:
- **Enforcement over convention** — senior-level judgment.
- **Transactional event publication** — same family as Meta's TAO write pipeline and LinkedIn's outbox pattern, scaled down to a single service.
- **Per-module tests** — analogous to service-level isolation in a microservice org.
- **Documentation as code** — no Confluence drift.
- **Clear extraction path** — each module's boundary already matches a future service contract; local listeners become Kafka consumers with zero API change.

### Practical assignments

**Assignment 6.1.** Create Spring Boot project (https://start.spring.io/) with Kotlin, Web, Data JPA, PostgreSQL, Redis. Configure `application.yml` with `dev` and `prod` profiles. Start server and verify it starts.

**Assignment 6.2.** Implement `FeatureFlagService`, reading JSON file with flags and checking `isEnabled(flag, userId)`. Use `@ConfigurationProperties` for file path. Write tests.

**Assignment 6.3.** Implement `ExchangeRateService` that: (1) checks Redis cache, (2) on cache miss calls external API via `RestClient`, (3) caches with TTL 1 hour. Handle errors (API unavailable, Redis unavailable).

**Assignment 6.4.** Set up Spring Security with JWT. Create `ViewerContextExtractor`, extracting `ViewerContext` from JWT token. Write integration test with mocked JWT.

**Assignment 6.5.** *Modulith TDD.* Annotate the six top-level packages with `@ApplicationModule`. Write `ModularityTests` calling `ApplicationModules.verify()` — make it green. Then deliberately add an import from `notification` to `com.mrurec.lifegoals.fitness.repository.WorkoutRepository` — the test must turn red. Fix it by introducing a `WorkoutLogged` event + `@ApplicationModuleListener` in `notification`. Commit the generated PlantUML diagram from `Documenter` into the repo. Bonus: add a `@ApplicationModuleTest` that verifies the event is published when `logWorkout` is called.

### Additional resources
- [Spring Boot Reference Documentation](https://docs.spring.io/spring-boot/docs/current/reference/html/) — official
- [Spring Boot with Kotlin](https://spring.io/guides/tutorials/spring-boot-kotlin/) — official guide
- [Baeldung — Spring Boot](https://www.baeldung.com/spring-boot) — practical articles
- [Spring Security Architecture](https://spring.io/guides/topicals/spring-security-architecture/) — how security works
- [Spring Modulith Reference](https://docs.spring.io/spring-modulith/reference/) — module boundaries, events, testing
- [`docs/adr/ADR-004-module-boundary-enforcement.md`](adr/ADR-004-module-boundary-enforcement.md) — Spring Modulith vs ArchUnit decision

---

## Module 7: Spring Data JPA + Hibernate
**Duration:** 3 days | **Prerequisites:** Module 4 (PostgreSQL), Module 6 (Spring Boot)

### Why it's in the project
Spring Data JPA is the ORM layer between Kotlin code and PostgreSQL. All entities (FoodProduct, Workout, Transaction) and repositories use JPA. Correct JPA usage is critical for performance (N+1 problem, lazy loading).

### Theory

**7.1. Entity — mapping tables to Kotlin classes (day 1)**

```kotlin
// Entity = class mapped to table in PostgreSQL
@Entity
@Table(name = "food_product")
class FoodProduct(
    @Id
    val id: UUID = UUID.randomUUID(),
    
    @Column(name = "user_id", nullable = false)
    val userId: UUID,
    
    @Column(nullable = false)
    var name: String,
    
    @Column(name = "calories_per_100g", nullable = false)
    var caloriesPer100g: Double,
    
    @Column(name = "protein_per_100g", nullable = false)
    var proteinPer100g: Double = 0.0,
    
    @Column(name = "carbs_per_100g", nullable = false)
    var carbsPer100g: Double = 0.0,
    
    @Column(name = "fat_per_100g", nullable = false)
    var fatPer100g: Double = 0.0,
    
    @Column(name = "fiber_per_100g")
    var fiberPer100g: Double? = null,
    
    @Column(name = "is_custom", nullable = false)
    val isCustom: Boolean = true,
    
    @Column(name = "created_at", nullable = false, updatable = false)
    val createdAt: Instant = Instant.now()
)

// Relationships between entities

// One-to-Many: Recipe → RecipeIngredient
@Entity
@Table(name = "recipe")
class Recipe(
    @Id val id: UUID = UUID.randomUUID(),
    @Column(name = "user_id", nullable = false) val userId: UUID,
    var name: String,
    var servings: Int = 1,
    
    @OneToMany(mappedBy = "recipe", cascade = [CascadeType.ALL], orphanRemoval = true)
    val ingredients: MutableList<RecipeIngredient> = mutableListOf(),
    
    @Column(name = "created_at") val createdAt: Instant = Instant.now()
)

// Many-to-One: RecipeIngredient → Recipe, RecipeIngredient → FoodProduct
@Entity
@Table(name = "recipe_ingredient")
class RecipeIngredient(
    @Id val id: UUID = UUID.randomUUID(),
    
    @ManyToOne(fetch = FetchType.LAZY)  // LAZY = load on demand
    @JoinColumn(name = "recipe_id")
    val recipe: Recipe,
    
    @Column(name = "food_product_id", nullable = false)
    val foodProductId: UUID,  // Only ID — for DataLoader!
    
    @Column(name = "weight_grams", nullable = false)
    var weightGrams: Double
)
```

**IMPORTANT about FetchType:**
- `FetchType.LAZY` (default for `@ManyToOne` in JPA 2+) — loads data only on access. **Preferred.**
- `FetchType.EAGER` — loads immediately. **Avoid** — causes N+1.
- In project: store only `foreignKeyId` (UUID) and use **DataLoader** for batch loading.

**7.2. Repository — data access (day 1-2)**

```kotlin
// Spring Data JPA generates implementation from method name!
interface FoodProductRepository : JpaRepository<FoodProduct, UUID> {
    
    // Spring generates SQL: SELECT * FROM food_product WHERE user_id = ?
    fun findByUserId(userId: UUID): List<FoodProduct>
    
    // More complex: SELECT * FROM food_product WHERE user_id = ? AND name ILIKE ?
    fun findByUserIdAndNameContainingIgnoreCase(userId: UUID, name: String): List<FoodProduct>
    
    // With pagination (for DataLoader batch queries)
    fun findByUserIdAndIdIn(userId: UUID, ids: Collection<UUID>): List<FoodProduct>
    
    // Cursor-based pagination via @Query
    @Query("""
        SELECT fp FROM FoodProduct fp
        WHERE fp.userId = :userId
        AND (fp.createdAt < :cursorDate OR (fp.createdAt = :cursorDate AND fp.id < :cursorId))
        ORDER BY fp.createdAt DESC, fp.id DESC
    """)
    fun findAfterCursor(
        @Param("userId") userId: UUID,
        @Param("cursorDate") cursorDate: Instant,
        @Param("cursorId") cursorId: UUID,
        pageable: Pageable
    ): List<FoodProduct>
    
    // First page (no cursor)
    @Query("""
        SELECT fp FROM FoodProduct fp
        WHERE fp.userId = :userId
        ORDER BY fp.createdAt DESC, fp.id DESC
    """)
    fun findFirstPage(
        @Param("userId") userId: UUID,
        pageable: Pageable
    ): List<FoodProduct>
    
    // Count
    fun countByUserId(userId: UUID): Long
    
    // Exists
    fun existsByUserIdAndName(userId: UUID, name: String): Boolean
    
    // Native SQL (when JPQL not enough)
    @Query(
        value = """
            SELECT DATE(logged_at) AS day, COUNT(*) AS count
            FROM coding_problem_attempt
            WHERE user_id = :userId AND logged_at >= :since
            GROUP BY DATE(logged_at)
        """,
        nativeQuery = true
    )
    fun getHeatMapData(
        @Param("userId") userId: UUID,
        @Param("since") since: Instant
    ): List<HeatMapProjection>
}

// Projection — for queries not returning entire Entity
interface HeatMapProjection {
    fun getDay(): LocalDate
    fun getCount(): Int
}
```

**7.3. Transactions (day 2)**

```kotlin
@Service
class MealLoggingService(
    private val mealRepository: MealRepository,
    private val mealEntryRepository: MealEntryRepository,
    private val nutritionCalculator: NutritionCalculatorService
) {
    // @Transactional — all operations inside = one transaction
    // If something throws exception → everything rolls back
    @Transactional
    fun logMeal(input: LogMealInput, viewer: ViewerContext): LogMealPayload {
        val meal = mealRepository.save(
            Meal(userId = viewer.userId, mealType = input.mealType, date = input.date)
        )
        
        val entries = input.entries.map { entryInput ->
            val nutrition = nutritionCalculator.calculate(entryInput)
            MealEntry(
                mealId = meal.id,
                foodProductId = entryInput.foodProductId,
                portionGrams = entryInput.portionGrams,
                calculatedCalories = nutrition.calories,
                calculatedProtein = nutrition.protein
            )
        }
        
        mealEntryRepository.saveAll(entries)
        
        return LogMealPayload(meal = meal, errors = emptyList())
    }
    
    // readOnly = true — optimization for read queries
    @Transactional(readOnly = true)
    fun getMealsForDate(userId: UUID, date: LocalDate): List<Meal> {
        return mealRepository.findByUserIdAndDate(userId, date)
    }
}
```

**7.4. JSONB in JPA (day 3)**

```kotlin
// Mapping JSONB field (widget config)
@Entity
@Table(name = "user_dashboard_widget")
class UserDashboardWidget(
    @Id val id: UUID = UUID.randomUUID(),
    @Column(name = "user_id") val userId: UUID,
    @Column(name = "widget_type") val widgetType: String,
    var position: Int,
    
    @Type(JsonType::class)  // Hibernate-types for JSONB
    @Column(columnDefinition = "jsonb")
    var config: Map<String, Any> = emptyMap(),
    
    @Column(name = "created_at") val createdAt: Instant = Instant.now()
)

// Or with typed config:
@Type(JsonType::class)
@Column(columnDefinition = "jsonb")
var config: JsonNode = objectMapper.createObjectNode()
```

### Practical assignments

**Assignment 7.1.** Create Entities and Repository for Fitness module: `Workout`, `ExerciseSet`, `BodyMeasurement`. Use `@OneToMany`/`@ManyToOne` for Workout → ExerciseSet. Write query methods for finding by userId and dates.

**Assignment 7.2.** Implement cursor-based pagination in `CodingProblemRepository`: method `findProblemsPage(userId, first, afterCursor)`, returning `Connection<CodingProblem>`. Don't forget `hasNextPage` (request `first + 1`).

**Assignment 7.3.** Write `@Transactional` service creating recipe with ingredients in one transaction. Verify that error in one ingredient rolls back everything.

**Assignment 7.4.** Implement `UserDashboardWidgetRepository` with queries to JSONB field `config`: find all widgets with specific `targetCompany`, extract `baseCurrency` from Budget widgets.

### Additional resources
- [Spring Data JPA Reference](https://docs.spring.io/spring-data/jpa/reference/html/) — official documentation
- [Baeldung — JPA](https://www.baeldung.com/learn-jpa-hibernate) — practical guides
- [Vlad Mihalcea Blog](https://vladmihalcea.com/) — best blog on JPA/Hibernate performance
- [Hibernate Types](https://github.com/vladmihalcea/hypersistence-utils) — JSONB and other types

---

## Module 8: GraphQL (General Theory)
**Duration:** 2 days | **Prerequisites:** understanding of HTTP APIs

### Why it's in the project
GraphQL is the only API protocol of the project (no REST). Frontend requests exactly the data it needs. Module builds foundation for DGS (backend) and Relay (frontend).

### Theory

**8.1. What is GraphQL and how it differs from REST (day 1)**

REST: multiple endpoints, each returns fixed structure:
```
GET /api/users/123             → { id, name, email, avatar, settings, ... }
GET /api/users/123/workouts    → [{ id, type, duration, ... }]
GET /api/users/123/meals       → [{ id, date, entries, ... }]
```
Problems: overfetching (get extra data), underfetching (need multiple requests), rigid contracts.

GraphQL: one endpoint, client describes what it wants:
```graphql
# One request — get exactly needed data
query {
  viewer {
    name
    dashboard {
      widgets {
        type
        data {
          ... on FitnessWidgetData {
            currentWeight
            workoutsThisWeek
          }
        }
      }
    }
  }
}
```

**8.2. Schema and types (day 1)**

```graphql
# Scalar types
# String, Int, Float, Boolean, ID
# Custom: DateTime, Date, JSON (declared in relay.graphqls)

# Object type
type FoodProduct {
  id: ID!                    # ! = mandatory (non-null)
  name: String!
  caloriesPer100g: Float!
  proteinPer100g: Float!
  carbsPer100g: Float!
  fatPer100g: Float!
  fiberPer100g: Float       # Without ! = nullable
  isCustom: Boolean!
  createdAt: DateTime!
}

# Enum
enum Difficulty {
  EASY
  MEDIUM
  HARD
}

enum ProblemCategory {
  ARRAY
  STRING
  LINKED_LIST
  TREE
  GRAPH
  DYNAMIC_PROGRAMMING
  BINARY_SEARCH
  BACKTRACKING
  SYSTEM_DESIGN
  OTHER
}

# Input type (for mutations)
input CreateFoodProductInput {
  name: String!
  caloriesPer100g: Float!
  proteinPer100g: Float = 0  # Default value
  carbsPer100g: Float = 0
  fatPer100g: Float = 0
  fiberPer100g: Float
}

# Interface — common contract
interface Node {
  id: ID!
}

# Union — type "one of" (used for WidgetData)
union WidgetData = InterviewPrepWidgetData | FitnessWidgetData | BudgetWidgetData
```

**8.3. Queries, Mutations, Subscriptions (day 1-2)**

```graphql
# Query — read data
type Query {
  # Node interface — get any object by global ID
  node(id: ID!): Node
  
  # Viewer pattern — all data through current user context
  viewer: User!
  
  # Dashboard
  myDashboard: MyDashboard!
}

# Mutation — change data
type Mutation {
  # Each mutation returns Payload (NEVER throws errors)
  createFoodProduct(input: CreateFoodProductInput!): CreateFoodProductPayload!
  logMeal(input: LogMealInput!): LogMealPayload!
  logWorkout(input: LogWorkoutInput!): LogWorkoutPayload!
  addWidgetToDashboard(input: AddWidgetInput!): AddWidgetPayload!
}

# Payload — mutation result
type CreateFoodProductPayload {
  product: FoodProduct        # null on error
  errors: [UserError!]!       # Empty on success
}

type UserError {
  field: String               # Field with error (for form highlight)
  message: String!            # Human-readable description
  code: ErrorCode!            # Machine-readable code
}

# Subscription — real-time updates via WebSocket
type Subscription {
  notificationReceived: Notification!
  dashboardWidgetUpdated(widgetId: ID!): WidgetData!
}
```

**8.4. Relay Connection Pattern (day 2)**

Standard pagination in project. No offset/limit!

```graphql
# Connection = list with cursor pagination
type CodingProblemConnection {
  edges: [CodingProblemEdge!]!   # Array of "wrappers" around elements
  pageInfo: PageInfo!             # Meta information about pages
  totalCount: Int!                # Total count (for UI)
}

type CodingProblemEdge {
  node: CodingProblem!            # The element itself
  cursor: String!                 # Unique cursor for this element
}

type PageInfo {
  hasNextPage: Boolean!
  hasPreviousPage: Boolean!
  startCursor: String
  endCursor: String
}

# Usage in Query
type Query {
  codingProblems(
    first: Int         # Number of elements
    after: String      # Cursor "after which"
    filter: CodingProblemFilter
  ): CodingProblemConnection!
}

# Request with pagination:
query {
  codingProblems(first: 20, after: "Y3Vyc29yXzIw") {
    edges {
      node {
        id
        name
        difficulty
        isSolved
      }
      cursor
    }
    pageInfo {
      hasNextPage
      endCursor          # Pass as "after" for next page
    }
    totalCount
  }
}
```

**8.5. Directives: @defer and fragments (day 2)**

```graphql
# @defer — defer loading of heavy part
query DashboardPageQuery {
  myDashboard {
    widgets {
      id
      type
      position
      ... @defer {
        data {
          __typename
          ... on FitnessWidgetData {
            currentWeight
            workoutsThisWeek
          }
        }
      }
    }
  }
}
# Server first sends id/type/position, then (later) data

# Fragments — reusable query pieces
fragment FoodProductFields on FoodProduct {
  id
  name
  caloriesPer100g
  proteinPer100g
  carbsPer100g
  fatPer100g
}

query {
  viewer {
    recentProducts(first: 5) {
      edges {
        node {
          ...FoodProductFields
        }
      }
    }
  }
}
```

### Practical assignments

**Assignment 8.1.** Draw GraphQL schema for one widget of your choice (Interview Prep, Fitness, or Budget). Include: types, input types, queries with Connection pagination, mutations with Payload pattern.

**Assignment 8.2.** Use any GraphQL playground (Apollo Sandbox, GraphiQL) with public API (e.g., GitHub GraphQL API). Write: query with nested fields, query with pagination (first/after), mutation.

**Assignment 8.3.** Explain in writing (your words): why in project offset pagination and throwing errors in mutations are **forbidden**. Give concrete examples of problems these patterns would cause.

### Additional resources
- [GraphQL Official Learn](https://graphql.org/learn/) — specification
- [How to GraphQL](https://www.howtographql.com/) — free course
- [Relay Connection Specification](https://relay.dev/graphql/connections.htm) — formal specification
- [Production Ready GraphQL](https://book.productionreadygraphql.com/) — book on best practices

---

## Module 9: Netflix DGS (GraphQL on Backend)
**Duration:** 3 days | **Prerequisites:** Module 6 (Spring Boot), Module 8 (GraphQL)

### Why it's in the project
Netflix DGS is the GraphQL framework used in the project for server-side implementation. All resolvers, DataLoaders and subscriptions are built on DGS. It's the same framework Netflix and Meta use.

### Theory

**9.1. Schema-first approach (day 1)**

DGS generates Java/Kotlin types from `.graphqls` files. Schema is the source of truth.

```graphql
# src/main/resources/schema/fitness.graphqls
type Workout implements Node {
  id: ID!
  date: Date!
  durationMinutes: Int!
  notes: String
  exercises: [ExerciseSet!]!
  createdAt: DateTime!
}

type ExerciseSet {
  id: ID!
  exerciseName: String!
  sets: Int!
  reps: Int!
  weightKg: Float
}
```

After `./gradlew generateJava` DGS creates Kotlin data classes in `build/generated/`.

**9.2. Resolvers (day 1)**

```kotlin
@DgsComponent
class FitnessQueryResolver(
    private val workoutService: WorkoutService,
    private val viewerContextProvider: ViewerContextProvider
) {
    // Query resolver
    @DgsQuery
    fun workouts(
        @InputArgument first: Int?,
        @InputArgument after: String?,
        @InputArgument filter: WorkoutFilter?
    ): WorkoutConnection {
        val viewer = viewerContextProvider.get()
        return workoutService.getWorkouts(viewer, first ?: 20, after, filter)
    }
}

@DgsComponent
class FitnessMutationResolver(
    private val workoutService: WorkoutService,
    private val viewerContextProvider: ViewerContextProvider
) {
    @DgsMutation
    fun logWorkout(@InputArgument input: LogWorkoutInput): LogWorkoutPayload {
        val viewer = viewerContextProvider.get()
        return workoutService.logWorkout(input, viewer)
    }
}

// Child resolver — for fields requiring separate loading
@DgsComponent
class WorkoutExercisesResolver(
    private val exerciseSetService: ExerciseSetService
) {
    @DgsData(parentType = "Workout", field = "exercises")
    fun exercises(dfe: DgsDataFetchingEnvironment): CompletableFuture<List<ExerciseSet>> {
        val workout = dfe.getSource<Workout>()
        val loader = dfe.getDataLoader<UUID, List<ExerciseSet>>("exerciseSetsByWorkoutLoader")
        return loader.load(workout.id)
    }
}
```

**9.3. DataLoaders — preventing N+1 (day 2)**

DataLoader is key pattern in project. Without it each workout would load exercises with separate query.

```kotlin
@DgsComponent
class DataLoaderRegistrar {
    
    @DgsDataLoader(name = "foodProductLoader")
    class FoodProductDataLoader(
        private val foodProductRepository: FoodProductRepository
    ) : MappedBatchLoader<UUID, FoodProduct> {
        
        override fun load(keys: Set<UUID>): CompletionStage<Map<UUID, FoodProduct>> {
            return CompletableFuture.supplyAsync {
                foodProductRepository.findAllById(keys.toList())
                    .associateBy { it.id }
            }
        }
    }
    
    @DgsDataLoader(name = "exerciseSetsByWorkoutLoader")
    class ExerciseSetsByWorkoutLoader(
        private val exerciseSetRepository: ExerciseSetRepository
    ) : MappedBatchLoader<UUID, List<ExerciseSet>> {
        
        override fun load(keys: Set<UUID>): CompletionStage<Map<UUID, List<ExerciseSet>>> {
            return CompletableFuture.supplyAsync {
                exerciseSetRepository.findByWorkoutIdIn(keys.toList())
                    .groupBy { it.workoutId }
            }
        }
    }
}

// HOW IT WORKS:
// 1. GraphQL query: workouts(first: 20) { exercises { ... } }
// 2. DGS calls workouts resolver → returns 20 Workout
// 3. For each Workout exercises resolver called
// 4. BUT: DataLoader accumulates all 20 workout.id
// 5. One SQL: SELECT * FROM exercise_set WHERE workout_id IN (id1, id2, ..., id20)
// 6. Instead of 20 queries — 1 batch query!
```

**9.4. Subscriptions via WebSocket (day 3)**

```kotlin
@DgsComponent
class NotificationSubscription(
    private val notificationPublisher: NotificationPublisher
) {
    @DgsSubscription
    fun notificationReceived(): Publisher<Notification> {
        val viewer = viewerContextProvider.get()
        return notificationPublisher.getPublisher(viewer.userId)
    }
}

// Publisher backed by Redis pub/sub
@Component
class NotificationPublisher(
    private val redisMessageListenerContainer: RedisMessageListenerContainer
) {
    fun getPublisher(userId: UUID): Flux<Notification> {
        return Flux.create { sink ->
            val channel = "lifegoals:notifications:$userId"
            val listener = MessageListener { message, _ ->
                val notification = objectMapper.readValue(message.body, Notification::class.java)
                sink.next(notification)
            }
            redisMessageListenerContainer.addMessageListener(listener, ChannelTopic(channel))
            sink.onDispose { redisMessageListenerContainer.removeMessageListener(listener) }
        }
    }
    
    fun publish(userId: UUID, notification: Notification) {
        redisTemplate.convertAndSend("lifegoals:notifications:$userId", 
            objectMapper.writeValueAsString(notification))
    }
}
```

### Practical assignments

**Assignment 9.1.** Create `.graphqls` schema and DGS resolvers for FoodProduct: query `foodProducts(first, after, search)` with Connection pagination and mutation `createFoodProduct(input)` with Payload pattern.

**Assignment 9.2.** Implement DataLoader for RecipeIngredient → FoodProduct. Write test verifying that for 10 ingredients only 1 SQL query executes (log SQL).

**Assignment 9.3.** Set up DGS Subscription for `dashboardWidgetUpdated`. On mutation `logWorkout` publish updated Fitness widget data via Redis pub/sub.

### Additional resources
- [Netflix DGS Documentation](https://netflix.github.io/dgs/) — official
- [DGS Examples](https://github.com/Netflix/dgs-examples-kotlin) — Kotlin examples from Netflix
- [GraphQL DataLoader Pattern](https://github.com/graphql/dataloader) — specification
- [DGS Framework GitHub](https://github.com/Netflix/dgs-framework) — source code

---

## Module 10: React 19
**Duration:** 4 days | **Prerequisites:** Module 2 (TypeScript), HTML/CSS

### Why it's in the project
React 19.2 is the project's UI framework. All widgets, forms, pages are React components. Suspense and Error Boundaries are mandatory for data loading via Relay.

**What's new in React 19 / 19.2** (and what we should use in the project):
- **Server Components** (stable) — components that render on the server without shipping JS to the browser. Good for heavy read-only dashboard sections (static history, readiness score).
- **Actions** — functions that automatically manage pending/error/optimistic state via `useActionState` and `useFormStatus`. Replace manual `useState(false)` for `isSubmitting` in every widget form (add transaction, log meal, update config).
- **`use()` hook** — read promises and contexts directly during render; pairs well with `Suspense`.
- **`useOptimistic`** — built-in optimistic UI; Relay already does this for GraphQL, but `useOptimistic` is useful for local state (reordering widgets on the dashboard).
- **Activity API** (19.2, stable) — `<Activity mode="hidden">` unmounts effects but keeps DOM; ideal for hidden widget config tabs.
- **Batched Suspense reveal** (19.2) — server-rendered Suspense boundaries are revealed in a batch during a short window, reducing layout shift.
- **Ref as prop** — no more `forwardRef` for function components.
- **Document metadata** — `<title>`, `<meta>`, `<link>` directly in JSX, no `react-helmet`.

### Theory

**10.1. Components and JSX (day 1)**

```tsx
// Functional component (only style in project)
interface WidgetCardProps {
  title: string;
  type: WidgetType;
  children: React.ReactNode;
}

const WidgetCard: React.FC<WidgetCardProps> = ({ title, type, children }) => {
  return (
    <div className={styles.card}>
      <header className={styles.header}>
        <h3>{title}</h3>
        <WidgetTypeIcon type={type} />
      </header>
      <div className={styles.body}>
        {children}
      </div>
    </div>
  );
};

export default WidgetCard;
```

**10.2. Hooks (day 1-2)**

```tsx
// useState — local state
const [meals, setMeals] = useState<Meal[]>([]);
const [isLoading, setIsLoading] = useState(false);

// useEffect — side effects
useEffect(() => {
  // Runs on mount
  return () => {
    // Cleanup on unmount
  };
}, []); // [] = only on mount

useEffect(() => {
  // Runs on selectedDate change
}, [selectedDate]);

// useCallback — memoize function
const handleSelect = useCallback((productId: string) => {
  setSelectedProduct(productId);
}, []); // Stable reference

// useMemo — memoize value
const totalCalories = useMemo(() => {
  return meals.reduce((sum, meal) => sum + meal.calories, 0);
}, [meals]); // Recalculate only on meals change

// useRef — mutable reference (no re-render)
const inputRef = useRef<HTMLInputElement>(null);
const timerRef = useRef<NodeJS.Timeout | null>(null);

// Custom hooks (reusable logic)
function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState(value);
  
  useEffect(() => {
    const timer = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);
  
  return debouncedValue;
}
```

**10.3. Suspense and Error Boundaries (day 3)**

Mandatory pattern in project for each async component:

```tsx
// Error Boundary (class component — only class exception)
class WidgetErrorBoundary extends React.Component<
  { children: React.ReactNode; fallback?: React.ReactNode },
  { hasError: boolean; error: Error | null }
> {
  state = { hasError: false, error: null };
  
  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }
  
  render() {
    if (this.state.hasError) {
      return this.props.fallback || <WidgetErrorFallback error={this.state.error} />;
    }
    return this.props.children;
  }
}

// Suspense — shows fallback while data loads
// Mandatory wrapper: ErrorBoundary > Suspense > Component
const DashboardPage: React.FC = () => {
  return (
    <div className={styles.dashboard}>
      {widgets.map(widget => (
        <WidgetErrorBoundary key={widget.id}>
          <Suspense fallback={<WidgetSkeleton />}>
            <WidgetContainer widget={widget} />
          </Suspense>
        </WidgetErrorBoundary>
      ))}
    </div>
  );
};
```

**10.4. Composition patterns (day 3-4)**

```tsx
// Compound Components — for related components
const NutritionSummary: React.FC<{ date: Date }> & {
  MacroBar: typeof MacroBar;
  CalorieRing: typeof CalorieRing;
} = ({ date }) => { /* ... */ };

NutritionSummary.MacroBar = MacroBar;
NutritionSummary.CalorieRing = CalorieRing;

// Render Props (rare, but useful)
interface ConnectionRendererProps<T> {
  connection: Connection<T>;
  renderItem: (item: T) => React.ReactNode;
  renderEmpty: () => React.ReactNode;
}

// Controlled vs Uncontrolled
// Controlled: value in state
const [search, setSearch] = useState('');
<input value={search} onChange={e => setSearch(e.target.value)} />

// Uncontrolled: value in DOM
const searchRef = useRef<HTMLInputElement>(null);
<input ref={searchRef} defaultValue="" />
```

### Practical assignments

**Assignment 10.1.** Create component `FoodProductCard` with props: product, onSelect, showNutrition. Use CSS Modules for styles. Add conditional rendering (show/hide nutrition info).

**Assignment 10.2.** Implement custom hook `usePagination(fetchMore, pageInfo)`, managing pagination state and returning `{ loadMore, hasMore, isLoading }`.

**Assignment 10.3.** Create `DashboardGrid` with ErrorBoundary + Suspense wrapper for each widget. Simulate async loading with `React.lazy` and verify fallback.

**Assignment 10.4.** Implement form `AddMealEntryForm` with controlled components: product search (debounced), portion selection, real-time calorie calculation.

### Additional resources
- [React Official Docs](https://react.dev/) — new documentation (2023+)
- [React TypeScript Cheatsheet](https://react-typescript-cheatsheet.netlify.app/) — TS + React patterns
- [Patterns.dev — React Patterns](https://www.patterns.dev/react) — design patterns
- [Epic React (Kent C. Dodds)](https://epicreact.dev/) — advanced course

---

## Module 11: CSS Modules + Vite
**Duration:** 1.5 days | **Prerequisites:** Module 10 (React), basic CSS

### Why it's in the project
CSS Modules provide style isolation — classes automatically get unique names, preventing conflicts. Vite 8 is a bundler with instant reload (HMR).

**What's new in Vite 8** (and what we get in the project):
- **Rolldown bundler** in Rust replaces Rollup/esbuild — **10-30× faster** production builds, one unified runtime for both dev server and build (previously Vite used esbuild in dev and Rollup in build — two different runtimes).
- Plugin API is fully Rollup-compatible; migration requires no changes.
- Improved SSR API and built-in support for React 19 Server Components.
- HMR is now more precise — module-graph invalidation without cascading reloads.

### Theory

**11.1. CSS Modules (day 1)**

```css
/* FoodProductCard.module.css — colocated with component */
.card {
  border: 1px solid var(--border-color);
  border-radius: 8px;
  padding: 16px;
  transition: box-shadow 0.2s;
}

.card:hover {
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.name {
  font-size: 16px;
  font-weight: 600;
  margin-bottom: 4px;
}

.nutrition {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 8px;
  margin-top: 12px;
}

.macroValue {
  text-align: center;
  font-size: 14px;
}

/* Composition via composes */
.highlightedCard {
  composes: card;
  border-color: var(--accent-color);
}
```

```tsx
// Import as object — TypeScript knows keys
import styles from './FoodProductCard.module.css';

const FoodProductCard: React.FC<Props> = ({ product }) => (
  <div className={styles.card}>
    <span className={styles.name}>{product.name}</span>
    <div className={styles.nutrition}>
      <div className={styles.macroValue}>{product.caloriesPer100g} kcal</div>
    </div>
  </div>
);

// Multiple classes
<div className={`${styles.card} ${isSelected ? styles.selected : ''}`}>

// CSS variables for theming
// :root in global CSS
// --bg-primary, --text-primary, --accent-color, etc.
```

**11.2. Vite (day 1)**

```typescript
// vite.config.ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import relay from 'vite-plugin-relay';

export default defineConfig({
  plugins: [react(), relay],
  server: {
    port: 5173,
    proxy: {
      '/graphql': 'http://localhost:8080',     // API proxy
      '/subscriptions': {
        target: 'ws://localhost:8080',
        ws: true
      }
    }
  },
  css: {
    modules: {
      localsConvention: 'camelCase'  // .my-class → styles.myClass
    }
  }
});
```

### Practical assignments

**Assignment 11.1.** Create Vite + React + TypeScript project. Configure CSS Modules with camelCase. Create component `WidgetCard` with styles. Verify classes are unique in DOM.

**Assignment 11.2.** Implement theme (light/dark) via CSS variables `:root` and `[data-theme="dark"]`. Component `ThemeToggle` toggles attribute on `<html>`.

### Additional resources
- [CSS Modules GitHub](https://github.com/css-modules/css-modules) — specification
- [Vite Documentation](https://vite.dev/) — official docs
- [CSS-Tricks: CSS Modules](https://css-tricks.com/css-modules-part-1-need/) — introductory article

---

## Module 12: Relay
**Duration:** 4 days | **Prerequisites:** Module 8 (GraphQL), Module 10 (React)

### Why it's in the project
Relay is the GraphQL client from Meta, used in Facebook, Instagram and in our project. Provides Fragment Colocation (fragments next to components), automatic cache normalization and type-safe data fetching.

### Theory

**12.1. Fragment Colocation — main principle (day 1)**

```tsx
// PROJECT RULE: Each component declares its fragment IN THE SAME FILE
// Naming: ComponentName_fieldName

// FoodProductCard.tsx
import { graphql, useFragment } from 'react-relay';
import type { FoodProductCard_product$key } from './__generated__/FoodProductCard_product.graphql';

const fragment = graphql`
  fragment FoodProductCard_product on FoodProduct {
    id
    name
    caloriesPer100g
    proteinPer100g
    carbsPer100g
    fatPer100g
  }
`;

interface Props {
  product: FoodProductCard_product$key;  // Type from Relay compiler
}

const FoodProductCard: React.FC<Props> = ({ product }) => {
  const data = useFragment(fragment, product);
  // data typed: { id: string, name: string, caloriesPer100g: number, ... }
  
  return (
    <div className={styles.card}>
      <h3>{data.name}</h3>
      <span>{data.caloriesPer100g} kcal/100g</span>
    </div>
  );
};
```

**12.2. Queries and useLazyLoadQuery (day 1-2)**

```tsx
// DashboardPage.tsx — page loading data
import { graphql, useLazyLoadQuery } from 'react-relay';
import type { DashboardPageQuery } from './__generated__/DashboardPageQuery.graphql';

const query = graphql`
  query DashboardPageQuery {
    myDashboard {
      widgets {
        id
        type
        position
        ...WidgetContainer_widget    # Spread child fragment
      }
    }
  }
`;

const DashboardPage: React.FC = () => {
  const data = useLazyLoadQuery<DashboardPageQuery>(query, {});
  
  return (
    <div className={styles.grid}>
      {data.myDashboard.widgets.map(widget => (
        <ErrorBoundary key={widget.id}>
          <Suspense fallback={<WidgetSkeleton />}>
            <WidgetContainer widget={widget} />
          </Suspense>
        </ErrorBoundary>
      ))}
    </div>
  );
};
```

**12.3. Pagination with usePaginationFragment (day 2)**

```tsx
// CodingProblemList.tsx
const fragment = graphql`
  fragment CodingProblemList_viewer on User
  @refetchable(queryName: "CodingProblemListPaginationQuery")
  @argumentDefinitions(
    first: { type: "Int", defaultValue: 20 }
    after: { type: "String" }
  ) {
    codingProblems(first: $first, after: $after)
    @connection(key: "CodingProblemList_codingProblems") {
      edges {
        node {
          id
          ...CodingProblemRow_problem
        }
      }
      pageInfo {
        hasNextPage
      }
      totalCount
    }
  }
`;

const CodingProblemList: React.FC<Props> = ({ viewer }) => {
  const { data, loadNext, hasNext, isLoadingNext } = usePaginationFragment(
    fragment,
    viewer
  );
  
  return (
    <div>
      {data.codingProblems.edges.map(edge => (
        <CodingProblemRow key={edge.node.id} problem={edge.node} />
      ))}
      {hasNext && (
        <button onClick={() => loadNext(20)} disabled={isLoadingNext}>
          {isLoadingNext ? 'Loading...' : 'Load More'}
        </button>
      )}
    </div>
  );
};
```

**12.4. Mutations (day 3)**

```tsx
const mutation = graphql`
  mutation LogWorkoutMutation($input: LogWorkoutInput!) {
    logWorkout(input: $input) {
      workout {
        id
        date
        durationMinutes
        exercises {
          exerciseName
          sets
          reps
          weightKg
        }
      }
      errors {
        field
        message
        code
      }
    }
  }
`;

const LogWorkoutForm: React.FC = () => {
  const [commit, isInFlight] = useMutation<LogWorkoutMutation>(mutation);
  
  const handleSubmit = (input: LogWorkoutInput) => {
    commit({
      variables: { input },
      onCompleted: (response) => {
        if (response.logWorkout.errors.length > 0) {
          // Show errors to user
          setErrors(response.logWorkout.errors);
        } else {
          // Success — Relay automatically updates cache
          navigate('/dashboard');
        }
      },
      onError: (error) => {
        // Network error
        console.error(error);
      }
    });
  };
  
  return <form onSubmit={handleSubmit}>...</form>;
};
```

**12.5. Relay Environment and compiler (day 4)**

```tsx
// RelayEnvironment.ts
import { Environment, Network, RecordSource, Store } from 'relay-runtime';

function fetchFn(operation: any, variables: any) {
  return fetch('/graphql', {
    method: 'POST',
    headers: { 
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${getToken()}`
    },
    body: JSON.stringify({ query: operation.text, variables }),
  }).then(res => res.json());
}

const environment = new Environment({
  network: Network.create(fetchFn),
  store: new Store(new RecordSource()),
});
```

```bash
# Relay compiler — run after changing .graphqls or components
npm run relay
# Generates __generated__/ files with types
```

### Practical assignments

**Assignment 12.1.** Create `RecipeCard` with fragment `RecipeCard_recipe`. Include nested fragment `RecipeIngredientRow_ingredient`. Set up Relay compiler and verify types are generated.

**Assignment 12.2.** Implement paginated list `FoodProductList` with `usePaginationFragment`. Add "Load More" button and totalCount display.

**Assignment 12.3.** Implement mutation `CreateFoodProduct` with form, error handling from Payload and optimistic update (add to list before server response).

**Assignment 12.4.** Set up `RelayEnvironment.ts` with WebSocket subscriptions support for real-time notification delivery.

### Additional resources
- [Relay Documentation](https://relay.dev/) — official
- [Relay Tutorial](https://relay.dev/docs/tutorial/intro/) — step-by-step guide
- [Thinking in Relay](https://relay.dev/docs/principles-and-architecture/thinking-in-relay/) — philosophy
- [Relay Examples](https://github.com/relayjs/relay-examples) — examples from Meta

---

## Module 13: Jotai
**Duration:** 1.5 days | **Prerequisites:** Module 10 (React)

### Why it's in the project
Jotai is atom-based state management, the conceptual successor to Recoil. Replaces Redux/Context for global state (theme, user, notifications). Atoms are granular — components subscribe only to needed data.

**Why Jotai instead of Recoil:** Recoil has been archived upstream (Facebook stopped maintaining it) and doesn't support React 18/19 concurrent rendering. Jotai implements the same atom/selector model, but:
- An atom is defined with a single `atom(defaultValue)` call — no required `key`, identity is by reference.
- Full compatibility with concurrent rendering and React 19 Server Components.
- Less boilerplate: `useAtom(a)`, `useAtomValue(a)`, `useSetAtom(a)` instead of Recoil's five hooks.
- Derived atoms replace selectors — one unified concept.

### Theory

**13.1. Atoms (day 1)**

```tsx
// jotai/atoms/userAtom.ts
import { atom } from 'jotai';

interface UserState {
  id: string;
  email: string;
  name: string;
}

// Primitive atom — no key, identity by atom reference
export const userAtom = atom<UserState | null>(null);

export const themeAtom = atom<'light' | 'dark'>('light');

export const notificationCountAtom = atom<number>(0);

// Usage in component
import { useAtom, useAtomValue, useSetAtom } from 'jotai';

const UserProfile: React.FC = () => {
  const [user, setUser] = useAtom(userAtom);              // read + write
  const theme = useAtomValue(themeAtom);                  // read only (no re-render on writes)
  const setNotifications = useSetAtom(notificationCountAtom); // write only (no read subscription)

  return <div>{user?.name}</div>;
};
```

**13.2. Derived atoms — derived data (day 1)**

Jotai has no separate "selector" concept — any `atom` that takes a `(get) => value` function is a derived atom.

```tsx
// jotai/derived/auth.ts
import { atom } from 'jotai';
import { userAtom, notificationCountAtom } from '../atoms/userAtom';

// Read-only derived atom (equivalent to Recoil selector)
export const isLoggedInAtom = atom((get) => get(userAtom) !== null);

export const hasUnreadNotificationsAtom = atom(
  (get) => get(notificationCountAtom) > 0
);

// Writable derived atom — get + set (equivalent to Recoil selector with set)
export const userDisplayNameAtom = atom(
  (get) => get(userAtom)?.name ?? 'Guest',
  (get, set, newName: string) => {
    const u = get(userAtom);
    if (u) set(userAtom, { ...u, name: newName });
  }
);
```

**13.3. atomFamily — parameterized atoms (day 1)**

```tsx
import { atomFamily } from 'jotai/utils';

// Equivalent to Recoil atomFamily
export const widgetExpandedAtom = atomFamily((widgetId: string) =>
  atom(true)
);

// Usage: each widgetId has own atom (cached by parameter)
const [expanded, setExpanded] = useAtom(widgetExpandedAtom(widget.id));
```

**13.4. Async atoms + Suspense (day 2)**

For most server data we use Relay, but for non-GraphQL sources (e.g., local preferences, feature flags from a local endpoint) Jotai's async atoms integrate seamlessly with `<Suspense>`:

```tsx
export const featureFlagsAtom = atom(async () => {
  const res = await fetch('/api/flags');
  return res.json() as Promise<Record<string, boolean>>;
});

// Component automatically triggers Suspense fallback
const FlagView = () => {
  const flags = useAtomValue(featureFlagsAtom); // Promise resolves to data
  return <pre>{JSON.stringify(flags, null, 2)}</pre>;
};
```

**13.5. atomWithStorage — persistence (day 2)**

Useful for theme and sidebar-collapsed state (as an alternative to raw localStorage, but via Jotai):

```tsx
import { atomWithStorage } from 'jotai/utils';
export const themeAtom = atomWithStorage<'light' | 'dark'>('theme', 'light');
```

> Raw `localStorage` is forbidden in the Life Goals frontend (see CLAUDE.md §9 Common Pitfalls), but `atomWithStorage` is acceptable for UI preferences that don't touch domain data.

### Migration from Recoil (cheatsheet)

| Recoil | Jotai |
|---|---|
| `atom({ key, default })` | `atom(default)` |
| `useRecoilState(a)` | `useAtom(a)` |
| `useRecoilValue(a)` | `useAtomValue(a)` |
| `useSetRecoilState(a)` | `useSetAtom(a)` |
| `selector({ key, get })` | `atom((get) => …)` |
| `selector({ key, get, set })` | `atom((get) => …, (get, set, v) => …)` |
| `atomFamily({ key, default })` | `atomFamily((param) => atom(default))` |
| `<RecoilRoot>` | `<Provider>` (optional — Jotai works without it) |

### Practical assignments

**Assignment 13.1.** Create atoms for: user, theme, sidebarCollapsed, activeWidgetId. Create derived atom `dashboardLayoutAtom` that computes layout based on theme and sidebar.

**Assignment 13.2.** Implement `ThemeProvider` + `ThemeToggle` with Jotai + `atomWithStorage`. On theme change update CSS variables on `document.documentElement`.

**Assignment 13.3.** Implement `widgetExpandedAtom` with `atomFamily`. Verify that changing one widget doesn't trigger re-renders of the others (use React DevTools Profiler).

### Additional resources
- [Jotai Documentation](https://jotai.org/) — official
- [Jotai Primitives](https://jotai.org/docs/core/atom) — atom, derived, writable
- [Jotai Utils](https://jotai.org/docs/utilities/storage) — atomFamily, atomWithStorage, splitAtom
- [Jotai vs Recoil Comparison](https://jotai.org/docs/basics/comparison) — official comparison

---

## Module 14: Docker + Docker Compose
**Duration:** 2 days | **Prerequisites:** basic CLI understanding

### Why it's in the project
Docker is used for local development (PostgreSQL + Redis) and production backend deployment. Docker Compose brings up entire environment with one command.

### Theory

**14.1. Docker — basics (day 1)**

```dockerfile
# Dockerfile (backend)
# Multi-stage build — minimal production image

# Stage 1: Build
FROM gradle:9.4-jdk25 AS builder
WORKDIR /app
COPY build.gradle.kts settings.gradle.kts ./
COPY src ./src
RUN gradle build -x test --no-daemon

# Stage 2: Run
FROM eclipse-temurin:25-jre-alpine
WORKDIR /app
COPY --from=builder /app/build/libs/*.jar app.jar
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "app.jar"]
```

Key commands:
```bash
docker build -t life-goals-api .       # Build image
docker run -p 8080:8080 life-goals-api # Run container
docker ps                               # List running containers
docker logs <container-id>              # View logs
docker exec -it <id> /bin/sh            # Enter container
docker images                           # List images
docker stop <id>                        # Stop container
```

**14.2. Docker Compose (day 1-2)**

```yaml
# docker-compose.yml
version: '3.8'

services:
  postgres:
    image: postgres:18-alpine
    environment:
      POSTGRES_DB: lifegoals
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: secret
    ports:
      - "5432:5432"
    volumes:
      - postgres_data:/var/lib/postgresql/data
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U postgres"]
      interval: 5s
      timeout: 5s
      retries: 5

  redis:
    image: redis:8.6-alpine
    ports:
      - "6379:6379"
    healthcheck:
      test: ["CMD", "redis-cli", "ping"]
      interval: 5s

  api:
    build: .
    ports:
      - "8080:8080"
    environment:
      DB_URL: jdbc:postgresql://postgres:5432/lifegoals
      DB_USERNAME: postgres
      DB_PASSWORD: secret
      REDIS_URL: redis://redis:6379
      SPRING_PROFILES_ACTIVE: dev
    depends_on:
      postgres:
        condition: service_healthy
      redis:
        condition: service_healthy

volumes:
  postgres_data:
```

```bash
docker-compose up -d           # Start all in background
docker-compose down            # Stop all
docker-compose logs -f api     # Follow api logs
docker-compose ps              # Status of services
docker-compose up -d --build   # Rebuild and start
```

**14.3. Volumes and Networks (day 2)**

```yaml
# Volumes — preserve data between restarts
volumes:
  postgres_data:    # Named volume — PostgreSQL data persists after docker-compose down

# Networks — services communicate by name
# Docker Compose creates network automatically
# api reaches postgres by name "postgres", not "localhost"
```

### Practical assignments

**Assignment 14.1.** Write Dockerfile for backend (multi-stage build). Build image, run, verify `/graphiql` is accessible.

**Assignment 14.2.** Create `docker-compose.yml` with PostgreSQL, Redis and backend service. Add healthchecks. Verify everything works after `docker-compose up -d`.

**Assignment 14.3.** Add `.dockerignore` (exclude `build/`, `node_modules/`, `.gradle/`). Compare image size before and after.

### Additional resources
- [Docker Official Docs](https://docs.docker.com/) — guide
- [Docker Compose Docs](https://docs.docker.com/compose/) — compose specifics
- [Docker for Java Developers](https://www.docker.com/blog/9-tips-for-containerizing-your-spring-boot-code/) — Spring Boot optimization

---

## Module 15: GitHub Actions (CI/CD)
**Duration:** 1.5 days | **Prerequisites:** Module 1 (Git), Module 14 (Docker)

### Why it's in the project
GitHub Actions runs tests, linters and deploy automatically on push and PR. Without green CI, PR cannot be merged.

### Theory

**15.1. Workflow files (day 1)**

```yaml
# .github/workflows/ci.yml
name: CI

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  backend-test:
    runs-on: ubuntu-latest
    services:
      postgres:
        image: postgres:18-alpine
        env:
          POSTGRES_DB: lifegoals_test
          POSTGRES_PASSWORD: test
        ports: ["5432:5432"]
        options: >-
          --health-cmd pg_isready
          --health-interval 10s
          --health-timeout 5s
          --health-retries 5
      redis:
        image: redis:8.6-alpine
        ports: ["6379:6379"]
    
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-java@v4
        with:
          distribution: 'temurin'
          java-version: '17'
          cache: 'gradle'
      
      - name: Run Kotlin lint
        run: ./gradlew ktlintCheck
      
      - name: Run tests
        run: ./gradlew test
        env:
          DB_URL: jdbc:postgresql://localhost:5432/lifegoals_test
          DB_PASSWORD: test
          REDIS_URL: redis://localhost:6379

  frontend-test:
    runs-on: ubuntu-latest
    defaults:
      run:
        working-directory: life-goals-web
    
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'
          cache-dependency-path: life-goals-web/package-lock.json
      
      - run: npm ci
      - run: npm run relay
      - run: npm run typecheck
      - run: npm run lint
      - run: npm test
```

**15.2. Deploy workflow (day 1)**

```yaml
# .github/workflows/deploy.yml
name: Deploy

on:
  push:
    branches: [main]

jobs:
  deploy-backend:
    runs-on: ubuntu-latest
    needs: [ci]  # Depends on CI
    steps:
      - uses: actions/checkout@v4
      - name: Deploy to Railway
        uses: bervProject/railway-deploy@main
        with:
          railway_token: ${{ secrets.RAILWAY_TOKEN }}
          service: life-goals-api

  deploy-frontend:
    runs-on: ubuntu-latest
    needs: [ci]
    steps:
      - uses: actions/checkout@v4
      - uses: amondnet/vercel-action@v25
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.VERCEL_ORG_ID }}
          vercel-project-id: ${{ secrets.VERCEL_PROJECT_ID }}
          working-directory: life-goals-web
```

### Practical assignments

**Assignment 15.1.** Create workflow `ci.yml` that on PR runs backend tests with PostgreSQL and Redis services, and frontend tests with Relay compiler.

**Assignment 15.2.** Add caching (Gradle, npm). Measure build time before and after.

### Additional resources
- [GitHub Actions Documentation](https://docs.github.com/en/actions) — official
- [GitHub Actions Marketplace](https://github.com/marketplace?type=actions) — ready actions
- [Starter Workflows](https://github.com/actions/starter-workflows) — templates

---

## Module 16: Testing (Full Stack)
**Duration:** 4 days | **Prerequisites:** all previous modules

### Why it's in the project
Testing is mandatory part of every PR. Coverage: >80% for services, all queries/mutations, all user interactions. Without green tests PR cannot be merged.

### Theory

**16.1. Backend: JUnit 5 + MockK (day 1)**

```kotlin
// Unit test of service
class NutritionCalculatorServiceTest {
    
    private val foodProductRepository = mockk<FoodProductRepository>()
    private val service = NutritionCalculatorService(foodProductRepository)
    
    @Test
    fun `calculate nutrition for product with specific portion`() {
        // Given
        val chicken = FoodProduct(
            id = UUID.randomUUID(),
            userId = UUID.randomUUID(),
            name = "Chicken Breast",
            caloriesPer100g = 165.0,
            proteinPer100g = 31.0,
            carbsPer100g = 0.0,
            fatPer100g = 3.6
        )
        
        // When
        val result = service.calculate(chicken, portionGrams = 200.0)
        
        // Then
        assertThat(result.calories).isEqualTo(330.0)
        assertThat(result.protein).isEqualTo(62.0)
        assertThat(result.fat).isCloseTo(7.2, within(0.01))
    }
    
    @Test
    fun `logMeal with valid product should calculate correct nutrition`() {
        // Given
        val userId = UUID.randomUUID()
        every { foodProductRepository.findById(any()) } returns Optional.of(chickenProduct)
        
        // When
        val result = service.logMealEntry(userId, productId, portionGrams = 150.0)
        
        // Then
        verify(exactly = 1) { foodProductRepository.findById(productId) }
        assertThat(result.calculatedCalories).isEqualTo(247.5)
    }
}
```

**16.2. Integration Tests: Testcontainers (day 2)**

```kotlin
@SpringBootTest
@Testcontainers
class FoodProductRepositoryIntegrationTest {
    
    companion object {
        @Container
        val postgres = PostgreSQLContainer("postgres:18-alpine")
            .withDatabaseName("lifegoals_test")
        
        @Container
        val redis = GenericContainer("redis:8.6-alpine")
            .withExposedPorts(6379)
        
        @DynamicPropertySource
        @JvmStatic
        fun configureProperties(registry: DynamicPropertyRegistry) {
            registry.add("spring.datasource.url") { postgres.jdbcUrl }
            registry.add("spring.datasource.username") { postgres.username }
            registry.add("spring.datasource.password") { postgres.password }
            registry.add("spring.data.redis.url") { "redis://${redis.host}:${redis.firstMappedPort}" }
        }
    }
    
    @Autowired
    lateinit var repository: FoodProductRepository
    
    @Test
    fun `findByUserId returns only user's products`() {
        // Given
        val userId = UUID.randomUUID()
        val otherUserId = UUID.randomUUID()
        repository.save(FoodProduct(userId = userId, name = "My Product", caloriesPer100g = 100.0))
        repository.save(FoodProduct(userId = otherUserId, name = "Other Product", caloriesPer100g = 200.0))
        
        // When
        val results = repository.findByUserId(userId)
        
        // Then
        assertThat(results).hasSize(1)
        assertThat(results[0].name).isEqualTo("My Product")
    }
}
```

**16.3. DGS GraphQL tests (day 2)**

```kotlin
@DgsAutoConfiguration
@SpringBootTest
class FitnessQueryResolverTest {
    
    @Autowired
    lateinit var dgsQueryExecutor: DgsQueryExecutor
    
    @MockkBean
    lateinit var workoutService: WorkoutService
    
    @Test
    fun `workouts query returns connection with correct structure`() {
        // Given
        every { workoutService.getWorkouts(any(), any(), any(), any()) } returns
            WorkoutConnection(edges = listOf(workoutEdge), pageInfo = pageInfo, totalCount = 1)
        
        // When
        val result = dgsQueryExecutor.executeAndExtractJsonPath<Map<String, Any>>(
            """
            query {
              workouts(first: 10) {
                edges {
                  node { id date durationMinutes }
                }
                totalCount
              }
            }
            """.trimIndent(),
            "data.workouts"
        )
        
        // Then
        assertThat(result["totalCount"]).isEqualTo(1)
    }
}
```

**16.4. Frontend: React Testing Library (day 3)**

```tsx
// FoodProductCard.test.tsx (colocated with component)
import { render, screen, fireEvent } from '@testing-library/react';
import { MockPayloadGenerator, createMockEnvironment } from 'relay-test-utils';

describe('FoodProductCard', () => {
  const environment = createMockEnvironment();
  
  it('renders product name and calories', () => {
    // Given
    const mockProduct = {
      id: '1',
      name: 'Chicken Breast',
      caloriesPer100g: 165,
      proteinPer100g: 31,
      carbsPer100g: 0,
      fatPer100g: 3.6,
    };
    
    // When
    render(
      <RelayEnvironmentProvider environment={environment}>
        <FoodProductCard product={mockProduct} onSelect={jest.fn()} />
      </RelayEnvironmentProvider>
    );
    
    // Then
    expect(screen.getByText('Chicken Breast')).toBeInTheDocument();
    expect(screen.getByText('165 kcal/100g')).toBeInTheDocument();
  });
  
  it('calls onSelect when clicked', () => {
    const onSelect = jest.fn();
    render(<FoodProductCard product={mockProduct} onSelect={onSelect} />);
    
    fireEvent.click(screen.getByRole('button'));
    
    expect(onSelect).toHaveBeenCalledWith('1');
  });
});
```

**16.5. E2E: Playwright (day 4)**

```typescript
// e2e/meal-logging.spec.ts
import { test, expect } from '@playwright/test';

test.describe('Meal Logging', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/dashboard');
    // Authorization via fixture
  });
  
  test('user can log a meal with food product', async ({ page }) => {
    // Navigate to meal form
    await page.click('[data-testid="add-meal-button"]');
    
    // Search for product
    await page.fill('[data-testid="food-search"]', 'chicken');
    await page.waitForSelector('[data-testid="search-results"]');
    await page.click('text=Chicken Breast');
    
    // Set portion
    await page.fill('[data-testid="portion-input"]', '200');
    
    // Verify calculated nutrition
    await expect(page.locator('[data-testid="calculated-calories"]')).toHaveText('330 kcal');
    
    // Submit
    await page.click('[data-testid="log-meal-submit"]');
    
    // Verify meal appears in today's log
    await expect(page.locator('[data-testid="meal-list"]')).toContainText('Chicken Breast');
  });
});
```

### Practical assignments

**Assignment 16.1.** Write unit tests for `SpacedRepetitionService`: verify new interval calculation for quality = 5 (solved fast), quality = 1 (gave up), edge case — easeFactor not below 1.3.

**Assignment 16.2.** Write integration test with Testcontainers for `MealEntryRepository`: create several entries, verify cursor-based pagination (first page, next page, hasNextPage).

**Assignment 16.3.** Write React Testing Library tests for `AddMealEntryForm`: search input → show results → select product → enter portion → show calories → submit.

**Assignment 16.4.** Write Playwright E2E test: complete flow of creating widget on dashboard (Add Widget → Choose Type → Fill Config → Submit → Widget appears).

### Additional resources
- [JUnit 5 User Guide](https://junit.org/junit5/docs/current/user-guide/) — official
- [MockK Documentation](https://mockk.io/) — Kotlin mocking
- [Testcontainers for Java](https://www.testcontainers.org/) — integration testing
- [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/) — frontend tests
- [Playwright Documentation](https://playwright.dev/) — E2E tests
- [DGS Testing Guide](https://netflix.github.io/dgs/query-execution-testing/) — GraphQL tests

---

## Module 17: Integration + Meta Interview Prep
**Duration:** 5 days | **Prerequisites:** All modules 1-16

### Why it's in the project
Module 17 combines all knowledge from previous 16 modules into one picture. Here you'll create complete new widget from scratch (Reading Tracker), going through all layers from Flyway migration to React component with Relay. Also review project's architectural decisions at level sufficient for Meta interview.

### Theory

**17.1. Why exactly these technologies (Architecture Decisions)**

Every technology choice in project has reasoning you can use in interview:

- **Kotlin vs Java:** Null safety, data classes, coroutines, conciseness. 100% Java ecosystem compatibility.
- **GraphQL/DGS vs REST:** Fragment colocation, @defer, type safety. DGS chosen as Netflix solution over Spring Boot with DataLoader support out-of-box.
- **Relay vs Apollo:** Relay enforces best practices (persisted queries, fragment colocation, cursor pagination). Apollo more flexible, but Relay is Meta standard.
- **PostgreSQL + JSONB vs MongoDB:** Relational model for structured data + JSONB for flexible fields (config, tags). Best of both worlds.
- **Redis dual-use:** Cache (cache-aside/write-through) + pub/sub for GraphQL Subscriptions. One service — two roles.
- **Modular Monolith vs Microservices:** On start — monolith with enforced module boundaries (Spring Modulith). We rejected microservices (team size = 1, operational overhead, distributed-tracing debt, no sharding pressure) **and** rejected "just packages" (boundary drift, accidental N+1 dependencies, no isolated testing). Modulith gives us: CI-enforced package boundaries, **transactional event publication registry** for cross-module communication (same family as Meta's TAO write pipeline / LinkedIn's outbox pattern), per-module tests via `@ApplicationModuleTest`, and auto-generated PlantUML documentation. Extraction path is explicit: each module's boundary already matches a future service contract; `@ApplicationModuleListener` becomes a Kafka consumer with zero API change. See `docs/adr/ADR-004-module-boundary-enforcement.md` for the trade-off vs. ArchUnit.

**17.2. End-to-End: New widget in 10 steps**

Step-by-step guide for creating Reading Tracker Widget from database to UI. Detailed guide with code available in [HTML version of module](study-plans/17-integration.html).

1. Flyway migration (book + reading_session)
2. JPA Entity + Repository with cursor pagination
3. GraphQL schema (types, connections, mutations with Payload)
4. DGS resolvers (query, mutation, child field)
5. DataLoaders (ReadingSessionsByBookLoader)
6. BookService + ReadingCacheService
7. Backend tests (unit + integration + DGS)
8. Relay components (BookCard with fragment, BookList with usePaginationFragment)
9. Mutations + 3-level error handling
10. Frontend tests with relay-test-utils

**17.3. Cross-cutting concerns**

- ViewerContext: full path from JWT → SecurityContext → DGS → Service → Repository
- Error handling: strategy table by layers (validation → Payload, auth → GraphQL error, system → logged + generic)
- CursorCodec: encode/decode, why Base64
- Enum mapping: GraphQL ↔ Kotlin ↔ TypeScript
- Cache invalidation: when and which keys to invalidate

**17.4. Meta Interview Q&A**

Five detailed questions and answers for system design and coding round interview preparation. Details in [HTML version](study-plans/17-integration.html).

**Bonus Q — Scaling the team, not the traffic:**

> **Q:** How would you scale this from 1 to N teams working on the same repo without slowing each other down?
>
> **A:** Three levers, all already in the architecture:
> 1. **Enforced module boundaries (Spring Modulith).** Team A cannot accidentally import from team B's internals — CI fails. This removes the primary friction point of multi-team monorepos: coupling through shared internals that should have been private.
> 2. **Events as the default cross-module contract.** `@ApplicationModuleListener` + transactional event publication registry → teams communicate via documented event types, not direct method calls. Temporal decoupling → independent release cadences, trivial to mock in tests.
> 3. **Per-module tests (`@ApplicationModuleTest`).** Each team's CI is fast because they load only their module context. This is Meta/Google monorepo hygiene applied at a smaller scale.
>
> When a single module becomes a hotspot (traffic, team size, deploy frequency), extract it: the boundary is already a contract, the events are already asynchronous, the migration is mechanical. This is the explicit reason we picked Modulith over ArchUnit — see `docs/adr/ADR-004`.

### Practical assignments

**Assignment 17.1.** Implement Reading Tracker Widget (10 steps from §17.2). Each step — separate commit with proper conventional commit message.

**Assignment 17.2.** Prepare 5-minute talk about project architecture: why GraphQL+Relay, why modular monolith, how you'd scale to 100x users.

**Assignment 17.3.** Implement all three WidgetProviders (InterviewPrepWidgetProvider, FitnessWidgetProvider, BudgetWidgetProvider) — config validation, resolve with ViewerContext, Spring auto-registration. TDD tests available in [HTML study plan](study-plans/17-integration.html#backlog-tasks).

**Assignment 17.4.** Create onboarding flow: empty dashboard → choose widget → fill config form → first widget appears. Tests in HTML version of module.

### Additional resources
- [HTML version of module 17](study-plans/17-integration.html) — full code of all steps + TDD tests from backlog
- [Meta Engineering Blog](https://engineering.fb.com/) — articles on Relay, GraphQL, infrastructure
- [Netflix DGS Examples](https://github.com/Netflix/dgs-examples-kotlin) — pattern examples
- [Relay Documentation](https://relay.dev/) — official documentation

---

## Summary Table

| # | Module | Days | Prerequisites |
|---|--------|------|---------------|
| 1 | Git & Git Flow | 2 | — |
| 2 | TypeScript | 3 | Basic JS |
| 3 | Kotlin | 4 | Any OOP language |
| 4 | PostgreSQL + Flyway | 3 | Basic databases |
| 5 | Redis | 2 | Module 4 |
| 6 | Spring Boot 4 (incl. Spring Modulith) | 4.5 | Module 3 |
| 7 | Spring Data JPA + Hibernate | 3 | Modules 4, 6 |
| 8 | GraphQL (theory) | 2 | HTTP API |
| 9 | Netflix DGS | 3 | Modules 6, 8 |
| 10 | React 19 | 4 | Module 2, HTML/CSS |
| 11 | CSS Modules + Vite | 1.5 | Module 10, CSS |
| 12 | Relay | 4 | Modules 8, 10 |
| 13 | Jotai | 1.5 | Module 10 |
| 14 | Docker + Docker Compose | 2 | CLI |
| 15 | GitHub Actions | 1.5 | Modules 1, 14 |
| 16 | Testing (full stack) | 4 | All modules |
| 17 | Integration + Meta Interview Prep | 5 | All modules |
| | **TOTAL** | **~50 days** | |

> At intensive pace (6 hours/day) = **~9-10 weeks**.
> At moderate pace (4 hours/day) = **~12-13 weeks**.
>
> **🧪 Bonus:** Each module includes TDD assignments from the real backlog (91 GitHub Issues, including M7 — Budget Accounts Aggregation). Detailed tests and interactive HTML pages in [`docs/study-plans/`](study-plans/index.html).

---

## Capstone feature: Budget Accounts Aggregation (M7)

After modules 1–17, tackle M7 as a capstone — 23 issues (#69–#91) that lock in the whole stack on a real feature.

**Sources of truth:** [`BACKLOG.en.md → Milestone 7`](BACKLOG.en.md#milestone-7-budget-accounts-aggregation), [`budget-accounts/ENGINEERING_BREAKDOWN_budget_accounts.md`](budget-accounts/ENGINEERING_BREAKDOWN_budget_accounts.md), [`budget-accounts/PRD_budget_accounts.md`](budget-accounts/PRD_budget_accounts.md), [`adr/ADR-003-open-banking-aggregator.md`](adr/ADR-003-open-banking-aggregator.md).

**Duration:** 12 weeks (4 phases × 2–4 weeks).

**New topics introduced in M7:** envelope encryption with AES-256-GCM, HMAC signing of outgoing HTTP requests, third-party OAuth redirect flow (GoCardless), re-consent lifecycle, per-(provider,account) token bucket in Redis, provider contract testing, Grafana/OpenSearch alerting.

### M7 task → module map

| Phase | Task | Modules to revisit |
|-------|------|---------------------|
| phase-0 | #69 Flyway accounts schema | 4 |
| phase-0 | #70 JPA entities + repos | 3, 7, 16 |
| phase-0 | #71 `AccountProvider` + registry | 3, 6, 16 |
| phase-0 | #72 Credential vault (envelope encryption) | 6, 7, 16 |
| phase-0 | #73 ManualProvider | 3, 6 |
| phase-0 | #74 Observability baseline | 6, 15 |
| phase-0 | #75 GraphQL schema v1 | 8, 9 |
| phase-1 | #76 Spike crypto.com | 6 |
| phase-1 | #77 CryptoComProvider (HMAC) | 6, 16 |
| phase-1 | #78 Redis cache + scheduler + token bucket | 5, 6 |
| phase-1 | #79 GraphQL connect mutation + subscription | 5, 9 |
| phase-1 | #80 Frontend Accounts tab + connect flow | 10, 12, 13 |
| phase-2 | #81 Spike GoCardless | 6 |
| phase-2 | #82 OpenBankingProvider | 6, 16 |
| phase-2 | #83 Consent flow (BE+FE) | 6, 10, 12 |
| phase-2 | #84 Re-consent lifecycle + notifications | 6, 16 |
| phase-2 | #85 Rate-limit guard | 5, 6 |
| phase-3 | #86 Donut chart | 10, 12 |
| phase-3 | #87 90-day line chart (BE+FE) | 9, 10, 12 |
| phase-3 | #88 Per-row actions | 10, 12 |
| phase-3 | #89 A11y audit | 10, 16 |
| phase-3 | #90 Grafana/OpenSearch dashboard | 14, 15 |
| phase-3 | #91 Docs + onboarding guide | — |

Each breakdown task ships with acceptance criteria that act as TDD tests: write tests first (Testcontainers integration, `AccountProvider` contract tests, WireMock for HTTP, Playwright E2E), then implement until every acceptance item is green.
