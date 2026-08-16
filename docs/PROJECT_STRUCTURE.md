# Project Structure

## Table of Contents

- [Purpose](#purpose)
- [Repository Tree](#repository-tree)
- [Root Files](#root-files)
- [Application Source](#application-source)
- [Application Bootstrap Directory](#application-bootstrap-directory)
- [Layouts](#layouts)
- [Pages](#pages)
- [Features](#features)
- [Shared Code](#shared-code)
- [Plugins](#plugins)
- [Assets](#assets)
- [Public Files](#public-files)
- [Tests](#tests)
- [Generated and Ignored Files](#generated-and-ignored-files)
- [Configured but Missing Directories](#configured-but-missing-directories)
- [Placement Rules](#placement-rules)

## Purpose

This document maps the current repository and records the responsibility of each important
file and directory. Descriptions reflect the files that exist now. Missing application layers
are identified explicitly.

## Repository Tree

```text
diana-vue-admin-panel/
|-- .husky/
|-- .vscode/
|-- docs/
|-- e2e/
|-- public/
|-- src/
|   |-- app/
|   |-- assets/
|   |   |-- css/
|   |   |-- fonts/
|   |   `-- images/
|   |-- features/
|   |   |-- advanced-ui/
|   |   |-- dashboards/
|   |   |-- forms/
|   |   `-- ui-elements/
|   |-- layouts/
|   |-- pages/
|   |   |-- advanced-ui/
|   |   |-- dashboards/
|   |   |-- forms/
|   |   `-- ui-elements/
|   |-- plugins/
|   `-- shared/
|       |-- composables/
|       |-- config/
|       |-- icons/
|       |-- locales/
|       |-- types/
|       |-- ui/
|       |   |-- base/
|       |   |-- layout/
|       |   `-- patterns/
|       `-- utils/
|-- .editorconfig
|-- .gitattributes
|-- .gitignore
|-- .prettierrc.json
|-- commitlint.config.ts
|-- env.d.ts
|-- eslint.config.ts
|-- index.html
|-- package.json
|-- playwright.config.ts
|-- pnpm-lock.yaml
|-- README.md
|-- tsconfig.app.json
|-- tsconfig.json
|-- tsconfig.node.json
|-- tsconfig.vitest.json
|-- vite.config.ts
`-- vitest.config.ts
```

## Root Files

### `package.json`

Defines:

- Project identity and private-package status.
- ESM package mode.
- Supported Node.js versions.
- Development, build, test, lint, and format scripts.
- Runtime and development dependencies.
- lint-staged behavior.

The project uses pnpm, as indicated by `pnpm-lock.yaml` and the README commands.

### `pnpm-lock.yaml`

Pins the dependency graph for reproducible pnpm installations. This file should be committed
whenever dependency changes legitimately alter it.

### `vite.config.ts`

Configures:

- Vue SFC support.
- Vue DevTools in the Vite plugin list.
- Tailwind CSS.
- Component auto-import declaration generation.
- Icon component resolution and generation.
- Source aliases.

The generated component declaration target is
`src/shared/types/components.d.ts`.

### TypeScript files

- `tsconfig.json`: solution-style root configuration with project references.
- `tsconfig.app.json`: Vue browser source configuration.
- `tsconfig.node.json`: Node-based tool configuration.
- `tsconfig.vitest.json`: Vitest-specific source configuration.
- `env.d.ts`: Vite client type reference.

Application aliases include:

| Alias       | Target         |
| ----------- | -------------- |
| `@`         | `src`          |
| `@app`      | `src/app`      |
| `@core`     | `src/core`     |
| `@features` | `src/features` |
| `@shared`   | `src/shared`   |
| `@layouts`  | `src/layouts`  |
| `@pages`    | `src/pages`    |
| `@assets`   | `src/assets`   |

`src/core` does not currently exist.

### Code-quality configuration

- `eslint.config.ts`: flat ESLint configuration.
- `.prettierrc.json`: Prettier configuration.
- `.editorconfig`: basic editor settings.
- `commitlint.config.ts`: Conventional Commit validation.
- `.husky/pre-commit`: runs `pnpm lint-staged`.
- `.husky/commit-msg`: validates the commit message.

### Test configuration

- `vitest.config.ts`: unit-test runner configuration.
- `playwright.config.ts`: browser E2E configuration.

### Other root files

- `index.html`: Vite HTML entry document.
- `README.md`: currently based mostly on the Vue/Vite starter README.
- `LICENSE`: MIT license.
- `.gitignore`: excludes dependencies, build output, coverage, caches, and test artifacts.
- `.gitattributes`: repository Git attributes.
- `.vscode`: committed editor recommendations and settings.

## Application Source

All application source lives under `src`.

`src/App.vue` is deliberately minimal and only renders `RouterView`. Application shell
selection is owned by route definitions.

## Application Bootstrap Directory

### `src/app/main.ts`

The application entry point. It registers global dependencies and mounts the root component.

### `src/app/router.ts`

Creates the router and combines feature-group route objects.

### `src/app/i18n.ts`

Creates the Vue I18n instance and imports locale dictionaries.

### `src/app/pinia.ts`

Currently empty. It has no runtime responsibility.

## Layouts

### `src/layouts/DefaultLayout.vue`

The implemented authenticated-style admin shell. No authentication is actually present.

It owns:

- Header and sidebar composition.
- Main scrolling content region.
- Page headings.
- Translated breadcrumb adaptation.
- Document title updates.
- Footer.
- Child route rendering.

### `src/layouts/EmptyLayout.vue`

Empty and unused. It does not currently provide a public, authentication, or blank layout.

## Pages

`src/pages` mirrors router-visible page groups:

- `advanced-ui`
- `dashboards`
- `forms`
- `ui-elements`

Each current page file:

1. Imports one feature page.
2. Renders that feature page.

Page files do not contain metadata because metadata is defined in group `routes.ts` files.
They also do not currently perform data loading or route-specific orchestration.

## Features

### `src/features/dashboards`

Contains:

- `routes.ts`
- Twelve dashboard feature directories

The dashboard features are:

- Analytics
- Courses
- CRM
- Crypto
- Ecommerce
- HRM
- Jobs
- NFT
- Personal
- Projects
- Sales
- Stocks

Every dashboard component is currently placeholder content. The `projects` dashboard route is
`/dashboards/projects`; this is separate from the sidebar's unimplemented `/projects` links.

### `src/features/ui-elements`

Contains `routes.ts` and feature directories for:

- Alerts
- Badge
- Breadcrumb
- Button group
- Buttons
- Cards
- Dropdowns
- Icons
- Images and figures
- Links and interactions
- List group
- Loadings
- Navigation and tabs
- Object fit
- Pagination
- Popovers
- Progress
- Toasts
- Tooltips
- Typography

Each feature generally has:

```text
<feature>/
|-- <Feature>Page.vue
`-- ui/
    `-- <Feature>Demo.vue
```

Not every demo is implemented. Several render only a heading.

### `src/features/forms`

Owns form-control showcase routes and demos. Form controls are organized under the `form-elements`
group, which currently documents Inputs, Range, and Select. Reusable form primitives remain under
`src/shared/ui/base`; this feature group owns only their documentation and route-facing
presentation.

### `src/features/advanced-ui`

Contains `routes.ts` and feature directories for:

- Accordion
- Carousel
- Collapse
- Drawer
- Modals
- Navbar
- Rating
- Skeleton

Collapse, drawer, modals, rating, and skeleton have substantive examples. Accordion, carousel,
and navbar are currently placeholders.

## Shared Code

### `src/shared/composables`

#### `use-direction.ts`

Derives RTL state from Vue I18n's active locale.

#### `use-theme.ts`

Provides a module-level persisted dark-mode ref and theme toggle. It writes the selected
DaisyUI theme name to the root HTML element.

### `src/shared/config`

#### `menu.ts`

Defines the sidebar hierarchy. Menu entries contain:

- Stable ID.
- A `menu.*` translation key.
- Optional registered icon.
- Optional route.
- Optional recursive children.

Only destinations registered by the router are included in the menu.

### `src/shared/icons`

#### `registry.ts`

Defines all icons available through `DiIcon`. Registry keys form the `IconName` type.

### `src/shared/locales`

Contains one directory per supported locale. Each locale is assembled from six ownership modules:
`common.json`, `menu.json`, `layout.json`, `components.json`, `pages.json`, and `features.json`.
See [`I18N_ARCHITECTURE.md`](I18N_ARCHITECTURE.md) for ownership and migration rules.

JSON dictionaries for:

- `ar`
- `en`
- `es`
- `fa`
- `fr`
- `he`

English is the default and fallback locale. Locale dictionaries are not equally complete.

### `src/shared/types`

#### `models`

- `menu.ts`: recursive menu item type.
- `size.ts`: shared UI size union.
- `variant.ts`: shared UI variant unions.
- `index.ts`: model type barrel.

These are presentation models. There are no business-domain models or DTOs.

#### Generated declarations

- `components.d.ts`: generated component declarations.
- `icons.d.ts`: icon-related declaration support.

### `src/shared/ui/base`

Reusable design-system primitives:

| Component       | Responsibility                                                   |
| --------------- | ---------------------------------------------------------------- |
| `DiAlert`       | Status alert content, layout, icon, dismiss behavior, actions    |
| `DiBadge`       | DaisyUI badge variants and click behavior                        |
| `DiBreadcrumb`  | Breadcrumb rendering, separators, icons, links, RTL              |
| `DiButton`      | Button/anchor/input variants, state, loading, badges, slots      |
| `DiCard`        | Card structure, media, header, body, actions, accent options     |
| `DiCollapse`    | DaisyUI collapse behavior and presentation                       |
| `DiDrawer`      | Responsive drawer structure and overlay control                  |
| `DiDropdown`    | Dropdown positioning, options, selection, slots, outside click   |
| `DiIcon`        | Typed hybrid icons, transforms, colors, badges                   |
| `DiInput`       | DaisyUI text inputs, labels, slots, sizes, loading, validation   |
| `DiLoading`     | DaisyUI loading variants                                         |
| `DiRange`       | DaisyUI range input, limits, ticks, values, states, validation   |
| `DiRangeSlider` | Accessible two-handle slider, constraints, tooltips, and ticks   |
| `DiModal`       | Native dialog, optional teleport, placement, and dismissal rules |
| `DiRating`      | Interactive rating input with half-value and RTL support         |
| `DiSkeleton`    | Skeleton shapes and sizing                                       |
| `DiSwitch`      | Switch input, labels, sizes, variants                            |
| `DiTooltip`     | DaisyUI tooltip positioning and event forwarding                 |

### `src/shared/ui/layout`

| Component          | Responsibility                                     |
| ------------------ | -------------------------------------------------- |
| `AppHeader`        | Composes global header controls and sidebar toggle |
| `AppSidebar`       | Renders navigation and controls expanded groups    |
| `MenuItem`         | Recursive menu item and active-state rendering     |
| `ThemeToggle`      | Persisted theme switch                             |
| `LanguageToggle`   | Persisted language and document direction switch   |
| `FullscreenToggle` | Browser fullscreen control                         |
| `Notifications`    | Static notification dropdown                       |
| `UserProfile`      | Static user/profile dropdown                       |

### `src/shared/ui/patterns`

#### `PreviewCodeCard.vue`

Displays a component example or its highlighted source code. It uses Shiki and clipboard
support.

### `src/shared/utils`

#### `use-sidebar.ts`

Provides shared sidebar-collapse state and actions. Although stored under `utils`, it behaves
as a composable.

## Plugins

### `src/plugins/nprogress.ts`

Connects NProgress to global router navigation hooks.

No other plugin modules currently exist.

## Assets

### `src/assets/css`

- `style.css`: Tailwind, DaisyUI, theme tokens, utilities, and base styles.
- `fonts.css`: local font-face declarations.
- `transitions.css`: globally named Vue transitions and animations.
- `di-ui/di-btn.css`: Diana button overrides.

### `src/assets/fonts`

Local Inter, Montserrat, and Dana font files.

### `src/assets/images`

- Full logo.
- Compact logo.
- Static user image.

## Public Files

`public/favicon.ico` is copied unchanged into the Vite output.

No web manifest, robots file, or other public static assets currently exist.

## Tests

### `e2e`

- `vue.spec.ts`: a stale Vue starter smoke test.
- `tsconfig.json`: E2E TypeScript configuration.

There are no unit tests under `src`.

## Generated and Ignored Files

Common ignored outputs include:

- `node_modules`
- `dist`
- `dist-ssr`
- `coverage`
- `.eslintcache`
- TypeScript build information
- Playwright reports
- Playwright test results
- Logs

Do not commit these files.

`src/shared/types/components.d.ts` is configured as generated output but is currently committed.
Changes to it should correspond to legitimate component auto-import changes.

## Configured but Missing Directories

The following structures are referenced or implied but do not exist:

- `src/core`, despite the `@core` alias.
- `src/stores` or feature-local Pinia stores.
- `src/services`.
- `src/repositories`.
- `src/api`.
- Domain model directories.
- DTO directories.
- Unit-test directories.
- Authentication feature or pages.
- Error and not-found pages.

Their absence must not be interpreted as an established convention.

## Placement Rules

Follow these current placement rules:

- Put application creation and global registrations in `src/app`.
- Put a route shell in `src/layouts`.
- Put router-facing adapters in `src/pages/<group>`.
- Put group route objects in `src/features/<group>/routes.ts`.
- Put feature-specific pages and demonstrations in `src/features`.
- Put reusable low-level UI in `src/shared/ui/base`.
- Put reusable composed UI patterns in `src/shared/ui/patterns`.
- Put admin-shell components in `src/shared/ui/layout`.
- Put cross-feature Composition API logic in `src/shared/composables`.
- Register new icons in `src/shared/icons/registry.ts`.
- Put translations in every applicable file under `src/shared/locales`.
- Put shared UI types under `src/shared/types`.

There is no current placement rule for services, repositories, DTOs, stores, or domain models.
Establishing those layers requires an explicit architectural decision.
