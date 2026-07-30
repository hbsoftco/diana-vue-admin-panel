# ADR 0005: TypeScript and Vue Type Style

- Status: Accepted
- Date: 2026-07-30

## Table of Contents

- [Context](#context)
- [Decision](#decision)
- [Consequences](#consequences)

## Context

The repository uses TypeScript for Vue application code and tooling. Vue SFC type checking is
performed by `vue-tsc`. ESLint uses Antfu's TypeScript and Vue rules and explicitly requires
type aliases rather than interfaces.

Existing base components generally type props and events, but some APIs—especially the generic
dropdown—use `any`. Shared presentation unions exist for sizes and variants. No domain types or
DTOs exist.

## Decision

Use the following TypeScript style:

- Use `<script setup lang="ts">` for Vue component logic.
- Prefer type aliases over interfaces.
- Use `import type` for type-only dependencies.
- Type public props, events, models, and slot data.
- Use `withDefaults` for optional prop defaults.
- Use literal unions for controlled UI values.
- Use generics when they preserve caller types across reusable APIs.
- Prefer concrete types or `unknown` over `any`.
- Share types only when multiple consumers have the same semantic contract.
- Keep generated component declarations separate from authored application types.
- Use `vue-tsc --build` as the application type check.
- Keep TypeScript and Vite aliases synchronized.

Existing `any` usage may be refactored incrementally. This decision does not require a broad
immediate rewrite.

## Consequences

### Positive

- Component APIs remain discoverable in editors.
- Invalid variants, sizes, event payloads, and icon names are detected early.
- Type-only imports communicate runtime boundaries.
- Literal unions match the controlled design-system API.
- The convention aligns with enforced ESLint rules.

### Negative

- Highly generic Vue components may require more complex typing.
- Some DaisyUI and slot patterns are easier to express loosely.
- Incremental improvement means strictness remains uneven for a time.

### Follow-up implications

- New `any` usage requires explicit justification.
- `DiDropdown` is a candidate for a focused generic typing improvement.
- The first domain and DTO types require a separate placement and boundary decision.
- Compiler suppressions should be rare, documented, and locally scoped.
