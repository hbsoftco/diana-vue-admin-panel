# ADR 0002: Folder Structure and Ownership

- Status: Accepted
- Date: 2026-07-30

## Table of Contents

- [Context](#context)
- [Decision](#decision)
- [Consequences](#consequences)

## Context

The repository already separates application setup, layouts, page wrappers, feature code,
shared UI, and assets. Several aliases anticipate directories that do not exist, especially
`src/core`. Pinia is installed without stores, and no data-access or domain folders have been
established.

Without explicit ownership rules, early-stage projects tend to accumulate unrelated logic in
generic `components`, `utils`, or `core` directories.

## Decision

Use the existing folder responsibilities:

| Path                     | Ownership                                        |
| ------------------------ | ------------------------------------------------ |
| `src/app`                | Global application construction and registration |
| `src/layouts`            | Router-selected application shells               |
| `src/pages`              | Thin route entry adapters                        |
| `src/features`           | Feature-specific pages, UI, and group routes     |
| `src/shared/ui/base`     | Reusable design-system primitives                |
| `src/shared/ui/layout`   | Application-shell UI                             |
| `src/shared/ui/patterns` | Reusable composed UI patterns                    |
| `src/shared/composables` | Cross-feature Composition API behavior           |
| `src/shared/config`      | Shared static configuration                      |
| `src/shared/icons`       | Typed icon registration                          |
| `src/shared/locales`     | Translation dictionaries                         |
| `src/shared/types`       | Shared UI types and generated declarations       |
| `src/plugins`            | Explicit third-party application integrations    |
| `src/assets`             | Global CSS and static source assets              |

Feature-specific components remain within their feature until they demonstrate
domain-independent reuse.

No folder convention is accepted yet for:

- Pinia stores.
- APIs.
- Services.
- Repositories.
- DTOs.
- Domain models.
- Authentication.

Do not create `src/core` solely because an alias exists. A real responsibility and a separate
decision are required.

## Consequences

### Positive

- New code has an identifiable owner.
- Shared folders remain focused on cross-feature concerns.
- Feature deletion or extraction is easier.
- Generic catch-all directories are discouraged.
- The current repository structure remains stable.

### Negative

- Thin page wrappers add indirection.
- Some current placement is imperfect; `use-sidebar.ts` behaves like a composable but remains
  under `shared/utils`.
- Missing data and state conventions must be decided before the first substantial
  implementation.

### Follow-up implications

- Moving code between feature and shared ownership should be a deliberate refactor.
- New architectural directories should be documented in this ADR's successor and in
  `docs/PROJECT_STRUCTURE.md`.
- Unused aliases and empty scaffolding should eventually be removed or given a justified role.
