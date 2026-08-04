# Architecture

## Table of Contents

- [Purpose](#purpose)
- [System Context](#system-context)
- [Implemented Technology Stack](#implemented-technology-stack)
- [Runtime Architecture](#runtime-architecture)
- [Application Bootstrap](#application-bootstrap)
- [Routing Architecture](#routing-architecture)
- [Layout Architecture](#layout-architecture)
- [Page and Feature Architecture](#page-and-feature-architecture)
- [Shared UI Architecture](#shared-ui-architecture)
- [State Management](#state-management)
- [Localization and Direction](#localization-and-direction)
- [Theme System](#theme-system)
- [Icon System](#icon-system)
- [Plugin Integration](#plugin-integration)
- [Data and Domain Architecture](#data-and-domain-architecture)
- [Dependency Boundaries](#dependency-boundaries)
- [Testing Architecture](#testing-architecture)
- [Build Architecture](#build-architecture)
- [Known Architectural Gaps](#known-architectural-gaps)

## Purpose

This document describes the architecture that is currently implemented in Diana Vue Admin
Panel. It does not define a future backend, domain model, store structure, authentication
system, or service layer. Those systems do not exist in the repository at present.

The project is currently a client-side Vue single-page application that provides:

- An admin shell with a sidebar, header, content area, breadcrumbs, and footer.
- A reusable set of `Di*` UI components built around DaisyUI and Tailwind CSS.
- Demonstration pages for some of those components.
- Placeholder routes for dashboards and unfinished UI demonstrations.
- Localization, RTL support, light and dark themes, and route loading feedback.

## System Context

The application runs entirely in the browser. There is no server-side rendering, Nuxt
runtime, application backend, API gateway, or repository layer.

```text
Browser
  |
  `-- Vue application
      |-- Vue Router
      |-- Vue I18n
      |-- Pinia registration
      |-- VueUse browser integrations
      |-- Tailwind CSS and DaisyUI
      `-- Feature and shared UI components
```

The application is built by Vite and is served as a static client-side application. Browser
history routing is enabled through `createWebHistory`, so a production host must return
`index.html` for application routes that do not correspond to physical files.

## Implemented Technology Stack

### Runtime

- Vue 3.5
- Vue Router 4
- Vue I18n 11
- Pinia 3
- VueUse Core
- VueUse Integrations
- NProgress
- Shiki

### Styling and UI

- Tailwind CSS 4
- DaisyUI 5
- Iconify icon data
- `unplugin-icons`
- `unplugin-vue-components`

### Tooling

- Vite 7
- TypeScript 5.9
- `vue-tsc`
- ESLint 9 with Antfu's configuration
- Prettier 3
- Vitest 4
- Playwright 1.57
- Husky
- lint-staged
- Commitlint

The repository requires Node.js `^20.19.0` or `>=22.12.0` and uses pnpm.

## Runtime Architecture

The runtime dependency flow is:

```text
src/app/main.ts
  |
  |-- src/App.vue
  |     `-- top-level RouterView
  |
  |-- src/app/router.ts
  |     |-- dashboard route group
  |     |-- UI element route group
  |     `-- advanced UI route group
  |
  |-- src/app/i18n.ts
  |     `-- shared locale JSON files
  |
  |-- createPinia()
  |
  |-- global stylesheet
  |
  `-- NProgress router integration
```

Most routes render `DefaultLayout`, which renders the application chrome and a nested
`RouterView`. Child routes are lazy-loaded.

## Application Bootstrap

`src/app/main.ts` is the composition root. It performs these operations:

1. Imports the global stylesheet from `src/assets/css/style.css`.
2. Creates the root Vue application from `src/App.vue`.
3. Creates and registers a Pinia instance.
4. Registers the router.
5. Registers Vue I18n.
6. attaches NProgress to router navigation.
7. Mounts the application to `#app`.

`src/App.vue` intentionally contains only the top-level `RouterView`. Layout selection occurs
in route definitions rather than in the root component.

`src/app/pinia.ts` exists but is empty. Pinia is currently created directly in `main.ts`.

## Routing Architecture

`src/app/router.ts` creates a browser-history router and combines four route groups:

- `/dashboards`
- `/forms`
- `/ui-elements`
- `/advanced-ui`

The root path redirects to `/dashboards/crm`.

Each route group:

- Uses `DefaultLayout` as its parent component.
- Defines a group-level default redirect.
- Lazy-loads child page wrappers.

Every rendered child route attaches `pageTitle` and `breadcrumb` metadata under a consistent
`pages.<group>.<page>.title` hierarchy. `DefaultLayout` consumes that metadata to update
`document.title` and render translated breadcrumbs.

There is no:

- Catch-all route.
- Not-found page.
- Authentication guard.
- Authorization guard.
- Route-level data loader.
- Error route.
- `/projects` route group.

## Layout Architecture

`DefaultLayout.vue` is the only implemented layout. It contains:

- `AppSidebar`
- `AppHeader`
- A route-derived heading
- `DiBreadcrumb`
- A child `RouterView`
- A localized footer

The layout watches the active route and active locale through `watchEffect`. The translated
page title is assigned to `document.title`.

Breadcrumb metadata is converted to `BreadcrumbItem` objects. The final item is marked
active; earlier items may link to parent paths.

`EmptyLayout.vue` exists but is empty and is not used by the router.

## Page and Feature Architecture

The project uses two levels between a route and substantial UI:

```text
Route definition
  `-- src/pages/<group>/<route>.vue
      `-- src/features/<group>/<feature>/<Feature>Page.vue
          `-- optional ui/<Feature>Demo.vue
```

### Page wrappers

Files under `src/pages` are thin route entry points. They import one feature page and render
it. They contain no routing metadata, data loading, or business logic.

### Feature pages

Files under `src/features` own feature-specific presentation.

Dashboard feature pages are currently three-line placeholders containing only dashboard
labels. UI catalogue feature pages generally render a colocated demo.

Some demo components are complete demonstrations; others contain only placeholder text.
Therefore, the folder convention is implemented more completely than the feature content.

### Feature route ownership

Each top-level feature group owns a `routes.ts` file. The central router imports these route
objects. Route definitions do not currently live inside each individual feature directory.

## Shared UI Architecture

Reusable presentation is divided into three categories.

### Base components

`src/shared/ui/base` contains the `Di*` component library. These components wrap DaisyUI
primitives or provide a Diana-specific API through:

- Typed props.
- Typed events.
- `v-model` contracts.
- Slots.
- Computed Tailwind/DaisyUI class maps.
- Shared variant and size types where available.

Some base components depend on other base components. For example:

- `DiButton` uses `DiBadge` and `DiLoading`.
- `DiIcon` uses `DiBadge`.
- `DiModal` uses `DiButton` and `DiIcon`.
- `DiBreadcrumb` uses `DiIcon`.

### Layout components

`src/shared/ui/layout` contains application-shell components. These depend on base components,
shared configuration, routing, and composables.

### Patterns

`PreviewCodeCard` is a composed reusable pattern used by showcase pages. It combines `DiCard`,
`DiButton`, `DiIcon`, Shiki, VueUse clipboard support, localization, and the theme composable.

## State Management

Pinia is installed and registered, but there are no Pinia stores.

Current state is managed using local refs, module-scoped refs, and VueUse persisted refs:

| State                     | Location                             | Storage                       |
| ------------------------- | ------------------------------------ | ----------------------------- |
| Active route              | Vue Router                           | Browser URL                   |
| Locale                    | `LanguageToggle.vue`                 | `localStorage` key `language` |
| Theme                     | `use-theme.ts` and `ThemeToggle.vue` | `localStorage` key `theme`    |
| Sidebar collapse          | `use-sidebar.ts`                     | Module-scoped `ref`           |
| Expanded menus            | `AppSidebar.vue`                     | Component-local `ref<Set>`    |
| Modal/dropdown/demo state | Individual components                | Component-local refs/models   |
| Fullscreen state          | `FullscreenToggle.vue`               | Browser Fullscreen API        |

There is no established convention for store naming, store modules, state hydration, or
server-state caching.

## Localization and Direction

`src/app/i18n.ts` configures Vue I18n in Composition API mode. Each locale is assembled from
ownership-based `common`, `menu`, `layout`, `components`, `pages`, and `features` modules as
defined in [`I18N_ARCHITECTURE.md`](I18N_ARCHITECTURE.md):

- `legacy: false`
- Default locale: `en`
- Fallback locale: `en`
- Available messages: English, Persian, Arabic, Hebrew, French, and Spanish

`LanguageToggle.vue` persists the selected language and updates:

- The Vue I18n locale.
- `document.documentElement.lang`.
- `document.documentElement.dir`.

`useDirection` returns a computed `isRtl` value. Persian, Hebrew, and Arabic are classified as
RTL.

Locale coverage is not equal. English and Persian contain hundreds of scalar messages, while
Arabic, Hebrew, French, and Spanish contain substantially fewer. Missing keys therefore fall
back to English.

## Theme System

The theme system uses DaisyUI custom themes defined in `src/assets/css/style.css`:

- `diana-light`
- `diana-dark`

Themes define DaisyUI semantic colors and Diana-specific CSS custom properties for:

- Application background.
- Header background and border.
- Sidebar background, text, and border.
- Content background and border.
- Hover state.

The selected theme is represented by `data-theme` on the root HTML element. The default value
comes from the user's preferred color scheme and is persisted under the `theme` local-storage
key.

`useTheme` centralizes this behavior, but `ThemeToggle.vue` currently duplicates its storage
and watcher implementation. Consumers such as `PreviewCodeCard` use `useTheme`.

Typography is locale-aware:

- Inter is the default body font.
- Dana is used for Persian and Arabic documents.
- Montserrat and Dana utility classes are used explicitly in sidebar content.

## Icon System

Icons are registered explicitly in `src/shared/icons/registry.ts`. Each registry entry is an
asynchronous import generated by `unplugin-icons`.

`IconName` is derived from the registry keys. `DiIcon` requires this type, so application code
cannot refer to an unregistered icon name without a TypeScript error.

`DiIcon`:

- Loads icons asynchronously.
- Supports named and custom sizes.
- Supports semantic and custom colors.
- Supports rotation, horizontal flipping, spin, pulse, titles, and badges.
- Displays a skeleton fallback while an icon component is loading.

`@iconify/json` is present as a development dependency. Icon auto-installation is disabled.

## Plugin Integration

`src/plugins/nprogress.ts` is the only application plugin module.

It registers:

- A router `beforeEach` hook that starts the progress indicator.
- A router `afterEach` hook that completes the progress indicator.

The spinner is disabled and trickle speed is set to 200 milliseconds.

There is no formal plugin registration framework. The integration is called directly from
`main.ts`.

## Data and Domain Architecture

No domain or remote-data architecture is currently implemented.

Specifically, the repository has no:

- HTTP client.
- API service.
- Repository.
- Endpoint definition.
- Request or response DTO.
- Domain entity.
- Data mapper.
- Authentication token management.
- Server-state cache.
- Error normalization layer.
- Environment-specific API configuration.

The files in `src/shared/types/models` are UI types, not business-domain models.

The first data-backed feature should establish these conventions deliberately rather than
assuming they already exist.

## Dependency Boundaries

The currently observed dependency direction is:

```text
app
  -> feature route definitions
  -> layouts
  -> plugins

layouts
  -> shared layout components
  -> shared base components

pages
  -> features

features
  -> shared UI
  -> shared composables
  -> shared types

shared layout
  -> shared base UI
  -> shared config
  -> shared composables
  -> shared types

shared base UI
  -> other shared base UI
  -> shared types
  -> icon registry
  -> direction composable
```

No feature currently imports another feature. ESLint does not explicitly enforce these
boundaries, so they remain conventions rather than mechanically protected rules.

## Testing Architecture

Vitest is configured with:

- A jsdom environment.
- Vite configuration merging.
- E2E exclusion.
- A test TypeScript project that includes `src/**/__tests__/*`.

No unit-test files currently exist.

Playwright is configured for:

- Chromium.
- Firefox.
- WebKit.
- Local Vite development server.
- Vite preview server in CI.
- Retry and single-worker behavior in CI.
- HTML reporting.

The existing E2E test is inherited from the Vue starter and expects text that this application
does not render. It does not represent a valid current smoke test.

## Build Architecture

The production build script runs type checking and Vite compilation in parallel:

```text
pnpm build
  |-- vue-tsc --build
  `-- vite build
```

Vite provides:

- Vue SFC compilation.
- Tailwind integration.
- Development Vue DevTools.
- Component declaration generation.
- Icon component generation.
- Path aliases matching the application TypeScript configuration.

The output directory is Vite's default `dist`.

There is no Nuxt configuration, SSR build, service worker, PWA manifest, Docker configuration,
or deployment configuration in the repository.

## Known Architectural Gaps

The following are existing gaps, not implemented architecture:

- No backend integration or domain layer.
- No Pinia stores despite Pinia registration.
- Empty `src/app/pinia.ts`.
- Configured `@core` alias without a `src/core` directory.
- Empty `EmptyLayout.vue`.
- No 404 route.
- Sidebar project links without matching routes.
- Incomplete route metadata for dashboard pages.
- Incomplete feature and demonstration pages.
- Uneven localization coverage.
- No unit-test suite.
- Stale E2E test.
- No CI pipeline.
- No documented deployment target.
- No authentication or authorization design.
- No standard error-handling architecture.
