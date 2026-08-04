# Development Guide

## Table of Contents

- [Purpose](#purpose)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Available Commands](#available-commands)
- [Local Development](#local-development)
- [Production Build](#production-build)
- [Type Checking](#type-checking)
- [Linting and Formatting](#linting-and-formatting)
- [Testing](#testing)
- [Adding a Route](#adding-a-route)
- [Adding a Feature Page](#adding-a-feature-page)
- [Adding a Base UI Component](#adding-a-base-ui-component)
- [Adding an Icon](#adding-an-icon)
- [Adding Translations](#adding-translations)
- [Working with Themes](#working-with-themes)
- [Working with RTL](#working-with-rtl)
- [Working with State](#working-with-state)
- [Working with Data APIs](#working-with-data-apis)
- [Debugging](#debugging)
- [Build and Hosting Notes](#build-and-hosting-notes)
- [Current Development Limitations](#current-development-limitations)

## Purpose

This guide explains how to work with the repository as it currently exists. It describes
implemented workflows and calls out areas where the project has not yet established a
convention.

## Prerequisites

Install:

- Node.js `^20.19.0` or `>=22.12.0`.
- pnpm.
- A modern browser.

Recommended editor support:

- VS Code.
- Vue - Official extension, also known as Volar.
- Vetur disabled when using Volar.

Playwright browser binaries are additionally required for E2E testing.

## Installation

From the repository root:

```sh
pnpm install
```

The `prepare` lifecycle script installs Husky hooks.

Use the committed `pnpm-lock.yaml`. Do not replace it with an npm or Yarn lockfile.

## Available Commands

| Command           | Purpose                                      | Mutates files                       |
| ----------------- | -------------------------------------------- | ----------------------------------- |
| `pnpm dev`        | Start the Vite development server            | Normally no                         |
| `pnpm build`      | Run type checking and production compilation | Writes build/cache output           |
| `pnpm build-only` | Run only the Vite production build           | Writes `dist`                       |
| `pnpm preview`    | Serve the production build                   | No source changes                   |
| `pnpm type-check` | Run `vue-tsc --build`                        | May write ignored build information |
| `pnpm lint`       | Run ESLint with fixes and cache              | Yes                                 |
| `pnpm format`     | Format `src/` with Prettier                  | Yes                                 |
| `pnpm test:unit`  | Start Vitest                                 | Test mode is interactive by default |
| `pnpm test:e2e`   | Run Playwright                               | Writes test reports/artifacts       |

The lint command is not verification-only because it includes `--fix`.

## Local Development

Start Vite:

```sh
pnpm dev
```

The default local URL is normally:

```text
http://localhost:5173
```

The root route redirects to:

```text
/dashboards/crm
```

Vite Vue DevTools are enabled in the Vite plugin configuration.

During development, verify:

- The route loads after a direct browser refresh.
- The sidebar highlights and expands the active route.
- The page title and breadcrumbs match route metadata.
- The page renders in both themes.
- The page renders in LTR and RTL modes.
- Lazy-loaded navigation completes and NProgress stops.

## Production Build

Run:

```sh
pnpm build
```

This runs:

- `vue-tsc --build`
- `vite build`

The tasks are run in parallel through `npm-run-all2`.

The default output is `dist/`, which is ignored by Git.

The application uses browser-history routing. A static production server must serve
`index.html` as the fallback for routes such as `/ui-elements/buttons`.

## Type Checking

Run:

```sh
pnpm type-check
```

The application TypeScript project includes:

- `env.d.ts`
- All files under `src`
- Vue SFCs
- Shared type declarations

Source tests under `src/**/__tests__` are excluded from the application project and included
through the Vitest project.

When adding an alias, update both:

- `vite.config.ts`
- `tsconfig.app.json`

An alias in only one location will work in either the bundler or the editor/compiler, but not
both.

## Linting and Formatting

### Lint and fix

```sh
pnpm lint
```

This command:

- Scans the repository.
- Applies ESLint fixes.
- Uses the ESLint cache.

Do not run it when source modifications are prohibited.

### Format source

```sh
pnpm format
```

This applies Prettier to `src/`.

### Pre-commit behavior

Husky runs lint-staged before a commit. Depending on the staged file type:

- JavaScript, TypeScript, and Vue files receive ESLint fixes.
- CSS, SCSS, and Vue files receive Prettier formatting.
- JSON and Markdown files receive Prettier formatting.

The hook stages the fixed files again.

## Testing

### Unit tests

Run:

```sh
pnpm test:unit
```

Vitest uses jsdom and excludes `e2e`.

No unit-test files currently exist, so there is no established repository example for mounting
components, test helpers, fixtures, or mocks.

Recommended locations compatible with current configuration are:

```text
src/**/__tests__/*.test.ts
src/**/__tests__/*.spec.ts
```

### E2E tests

Install browser binaries once:

```sh
pnpm exec playwright install
```

Run:

```sh
pnpm test:e2e
```

Local Playwright execution starts or reuses the Vite development server at port 5173. CI mode
expects a preview server on port 4173.

The configured projects are:

- Chromium
- Firefox
- WebKit

The current `e2e/vue.spec.ts` is stale. It expects the original Vue starter heading and should
not be considered a passing smoke test for the current application.

## Adding a Route

There is no filesystem route generation. Add routes explicitly.

For an existing feature group:

1. Create the route-facing wrapper under `src/pages/<group>`.
2. Create or identify the feature page under `src/features/<group>`.
3. Add a lazy child route to `src/features/<group>/routes.ts`.
4. Add `pageTitle` and breadcrumb metadata when applicable.
5. Add a menu item in `src/shared/config/menu.ts` if the page belongs in the sidebar.
6. Add translations for route metadata and menu labels.
7. Verify direct navigation and browser refresh.

Use translation keys in metadata:

```ts
meta: {
  pageTitle: 'pages.example.example',
  breadcrumb: [
    { label: 'pages.example.title', link: '/group' },
    { label: 'pages.example.example' },
  ],
}
```

Dashboard routes currently omit this metadata. New work should make an explicit choice rather
than assuming that omission is required.

Do not add sidebar links without matching router entries.

## Adding a Feature Page

Follow the current hierarchy:

```text
src/pages/<group>/<feature>.vue
src/features/<group>/<feature>/<Feature>Page.vue
src/features/<group>/<feature>/ui/<Feature>Demo.vue
```

The page wrapper should generally import and render the feature page. The feature page owns the
feature composition. UI components that only belong to the feature remain inside that feature
directory.

Promote a component to `src/shared` only when it is genuinely reusable across features.

Do not copy placeholder demo files as complete implementation examples.

## Adding a Base UI Component

Place reusable design-system primitives in:

```text
src/shared/ui/base
```

Use the `Di` prefix and a PascalCase filename.

Implementation checklist:

1. Define a typed prop API.
2. Define explicit defaults.
3. Type models, events, and slot props.
4. Use DaisyUI semantic classes where possible.
5. Use explicit class maps for controlled variants.
6. Support both Diana themes.
7. Support RTL where direction affects behavior or layout.
8. Use native interactive elements where possible.
9. Add accessible labels and keyboard behavior.
10. Clean up document listeners and styles.
11. Add or update shared types only when several components share the contract.
12. Add a real demonstration page if the component belongs in the catalogue.
13. Add tests for interactive behavior when a test scope is approved.

`unplugin-vue-components` is configured to generate component declarations, but current source
mostly uses explicit imports. Follow adjacent files.

## Adding an Icon

The shared icon API only accepts registered icon names.

Add an entry to:

```text
src/shared/icons/registry.ts
```

Use an async import in the existing format:

```ts
exampleIcon: () => import('~icons/<collection>/<icon-name>')
```

Then render it through:

```vue
<DiIcon name="exampleIcon" />
```

Icon auto-installation is disabled. The icon collection must already be available through the
installed Iconify data.

## Adding Translations

Locale dictionaries are under:

```text
src/shared/locales/<locale>/{common,menu,layout,components,pages,features}.json
```

Available locale codes:

- `en`
- `fa`
- `ar`
- `he`
- `fr`
- `es`

English is the fallback. Add English text at minimum and add equivalent keys to every locale
required by the feature.

Use:

```ts
const { t } = useI18n()
```

in scripts, or:

```vue
{{ $t('path.to.key') }}
```

in templates.

Do not assume all dictionaries contain the same key structure. Arabic, Hebrew, French, and
Spanish are currently much less complete than English and Persian.

## Working with Themes

Theme definitions live in:

```text
src/assets/css/style.css
```

Use semantic classes:

- `bg-base-100`
- `text-base-content`
- `text-primary`
- `border-content`
- `bg-content-background`

Use Diana CSS custom properties for shell-specific surfaces.

When adding a token, define it in both `diana-light` and `diana-dark`.

Use `useTheme` to consume or change the shared theme state. Avoid adding another independent
watcher for the same local-storage key.

## Working with RTL

Switch the language through the header control to test direction. Current RTL languages are:

- Persian
- Hebrew
- Arabic

Use Tailwind direction variants:

```text
ltr:ml-4
rtl:mr-4
```

Use `useDirection` for logic such as icon rotation or rating spacing.

Verify:

- Sidebar borders and nesting.
- Dropdown alignment.
- Breadcrumb separators.
- Icon direction.
- Spacing and text alignment.
- Modal and drawer start/end positions.

## Working with State

Choose state scope intentionally:

- Use a local `ref` for state owned by one component instance.
- Use a composable for reusable behavior.
- A module-scope ref creates application-wide singleton state.
- Use VueUse local storage for simple browser-persisted preferences.

Pinia is installed, but no stores or store conventions exist. If work requires the first
Pinia store, document and review:

- Store placement.
- Store naming.
- Separation of server and UI state.
- Persistence requirements.
- Error and loading state.
- Test strategy.

Do not add state to the empty `src/app/pinia.ts` without clarifying its intended responsibility.

## Working with Data APIs

There is no HTTP or domain-data implementation.

Before introducing the first API-backed feature, establish:

- HTTP client choice.
- Base URL configuration.
- Environment-variable contract.
- Service or repository placement.
- Request and response DTO placement.
- Domain mapping policy.
- Authentication headers.
- Cancellation behavior.
- Loading and error-state conventions.
- Server-state caching policy.
- Test mocking strategy.

Do not imply that `src/core`, services, repositories, or DTO directories already exist.

## Debugging

Available browser tools include:

- Vue DevTools through the Vite plugin.
- Vue browser extension support.
- Playwright traces on the first retry.
- NProgress feedback for route navigation.

ESLint warns on console use. Remove diagnostic logs before completing a change.

Useful checks:

- Inspect `document.documentElement.dataset.theme`.
- Inspect `document.documentElement.lang` and `.dir`.
- Check local-storage keys `theme` and `language`.
- Confirm active `route.path` when troubleshooting sidebar expansion.
- Confirm route metadata when title or breadcrumbs are wrong.

## Build and Hosting Notes

The output is a static SPA. Production hosting must:

- Serve files from `dist`.
- Return `index.html` for unknown application paths.
- Serve local font and image assets.
- Respect Vite's configured base URL if it is changed later.

No deployment provider, Docker image, reverse proxy, or CI/CD workflow is currently
configured.

## Current Development Limitations

Be aware of these repository conditions:

- The README does not fully describe the actual application.
- Unit tests are absent.
- The only E2E test is stale.
- Dashboard pages are placeholders.
- Multiple showcase pages are placeholders.
- Project menu links are not routed.
- There is no not-found route.
- There are no services, repositories, DTOs, or domain models.
- Pinia is registered but unused.
- Theme implementation is duplicated.
- Locale coverage is uneven.
