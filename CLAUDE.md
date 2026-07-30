# Permanent Engineering Guide

## Table of Contents

- [Purpose](#purpose)
- [Relationship to Other Documentation](#relationship-to-other-documentation)
- [Engineering Philosophy](#engineering-philosophy)
- [Architecture Philosophy](#architecture-philosophy)
- [Long-Term Goals](#long-term-goals)
- [Refactoring Policy](#refactoring-policy)
- [Documentation Policy](#documentation-policy)
- [Testing Philosophy](#testing-philosophy)
- [Code Review Expectations](#code-review-expectations)
- [Scalability Principles](#scalability-principles)
- [Maintainability Principles](#maintainability-principles)
- [Decision-Making Framework](#decision-making-framework)

## Purpose

This is the project's durable engineering guide. It explains how architectural and technical
decisions should be evaluated over time. It is intentionally different from `AGENTS.md`, which
contains operational instructions for AI coding agents.

The guide describes desired engineering direction without claiming that unimplemented systems
already exist.

## Relationship to Other Documentation

Use the documentation set as follows:

- [`AGENTS.md`](AGENTS.md): task execution rules for AI coding agents.
- [`docs/ARCHITECTURE.md`](docs/ARCHITECTURE.md): current implemented architecture.
- [`docs/PROJECT_STRUCTURE.md`](docs/PROJECT_STRUCTURE.md): file and directory ownership.
- [`docs/CODE_CONVENTIONS.md`](docs/CODE_CONVENTIONS.md): enforceable and observed code style.
- [`docs/DEVELOPMENT_GUIDE.md`](docs/DEVELOPMENT_GUIDE.md): development workflows.
- [`docs/CONTRIBUTING.md`](docs/CONTRIBUTING.md): contribution and review process.
- [`docs/ADR`](docs/ADR): durable records of important architecture decisions.

When this guide and current source disagree about implementation, source and accepted ADRs are
the factual authority. Update stale documentation rather than rationalizing the mismatch.

## Engineering Philosophy

### Solve the actual problem

Prefer a complete solution to the current requirement over speculative infrastructure. A
general abstraction is justified when it represents a stable responsibility, not merely because
future reuse is imaginable.

### Optimize for comprehension

Code is maintained more often than it is written. Favor direct data flow, explicit contracts,
predictable placement, and names that expose intent. Cleverness that saves lines but obscures
responsibility is a net cost.

### Preserve evidence

Engineering claims should be supported by source inspection, type checking, tests, or documented
manual verification. Do not allow confidence to substitute for evidence.

### Keep user experience systemic

Accessibility, theme compatibility, localization, and RTL behavior are not optional polish.
They are cross-cutting product requirements and should be considered when an interface is
designed, not after it is completed.

### Evolve deliberately

The project is early-stage. Early choices create strong precedents. The first store, API client,
repository, domain model, authentication flow, and test utility should receive more design
attention than a routine addition to an established pattern.

## Architecture Philosophy

The project favors a feature-oriented frontend with a small shared foundation:

```text
application assembly
  -> route and layout composition
      -> feature ownership
          -> shared UI and cross-cutting utilities
```

Architectural goals:

- Keep application composition separate from feature implementation.
- Keep feature ownership visible in the filesystem.
- Keep shared code domain-independent and demonstrably reusable.
- Keep dependencies flowing inward toward stable shared primitives.
- Keep browser-global integrations explicit.
- Prevent an undifferentiated `utils` or `core` layer from becoming a dumping ground.

The current architecture is documented in
[`docs/ARCHITECTURE.md`](docs/ARCHITECTURE.md). Decisions that constrain future work belong in
[`docs/ADR`](docs/ADR).

No data or domain architecture has been selected. When it becomes necessary, choose it from
actual requirements such as authentication, caching, request cancellation, normalization,
offline behavior, and testing—not from framework habit.

## Long-Term Goals

The project should mature toward:

1. A dependable, accessible Diana component library with stable typed APIs.
2. Complete admin-shell behavior across themes, locales, direction modes, and responsive sizes.
3. Real feature pages that retain clear ownership and do not leak domain behavior into shared
   UI.
4. Reliable automated coverage for component contracts and primary navigation flows.
5. Consistent route metadata, menu registration, and localization.
6. A deliberately designed state and data layer when product requirements demand one.
7. An explicit error-handling and observability strategy.
8. Documented deployment and CI workflows.
9. Incremental removal of placeholders, duplicate state logic, stale tests, and dead scaffolding.
10. Architecture that remains understandable without relying on institutional memory.

These are direction-setting goals, not descriptions of current completion.

## Refactoring Policy

### Refactor with a reason

A refactor should accomplish at least one concrete outcome:

- Remove verified duplication.
- Clarify ownership or dependency direction.
- Improve type safety.
- Make behavior testable.
- Correct lifecycle or accessibility risk.
- Enable an approved feature without excessive coupling.
- Remove obsolete scaffolding.

### Keep refactors scoped

Do not combine broad cleanup with an unrelated feature. Small, behavior-preserving refactors may
accompany a feature when they are necessary for a clean implementation and remain reviewable.

### Protect behavior

Before changing stable behavior:

- Identify its callers.
- Record relevant current behavior.
- Add or update tests when practical.
- Preserve public component contracts unless a breaking change is explicitly accepted.
- Verify themes, localization, and RTL where applicable.

### Avoid premature centralization

Two similar implementations do not automatically require an abstraction. Centralize when the
shared concept has the same responsibility and change cadence.

### Handle debt transparently

Do not disguise debt as convention. Known debt should be documented, scoped, and resolved through
intentional work. If a task encounters debt but cannot safely resolve it, state the limitation.

## Documentation Policy

Documentation is part of the engineering system.

Update documentation when changing:

- Architectural boundaries.
- Folder responsibility.
- Public component conventions.
- Development commands.
- Runtime or dependency requirements.
- Route registration.
- State or data strategy.
- Testing or deployment workflow.

Use ADRs for decisions that:

- Affect multiple features.
- Establish a precedent.
- Constrain future implementation.
- Introduce or replace a major dependency.
- Change dependency direction or ownership.

An ADR should record context, decision, and consequences. Accepted ADRs are historical records;
supersede them with a new ADR rather than rewriting history to hide an earlier choice.

Documentation must distinguish implemented behavior, known limitations, and future intent.

## Testing Philosophy

Testing should provide confidence at the cheapest effective level.

### Unit and component tests

Use component tests for reusable UI contracts:

- Rendering and defaults.
- Variant classes.
- Emitted events.
- `v-model`.
- Keyboard interaction.
- Disabled and read-only behavior.
- Listener cleanup.
- Direction-sensitive behavior.

### Integration tests

Use integration tests where several application concerns meet:

- Router metadata and layout output.
- Locale and document direction.
- Theme state and rendered component behavior.
- Menu state and navigation.

### End-to-end tests

Reserve E2E tests for critical user journeys and browser integration. Keep them deterministic,
focused, and independent of the removed Vue starter behavior.

### Regression principle

A defect fix should normally add evidence that the defect cannot silently return. Choose the
test level that most directly represents the failure.

### Current state

The repository has no unit tests and its only E2E test is stale. Test infrastructure should be
improved incrementally without blocking every small documentation or presentation correction.
Never treat absent tests as proof that behavior is safe.

## Code Review Expectations

Reviews should evaluate:

1. Correctness against the requested behavior.
2. Architectural ownership and dependency direction.
3. Public API clarity and type safety.
4. Accessibility and keyboard behavior.
5. Theme, localization, RTL, and responsive behavior.
6. Lifecycle cleanup and browser-global side effects.
7. Test quality and verification evidence.
8. Documentation impact.
9. Migration or compatibility risk.
10. Scope discipline.

Reviewers should ask whether a new abstraction makes the system easier to reason about, not only
whether it reduces duplication.

Authors should make tradeoffs visible. A review should not need to infer why a new dependency,
shared component, store, or architecture layer exists.

## Scalability Principles

### Scale ownership before abstraction

As features grow, preserve feature-local ownership. Do not move code into shared folders merely
to shorten import paths.

### Scale routes by composition

Continue composing explicit feature-group route definitions. If route volume makes manual
registration error-prone, address that through an accepted architectural decision rather than
quietly introducing a second routing model.

### Scale state by scope

Keep ephemeral state local. Promote state only when multiple owners need a consistent lifecycle.
When Pinia stores are introduced, separate UI state, durable client state, and remote server
state intentionally.

### Scale UI through contracts

The component library should scale through stable, typed, accessible primitives and composed
patterns. Avoid components with broad collections of unrelated boolean props. Prefer focused
responsibilities and composable slots.

### Scale localization structurally

Maintain consistent translation-key structure, automate missing-key detection when appropriate,
and avoid feature releases that silently expand fallback-language dependence.

### Scale build and delivery with evidence

Introduce CI, bundle analysis, deployment automation, and performance budgets when product
delivery requires them. Record choices that affect development or hosting in ADRs.

## Maintainability Principles

- Keep public contracts smaller than implementations.
- Prefer explicit data flow to implicit global state.
- Keep side effects at clear boundaries.
- Use stable semantic names for tokens, routes, events, and types.
- Remove dead scaffolding when its intended role is no longer credible.
- Keep route/menu/metadata/localization configuration synchronized.
- Avoid parallel implementations of the same preference or global state.
- Keep dependencies current through deliberate upgrades with verification.
- Treat warnings, stale tests, and placeholder routes as visible work rather than background
  noise.
- Make the correct location for new code easy to discover through documentation and adjacent
  examples.

Maintainability is measured by how safely the next engineer can change the system, not by the
number of abstractions it contains.

## Decision-Making Framework

For a lasting engineering decision:

1. Describe the concrete problem and current constraints.
2. Verify what is already implemented.
3. Identify the smallest viable options.
4. Compare consequences for ownership, typing, testing, accessibility, localization, and
   operations.
5. Choose based on current product needs and plausible near-term growth.
6. Record the decision in an ADR.
7. Update architecture and development documentation.
8. Implement incrementally with verification.

Prefer reversible decisions when evidence is limited. Make irreversible or ecosystem-shaping
decisions explicit and reviewable.
