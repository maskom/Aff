# Repository Agent Guidelines

## Scope

These instructions apply to all files in this repository unless a subdirectory overrides them with its own `AGENTS.md`.

## Workflow Requirements

- Always read the documentation in `docs/` before making changes.
- Reference relevant task IDs from `docs/TASKS.md` in commit messages and pull requests.
- Run `pnpm build` at minimum before committing. Prefer running lint/tests when available.
- Update affected documentation for any feature, architectural, or workflow change.

## Code Style

- Follow `docs/CODING_STANDARDS.md` for language-specific guidance.
- Use semantic HTML and accessible ARIA attributes in UI components.
- Do not introduce binary assets; represent diagrams with text or ASCII art.

## Pull Request Messaging

- Summaries must include bullet points citing modified areas.
- Testing section should enumerate commands executed with their results.

## Cloudflare Practices

- Ensure Worker scripts remain stateless; rely on KV or Durable Objects for persistence.
- Document any Worker change in `docs/ARCHITECTURE.md` and `docs/TASKS.md`.
