# Development Roadmap

## Phase 1 — Foundation (Weeks 1-3)
1. **Automate quality gates** `[AFF-01]` — Configure GitHub Actions for lint/test/build and Wrangler previews.
2. **Component extraction** `[AFF-02]` — Break `app.vue` into modular components under `components/affiliate/`.
3. **Tooling setup** `[AFF-03]` — Add ESLint, Prettier, Stylelint, and commit hooks (Husky). Document usage.
4. **Runtime config validation** `[AFF-04]` — Implement environment schema using `zod` in `nuxt.config.ts`.
5. **Cloudflare deployment pipeline** `[AFF-05]` — Script Wrangler deployments with environment promotion (staging → production).

## Phase 2 — Data & Personalization (Weeks 4-6)
1. **Affiliate API integration** `[AFF-06]` — Build typed SDK for partner networks with caching strategy.
2. **Authentication** `[AFF-07]` — Implement OAuth login, server middleware, and secure session handling.
3. **User personalization** `[AFF-08]` — Add saved campaigns, favorites, and search history synced via KV.
4. **Preview deployments** `[AFF-09]` — Enable Worker-based preview URLs per pull request.
5. **ADR process** `[AFF-10]` — Introduce `docs/adrs/` and document key decisions.
6. **Analytics instrumentation** — Track conversions and funnel metrics via Cloudflare Analytics & client events.

## Phase 3 — Experience Enhancements (Weeks 7-9)
1. **Dynamic theming** `[AFF-11]` — Support dark mode and partner-specific branding.
2. **Internationalization** `[AFF-12]` — Integrate Nuxt i18n with language switcher and locale management.
3. **Content management** `[AFF-13]` — Add CMS integration (Contentful/Notion) for marketing copy.
4. **Performance optimization** `[AFF-14]` — Implement code splitting, image optimization, and Worker caching policies.
5. **Dependency automation** — Configure Renovate and Dependabot monitors.

## Phase 4 — Growth & Automation (Weeks 10-12)
1. **Lead management** `[AFF-15]` — Create Durable Object to store chat conversations and push leads to CRM.
2. **A/B testing** `[AFF-16]` — Integrate experimentation framework (GrowthBook) with Worker edge control.
3. **Notification system** `[AFF-17]` — Add email/push notifications for campaign updates via third-party services.
4. **Monitoring & alerting** `[AFF-18]` — Configure error tracking (Sentry) and uptime checks.
5. **Scalability** `[AFF-19]` — Introduce multi-region data strategy and queue-based processing for heavy workloads.

## Phase 5 — Continuous Improvement (Ongoing)
- Review roadmap quarterly and adjust priorities `[AFF-20]`.
- Track metrics (conversion rate, lead quality) to guide experimentation.
- Maintain documentation and retire deprecated features promptly.
