---
name: create-di-component
description: Create, resume, extend, test, document, or integrate reusable Diana design-system components whose public names start with Di. Use when adding a new base UI component, wrapping or extending a daisyUI component, changing a Di component API, completing an interrupted component task, or creating its demo, page, route, sidebar entry, translations, styles, icons, and tests. Do not use for feature-specific business UI.
---

# Create a Diana design-system component

Use the user-facing invocation:

```text
/create-di-component DiComponentName [full|resume|showcase|component-only]
```

Build a reusable, production-quality component for the Diana Vue Admin Panel and Design System.

The workflow must support both:

- creating a new component from scratch;
- continuing an interrupted or partially completed component.

Do not assume that every existing implementation in the repository is a good precedent. Inspect existing code, preserve valid conventions, and avoid reproducing known inconsistencies.

---

## Phase 0 — Bootstrap

Run this phase before inventory, planning, design, or implementation on every invocation,
including `full`, `resume`, `showcase`, and `component-only`.

### Read repository guidance dynamically

1. Read the repository-root `AGENTS.md` completely.
2. Treat `AGENTS.md` as the documentation entry point and operational authority.
3. Follow the project-documentation references currently defined by `AGENTS.md`.
4. Read the referenced project documentation relevant to the requested component and execution
   mode.
5. Follow further relevant links when needed to understand architecture, conventions, accepted
   decisions, development workflow, or the current project baseline.

Do not maintain a duplicated hardcoded list of project documentation inside this skill.
`AGENTS.md` owns that navigation and may change over time.

### Read skill guidance

Read these skill resources completely:

1. `references/diana-conventions.md`
2. `references/component-quality-gates.md`
3. `references/showcase-integration.md`

Then inspect the current repository.

The repository is the source of truth for:

- current paths;
- existing component APIs;
- installed dependencies;
- existing routes;
- locale structure;
- sidebar structure;
- available shared types;
- available icons;
- existing tests.

The reference files define the preferred direction when existing code is inconsistent.

### Infer current conventions

Before implementation:

1. inspect the current repository configuration and source;
2. analyze at least two behaviorally similar existing `src/shared/ui/base/Di*.vue` components;
3. inspect related shared types, icons, styles, tests, demos, routes, navigation configuration,
   and locale structures;
4. infer current project conventions from maintained source and current documentation;
5. reconcile repository conventions with this skill's preferred quality direction;
6. only then parse the request, resolve the execution mode, and begin implementation.

Never skip this phase because the component appears simple or because prior conversational
context seems sufficient.

---

## Parse the request

Parse the arguments supplied after `/create-di-component` as:

- first argument: component name, such as `DiSwitch`;
- optional second argument:
  - `full`;
  - `resume`;
  - `showcase`;
  - `component-only`.

The component name must:

- use PascalCase;
- start with `Di`;
- represent a reusable, domain-independent UI concept.

Examples:

```text
/create-di-component DiSwitch
/create-di-component DiSwitch full
/create-di-component DiSwitch resume
/create-di-component DiSwitch showcase
/create-di-component DiSwitch component-only
```

---

## Resolve the execution mode

### `full`

Create or complete the reusable component and its entire Diana showcase integration.

Use this mode for every new public `Di*` component unless the user explicitly requests another mode.

A full task includes:

- reusable component;
- relevant unit tests;
- demo;
- feature page;
- router-facing page;
- route registration;
- sidebar registration;
- locale keys;
- styles when required;
- icon registration when required;
- validation.

### `resume`

Continue an interrupted or incomplete full-mode task.

Before making changes:

1. inspect all committed and uncommitted files related to the component;
2. determine which required artifacts already exist;
3. review existing artifacts before trusting them;
4. preserve valid existing work;
5. repair incomplete or invalid work;
6. create only missing artifacts;
7. do not recreate the component or tests from scratch;
8. continue until the full-mode Definition of Done is satisfied.

Use `resume` after:

- an API error;
- gateway failure;
- permission interruption;
- terminal interruption;
- incomplete previous execution;
- partial manual implementation.

### `showcase`

The reusable component already exists.

Create or repair only its showcase and documentation integration:

- demo;
- feature page;
- router-facing page;
- route;
- sidebar;
- locale keys;
- documentation examples;
- showcase-specific tests when necessary.

Do not redesign the reusable component API unless the showcase reveals a blocking correctness or accessibility defect.

### `component-only`

Create or modify only:

- the reusable `Di*` component;
- directly required shared types;
- directly required icon registration;
- directly required custom styles;
- relevant unit tests.

Do not create:

- demos;
- showcase pages;
- router-facing pages;
- routes;
- sidebar entries;
- showcase translations.

### Default mode

When no explicit mode is provided:

- if the reusable component does not exist, use `full`;
- if the component exists but any required full-mode artifact is missing, use `resume`;
- if all full-mode artifacts exist, treat the request as an update to the complete component;
- never default to `component-only`.

---

## Existing-work inventory

Before editing, build an inventory for the requested component.

For a component named `DiSwitch`, inspect likely artifacts such as:

```text
src/shared/ui/base/DiSwitch.vue
src/shared/ui/base/DiSwitch.spec.ts

src/features/ui-elements/switch/ui/SwitchDemo.vue
src/features/ui-elements/switch/SwitchPage.vue

src/features/advanced-ui/switch/ui/SwitchDemo.vue
src/features/advanced-ui/switch/SwitchPage.vue

src/pages/ui-elements/switch.vue
src/pages/advanced-ui/switch.vue

src/features/ui-elements/routes.ts
src/features/advanced-ui/routes.ts

src/shared/ui/layout/AppSidebar.vue
src/shared/icons/registry.ts
src/assets/css/style.css
src/assets/css/di-ui/di-switch.css

src/shared/locales/en.json
src/shared/locales/fa.json
src/shared/locales/ar.json
src/shared/locales/he.json
src/shared/locales/fr.json
src/shared/locales/es.json
```

Also search by:

- component name;
- component slug;
- route path;
- locale keys;
- sidebar item;
- imported component;
- related daisyUI class.

Before editing, report an inventory in this form:

```text
Mode: resume

Existing:
- src/shared/ui/base/DiSwitch.vue
- src/shared/ui/base/DiSwitch.spec.ts

Missing:
- SwitchDemo.vue
- SwitchPage.vue
- router-facing page
- route registration
- sidebar registration
- locale keys

Needs review:
- component accessibility
- unit test completeness
```

Never overwrite an existing valid artifact merely because the task is being resumed.

Never restart an interrupted implementation from scratch unless the existing work is fundamentally unusable, and explain why before replacing it.

---

## Phase 1 — Discover before designing

### Confirm design-system ownership

A component belongs in `src/shared/ui/base` when:

- it is reusable across multiple features;
- its API describes reusable UI semantics;
- it has no dependency on a business domain;
- it can be documented independently;
- it belongs to the Diana Design System.

Do not place feature-specific components in `shared`.

Examples of feature-specific components:

- `UserPermissionTable`;
- `OrderRefundForm`;
- `CustomerInvoiceStatus`;
- `TourSearchFilters`.

Those belong inside their owning feature.

### Search the repository

Before implementation, search for:

- an existing implementation of the requested component;
- an equivalent daisyUI primitive;
- similar Diana components;
- existing shared `Size`, variant, icon, or model types;
- existing custom CSS;
- existing locale keys;
- existing demos;
- existing routes;
- existing sidebar entries;
- existing tests.

Inspect at least:

- two behaviorally similar `src/shared/ui/base/Di*.vue` components;
- `src/shared/types/models/index.ts`;
- `src/shared/icons/registry.ts` when icons are involved;
- relevant CSS and themes when styling is involved;
- relevant demo pages;
- relevant route configuration;
- relevant sidebar section.

### Plan before editing

Before editing, state a compact implementation plan containing:

- resolved mode;
- existing and missing artifacts;
- target showcase category;
- public API;
- model/state strategy;
- accessibility behavior;
- required tests;
- required locale changes;
- required route/sidebar changes;
- whether custom CSS or icon registration is required.

---

## Phase 2 — Choose the showcase category

Use `ui-elements` for:

- foundational primitives;
- common controls;
- form inputs;
- status components;
- badges;
- buttons;
- links;
- typography;
- progress;
- pagination;
- small feedback components.

Use `advanced-ui` for:

- overlays;
- portals;
- modals;
- drawers;
- popovers;
- complex disclosures;
- carousels;
- composite navigation;
- interaction-heavy components;
- components with coordinated keyboard state.

Inspect neighboring Diana components before deciding.

Do not place the same component in both categories.

---

## Phase 3 — Design the public API

Design the smallest semantic API that covers the required behavior.

### API rules

Prefer semantic props such as:

- `variant`;
- `size`;
- `disabled`;
- `readonly`;
- `loading`;
- `modelValue`;
- `placement`;
- `orientation`;
- `required`;
- `invalid`;
- `name`.

Avoid styling-proxy props such as:

- `padding`;
- `margin`;
- `textColor`;
- `backgroundColor`;
- `borderColor`;
- arbitrary Tailwind class fragments;
- arbitrary breakpoint strings;
- arbitrary z-index values.

Do not add props such as:

- `customClass`;
- `contentClass`;
- `headerPadding`;
- `actionsPadding`;
- arbitrary color strings;

unless:

- the existing public API already depends on them;
- backward compatibility requires them;
- the requirement cannot be represented safely through slots and attribute fallthrough.

### Attribute fallthrough

Allow normal Vue attributes to reach the correct root or native control:

- `class`;
- `style`;
- `id`;
- `name`;
- `data-*`;
- `aria-*`;
- native event listeners.

Do not manually proxy every native HTML attribute as a prop.

Use `inheritAttrs: false` only when attributes must be forwarded to a non-root internal element.

### Props and types

- Use precise TypeScript types.
- Do not introduce `any`.
- Avoid broad `string` types when a finite union exists.
- Use discriminated unions when invalid combinations would otherwise be possible.
- Reuse a shared type only when its semantics exactly match.
- Keep component-specific types local.
- Promote a type to shared only when more than one public component needs it.

### Slots

Use slots for composable content.

Type scoped slots with `defineSlots`.

Example:

```ts
defineSlots<{
  default?: () => unknown
  label?: (props: { disabled: boolean }) => unknown
}>()
```

Do not use `any` for slot contracts.

### Emits

Type every emitted event.

Example:

```ts
const emit = defineEmits<{
  change: [value: boolean]
  focus: [event: FocusEvent]
  blur: [event: FocusEvent]
}>()
```

### Model rules

Use `defineModel<T>()` for a straightforward single `v-model`.

Example:

```ts
const model = defineModel<boolean>({
  default: false,
})
```

Use explicit props and emits when:

- multiple models exist;
- lifecycle events are important;
- controlled/uncontrolled behavior is required;
- backward compatibility requires the current contract;
- explicit transitions make the API clearer.

Never keep an unsynchronized local copy of `modelValue`.

Emit lifecycle events exactly once per real transition.

### Compatibility

When modifying an existing component:

- search all usages;
- preserve existing public behavior unless the user authorizes a breaking change;
- do not rename or remove props silently;
- do not change emitted payloads silently;
- report migrations explicitly.

Do not add every daisyUI option merely because it exists. Diana's API should remain intentional.

---

## Phase 4 — Implement the reusable component

Create or update:

```text
src/shared/ui/base/Di<Name>.vue
```

Use this section order when needed:

1. imports;
2. imported shared types;
3. local types;
4. props and defaults;
5. models;
6. emits;
7. slots;
8. composables;
9. constants and static class maps;
10. state;
11. computed values;
12. methods;
13. watchers and lifecycle;
14. template;
15. scoped styles only when truly component-local.

Do not add empty sections.

Do not add empty `<style>` blocks.

### Vue and TypeScript rules

- Use `<script setup lang="ts">`.
- Prefer `type` over `interface`.
- Use precise finite unions.
- Use `Record<Union, string>` for finite class maps.
- Keep static constants outside reactive computation.
- Avoid watchers when computed state or event-driven updates are sufficient.
- Clean up listeners, observers, timers, body mutations, and locks.
- Keep browser-only globals inside guarded or lifecycle-safe code.
- Avoid stale local copies of controlled state.
- Avoid hidden side effects inside computed values.

### Import rules

- Use relative imports inside one local feature directory.
- Prefer explicit aliases for cross-boundary imports:
  - `@shared`;
  - `@features`;
  - `@core`;
  - `@app`;
  - `@layouts`;
  - `@pages`;
  - `@assets`.
- Match existing maintained files when alias usage is temporarily inconsistent.
- Do not introduce a new import style inside the same file group.

### Class composition

Prefer complete static class maps.

Example:

```ts
type SwitchSize = 'xs' | 'sm' | 'md' | 'lg'

const SIZE_CLASSES: Record<SwitchSize, string> = {
  xs: 'toggle-xs',
  sm: 'toggle-sm',
  md: '',
  lg: 'toggle-lg',
}
```

Prefer array class binding:

```ts
const switchClasses = computed(() => [
  'toggle',
  SIZE_CLASSES[props.size],
  VARIANT_CLASSES[props.variant],
  props.disabled && 'toggle-disabled',
])
```

Use `.filter(Boolean).join(' ')` only when a string is specifically required.

---

## Phase 5 — Styling and theming

Use this styling priority:

1. native HTML semantics;
2. daisyUI primitive classes;
3. Tailwind utilities;
4. Diana semantic theme variables and utilities;
5. dedicated component CSS only when necessary.

### Theme rules

Diana themes are selected through:

```text
data-theme="diana-light"
data-theme="diana-dark"
```

Do not build a parallel theme system with scattered `dark:` classes.

Use:

- daisyUI semantic colors;
- Diana CSS variables;
- theme-aware utilities.

Avoid ordinary hard-coded product colors.

Hard-coded colors are acceptable only for external third-party brand identities and must be isolated.

### Tailwind rules

Do not construct Tailwind classes dynamically.

Bad:

```ts
const blurClass = computed(() => `backdrop-blur-${props.blur}`)
```

Good:

```ts
type BackdropBlur = 'xs' | 'sm' | 'md'

const BLUR_CLASSES: Record<BackdropBlur, string> = {
  xs: 'backdrop-blur-xs',
  sm: 'backdrop-blur-sm',
  md: 'backdrop-blur-md',
}
```

Every generated utility class must appear as a complete static string in source.

### RTL rules

Prefer logical classes:

- `start-*`;
- `end-*`;
- `ps-*`;
- `pe-*`;
- `ms-*`;
- `me-*`;
- logical borders and rounded corners where available.

Use `useDirection()` only when behavior changes, such as:

- arrow key direction;
- next/previous icon direction;
- placement calculation;
- item ordering.

Do not use JavaScript direction handling merely for CSS that logical properties can solve.

### Dedicated CSS

Create:

```text
src/assets/css/di-ui/di-<name>.css
```

only when:

- daisyUI and utilities cannot express the behavior safely;
- reusable selectors are required;
- pseudo-elements or complex states are required;
- repeated utilities would become unreasonable;
- animation definitions need a stable home.

When adding custom CSS:

1. import it from `src/assets/css/style.css`;
2. use a stable Diana component class;
3. verify both themes;
4. avoid duplicating daisyUI internals;
5. do not create an empty file.

---

## Phase 6 — Icons

Use `DiIcon` and `IconName` for configurable public icons.

Example:

```ts
import type { IconName } from '@shared/icons/registry'

type Props = {
  icon?: IconName
}
```

Register a new icon in:

```text
src/shared/icons/registry.ts
```

only when:

- the reusable component API requires it;
- Diana navigation requires it;
- it is part of a stable reusable pattern.

Do not register every incidental icon used only inside a demo.

Direct auto-imported Iconify components are acceptable for showcase-only decorative content.

---

## Phase 7 — Accessibility

Accessibility is part of the public contract.

### General rules

- Start with the correct native element.
- Support keyboard behavior expected for the component pattern.
- Preserve visible focus in light and dark themes.
- Expose state with native semantics or ARIA.
- Do not use clickable `div` or `span` when a native interactive element exists.
- Icon-only controls require an accessible name.
- Decorative icons must be hidden from assistive technology.
- Meaningful icons require accessible surrounding text or labels.
- Color must not be the only state indicator.
- Respect reduced-motion preferences for nonessential animation.

### Buttons and links

- Use native `button` or `a`.
- Do not apply `type` or `disabled` to unsupported elements.
- A disabled anchor must prevent activation and expose `aria-disabled`.
- Preserve keyboard activation.

### Form controls

- Allow label association.
- Preserve native form behavior where practical.
- Support relevant attributes:
  - `name`;
  - `required`;
  - `disabled`;
  - `readonly`;
  - `invalid`;
  - `autocomplete`;
  - form association.
- Keep model and native event timing predictable.
- Use native controls whenever possible.

### Disclosure and navigation patterns

For accordion, dropdown, tabs, menu, collapse, or similar components:

- expose expanded or selected state;
- connect trigger and controlled content;
- support expected keyboard navigation;
- support Escape where appropriate;
- do not misuse menu semantics for generic navigation or content lists.

### Overlay components

For modal, drawer, popover, or other overlays:

- expose correct dialog or overlay semantics;
- handle focus entry;
- return focus to the invoker;
- support Escape according to props;
- implement backdrop behavior safely;
- restore body scroll on close and unmount;
- avoid conflicts between stacked overlays;
- label teleported content;
- do not expose an unlabeled interactive backdrop.

### Stable IDs

Use `useId()` for relationships such as:

- label and control;
- trigger and content;
- description and input;
- dialog title and dialog container.

---

## Phase 8 — Tests

Add a Vitest test when the component has:

- user interaction;
- `v-model`;
- controlled state;
- keyboard behavior;
- listeners;
- timers;
- observers;
- global side effects;
- nontrivial conditional rendering;
- accessibility state transitions.

Use the repository-consistent location, normally:

```text
src/shared/ui/base/Di<Name>.spec.ts
```

Test observable behavior and public contracts.

Avoid snapshots as the primary assertion.

At minimum, cover applicable cases:

- default rendering;
- essential classes or native element;
- model behavior;
- emitted payloads;
- disabled or readonly behavior;
- keyboard interaction;
- ARIA state;
- conditional rendering;
- cleanup of listeners and global mutations;
- one meaningful edge case.

A purely visual wrapper may omit a unit test only when its behavior is truly trivial. Report that decision explicitly.

Do not recreate an existing valid test file during `resume`. Review it and add only missing coverage.

---

## Phase 9 — Build the showcase

Run this phase in:

- `full`;
- `resume`;
- `showcase`.

Do not run it in `component-only`.

### Required showcase artifacts

For a `ui-elements` component:

```text
src/features/ui-elements/<slug>/ui/<Name>Demo.vue
src/features/ui-elements/<slug>/<Name>Page.vue
src/pages/ui-elements/<slug>.vue
src/features/ui-elements/routes.ts
```

For an `advanced-ui` component:

```text
src/features/advanced-ui/<slug>/ui/<Name>Demo.vue
src/features/advanced-ui/<slug>/<Name>Page.vue
src/pages/advanced-ui/<slug>.vue
src/features/advanced-ui/routes.ts
```

Also update:

```text
src/shared/ui/layout/AppSidebar.vue
src/shared/locales/en.json
src/shared/locales/fa.json
src/shared/locales/ar.json
src/shared/locales/he.json
src/shared/locales/fr.json
src/shared/locales/es.json
```

### Demo requirements

Use `PreviewCodeCard` for focused examples.

Show meaningful capabilities rather than every possible prop combination.

A normal demo should include applicable examples for:

1. default usage;
2. semantic variants;
3. sizes;
4. disabled state;
5. loading state;
6. invalid or error state;
7. controlled `v-model`;
8. realistic composition;
9. RTL-sensitive behavior;
10. accessibility behavior.

Do not create a huge Cartesian matrix of every boolean prop.

Displayed code must match the rendered implementation.

Use:

- `language="html"` for template-only examples;
- `language="vue"` for complete SFC examples.

### Demo quality

The demo must:

- use the public component API;
- avoid relying on private internals;
- be interactive when the component is interactive;
- use realistic labels and content;
- remain understandable in light and dark themes;
- work in RTL when applicable;
- expose meaningful state changes;
- avoid unrelated business logic.

### Feature page

The feature page must remain thin.

Example:

```vue
<script setup lang="ts">
import SwitchDemo from './ui/SwitchDemo.vue'
</script>

<template>
  <SwitchDemo />
</template>
```

### Router-facing page

The router-facing page must remain thin.

Example:

```vue
<script setup lang="ts">
import SwitchPage from '@features/ui-elements/switch/SwitchPage.vue'
</script>

<template>
  <SwitchPage />
</template>
```

Do not place component logic in `src/pages`.

### Route registration

Add a lazy route using the existing route object shape.

Example:

```ts
{
  path: 'switch',
  component: () => import('@/pages/ui-elements/switch.vue'),
  meta: {
    pageTitle: 'pages.switch.switch',
    breadcrumb: [
      { label: 'pages.switch.title', link: '/ui-elements' },
      { label: 'pages.switch.switch' },
    ],
  },
}
```

Use actual locale keys consistent with the surrounding route file.

### Sidebar registration

Update:

```text
src/shared/ui/layout/AppSidebar.vue
```

Ensure:

- route matches the registered route;
- item ID is stable;
- component is grouped appropriately;
- label follows current sidebar conventions;
- icon registration is added only when required.

Do not redesign the whole sidebar during one component task.

### Locale registration

Update every supported locale:

```text
src/shared/locales/en.json
src/shared/locales/fa.json
src/shared/locales/ar.json
src/shared/locales/he.json
src/shared/locales/fr.json
src/shared/locales/es.json
```

Add:

- page title keys;
- breadcrumb keys;
- demo section labels;
- example titles;
- internal accessible labels when needed;
- sidebar keys when the sidebar uses translations.

Rules:

- keep the same key structure in every locale;
- preserve valid JSON;
- avoid deleting existing keys;
- do not invent confident translations when unavailable;
- English fallback text is allowed only to keep schema consistency;
- report fallback values in the final response.

---

## Phase 10 — Validate

Run the narrowest useful checks first.

### Validation order

1. targeted unit test:

```bash
pnpm test:unit --run <component-pattern>
```

2. type-check:

```bash
pnpm type-check
```

3. lint:

```bash
pnpm lint
```

4. rerun the targeted test if lint changed files;

5. build:

```bash
pnpm build
```

6. relevant Playwright test only when routed or cross-component interaction warrants it.

Remember:

- `pnpm lint` runs with `--fix`;
- inspect the diff after lint;
- do not claim a command passed unless it was actually run;
- do not hide unrelated failures.

Separate validation failures into:

- caused by this change;
- pre-existing;
- not investigated;
- command not run.

### Final diff review

Inspect:

```bash
git status --short
git diff
```

Check for:

- missing artifacts;
- accidental API expansion;
- duplicated types;
- dynamic Tailwind classes;
- hard-coded theme colors;
- invalid attributes;
- inaccessible interactions;
- stale controlled state;
- missing cleanup;
- incomplete locale keys;
- mismatched route and sidebar paths;
- demo code that differs from rendered code;
- unrelated formatting churn.

---

## Full-mode Definition of Done

A `full` or `resume` task is incomplete until the component is visible and navigable inside the Diana showcase.

Required artifacts:

- reusable `Di*` component;
- relevant unit tests for interactive behavior;
- demo component using `PreviewCodeCard`;
- feature page;
- router-facing page;
- route registration;
- sidebar registration;
- locale keys in every supported locale;
- CSS registration when custom CSS is required;
- icon registration when a reusable public icon is required.

Before producing the final response:

1. verify every required artifact exists;
2. inspect the component and test;
3. inspect route registration;
4. inspect sidebar registration;
5. verify all locale files contain the required key structure;
6. verify the demo imports and renders the component;
7. run the required validation commands;
8. inspect `git status --short`;
9. inspect `git diff`;
10. list any incomplete artifact explicitly.

Never claim a `full` or `resume` task is complete when a required artifact is missing.

### Interruption behavior

If execution is interrupted by:

- API error;
- gateway error;
- permission denial;
- tool failure;
- terminal interruption;
- context limit;

then:

1. preserve completed work;
2. do not revert valid files;
3. report which phases completed;
4. report which artifacts remain missing;
5. report which validations were not run;
6. instruct the next execution to use `resume`.

A later `resume` invocation must continue from existing files instead of restarting.

---

## Component-only Definition of Done

A `component-only` task is complete when:

- the reusable component exists;
- its API is typed and reviewed;
- required shared types, styles, or icons are integrated;
- relevant unit tests exist;
- validation commands have been run;
- no showcase artifacts were created.

---

## Showcase Definition of Done

A `showcase` task is complete when:

- the component already exists;
- demo exists;
- feature page exists;
- router-facing page exists;
- route exists;
- sidebar item exists;
- all locale files contain the expected keys;
- demo code matches the real API;
- route is navigable;
- validation commands have been run.

Do not silently modify the component API during showcase mode unless required to fix a blocking defect.

---

## Final response

Report:

1. component name;
2. resolved mode;
3. existing artifacts found;
4. files created;
5. files modified;
6. public API decisions;
7. accessibility behavior;
8. showcase category;
9. route and sidebar integration;
10. locale changes and fallback translations;
11. tests added or updated;
12. commands run and exact results;
13. pre-existing failures;
14. incomplete items or remaining risks.

For `resume`, explicitly state which previous artifacts were preserved.

Do not claim success when the Definition of Done is not satisfied.

---

## Behavioral Parity

Behave as if this Codex skill and the repository-local Claude skill were written by the same
author.

Preserve the Claude skill's:

- user-facing `/create-di-component` invocation;
- argument semantics;
- execution modes;
- phase ordering;
- inventory discipline;
- artifact requirements;
- quality gates;
- accessibility standards;
- resume behavior;
- validation integrity;
- definitions of completion;
- writing style;
- tone;
- level of detail.

If generic Codex conventions conflict with the existing Claude skill behavior, prefer matching
the Claude skill unless doing so is technically impossible in Codex.

When a difference is technically unavoidable:

1. preserve the closest equivalent behavior;
2. keep the user-facing workflow unchanged whenever possible;
3. report the exact incompatibility;
4. do not introduce unrelated redesign or simplification.
