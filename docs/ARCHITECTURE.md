# Architecture Overview

## Application Layers
- **Presentation (Vue components)** — `app.vue` hosts the primary dashboard layout. Future views belong under `pages/` with child components under `components/`.
- **State & data orchestration** — Client-side state is managed with Vue composables. Remote data will be fetched from affiliate APIs (Phase 2) using typed clients under `lib/`.
- **Edge delivery** — Cloudflare Worker (`cloudflare/worker.ts`) serves pre-rendered assets from KV storage, providing low-latency global delivery.

## Rendering Strategy
- The landing page leverages Nuxt's hybrid rendering with the `/` route statically pre-rendered (see `nuxt.config.ts`).
- Future dynamic routes (e.g., `/campaigns/[id]`) will employ server-side rendering for personalized content while caching via Cloudflare.

## Theming
- Design tokens are defined via CSS custom properties in `app.vue`:
  - `--color-bg`, `--color-surface`, `--color-accent`, etc.
  - Apply tokens through utility classes and scoped styles to maintain consistency.
- A theme switcher (Phase 3) will manipulate tokens at runtime.

## Data Flow (Planned)
1. User authenticates with affiliate provider (OAuth) and receives JWT stored in HttpOnly cookies.
2. Nuxt server routes proxy requests to affiliate APIs using server middleware for security.
3. Components consume composables (e.g., `useCampaigns`) that expose typed refs, loading states, and cache invalidation helpers.
4. Edge caching: Worker caches API responses in Workers KV with TTL hints from the API, enabling near real-time updates with revalidation.

## Cloudflare Integration
- **Worker** — Handles static asset responses and proxies API calls to the Nuxt server or external affiliate APIs when necessary.
- **R2 / KV** — Store static assets and cached API payloads.
- **Durable Objects** (Phase 4) — Coordinate rate limits and store chat-like conversation history for affiliate leads.

## Security Considerations
- Enforce HTTPS only cookies and apply CSP headers through the Worker.
- Validate all environment variables in Nuxt runtime config before bootstrapping (to be implemented in Phase 1 Task 4).
- Sanitize user-provided content before rendering inside chat-like UI elements.

## Observability
- Utilize Cloudflare Workers analytics plus client-side events (Phase 2 Task 6) to monitor conversions.
- Add logging middleware that emits structured JSON to Cloudflare Logs.

## CI/CD Pipeline
- **GitHub Actions CI** — Automated quality checks run on every pull request and push to `main`:
  - Type checking with `nuxi typecheck`
  - Build verification with `nuxt build`
  - Uses pnpm for dependency management with frozen lockfile enforcement
  - Workflow file: `.github/workflows/ci.yml`
- **Status checks** — CI must pass before PRs can be merged (enforce via branch protection rules)
- **Future enhancements** — Lint (AFF-03) and test (AFF-02) stages will be added as tooling is configured

## Directory Conventions (Future)
```
components/
  affiliate/
    CampaignCard.vue
    OfferFilterBar.vue
composables/
  useCampaigns.ts
  useLeads.ts
lib/
  api/
    affiliateClient.ts
  analytics/
    events.ts
pages/
  index.vue
  campaigns/[id].vue
server/api/
  campaigns.get.ts
  leads.post.ts
```
