# ADR-004: Module Boundary Enforcement (Spring Modulith vs ArchUnit)

**Status:** Accepted
**Date:** 2026-04-14
**Deciders:** mrurec
**Related:** `CLAUDE.md` → *Architecture: Widget-First Modular Monolith*; issue #1 (`Initialize Kotlin/Spring Boot backend project`)
**Supersedes:** —
**Superseded by:** —

---

## Context

The project's architecture is described in `CLAUDE.md` as a **widget-first modular monolith**: a single Spring Boot application in which every widget type (`interviewprep`, `fitness`, `budget`, plus the infrastructural `common`, `dashboard`, `notification`) lives in its own package and is required to follow a strict rule:

> "A widget type package may depend on `common/` but NEVER imports from another widget type's `repository/` or `model/` package. Cross-widget data flows through service interfaces only. This is the key to eventual microservice extraction."

Without automated enforcement this rule is a gentlemen's agreement that survives exactly until the first PR under a deadline. We need a CI mechanism that:

1. Fails the build if `budget/` imports from `fitness/repository/` (or any non-`common/` package of another widget).
2. Detects cyclic dependencies between modules.
3. Documents the boundaries as an artifact suitable for interviews/portfolio (see CLAUDE.md: "strong portfolio piece for FAANG-level interviews").
4. Allows modules to be tested in isolation — the testing strategy in `CLAUDE.md` does not currently describe this layer.
5. Provides a path to proper cross-module communication (example from CLAUDE.md: `AchievementChecker` — when `fitness` logs a workout, `notification` reacts with an achievement, without a direct call).

Originally, issue #1 introduced **ArchUnit** as a "scaffold" for a single rule — the choice was made "by habit", without comparing alternatives and without a mention in `CLAUDE.md`/`docs/ARCHITECTURE.md`. The dependency is already added to `life-goals-api/build.gradle.kts` (`testImplementation("com.tngtech.archunit:archunit-junit5:1.4.1")`), but no test has been written against it yet — switching direction is cheap.

## Options Considered

### Option A — ArchUnit (test rules written by hand)

**Pros:**
- Library-agnostic: works with any JVM project, no coupling to Spring.
- Maximum flexibility — any rule is expressible in the DSL (banning `@Autowired` field injection, layering rules, naming conventions).
- Popular, mature, stable API.
- Zero runtime overhead — purely a test-time tool.

**Cons:**
- "Modular monolith" rules must be written by hand: package boundaries, cycles, layers. Each rule is a separate test and separate maintenance.
- No built-in "module" model — only packages and classes.
- Provides no mechanism for cross-module communication (events, async listeners) — we would have to write that ourselves.
- Does not generate module documentation/diagrams.
- Does not help testing a single widget in isolation.

### Option B — Spring Modulith

**Pros:**
- Explicit **ApplicationModule** concept with `package-info.java` / `@ApplicationModule` — maps perfectly onto our widget packages.
- `ApplicationModules.of(Application.class).verify()` in a single JUnit test call verifies:
  - package boundaries (what is not exposed cannot be imported from outside),
  - absence of cycles,
  - allowed dependencies between modules (whitelisted).
- `@ApplicationModuleTest` — brings up the context of **a single module only**. This is exactly the isolation currently missing from the `CLAUDE.md` testing strategy.
- **Transactional event publication registry** — the canonical way to implement "`fitness` published `WorkoutLogged` → `notification` reacted via `AchievementChecker`". Closes CLAUDE.md's explicit requirement about "cross-widget data flows through service interfaces only" without adding in-process direct calls.
- Automatically generates **PlantUML / C4-style diagrams** of modules and their dependencies — a ready-made artifact for interviews/README.
- Actuator endpoint `/actuator/modulith` + Micrometer metrics for cross-module calls — fits the observability strategy already described in CLAUDE.md.
- Supports Spring Boot 4 (Modulith 2.x).

**Cons:**
- Coupling to the Spring ecosystem (already a de-facto given in this project, not a new dependency).
- Adds a runtime component (event publication registry) if used — a small table in the DB for published events.
- Rule style is less flexible than ArchUnit: for exotic rules (e.g. "no static `Logger.getLogger()`, only `@JvmStatic` companion") you still need ArchUnit.

### Option B + narrow A — Spring Modulith + ArchUnit for non-standard rules (hybrid)

**Pros:**
- Modulith covers 90% of the need (boundaries, cycles, documentation, per-module tests, events).
- ArchUnit remains optional for narrow rules that Modulith cannot express (e.g. banning `org.jetbrains.exposed.*` across the project, banning `java.util.logging`, etc.).

**Cons:**
- Two tools instead of one → slightly higher maintenance.
- Risk that ArchUnit is added "just in case" and accumulates duplicate rules. We mitigate by introducing ArchUnit tests only when a concrete rule actually appears.

### Option C — Manual conventions + code review only

**Pros:** zero tooling.
**Cons:** does not work. Crossed out.

## Decision

**We accept Option B + narrow A (hybrid):**

- **Spring Modulith** — the primary tool for boundary enforcement, module documentation, per-module tests, and cross-module event communication.
- **ArchUnit** — kept as an optional tool for specific rules not expressible via the module model. At the start — no ArchUnit tests are written; the dependency can either stay "just in case" or be removed until the first real need. By default we **remove** it from `build.gradle.kts` and bring it back when a concrete rule appears.

Drivers, in order of importance:

1. **Architectural match.** The project is literally described in the words Spring Modulith was built for: "modular monolith → widgets → eventual microservice extraction → cross-widget via service interfaces". Ignoring that means hand-writing what the Spring team has already delivered.
2. **Events close a known future pain point.** The `AchievementChecker` in CLAUDE.md requires `fitness` to notify `notification` without a direct dependency. `ApplicationModuleListener` + transactional event publication is a ready-made solution; ArchUnit cannot help here at all.
3. **Per-module tests (`@ApplicationModuleTest`)** close a gap in the current testing strategy — we have unit and integration tests today, but no "run a single widget in isolation".
4. **Auto-documentation** — a ready-made PlantUML artifact for README / interviews, valuable in the FAANG-portfolio narrative that CLAUDE.md explicitly states.
5. **Observability integration** — Actuator + Micrometer for module boundaries matches the already-planned structured logging/observability.

We explicitly accept the constraints:

- The event publication registry requires a small table in the DB — we will add a Flyway migration when we first use it, not sooner.
- For the first version, the default Modulith rules are enough for `verify()`. Custom named allowed dependencies are added as concrete cases arise.

## Consequences

### Positive

- A single command (`./gradlew test`) verifies module boundaries, absence of cycles, and correctness of cross-module communication.
- A ready-made model for async events between widgets (required in P1+ for notifications/achievements).
- The module diagram is generated from code, not hand-maintained in Mermaid.
- Per-module tests speed up CI (no need to boot the whole context for a fitness test).
- Future extraction into a microservice is easier: module boundary = future service boundary, events are already async.

### Negative

- A small runtime dependency on Spring Modulith (core + events starter). Non-critical — the stack is already Spring-heavy.
- `package-info.java` requires explicit module markup. That's +5 files, one-time. We use `.java` (not `.kt`) because Kotlin has no equivalent of Java's package-level annotations that Spring Modulith's classpath scanner can read; `package-info.java` is the supported idiom even in Kotlin-only modules. The build enables this by adding `src/main/kotlin` to the Java source set so javac picks up the `package-info.java` files colocated with Kotlin sources.
- Published events require an `event_publication` table — adds a migration when first used.

### Neutral

- Modulith module names = top-level package names (`interviewprep`, `fitness`, `budget`, `dashboard`, `notification`, `common`). This already matches the package structure in CLAUDE.md — nothing needs to change.
- We remove the ArchUnit dependency from build.gradle.kts at the start; it can come back in a single line whenever a real need arises.

## Validation / Review Triggers

We revisit this decision if:

- Spring Modulith breaks compatibility with Spring Boot 4.x or slows down in development.
- Multiple (3+) rules emerge that Modulith cannot express — then ArchUnit becomes a permanent resident of the test classpath.
- The project grows beyond Spring (e.g. a second module on Ktor) — then library-agnostic ArchUnit could return as the primary tool.
- A decision is made to move to a true microservice architecture — then Modulith becomes a transitional tool rather than a permanent one.

## Implementation Notes

**`build.gradle.kts`:**

```kotlin
// Modulith BOM + core + test support
implementation(platform("org.springframework.modulith:spring-modulith-bom:2.0.5"))
implementation("org.springframework.modulith:spring-modulith-starter-core")
implementation("org.springframework.modulith:spring-modulith-starter-jpa")   // event publication registry
testImplementation("org.springframework.modulith:spring-modulith-starter-test")

// ArchUnit: removed. Add back only when a non-Modulith rule appears.
```

**Module declaration** — at the root of each widget package. Written in Java because Kotlin cannot host package-level annotations in a form Spring Modulith's scanner reads; the `build.gradle.kts` adds `src/main/kotlin` to the Java source set so javac picks these files up:

```java
// com/mrurec/lifegoals/fitness/package-info.java
@org.springframework.modulith.ApplicationModule(
    displayName = "Fitness Widget",
    allowedDependencies = {"common"}
)
package com.mrurec.lifegoals.fitness;
```

```kotlin
// build.gradle.kts — let javac scan src/main/kotlin for package-info.java
sourceSets {
    main { java.srcDirs("src/main/kotlin") }
    test { java.srcDirs("src/test/kotlin") }
}
```

**Verify test** — one test for the whole project:

```kotlin
class ModularityTests {
    private val modules = ApplicationModules.of(LifeGoalsApplication::class.java)

    @Test fun `verifies module boundaries`() = modules.verify()

    @Test fun `writes documentation`() {
        Documenter(modules)
            .writeModulesAsPlantUml()
            .writeIndividualModulesAsPlantUml()
    }
}
```

**Cross-module events** — when `fitness` logs a workout:

```kotlin
// In fitness module
data class WorkoutLogged(val userId: UUID, val workoutId: UUID, val at: Instant)

@Service
class WorkoutService(private val events: ApplicationEventPublisher) {
    @Transactional
    fun logWorkout(...) {
        // ... persist ...
        events.publishEvent(WorkoutLogged(...))
    }
}

// In notification module — no direct dependency on fitness internals
@Component
class WorkoutAchievementListener(private val notifications: NotificationService) {
    @ApplicationModuleListener
    fun on(event: WorkoutLogged) { /* check achievement, publish notification */ }
}
```

## References

- Spring Modulith docs: https://docs.spring.io/spring-modulith/reference/
- Spring Modulith: Application Modules: https://docs.spring.io/spring-modulith/reference/fundamentals.html
- ArchUnit user guide: https://www.archunit.org/userguide/html/000_Index.html
- `CLAUDE.md` → *Architecture: Widget-First Modular Monolith*, *Package Structure*
- Issue #1 (backend bootstrap) — will be updated to reference this ADR instead of the ArchUnit scaffold.
