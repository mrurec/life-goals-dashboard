# Life Goals Dashboard

> 🚧 **Early development** — architecture and documentation are in place; implementation has not started yet.

**[🇬🇧 English](README.md)** · **[🇷🇺 Русский](README.ru.md)**

---

A widget-based full-stack platform for tracking any personal goals through a dynamic, configurable dashboard. Built with **Kotlin/Spring Boot + GraphQL (Netflix DGS) + React/Relay** — architecture and patterns aligned with Meta Engineering standards.

## What is this?

Life Goals Dashboard is a **widget platform**, not a fixed-purpose app. Users compose their own dashboard by adding, configuring, and arranging widget instances. The platform will ship with three built-in widget types:

- **Interview Prep** — Track coding problems with spaced repetition (SM-2), system design topics, and behavioral stories. Configure target company, level, and focus areas.
- **Fitness Tracker** — Log workouts, body measurements, food and recipes, with automatic macro/calorie calculations. All targets are user-configured.
- **Budget Planner** — Track savings goals with forecasting, monitor exchange rates. Currencies, deadlines, and categories are fully configurable per widget instance.

New widget types can be added in three steps without touching core dashboard code.

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Backend | Kotlin 2.3.20 + Spring Boot 4.0.5 (Spring Framework 7, Jakarta EE 11, Jackson 3, JSpecify) on JDK 25 LTS |
| API | GraphQL (Netflix DGS 11.1) |
| Frontend | React 19.2 + TypeScript 6.0 + Relay (react-relay 20.1) |
| State | Jotai 2.x (atom-based successor to Recoil; Recoil is archived upstream) |
| Build | Gradle 9.4 (backend) + Vite 8 / Rolldown (frontend) |
| Database | PostgreSQL 18.3 (async I/O, `uuidv7()`, virtual generated columns) |
| Cache | Redis 8.6 |
| Migrations | Flyway 11 |
| Auth | OAuth2 + JWT (Spring Security 7) |
| Testing | JUnit 5 + Testcontainers + React Testing Library + Playwright |
| CI/CD | GitHub Actions + Docker |

## Status

| Area | Status |
|------|--------|
| Architecture & design | ✅ Done |
| Documentation | ✅ Done |
| Backend implementation | 🔜 Not started |
| Frontend implementation | 🔜 Not started |
| CI/CD | 🔜 Not started |

## Documentation

| Document | Description |
|----------|-------------|
| [UI Mockups](docs/mockups/index.html) | Static HTML previews of every screen — open the gallery to see the target UI |

## License

MIT
