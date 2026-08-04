# Code Conventions

## Table of Contents

- [Purpose](#purpose)
- [Source of Truth](#source-of-truth)
- [Formatting](#formatting)
- [TypeScript](#typescript)
- [Vue Components](#vue-components)
- [Props, Models, Events, and Slots](#props-models-events-and-slots)
- [Naming](#naming)
- [Imports and Aliases](#imports-and-aliases)
- [Component Styling](#component-styling)
- [Design-System Components](#design-system-components)
- [Composables and Shared State](#composables-and-shared-state)
- [Routing](#routing)
- [Localization](#localization)
- [RTL Support](#rtl-support)
- [Themes](#themes)
- [Icons](#icons)
- [Accessibility](#accessibility)
- [Testing](#testing)
- [Comments and Documentation](#comments-and-documentation)
- [Logging and Browser APIs](#logging-and-browser-apis)
- [Git and Commit Conventions](#git-and-commit-conventions)
- [Known Inconsistencies](#known-inconsistencies)

## Purpose

This document records conventions enforced by repository tooling and conventions consistently
visible in the current source. It does not introduce a new coding style.

## Source of Truth

When conventions conflict, use this precedence:

1. TypeScript and Vue compiler requirements.
2. `eslint.config.ts`.
3. `.prettierrc.json`.
4. `.editorconfig`.
5. Established patterns in adjacent repository files.
6. This document.

## Formatting

The repository uses Prettier and EditorConfig.

Required formatting includes:

- UTF-8.
- LF line endings.
- Two-space indentation.
- Spaces rather than tabs.
- A final newline.
- No trailing whitespace.
- No semicolons.
- Single-quoted JavaScript and TypeScript strings.
- Prettier print width of 100.

The EditorConfig maximum line length is also 100 for the main source file types.

Run:

```sh
pnpm format
```

This formats `src/` using Prettier's experimental CLI. It is a mutating command.

## TypeScript

### General rules

- Use TypeScript for scripts and configuration.
- Use `<script setup lang="ts">` in Vue SFCs that require script logic.
- Prefer type-only imports with `import type`.
- Prefer type aliases over interfaces. ESLint enforces
  `ts/consistent-type-definitions: ['error', 'type']`.
- Use literal unions for controlled component variants and sizes.
- Type component props and emitted events.
- Avoid introducing `any` when a concrete or generic type can represent the value.
- Keep reusable shared unions in `src/shared/types/models` when multiple components genuinely
  share the same contract.

### Type checking

Run:

```sh
pnpm type-check
```

The project uses `vue-tsc --build`, not plain `tsc`, because Vue SFCs require Vue-aware type
checking.

### Existing type limitations

Some components, especially `DiDropdown`, use `any` in their public API. That is existing
technical debt and should not be copied into unrelated new APIs.

## Vue Components

### SFC order

Current components normally use:

```vue
<script setup lang="ts">
// imports and logic
</script>

<template>
  <!-- markup -->
</template>

<style scoped>
/* only when needed */
</style>
```

Template-only placeholder components omit the script section.

### Composition API

Use the Composition API. Existing code uses:

- `ref`
- `computed`
- `watch`
- `watchEffect`
- lifecycle hooks
- `defineProps`
- `withDefaults`
- `defineEmits`
- `defineModel`
- `defineSlots`

There are no Options API components in the current application.

### Component responsibility

- Base components should provide reusable UI behavior and styling contracts.
- Layout components should compose application chrome.
- Feature components should own feature-specific presentation.
- Page wrappers should remain thin unless route-specific orchestration is required.

Do not place feature-specific behavior in `shared/ui/base`.

## Props, Models, Events, and Slots

### Props

The common pattern is:

```ts
type Props = {
  size?: Size
  disabled?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  size: 'md',
  disabled: false,
})
```

Guidelines:

- Use optional props with explicit defaults where a component has a natural default.
- Keep prop contracts near the top of the component.
- Prefer semantically named props.
- Use controlled string unions for supported values.
- Use `customClass` or component-specific class props only where the existing component API
  supports extension.

### Models

Existing components use both supported approaches:

- `defineModel` for direct component models.
- `modelValue` with `update:modelValue` for explicit control.

Follow the style of the adjacent component. Do not maintain two independent sources of truth
for the same state.

### Events

Type event names and payloads:

```ts
const emit = defineEmits<{
  change: [value: number]
}>()
```

Use existing event casing within a component's API. Some current components contain camelCase
event names such as `backdropClick`.

### Slots

Use named slots for structurally meaningful extension points such as:

- Header
- Footer
- Actions
- Trigger
- Option
- Left or right icon

Provide slot props when callers need component actions or state.

## Naming

ESLint permits filenames in:

- `kebab-case`
- `PascalCase`

Current naming rules:

- Shared Vue components: PascalCase.
- Design-system components: `Di` prefix, such as `DiButton.vue`.
- Feature page components: `<Feature>Page.vue`.
- Demonstration components: `<Feature>Demo.vue`.
- Route wrapper files: lowercase kebab-case.
- Composables: `use-<name>.ts` filenames and `use<Name>` exported functions.
- Route collections: `routes.ts`.
- Type aliases: PascalCase.
- Variables and functions: camelCase.
- Constants containing static maps: uppercase snake case in many base components.

Use stable, descriptive IDs for menu entries. Menu IDs are used to manage expanded state.

## Imports and Aliases

Configured aliases are:

```text
@         -> src
@app      -> src/app
@core     -> src/core
@features -> src/features
@shared   -> src/shared
@layouts  -> src/layouts
@pages    -> src/pages
@assets   -> src/assets
```

The `@core` target does not exist.

ESLint enforces sorted imports. Use:

- Package imports for external dependencies.
- `import type` for type-only dependencies.
- Aliases for imports crossing directory or architectural boundaries.
- Relative imports for closely colocated files when that is the existing local pattern.

The repository currently mixes `@/shared/...` and `@shared/...`. Preserve the style of the
nearby files unless a dedicated consistency change is approved.

## Component Styling

### Tailwind and DaisyUI

Use Tailwind utility classes and DaisyUI component classes. Global CSS is reserved for:

- Theme variables.
- Font declarations.
- Global transitions.
- Diana-specific DaisyUI adjustments.
- Application-wide base styles.

Do not reproduce DaisyUI behavior in feature-scoped CSS unless the existing primitive cannot
express the requirement.

### Class construction

Base components commonly define:

- Static class maps for variants and sizes.
- Computed arrays of conditional classes.
- Separate computed classes for component regions.

This keeps complex class decisions out of templates.

### Scoped styles

Use `<style scoped>` for component-only CSS. Existing scoped styles are limited and Tailwind
utilities remain the default.

### Dynamic Tailwind classes

Prefer explicit static class maps. Dynamically constructed class names may not be detected by
Tailwind. Existing code contains constructions such as `z-${props.zIndex}` and breakpoint
prefixes; treat similar additions carefully and verify their generated CSS.

## Design-System Components

Reusable component work under `src/shared/ui/base` should preserve these conventions:

- `Di` prefix.
- Typed props and events.
- DaisyUI semantic class usage.
- Shared `Size` and variant types when applicable.
- Slots for composability.
- Semantic state props such as `disabled`, `loading`, or `readOnly`.
- RTL compatibility.
- Theme compatibility.
- A corresponding showcase when the UI catalogue is in scope.

Do not add an icon by importing an arbitrary icon component directly into each consumer. Add
it to the icon registry and use `DiIcon` when it belongs to the shared icon system.

## Composables and Shared State

Cross-feature Composition API behavior belongs in `src/shared/composables`.

Current composables expose refs and functions without wrapping them in a class or store.
Module-scope refs create singleton state shared by all consumers in the client runtime.

Be explicit about whether state should be:

- Component-local.
- Shared for the application lifetime.
- Persisted in local storage.
- Moved into a future Pinia store.

Pinia is available but there is no established store convention. Do not invent a large store
architecture as an incidental part of unrelated work.

## Routing

Feature groups own route objects in `src/features/<group>/routes.ts`.

Current route conventions:

- Parent routes use `DefaultLayout`.
- Child components are lazy-loaded.
- Parent groups define default redirects.
- Display metadata uses translation keys.
- Breadcrumb metadata is an array of labels and optional links.

When adding a visible route, update all applicable locations:

1. Feature route definition.
2. Page wrapper.
3. Feature component.
4. Sidebar menu configuration, if navigable there.
5. Locale dictionaries for metadata and labels.

There is no automatic filesystem routing.

## Localization

Locale messages are split by ownership under `src/shared/locales/<locale>`. New keys must use one
of the `common`, `menu`, `layout`, `components`, `pages`, or `features` namespaces and camelCase
segments. See [`I18N_ARCHITECTURE.md`](I18N_ARCHITECTURE.md) for the complete ownership rules and
the compatibility-key migration policy.

Use translation keys for user-facing application-shell and catalogue text where the existing
feature is localized.

Rules:

- English is the source fallback.
- Add keys to every locale that is expected to support the feature.
- Do not assume non-English locale files are complete.
- Use `$t` in templates or `useI18n` in scripts.
- Route metadata stores keys, not translated values.
- Set language direction through the existing language flow, not on individual page roots.

Some current menu labels and placeholder pages use literal English. That is existing
incompleteness, not the preferred model for new localized functionality.

## RTL Support

Persian, Arabic, and Hebrew are RTL languages in `useDirection`.

For directional styling:

- Use Tailwind `ltr:` and `rtl:` variants.
- Use `start` and `end` semantics when the component API supports them.
- Use `useDirection` when script logic needs direction.
- Test recursive menus, icons, alignment, spacing, and transitions in both directions.

Do not infer direction independently from translated text.

## Themes

Use semantic DaisyUI classes and CSS variables rather than hardcoded theme-specific colors
where possible.

Theme names are:

- `diana-light`
- `diana-dark`

The active theme is stored on the root element's `data-theme` attribute.

When adding a Diana-specific color token:

1. Define it in both themes.
2. Use a semantic name.
3. Expose a utility only when normal Tailwind/DaisyUI syntax is insufficient.
4. Verify contrast in both themes.

Use `useTheme` when consuming shared theme state. `ThemeToggle.vue` currently duplicates this
logic, but new consumers should not create further duplicate storage watchers.

## Icons

To use a new shared icon:

1. Add an asynchronous import to `src/shared/icons/registry.ts`.
2. Choose a stable camelCase registry name.
3. Render it through `DiIcon`.
4. Use semantic size and color props where possible.

`IconName` is generated from registry keys. Do not bypass that type with arbitrary strings.

## Accessibility

Existing components include some accessibility behavior:

- Buttons use native button elements by default.
- Modals declare dialog roles.
- Drawers and toggles expose labels.
- Ratings expose per-value labels.
- Dropdown triggers have button roles and focusability.

Accessibility coverage is not comprehensive. New work should preserve native semantics and
include:

- Accessible names for icon-only controls.
- Keyboard operation for interactive components.
- Focus visibility.
- Appropriate roles only when native semantics are unavailable.
- Correct disabled behavior.
- Direction-aware reading order.

Do not rely solely on tooltips or icons to convey meaning.

## Testing

Test conventions configured by ESLint and TypeScript are:

- Unit tests under `src/**/__tests__`.
- Test filenames ending in `.test.ts` or `.spec.ts`.
- E2E tests under `e2e`.
- Playwright test filenames using `.test` or `.spec`.

There are no valid current examples of unit tests. The existing Playwright test is stale and
should not be copied as an assertion model.

Interaction-heavy base components should be tested for:

- Prop rendering.
- Emitted events.
- `v-model` changes.
- Disabled and read-only states.
- Keyboard behavior.
- Listener cleanup.
- RTL behavior where applicable.

## Comments and Documentation

Use comments for:

- Non-obvious browser behavior.
- Cleanup requirements.
- Complex state transitions.
- Public component API decisions.

Avoid comments that merely restate the following line. Existing base components use section
comments such as `Types`, `Defaults`, `Computed`, and `Methods`; preserving this organization is
appropriate for larger components.

## Logging and Browser APIs

ESLint reports console usage as a warning. Avoid permanent diagnostic logging.

When using browser APIs:

- Clean up global listeners on unmount or watcher cleanup.
- Handle rejected promises where the API can fail.
- Avoid leaving global document styles altered after a component closes or unmounts.
- Remember that direct `document` and `window` access prevents straightforward SSR use.

The project is currently client-only, but cleanup and testability still apply.

## Git and Commit Conventions

Commit messages use Conventional Commits. Allowed types are:

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

Types must be lowercase and non-empty.

The pre-commit hook runs lint-staged. Staged JavaScript, TypeScript, and Vue files are linted
with fixes. CSS, SCSS, Vue, JSON, and Markdown files are formatted according to the configured
patterns.

## Known Inconsistencies

Do not silently treat these as preferred conventions:

- Theme state is implemented both in `useTheme` and directly in `ThemeToggle`.
- `use-sidebar.ts` behaves as a composable but is stored under `utils`.
- Alias styles are mixed.
- Some reusable component types are shared while similar unions are redefined locally.
- Some menu and feature text is localized while other text is literal English.
- Some components use `defineModel`; others use explicit `modelValue`.
- Some dynamic utility classes may not be statically discoverable by Tailwind.

Resolve these only in a scoped, approved consistency change.
