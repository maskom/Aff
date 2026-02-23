# Task Backlog

| ID     | Title                            | Phase   | Type             | Estimate | Status | Acceptance Criteria                                                                                    |
| ------ | -------------------------------- | ------- | ---------------- | -------- | ------ | ------------------------------------------------------------------------------------------------------ |
| AFF-00 | Establish documentation baseline | Phase 1 | Documentation    | 2d       | Done   | README, standards, plan, and workflow docs published; Cloudflare deployment template added.            |
| AFF-01 | Set up GitHub Actions CI         | Phase 1 | DevOps           | 3d       | Todo   | Workflow runs lint/test/build on PR; status checks required on `main`.                                 |
| AFF-02 | Modularize landing components    | Phase 1 | Frontend         | 5d       | Todo   | `app.vue` refactored into components under `components/affiliate/` with unit tests.                    |
| AFF-03 | Configure linting toolchain      | Phase 1 | Tooling          | 2d       | Done   | ESLint, Prettier scripts added; Vue/TS linting configured. Husky hooks pending.                        |
| AFF-04 | Runtime config schema            | Phase 1 | Backend          | 1d       | Done   | `nuxt.config.ts` validates env vars using `zod`; build fails on invalid config.                        |
| AFF-05 | Cloudflare deployment pipeline   | Phase 1 | DevOps           | 4d       | Todo   | Wrangler GitHub Action deploys to staging; manual approval promotes to production.                     |
| AFF-06 | Affiliate API client             | Phase 2 | Backend          | 6d       | Todo   | Typed client with retry/backoff; integration tests hitting mock server.                                |
| AFF-07 | OAuth login flow                 | Phase 2 | Frontend/Backend | 5d       | Todo   | Login button launches OAuth; callback stores session; protected routes redirect unauthenticated users. |
| AFF-08 | Favorites & saved filters        | Phase 2 | Frontend         | 4d       | Todo   | Users can star campaigns and persist selections via KV storage.                                        |
| AFF-09 | Preview deployments              | Phase 2 | DevOps           | 2d       | Todo   | Every PR comment includes Worker preview URL with branch build.                                        |
| AFF-10 | ADR framework                    | Phase 2 | Documentation    | 1d       | Todo   | `docs/adrs/0001-record-template.md` created; first ADR documents authentication choice.                |
| AFF-11 | Dark mode support                | Phase 3 | Frontend         | 3d       | Todo   | Theme toggle persists preference; passes accessibility contrast checks.                                |
| AFF-12 | Localization                     | Phase 3 | Frontend         | 4d       | Todo   | Nuxt i18n configured with English & Indonesian locales; copy externalized.                             |
| AFF-13 | CMS integration                  | Phase 3 | Backend          | 5d       | Todo   | Marketing copy fetched from headless CMS; caching strategy documented.                                 |
| AFF-14 | Edge caching strategy            | Phase 3 | DevOps           | 3d       | Todo   | Worker caches API responses with configurable TTL; docs updated.                                       |
| AFF-15 | Durable Object lead store        | Phase 4 | Backend          | 6d       | Todo   | Durable Object persists chat interactions; integration tests ensure ordering.                          |
| AFF-16 | Experimentation platform         | Phase 4 | Frontend         | 4d       | Todo   | GrowthBook integrated with Worker flags controlling UI variants.                                       |
| AFF-17 | Notification service             | Phase 4 | Backend          | 3d       | Todo   | Hook to send email/push notifications for campaign updates; includes rate limiting.                    |
| AFF-18 | Observability stack              | Phase 4 | DevOps           | 3d       | Todo   | Sentry and uptime monitor configured; alerts notify Slack channel.                                     |
| AFF-19 | Scalability audit                | Phase 4 | DevOps           | 2d       | Todo   | Document scaling strategy; load test results recorded in `docs/perf/`.                                 |
| AFF-20 | Roadmap review cadence           | Phase 5 | Management       | 1d       | Todo   | Quarterly review process documented; meeting notes template committed.                                 |
