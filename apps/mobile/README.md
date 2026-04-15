# life-goals-mobile

> **Status: Planned — not yet implemented**

Future React Native application for Life Goals Dashboard.

## What will be shared from `packages/shared`

| Shared | How |
|--------|-----|
| `schema.graphql` | `relay.config.json` references `../packages/shared/schema.graphql` |
| Jotai atoms (`src/store/`) | Import from `@life-goals/shared` |
| Platform-agnostic hooks (`src/hooks/`) | Import from `@life-goals/shared` |
| TypeScript interfaces (`src/types/`) | Import from `@life-goals/shared` |

## What will be mobile-specific

| Mobile-only | Notes |
|-------------|-------|
| React Native components | Use `View`, `Text`, `StyleSheet` — not CSS Modules |
| Navigation | React Navigation (replaces React Router DOM) |
| Build tooling | Metro bundler (replaces Vite) |
| `RelayEnvironment.ts` | Platform-specific `fetch` + WebSocket transport |
| `babel.config.js` | Metro + Relay plugin config |

## Adding this workspace

When ready, add to root `package.json` workspaces:

```json
{
  "workspaces": [
    "life-goals-web",
    "life-goals-mobile",
    "packages/*"
  ]
}
```

## Tech stack (planned)

- React Native (latest)
- Relay (`react-relay`) — same version as `life-goals-web`
- Jotai — atoms imported from `@life-goals/shared`
- NativeWind or StyleSheet API for styling
- React Navigation
- Metro bundler
- TypeScript
