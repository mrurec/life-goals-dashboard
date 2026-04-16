# Brief Product Description

1. **Life Goals Dashboard** is a universal, widget-based full-stack platform for tracking any personal goals through a dynamic, configurable dashboard.
2. **The user** signs in with OAuth2, adds widget instances to their dashboard, configures each instance with their own parameters (deadlines, currencies, targets, company names), and logs activity through each widget's UI. Any user-facing domain value lives in the widget instance's `config: JSONB` — never hardcoded.
3. **Main goal:** give the user one place to track heterogeneous personal goals (interview prep, fitness, budget, and future user-defined widgets) with Meta-grade engineering patterns — cursor pagination, DataLoaders, fragment colocation, structured logging — so the platform is both a practical tool and a portfolio piece for FAANG-level interviews.
4. **The underlying logic:**
   - Ships with three built-in widget types: **Interview Prep** (LeetCode tracking, spaced repetition via SM-2, system design, behavioral), **Fitness Tracker** (workouts, body measurements, food catalog, recipes, meals), **Budget Planner** (transactions, savings goals, exchange rates, trip budgets).
   - Each **widget type** is a backend package + frontend feature folder implementing `WidgetProvider`; a **widget instance** is one user's configured placement, stored in `user_dashboard_widget(config JSONB)`.
   - Adding a new widget type = create one backend package, add to `WidgetData` union, register one line in `WidgetRegistry.ts`. Zero changes to the dashboard shell or other widgets.
   - Cross-widget coordination uses Spring Modulith events (`ApplicationEventPublisher` + `@ApplicationModuleListener`) — no direct method calls between widget packages. Module boundaries enforced by `ApplicationModules.verify()` in CI.
   - Real-time notifications delivered via GraphQL Subscriptions over WebSocket backed by Redis pub/sub; each widget registers its own achievement rules via `AchievementChecker`.
   - Every GraphQL query is viewer-scoped through `ViewerContext`; persisted queries in production send only the MD5 hash + variables.
