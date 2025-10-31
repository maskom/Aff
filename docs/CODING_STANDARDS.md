# Coding Standards

These rules apply to all code within this repository. They are enforced during code review and by automated checks defined in CI.

## General Principles
- **TypeScript first** — Author Vue components and utilities using `<script setup lang="ts">`. Avoid implicit `any` types.
- **Single responsibility** — Keep components focused. Extract helper composables or utility functions when a component exceeds ~200 lines or handles more than one logical concern.
- **Declarative UI** — Prefer computed properties and template expressions over manual DOM manipulation.
- **Accessibility** — Provide descriptive labels, keyboard navigability, and sufficient color contrast. Run accessibility audits using Lighthouse before merging UI-heavy changes.
- **Internationalization ready** — Wrap user-facing strings in a centralized locale helper (planned in Roadmap Phase 2). For now, keep copy isolated in constants for easy replacement.

## Vue & Nuxt Guidelines
- Use `<template>`, `<script setup lang="ts">`, and `<style scoped>` blocks. Global styles live in `app.vue` or dedicated CSS files imported via `nuxt.config.ts`.
- Leverage Nuxt auto-imports for composables. Avoid manual `import { ref } from 'vue'` when the auto-import is available unless TypeScript inference fails.
- When creating new pages, place them under `pages/`. Use the file-based routing conventions and explicitly define `definePageMeta` for SEO metadata.
- Register stateful logic via composables in `composables/` with typed return signatures. Expose a factory-like API rather than raw refs.

## Styling
- Use CSS variables declared in `app.vue`'s `:root` scope for colors, spacing, and typography.
- Prefer utility classes (e.g., flex, spacing) and component-scoped styles over deeply nested selectors.
- Support light/dark theming by reading from semantic tokens (planned Phase 3). Do not hard-code hex values outside the design token map.

## Testing
- Unit tests (Vitest) live in `tests/unit`. Name files `*.spec.ts` and colocate near the subject where reasonable.
- Component tests should render with `@vue/test-utils` and assert accessibility roles or text content, not implementation details.
- Snapshot tests are discouraged except for stable, text-only output.
- Include data-testids when DOM selection is necessary for tests.

## Linting & Formatting
- Run `pnpm lint` before committing. ESLint should pass without warnings.
- Format code with Prettier (`pnpm format`). Do not disable lint rules without team agreement.
- Commit hooks (planned Phase 1 Task 3) will enforce formatting; until then, reviewers may request fixes.

## Git Hygiene
- Each commit should represent a logically complete change with passing tests.
- Reference task IDs from [`docs/TASKS.md`](./TASKS.md) in commit messages (e.g., `AFF-12`).
- Do not commit build artifacts or environment secrets.

## Documentation
- Update the README or architecture docs when introducing new dependencies or architectural patterns.
- Add ADRs (Architecture Decision Records) under `docs/adrs/` for significant changes (planned Phase 2 Task 5).
