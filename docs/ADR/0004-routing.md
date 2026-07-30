# ADR 0004: Explicit Vue Router Composition

- Status: Accepted
- Date: 2026-07-30

## Table of Contents

- [Context](#context)
- [Decision](#decision)
- [Consequences](#consequences)

## Context

The project uses Vue Router with browser history. Routes are grouped into dashboards, UI
elements, and advanced UI. Each group uses `DefaultLayout` and lazy-loads child page wrappers.
The layout consumes route metadata for titles and breadcrumbs.

There is no filesystem router, authentication guard, catch-all route, or route-level data
loader. Some sidebar links currently have no matching routes, and dashboard route metadata is
incomplete.

## Decision

Retain explicit Vue Router composition:

- `src/app/router.ts` assembles feature-group route objects.
- Each feature group owns `src/features/<group>/routes.ts`.
- Parent route records select the layout.
- Child page components are lazy-loaded.
- `src/pages` components act as thin route adapters to feature pages.
- Route metadata stores translation keys for page titles and breadcrumbs.
- Sidebar navigation remains separately configured in `src/shared/config/menu.ts`.

Every new sidebar destination must have a working route. Route, page, feature, menu, metadata,
and locale changes must be treated as one coordinated unit.

This decision does not add missing catch-all, authentication, authorization, or data-loading
behavior.

## Consequences

### Positive

- Route ownership is explicit and searchable.
- Feature groups can be loaded independently.
- Layout selection remains declarative.
- Route metadata drives consistent shell behavior.
- The model works without a filesystem-routing dependency.

### Negative

- Several files and configurations must be synchronized manually.
- Menu and route configuration can drift.
- Page wrappers add indirection.
- Browser-history hosting requires an `index.html` fallback.

### Follow-up implications

- Add automated checks or tests for route/menu consistency when practical.
- Add an intentional not-found route through a separate scoped change.
- Complete dashboard metadata.
- Do not copy the existing unrouted project menu entries.
- Authentication or route-level loading requires another ADR if it introduces a cross-cutting
  pattern.
