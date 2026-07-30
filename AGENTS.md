# AI Coding Agent Onboarding Guide

## Table of Contents

- [Mission](#mission)
- [Required Reading](#required-reading)
- [Project Overview](#project-overview)
- [Architecture Summary](#architecture-summary)
- [Folder Responsibilities](#folder-responsibilities)
- [Dependency Direction](#dependency-direction)
- [Coding Conventions](#coding-conventions)
- [Vue Conventions](#vue-conventions)
- [TypeScript Conventions](#typescript-conventions)
- [Component Rules](#component-rules)
- [Feature Rules](#feature-rules)
- [Import Rules](#import-rules)
- [Styling Rules](#styling-rules)
- [Theme Rules](#theme-rules)
- [Localization Rules](#localization-rules)
- [Before Every Task](#before-every-task)
- [During Implementation](#during-implementation)
- [Review Checklist](#review-checklist)
- [Before Finishing](#before-finishing)
- [Forbidden Actions](#forbidden-actions)
- [Known Repository Conditions](#known-repository-conditions)

## Mission

Work as a careful senior engineer in the existing Diana Vue Admin Panel codebase. Deliver the
smallest complete change that satisfies the requested outcome while preserving the repository's
architecture, conventions, user work, accessibility, themes, and bidirectional layout support.

Never mistake scaffolding for implemented architecture. This repository does not currently have
a data layer, domain layer, authentication system, application stores, or production dashboard
features. Do not invent those systems unless the task explicitly authorizes their design and
implementation.

Every coding task must begin by reading this file.

## Required Reading

Before implementing a feature or architectural change, read:

1. This `AGENTS.md`.
2. [`CLAUDE.md`](CLAUDE.md).
3. [`docs/ARCHITECTURE.md`](docs/ARCHITECTURE.md).
4. The relevant decision records under [`docs/ADR`](docs/ADR).
5. The applicable guide:
   - [`docs/PROJECT_STRUCTURE.md`](docs/PROJECT_STRUCTURE.md)
   - [`docs/CODE_CONVENTIONS.md`](docs/CODE_CONVENTIONS.md)
   - [`docs/DEVELOPMENT_GUIDE.md`](docs/DEVELOPMENT_GUIDE.md)
   - [`docs/CONTRIBUTING.md`](docs/CONTRIBUTING.md)

Documentation supplements source inspection; it does not replace it. Verify important behavior
against current files before changing them.

## Project Overview

Diana is a client-side Vue 3 admin-panel foundation and UI component showcase.

Implemented capabilities include:

- A Vite-built single-page application.
- An admin shell with a sidebar, header, breadcrumbs, content area, and footer.
- Explicit Vue Router route groups.
- A reusable `Di*` component library built with Tailwind CSS and DaisyUI.
- Light and dark Diana themes.
- Vue I18n with six configured locales.
- RTL support for Persian, Arabic, and Hebrew.
- Persisted language and theme preferences through VueUse.
- Route progress through NProgress.
- Shiki-based source previews for component demonstrations.

The repository is not currently a completed business application. Dashboard content and several
demonstrations are placeholders. Pinia is installed and registered but unused.

Primary tools:

- Vue 3 and Composition API
- TypeScript
- Vite
- Vue Router
- Vue I18n
- Pinia
- Tailwind CSS 4
- DaisyUI 5
- VueUse
- Vitest
- Playwright
- ESLint and Prettier
- pnpm

Supported Node.js versions are `^20.19.0` or `>=22.12.0`.

## Architecture Summary

The application bootstrap in `src/app/main.ts` creates Vue, registers Pinia, Router, and I18n,
attaches NProgress, imports global CSS, and mounts `src/App.vue`.

`App.vue` renders the top-level `RouterView`. Route groups select `DefaultLayout`, which composes
the application shell and renders a nested route outlet.

The current route-to-UI flow is:

```text
router
  -> layout
      -> page wrapper
          -> feature page
              -> feature UI/demo
                  -> shared UI components
```

Cross-cutting browser UI state is currently held in local refs, module-scoped composables, or
VueUse local-storage refs. There are no Pinia stores.

There is no:

- Nuxt or server-side rendering.
- HTTP client or API configuration.
- Service or repository layer.
- DTO or domain-model layer.
- Authentication or authorization.
- Server-state cache.
- Error-normalization architecture.

See [`docs/ARCHITECTURE.md`](docs/ARCHITECTURE.md) and the ADRs for the complete implemented
architecture and recorded decisions.

## Folder Responsibilities

| Path                     | Responsibility                                                                 |
| ------------------------ | ------------------------------------------------------------------------------ |
| `src/app`                | Application creation, router assembly, I18n setup, global registration         |
| `src/layouts`            | Route shells such as the main admin layout                                     |
| `src/pages`              | Thin router-facing wrappers                                                    |
| `src/features`           | Feature-group routes, feature pages, and feature-specific UI                   |
| `src/shared/ui/base`     | Reusable `Di*` design-system primitives                                        |
| `src/shared/ui/layout`   | Header, sidebar, menu, and other shell UI                                      |
| `src/shared/ui/patterns` | Reusable composed presentation patterns                                        |
| `src/shared/composables` | Cross-feature Composition API behavior                                         |
| `src/shared/config`      | Static shared configuration, currently the menu                                |
| `src/shared/icons`       | Typed asynchronous icon registry                                               |
| `src/shared/locales`     | Locale message dictionaries                                                    |
| `src/shared/types`       | Shared UI types and generated declarations                                     |
| `src/shared/utils`       | Utilities; currently contains sidebar state despite composable behavior        |
| `src/plugins`            | Explicit third-party integration modules                                       |
| `src/assets/css`         | Global CSS, themes, fonts, transitions, DaisyUI overrides                      |
| `src/assets/fonts`       | Local font files                                                               |
| `src/assets/images`      | Logos and static images                                                        |
| `e2e`                    | Playwright configuration scope and tests                                       |
| `docs`                   | Architecture, structure, development, contribution, and decision documentation |
| `docs/ADR`               | Architecture Decision Records                                                  |

`src/core` is configured as an alias target but does not exist. There are no established folders
for stores, APIs, services, repositories, DTOs, or domain models.

## Dependency Direction

Preserve this direction:

```text
app -> route definitions, layouts, plugins
layouts -> shared
pages -> features
features -> shared
shared -> shared
```

Rules:

- `shared` must never import feature-specific code.
- Feature code must not be placed in application bootstrap files.
- Features should not depend on other features without an explicit architectural decision.
- Page wrappers remain thin unless route-specific orchestration justifies additional logic.
- Feature-only components remain colocated with their feature.
- Reusable, domain-independent UI may be promoted to `shared`.
- Do not create circular dependencies between base components.

These boundaries are conventions rather than lint-enforced restrictions. Agents are responsible
for preserving them.

## Coding Conventions

Repository formatting:

- UTF-8.
- LF line endings.
- Two-space indentation.
- Spaces, not tabs.
- Final newline.
- No semicolons.
- Single quotes.
- Prettier print width of 100.

Repository practices:

- Use Vue Composition API.
- Keep changes focused and avoid unrelated cleanup.
- Prefer clear names over abbreviations.
- Use semantic browser elements.
- Remove diagnostic logging.
- Clean up global listeners and document mutations.
- Do not add abstractions without a demonstrated responsibility.
- Keep comments for non-obvious intent, browser behavior, or lifecycle requirements.

The configured `pnpm lint` and `pnpm format` commands modify files. Inspect the diff after using
either command.

## Vue Conventions

- Use `<script setup lang="ts">`.
- Prefer `ref` for owned mutable state.
- Prefer `computed` for derived state.
- Use `watch` or `watchEffect` only for side effects.
- Use lifecycle hooks for setup and cleanup tied to a component instance.
- Keep one source of truth for model state.
- Use `defineModel` or `modelValue`/`update:modelValue` deliberately.
- Use typed `defineProps`, `defineEmits`, and public slot props.
- Use `withDefaults` for optional props with defaults.
- Avoid Options API additions unless an explicit migration need exists.
- Keep templates readable by moving complex class and state decisions to script.
- Do not destructure reactive props in a way that loses reactivity.
- Clean up document and window listeners when a component unmounts.
- Treat Teleport, focus management, scroll locking, and overlays as lifecycle-sensitive behavior.

## TypeScript Conventions

- Prefer type aliases; ESLint enforces type aliases over interfaces.
- Use `import type` for type-only imports.
- Use literal unions for controlled variants, positions, and sizes.
- Reuse shared types only when contracts are truly identical.
- Type public component events and models.
- Avoid new `any` types. Use concrete types, generics, `unknown`, or narrow records.
- Do not suppress compiler errors without documenting and justifying why.
- Keep application and Vite alias definitions synchronized.
- Run `vue-tsc`, not plain `tsc`, for application type checking.
- Do not treat generated declaration files as hand-maintained domain types.

Existing `any` usage, notably in `DiDropdown`, is technical debt rather than a model for new
code.

## Component Rules

Shared design-system components:

- Use the `Di` prefix and PascalCase filenames.
- Live under `src/shared/ui/base`.
- Expose a coherent, typed public API.
- Provide explicit prop defaults.
- Prefer slots for meaningful structural extension.
- Use typed events for observable behavior.
- Use existing `Size`, `Variant`, and component variant types when appropriate.
- Prefer explicit class maps over unrestricted dynamic class generation.
- Work in both Diana themes.
- Work in LTR and RTL where direction is relevant.
- Preserve native semantics and keyboard behavior.
- Give icon-only controls accessible names.
- Handle disabled, loading, and read-only states consistently.
- Clean up listeners, timers, body styles, and other global effects.
- Avoid feature-specific assumptions.

Composed reusable patterns belong in `src/shared/ui/patterns`. Application-shell components
belong in `src/shared/ui/layout`.

Do not make a component shared solely because two lines of markup look similar.

## Feature Rules

The current feature shape is:

```text
src/pages/<group>/<route>.vue
src/features/<group>/routes.ts
src/features/<group>/<feature>/<Feature>Page.vue
src/features/<group>/<feature>/ui/<Feature>Demo.vue
```

When adding a feature:

- Keep its internal UI colocated.
- Use the page wrapper as the router adapter.
- Register its route explicitly.
- Add menu navigation only if the route exists.
- Add route metadata and translations where applicable.
- Lazy-load route components.
- Reuse shared UI before introducing duplicates.
- Do not fill placeholder areas with invented requirements.

There is no automatic filesystem routing.

## Import Rules

Available aliases:

| Alias       | Target         |
| ----------- | -------------- |
| `@`         | `src`          |
| `@app`      | `src/app`      |
| `@core`     | `src/core`     |
| `@features` | `src/features` |
| `@shared`   | `src/shared`   |
| `@layouts`  | `src/layouts`  |
| `@pages`    | `src/pages`    |
| `@assets`   | `src/assets`   |

Rules:

- Use package imports for external dependencies.
- Use `import type` separately for types.
- Use aliases across architectural or distant directory boundaries.
- Use relative imports for tightly colocated files where adjacent code does so.
- Allow ESLint to enforce import ordering.
- Do not use `@core` until a real `src/core` responsibility is approved and implemented.
- Do not mix aliases merely for style cleanup in an unrelated change.

The repository currently mixes `@/shared/...` and `@shared/...`; preserve the local style unless
the task is explicitly a consistency refactor.

## Styling Rules

- Prefer Tailwind utilities for layout and local presentation.
- Prefer DaisyUI semantic component classes.
- Use semantic theme tokens instead of hardcoded light- or dark-only colors.
- Keep global CSS for theme definitions, fonts, transitions, base styles, and justified
  DaisyUI overrides.
- Use scoped CSS only for behavior that is genuinely component-specific.
- Use `ltr:` and `rtl:` utilities for direction-dependent layout.
- Avoid arbitrary dynamic Tailwind class strings that the scanner cannot discover.
- When dynamic variants are needed, map controlled values to complete static class strings.
- Verify focus, hover, disabled, and active states.

Do not expand global styles for a one-off feature presentation issue.

## Theme Rules

Implemented theme names:

- `diana-light`
- `diana-dark`

The active name is assigned to `document.documentElement.dataset.theme` and persisted in the
`theme` local-storage key.

Rules:

- Define new theme tokens in both themes.
- Use stable semantic token names.
- Verify contrast and component states in both themes.
- Consume shared theme state through `useTheme`.
- Do not create additional duplicate theme watchers.
- Do not rename theme identifiers without updating persistence and every consumer.

`ThemeToggle.vue` currently duplicates logic from `useTheme`; this is known debt, not a
convention to repeat.

## Localization Rules

Configured locales:

- English (`en`)
- Persian (`fa`)
- Arabic (`ar`)
- Hebrew (`he`)
- French (`fr`)
- Spanish (`es`)

English is the default and fallback. Persian, Arabic, and Hebrew are RTL.

Rules:

- Use stable translation keys for localized user-facing text.
- Store translation keys, not translated strings, in route metadata.
- Add English text and every translation required by the task.
- Do not assume locale dictionaries have equivalent coverage.
- Use `useI18n` in scripts and `$t` in templates.
- Use the existing language flow to set document language and direction.
- Use `useDirection` when script behavior depends on direction.
- Test layout in an RTL locale when spacing, alignment, icons, drawers, breadcrumbs, or menus
  change.

Literal English already exists in placeholders and menu entries. It should not automatically be
copied into new localized functionality.

## Before Every Task

1. Read this file and the required architecture documentation.
2. Parse the user's requested outcome and restrictions.
3. Inspect `git status` without modifying the worktree.
4. Identify pre-existing user changes and preserve them.
5. Locate the relevant files and direct consumers.
6. Read the complete target files.
7. Trace route, menu, locale, theme, type, and component dependencies.
8. Check the applicable ADRs.
9. Determine which checks may write files.
10. Clarify only when a missing decision would materially change the result or exceed authority.

Do not start by generating scaffolding.

## During Implementation

- Make the smallest coherent change.
- Preserve neighboring conventions.
- Keep application code changes within the requested scope.
- Update all coupled locations, such as route plus menu plus translations.
- Protect unrelated working-tree changes.
- Use existing shared components and types when semantically appropriate.
- Maintain light/dark and LTR/RTL behavior.
- Keep accessibility part of implementation, not a follow-up.
- Add cleanup for global effects at the time they are introduced.
- Update documentation and ADRs when a lasting architectural decision changes.
- Inspect the diff periodically during larger work.
- Communicate blockers and important assumptions clearly.

## Review Checklist

### Architecture

- [ ] Dependency direction is preserved.
- [ ] No unrequested data, store, auth, or domain architecture was invented.
- [ ] Shared code has no feature dependency.
- [ ] Feature-only code remains colocated.

### Correctness

- [ ] The requested behavior is complete.
- [ ] Routes, wrappers, features, menu entries, metadata, and translations agree.
- [ ] Global listeners and styles are cleaned up.
- [ ] Error and disabled states are handled.

### Code quality

- [ ] Props, events, models, and slots are typed.
- [ ] New `any` usage was avoided.
- [ ] Names communicate responsibility.
- [ ] No unrelated formatting or refactoring is present.
- [ ] Imports follow configured boundaries and sorting.

### UI

- [ ] Light and dark themes were considered.
- [ ] LTR and RTL were considered.
- [ ] Keyboard use and focus were considered.
- [ ] Icon-only controls have accessible names.
- [ ] Tailwind classes are statically discoverable where required.

### Verification

- [ ] Relevant type, build, test, lint, and formatting checks were selected.
- [ ] Mutating tools were allowed before running them.
- [ ] Test claims match actual commands.
- [ ] Generated artifacts are not unintentionally included.

## Before Finishing

1. Review the complete diff.
2. Confirm no unrelated file changed.
3. Recheck `git status`.
4. Run proportionate verification permitted by the task.
5. Inspect changes made by linting or formatting.
6. Confirm new documentation links resolve.
7. Confirm no build, report, cache, or local file is included accidentally.
8. Report:
   - Files changed.
   - Behavior or documentation delivered.
   - Important decisions.
   - Commands run and results.
   - Checks not run and why.
   - Remaining known limitations within scope.

Do not create a commit unless explicitly requested.

## Forbidden Actions

Agents must not:

- Discard, overwrite, or hide user changes.
- Use destructive Git commands without explicit authorization.
- Create, amend, rebase, reset, or force-push commits unless explicitly requested.
- Modify application code when the task is documentation-only.
- Add dependencies without a demonstrated need and authorization.
- Create services, repositories, stores, DTOs, domain models, authentication, or `src/core`
  merely because those concepts are common elsewhere.
- Present proposed architecture as implemented.
- Add sidebar links without working routes.
- Add untranslated user-facing content to an otherwise localized feature without noting it.
- Bypass the typed icon registry with arbitrary icon names.
- Add permanent debug logging.
- Leave document listeners, timers, or global styles without cleanup.
- Run mutating lint, format, build, or test commands when file modification is prohibited.
- Claim a check passed if it was not executed.
- Treat the stale E2E test as valid evidence.
- Commit generated build output, caches, reports, or dependencies.
- Perform broad style cleanup during an unrelated task.

## Known Repository Conditions

Account for these current facts:

- `src/app/pinia.ts` is empty.
- Pinia has no stores.
- `EmptyLayout.vue` is empty and unused.
- `@core` targets a directory that does not exist.
- `/projects` sidebar routes are not implemented.
- No catch-all or not-found route exists.
- Dashboard route metadata is incomplete.
- All dashboard pages are placeholders.
- Several UI demos are placeholders.
- Locale coverage is uneven.
- Theme logic is duplicated.
- No unit tests exist.
- `e2e/vue.spec.ts` asserts removed Vue starter content.
- Browser-global effects are distributed across several components.
- Modal scroll locking is not coordinated for multiple simultaneous modals.
- Some dynamic Tailwind class construction may not generate required utilities.
