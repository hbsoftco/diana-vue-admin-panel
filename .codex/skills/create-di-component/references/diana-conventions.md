# Diana component conventions

This reference captures the preferred component-development direction for the Diana Vue Admin Panel. It is based on the current repository, but it intentionally does not canonize every existing inconsistency.

## Current platform

- Vue 3 with Composition API and `<script setup lang="ts">`
- TypeScript
- Vite
- Tailwind CSS 4 through `@tailwindcss/vite`
- daisyUI 5
- Vue Router
- Pinia
- Vue I18n
- VueUse
- unplugin-icons and unplugin-vue-components
- Vitest and Vue Test Utils
- Playwright
- ESLint using `@antfu/eslint-config`
- Prettier without semicolons and with single quotes

Always inspect `package.json`, `vite.config.ts`, `eslint.config.ts`, and the current source before relying on version-specific behavior.

## Architectural boundaries

### `src/shared/ui/base`

Reusable Diana design-system components. Public components use the `Di` prefix.

Examples currently include buttons, badges, alerts, cards, dropdowns, modals, drawers, loading indicators, icons, rating controls, skeletons, and tooltips.

A component belongs here when:

- multiple features can reuse it;
- its props describe reusable UI behavior;
- it has no product-domain dependency;
- it can be documented independently.

### `src/shared/ui/patterns`

Reusable compositions built from base components, such as the preview/code documentation card.

Patterns may coordinate multiple primitives but should remain domain-agnostic.

### `src/shared/ui/layout`

Application-shell UI such as header, sidebar, language and theme controls. Do not place general-purpose design-system primitives here.

### `src/features`

Feature-owned UI and showcase modules. Design-system documentation currently lives under:

- `src/features/ui-elements`
- `src/features/advanced-ui`

Feature pages commonly import a demo from a local `ui` directory.

### `src/pages`

Thin router-facing wrappers. Existing pages generally import one feature page and render it without business logic.

### `src/core`

Cross-cutting infrastructure such as API, ACL, configuration, and error handling. A design-system component must not depend on feature or page code.

### Dependency direction

Preferred direction:

`app/pages/layouts -> features -> shared`

`core` provides infrastructure and must not import from features or pages.

A shared base component must not import from:

- `features`;
- `pages`;
- application layouts;
- business stores or feature APIs.

## Naming and file conventions

- Public design-system component: `Di<Name>.vue`
- Component filename: PascalCase
- Feature folder and route slug: kebab-case
- Composable: `use-<name>.ts`
- Custom component CSS: `di-<name>.css`
- Types use `type` because ESLint enforces consistent type definitions.
- Existing lint accepts PascalCase and kebab-case filenames.
- Keep imports sorted according to the configured ESLint rule.

## Existing stable implementation patterns

Use these patterns when they fit; do not force all of them into every component.

### Typed props and defaults

```ts
type Props = {
  variant?: Variant
  size?: Size
  disabled?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  size: 'md',
  disabled: false,
})
```

Avoid defaults for absent props that are not declared.

### Typed emits

Tuple form is concise for simple components:

```ts
const emit = defineEmits<{
  change: [value: string]
}>()
```

Call-signature form is appropriate for a larger event contract:

```ts
type Emits = {
  (event: 'update:modelValue', value: boolean): void
  (event: 'open'): void
  (event: 'close'): void
}
```

### Typed slots

Use `defineSlots` when slot props are part of the public API:

```ts
defineSlots<{
  default: (props: { active: boolean }) => unknown
  icon?: () => unknown
}>()
```

Do not use `any` for slot contracts.

### Static class maps

```ts
const SIZE_CLASSES: Record<Size, string> = {
  xs: 'component-xs',
  sm: 'component-sm',
  md: '',
  lg: 'component-lg',
  xl: 'component-xl',
}
```

The complete class strings must appear statically in source.

### Computed class composition

An array is preferred when Vue will bind it directly:

```ts
const classes = computed(() => [
  'component',
  VARIANT_CLASSES[props.variant],
  SIZE_CLASSES[props.size],
  props.disabled && 'component-disabled',
])
```

Use `.filter(Boolean).join(' ')` only when a string is actually required.

## Shared types

Current shared types include:

- `Size`
- general semantic `Variant`
- button, badge, and alert variants
- `IconName`
- menu models

Before creating a local union:

1. inspect `src/shared/types/models`;
2. reuse an exact semantic match;
3. otherwise keep the type local;
4. promote it to shared only when multiple public components need it.

Do not widen a precise shared type merely to satisfy one component.

## Icons

The icon registry maps stable Diana icon names to async Iconify components.

Preferred public API:

```ts
import type { IconName } from '@shared/icons/registry'

type Props = {
  icon?: IconName
}
```

Render configurable icons through `DiIcon`.

Use direct Iconify auto-import tags mainly in demo pages, where the icon is implementation content rather than a component API.

## Themes

Diana uses daisyUI themes selected via:

- `data-theme="diana-light"`
- `data-theme="diana-dark"`

Theme switching is implemented through `useTheme()` and VueUse local storage.

Component styles should consume:

- daisyUI semantic classes;
- theme custom properties;
- semantic Tailwind utilities.

Do not create a second dark-mode system with scattered `dark:` modifiers.

## RTL and localization

Supported locales currently include:

- English
- Persian
- Arabic
- Hebrew
- French
- Spanish

`useDirection()` treats Persian, Arabic, and Hebrew as RTL.

Prefer CSS logical properties. Use `useDirection()` when code-level behavior changes, such as:

- previous/next icon direction;
- keyboard arrow meaning;
- ordered layout;
- placement logic.

A base component should not translate generic slot content. Internal user-facing labels must use i18n or be provided through accessible-label props.

## Styling layers

Use this order:

1. native semantics;
2. daisyUI component primitives;
3. Tailwind utilities;
4. Diana theme variables/utilities;
5. a dedicated `di-ui` CSS file only when needed.

Existing examples:

- the button component extends daisyUI using `di-btn.css`;
- modal styling has its own `di-modal.css`;
- theme tokens are declared in `src/assets/css/style.css`.

Avoid:

- empty scoped style blocks;
- arbitrary literal values for normal Diana colors;
- runtime-generated Tailwind class names;
- public props that merely proxy CSS declarations.

## Showcase architecture

A complete documented component may touch:

```text
src/shared/ui/base/Di<Name>.vue
src/assets/css/di-ui/di-<name>.css               # only if needed
src/features/<category>/<slug>/ui/<Name>Demo.vue
src/features/<category>/<slug>/<Name>Page.vue
src/pages/<category>/<slug>.vue
src/features/<category>/routes.ts
src/shared/ui/layout/AppSidebar.vue
src/shared/locales/{en,fa,ar,he,fr,es}.json
src/shared/icons/registry.ts                     # only if needed
```

The exact pluralization in existing demos is inconsistent. For new work, pick one display name and keep the component, demo, page, route slug, sidebar label, and locale keys internally consistent.

## Existing code is evidence, not absolute policy

Do not copy these patterns merely because they exist:

- `any` in generic option or slot APIs;
- unsynchronized local state copied from `modelValue`;
- clickable non-semantic elements;
- classes assembled through template-string interpolation;
- arbitrary style passthrough props;
- dynamic `z-*`, breakpoint, blur, size, or color classes not visible statically;
- body scroll mutations without unmount/stack cleanup;
- unconditional `aria-hidden` on meaningful icons;
- empty style blocks;
- invalid attributes forwarded to dynamic elements.

Prefer the quality rules in this skill when nearby components conflict.
