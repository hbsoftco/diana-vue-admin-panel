---
name: create-di-component
description: Create, extend, or document reusable Diana design-system components whose public name starts with Di. Use when adding a new base UI primitive, wrapping or extending a daisyUI component, changing a Di component API, creating its component showcase, or integrating its page, route, sidebar entry, icons, styles, translations, and tests. Do not use for feature-specific business UI that belongs inside one feature.
argument-hint: '[DiComponentName] [component|showcase|full]'
---

# Create a Diana design-system component

Requested input: `$ARGUMENTS`

Build a reusable, production-quality component for the Diana Vue Admin Panel and design system. Work from the current repository state; do not assume that every existing implementation is a good precedent.

## Read project guidance

Before editing, read:

1. `${CLAUDE_SKILL_DIR}/references/diana-conventions.md`
2. `${CLAUDE_SKILL_DIR}/references/component-quality-gates.md`
3. `${CLAUDE_SKILL_DIR}/references/showcase-integration.md`

Then inspect the current repository files named by those references. The repository is the source of current paths and available APIs; the references define the preferred direction when existing code is inconsistent.

## Resolve the requested scope

Infer one of these modes from the request:

- `component`: implement or update only the reusable component and directly required shared types, icons, or styles.
- `showcase`: add or update only documentation/demo integration for an existing component.
- `full`: implement the component and its complete Diana showcase integration.

If the request does not name a mode:

- use `component` for a narrow implementation or API change;
- use `full` when the user asks to add a new design-system component to Diana;
- do not create showcase infrastructure for a private or feature-specific component.

Ask one focused question only when the component's semantics or public behavior cannot be inferred safely. Do not ask about choices that can be resolved by inspecting daisyUI, nearby Diana components, or the task itself.

## Phase 1 — Discover before designing

1. Confirm the component belongs in the design system:
   - It is reusable across multiple features.
   - Its API represents UI semantics rather than one business domain.
   - Its name should be `Di<Name>` in PascalCase.
2. Search for:
   - an existing `Di<Name>` implementation;
   - equivalent daisyUI primitives;
   - nearby Diana components with similar behavior;
   - reusable `Size`, variant, icon, or model types;
   - existing custom CSS, locale keys, demos, routes, and sidebar entries.
3. Inspect at least:
   - two behaviorally similar `src/shared/ui/base/Di*.vue` components;
   - `src/shared/types/models/index.ts`;
   - `src/shared/icons/registry.ts` when icons are involved;
   - the relevant theme and `src/assets/css/di-ui` files when styling is involved.
4. For interactive components, inspect current tests and the closest interactive component, but do not copy known defects.

Before editing, state a compact implementation plan containing:

- target files;
- public API;
- state/model strategy;
- accessibility behavior;
- whether custom CSS, icons, translations, tests, or showcase integration are required.

## Phase 2 — Design the public API

Design the smallest semantic API that covers the requested behavior.

### API rules

- Prefer semantic props such as `variant`, `size`, `disabled`, `loading`, `placement`, and `modelValue`.
- Do not expose one prop per CSS declaration.
- Do not add `customClass`, `contentClass`, arbitrary color strings, padding strings, or similar escape hatches unless the repository already depends on that API or the use case cannot be expressed through attributes and slots.
- Let normal Vue attribute fallthrough carry `class`, `style`, `id`, `data-*`, and `aria-*` to a single root element.
- Use slots for composable content, not many content-specific props.
- Type props, emits, models, and scoped slots. Do not introduce `any`.
- Reuse a shared type only when its semantics truly match. Add a shared type only when it is used by more than one public component or is clearly part of the system-wide API.
- Preserve backward compatibility when modifying an existing public component unless the user explicitly authorizes a breaking change.
- Do not add variants merely because daisyUI exposes them. Add only variants supported by Diana's design language and requested use cases.

### Model rules

- Use `defineModel<T>()` for a straightforward single `v-model`.
- Use explicit props and typed emits when lifecycle events, multiple models, controlled/uncontrolled behavior, or compatibility requirements make the contract clearer.
- Never keep an unsynchronized local copy of a controlled prop.
- Emit lifecycle events exactly once per real transition.

## Phase 3 — Implement the component

Create or update:

`src/shared/ui/base/Di<Name>.vue`

Follow this order when sections are needed:

1. imports;
2. shared imported types;
3. local types;
4. props/defaults;
5. models/emits/slots;
6. composables;
7. constants and static class maps;
8. state;
9. computed values;
10. methods;
11. watchers and lifecycle;
12. template;
13. scoped style only when genuinely component-local.

Do not add empty sections or empty `<style>` blocks.

### Vue and TypeScript rules

- Use `<script setup lang="ts">`.
- Use `type`, not `interface`, unless extending a third-party interface is necessary.
- Use discriminated unions when combinations of props would otherwise allow invalid states.
- Use `Record<Union, string>` for finite class maps.
- Keep constants outside reactive computation when they are static.
- Avoid unnecessary watchers; prefer computed state and event-driven updates.
- Clean up listeners, observers, timers, body mutations, and locks on unmount.
- Preserve SSR-safe boundaries where practical: browser globals belong in lifecycle code or guarded paths.
- Use aliases consistently with the nearest maintained files; prefer the explicit aliases (`@shared`, `@features`, and similar) for cross-boundary imports and relative imports within one local folder.

### Styling rules

- Use daisyUI as the primitive layer and Tailwind utilities for Diana composition.
- Use semantic theme tokens instead of literal product colors.
- Hard-coded brand colors are allowed only for third-party brand identity and must be isolated.
- Do not use `dark:` as the primary theme mechanism; Diana themes are selected through `data-theme`.
- Avoid interpolated Tailwind classes such as `` `text-${size}` `` or `` `${breakpoint}:drawer-open` ``. Use complete static class maps so Tailwind can discover every class.
- Use logical spacing and positioning utilities (`ps`, `pe`, `start`, `end`) when direction should mirror.
- Call `useDirection()` only when behavior, ordering, or icon direction changes—not merely for logical CSS.
- Add `src/assets/css/di-ui/di-<name>.css` only for reusable component styling that is awkward, unsafe, or excessively repetitive in utilities.
- If a new CSS file is added, import it from `src/assets/css/style.css`.
- Never add an empty CSS file.

### Icon rules

- Use `DiIcon` and `IconName` for configurable public icons.
- Add an icon to `src/shared/icons/registry.ts` only when it is needed by the reusable component or Diana navigation.
- Direct auto-imported icon components are acceptable in showcase-only markup, but not as an untyped public icon API.

## Phase 4 — Build accessibility into the behavior

Treat accessibility as part of the component contract.

- Start with the correct native element.
- Support keyboard behavior matching the component's established ARIA pattern.
- Expose focus visibly in both Diana themes.
- Reflect disabled, expanded, selected, checked, busy, invalid, modal, and live-region state with native semantics or ARIA as appropriate.
- Do not use clickable `div` or `span` elements when a button, link, input, details, dialog, or another semantic element fits.
- Provide accessible names for icon-only controls.
- For overlays, handle focus entry, focus return, Escape, backdrop semantics, scroll locking, and stacked instances where applicable.
- Generate stable IDs with `useId()` for relationships such as label/control and trigger/content.
- Decorative icons should be hidden from assistive technology; meaningful icons need accessible text through surrounding content or an explicit label.

Consult the quality-gates reference before declaring the component complete.

## Phase 5 — Add tests when behavior warrants them

Add a colocated or repository-consistent Vitest test for a component that has:

- user interaction;
- `v-model`;
- keyboard behavior;
- controlled state;
- timers/listeners/observers;
- nontrivial conditional rendering;
- accessibility state transitions.

Test observable behavior and public contracts. Avoid snapshots as the primary assertion.

At minimum cover:

- defaults and essential rendering;
- model/event behavior;
- disabled behavior;
- keyboard interaction;
- ARIA/state attributes;
- cleanup for global side effects.

A purely visual class wrapper may omit a unit test only when its behavior is trivial; explain that decision in the final report.

## Phase 6 — Integrate the Diana showcase

Run this phase in `showcase` or `full` mode.

Choose the category:

- `ui-elements` for foundational primitives and common controls;
- `advanced-ui` for composite, overlay, disclosure, navigation, or interaction-heavy components.

Follow `${CLAUDE_SKILL_DIR}/references/showcase-integration.md`.

Show every meaningful public capability, but do not render a meaningless Cartesian product of every prop. Include:

- default usage;
- semantic variants and sizes;
- disabled/loading/error or empty states when relevant;
- controlled usage;
- keyboard/accessibility behavior when useful;
- RTL-sensitive behavior when applicable;
- one realistic composition example.

Use `PreviewCodeCard` for focused examples. Ensure displayed code matches the actual rendered API.

## Phase 7 — Validate

Run the narrowest useful checks first, then the project gates:

1. relevant unit test with `pnpm test:unit --run <pattern>` when tests exist;
2. `pnpm type-check`;
3. `pnpm lint`;
4. rerun the relevant test if lint changed files;
5. `pnpm build`;
6. relevant Playwright test only when a routed showcase or cross-component interaction warrants it.

Remember that `pnpm lint` uses `--fix`; inspect the diff afterward.

Do not hide unrelated failures. Separate:

- failures caused by the change;
- pre-existing failures;
- checks not run.

Inspect the final diff for:

- accidental public API expansion;
- duplicated types;
- dynamic Tailwind class construction;
- hard-coded theme colors;
- missing locale/schema updates;
- inaccessible interactions;
- uncleaned global side effects;
- unrelated formatting churn.

## Final response

Report:

1. component and mode;
2. public API decisions;
3. files created or changed;
4. accessibility behavior;
5. tests and commands run with results;
6. compatibility notes or remaining risks.

Do not claim a command passed unless it was actually run.
