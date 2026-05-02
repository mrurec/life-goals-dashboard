# Expected Load

Life Goals Dashboard is a personal-tracking application intended to run at modest scale — a portfolio/pet project with a small active user base, not a consumer SaaS. Architectural patterns (DataLoaders, Relay cursor pagination, caching, modular boundaries) are chosen for engineering quality and interview portfolio value, not because the load requires them.

## User model
- **Multi-tenant**, OAuth2-authenticated. Each user owns their dashboard, widget instances, and all records scoped by `user_id`.
- Expected active users: **10–100** (personal use + recruiters/reviewers).
- Expected peak concurrency: **< 10** simultaneous sessions.

## Data volume (per user)
| Entity | Expected steady-state | Soft cap |
|--------|----------------------|----------|
| Widget instances on dashboard | 3–10 | 30 |
| CodingProblem records | 200–1,000 | 5,000 |
| Problem attempts (history) | 500–3,000 | 20,000 |
| Workouts | 200–500 / year | — |
| MealEntry records | 1,000–2,000 / year | — |
| FoodProduct (catalog + custom) | ~2,000 catalog + 50–200 custom | — |
| Transactions | 500–2,000 / year | 10,000 |
| Notifications | < 1,000 retained (older archived) | — |

## Request rate
- **Bursty:** typical usage is a short active session (logging a workout, solving a problem, reviewing dashboard) followed by long idle periods.
- **Peak**: a single user session may fire 20–50 GraphQL requests in a minute (dashboard load + interactions).
- **Baseline**: < 1 req/s system-wide.

## Background workload
- Exchange rate refresh: hourly, one call per active currency pair.
- Spaced-repetition review-date reminders: daily scheduler per user with active interview prep widget.
- Achievement checks: event-driven (Spring Modulith listeners), bounded by user action rate.

## Caching targets (from CLAUDE.md § Caching Strategy)
- Dashboard widget data: 5 min TTL → vast majority of dashboard loads served from Redis.
- Exchange rate per pair: 1 hour TTL.
- Weekly nutrition summary: 15 min TTL.

## Scale assumptions that DO NOT apply
- No multi-region deployment.
- No read-replica fan-out.
- No sharding / per-tenant isolation beyond row-level `user_id` scoping.
- No SLO obligations — best-effort availability.

## Thresholds to revisit
If any of the following are crossed, re-evaluate the architecture:
- Active users > 1,000.
- Any single user's table (attempts, meal entries, transactions) > 100,000 rows.
- Sustained request rate > 10 req/s.
- Cache hit rate < 80% on dashboard-widget cache.
