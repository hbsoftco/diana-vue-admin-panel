# ADR 0007: Localization Module Ownership

- Status: Accepted
- Date: 2026-08-04

## Context

Locale messages previously lived in one JSON file per language. Existing keys mix navigation,
layout, reusable-component defaults, page metadata, common concepts, and feature content. Several
legacy namespaces are inconsistent, while locale coverage intentionally relies on English fallback.
A wholesale key migration would create broad runtime risk and an unreviewable change.

## Decision

Each locale is composed from `common`, `menu`, `layout`, `components`, `pages`, and `features`
JSON modules. A locale-local index merges the modules synchronously, preserving the existing Vue
I18n runtime and fallback behavior.

Translation keys are owned by responsibility. New keys use the matching top-level namespace and
camelCase segments. Dynamic keys may use only controlled identifiers. Technical identifiers and
source examples are not translated.

Legacy namespaces remain temporarily in the module matching their intended owner. Consumers will
move incrementally; compatibility keys are removed only when unused.

## Consequences

- Locale ownership is visible in the filesystem and reviewable by area.
- Existing pages and components continue to resolve the same keys during migration.
- Each locale requires six small modules and an index.
- Temporary legacy namespaces remain inconsistent until Phase 1 migrations complete.
- A custom translation composable is not justified at this stage.
