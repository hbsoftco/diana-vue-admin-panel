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

## Canonical namespaces

The migration compatibility namespaces have been removed. Use only the canonical ownership roots
and camelCase segments documented above. In particular, use `common.variants.*` and
`features.advancedUi.*`; root `variants.*` and hyphenated feature segments are invalid.

The repository validator rejects legacy namespace references, unknown static translation keys,
locale structure differences, and keys stored in the wrong locale module.

## Adding translations

1. Select the module from the ownership table.
2. Search that module and the English locale for an existing key with the same meaning.
3. Add the English key and the same key structure to every supported locale.
4. Use a stable translation key at the call site; keep identifiers in data structures.
5. Verify English, one non-English locale, and an RTL locale when rendered layout is affected.

Run `pnpm i18n:check` before finishing. Use `pnpm i18n:unused` as a conservative review aid;
confirm every reported key against dynamic lookups before removing it.
