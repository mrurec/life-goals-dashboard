# Technology Profile

tech-profile:
  backend: kotlin-spring
  frontend: react-relay
  css: plain-css
  browser-testing: none

## Backend

| Concern | Technology |
|---------|-----------|
| Language | Kotlin 2.3 on JVM 25 |
| Framework | Spring Boot 4 |
| Build tool | Gradle (Kotlin DSL) |
| DI | Spring (primary-constructor, `@Service`, `@Component`) |
| Web | Spring WebMVC + WebSocket |
| GraphQL | Netflix DGS (`graphql-dgs-spring-graphql-starter`) |
| Module boundaries | Spring Modulith |
| Persistence | Spring Data JPA / Hibernate |
| Database | PostgreSQL |
| Migrations | Flyway |
| Cache / Pub-Sub | Redis (spring-boot-starter-data-redis) |
| Logging | Logback + logstash-logback-encoder |

## Frontend

| Concern | Technology |
|---------|-----------|
| Language | TypeScript 6 |
| Framework | React 19 |
| Build tool | Vite 8 |
| Data layer | Relay 20 (`react-relay`) |
| State management | Jotai 2 |
| GraphQL transport (subscriptions) | `graphql-ws` |
| Test runner | Vitest + jsdom |
| GraphQL mocking | `relay-test-utils` + `createMockEnvironment()` |
| Schema sync | `@graphql-inspector/cli` (declared at repo root) |

## CSS

| Concern | Technology |
|---------|-----------|
| Styling | Plain CSS with CSS custom properties |
| Icons | lucide-react |

## Browser Testing

Not configured. The `browser-testing` concern is set to `none` — e2e browser tests are deferred. If added later, rebind to a concrete profile (`selenium` or `playwright`) and backfill the test specs.

## Testing (Backend)

| Concern | Technology |
|---------|-----------|
| Unit/integration | JUnit 5 + kotlin-test-junit5 |
| Assertions | AssertJ |
| Mocking | MockK |
| Spring mock bridge | springmockk (`com.ninja-squad:springmockk`) |
| Integration (DB) | Testcontainers (PostgreSQL, Redis) |
| Coverage | none (intentionally not configured) |
| Modulith verification | `spring-modulith-starter-test` + `ApplicationModules.verify()` |

## Infrastructure

| Concern | Technology |
|---------|-----------|
| Containerization | Docker / docker-compose |
| Container reuse in tests | Testcontainers `withReuse(true)` |

## Conventions

### Backend

| Concern | Convention |
|---------|-----------|
| Test disable marker | `@Disabled` |
| Not-implemented marker | `TODO("...")` or `throw NotImplementedError()` |
| Run command | `./gradlew :apps:api:bootRun` |
| Test command | `./gradlew :apps:api:test` |
| Lint | `./gradlew ktlintCheck` |
| DGS codegen | `./gradlew generateJava` |
| Coverage report | n/a — coverage tooling is not configured; skip `/test-coverage` |
| Health endpoint | `/actuator/health` |
| GraphQL endpoint | `/graphql` |
| GraphQL subscriptions | `/graphql/ws` |
| Spring config syntax | `${VAR:fallback}` |
| Docker config syntax | `${VAR:-fallback}` |

### Frontend

| Concern | Convention |
|---------|-----------|
| Test skip marker | `.skip` |
| Dev command | `npm run dev` |
| Test command | `npx vitest run` |
| Relay codegen | `npm run relay` |
| Schema sync | `npm run schema:sync` (defined at repo root) |
| Node config syntax | `import.meta.env.VITE_API_URL ?? ''` |
| Generated files path | `src/**/__generated__/*.graphql.ts` (commit to git) |
