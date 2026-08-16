# Project Baseline

Baseline date: 2026-07-30

## Table of Contents

- [Current Stack](#current-stack)
- [Current Architecture](#current-architecture)
- [Existing Features](#existing-features)
- [Implemented Components](#implemented-components)
- [Existing Dependencies](#existing-dependencies)
- [Current Limitations](#current-limitations)
- [Missing Infrastructure](#missing-infrastructure)
- [Recommended First Development Steps](#recommended-first-development-steps)

This document records the current implementation baseline of Diana Vue Admin Panel. It is a
snapshot of what exists in the repository, not a description of planned functionality. For
architectural detail, see [`ARCHITECTURE.md`](ARCHITECTURE.md). For accepted decisions, see
[`ADR`](ADR).

# Current Stack

## Application runtime

| Concern               | Current implementation                          |
| --------------------- | ----------------------------------------------- |
| Application framework | Vue 3.5                                         |
| Component API         | Composition API with `<script setup lang="ts">` |
| Language              | TypeScript 5.9                                  |
| Build tool            | Vite 7                                          |
| Routing               | Vue Router 4 with browser history               |
| Localization          | Vue I18n 11                                     |
| State library         | Pinia 3, registered but not used by any store   |
| Browser utilities     | VueUse Core and VueUse Integrations             |
| Route progress        | NProgress                                       |
| Code highlighting     | Shiki                                           |

The application is a client-side single-page application. It does not use Nuxt, server-side
rendering, static-site generation, or a server runtime.

## Styling and design system

| Concern                      | Current implementation                             |
| ---------------------------- | -------------------------------------------------- |
| Utility CSS                  | Tailwind CSS 4                                     |
| Component styling foundation | DaisyUI 5                                          |
| Project component library    | Repository-local `Di*` Vue components              |
| Themes                       | `diana-light` and `diana-dark`                     |
| Icons                        | Iconify data through `unplugin-icons`              |
| Fonts                        | Inter, Montserrat, and Dana stored locally         |
| Direction support            | LTR and RTL                                        |
| Responsive styling           | Tailwind utilities and DaisyUI responsive patterns |

The default body font is Inter. Dana is selected for Persian and Arabic documents. Sidebar
content also uses explicit Montserrat and Dana utility classes.

## Development tooling

| Concern                  | Current implementation                                 |
| ------------------------ | ------------------------------------------------------ |
| Package manager          | pnpm                                                   |
| Supported Node.js        | `^20.19.0` or `>=22.12.0`                              |
| Type checking            | `vue-tsc --build`                                      |
| Linting                  | ESLint 9 with Antfu's Vue and TypeScript configuration |
| Formatting               | Prettier 3                                             |
| Unit-test runner         | Vitest 4 with jsdom                                    |
| Component test utilities | Vue Test Utils                                         |
| E2E runner               | Playwright                                             |
| Git hooks                | Husky                                                  |
| Staged-file checks       | lint-staged                                            |
| Commit validation        | Commitlint with Conventional Commits                   |

The repository uses ESM through `"type": "module"`.

# Current Architecture

## Runtime composition

`src/app/main.ts` is the application composition root. It:

1. Imports global styling.
2. Creates the Vue application from `src/App.vue`.
3. Creates and registers Pinia.
4. Registers Vue Router.
5. Registers Vue I18n.
6. Attaches NProgress to router navigation.
7. Mounts the application on `#app`.

`src/App.vue` contains the top-level `RouterView`. Route records select the layout rather than
the root component selecting one.

## Request and rendering flow

There is no network request flow. The current route-to-render flow is:

```text
Browser URL
  -> Vue Router
      -> feature-group route record
          -> DefaultLayout
              -> page wrapper
                  -> feature page
                      -> feature demo or placeholder
                          -> shared UI components
```

Child route components are lazy-loaded. The application uses `createWebHistory`, so production
hosting requires a fallback to `index.html`.

## Architectural layers

### Application layer

`src/app` owns application creation and global registrations:

- `main.ts`
- `router.ts`
- `i18n.ts`
- Empty `pinia.ts`

### Layout layer

`src/layouts/DefaultLayout.vue` owns the implemented admin shell:

- Sidebar
- Header
- Route-derived heading
- Breadcrumbs
- Nested route outlet
- Footer
- Translated document title

`src/layouts/EmptyLayout.vue` exists but is empty and unused.

### Page layer

`src/pages` contains thin router-facing wrappers. Each current wrapper imports one feature page
and renders it. These files contain no business logic, data loading, or route metadata.

### Feature layer

`src/features` is grouped into:

- `dashboards`
- `ui-elements`
- `advanced-ui`

Each group owns a `routes.ts` file. Feature-specific pages and demonstrations remain inside
their feature directories.

### Shared layer

`src/shared` owns:

- Reusable base components.
- Application-shell UI.
- Composed UI patterns.
- Cross-feature composables.
- Menu configuration.
- Icon registration.
- Locale dictionaries.
- Shared presentation types.
- Sidebar state utility.

Shared code is domain-independent. No feature currently imports another feature.

### Plugin layer

`src/plugins/nprogress.ts` is the only plugin module. It connects router lifecycle hooks to
NProgress.

## Dependency direction

The observed and documented direction is:

```text
app -> route definitions, layouts, plugins
layouts -> shared
pages -> features
features -> shared
shared -> shared
```

These boundaries are not mechanically enforced by ESLint.

## Current state flow

| State                       | Owner                                | Persistence                   |
| --------------------------- | ------------------------------------ | ----------------------------- |
| Active route                | Vue Router                           | URL                           |
| Locale                      | `LanguageToggle.vue` and Vue I18n    | `localStorage` key `language` |
| Theme                       | `use-theme.ts` and `ThemeToggle.vue` | `localStorage` key `theme`    |
| Sidebar collapsed state     | `use-sidebar.ts`                     | Module lifetime only          |
| Expanded menu groups        | `AppSidebar.vue`                     | Component lifetime only       |
| Component interaction state | Individual components                | Component lifetime only       |
| Fullscreen state            | Browser Fullscreen API               | Not persisted                 |

Pinia does not currently participate in application state flow.

## Localization and direction

Six locales are registered:

- English
- Persian
- Arabic
- Hebrew
- French
- Spanish

English is the default and fallback locale. Persian, Arabic, and Hebrew are treated as RTL.
The language control updates Vue I18n, the HTML `lang` attribute, and the HTML `dir` attribute.

Locale coverage is uneven. English and Persian are substantially more complete than Arabic,
Hebrew, French, and Spanish.

## Theme architecture

The two DaisyUI themes are defined in `src/assets/css/style.css`. Theme selection is persisted
and applied through the HTML `data-theme` attribute.

The themes provide DaisyUI semantic colors and Diana-specific tokens for:

- Page background.
- Header background and border.
- Sidebar background, text, and border.
- Content background and border.
- Hover background.

# Existing Features

## Application shell

The implemented shell includes:

- Collapsible left or right sidebar behavior according to direction.
- Recursive navigation groups.
- Active route detection.
- Automatic expansion of the active route's parent groups.
- Full and compact logos.
- Sticky header.
- Theme toggle.
- Language toggle.
- Fullscreen toggle.
- Notifications dropdown with static content.
- User profile dropdown with static content.
- Page heading.
- Translated breadcrumbs where route metadata exists.
- Route-aware translated document title.
- Footer.
- Route transition feedback through NProgress.

There is no responsive mobile navigation strategy beyond the current width collapse behavior.

## Routing

The router contains three route groups:

### Dashboards

- CRM
- Ecommerce
- Analytics
- Courses
- Crypto
- HRM
- Jobs
- NFT
- Personal
- Projects
- Sales
- Stocks

All dashboard feature components are placeholders containing only a short label. The dashboard
routes also lack the page-title and breadcrumb metadata used by the UI catalogue routes.

### UI elements

- Alerts
- Badge
- Breadcrumb
- Buttons
- Loadings
- Icons
- Button group
- Cards
- Dropdowns
- Images and figures
- Links and interactions
- List group
- Navigation and tabs
- Object fit
- Pagination
- Popovers
- Progress
- Toasts
- Tooltips
- Typography

Substantive demonstrations currently exist for:

- Alerts
- Badge
- Breadcrumb
- Buttons
- Cards
- Icons
- Loadings
- Tooltips

The remaining UI-element demonstrations are either minimal or placeholder-only.

### Advanced UI

- Modals
- Accordion
- Carousel
- Collapse
- Navbar
- Drawer
- Rating
- Skeleton

Substantive demonstrations currently exist for:

- Collapse
- Drawer
- Modals
- Rating
- Skeleton

Accordion, carousel, and navbar demonstrations are placeholder-only.

## Component documentation experience

`PreviewCodeCard` provides:

- A rendered component preview.
- A source-code view.
- Theme-aware Shiki syntax highlighting.
- Clipboard copying.
- Translated controls.

This pattern is used by the implemented component demonstrations.

## Persisted preferences

The application persists:

- Theme selection.
- Language selection.

Sidebar state, expanded menu state, and fullscreen state are not persisted.

## Icon support

The typed icon registry contains asynchronous imports from multiple Iconify collections.
`DiIcon` prevents unregistered icon names at compile time through the derived `IconName` type.

# Implemented Components

## Base component library

The following reusable components exist under `src/shared/ui/base`:

| Component      | Implemented responsibility                                                    |
| -------------- | ----------------------------------------------------------------------------- |
| `DiAlert`      | Alert variants, layout modes, icons, dismissal, action slots                  |
| `DiBadge`      | Badge variants, sizes, visual modifiers, click forwarding                     |
| `DiBreadcrumb` | Linked and active items, icons, separators, variants, RTL behavior            |
| `DiButton`     | Button/anchor/input rendering, variants, sizes, loading, badges, slots        |
| `DiCard`       | Card regions, media, accents, actions, configurable presentation              |
| `DiCollapse`   | Focus, checkbox, and details-based collapse presentation                      |
| `DiDrawer`     | Start/end drawer, overlay, responsive open breakpoint, slots                  |
| `DiDropdown`   | Positioning, alignment, option selection, custom slots, outside-click closing |
| `DiIcon`       | Typed synchronous core and lazy icons, transforms, animation, badges          |
| `DiLoading`    | Spinner, dots, ring, ball, bars, and infinity loading styles                  |
| `DiModal`      | Native dialog, optional teleport, placement, backdrop, and Escape closing     |
| `DiRating`     | Full and half values, variants, masks, hover, read-only/disabled, RTL spacing |
| `DiSkeleton`   | Rectangle, circle, and text skeleton shapes with size controls                |
| `DiSwitch`     | Modeled switch input, label positions, size and variant control               |
| `DiTooltip`    | Tooltip content, positions, variants, open state, event forwarding            |

These components have implementation code but do not currently have automated unit or
component tests.

## Layout components

The following shell components exist under `src/shared/ui/layout`:

- `AppHeader`
- `AppSidebar`
- `FullscreenToggle`
- `LanguageToggle`
- `MenuItem`
- `Notifications`
- `ThemeToggle`
- `UserProfile`

## Shared pattern components

- `PreviewCodeCard`

## Shared composables and utilities

- `useTheme`
- `useDirection`
- `useSidebar`

`useSidebar` is stored under `src/shared/utils` despite exposing composable singleton state.

## Shared presentation types

The repository defines:

- Recursive `MenuItem`.
- Shared `Size`.
- General and component-specific variant unions.
- Derived `IconName`.
- Generated component declarations.

These are UI types. There are no business entities or transport DTOs.

# Existing Dependencies

## Runtime dependencies

| Package                | Current role                                                         |
| ---------------------- | -------------------------------------------------------------------- |
| `vue`                  | Application and component runtime                                    |
| `vue-router`           | Client-side routing and lazy-loaded route composition                |
| `vue-i18n`             | Localization and active locale state                                 |
| `pinia`                | Registered state-management library; no stores use it                |
| `@vueuse/core`         | Local storage, preferred dark mode, clipboard, and browser utilities |
| `@vueuse/integrations` | NProgress integration composable                                     |
| `nprogress`            | Route loading indicator                                              |
| `shiki`                | Syntax highlighting for source previews                              |

## Build, styling, and generation dependencies

| Package                    | Current role                                     |
| -------------------------- | ------------------------------------------------ |
| `vite`                     | Development server and production build          |
| `@vitejs/plugin-vue`       | Vue SFC compilation                              |
| `vite-plugin-vue-devtools` | Development Vue DevTools integration             |
| `typescript`               | Static typing                                    |
| `vue-tsc`                  | Vue-aware type checking                          |
| `tailwindcss`              | Utility CSS framework                            |
| `@tailwindcss/vite`        | Tailwind integration with Vite                   |
| `daisyui`                  | Semantic UI component classes and themes         |
| `unplugin-icons`           | Icon component generation                        |
| `@iconify/json`            | Installed Iconify collection data                |
| `unplugin-vue-components`  | Component resolution and declaration generation  |
| `npm-run-all2`             | Parallel type-check and production-build scripts |

## Quality and test dependencies

| Package                           | Current role                                     |
| --------------------------------- | ------------------------------------------------ |
| `eslint`                          | Static analysis and automatic fixes              |
| `@antfu/eslint-config`            | Main Vue and TypeScript lint configuration       |
| `eslint-plugin-format`            | Formatting integration in ESLint                 |
| `@vitest/eslint-plugin`           | Vitest lint rules                                |
| `eslint-plugin-playwright`        | Playwright lint rules                            |
| `prettier`                        | Source formatting                                |
| `vitest`                          | Unit-test runner                                 |
| `jsdom`                           | Browser-like unit-test environment               |
| `@vue/test-utils`                 | Vue component mounting and interaction utilities |
| `@types/jsdom`                    | jsdom TypeScript declarations                    |
| `@playwright/test`                | Browser E2E testing                              |
| `husky`                           | Git hook management                              |
| `lint-staged`                     | Checks and fixes for staged files                |
| `@commitlint/cli`                 | Commit message validation                        |
| `@commitlint/config-conventional` | Conventional Commit rule set                     |

## Configuration support dependencies

| Package            | Current role                            |
| ------------------ | --------------------------------------- |
| `@tsconfig/node24` | Node-side TypeScript defaults           |
| `@vue/tsconfig`    | Vue application TypeScript defaults     |
| `@types/node`      | Node.js TypeScript declarations         |
| `jiti`             | Runtime loading support used by tooling |

There is no HTTP, schema-validation, form-management, date, charting, table, authentication,
server-state, or error-reporting dependency.

# Current Limitations

## Product completeness

- Every dashboard page is placeholder-only.
- Numerous UI demonstration pages are placeholder-only.
- Notifications and user profile content are static.
- Sidebar project links point to `/projects` paths that are not registered.
- No not-found experience exists.
- No authentication or authorization experience exists.

## Routing consistency

- Dashboard routes lack the page-title and breadcrumb metadata used by other route groups.
- Menu and route configuration are maintained separately and can drift.
- One group of menu links has already drifted from the router.
- There are no automated route/menu consistency checks.

## State management

- Pinia is registered but unused.
- `src/app/pinia.ts` is empty.
- Theme logic is duplicated between `useTheme` and `ThemeToggle`.
- Sidebar state uses a module-level ref without persistence or a documented store strategy.
- Overlay and global UI state have no central coordination.

## Component quality

- Reusable components have no automated unit or component tests.
- `DiDropdown` relies heavily on `any`.
- Modal body-scroll handling is not safe for several simultaneous modals.
- Global document effects are implemented in individual components.
- Some dynamic Tailwind class strings may not be generated reliably.
- Accessibility behavior exists in parts of the library but has not been systematically tested.

## Localization

- Locale coverage is highly uneven.
- English fallback hides missing translations.
- Several menu labels and placeholder pages contain literal English.
- Translation-key parity is not checked automatically.
- Dana font selection explicitly covers Persian and Arabic but not Hebrew.

## Styling and assets

The global CSS contains likely cleanup items:

- `--shadow: nane` appears misspelled.
- The light-theme hover color is written with quotes around its hex value.
- Local WOFF and WOFF2 sources declare the `truetype` format.
- Some comments contain spelling errors.

These are current observations; this baseline does not modify them.

## Testing

- No unit-test files exist.
- The existing Playwright test asserts removed Vue starter content.
- There is no valid automated application smoke test.
- There is no established test helper, fixture, or mocking pattern.
- Playwright is configured for three browser engines, but configuration alone is not coverage.

## Documentation and operations

- The root README remains primarily Vue starter documentation.
- No CI workflow exists.
- No deployment target or hosting configuration is documented.
- No bundle-size or performance budget exists.
- No observability or error-reporting system exists.

# Missing Infrastructure

The following infrastructure is not implemented.

## Data access

- HTTP client.
- Base API URL configuration.
- Environment-variable contract for services.
- Endpoint modules.
- Request cancellation convention.
- Request/response interceptors.
- Error normalization.
- Retry strategy.
- Mock API layer.

## Domain and transport modeling

- Domain entities.
- Request DTOs.
- Response DTOs.
- Data mappers.
- Schema validation.
- Boundary validation for external data.

The existing `src/shared/types/models` directory contains presentation types only.

## State and server state

- Pinia stores.
- Store placement and naming rules.
- Store persistence policy.
- Server-state caching.
- Cache invalidation policy.
- Optimistic update strategy.
- Global loading and error coordination.

## Security and identity

- Authentication.
- Authorization.
- Route protection.
- Token or session storage.
- Permission model.
- Secure logout behavior.
- Security-related response handling.

## Application resilience

- Application-level error boundary.
- Standard error presentation.
- Not-found route.
- Offline or degraded-network behavior.
- Central overlay or focus management.
- Production logging and observability.

## Delivery and operations

- CI pipeline.
- Automated quality gates.
- Deployment workflow.
- Hosting configuration.
- Environment promotion strategy.
- Dependency update automation.
- Performance monitoring.
- Bundle analysis.

## Test foundations

- Valid E2E smoke tests.
- Unit/component tests.
- Router integration tests.
- Test fixtures.
- Shared rendering utilities.
- Mocking conventions.
- Coverage thresholds.
- Accessibility automation.
- Visual regression testing.

## Product-specific infrastructure

- Real dashboard data and interactions.
- Form system.
- Validation strategy.
- Data tables.
- Charts.
- Search.
- Filtering and pagination connected to data.
- User and organization domain concepts.

None of these should be introduced without product requirements and an explicit architectural
decision where the choice will constrain future work.

# Recommended First Development Steps

The following sequence reduces current uncertainty and establishes reliable foundations before
large feature work.

## 1. Establish a trustworthy verification baseline

First:

1. Replace the stale Playwright starter test with a valid application smoke test.
2. Add focused component tests for the most interaction-sensitive shared primitives.
3. Add a non-mutating lint-check script alongside the existing fixing command.
4. Run type checking and production builds in a documented verification workflow.

Initial component-test priorities:

- `DiDropdown`
- `DiModal`
- `DiDrawer`
- `DiRating`
- Recursive `MenuItem`
- Theme and language controls

This step should define the repository's first real test helper conventions.

## 2. Repair navigation consistency

Resolve current navigation gaps:

1. Decide whether the unrouted `/projects` sidebar section should be removed or implemented.
2. Add an intentional catch-all and not-found page.
3. Add consistent route metadata to dashboard routes.
4. Correct incomplete breadcrumb metadata.
5. Add a test or validation mechanism that detects menu destinations without route records.

Do not implement project-domain pages without requirements merely to satisfy the current menu.

## 3. Consolidate global preference behavior

Remove duplicate theme ownership by making `useTheme` the single implementation used by the
theme control and preview pattern.

Then document and test:

- Initial OS preference behavior.
- Persisted theme behavior.
- Persisted language behavior.
- HTML language and direction updates.

Keep preference state simple; Pinia is not required merely to centralize one persisted ref.

## 4. Complete and harden the component foundation

Before expanding the application significantly:

1. Decide which placeholder component demonstrations belong in the supported library.
2. Complete those demonstrations or remove unsupported catalogue routes.
3. Improve `DiDropdown` typing through a focused generic API design.
4. Make modal scroll locking and cleanup safe for concurrent overlays.
5. Verify keyboard and focus behavior for interactive primitives.
6. Replace dynamic Tailwind class construction with statically discoverable maps where needed.
7. Correct confirmed theme and font declaration defects.

Public component API changes should be reviewed as compatibility-sensitive decisions.

## 5. Improve localization completeness

Create a repeatable locale-parity check and decide the intended support level for each
configured language.

Then:

1. Replace literal application-shell English with translation keys.
2. Fill missing keys according to the agreed support level.
3. Verify Hebrew typography and all RTL layouts.
4. Prevent new missing keys from entering through automated validation.

## 6. Remove or formalize unused scaffolding

Make explicit decisions about:

- Empty `src/app/pinia.ts`.
- Empty `EmptyLayout.vue`.
- Unused `@core` alias.
- The location of `use-sidebar.ts`.
- The value of the page-wrapper layer as features become substantive.

Remove scaffolding that has no accepted responsibility. Keep it only when an imminent, documented
use exists.

## 7. Select the first real product feature

Choose one bounded dashboard or admin workflow with known user requirements. Use it to validate
the feature architecture before generating multiple similar modules.

The feature should establish only the infrastructure it actually needs. If it requires remote
data, create ADRs for:

- HTTP client and API configuration.
- DTO and domain boundaries.
- State and server-state ownership.
- Error and loading behavior.
- Authentication, if applicable.

Avoid building a generic data platform before selecting the feature.

## 8. Add continuous integration after checks are reliable

Once the test and lint baseline is trustworthy, add CI that runs:

- Dependency installation from the pnpm lockfile.
- Non-mutating lint validation.
- Type checking.
- Unit/component tests.
- Production build.
- A focused E2E smoke test.

Deployment automation should follow only after a hosting target and environment contract are
selected.
