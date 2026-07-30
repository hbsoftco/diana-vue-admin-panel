# ADR 0001: Client-Side Vue Feature-Oriented Architecture

- Status: Accepted
- Date: 2026-07-30

## Table of Contents

- [Context](#context)
- [Decision](#decision)
- [Consequences](#consequences)

## Context

Diana is currently an admin-panel foundation and UI component showcase. It needs a clear
separation between application assembly, route shells, router-facing pages, feature ownership,
and reusable UI.

The repository uses Vue 3, TypeScript, Vite, Vue Router, Vue I18n, Tailwind CSS, and DaisyUI. It
does not use Nuxt, server-side rendering, or a backend integration. Pinia is registered but no
stores exist. No service, repository, DTO, or domain-model architecture has been implemented.

The existing source already groups substantial UI by feature while keeping reusable components
under `shared`.

## Decision

The project will retain its client-side Vue single-page architecture and feature-oriented
dependency model:

```text
app -> routes and layouts -> pages -> features -> shared
```

More precisely:

- `src/app` remains the composition root for global application integrations.
- Vue Router remains responsible for selecting layouts and lazy-loading page wrappers.
- `src/pages` remains the router-facing adapter layer.
- `src/features` owns feature-specific pages, UI, and group route definitions.
- `src/shared` owns domain-independent components, composables, types, configuration, icons,
  locales, and utilities.
- Global browser integrations remain explicit rather than hidden in feature modules.

No data, domain, authentication, or store architecture is selected by this decision. Those
require separate decisions when real requirements exist.

## Consequences

### Positive

- Feature ownership remains visible.
- Reusable UI has a clear dependency boundary.
- Route components can be lazy-loaded.
- Application bootstrap remains small.
- The architecture can grow without requiring a framework change.
- Missing layers are not prematurely invented.

### Negative

- Dependency boundaries are conventional and not lint-enforced.
- The page-to-feature adapter introduces an extra file for every route.
- Browser-only assumptions remain present.
- Explicit route composition requires coordinated updates.

### Follow-up implications

- Shared code must not import feature code.
- Feature-to-feature dependencies require deliberate review.
- A move to SSR, Nuxt, or a backend-for-frontend would require a new ADR.
- The first state and data architecture must be documented separately.
