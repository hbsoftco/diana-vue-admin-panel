# ADR 0003: Diana Component Library

- Status: Accepted
- Date: 2026-07-30

## Table of Contents

- [Context](#context)
- [Decision](#decision)
- [Consequences](#consequences)

## Context

The repository's most developed functionality is a reusable UI library. Existing components
wrap DaisyUI behavior with Diana-specific TypeScript APIs, Tailwind classes, theme tokens,
slots, models, events, RTL handling, and icon integration.

The project also contains demonstration pages and a Shiki-based preview pattern. Some
demonstrations remain placeholders, and automated component tests do not yet exist.

## Decision

Maintain a repository-local Diana component library under `src/shared/ui`:

- Base primitives live in `src/shared/ui/base`.
- Components use the `Di` prefix.
- Application-shell components live in `src/shared/ui/layout`.
- Reusable compositions live in `src/shared/ui/patterns`.
- Feature-specific UI remains inside its feature.

Base components will:

- Use Vue Composition API and TypeScript.
- Expose typed props, events, models, and public slot data.
- Use DaisyUI as the behavioral and semantic CSS foundation.
- Use Tailwind utilities and explicit static class maps.
- Support both `diana-light` and `diana-dark`.
- Support RTL where direction matters.
- Preserve native semantics, accessible names, focus, and keyboard behavior.
- Register shared icons through the typed icon registry.
- Clean up global listeners and document effects.

Demonstration pages should document real supported APIs rather than serve as the source of
component behavior.

## Consequences

### Positive

- UI behavior and visual language become consistent.
- Feature code can depend on stable primitives.
- Typed icon and component contracts catch invalid use early.
- Theme and RTL requirements can be solved centrally.
- Showcase pages provide discoverability.

### Negative

- Wrapper components can accumulate too many props if responsibilities are not controlled.
- DaisyUI upgrades may affect multiple primitives.
- The repository must maintain accessibility and lifecycle behavior that wrappers introduce.
- The absence of component tests increases regression risk.

### Follow-up implications

- Interactive primitives should gain component tests.
- Existing `any`-heavy APIs should be improved through scoped refactors.
- Placeholder demonstrations should be completed or removed.
- Public component API changes should be treated as compatibility-sensitive.
- Do not promote feature components to shared without demonstrated reuse.
