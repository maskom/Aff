# GitHub Workflow

## Branching Model
- `main` — Always deployable. Protected with required status checks (`build`, `lint`, `test`).
- `release/*` — Cut from `main` when preparing staged releases.
- `feature/<task-id>-short-description` — Feature branches mapped to tasks in [`docs/TASKS.md`](./TASKS.md). Example: `feature/AFF-02-auth-shell`.

## Pull Request Checklist
Before requesting review:
1. Rebase on the latest `main` and resolve conflicts locally.
2. Ensure the following commands succeed:
   ```bash
   pnpm lint
   pnpm test
   pnpm build
   ```
3. Update documentation (README, architecture, plan, or tasks) if functionality, dependencies, or workflows change.
4. Add screenshots or terminal recordings (text-based) when altering UI.
5. Fill out the PR template (see below) and link the relevant task IDs.

## PR Template
```
## Summary
-
-
-

## Testing
- [ ] pnpm lint
- [ ] pnpm test
- [ ] pnpm build

## Deployment
- [ ] Requires infrastructure changes (describe)
```

## Review Process
- At least one maintainer review is required.
- Reviewers focus on correctness, accessibility, adherence to coding standards, and documentation updates.
- Use GitHub suggestions for minor fixes. Request changes if substantial issues exist.

## Commit Standards
- Follow Conventional Commits with task references (e.g., `feat(AFF-03): add campaign search composable`).
- Keep commit messages under 72 characters per line.
- Squash merges are preferred; keep history clean by rebasing before merge.

## Automation (Planned)
- GitHub Actions workflow to run lint/test/build on each PR (Phase 1 Task 2).
- Automatic Cloudflare preview deployments for PR branches (Phase 2 Task 4).
- Renovate bot for dependency updates (Phase 3 Task 2).
