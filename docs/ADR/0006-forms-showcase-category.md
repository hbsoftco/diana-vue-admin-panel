# ADR 0006: Forms Showcase Category

- Status: Accepted
- Date: 2026-07-31

## Context

Form controls are reusable design-system primitives, but their documentation should not be mixed
with general UI Elements or Advanced UI. The project previously had no Forms route or feature
group. `DiSelect` is the first documented form component and establishes the placement convention
for later form controls.

## Decision

Create a dedicated `/forms` route group with matching feature, page, sidebar, and locale ownership:

- Reusable form primitives remain in `src/shared/ui/base`.
- Form showcases live in `src/features/forms/<group>/<component>`.
- Router-facing wrappers live in `src/pages/forms`.
- Forms routes are composed explicitly through `src/features/forms/routes.ts`.
- Future form-control showcases should use this category rather than `ui-elements` or
  `advanced-ui`.
- Form controls are grouped beneath the `Form Elements` navigation level and use canonical URLs
  under `/forms/form-elements`.

Compound primitives may use a colocated directory under `src/shared/ui/base` when they contain
multiple public parts, shared types, and context composables.

## Consequences

- Form documentation has clear ownership and room to grow.
- Related controls can be discovered through a scalable three-level navigation hierarchy.
- Shared components remain independent from their showcase feature.
- Adding a form component requires coordinated route, page, menu, and locale updates.
- The sidebar gains another top-level category.
