# Life Goals Dashboard — Интенсив-план обучения для Junior Developer

**[🇬🇧 English](ONBOARDING_LEARNING_PLAN.en.md)** · **[🇷🇺 Русский](ONBOARDING_LEARNING_PLAN.md)**

---

> **Цель:** После прохождения всех модулей junior-разработчик сможет самостоятельно решать задачи в проекте Life Goals Dashboard — от написания GraphQL-резолверов на Kotlin до создания React-компонентов с Relay.
>
> **Формат:** 17 модулей, ~9-10 недель при 4-6 часов/день. Каждый модуль содержит теорию, привязанную к проекту, практические задания и ссылки на дополнительные источники.
>
> **Порядок модулей выстроен по зависимостям:** сначала фундамент (Git, языки), затем хранилища данных, потом фреймворки, и наконец инфраструктура и тестирование.
>
> **🧪 TDD из реального Backlog:** В каждом модуле есть задания из [GitHub Issues Backlog](BACKLOG.md) (91 задача, 7 milestones — включая M7 Budget Accounts Aggregation) с готовыми тестами. Подход: сначала изучи тесты → пойми ожидания → напиши реализацию → запусти тесты. Полные TDD-задания доступны в [интерактивных HTML study plans](study-plans/index.html).
>
> **Детальные HTML-модули:** Каждый модуль доступен в виде отдельной HTML-страницы с подсветкой синтаксиса, навигацией и TDD-заданиями: [`docs/study-plans/`](study-plans/index.html)

---

## Карта зависимостей модулей

```
Модуль 1: Git & Git Flow ─────────────────────────────────────────────┐
Модуль 2: TypeScript ──────────────────┐                              │
Модуль 3: Kotlin ──────────────────┐   │                              │
Модуль 4: PostgreSQL + Flyway ──┐  │   │                              │
Модуль 5: Redis ─────────────┐  │  │   │                              │
Модуль 6: Spring Boot 4 ─────┤  │  │   │                              │
Модуль 7: Spring Data JPA ───┘──┘  │   │                              │
Модуль 8: GraphQL (теория) ──┐     │   │                              │
Модуль 9: Netflix DGS ───────┘─────┘   │                              │
Модуль 10: React 19 ───────────────────┤                              │
Модуль 11: CSS Modules + Vite ─────────┤                              │
Модуль 12: Relay ──────────────────────┘                              │
Модуль 13: Jotai ──────────────────────────────────────────────────┐  │
Модуль 14: Docker + Docker Compose ────────────────────────────────┤  │
Модуль 15: GitHub Actions ────────────────────────────────────────┘│  │
Модуль 16: Тестирование (полный стек) ─────────────────────────────┤──┘
Модуль 17: Интеграция + Meta Interview Prep ───────────────────────┘
```

---

## Модуль 1: Git & Git Flow
**Длительность:** 2 дня | **Пререквизиты:** нет

### Зачем это в проекте
В Life Goals Dashboard используется строгий Git-workflow: ветки `feature/LGD-{N}-description`, conventional commits (`feat(fitness): ...`), обязательные PR с code review. Без уверенного владения Git невозможно контрибьютить в проект.

### Теория

**1.1. Основы Git (день 1, первая половина)**

Git — это распределённая система контроля версий. Каждый разработчик хранит полную копию репозитория, а не только рабочую директорию.

Ключевые концепции:
- **Working directory** — файлы, с которыми вы работаете прямо сейчас
- **Staging area (index)** — "черновик" следующего коммита. `git add` перемещает изменения сюда
- **Repository (.git)** — хранилище всех коммитов, веток, тегов

Базовые команды:
```bash
git init                          # Инициализировать репозиторий
git clone <url>                   # Клонировать удалённый репозиторий
git status                        # Текущее состояние (что изменено, что в staging)
git add <file>                    # Добавить файл в staging
git add -p                        # Добавить по частям (интерактивный режим)
git commit -m "message"           # Создать коммит
git log --oneline --graph         # История коммитов (компактно + граф)
git diff                          # Что изменилось (unstaged)
git diff --staged                 # Что в staging
```

Как Git хранит данные: каждый коммит — это снимок (snapshot) всех файлов, а не набор изменений (diff). Git использует SHA-1 хеши для идентификации объектов. Ветка — это просто указатель (pointer) на коммит.

**1.2. Ветвление и слияние (день 1, вторая половина)**

```bash
git branch feature/my-feature     # Создать ветку
git checkout -b feature/my-feature # Создать и перейти (одной командой)
git switch -c feature/my-feature   # Более новый синтаксис (Git 2.23+)
git merge feature/my-feature       # Слить ветку в текущую
git rebase main                    # Перебазировать текущую ветку на main
```

**Merge vs Rebase:**
- `merge` создаёт merge-коммит, сохраняя историю обеих веток. Безопасно для shared-веток.
- `rebase` переписывает историю, делая её линейной. Используйте только для локальных веток, ещё не запушенных.

**Разрешение конфликтов:**
```bash
# При конфликте Git помечает файлы:
<<<<<<< HEAD
ваш код
=======
их код
>>>>>>> feature/other-branch

# Шаги:
# 1. Открыть файл, выбрать нужный вариант (или объединить)
# 2. Удалить маркеры конфликта
# 3. git add <resolved-file>
# 4. git commit (или git rebase --continue)
```

**1.3. Workflow проекта Life Goals Dashboard (день 2, первая половина)**

В проекте используется **GitHub Flow** с conventional commits.

**Именование веток:**
```
feature/LGD-42-add-recipe-builder
fix/LGD-55-exchange-rate-cache
refactor/LGD-60-extract-widget-registry
```
Паттерн: `{type}/LGD-{issue-number}-{short-description}`

**Формат коммитов (Conventional Commits):**
```
type(scope): lowercase description

# Типы: feat, fix, refactor, test, docs, chore, perf
# Scope = модуль проекта: fitness, budget, interviewprep, common, dashboard

# Примеры:
feat(fitness): add recipe builder with auto-nutrition calculation
fix(budget): correct exchange rate cache invalidation
refactor(common): extract Relay connection utilities to shared package
test(interviewprep): add integration tests for spaced repetition service
```

**PR Workflow:**
1. Создать ветку от `main`
2. Сделать коммиты (по conventional commits)
3. Запушить: `git push -u origin feature/LGD-42-add-recipe-builder`
4. Открыть PR в GitHub
5. Пройти code review + CI (тесты, линтеры)
6. Squash & merge в `main`

**1.4. Полезные приёмы (день 2, вторая половина)**

```bash
# Спрятать незаконченную работу
git stash                         # Сохранить в stash
git stash pop                     # Вернуть из stash

# Отмена изменений
git checkout -- <file>            # Откатить файл к последнему коммиту
git reset HEAD <file>             # Убрать из staging
git reset --soft HEAD~1           # Отменить последний коммит (сохранив изменения)

# Поиск бага
git bisect start                  # Бинарный поиск коммита, сломавшего код
git bisect bad                    # Текущий коммит — плохой
git bisect good <commit>          # Этот коммит был хорошим

# Интерактивный rebase (НЕ используется в проекте через CLI, 
# но полезно знать для локальной работы)
git rebase -i HEAD~3              # Редактировать последние 3 коммита

# Cherry-pick
git cherry-pick <commit-hash>     # Применить конкретный коммит к текущей ветке
```

### Практические задания

**Задание 1.1.** Создайте локальный репозиторий. Сделайте 5 коммитов в формате conventional commits проекта. Создайте ветку `feature/LGD-1-practice`, добавьте в неё 2 коммита, затем сделайте merge в main.

**Задание 1.2.** Симулируйте конфликт: создайте две ветки от одного коммита, измените одну и ту же строку в обеих, слейте первую в main, затем попробуйте слить вторую. Разрешите конфликт.

**Задание 1.3.** Склонируйте любой публичный репозиторий. Используйте `git log --oneline --graph --all` для визуализации истории. Найдите конкретный коммит с помощью `git log --grep="fix"`.

**Задание 1.4.** Потренируйте `git stash`: начните редактировать файл, спрячьте изменения, переключитесь на другую ветку, вернитесь и восстановите stash.

### Дополнительные источники
- [Pro Git Book (бесплатная)](https://git-scm.com/book/en/v2) — главы 1-3, 6-7
- [Learn Git Branching](https://learngitbranching.js.org/) — интерактивный тренажёр
- [Conventional Commits](https://www.conventionalcommits.org/) — спецификация
- [GitHub Flow](https://docs.github.com/en/get-started/quickstart/github-flow) — описание workflow

---

## Модуль 2: TypeScript
**Длительность:** 3 дня | **Пререквизиты:** базовый JavaScript

### Зачем это в проекте
Весь frontend Life Goals Dashboard написан на TypeScript 6.0. Relay генерирует типы из GraphQL-схемы, и без понимания TypeScript невозможно работать с ними. Jotai atoms тоже типизированы.

### Теория

**2.1. Основы типов (день 1)**

```typescript
// Примитивные типы
let name: string = "Life Goals Dashboard";
let version: number = 1;
let isReady: boolean = false;
let nothing: null = null;
let notDefined: undefined = undefined;

// Массивы
let categories: string[] = ["GRAPH", "DP", "BINARY_SEARCH"];
let scores: Array<number> = [85, 92, 78]; // Альтернативный синтаксис

// Кортежи (Tuples) — массив фиксированной длины с типами
let entry: [string, number] = ["calories", 2200];

// Enum — в проекте используются для фиксированных наборов значений
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

// Union types — тип может быть одним из нескольких
type TrendDirection = "UP" | "DOWN" | "STABLE";
let trend: TrendDirection = "UP";

// Literal types
type WidgetType = "INTERVIEW_PREP" | "FITNESS" | "BUDGET";
```

**2.2. Interfaces и Types (день 1)**

```typescript
// Interface — описывает форму объекта
interface FoodProduct {
  id: string;
  name: string;
  caloriesPer100g: number;
  proteinPer100g: number;
  carbsPer100g: number;
  fatPer100g: number;
  fiberPer100g?: number;  // ? = опциональное поле
  isCustom: boolean;
}

// Type alias — более гибкий, может описывать union, intersection
type NutritionInfo = {
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
};

// Расширение (наследование)
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

// Когда использовать interface vs type:
// interface — для объектов, которые могут расширяться (extends)
// type — для union types, mapped types, утилитарных типов
```

**2.3. Generics (день 2)**

Generics позволяют писать переиспользуемый код, сохраняя типобезопасность:

```typescript
// Generic функция
function getFirst<T>(items: T[]): T | undefined {
  return items[0];
}

const firstProblem = getFirst<CodingProblem>(problems); // CodingProblem | undefined
const firstName = getFirst(["Alice", "Bob"]);            // string | undefined (выведено)

// Generic interface — как Relay Connection в проекте
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

// Использование
type ProblemConnection = Connection<CodingProblem>;
type RecipeConnection = Connection<Recipe>;

// Generic constraints (ограничения)
function getProperty<T, K extends keyof T>(obj: T, key: K): T[K] {
  return obj[key];
}

const product: FoodProduct = { /* ... */ };
const calories = getProperty(product, "caloriesPer100g"); // number
// getProperty(product, "nonExistent"); // Ошибка компиляции!
```

**2.4. Utility Types (день 2)**

TypeScript предоставляет встроенные утилитарные типы:

```typescript
// Partial<T> — все поля опциональны (полезно для update-форм)
type UpdateWidgetConfig = Partial<FitnessWidgetConfig>;

// Required<T> — все поля обязательны
type StrictConfig = Required<FitnessWidgetConfig>;

// Pick<T, K> — выбрать определённые поля
type ProductPreview = Pick<FoodProduct, "id" | "name" | "caloriesPer100g">;

// Omit<T, K> — все поля кроме указанных
type NewProduct = Omit<FoodProduct, "id">;

// Record<K, V> — объект с ключами K и значениями V
type MacroTargets = Record<"proteinPct" | "carbsPct" | "fatPct", number>;

// Readonly<T> — все поля read-only (иммутабельность)
type FrozenConfig = Readonly<WidgetConfig>;

// ReturnType<T> — тип возвращаемого значения функции
type CalcResult = ReturnType<typeof calculateNutrition>;
```

**2.5. Типизация React-компонентов и хуков (день 3)**

```typescript
// Props interface для компонента
interface FoodProductCardProps {
  product: FoodProduct;
  onSelect: (productId: string) => void;
  showNutrition?: boolean; // Опционально
}

// Компонент с типизированными props
const FoodProductCard: React.FC<FoodProductCardProps> = ({
  product,
  onSelect,
  showNutrition = true,
}) => {
  // ...
};

// Типизированные хуки
const [meals, setMeals] = useState<Meal[]>([]);
const [selectedDate, setSelectedDate] = useState<Date>(new Date());
const [error, setError] = useState<string | null>(null);

// useRef с типом DOM-элемента
const inputRef = useRef<HTMLInputElement>(null);

// Custom hook с типизированным возвратом
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

### Практические задания

**Задание 2.1.** Опишите интерфейсы для всех трёх типов виджетов проекта: `InterviewPrepConfig`, `FitnessConfig`, `BudgetConfig`. Используйте union type `WidgetConfig = InterviewPrepConfig | FitnessConfig | BudgetConfig`.

**Задание 2.2.** Напишите generic-функцию `paginate<T>(items: T[], pageSize: number, cursor?: string): Connection<T>`, которая принимает массив и возвращает Relay Connection. Покройте edge cases (пустой массив, невалидный cursor).

**Задание 2.3.** Реализуйте типизированный custom hook `useLocalForm<T>(initial: T)`, который возвращает `[T, (field: keyof T, value: T[keyof T]) => void, () => void]` — текущее состояние, функцию обновления поля и reset.

**Задание 2.4.** Создайте тип `NutritionCalculationResult` и функцию `calculateMealNutrition(entries: MealEntry[]): NutritionCalculationResult`, используя discriminated unions для `MealEntry` (продукт vs рецепт).

### Дополнительные источники
- [TypeScript Handbook](https://www.typescriptlang.org/docs/handbook/) — официальная документация
- [TypeScript Deep Dive](https://basarat.gitbook.io/typescript/) — бесплатная книга
- [Type Challenges](https://github.com/type-challenges/type-challenges) — задачи на типы (начните с easy)
- [Total TypeScript](https://www.totaltypescript.com/) — продвинутые паттерны

---

## Модуль 3: Kotlin
**Длительность:** 4 дня | **Пререквизиты:** любой ООП-язык (Java, C#, TypeScript)

### Зачем это в проекте
Backend Life Goals Dashboard полностью написан на Kotlin 2.3.20 и работает на JDK 25 LTS. Kotlin — основной язык для Spring Boot 4 в этом проекте. Знание Kotlin необходимо для написания сервисов, моделей, резолверов и тестов.

### Теория

**3.1. Основы синтаксиса (день 1)**

```kotlin
// Переменные
val immutable: String = "Life Goals"    // val = read-only (предпочтительно)
var mutable: Int = 42                    // var = изменяемая

// Kotlin выводит типы автоматически
val name = "FoodProduct"                 // String
val calories = 2200                       // Int
val price = 9.99                          // Double

// Null-safety — ключевая фича Kotlin
val nonNull: String = "hello"             // Не может быть null
val nullable: String? = null              // Может быть null (отмечено ?)

// Безопасный вызов (?.)
val length: Int? = nullable?.length       // null если nullable == null

// Elvis оператор (?:) — значение по умолчанию
val length: Int = nullable?.length ?: 0   // 0 если null

// Not-null assertion (!!) — бросает NPE если null (ИЗБЕГАЙТЕ)
val length: Int = nullable!!.length       // NPE если null

// String templates
val message = "Product: $name, calories: ${calories * 2}"

// Функции
fun calculateCalories(weightG: Double, caloriesPer100g: Double): Double {
    return weightG / 100.0 * caloriesPer100g
}

// Однострочная функция
fun calculateCalories(weightG: Double, caloriesPer100g: Double) =
    weightG / 100.0 * caloriesPer100g

// Параметры по умолчанию и именованные аргументы
fun createProduct(
    name: String,
    caloriesPer100g: Double,
    proteinPer100g: Double = 0.0,    // Значение по умолчанию
    isCustom: Boolean = true
): FoodProduct { /* ... */ }

// Вызов с именованными аргументами (порядок не важен)
createProduct(
    name = "Chicken Breast",
    caloriesPer100g = 165.0,
    proteinPer100g = 31.0
)
```

**3.2. Классы и Data Classes (день 1-2)**

```kotlin
// Обычный класс
class NutritionCalculator(
    private val defaultPortionG: Double = 100.0  // В конструкторе
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

// Data class — автоматически генерирует equals(), hashCode(), toString(), copy()
// Используется для моделей/DTO в проекте
data class NutritionInfo(
    val calories: Double,
    val protein: Double,
    val carbs: Double,
    val fat: Double
)

// copy() — создаёт копию с изменёнными полями (иммутабельность!)
val original = NutritionInfo(200.0, 30.0, 20.0, 8.0)
val modified = original.copy(calories = 250.0)

// Sealed class — ограниченная иерархия (аналог union type в TS)
// Идеально для WidgetData в проекте
sealed class WidgetData {
    data class InterviewPrep(val readinessScore: Int, val problemsSolved: Int) : WidgetData()
    data class Fitness(val currentWeight: Double, val workoutsThisWeek: Int) : WidgetData()
    data class Budget(val savedAmount: Double, val targetAmount: Double) : WidgetData()
}

// when с sealed class — компилятор проверяет exhaustiveness
fun renderWidget(data: WidgetData): String = when (data) {
    is WidgetData.InterviewPrep -> "Readiness: ${data.readinessScore}%"
    is WidgetData.Fitness -> "Weight: ${data.currentWeight}kg"
    is WidgetData.Budget -> "Saved: ${data.savedAmount}/${data.targetAmount}"
    // Нет else — компилятор знает, что все варианты покрыты
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

**3.3. Коллекции и функциональные операции (день 2)**

```kotlin
// Immutable коллекции (по умолчанию)
val categories: List<ProblemCategory> = listOf(
    ProblemCategory.GRAPH, 
    ProblemCategory.DYNAMIC_PROGRAMMING
)

val productMap: Map<String, FoodProduct> = mapOf("chicken" to chickenProduct)

// Mutable коллекции (когда нужно изменять)
val mutableList: MutableList<String> = mutableListOf("a", "b")
mutableList.add("c")

// Функциональные операции на коллекциях (используются ПОВСЕМЕСТНО в проекте)
val problems: List<CodingProblem> = getProblemsByUser(userId)

// filter — отобрать элементы по условию
val hardProblems = problems.filter { it.difficulty == Difficulty.HARD }

// map — преобразовать каждый элемент
val problemNames = problems.map { it.name }

// groupBy — группировка
val byCategory = problems.groupBy { it.category }
// Map<ProblemCategory, List<CodingProblem>>

// sortedBy / sortedByDescending
val recentFirst = problems.sortedByDescending { it.solvedAt }

// flatMap — "развернуть" вложенные коллекции
val allIngredients = recipes.flatMap { it.ingredients }

// associate — создать Map из списка
val productById = products.associateBy { it.id }
// Map<UUID, FoodProduct>

// fold / reduce — агрегация
val totalCalories = mealEntries.fold(0.0) { acc, entry ->
    acc + entry.calculatedCalories
}

// let, also, apply, run — scope functions
product?.let { nonNullProduct ->
    // Выполнится только если product != null
    calculateNutrition(nonNullProduct)
}

val product = FoodProduct().apply {
    name = "Chicken"
    caloriesPer100g = 165.0
    // apply возвращает сам объект (для builder-паттерна)
}
```

**3.4. Корутины — Основы (день 3)**

```kotlin
// Корутины — лёгкий способ писать асинхронный код
// В проекте используются для DataLoader'ов и внешних API-вызовов

import kotlinx.coroutines.*

// suspend — функция, которая может приостановиться без блокировки потока
suspend fun fetchExchangeRate(base: String, target: String): Double {
    // Имитация HTTP-вызова
    return withContext(Dispatchers.IO) {
        // IO-диспетчер для сетевых/дисковых операций
        exchangeRateApi.getRate(base, target)
    }
}

// Запуск корутин
// В Spring Boot корутины интегрированы через WebFlux или CompletableFuture

// async/await — параллельные вызовы
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

**3.5. Extension functions и Kotlin-идиомы (день 3-4)**

```kotlin
// Extension function — добавляет метод к существующему классу
fun Double.roundTo(decimals: Int): Double {
    val factor = Math.pow(10.0, decimals.toDouble())
    return Math.round(this * factor) / factor
}

val price = 9.876.roundTo(2) // 9.88

// Extension для работы с проектом
fun List<CodingProblem>.completionRate(): Double {
    if (isEmpty()) return 0.0
    return count { it.isSolved }.toDouble() / size * 100
}

// Destructuring
data class NutritionInfo(val calories: Double, val protein: Double, val carbs: Double, val fat: Double)
val (cal, prot, carbs, fat) = calculateNutrition(product, 150.0)

// require / check — defensive programming (используйте в сервисах)
fun updateWeight(weight: Double) {
    require(weight > 0) { "Weight must be positive, got: $weight" }
    require(weight < 500) { "Weight seems unrealistic: $weight" }
    // ...
}

// use — автоматическое закрытие ресурсов (аналог try-with-resources в Java)
File("data.csv").bufferedReader().use { reader ->
    reader.readLines().forEach { /* ... */ }
}
```

### Практические задания

**Задание 3.1.** Создайте data class `CodingProblem` со всеми полями из проекта (id, name, category, difficulty, isSolved, solvedAt, url, notes, isTargetCompanyTagged). Напишите функции: фильтрация по категории, группировка по сложности, подсчёт процента решённых.

**Задание 3.2.** Реализуйте sealed class `MealEntry` с двумя вариантами (ProductEntry и RecipeEntry). Напишите `NutritionCalculator`, который вычисляет калории, белки, жиры и углеводы для списка MealEntry.

**Задание 3.3.** Реализуйте простой алгоритм SM-2 (Spaced Repetition) как класс с методом `processAttempt(quality: Int): ReviewSchedule`. Используйте data class для `ReviewSchedule` с полями `nextReviewDate`, `easeFactor`, `interval`, `repetitions`.

**Задание 3.4.** Напишите extension functions: `List<BodyMeasurement>.trendDirection(): TrendDirection` и `List<Transaction>.monthlySummary(): Map<YearMonth, Double>`.

### Дополнительные источники
- [Kotlin Official Documentation](https://kotlinlang.org/docs/home.html)
- [Kotlin Koans](https://play.kotlinlang.org/koans/) — интерактивные задачи
- [Kotlin in Action](https://www.manning.com/books/kotlin-in-action) — книга от JetBrains
- [Kotlin for Java Developers (Coursera)](https://www.coursera.org/learn/kotlin-for-java-developers) — бесплатный курс от JetBrains

---

## Модуль 4: PostgreSQL + Flyway
**Длительность:** 3 дня | **Пререквизиты:** базовое понимание реляционных БД

### Зачем это в проекте
PostgreSQL 18.3 — единственная БД проекта. Все данные виджетов, пользователей и конфигураций хранятся здесь. В 18-й версии появился новый async I/O subsystem (до 3× быстрее чтение), встроенная функция `uuidv7()` (последовательные UUID лучше индексируются, чем v4), и virtual generated columns (колонки-формулы, вычисляемые в момент запроса без хранения). Flyway 11 управляет миграциями. JSONB используется для гибких полей (widget config, tags).

### Теория

**4.1. SQL — основы для проекта (день 1)**

```sql
-- Создание таблицы (стиль проекта: UUID PK, timestamps, user_id FK)
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

-- ВАЖНО: Индекс на user_id — ВСЕ запросы scope'ятся по пользователю
CREATE INDEX idx_food_product_user ON food_product(user_id);

-- Базовые запросы
-- SELECT с фильтрацией и сортировкой
SELECT id, name, calories_per_100g
FROM food_product
WHERE user_id = :userId
  AND calories_per_100g < 200
ORDER BY name ASC;

-- JOIN — связать таблицы
SELECT r.name AS recipe_name, 
       fp.name AS ingredient_name,
       ri.weight_grams
FROM recipe r
JOIN recipe_ingredient ri ON ri.recipe_id = r.id
JOIN food_product fp ON fp.id = ri.food_product_id
WHERE r.user_id = :userId;

-- Агрегация
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

-- DELETE (осторожно!)
DELETE FROM meal_entry
WHERE id = :entryId AND user_id = :userId;
```

**4.2. PostgreSQL-специфика: JSONB (день 2)**

JSONB — бинарный JSON, поддерживающий индексы и запросы. В проекте используется для `user_dashboard_widget.config`.

```sql
-- Таблица с JSONB (как в проекте)
CREATE TABLE user_dashboard_widget (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES "user"(id),
    widget_type VARCHAR(50) NOT NULL,
    position INTEGER NOT NULL,
    config JSONB NOT NULL DEFAULT '{}',
    created_at TIMESTAMP NOT NULL DEFAULT NOW()
);

-- Чтение полей из JSONB
-- -> возвращает JSON, ->> возвращает TEXT
SELECT config->>'targetCompany' AS company,
       (config->>'weeklyProblemGoal')::int AS goal
FROM user_dashboard_widget
WHERE widget_type = 'INTERVIEW_PREP'
  AND user_id = :userId;

-- Фильтрация по JSONB-полю
SELECT * FROM user_dashboard_widget
WHERE config->>'baseCurrency' = 'EUR';

-- Вложенные поля
SELECT config->'macroTargets'->>'proteinPct' AS protein_target
FROM user_dashboard_widget
WHERE widget_type = 'FITNESS';

-- @> оператор — "содержит" (использует GIN-индекс!)
SELECT * FROM user_dashboard_widget
WHERE config @> '{"targetCompany": "Meta"}';

-- GIN-индекс для JSONB (ускоряет @> запросы)
CREATE INDEX idx_widget_config ON user_dashboard_widget USING GIN (config);

-- Обновление JSONB-поля (без перезаписи всего config)
UPDATE user_dashboard_widget
SET config = config || '{"weeklyProblemGoal": 20}'::jsonb
WHERE id = :widgetId AND user_id = :userId;
```

**4.3. Курсорная пагинация (Relay-стиль) (день 2)**

В проекте **НЕ используется** offset-пагинация. Только cursor-based:

```sql
-- Cursor-based пагинация (Relay Connection pattern)
-- cursor = Base64(created_at + id) — гарантирует уникальность

-- Первая страница
SELECT id, name, calories_per_100g, created_at
FROM food_product
WHERE user_id = :userId
ORDER BY created_at DESC, id DESC
LIMIT :first + 1;  -- +1 чтобы определить hasNextPage

-- Следующая страница (после курсора)
SELECT id, name, calories_per_100g, created_at
FROM food_product
WHERE user_id = :userId
  AND (created_at, id) < (:cursorCreatedAt, :cursorId)  -- Keyset pagination
ORDER BY created_at DESC, id DESC
LIMIT :first + 1;

-- ПОЧЕМУ НЕ OFFSET:
-- OFFSET 10000 — БД всё равно прочитает 10000 строк и отбросит их
-- Keyset pagination — БД перепрыгивает сразу к нужному месту через индекс
-- Это O(1) vs O(N) для больших наборов данных
```

**4.4. Flyway — миграции базы данных (день 3)**

Flyway автоматически применяет SQL-скрипты при запуске приложения.

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

Правила:
- Формат имени: `V{N}__{description}.sql` (два подчёркивания!)
- **НИКОГДА не редактируйте существующую миграцию** — создайте новую
- Миграции идемпотентны — Flyway запоминает, что уже применено (таблица `flyway_schema_history`)
- Для изменения структуры — новый файл: `V8__add_fiber_to_food_product.sql`

```sql
-- V8__add_fiber_to_food_product.sql
ALTER TABLE food_product 
ADD COLUMN fiber_per_100g DOUBLE PRECISION;

-- V9__add_tags_to_coding_problem.sql
ALTER TABLE coding_problem
ADD COLUMN tags JSONB NOT NULL DEFAULT '[]';
CREATE INDEX idx_coding_problem_tags ON coding_problem USING GIN (tags);
```

**4.5. Индексы и производительность (день 3)**

```sql
-- B-Tree индекс (по умолчанию) — для =, <, >, BETWEEN, ORDER BY
CREATE INDEX idx_meal_entry_user_date 
ON meal_entry(user_id, logged_at DESC);

-- Составной индекс — порядок столбцов ВАЖЕН
-- Работает для: WHERE user_id = X
-- Работает для: WHERE user_id = X AND logged_at > Y
-- НЕ работает для: WHERE logged_at > Y (без user_id)
CREATE INDEX idx_transaction_user_date
ON transaction(user_id, created_at DESC);

-- GIN индекс — для JSONB, массивов, полнотекстового поиска
CREATE INDEX idx_problem_tags ON coding_problem USING GIN (tags);

-- Partial index — индекс только для части таблицы
CREATE INDEX idx_unsolved_problems 
ON coding_problem(user_id, category) 
WHERE is_solved = false;

-- EXPLAIN ANALYZE — как понять, быстрый ли запрос
EXPLAIN ANALYZE
SELECT * FROM food_product
WHERE user_id = '...' AND calories_per_100g < 200;
-- Покажет: использован ли индекс, сколько строк прочитано, время
```

### Практические задания

**Задание 4.1.** Напишите полную миграцию для таблиц Fitness-модуля: `workout`, `exercise_set`, `body_measurement`, `meal`, `meal_entry`. Включите FK, индексы на `user_id`, JSONB-поле для tags.

**Задание 4.2.** Напишите SQL-запрос, возвращающий "тепловую карту" решённых задач (как GitHub contributions): количество задач по дням за последний год для конкретного пользователя.

**Задание 4.3.** Реализуйте cursor-based пагинацию для `food_product`: напишите запрос для первой страницы и для "next page after cursor". Курсор = `created_at` + `id`.

**Задание 4.4.** Напишите запрос, который из JSONB-конфига Budget-виджета извлекает все `budgetCategories` и считает сумму `estimatedAmount` для каждого виджета.

### Дополнительные источники
- [PostgreSQL Tutorial](https://www.postgresqltutorial.com/) — пошаговые уроки
- [Use The Index, Luke](https://use-the-index-luke.com/) — индексы и производительность SQL
- [PostgreSQL JSONB Guide](https://www.postgresql.org/docs/16/datatype-json.html) — официальная документация
- [Flyway Documentation](https://documentation.red-gate.com/fd) — миграции
- [Pagination Done The Right Way](https://brunoscheufler.com/blog/2022-01-01-paginating-large-ordered-datasets-with-cursor-based-pagination) — cursor vs offset

---

## Модуль 5: Redis
**Длительность:** 2 дня | **Пререквизиты:** Модуль 4 (PostgreSQL)

### Зачем это в проекте
Redis 8.6 используется как кэш (exchange rates, dashboard data, food search) и как pub/sub-транспорт для GraphQL Subscriptions. Кэширование — критическая часть: без него каждый запрос dashboard'а бьёт в БД.

### Теория

**5.1. Структуры данных Redis (день 1)**

Redis — это in-memory key-value хранилище с типизированными значениями.

```bash
# Строки (Strings) — базовый тип. Используется для кэша.
SET lifegoals:budget:exchange_rate:EUR:KRW "1450.50"
GET lifegoals:budget:exchange_rate:EUR:KRW
# "1450.50"

# TTL (Time To Live) — авто-удаление через N секунд
SET lifegoals:budget:exchange_rate:EUR:KRW "1450.50" EX 3600
# Ключ исчезнет через 1 час (3600 сек)

TTL lifegoals:budget:exchange_rate:EUR:KRW
# 3542 (осталось секунд)

# SETEX — SET + EX одной командой
SETEX lifegoals:fitness:weekly_nutrition:user123 900 '{"calories":15400,"protein":980}'
# TTL = 15 минут (900 сек)

# Хеши (Hashes) — объект с полями. Удобно для структурированных данных.
HSET lifegoals:interviewprep:stats:user123 totalSolved 142 easySolved 50 mediumSolved 67 hardSolved 25
HGET lifegoals:interviewprep:stats:user123 totalSolved
# "142"
HGETALL lifegoals:interviewprep:stats:user123
# totalSolved 142 easySolved 50 ...
HINCRBY lifegoals:interviewprep:stats:user123 totalSolved 1
# 143 (атомарный инкремент)

# Списки (Lists) — очередь уведомлений
LPUSH lifegoals:notifications:user123 '{"type":"ACHIEVEMENT","message":"10 problems solved!"}'
LRANGE lifegoals:notifications:user123 0 9  # Последние 10

# Множества (Sets) — уникальные значения
SADD lifegoals:fitness:active_users "user123" "user456"
SISMEMBER lifegoals:fitness:active_users "user123"  # 1 (true)

# Sorted Sets — ранжированные данные
ZADD lifegoals:interviewprep:leaderboard 142 "user123" 98 "user456"
ZREVRANGE lifegoals:interviewprep:leaderboard 0 9 WITHSCORES  # Top 10
```

**5.2. Паттерны кэширования в проекте (день 1)**

```
Ключевой паттерн проекта: lifegoals:{widget_type}:{entity}:{id_or_hash}
```

**Cache-Aside (Lazy Loading):**
```
1. Клиент запрашивает данные
2. Сервис проверяет Redis
3. Есть в кэше → вернуть (cache hit)
4. Нет в кэше → запросить из PostgreSQL → записать в Redis с TTL → вернуть
```

```kotlin
// Пример: кэширование курса валют
fun getExchangeRate(base: String, target: String): Double {
    val cacheKey = "lifegoals:budget:exchange_rate:$base:$target"
    
    // 1. Проверить кэш
    val cached = redis.get(cacheKey)
    if (cached != null) return cached.toDouble()
    
    // 2. Запросить из API
    val rate = exchangeRateApi.fetch(base, target)
    
    // 3. Записать в кэш с TTL 1 час
    redis.setex(cacheKey, 3600, rate.toString())
    
    return rate
}
```

**Write-Through (для Dashboard widget data):**
```
1. Клиент делает мутацию (logWorkout, addMeal)
2. Сервис записывает в PostgreSQL
3. Сервис обновляет/инвалидирует кэш
4. Следующий запрос получит свежие данные из кэша
```

```kotlin
// Пример: инвалидация при мутации
fun logWorkout(userId: UUID, workout: Workout): Workout {
    val saved = workoutRepository.save(workout)
    
    // Инвалидировать кэш виджета (данные устарели)
    redis.del("lifegoals:fitness:widget_data:$userId")
    redis.del("lifegoals:fitness:weekly_stats:$userId")
    
    return saved
}
```

**Таблица кэширования проекта:**

| Данные | Ключ | TTL | Стратегия |
|--------|------|-----|-----------|
| Exchange rate | `lifegoals:budget:exchange_rate:{base}:{target}` | 1 час | Cache-aside |
| Dashboard widget data | `lifegoals:dashboard:widget:{userId}:{widgetId}` | 5 мин | Write-through |
| Problem stats | `lifegoals:interviewprep:stats:{userId}` | 10 мин | Cache-aside |
| Food search | `lifegoals:fitness:food_search:{queryHash}` | 30 мин | Cache-aside |
| Weekly nutrition | `lifegoals:fitness:weekly_nutrition:{userId}` | 15 мин | Cache-aside |

**5.3. Pub/Sub для GraphQL Subscriptions (день 2)**

Redis pub/sub — механизм публикации/подписки на каналы сообщений. В проекте используется для real-time уведомлений.

```bash
# Подписчик (DGS Subscription Handler слушает)
SUBSCRIBE lifegoals:notifications:user123

# Публикатор (Service Layer публикует при мутации)
PUBLISH lifegoals:notifications:user123 '{"type":"ACHIEVEMENT","widget":"FITNESS","message":"3 workouts this week!"}'
```

```kotlin
// Как это работает в проекте:
// 1. Пользователь логирует тренировку → mutation logWorkout
// 2. WorkoutService сохраняет в БД
// 3. AchievementChecker проверяет: "3 тренировки на этой неделе!"
// 4. NotificationService публикует в Redis channel
// 5. NotificationSubscription (DGS) получает и отправляет по WebSocket клиенту
```

**5.4. Redis в Spring Boot (день 2)**

```kotlin
// Конфигурация (application.yml)
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

// Использование в сервисе
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

### Практические задания

**Задание 5.1.** Установите Redis локально (или через Docker: `docker run -p 6379:6379 redis:8.6`). Через `redis-cli` создайте ключи для всех типов кэша проекта (exchange rate, stats, food search). Проверьте TTL, попробуйте EXPIRE, DEL.

**Задание 5.2.** Напишите Kotlin-класс `WidgetCacheService`, который реализует cache-aside паттерн для dashboard widget data. Используйте `RedisTemplate`. Обработайте edge case: что если Redis недоступен? (fallback на БД).

**Задание 5.3.** Реализуйте pub/sub пример: один процесс подписывается на канал уведомлений, другой публикует. Используйте `RedisMessageListenerContainer` в Spring Boot.

### Дополнительные источники
- [Redis University](https://university.redis.io/) — бесплатные курсы
- [Redis Documentation](https://redis.io/docs/) — официальные доки
- [Redis in Action](https://www.manning.com/books/redis-in-action) — книга с практикой
- [Spring Data Redis Reference](https://docs.spring.io/spring-data/redis/reference/html/) — Spring-интеграция

---

## Модуль 6: Spring Boot 4
**Длительность:** 4.5 дня | **Пререквизиты:** Модуль 3 (Kotlin)

### Зачем это в проекте
Spring Boot 4.0.5 — основной фреймворк backend'а. Все сервисы, репозитории, конфигурации и DI (Dependency Injection) работают через Spring. Понимание Spring — обязательное условие для написания любого backend-кода.

**Что нового в Spring Boot 4** (и что мы используем в проекте):
- Построен на **Spring Framework 7** и **Jakarta EE 11** — пакеты `jakarta.*`, никаких `javax.*`.
- **JSpecify null-safety** — аннотации `@Nullable` / `@NonNull` как первоклассные в API; Kotlin-null-safety через interop работает корректно без `@Nullable` из JetBrains.
- **Jackson 3** — новый major, API немного отличается (переименованы модули Kotlin/JavaTime).
- **API Versioning** как встроенная возможность (`@Version`, header/path/media-type стратегии) — пригодится для эволюции REST-эндпоинтов (OAuth callbacks, webhooks).
- **HTTP Service Clients** — декларативные клиенты из коробки, замена связке `WebClient` + ручных обёрток. Используем для Exchange Rate API (Budget widget).
- Встроенная **resilience** (retry + throttling) для HTTP-клиентов — убирает необходимость в Resilience4j для простых случаев.
- **Минимальная версия Java — 17**, **официально поддерживается до Java 25/26** — у нас JDK 25 LTS.

### Теория

**6.1. Dependency Injection и IoC-контейнер (день 1)**

DI — паттерн, при котором зависимости передаются объекту извне, а не создаются внутри. Spring управляет жизненным циклом всех объектов (beans).

```kotlin
// БЕЗ DI (плохо — жёсткая связанность):
class WorkoutService {
    private val repository = WorkoutRepository() // Сам создаёт зависимость
    private val cache = RedisCache()              // Невозможно подменить в тестах
}

// С DI (хорошо — Spring инжектит зависимости):
@Service
class WorkoutService(
    private val workoutRepository: WorkoutRepository,  // Spring подставит реализацию
    private val cacheService: WidgetCacheService        // Легко мокнуть в тестах
) {
    fun getWorkoutsForUser(userId: UUID): List<Workout> {
        return workoutRepository.findByUserId(userId)
    }
}
```

**Аннотации Spring — кто есть кто:**

```kotlin
@Component    // Базовая аннотация: "Spring, управляй этим классом"
@Service      // @Component для бизнес-логики (сервисы)
@Repository   // @Component для доступа к данным (репозитории)
@Controller   // @Component для HTTP-контроллеров (в нашем случае — DGS resolvers)
@Configuration // Класс с настройками и @Bean-методами

// @Bean — ручное создание объекта, которым управляет Spring
@Configuration
class AppConfig {
    @Bean
    fun objectMapper(): ObjectMapper = ObjectMapper()
        .registerModule(KotlinModule.Builder().build())
        .registerModule(JavaTimeModule())
}
```

**Constructor Injection (единственный способ в проекте):**

```kotlin
// ПРАВИЛЬНО — конструктор. Spring сам подставит зависимости.
// В Kotlin val в конструкторе = поля класса.
@Service
class NutritionCalculatorService(
    private val foodProductRepository: FoodProductRepository,
    private val recipeRepository: RecipeRepository
) { /* ... */ }

// НЕПРАВИЛЬНО — field injection. Запрещено в проекте.
@Service
class NutritionCalculatorService {
    @Autowired  // НЕ ИСПОЛЬЗУЙТЕ — не видно зависимостей, проблемы с тестами
    private lateinit var foodProductRepository: FoodProductRepository
}
```

**6.2. Конфигурация: application.yml и профили (день 1-2)**

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
      ddl-auto: validate  # Flyway управляет схемой, Hibernate только валидирует
    open-in-view: false     # Закрыть OSIV (Best practice)
  flyway:
    enabled: true
  data:
    redis:
      url: ${REDIS_URL:redis://localhost:6379}

server:
  port: 8080

# Кастомные свойства
app:
  exchange-rate:
    api-url: ${EXCHANGE_RATE_API_URL:https://api.exchangeratesapi.io/v1/latest}
    api-key: ${EXCHANGE_RATE_API_KEY:}
  feature-flags:
    path: ${FEATURE_FLAGS_PATH:config/features.json}
```

```kotlin
// Типобезопасная конфигурация через @ConfigurationProperties
@ConfigurationProperties(prefix = "app.exchange-rate")
data class ExchangeRateProperties(
    val apiUrl: String,
    val apiKey: String
)

// Использование
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

**Профили:**
```yaml
# application-dev.yml (для локальной разработки)
spring:
  jpa:
    show-sql: true
logging:
  level:
    com.mrurec.lifegoals: DEBUG

# application-prod.yml (для продакшена)
spring:
  jpa:
    show-sql: false
logging:
  level:
    com.mrurec.lifegoals: INFO
```

```bash
# Запуск с профилем
./gradlew bootRun --args='--spring.profiles.active=dev'
# или
SPRING_PROFILES_ACTIVE=prod java -jar app.jar
```

**6.3. REST Client и внешние API (день 2)**

```kotlin
// Spring Boot 4 предлагает декларативные HTTP Service Clients + RestClient (замена RestTemplate)
@Configuration
class RestClientConfig {
    @Bean
    fun restClient(): RestClient = RestClient.builder()
        .baseUrl("https://api.exchangeratesapi.io")
        .defaultHeader("Accept", "application/json")
        .build()
}

// Использование
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

**6.4. Обработка ошибок (день 3)**

В проекте бизнес-ошибки **НЕ бросаются** как исключения (кроме auth). Они возвращаются в GraphQL Payload:

```kotlin
// UserError — стандарт проекта для бизнес-ошибок
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

// Payload мутации всегда содержит errors
data class CreateRecipePayload(
    val recipe: Recipe?,
    val errors: List<UserError>
)

// В сервисе:
fun createRecipe(input: CreateRecipeInput, viewer: ViewerContext): CreateRecipePayload {
    // Валидация → UserError, НЕ исключение
    if (input.name.isBlank()) {
        return CreateRecipePayload(
            recipe = null,
            errors = listOf(UserError("name", "Recipe name cannot be empty", ErrorCode.VALIDATION_ERROR))
        )
    }
    
    val recipe = recipeRepository.save(input.toEntity(viewer.userId))
    return CreateRecipePayload(recipe = recipe, errors = emptyList())
}

// Исключения — только для системных ошибок и auth
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

**6.5. Security: OAuth2 + JWT (день 3-4)**

```kotlin
@Configuration
@EnableWebSecurity
class SecurityConfig {
    @Bean
    fun securityFilterChain(http: HttpSecurity): SecurityFilterChain {
        return http
            .csrf { it.disable() }  // GraphQL использует POST — CSRF не нужен
            .sessionManagement { it.sessionCreationPolicy(SessionCreationPolicy.STATELESS) }
            .oauth2ResourceServer { oauth2 ->
                oauth2.jwt { jwt ->
                    jwt.decoder(jwtDecoder())
                }
            }
            .authorizeHttpRequests { auth ->
                auth.requestMatchers("/graphql").authenticated()
                auth.requestMatchers("/graphiql").permitAll()  // Playground — только dev
                auth.anyRequest().denyAll()
            }
            .build()
    }
}

// ViewerContext — извлекается из JWT в каждом запросе
data class ViewerContext(
    val userId: UUID,
    val email: String,
    val permissions: Set<String>
)

// Используется в КАЖДОМ сервисном методе
@Service
class FoodProductService(
    private val repository: FoodProductRepository
) {
    fun getProducts(viewer: ViewerContext): List<FoodProduct> {
        // ВСЕГДА scope по viewer.userId
        return repository.findByUserId(viewer.userId)
    }
}
```

**6.6. Планировщик задач (день 4)**

```kotlin
// Обновление курсов валют каждый час
@Configuration
@EnableScheduling
class SchedulerConfig

@Component
class ExchangeRateScheduler(
    private val exchangeRateService: ExchangeRateService,
    private val widgetRepository: UserDashboardWidgetRepository
) {
    @Scheduled(fixedRate = 3600000) // Каждый час (в мс)
    fun refreshActiveExchangeRates() {
        // Найти все уникальные пары валют из конфигов Budget-виджетов
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

**6.7. Модульный монолит со Spring Modulith (день 4.5)**

Проект — это **widget-first modular monolith** (см. `CLAUDE.md` → *Architecture*). Каждый пакет верхнего уровня (`interviewprep`, `fitness`, `budget`, `dashboard`, `notification`, `common`) — модуль со строгими границами. Виджеты могут зависеть только от `common` — никогда напрямую от `repository/` или `model/` друг друга. `Spring Modulith` — инструмент, который энфорсит это правило в CI, а не в code review.

**Почему нельзя просто договориться?** Три причины:
1. **Code review не масштабируется.** Даже на проекте из 1 человека уставший пятничный merge рано или поздно пересечёт границу. CI ловит это в 100% случаев.
2. **Нет drift документации.** Modulith генерирует PlantUML-диаграммы из самого кода — диаграмма физически не может разойтись с реальностью.
3. **События заменяют скрытые связи.** Без формальной event-шины cross-module фичи (например, `notification` реагирует на `fitness.WorkoutLogged`) молча превращаются в прямые вызовы. Transactional event publication registry делает асинхронную коммуникацию дефолтом.

**Объявление модуля:**

```kotlin
// com/mrurec/lifegoals/fitness/package-info.kt
@org.springframework.modulith.ApplicationModule(
    displayName = "Fitness Widget",
    allowedDependencies = ["common"]
)
package com.mrurec.lifegoals.fitness
```

**Один тест проверяет всё:**

```kotlin
class ModularityTests {
    private val modules = ApplicationModules.of(LifeGoalsApplication::class.java)

    @Test fun `verifies module boundaries`() = modules.verify()
    // Проваливает сборку если: нелегальные cross-module импорты, циклы,
    // или если модуль экспонирует внутренности, не заявленные как public.

    @Test fun `writes documentation`() {
        Documenter(modules)
            .writeModulesAsPlantUml()              // ./build/spring-modulith-docs/
            .writeIndividualModulesAsPlantUml()
    }
}
```

**Cross-module события — без прямых зависимостей:**

```kotlin
// fitness публикует — ничего не знает о слушателях
data class WorkoutLogged(val userId: UUID, val workoutId: UUID, val at: Instant)

@Service
class WorkoutService(private val events: ApplicationEventPublisher) {
    @Transactional
    fun logWorkout(/* ... */) {
        // ... persist workout ...
        events.publishEvent(WorkoutLogged(viewer.userId, workout.id, Instant.now()))
    }
}

// notification реагирует — нулевая compile-time зависимость на internals fitness'а
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

`@ApplicationModuleListener` — ключевая штука: событие сохраняется в таблице `event_publication` внутри той же транзакции, что записала workout. Если слушатель упал или приложение крашнулось — Modulith ретраит при рестарте. Это **transactional outbox pattern**, тот же подход, что Meta/LinkedIn используют для надёжных cross-service записей, только без Kafka посередине.

**Per-module тесты:**

```kotlin
@ApplicationModuleTest                    // поднимает контекст только `fitness`
class FitnessServiceTest {
    @Autowired lateinit var workoutService: WorkoutService

    @Test fun `logWorkout publishes WorkoutLogged event`(events: PublishedEvents) {
        workoutService.logWorkout(/* ... */)
        assertThat(events.ofType(WorkoutLogged::class.java)).hasSize(1)
    }
}
```

Это в ~10× быстрее `@SpringBootTest` и доказывает, что модуль работает изолированно — контракт и события, которые он публикует, — единственное, что важно для его клиентов.

**Trade-off vs ArchUnit.** ArchUnit — library-agnostic и максимально гибкий, любое правило выразимо в DSL. Modulith приходит с готовой моделью модульного монолита: он знает, что такое модуль, цикл, и public API. Для нашего набора правил Modulith покрывает всё и даёт per-module тесты, события и авто-документацию сверху. ArchUnit оставлен в резерве для редких правил, которые Modulith не выражает (напр. глобальный бан `java.util.logging`). Полное обоснование — `docs/adr/ADR-004-module-boundary-enforcement.md`.

**FAANG-interview framing.** На вопрос «Why this architecture?» — структурированный ответ:
- **Enforcement поверх convention** — senior-level judgment.
- **Transactional event publication** — то же семейство, что Meta TAO write pipeline и LinkedIn outbox pattern, масштабированное до одного сервиса.
- **Per-module тесты** — аналог service-level изоляции в микросервисной организации.
- **Документация-как-код** — никакого Confluence drift.
- **Явный путь извлечения** — граница каждого модуля уже соответствует будущему service-контракту; локальные listener'ы становятся Kafka consumer'ами без изменения API.

### Практические задания

**Задание 6.1.** Создайте Spring Boot проект (https://start.spring.io/) с Kotlin, Web, Data JPA, PostgreSQL, Redis. Настройте `application.yml` с профилями `dev` и `prod`. Запустите и убедитесь, что сервер стартует.

**Задание 6.2.** Реализуйте `FeatureFlagService`, который читает JSON-файл с флагами и проверяет `isEnabled(flag, userId)`. Используйте `@ConfigurationProperties` для пути к файлу. Напишите тесты.

**Задание 6.3.** Реализуйте сервис `ExchangeRateService`, который: (1) проверяет Redis-кэш, (2) при cache miss вызывает внешний API через `RestClient`, (3) кэширует с TTL 1 час. Обработайте ошибки (API недоступен, Redis недоступен).

**Задание 6.4.** Настройте Spring Security с JWT. Создайте `ViewerContextExtractor`, который из JWT-токена извлекает `ViewerContext`. Напишите integration test с мокнутым JWT.

**Задание 6.5.** *Modulith TDD.* Проаннотируйте шесть пакетов верхнего уровня `@ApplicationModule`. Напишите `ModularityTests` с `ApplicationModules.verify()` — добейтесь зелёного теста. Затем умышленно добавьте импорт из `notification` в `com.mrurec.lifegoals.fitness.repository.WorkoutRepository` — тест должен упасть. Почините это через событие `WorkoutLogged` + `@ApplicationModuleListener` в `notification`. Закоммитьте сгенерированные `Documenter`-ом PlantUML-диаграммы в репозиторий. Bonus: добавьте `@ApplicationModuleTest`, проверяющий, что событие публикуется при вызове `logWorkout`.

### Дополнительные источники
- [Spring Boot Reference Documentation](https://docs.spring.io/spring-boot/docs/current/reference/html/) — официальная
- [Spring Boot with Kotlin](https://spring.io/guides/tutorials/spring-boot-kotlin/) — официальный гайд
- [Baeldung — Spring Boot](https://www.baeldung.com/spring-boot) — практические статьи
- [Spring Security Architecture](https://spring.io/guides/topicals/spring-security-architecture/) — как работает security
- [Spring Modulith Reference](https://docs.spring.io/spring-modulith/reference/) — границы модулей, события, тестирование
- [`docs/adr/ADR-004-module-boundary-enforcement.md`](adr/ADR-004-module-boundary-enforcement.md) — решение Spring Modulith vs ArchUnit

---

## Модуль 7: Spring Data JPA + Hibernate
**Длительность:** 3 дня | **Пререквизиты:** Модуль 4 (PostgreSQL), Модуль 6 (Spring Boot)

### Зачем это в проекте
Spring Data JPA — ORM-слой между Kotlin-кодом и PostgreSQL. Все entity (FoodProduct, Workout, Transaction) и репозитории используют JPA. Правильное использование JPA критично для производительности (N+1 проблема, ленивая загрузка).

### Теория

**7.1. Entity — маппинг таблиц на Kotlin-классы (день 1)**

```kotlin
// Entity = класс, отображённый на таблицу в PostgreSQL
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

// Связи между Entity

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
    
    @ManyToOne(fetch = FetchType.LAZY)  // LAZY = загружать по требованию
    @JoinColumn(name = "recipe_id")
    val recipe: Recipe,
    
    @Column(name = "food_product_id", nullable = false)
    val foodProductId: UUID,  // Только ID — для DataLoader'а!
    
    @Column(name = "weight_grams", nullable = false)
    var weightGrams: Double
)
```

**ВАЖНО про FetchType:**
- `FetchType.LAZY` (по умолчанию для `@ManyToOne` в JPA 2+) — загружает данные только при обращении. **Предпочтительно.**
- `FetchType.EAGER` — загружает сразу. **Избегайте** — приводит к N+1.
- В проекте: храните только `foreignKeyId` (UUID) и используйте **DataLoader** для batch-загрузки.

**7.2. Repository — доступ к данным (день 1-2)**

```kotlin
// Spring Data JPA генерирует реализацию по имени метода!
interface FoodProductRepository : JpaRepository<FoodProduct, UUID> {
    
    // Spring генерирует SQL: SELECT * FROM food_product WHERE user_id = ?
    fun findByUserId(userId: UUID): List<FoodProduct>
    
    // Сложнее: SELECT * FROM food_product WHERE user_id = ? AND name ILIKE ?
    fun findByUserIdAndNameContainingIgnoreCase(userId: UUID, name: String): List<FoodProduct>
    
    // С пагинацией (для DataLoader batch-запросов)
    fun findByUserIdAndIdIn(userId: UUID, ids: Collection<UUID>): List<FoodProduct>
    
    // Cursor-based пагинация через @Query
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
    
    // Первая страница (без курсора)
    @Query("""
        SELECT fp FROM FoodProduct fp
        WHERE fp.userId = :userId
        ORDER BY fp.createdAt DESC, fp.id DESC
    """)
    fun findFirstPage(
        @Param("userId") userId: UUID,
        pageable: Pageable
    ): List<FoodProduct>
    
    // Подсчёт
    fun countByUserId(userId: UUID): Long
    
    // Существует ли
    fun existsByUserIdAndName(userId: UUID, name: String): Boolean
    
    // Нативный SQL (когда JPQL не хватает)
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

// Projection — для запросов, возвращающих не всю Entity
interface HeatMapProjection {
    fun getDay(): LocalDate
    fun getCount(): Int
}
```

**7.3. Транзакции (день 2)**

```kotlin
@Service
class MealLoggingService(
    private val mealRepository: MealRepository,
    private val mealEntryRepository: MealEntryRepository,
    private val nutritionCalculator: NutritionCalculatorService
) {
    // @Transactional — все операции внутри метода = одна транзакция
    // Если что-то бросит исключение → всё откатится
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
    
    // readOnly = true — оптимизация для запросов чтения
    @Transactional(readOnly = true)
    fun getMealsForDate(userId: UUID, date: LocalDate): List<Meal> {
        return mealRepository.findByUserIdAndDate(userId, date)
    }
}
```

**7.4. JSONB в JPA (день 3)**

```kotlin
// Маппинг JSONB-поля (widget config)
@Entity
@Table(name = "user_dashboard_widget")
class UserDashboardWidget(
    @Id val id: UUID = UUID.randomUUID(),
    @Column(name = "user_id") val userId: UUID,
    @Column(name = "widget_type") val widgetType: String,
    var position: Int,
    
    @Type(JsonType::class)  // Hibernate-types для JSONB
    @Column(columnDefinition = "jsonb")
    var config: Map<String, Any> = emptyMap(),
    
    @Column(name = "created_at") val createdAt: Instant = Instant.now()
)

// Или с типизированным конфигом:
@Type(JsonType::class)
@Column(columnDefinition = "jsonb")
var config: JsonNode = objectMapper.createObjectNode()
```

### Практические задания

**Задание 7.1.** Создайте Entity и Repository для Fitness-модуля: `Workout`, `ExerciseSet`, `BodyMeasurement`. Используйте `@OneToMany`/`@ManyToOne` для связи Workout → ExerciseSet. Напишите query methods для поиска по userId и датам.

**Задание 7.2.** Реализуйте cursor-based пагинацию в `CodingProblemRepository`: метод `findProblemsPage(userId, first, afterCursor)`, возвращающий `Connection<CodingProblem>`. Не забудьте `hasNextPage` (запрашивайте `first + 1`).

**Задание 7.3.** Напишите `@Transactional` сервис, который создаёт рецепт с ингредиентами за одну транзакцию. Проверьте, что при ошибке в одном из ингредиентов откатывается всё.

**Задание 7.4.** Реализуйте `UserDashboardWidgetRepository` с запросами к JSONB-полю `config`: найти все виджеты с определённой `targetCompany`, извлечь `baseCurrency` из Budget-виджетов.

### Дополнительные источники
- [Spring Data JPA Reference](https://docs.spring.io/spring-data/jpa/reference/html/) — официальная документация
- [Baeldung — JPA](https://www.baeldung.com/learn-jpa-hibernate) — практические гайды
- [Vlad Mihalcea Blog](https://vladmihalcea.com/) — лучший блог по JPA/Hibernate производительности
- [Hibernate Types](https://github.com/vladmihalcea/hypersistence-utils) — JSONB и другие типы

---

## Модуль 8: GraphQL (общая теория)
**Длительность:** 2 дня | **Пререквизиты:** понимание HTTP API

### Зачем это в проекте
GraphQL — единственный API-протокол проекта (нет REST). Фронтенд запрашивает ровно те данные, которые нужны. Модуль закладывает фундамент для DGS (backend) и Relay (frontend).

### Теория

**8.1. Что такое GraphQL и чем отличается от REST (день 1)**

REST: несколько endpoint'ов, каждый возвращает фиксированную структуру:
```
GET /api/users/123             → { id, name, email, avatar, settings, ... }
GET /api/users/123/workouts    → [{ id, type, duration, ... }]
GET /api/users/123/meals       → [{ id, date, entries, ... }]
```
Проблемы: overfetching (получаешь лишнее), underfetching (нужно несколько запросов), жёсткие контракты.

GraphQL: один endpoint, клиент описывает что хочет:
```graphql
# Один запрос — получить ровно нужные данные
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

**8.2. Схема и типы (день 1)**

```graphql
# Скалярные типы
# String, Int, Float, Boolean, ID
# Кастомные: DateTime, Date, JSON (объявлены в relay.graphqls)

# Object type
type FoodProduct {
  id: ID!                    # ! = обязательное (non-null)
  name: String!
  caloriesPer100g: Float!
  proteinPer100g: Float!
  carbsPer100g: Float!
  fatPer100g: Float!
  fiberPer100g: Float       # Без ! = nullable
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

# Input type (для мутаций)
input CreateFoodProductInput {
  name: String!
  caloriesPer100g: Float!
  proteinPer100g: Float = 0  # Значение по умолчанию
  carbsPer100g: Float = 0
  fatPer100g: Float = 0
  fiberPer100g: Float
}

# Interface — общий контракт
interface Node {
  id: ID!
}

# Union — тип "один из" (используется для WidgetData)
union WidgetData = InterviewPrepWidgetData | FitnessWidgetData | BudgetWidgetData
```

**8.3. Queries, Mutations, Subscriptions (день 1-2)**

```graphql
# Query — чтение данных
type Query {
  # Node interface — получить любой объект по глобальному ID
  node(id: ID!): Node
  
  # Viewer pattern — все данные через контекст текущего пользователя
  viewer: User!
  
  # Dashboard
  myDashboard: MyDashboard!
}

# Mutation — изменение данных
type Mutation {
  # Каждая мутация возвращает Payload (НИКОГДА не бросает ошибки)
  createFoodProduct(input: CreateFoodProductInput!): CreateFoodProductPayload!
  logMeal(input: LogMealInput!): LogMealPayload!
  logWorkout(input: LogWorkoutInput!): LogWorkoutPayload!
  addWidgetToDashboard(input: AddWidgetInput!): AddWidgetPayload!
}

# Payload — результат мутации
type CreateFoodProductPayload {
  product: FoodProduct        # null при ошибке
  errors: [UserError!]!       # Пустой при успехе
}

type UserError {
  field: String               # Поле с ошибкой (для подсветки в форме)
  message: String!            # Человеко-читаемое описание
  code: ErrorCode!            # Машино-читаемый код
}

# Subscription — real-time обновления через WebSocket
type Subscription {
  notificationReceived: Notification!
  dashboardWidgetUpdated(widgetId: ID!): WidgetData!
}
```

**8.4. Relay Connection Pattern (день 2)**

Стандарт пагинации в проекте. Никакого offset/limit!

```graphql
# Connection = список с курсорной пагинацией
type CodingProblemConnection {
  edges: [CodingProblemEdge!]!   # Массив "обёрток" вокруг элементов
  pageInfo: PageInfo!             # Мета-информация о страницах
  totalCount: Int!                # Общее количество (для UI)
}

type CodingProblemEdge {
  node: CodingProblem!            # Сам элемент
  cursor: String!                 # Уникальный курсор для этого элемента
}

type PageInfo {
  hasNextPage: Boolean!
  hasPreviousPage: Boolean!
  startCursor: String
  endCursor: String
}

# Использование в Query
type Query {
  codingProblems(
    first: Int         # Количество элементов
    after: String      # Курсор "после которого"
    filter: CodingProblemFilter
  ): CodingProblemConnection!
}

# Запрос с пагинацией:
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
      endCursor          # Передать как "after" для следующей страницы
    }
    totalCount
  }
}
```

**8.5. Директивы: @defer и фрагменты (день 2)**

```graphql
# @defer — отложить загрузку тяжёлой части
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
# Сервер сначала отправляет id/type/position, затем (позже) data

# Fragments — переиспользуемые куски запроса
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

### Практические задания

**Задание 8.1.** Нарисуйте GraphQL-схему для одного виджета на выбор (Interview Prep, Fitness, или Budget). Включите: типы, input types, queries с Connection-пагинацией, mutations с Payload-паттерном.

**Задание 8.2.** Используйте любой GraphQL playground (Apollo Sandbox, GraphiQL) с публичным API (например, GitHub GraphQL API). Напишите: query с вложенными полями, query с пагинацией (first/after), mutation.

**Задание 8.3.** Объясните своими словами (письменно): почему в проекте **запрещены** offset-пагинация и throwing-ошибки в мутациях. Приведите конкретные примеры проблем, которые эти паттерны вызвали бы.

### Дополнительные источники
- [GraphQL Official Learn](https://graphql.org/learn/) — спецификация
- [How to GraphQL](https://www.howtographql.com/) — бесплатный курс
- [Relay Connection Specification](https://relay.dev/graphql/connections.htm) — формальная спецификация
- [Production Ready GraphQL](https://book.productionreadygraphql.com/) — книга по best practices

---

## Модуль 9: Netflix DGS (GraphQL на backend)
**Длительность:** 3 дня | **Пререквизиты:** Модуль 6 (Spring Boot), Модуль 8 (GraphQL)

### Зачем это в проекте
Netflix DGS — GraphQL-фреймворк, используемый в проекте для реализации серверной части API. Все резолверы, DataLoader'ы и подписки построены на DGS. Это тот же фреймворк, что используется в Netflix и Meta.

### Теория

**9.1. Schema-first подход (день 1)**

DGS генерирует Java/Kotlin-типы из `.graphqls` файлов. Схема — источник истины.

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

После `./gradlew generateJava` DGS создаёт Kotlin data-классы в `build/generated/`.

**9.2. Резолверы (день 1)**

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

// Child resolver — для полей, требующих отдельной загрузки
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

**9.3. DataLoaders — предотвращение N+1 (день 2)**

DataLoader — ключевой паттерн проекта. Без него каждый workout загружал бы exercises отдельным запросом.

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

// КАК ЭТО РАБОТАЕТ:
// 1. GraphQL запрос: workouts(first: 20) { exercises { ... } }
// 2. DGS вызывает workouts resolver → возвращает 20 Workout
// 3. Для каждого Workout вызывается exercises resolver
// 4. НО: DataLoader накапливает все 20 workout.id
// 5. Один SQL: SELECT * FROM exercise_set WHERE workout_id IN (id1, id2, ..., id20)
// 6. Вместо 20 запросов — 1 батч-запрос!
```

**9.4. Subscriptions через WebSocket (день 3)**

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

### Практические задания

**Задание 9.1.** Создайте `.graphqls` схему и DGS-резолверы для FoodProduct: query `foodProducts(first, after, search)` с Connection-пагинацией и mutation `createFoodProduct(input)` с Payload-паттерном.

**Задание 9.2.** Реализуйте DataLoader для RecipeIngredient → FoodProduct. Напишите тест, проверяющий что для 10 ингредиентов выполняется только 1 SQL-запрос (логируйте SQL).

**Задание 9.3.** Настройте DGS Subscription для `dashboardWidgetUpdated`. При мутации `logWorkout` публикуйте обновлённые данные Fitness-виджета через Redis pub/sub.

### Дополнительные источники
- [Netflix DGS Documentation](https://netflix.github.io/dgs/) — официальная
- [DGS Examples](https://github.com/Netflix/dgs-examples-kotlin) — Kotlin-примеры от Netflix
- [GraphQL DataLoader Pattern](https://github.com/graphql/dataloader) — спецификация
- [DGS Framework GitHub](https://github.com/Netflix/dgs-framework) — исходники

---

## Модуль 10: React 19
**Длительность:** 4 дня | **Пререквизиты:** Модуль 2 (TypeScript), HTML/CSS

### Зачем это в проекте
React 19.2 — UI-фреймворк проекта. Все виджеты, формы, страницы — это React-компоненты. Suspense и Error Boundaries обязательны для загрузки данных через Relay.

**Что нового в React 19 / 19.2** (и что стоит использовать в проекте):
- **Server Components** (стабильно) — компоненты, которые рендерятся на сервере без отправки JS в браузер. Подходят для тяжёлых «read-only» секций дашборда (static history, readiness score).
- **Actions** — функции, которые автоматически управляют pending/error/optimistic state через `useActionState` и `useFormStatus`. Заменяют ручное `useState(false)` для `isSubmitting` во всех формах виджетов (добавление транзакции, логирование meal, update config).
- **`use()` hook** — для чтения промисов и контекстов прямо в рендере; хорошо сочетается с `Suspense`.
- **`useOptimistic`** — встроенный optimistic UI; Relay уже делает это для GraphQL, но `useOptimistic` пригодится для локальных состояний (reorder виджетов на дашборде).
- **Activity API** (19.2, стабильно) — `<Activity mode="hidden">` размонтирует эффекты, но сохраняет DOM; идеально для скрытых табов конфигурации виджета.
- **Batched Suspense reveal** (19.2) — сервер-рендеренные Suspense boundaries раскрываются пачкой за короткое окно, уменьшая layout shift.
- **Ref as prop** — больше не нужен `forwardRef` для function components.
- **Document metadata** — `<title>`, `<meta>`, `<link>` прямо в JSX, без `react-helmet`.

### Теория

**10.1. Компоненты и JSX (день 1)**

```tsx
// Функциональный компонент (единственный стиль в проекте)
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

**10.2. Хуки (день 1-2)**

```tsx
// useState — локальное состояние
const [meals, setMeals] = useState<Meal[]>([]);
const [isLoading, setIsLoading] = useState(false);

// useEffect — побочные эффекты
useEffect(() => {
  // Запуск при монтировании
  return () => {
    // Очистка при размонтировании
  };
}, []); // [] = только при монтировании

useEffect(() => {
  // Запуск при изменении selectedDate
}, [selectedDate]);

// useCallback — мемоизация функции
const handleSelect = useCallback((productId: string) => {
  setSelectedProduct(productId);
}, []); // Стабильная ссылка

// useMemo — мемоизация значения
const totalCalories = useMemo(() => {
  return meals.reduce((sum, meal) => sum + meal.calories, 0);
}, [meals]); // Пересчитать только при изменении meals

// useRef — мутабельная ссылка (не вызывает re-render)
const inputRef = useRef<HTMLInputElement>(null);
const timerRef = useRef<NodeJS.Timeout | null>(null);

// Custom hooks (переиспользуемая логика)
function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState(value);
  
  useEffect(() => {
    const timer = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);
  
  return debouncedValue;
}
```

**10.3. Suspense и Error Boundaries (день 3)**

Обязательный паттерн в проекте для каждого async-компонента:

```tsx
// Error Boundary (class component — единственное исключение для классов)
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

// Suspense — показывает fallback пока данные загружаются
// Обязательная обёртка: ErrorBoundary > Suspense > Component
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

**10.4. Паттерны композиции (день 3-4)**

```tsx
// Compound Components — для связанных компонентов
const NutritionSummary: React.FC<{ date: Date }> & {
  MacroBar: typeof MacroBar;
  CalorieRing: typeof CalorieRing;
} = ({ date }) => { /* ... */ };

NutritionSummary.MacroBar = MacroBar;
NutritionSummary.CalorieRing = CalorieRing;

// Render Props (редко, но полезно)
interface ConnectionRendererProps<T> {
  connection: Connection<T>;
  renderItem: (item: T) => React.ReactNode;
  renderEmpty: () => React.ReactNode;
}

// Controlled vs Uncontrolled
// Controlled: значение в state
const [search, setSearch] = useState('');
<input value={search} onChange={e => setSearch(e.target.value)} />

// Uncontrolled: значение в DOM
const searchRef = useRef<HTMLInputElement>(null);
<input ref={searchRef} defaultValue="" />
```

### Практические задания

**Задание 10.1.** Создайте компонент `FoodProductCard` с props: product, onSelect, showNutrition. Используйте CSS Modules для стилей. Добавьте условный рендеринг (показывать/скрывать nutrition info).

**Задание 10.2.** Реализуйте custom hook `usePagination(fetchMore, pageInfo)`, который управляет состоянием пагинации и возвращает `{ loadMore, hasMore, isLoading }`.

**Задание 10.3.** Создайте `DashboardGrid` с ErrorBoundary + Suspense обёрткой для каждого виджета. Симулируйте async-загрузку с помощью `React.lazy` и проверьте fallback.

**Задание 10.4.** Реализуйте форму `AddMealEntryForm` с controlled-компонентами: поиск продукта (debounced), выбор порции, отображение расчёта калорий в реальном времени.

### Дополнительные источники
- [React Official Docs](https://react.dev/) — новая документация (2023+)
- [React TypeScript Cheatsheet](https://react-typescript-cheatsheet.netlify.app/) — TS + React паттерны
- [Patterns.dev — React Patterns](https://www.patterns.dev/react) — паттерны проектирования
- [Epic React (Kent C. Dodds)](https://epicreact.dev/) — продвинутый курс

---

## Модуль 11: CSS Modules + Vite
**Длительность:** 1.5 дня | **Пререквизиты:** Модуль 10 (React), базовый CSS

### Зачем это в проекте
CSS Modules обеспечивают изоляцию стилей — классы автоматически получают уникальные имена, исключая конфликты. Vite 8 — сборщик с мгновенной перезагрузкой (HMR).

**Что нового в Vite 8** (и что мы получаем в проекте):
- **Rolldown-бандлер** на Rust заменил Rollup/esbuild — **10-30× быстрее** production-билды, одно решение и для dev-сервера, и для сборки (раньше Vite использовал esbuild в dev и Rollup в build — два разных рантайма).
- Plugin API полностью совместим с Rollup-плагинами, миграция не требует изменений.
- Улучшенное SSR API и встроенная поддержка Server Components React 19.
- HMR стал ещё точнее — инвалидация по графу модулей без каскадных перезагрузок.

### Теория

**11.1. CSS Modules (день 1)**

```css
/* FoodProductCard.module.css — коллоцирован с компонентом */
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

/* Композиция через composes */
.highlightedCard {
  composes: card;
  border-color: var(--accent-color);
}
```

```tsx
// Импорт как объект — TypeScript знает ключи
import styles from './FoodProductCard.module.css';

const FoodProductCard: React.FC<Props> = ({ product }) => (
  <div className={styles.card}>
    <span className={styles.name}>{product.name}</span>
    <div className={styles.nutrition}>
      <div className={styles.macroValue}>{product.caloriesPer100g} kcal</div>
    </div>
  </div>
);

// Несколько классов
<div className={`${styles.card} ${isSelected ? styles.selected : ''}`}>

// CSS-переменные для темизации
// :root в глобальном CSS
// --bg-primary, --text-primary, --accent-color, etc.
```

**11.2. Vite (день 1)**

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
      '/graphql': 'http://localhost:8080',     // Проксирование API
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

### Практические задания

**Задание 11.1.** Создайте Vite + React + TypeScript проект. Настройте CSS Modules с camelCase. Создайте компонент `WidgetCard` со стилями из модуля. Проверьте что классы уникальны в DOM.

**Задание 11.2.** Реализуйте тему (light/dark) через CSS-переменные `:root` и `[data-theme="dark"]`. Компонент `ThemeToggle` переключает атрибут на `<html>`.

### Дополнительные источники
- [CSS Modules GitHub](https://github.com/css-modules/css-modules) — спецификация
- [Vite Documentation](https://vite.dev/) — официальные доки
- [CSS-Tricks: CSS Modules](https://css-tricks.com/css-modules-part-1-need/) — вводная статья

---

## Модуль 12: Relay
**Длительность:** 4 дня | **Пререквизиты:** Модуль 8 (GraphQL), Модуль 10 (React)

### Зачем это в проекте
Relay — GraphQL-клиент от Meta, используемый в Facebook, Instagram и в нашем проекте. Обеспечивает Fragment Colocation (фрагменты рядом с компонентами), автоматическую нормализацию кэша и type-safe data fetching.

### Теория

**12.1. Fragment Colocation — главный принцип (день 1)**

```tsx
// ПРАВИЛО ПРОЕКТА: Каждый компонент объявляет свой фрагмент В ТОМ ЖЕ ФАЙЛЕ
// Именование: ComponentName_fieldName

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
  product: FoodProductCard_product$key;  // Тип из Relay compiler
}

const FoodProductCard: React.FC<Props> = ({ product }) => {
  const data = useFragment(fragment, product);
  // data — типизирован: { id: string, name: string, caloriesPer100g: number, ... }
  
  return (
    <div className={styles.card}>
      <h3>{data.name}</h3>
      <span>{data.caloriesPer100g} kcal/100g</span>
    </div>
  );
};
```

**12.2. Queries и useLazyLoadQuery (день 1-2)**

```tsx
// DashboardPage.tsx — страница, загружающая данные
import { graphql, useLazyLoadQuery } from 'react-relay';
import type { DashboardPageQuery } from './__generated__/DashboardPageQuery.graphql';

const query = graphql`
  query DashboardPageQuery {
    myDashboard {
      widgets {
        id
        type
        position
        ...WidgetContainer_widget    # Спред фрагмента дочернего компонента
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

**12.3. Pagination с usePaginationFragment (день 2)**

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

**12.4. Mutations (день 3)**

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
          // Показать ошибки пользователю
          setErrors(response.logWorkout.errors);
        } else {
          // Успех — Relay автоматически обновит кэш
          navigate('/dashboard');
        }
      },
      onError: (error) => {
        // Сетевая ошибка
        console.error(error);
      }
    });
  };
  
  return <form onSubmit={handleSubmit}>...</form>;
};
```

**12.5. Relay Environment и компилятор (день 4)**

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
# Relay compiler — запускать после изменения .graphqls или компонентов
npm run relay
# Генерирует __generated__/ файлы с типами
```

### Практические задания

**Задание 12.1.** Создайте `RecipeCard` с фрагментом `RecipeCard_recipe`. Включите вложенный фрагмент `RecipeIngredientRow_ingredient`. Настройте Relay compiler и убедитесь, что типы генерируются.

**Задание 12.2.** Реализуйте пагинированный список `FoodProductList` с `usePaginationFragment`. Добавьте кнопку "Load More" и отображение totalCount.

**Задание 12.3.** Реализуйте мутацию `CreateFoodProduct` с формой, обработкой ошибок из Payload и optimistic update (добавление в список до ответа сервера).

**Задание 12.4.** Настройте `RelayEnvironment.ts` с поддержкой WebSocket subscriptions для получения уведомлений в реальном времени.

### Дополнительные источники
- [Relay Documentation](https://relay.dev/) — официальная
- [Relay Tutorial](https://relay.dev/docs/tutorial/intro/) — пошаговый гайд
- [Thinking in Relay](https://relay.dev/docs/principles-and-architecture/thinking-in-relay/) — философия
- [Relay Examples](https://github.com/relayjs/relay-examples) — примеры от Meta

---

## Модуль 13: Jotai
**Длительность:** 1.5 дня | **Пререквизиты:** Модуль 10 (React)

### Зачем это в проекте
Jotai — atom-based state management, идейный преемник Recoil. Заменяет Redux/Context для глобального состояния (тема, пользователь, уведомления). Атомы гранулярны — компоненты подписываются только на нужные данные.

**Почему Jotai, а не Recoil:** Recoil архивирован upstream (Facebook прекратил разработку) и не поддерживает concurrent-рендеринг React 18/19. Jotai реализует ту же модель атомов/селекторов, но:
- Атом определяется одним вызовом `atom(defaultValue)` — без обязательного `key`, идентичность по ссылке.
- Полная совместимость с concurrent rendering и React 19 Server Components.
- Меньше boilerplate: `useAtom(a)`, `useAtomValue(a)`, `useSetAtom(a)` вместо пяти хуков Recoil.
- Derived atoms заменяют селекторы — единая концепция.

### Теория

**13.1. Atoms (день 1)**

```tsx
// jotai/atoms/userAtom.ts
import { atom } from 'jotai';

interface UserState {
  id: string;
  email: string;
  name: string;
}

// Primitive atom — без key, идентичность по ссылке на атом
export const userAtom = atom<UserState | null>(null);

export const themeAtom = atom<'light' | 'dark'>('light');

export const notificationCountAtom = atom<number>(0);

// Использование в компоненте
import { useAtom, useAtomValue, useSetAtom } from 'jotai';

const UserProfile: React.FC = () => {
  const [user, setUser] = useAtom(userAtom);             // read + write
  const theme = useAtomValue(themeAtom);                 // read only (не триггерит ре-рендер при записи)
  const setNotifications = useSetAtom(notificationCountAtom); // write only (не подписывается на чтение)

  return <div>{user?.name}</div>;
};
```

**13.2. Derived atoms — производные данные (день 1)**

В Jotai нет отдельной сущности «selector» — любой `atom`, принимающий функцию `(get) => value`, становится derived.

```tsx
// jotai/derived/auth.ts
import { atom } from 'jotai';
import { userAtom, notificationCountAtom } from '../atoms/userAtom';

// Read-only derived atom (эквивалент Recoil selector)
export const isLoggedInAtom = atom((get) => get(userAtom) !== null);

export const hasUnreadNotificationsAtom = atom(
  (get) => get(notificationCountAtom) > 0
);

// Writable derived atom — с get + set (эквивалент Recoil selector с set)
export const userDisplayNameAtom = atom(
  (get) => get(userAtom)?.name ?? 'Guest',
  (get, set, newName: string) => {
    const u = get(userAtom);
    if (u) set(userAtom, { ...u, name: newName });
  }
);
```

**13.3. atomFamily — параметризованные атомы (день 1)**

```tsx
import { atomFamily } from 'jotai/utils';

// Эквивалент Recoil atomFamily
export const widgetExpandedAtom = atomFamily((widgetId: string) =>
  atom(true)
);

// Использование: для каждого widgetId — свой атом (кэшируется по параметру)
const [expanded, setExpanded] = useAtom(widgetExpandedAtom(widget.id));
```

**13.4. Async atoms + Suspense (день 2)**

Для большинства серверных данных используем Relay, но для non-GraphQL источников (например, локальных preferences, feature flags из local endpoint) Jotai async atoms прекрасно интегрируются с `<Suspense>`:

```tsx
export const featureFlagsAtom = atom(async () => {
  const res = await fetch('/api/flags');
  return res.json() as Promise<Record<string, boolean>>;
});

// Компонент автоматически триггерит Suspense fallback
const FlagView = () => {
  const flags = useAtomValue(featureFlagsAtom); // Promise разрешается в данные
  return <pre>{JSON.stringify(flags, null, 2)}</pre>;
};
```

**13.5. atomWithStorage — персистентность (день 2)**

Полезно для темы и collapsed-состояния сайдбара (как альтернатива localStorage, но через Jotai):

```tsx
import { atomWithStorage } from 'jotai/utils';
export const themeAtom = atomWithStorage<'light' | 'dark'>('theme', 'light');
```

> В самом фронте Life Goals использование `localStorage` запрещено (см. CLAUDE.md §9 Common Pitfalls), но `atomWithStorage` допустим для UI-preferences, которые не трогают доменные данные.

### Миграция с Recoil (шпаргалка)

| Recoil | Jotai |
|---|---|
| `atom({ key, default })` | `atom(default)` |
| `useRecoilState(a)` | `useAtom(a)` |
| `useRecoilValue(a)` | `useAtomValue(a)` |
| `useSetRecoilState(a)` | `useSetAtom(a)` |
| `selector({ key, get })` | `atom((get) => …)` |
| `selector({ key, get, set })` | `atom((get) => …, (get, set, v) => …)` |
| `atomFamily({ key, default })` | `atomFamily((param) => atom(default))` |
| `<RecoilRoot>` | `<Provider>` (опционально — Jotai работает и без него) |

### Практические задания

**Задание 13.1.** Создайте атомы для: user, theme, sidebarCollapsed, activeWidgetId. Создайте derived atom `dashboardLayoutAtom`, вычисляющий layout на основе темы и sidebar.

**Задание 13.2.** Реализуйте `ThemeProvider` + `ThemeToggle` с Jotai + `atomWithStorage`. При переключении темы обновляйте CSS-переменные на `document.documentElement`.

**Задание 13.3.** Реализуйте `widgetExpandedAtom` через `atomFamily`. Убедитесь, что изменение одного виджета не триггерит ре-рендер остальных (используйте React DevTools Profiler).

### Дополнительные источники
- [Jotai Documentation](https://jotai.org/) — официальная
- [Jotai Primitives](https://jotai.org/docs/core/atom) — atom, derived, writable
- [Jotai Utils](https://jotai.org/docs/utilities/storage) — atomFamily, atomWithStorage, splitAtom
- [Jotai vs Recoil Comparison](https://jotai.org/docs/basics/comparison) — официальное сравнение

---

## Модуль 14: Docker + Docker Compose
**Длительность:** 2 дня | **Пререквизиты:** базовое понимание CLI

### Зачем это в проекте
Docker используется для локальной разработки (PostgreSQL + Redis) и для production-деплоя backend'а. Docker Compose поднимает всё окружение одной командой.

### Теория

**14.1. Docker — основы (день 1)**

```dockerfile
# Dockerfile (backend)
# Multi-stage build — минимальный production-образ

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

Ключевые команды:
```bash
docker build -t life-goals-api .       # Собрать образ
docker run -p 8080:8080 life-goals-api # Запустить контейнер
docker ps                               # Список запущенных контейнеров
docker logs <container-id>              # Логи
docker exec -it <id> /bin/sh            # Зайти внутрь контейнера
docker images                           # Список образов
docker stop <id>                        # Остановить контейнер
```

**14.2. Docker Compose (день 1-2)**

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
docker-compose up -d           # Запустить всё в фоне
docker-compose down            # Остановить всё
docker-compose logs -f api     # Следить за логами api
docker-compose ps              # Статус сервисов
docker-compose up -d --build   # Пересобрать и запустить
```

**14.3. Volumes и Networks (день 2)**

```yaml
# Volumes — сохраняют данные между перезапусками
volumes:
  postgres_data:    # Named volume — данные PostgreSQL не теряются при docker-compose down

# Networks — сервисы общаются по имени
# Docker Compose создаёт сеть автоматически
# api обращается к postgres по имени "postgres", не "localhost"
```

### Практические задания

**Задание 14.1.** Напишите Dockerfile для backend (multi-stage build). Соберите образ, запустите, проверьте что `/graphiql` доступен.

**Задание 14.2.** Создайте `docker-compose.yml` с PostgreSQL, Redis и backend-сервисом. Добавьте healthcheck'и. Проверьте что после `docker-compose up -d` всё работает.

**Задание 14.3.** Добавьте `.dockerignore` (исключить `build/`, `node_modules/`, `.gradle/`). Сравните размер образа до и после.

### Дополнительные источники
- [Docker Official Docs](https://docs.docker.com/) — руководство
- [Docker Compose Docs](https://docs.docker.com/compose/) — compose-специфика
- [Docker for Java Developers](https://www.docker.com/blog/9-tips-for-containerizing-your-spring-boot-code/) — оптимизация Spring Boot

---

## Модуль 15: GitHub Actions (CI/CD)
**Длительность:** 1.5 дня | **Пререквизиты:** Модуль 1 (Git), Модуль 14 (Docker)

### Зачем это в проекте
GitHub Actions запускает тесты, линтеры и деплой автоматически при push и PR. Без зелёного CI невозможно смержить PR.

### Теория

**15.1. Workflow файлы (день 1)**

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

**15.2. Deploy workflow (день 1)**

```yaml
# .github/workflows/deploy.yml
name: Deploy

on:
  push:
    branches: [main]

jobs:
  deploy-backend:
    runs-on: ubuntu-latest
    needs: [ci]  # Зависит от CI
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

### Практические задания

**Задание 15.1.** Создайте workflow `ci.yml`, который при PR запускает backend-тесты с PostgreSQL и Redis сервисами, и frontend-тесты с Relay compiler.

**Задание 15.2.** Добавьте caching (Gradle, npm). Измерьте время билда до и после.

### Дополнительные источники
- [GitHub Actions Documentation](https://docs.github.com/en/actions) — официальная
- [GitHub Actions Marketplace](https://github.com/marketplace?type=actions) — готовые actions
- [Starter Workflows](https://github.com/actions/starter-workflows) — шаблоны

---

## Модуль 16: Тестирование (полный стек)
**Длительность:** 4 дня | **Пререквизиты:** все предыдущие модули

### Зачем это в проекте
Тестирование — обязательная часть каждого PR. Покрытие: >80% для сервисов, все queries/mutations, все пользовательские взаимодействия. Без зелёных тестов PR не мержится.

### Теория

**16.1. Backend: JUnit 5 + MockK (день 1)**

```kotlin
// Unit-тест сервиса
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

**16.2. Integration Tests: Testcontainers (день 2)**

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

**16.3. DGS GraphQL тесты (день 2)**

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

**16.4. Frontend: React Testing Library (день 3)**

```tsx
// FoodProductCard.test.tsx (коллоцирован с компонентом)
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

**16.5. E2E: Playwright (день 4)**

```typescript
// e2e/meal-logging.spec.ts
import { test, expect } from '@playwright/test';

test.describe('Meal Logging', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/dashboard');
    // Авторизация через fixture
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

### Практические задания

**Задание 16.1.** Напишите unit-тесты для `SpacedRepetitionService`: проверьте расчёт нового интервала для quality = 5 (solved fast), quality = 1 (gave up), edge case — easeFactor не опускается ниже 1.3.

**Задание 16.2.** Напишите integration-тест с Testcontainers для `MealEntryRepository`: создайте несколько записей, проверьте cursor-based пагинацию (first page, next page, hasNextPage).

**Задание 16.3.** Напишите React Testing Library тесты для `AddMealEntryForm`: ввод поиска → показ результатов → выбор продукта → ввод порции → отображение калорий → submit.

**Задание 16.4.** Напишите Playwright E2E-тест: полный flow создания виджета на dashboard (Add Widget → Choose Type → Fill Config → Submit → Widget appears).

### Дополнительные источники
- [JUnit 5 User Guide](https://junit.org/junit5/docs/current/user-guide/) — официальная
- [MockK Documentation](https://mockk.io/) — Kotlin-мокирование
- [Testcontainers for Java](https://www.testcontainers.org/) — integration testing
- [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/) — frontend тесты
- [Playwright Documentation](https://playwright.dev/) — E2E тесты
- [DGS Testing Guide](https://netflix.github.io/dgs/query-execution-testing/) — тесты GraphQL

---

## Модуль 17: Интеграция + Meta Interview Prep
**Длительность:** 5 дней | **Пререквизиты:** Все модули 1-16

### Зачем это в проекте
Модуль 17 объединяет все знания из предыдущих 16 модулей в единую картину. Здесь вы создадите полноценный новый виджет с нуля (Reading Tracker), пройдя все слои от Flyway-миграции до React-компонента с Relay. Также разберёте архитектурные решения проекта на уровне, достаточном для обсуждения на собеседовании в Meta.

### Теория

**17.1. Почему именно эти технологии (Architecture Decisions)**

Каждый выбор технологии в проекте имеет обоснование, которое можно использовать на собеседовании:

- **Kotlin vs Java:** Null safety, data classes, coroutines, лаконичность. При этом 100% совместимость с Java-экосистемой Spring.
- **GraphQL/DGS vs REST:** Fragment colocation, @defer, type safety. DGS выбран как Netflix-решение поверх Spring Boot с DataLoader поддержкой из коробки.
- **Relay vs Apollo:** Relay enforces best practices (persisted queries, fragment colocation, cursor pagination). Apollo более гибкий, но Relay — это стандарт Meta.
- **PostgreSQL + JSONB vs MongoDB:** Реляционная модель для структурированных данных + JSONB для гибких полей (config, tags). Лучшее из двух миров.
- **Redis dual-use:** Cache (cache-aside/write-through) + pub/sub для GraphQL Subscriptions. Один сервис — две роли.
- **Modular Monolith vs Microservices:** На старте — монолит с энфорсимыми границами модулей (Spring Modulith). Мы отвергли микросервисы (команда = 1, operational overhead, distributed-tracing debt, нет давления на шардирование) **и** отвергли «просто пакеты» (дрейф границ, случайные N+1 зависимости, нет изолированного тестирования). Modulith даёт нам: CI-энфорсмент границ пакетов, **transactional event publication registry** для cross-module коммуникации (то же семейство, что Meta TAO write pipeline / LinkedIn outbox pattern), per-module тесты через `@ApplicationModuleTest`, и авто-генерируемую PlantUML документацию. Путь извлечения явный: граница каждого модуля уже соответствует будущему service-контракту; `@ApplicationModuleListener` становится Kafka consumer'ом без изменения API. Trade-off vs ArchUnit — см. `docs/adr/ADR-004-module-boundary-enforcement.md`.

**17.2. End-to-End: Новый виджет за 10 шагов**

Пошаговое руководство по созданию Reading Tracker Widget от базы данных до UI. Подробное руководство с кодом доступно в [HTML-версии модуля](study-plans/17-integration.html).

1. Flyway-миграция (book + reading_session)
2. JPA Entity + Repository с cursor-пагинацией
3. GraphQL-схема (types, connections, mutations с Payload)
4. DGS-резолверы (query, mutation, child field)
5. DataLoaders (ReadingSessionsByBookLoader)
6. BookService + ReadingCacheService
7. Backend-тесты (unit + integration + DGS)
8. Relay-компоненты (BookCard с fragment, BookList с usePaginationFragment)
9. Mutations + 3-уровневая обработка ошибок
10. Frontend-тесты с relay-test-utils

**17.3. Cross-cutting concerns**

- ViewerContext: полный путь от JWT → SecurityContext → DGS → Service → Repository
- Error handling: таблица стратегий по слоям (validation → Payload, auth → GraphQL error, system → logged + generic)
- CursorCodec: encode/decode, почему Base64
- Enum mapping: GraphQL ↔ Kotlin ↔ TypeScript
- Cache invalidation: когда и какие ключи инвалидировать

**17.4. Meta Interview Q&A**

Пять развёрнутых вопросов и ответов для подготовки к system design и coding round интервью. Подробности — в [HTML-версии](study-plans/17-integration.html).

**Bonus Q — масштабирование команды, а не трафика:**

> **Q:** Как бы вы масштабировали этот проект с 1 до N команд на одном репозитории, не замедляя их друг относительно друга?
>
> **A:** Три рычага, уже заложенных в архитектуре:
> 1. **Энфорсимые границы модулей (Spring Modulith).** Команда A физически не может случайно заимпортить internals команды B — CI упадёт. Это убирает главный источник трения в multi-team monorepo: связь через «общие» внутренности, которые должны были быть приватными.
> 2. **События как дефолтный cross-module контракт.** `@ApplicationModuleListener` + transactional event publication registry → команды коммуницируют через задокументированные типы событий, а не прямые вызовы. Temporal decoupling → независимый release cadence, тривиально мокаются в тестах.
> 3. **Per-module тесты (`@ApplicationModuleTest`).** CI каждой команды быстрый, потому что поднимается только их модуль. Это Meta/Google monorepo-гигиена, применённая в меньшем масштабе.
>
> Когда один модуль становится hotspot'ом (трафик, размер команды, частота деплоя), его извлекают: граница уже является контрактом, события уже асинхронные, миграция — механическая. Именно это — явная причина выбора Modulith против ArchUnit, см. `docs/adr/ADR-004`.

### Практические задания

**Задание 17.1.** Реализуйте Reading Tracker Widget (10 шагов из §17.2). Каждый шаг — отдельный коммит с правильным conventional commit message.

**Задание 17.2.** Подготовьте 5-минутный рассказ об архитектуре проекта: почему GraphQL+Relay, почему модульный монолит, как бы вы масштабировали на 100x пользователей.

**Задание 17.3.** Реализуйте все три WidgetProvider (InterviewPrepWidgetProvider, FitnessWidgetProvider, BudgetWidgetProvider) — валидация config, resolve с ViewerContext, Spring auto-registration. TDD-тесты доступны в [HTML study plan](study-plans/17-integration.html#backlog-tasks).

**Задание 17.4.** Создайте onboarding flow: пустой dashboard → выбор виджета → форма конфига → первый виджет появляется. Тесты — в HTML-версии модуля.

### Дополнительные источники
- [HTML-версия модуля 17](study-plans/17-integration.html) — полный код всех шагов + TDD-тесты из backlog
- [Meta Engineering Blog](https://engineering.fb.com/) — статьи о Relay, GraphQL, инфраструктуре
- [Netflix DGS Examples](https://github.com/Netflix/dgs-examples-kotlin) — примеры паттернов
- [Relay Documentation](https://relay.dev/) — официальная документация

---

## Итоговая таблица

| # | Модуль | Дни | Пререквизиты |
|---|--------|-----|---------------|
| 1 | Git & Git Flow | 2 | — |
| 2 | TypeScript | 3 | Базовый JS |
| 3 | Kotlin | 4 | Любой ООП-язык |
| 4 | PostgreSQL + Flyway | 3 | Базовые БД |
| 5 | Redis | 2 | Модуль 4 |
| 6 | Spring Boot 4 (в т.ч. Spring Modulith) | 4.5 | Модуль 3 |
| 7 | Spring Data JPA + Hibernate | 3 | Модули 4, 6 |
| 8 | GraphQL (теория) | 2 | HTTP API |
| 9 | Netflix DGS | 3 | Модули 6, 8 |
| 10 | React 19 | 4 | Модуль 2, HTML/CSS |
| 11 | CSS Modules + Vite 8 | 1.5 | Модуль 10, CSS |
| 12 | Relay | 4 | Модули 8, 10 |
| 13 | Jotai | 1.5 | Модуль 10 |
| 14 | Docker + Docker Compose | 2 | CLI |
| 15 | GitHub Actions | 1.5 | Модули 1, 14 |
| 16 | Тестирование (полный стек) | 4 | Все модули |
| 17 | Интеграция + Meta Interview Prep | 5 | Все модули |
| | **ИТОГО** | **~50 дней** | |

> При интенсивном режиме (6 часов/день) = **~9-10 недель**.
> При умеренном (4 часа/день) = **~12-13 недель**.
>
> **🧪 Бонус:** Каждый модуль включает TDD-задания из реального бэклога (91 GitHub Issue, включая M7 — Budget Accounts Aggregation). Детальные тесты и интерактивные HTML-страницы — в [`docs/study-plans/`](study-plans/index.html).

---

## Capstone-фича: Budget Accounts Aggregation (M7)

После прохождения модулей 1–17 берите M7 как capstone — 23 задачи (#69–#91), которые закрепляют весь стек на реальной фиче.

**Источники правды:** [`BACKLOG.md → Milestone 7`](BACKLOG.md#milestone-7-budget-accounts-aggregation), [`budget-accounts/ENGINEERING_BREAKDOWN_budget_accounts.md`](budget-accounts/ENGINEERING_BREAKDOWN_budget_accounts.md), [`budget-accounts/PRD_budget_accounts.md`](budget-accounts/PRD_budget_accounts.md), [`adr/ADR-003-open-banking-aggregator.md`](adr/ADR-003-open-banking-aggregator.md).

**Длительность:** 12 недель (4 фазы × 2–4 недели).

**Новые темы (появляются именно в M7):** envelope encryption + AES-256-GCM, HMAC-подпись исходящих HTTP-запросов, OAuth redirect flow у third-party провайдера (GoCardless), re-consent lifecycle, per-(provider,account) token bucket в Redis, provider contract testing, Grafana/OpenSearch alerting.

### Маппинг задач M7 на модули

| Фаза | Задача | Модули для повторения |
|------|--------|------------------------|
| phase-0 | #69 Flyway schema accounts | 4 |
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

Для каждой задачи breakdown содержит готовые Acceptance-критерии — они играют роль TDD-тестов: сначала пишутся тесты (integration в Testcontainers, contract-тесты на `AccountProvider`, WireMock для HTTP, Playwright для E2E), затем реализация, пока все Acceptance-пункты не станут зелёными.

