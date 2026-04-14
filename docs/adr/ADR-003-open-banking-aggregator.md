# ADR-003: Open Banking Aggregator Choice

**Status:** Accepted
**Date:** 2026-04-14
**Deciders:** mrurec
**Related:** `PRD_budget_accounts.md` · R3 (`OpenBankingProvider`)
**Supersedes:** —
**Superseded by:** —

---

## Context

The Budget Planner Widget needs to pull balances from the user's bank and savings accounts (see `PRD_budget_accounts.md`, Persona A, stories 1, 4). Retail Revolut has no public API, so the only legal path is PSD2 / Open Banking in the EEA and UK through a licensed AISP (Account Information Service Provider).

We will not become an AISP ourselves: that would mean 6–12 months of regulatory work and capital requirements that are not relevant for a pet project (see PRD §3, non-goal "We will not implement our own AISP"). So we pick a partner.

Selection constraints:

- Revolut coverage (at minimum EE/IE/LT — the main Revolut entities for EU residents) and major EU banks (ING, BNP, Sparkasse — for future-proofing).
- Free or near-free tier around ~50 connections/day (pet project, not monetized).
- SDK/REST with a predictable authorization and consent-refresh model (PSD2 SCA requires re-consent every 90/180 days).
- A sandbox that can be exercised in CI without a live bank.
- Developer UX: documentation, error taxonomy, a consent flow that can be embedded in the web frontend without redirects to a custom aggregator domain.

## Options Considered

### Option A — GoCardless Bank Account Data (formerly Nordigen)

**Pros:**
- Fully free up to a certain limit (historically — unlimited in dev, ~50 connections/day on the free tier in prod); no separate billing gate.
- Coverage of 2300+ banks across 31 EEA countries; Revolut EE/IE/LT/PL/DE is supported.
- Clean REST (institutions → requisitions → accounts → balances), no SDK "magic" — easy to cover with WireMock in tests.
- Sandbox with deterministic institution IDs (`SANDBOXFINANCE_SFIN0000`).
- Open Banking consent directly with the bank; the aggregator does not become a "brand in the middle".

**Cons:**
- Re-consent every 90 days (hard EBA limit for UK; in the EU it has been partially extended to 180, but Nordigen defaults to 90) — requires a reminder UX flow.
- No webhooks for push balance updates — polling only. Tolerable for read-only aggregation (we already have a scheduler, R7).
- Rate limit: 4 "non-user-initiated" balance calls per account per day — a hard constraint that dictates the pull frequency.
- Documentation sometimes lags behind the API; community forum is active, but support is not fast on the free tier.

### Option B — Tink (Visa)

**Pros:**
- Leader in Nordics coverage, good EU coverage, large enterprise client list (N26, PayPal).
- Mature SDKs (Android/iOS/Web), built-in hosted consent flow.
- Data enrichment (transaction categorization) — potentially useful in P2.
- Webhooks for refresh events.

**Cons:**
- **No public free tier.** Self-service sandbox exists, but prod access goes through sales with a minimum monthly commitment. Too expensive and bureaucratic for a pet project.
- After the Visa acquisition, onboarding small clients became even stricter.
- SDK-heavy: couples us to their abstractions and complicates contract testing.

### Option C — TrueLayer

**Pros:**
- Strong UK coverage, good documentation, a Stripe-grade developer portal.
- Payment initiation (write) is available — gives a path to P2 write operations.
- Webhooks, mobile SDKs, an active Slack developer community.

**Cons:**
- Free sandbox, but prod pricing starts at ~£100/month minimum, billed per connected user.
- Historically weaker in mainland EU (better in UK/IE); for Revolut EE we would need to use the EU endpoint, and some banks are unavailable.

### Option D — Plaid

**Pros:**
- Fintech brand #1; powerful SDKs and developer UX.
- Broad US coverage (not relevant now, but opens a path to P2.R16).

**Cons:**
- **Weak EU coverage** compared to GoCardless/Tink. Plaid entered Europe later (via acquisition); Revolut is supported inconsistently across countries.
- Business model is tuned for US fintech; EU pricing is opaque.
- US-first sandbox; European scenarios are less polished.

### Option E — Our own direct integration with bank PSD2 APIs

**Pros:**
- Zero vendor cost, zero vendor lock-in.
- Full control over data formats.

**Cons:**
- **Requires AISP registration with a regulator (FCA in UK, ECB/local in EU).** 6–12 months, €50k+ capital, continuous compliance. Incompatible with pet scope.
- Every bank is a separate API with its own quirks (Berlin Group NextGenPSD2 helps, but far from every bank implements it cleanly).
- Separate maintenance of consent flows, eIDAS certificates, QWAC/QSEALC.

**Crossed out immediately per PRD §3.**

## Decision

**We choose GoCardless Bank Account Data (Option A).**

Drivers, in order of importance:

1. **Free tier covers the pet scenario 100%** without sales calls or contract negotiation. Critical for a pet project where we cannot spend money or time on procurement.
2. **Clean REST without SDK lock-in** — fits our contract-test approach perfectly (`AccountProviderContract` + WireMock). Allows us to swap providers later without rewriting abstractions (see Mitigations).
3. **Coverage of Revolut EE + major EU banks** for future-proofing the portfolio demo.
4. **One clear consent + polling model** without needing to implement webhooks in the MVP. Fits the existing `@Scheduled` pattern (PRD R7).

We explicitly accept the constraints:

- **4 balance calls/account/day** — so the default scheduler is every 6 hours + a user-initiated refresh button for hot cases. Above that rate we serve from the last cached snapshot.
- **90-day re-consent** — we make it a first-class UX; the flow is already covered in PRD R3 plus a `WARNING` notification 7 days in advance.

## Consequences

### Positive

- Zero cost, zero procurement.
- Easy dev onboarding, openly demonstrable in interviews.
- Isolation behind `AccountProvider` → swapping aggregators later is a single new implementation.
- Meta-friendly narrative: "picked a constrained but simple tool, honestly encapsulated it behind an interface, rate limits became a driver of architectural decisions (cache, pull frequency)".

### Negative

- No webhooks → real-time feel for bank accounts is weaker than for crypto.com. UX compensation: clear `LIVE`/`STALE` badge and a user-initiated refresh (burns one of the 4 daily calls).
- The free tier may be cut back for policy reasons (there were precedents with Nordigen before the GoCardless acquisition). Mitigation: the `AccountProvider` abstraction permits a coexisting `TrueLayerProvider` as a fallback.
- Coverage of non-European banks ≈ 0. Mitigation: P2.R16 — Plaid US as a separate provider.
- Data enrichment (categorization) quality is weaker than Tink. Not critical — categorization is an explicit non-goal in the PRD.

### Neutral

- Forces us to store `institution_id` in `account_credential` (the payload contains GoCardless requisition + account ids). This is part of the envelope-encrypted blob and will not leak to logs.
- Vocabulary impact: the schema gains a provider type `OPEN_BANKING`, not `GOCARDLESS` — so the vendor is not encoded into the API. Swapping the vendor will not change the GraphQL schema.

## Validation / Review Triggers

We revisit this decision if:

- GoCardless removes the free tier or introduces per-call billing below our needs.
- We need to support banks in UK/IE that GoCardless covers poorly but TrueLayer covers well.
- We move into P2.R17 (payment initiation) — GoCardless BAD is unfit there, we would need TrueLayer or our own license.
- Real-time requirements grow to a point where 6h polling is unacceptable — then we need a provider with webhooks (Tink).

## References

- GoCardless Bank Account Data API docs: https://developer.gocardless.com/bank-account-data/overview
- EBA Opinion on SCA (re-consent extension to 180 days): EBA-Op-2022-10
- PRD §5 R3 (`OpenBankingProvider`), §5 R7 (rate limits), §7 Q1 (sandbox coverage question)
