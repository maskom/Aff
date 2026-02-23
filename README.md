# Affiliate Marketing Dashboard

An affiliate marketing landing experience inspired by WhatsApp's conversational layout. The project is built with Nuxt 3 and Vue 3, designed for rapid iteration, automated quality checks, and deployment to Cloudflare Workers.

## Prerequisites
- **Node.js** 18.x or higher (LTS recommended)
- **pnpm** 8.x or higher

## Documentation Map
- [`docs/CODING_STANDARDS.md`](docs/CODING_STANDARDS.md) — language, testing, accessibility, and review requirements for contributors.
- [`docs/ARCHITECTURE.md`](docs/ARCHITECTURE.md) — high-level system overview, Nuxt modules, state management, and theming strategy.
- [`docs/PLAN.md`](docs/PLAN.md) — staged roadmap to evolve the site from MVP to a fully featured affiliate portal.
- [`docs/TASKS.md`](docs/TASKS.md) — prioritized backlog with acceptance criteria and links to roadmap phases.
- [`docs/GITHUB_WORKFLOW.md`](docs/GITHUB_WORKFLOW.md) — branch model, pull-request checklist, and review expectations.
- [`cloudflare/`](cloudflare/) — Worker runtime entry point and deployment configuration template.

## Quick Start
1. **Install dependencies**
   ```bash
   pnpm install
   ```
2. **Run the development server**
   ```bash
   pnpm dev
   ```
   Visit `http://localhost:3000` to preview the dashboard.
3. **Run the production build**
   ```bash
   pnpm build
   ```
4. **Preview the production output**
   ```bash
   pnpm preview
   ```

> Use Nuxt DevTools (<kbd>Alt</kbd> + <kbd>D</kbd>) during development to inspect routes, components, and performance.

## Tech Stack
- **Nuxt 3 + Vue 3** for hybrid rendering and component auto-imports.
- **TypeScript** with strict editor support via generated types.
- **UnoCSS**-style utility classes defined within `app.vue` for rapid theme iteration.
- **Cloudflare Workers** for edge deployment backed by static asset serving.

## Project Structure
```
.
├─ app.vue                 # Root UI shell with WhatsApp-inspired layout
├─ nuxt.config.ts          # Nuxt configuration, route rules, and modules
├─ cloudflare/
│  ├─ worker.ts            # Edge worker script for serving static assets
│  └─ wrangler.toml        # Deployment template for Cloudflare Workers
├─ docs/
│  ├─ ARCHITECTURE.md      # Architecture reference
│  ├─ CODING_STANDARDS.md  # Coding guidelines and lint/test policy
│  ├─ GITHUB_WORKFLOW.md   # Git conventions and PR process
│  ├─ PLAN.md              # Multi-phase development roadmap
│  └─ TASKS.md             # Backlog with effort estimates
├─ public/                 # Static assets (favicons, manifest)
├─ server/                 # Server-side utilities (currently unused)
└─ package.json            # Scripts and dependencies
```

## Quality Gates
Before opening a pull request:
- Follow the coding standards in [`docs/CODING_STANDARDS.md`](docs/CODING_STANDARDS.md).
- Ensure `pnpm lint`, `pnpm test`, and `pnpm build` (or equivalents) pass locally.
- Update documentation when you modify behavior, architecture, or workflows.

## Deployment
1. Build the static output:
   ```bash
   pnpm build
   ```
2. Upload the `.output/public` artifacts to Cloudflare R2 or the Workers Sites KV namespace referenced in [`cloudflare/worker.ts`](cloudflare/worker.ts).
3. Publish the worker using Wrangler:
   ```bash
   pnpm install --global wrangler
   wrangler publish
   ```
   Configure environment variables (`AFF_API_BASE`, analytics keys, etc.) via `wrangler.toml`.

See [`cloudflare/worker.ts`](cloudflare/worker.ts) and [`cloudflare/wrangler.toml`](cloudflare/wrangler.toml) for the recommended setup.

## Contributing
1. Create a feature branch from `main`.
2. Implement your change following the roadmap and standards.
3. Run the required checks and update docs.
4. Open a pull request referencing the relevant tasks from [`docs/TASKS.md`](docs/TASKS.md).
5. Request review from at least one maintainer; ensure all status checks pass.

## License
This project is provided without a specific license. Contact the maintainers before distributing or commercializing the code.
