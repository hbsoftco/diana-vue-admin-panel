# Contributing

## Table of Contents

- [Purpose](#purpose)
- [Before You Start](#before-you-start)
- [Development Setup](#development-setup)
- [Choosing the Scope](#choosing-the-scope)
- [Branch and Commit Practices](#branch-and-commit-practices)
- [Implementation Expectations](#implementation-expectations)
- [Architecture Boundaries](#architecture-boundaries)
- [UI Contribution Requirements](#ui-contribution-requirements)
- [Route Contribution Requirements](#route-contribution-requirements)
- [Localization Requirements](#localization-requirements)
- [Testing Requirements](#testing-requirements)
- [Quality Checks](#quality-checks)
- [Documentation Requirements](#documentation-requirements)
- [Pull Request Checklist](#pull-request-checklist)
- [Review Guidelines](#review-guidelines)
- [Areas Without Established Conventions](#areas-without-established-conventions)

## Purpose

This guide defines how to contribute to the current Diana Vue Admin Panel repository while
preserving its existing structure and conventions.

The project is still a UI foundation. Contributors must distinguish implemented systems from
scaffolding and placeholders. Do not build against assumptions that services, repositories,
domain models, stores, authentication, or a backend already exist.

## Before You Start

Before implementing any feature, every contributor must read:

- [`AGENTS.md`](../AGENTS.md)
- [`CLAUDE.md`](../CLAUDE.md)
- [`docs/ARCHITECTURE.md`](ARCHITECTURE.md)

When reading this file from the `docs` directory, the architecture document is
[`ARCHITECTURE.md`](ARCHITECTURE.md). These three documents establish task execution rules,
engineering principles, and the current implemented architecture.

Then read the documentation relevant to the change:

- [`PROJECT_STRUCTURE.md`](PROJECT_STRUCTURE.md)
- [`CODE_CONVENTIONS.md`](CODE_CONVENTIONS.md)
- [`DEVELOPMENT_GUIDE.md`](DEVELOPMENT_GUIDE.md)
- Applicable records under [`ADR`](ADR)

Then inspect the feature and shared components adjacent to the intended change.

Before editing:

1. Check the working tree.
2. Identify unrelated existing changes.
3. Confirm the requested scope.
4. Determine whether the change affects routes, menus, locales, themes, or RTL.
5. Determine whether a missing architectural convention requires explicit agreement.

Do not overwrite or reformat unrelated user changes.

## Development Setup

Install a supported Node.js version:

```text
^20.19.0 or >=22.12.0
```

Install dependencies:

```sh
pnpm install
```

Start the application:

```sh
pnpm dev
```

Use pnpm for repository commands and dependency changes.

## Choosing the Scope

Keep each contribution focused. Appropriate scopes include:

- One reusable component.
- One feature page.
- One route group change.
- One theme or RTL correction.
- One testing improvement.
- One documentation correction.
- One bounded refactor with unchanged behavior.

Do not combine unrelated architectural restructuring with a feature change unless the scope
explicitly requires both.

Large changes involving the first implementation of any missing layer require prior design
agreement. Examples include:

- API client.
- Services or repositories.
- Pinia store architecture.
- Authentication.
- Authorization.
- Domain models and DTOs.
- Error normalization.
- Server-state caching.
- CI/CD.

## Branch and Commit Practices

The repository validates Conventional Commit types:

- `feat`
- `fix`
- `docs`
- `style`
- `refactor`
- `perf`
- `test`
- `chore`
- `build`
- `ci`
- `revert`

Example:

```text
feat: add breadcrumb separator variants
```

Commit types must be lowercase and present.

Keep commits cohesive. Do not commit:

- `node_modules`
- `dist`
- Coverage output
- Playwright reports
- Test results
- TypeScript build information
- ESLint cache
- Local environment files

## Implementation Expectations

Every contribution should:

- Follow TypeScript and Vue Composition API conventions.
- Preserve the current architectural dependency direction.
- Use existing shared components before creating duplicates.
- Use semantic DaisyUI/Tailwind classes.
- Support both Diana themes.
- Support RTL where direction matters.
- Avoid adding literal user-facing English where the surrounding feature is localized.
- Clean up global listeners and document mutations.
- Avoid permanent console logging.
- Avoid broad formatting changes outside the scope.

Do not convert placeholder areas into invented business functionality without requirements.

## Architecture Boundaries

Follow these current dependencies:

```text
pages -> features -> shared
layouts -> shared
app -> routes/layouts/plugins
```

Shared code must not depend on a specific feature.

Feature code may depend on shared UI, types, and composables. Features currently do not depend
on each other.

The boundaries are not enforced by lint rules, so reviewers and contributors must preserve
them manually.

### Page wrappers

Keep route wrappers thin. Put feature presentation in `src/features`.

### Feature components

Keep feature-only components colocated in the feature directory.

### Shared components

Move code to `src/shared` only when it is reusable and independent of one feature's domain.

## UI Contribution Requirements

For a new or changed `Di*` component:

- Preserve the `Di` prefix.
- Define typed props.
- Define typed events.
- Define typed models and slot props where applicable.
- Provide explicit defaults.
- Use controlled size and variant unions.
- Reuse shared UI types when the contract is genuinely identical.
- Prefer class maps over opaque dynamic class construction.
- Use native HTML semantics.
- Add accessible names for icon-only controls.
- Support keyboard operation.
- Support disabled/read-only states correctly.
- Verify listener and global-style cleanup.
- Verify light and dark themes.
- Verify LTR and RTL behavior.
- Update the appropriate showcase.
- Add interaction tests when test work is in scope.

Do not expose arbitrary implementation details solely to make one demo work.

## Route Contribution Requirements

A navigable feature usually requires coordinated changes in:

- `src/features/<group>/routes.ts`
- `src/pages/<group>/<route>.vue`
- `src/features/<group>/<feature>`
- `src/shared/config/menu.ts`
- `src/shared/locales/*.json`

Use lazy imports for child route components.

Use route metadata for:

- Page title.
- Breadcrumb labels.
- Breadcrumb links.

Verify:

- Root and group redirects.
- Direct navigation.
- Browser refresh.
- Sidebar active state.
- Expanded parent menu.
- Page heading.
- Document title.
- Breadcrumb links.

Do not create menu entries without matching routes.

## Localization Requirements

English is the fallback locale, not a substitute for intentionally supported translations.

When adding a localized feature:

1. Add a stable nested translation key.
2. Add English content.
3. Add equivalent keys to the locales in scope.
4. Verify interpolation and plural behavior if used.
5. Verify Persian, Hebrew, or Arabic direction where applicable.

The existing locale dictionaries are uneven. Do not delete fallback behavior, and do not assume
all missing keys are accidental within the scope of a small contribution.

## Testing Requirements

The repository currently lacks unit tests and has a stale E2E test. New contributions should
not claim existing test coverage that is not present.

For interactive shared components, prioritize tests covering:

- Rendered defaults.
- Prop variants.
- Event payloads.
- `v-model`.
- Disabled and read-only behavior.
- Keyboard interaction.
- Outside-click handling.
- Global listener cleanup.
- Modal scroll handling.
- RTL-sensitive behavior.

For routes, cover:

- Redirects.
- Route rendering.
- Navigation through the sidebar.
- Page title and breadcrumb behavior.

Do not copy the assertion in `e2e/vue.spec.ts`; it targets the removed Vue starter page.

## Quality Checks

Use checks appropriate to the change:

```sh
pnpm type-check
pnpm build
pnpm test:unit
pnpm test:e2e
```

Run linting and formatting when modifications are allowed:

```sh
pnpm lint
pnpm format
```

Both commands can modify files. Review their output and the Git diff afterward.

When the full E2E suite is impractical, document exactly which browser or test was run.
Never report a test as passing if it was not executed.

## Documentation Requirements

Update documentation when a contribution changes:

- Folder responsibility.
- Architectural dependency.
- Development command.
- Runtime requirement.
- Route workflow.
- Store or data convention.
- Theme behavior.
- Locale support.
- Testing workflow.

Documentation must distinguish:

- Current implementation.
- Known limitations.
- Proposed future work.

Do not describe planned architecture as implemented.

## Pull Request Checklist

Before requesting review, confirm:

- [ ] The change is limited to the agreed scope.
- [ ] Unrelated worktree changes are untouched.
- [ ] TypeScript contracts are explicit.
- [ ] Vue components follow `<script setup>` conventions.
- [ ] Existing shared UI was reused where appropriate.
- [ ] Route, page, feature, menu, and metadata changes are synchronized.
- [ ] User-facing text uses the appropriate localization approach.
- [ ] Light and dark themes were considered.
- [ ] LTR and RTL behavior was considered.
- [ ] Icon names are registered and typed.
- [ ] Global listeners and document styles are cleaned up.
- [ ] Accessibility semantics are present.
- [ ] Appropriate type, build, lint, and test checks were run.
- [ ] No generated artifacts are unintentionally committed.
- [ ] Documentation reflects architectural changes.
- [ ] The final diff contains no unrelated formatting.

## Review Guidelines

Reviewers should check:

- Correctness before style.
- Whether behavior matches the requested scope.
- Whether a new abstraction is truly reusable.
- Whether the dependency direction remains intact.
- Whether menu routes actually exist.
- Whether route metadata keys exist.
- Whether component classes work in both themes.
- Whether direction-sensitive code works in RTL.
- Whether browser-global effects are cleaned up.
- Whether new public component APIs are typed and coherent.
- Whether verification claims match executed commands.

Treat a passing build as necessary evidence, not complete proof of interaction correctness.

## Areas Without Established Conventions

The following require an explicit project decision before a substantial implementation:

- Pinia store location and naming.
- API client and environment setup.
- Service and repository responsibilities.
- DTO and domain model placement.
- Authentication and authorization.
- Server-state caching.
- Standard error types and user feedback.
- Test helpers and mocking conventions.
- CI pipeline.
- Deployment platform.
- Public versus authenticated layouts.

Contributors must not infer these systems from empty files or configured aliases.
