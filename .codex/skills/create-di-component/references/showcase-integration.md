# Diana showcase integration

Use this workflow only in `showcase` or `full` mode.

## 1. Choose the documentation category

Use `ui-elements` for:

- atomic visual primitives;
- common form controls;
- small feedback/status components;
- simple navigation primitives.

Use `advanced-ui` for:

- overlays and portals;
- complex disclosure;
- composite navigation;
- components with substantial state or keyboard coordination;
- multi-part interaction patterns.

Inspect neighboring entries before deciding. If categorization remains genuinely ambiguous, state the choice and rationale rather than duplicating the component in both areas.

## 2. Create the feature module

Preferred structure:

```text
src/features/<category>/<slug>/
├── ui/
│   └── <DisplayName>Demo.vue
└── <DisplayName>Page.vue
```

The page should remain thin:

```vue
<script setup lang="ts">
import ComponentDemo from './ui/ComponentDemo.vue'
</script>

<template>
  <ComponentDemo />
</template>
```

Use a relative import inside the feature folder.

## 3. Build focused demos

Use `PreviewCodeCard` for each concept.

A normal demo set contains:

1. default;
2. variants;
3. sizes;
4. important states;
5. controlled/interactive example;
6. composition example;
7. RTL or accessibility-specific example when relevant.

Do not create a separate card for every pair of boolean props. Group related examples.

Store displayed snippets as constants in the demo script. Keep each snippet synchronized with the rendered markup. Use `language="html"` for template-only snippets and `language="vue"` for complete SFC examples.

If visual references were supplied, reproduce their meaningful layout, card grouping, example
ordering, spacing, and content structures as closely as the Diana design system permits. Treat
reference examples as a capability matrix: demonstrate already-supported examples without base
component changes, and introduce API only for gaps that require reusable behavior.

Snippet parity is exact, not approximate. A card's source must contain the same wrappers, props,
directives, slots, child components, classes, labels, and handlers as its rendered preview. Do not
share one snippet between cards whose rendered markup differs. Interactive examples that rely on
imports, refs, computed state, or handlers must show those dependencies in a complete Vue SFC.
Review every preview and source side by side before validation.

Prefer `DiIcon` for examples that explain Diana's public icon API. Direct Iconify tags are acceptable for incidental demo content.

## 4. Create the router wrapper

Create:

`src/pages/<category>/<slug>.vue`

It should import the feature page through `@features` and render it:

```vue
<script setup lang="ts">
import ComponentPage from '@features/<category>/<slug>/ComponentPage.vue'
</script>

<template>
  <ComponentPage />
</template>
```

Do not put component logic in `src/pages`.

## 5. Register the route

Update:

`src/features/<category>/routes.ts`

Add a lazy page import and route metadata:

```ts
{
  path: '<slug>',
  component: () => import('@/pages/<category>/<slug>.vue'),
  meta: {
    pageTitle: 'pages.<localeKey>.<nameKey>',
    breadcrumb: [
      { label: 'pages.<localeKey>.title', link: '/<category>' },
      { label: 'pages.<localeKey>.<nameKey>' },
    ],
  },
}
```

Match the established route object shape. Fix an obviously empty breadcrumb label when touching the same entry, but avoid unrelated route cleanup.

## 6. Add the sidebar entry

Update the appropriate `children` list in:

`src/shared/ui/layout/AppSidebar.vue`

Keep:

- `id` equal to the route slug where practical;
- route identical to the registered route;
- ordering conceptually grouped with nearby components.

The sidebar currently mixes translated and literal labels. For new entries, prefer a locale key when the menu renderer supports it; otherwise keep the existing contract and ensure the visible label is clear. Do not redesign the entire menu as part of one component task.

## 7. Add translations

Update all registered locale files:

```text
src/shared/locales/en.json
src/shared/locales/fa.json
src/shared/locales/ar.json
src/shared/locales/he.json
src/shared/locales/fr.json
src/shared/locales/es.json
```

Add:

- page title and breadcrumb keys under `pages`;
- demo card labels under `features.<category>.<component>`;
- internal labels needed by the component or documentation;
- sidebar keys if the sidebar consumes them.

Rules:

- Keep the same key structure in every locale.
- Do not invent fluent translations when none were supplied.
- Use an English fallback value in a non-English locale only to keep the schema complete, and report those fallback values explicitly.
- Preserve valid JSON and existing formatting.

## 8. Register icons only when required

If the component's public API needs a new named icon, update:

`src/shared/icons/registry.ts`

Do not register every icon used only inside a demo.

## 9. Add custom CSS only when required

If the component needs system-level CSS:

1. create `src/assets/css/di-ui/di-<slug>.css`;
2. import it in `src/assets/css/style.css`;
3. keep selectors based on a stable Diana class;
4. verify both themes;
5. do not duplicate a daisyUI rule that utilities can express clearly.

## 10. Validate routing and rendering

For a new showcase route:

- run type-check and build;
- load or test the route when browser tooling is available;
- verify sidebar navigation;
- verify light/dark themes;
- verify an RTL locale;
- verify code-preview copy and toggle behavior if the demo uses `PreviewCodeCard`.

Add Playwright coverage when the component's primary value is cross-component or routed interaction, not merely because a route was added.
