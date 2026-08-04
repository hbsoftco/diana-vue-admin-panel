# Localization Architecture

## Purpose

This document defines translation ownership and the incremental migration path for Diana. It
describes the implemented locale-module structure without requiring existing pages and components
to migrate in one change.

## Locale modules

Each locale under `src/shared/locales/<locale>` contains the same six modules:

| Module            | Namespace      | Ownership                                                                           |
| ----------------- | -------------- | ----------------------------------------------------------------------------------- |
| `common.json`     | `common.*`     | Reusable actions, variants, sizes, and states                                       |
| `menu.json`       | `menu.*`       | Sidebar and navigation labels only                                                  |
| `layout.json`     | `layout.*`     | Application shell, footer, sidebar, notifications, user menu, theme, and fullscreen |
| `components.json` | `components.*` | Default text owned by reusable components and shared patterns                       |
| `pages.json`      | `pages.*`      | Route metadata, document titles, breadcrumbs, and layout-generated page headings    |
| `features.json`   | `features.*`   | Feature and showcase-specific content                                               |

Each locale index merges these modules into one Vue I18n message object. Module order is fixed and
top-level namespaces must be unique, so a later file must not override a namespace owned by an
earlier file.

## Key conventions

- Use camelCase segments and organize keys by owner, not by the component currently displaying
  them.
- Store translation keys or controlled technical identifiers in configuration and route metadata;
  never store translated display text there.
- Reuse `common.*` for generic concepts instead of duplicating them in features or components.
- Keep component defaults in `components.*`; caller-provided feature content remains in
  `features.*`.
- Keep route metadata in `pages.*` and navigation labels in `menu.*`, even when their displayed
  values happen to match.
- Dynamic keys must be built only from controlled literal unions or constant maps. Validate
  external values before using them in a key.
- Do not translate CSS classes or variables, component names, prop/API values, variant identifiers,
  source examples, URLs, brand names, or language names.

A namespace helper is intentionally not introduced. Existing `t()` calls are short, and a wrapper
would add another API without currently eliminating meaningful duplication.

## Compatibility namespaces and migration

Phase 0 preserves every existing key and runtime lookup. The following namespaces remain available
temporarily in their owner modules:

| Existing key                                                 | Owner module    | Phase 1 target example                             |
| ------------------------------------------------------------ | --------------- | -------------------------------------------------- |
| `variants.primary`                                           | `common.json`   | `common.variants.primary`                          |
| `theme.*`                                                    | `layout.json`   | `layout.theme.*`                                   |
| `sidebar.*`                                                  | `layout.json`   | `layout.sidebar.*`                                 |
| root `author` and `greeting`                                 | `layout.json`   | An owner-specific `layout.*` or `features.*` key   |
| hyphenated feature segments such as `features.advanced-ui.*` | `features.json` | camelCase segments such as `features.advancedUi.*` |

Migrate one bounded area at a time. Add the canonical key in every locale in scope, change all
known consumers, verify fallback behavior, and remove a compatibility key only after repository
search confirms that it has no consumers. Uneven locale coverage remains supported by the English
fallback.

Shared component defaults and the preview-code pattern now use the canonical `components.*`
namespace. Generic close and copy actions use `common.actions.*`.

## Adding translations

1. Select the module from the ownership table.
2. Search that module and the English locale for an existing key with the same meaning.
3. Add the English key and equivalent keys for every locale required by the change.
4. Use a stable translation key at the call site; keep identifiers in data structures.
5. Verify English, one non-English locale, and an RTL locale when rendered layout is affected.
