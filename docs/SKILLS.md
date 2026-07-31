# Project-Local AI Skills

## Table of Contents

- [Purpose](#purpose)
- [Guidance Hierarchy](#guidance-hierarchy)
- [Available Skills](#available-skills)
- [Using Project-Local Skills](#using-project-local-skills)
- [Creating New Skills](#creating-new-skills)
- [Equivalent Skills Across Agents](#equivalent-skills-across-agents)
- [Documentation Responsibilities](#documentation-responsibilities)
- [Skill Review Checklist](#skill-review-checklist)

## Purpose

This document is the catalogue and governance guide for project-local AI skills in Diana Vue
Admin Panel.

A skill is a specialized, repeatable workflow for a bounded class of engineering tasks. Skills
do not replace repository onboarding, architecture documentation, engineering decisions, or
task-specific source inspection. They consume that guidance and translate it into a precise
execution workflow.

## Guidance Hierarchy

Project guidance is organized as:

```text
AGENTS.md
  -> project documentation and Architecture Decision Records
      -> specialized project-local skills
          -> current repository source
```

### `AGENTS.md`

`AGENTS.md` is the mandatory entry point for AI coding work. It defines:

- Repository mission.
- Operational rules.
- Dependency direction.
- Coding conventions.
- Task preparation.
- Review and completion requirements.
- Forbidden actions.
- Links to current project documentation.

Every project-local skill must read `AGENTS.md` first. Skills must follow its current
documentation references dynamically rather than embedding a duplicated documentation index.

### Project documentation

Files under `docs` describe:

- Current architecture.
- Project structure.
- Code conventions.
- Development and contribution workflows.
- Current project baseline.
- Accepted architecture decisions.

Documentation establishes project-wide facts and policies. A skill should link to or discover
this documentation through `AGENTS.md`; it should not copy large project-wide sections into its
own workflow.

### Architecture Decision Records

Records under `docs/ADR` explain accepted decisions and their consequences. Skills must not
silently contradict an accepted ADR.

When a skill task requires a new cross-cutting architectural decision, the task should surface
that decision instead of treating the skill as authority to invent one.

### Skills

Skills define specialized execution behavior. They may contain:

- A main workflow.
- Decision rules.
- Quality gates.
- Definitions of Done.
- Focused reference documents.
- Invocation examples.
- Deterministic scripts or output assets when genuinely necessary.

A skill is subordinate to repository instructions and current source. It must not preserve
stale project facts merely because they were true when the skill was written.

## Available Skills

### `create-di-component`

Purpose: create, resume, extend, test, document, or integrate reusable Diana design-system
components whose public names begin with `Di`.

Use it for:

- New reusable base UI components.
- Wrapping or extending a DaisyUI primitive.
- Changes to a public `Di*` component API.
- Resuming an interrupted component implementation.
- Component tests.
- Component showcase demos.
- Feature and router-facing showcase pages.
- Route, sidebar, locale, style, and icon integration required by a component.

Do not use it for feature-specific business UI such as order forms, permission tables, invoice
status views, or domain-specific search filters.

Supported modes:

| Mode             | Responsibility                                                  |
| ---------------- | --------------------------------------------------------------- |
| `full`           | Component, tests, and complete showcase integration             |
| `resume`         | Continue and complete valid interrupted full-mode work          |
| `showcase`       | Create or repair showcase integration for an existing component |
| `component-only` | Component, directly required support files, and tests only      |

Default behavior remains defined by the skill:

- A missing component defaults to `full`.
- An incomplete full integration defaults to `resume`.
- A complete integration is treated as an update.
- The skill does not default to `component-only`.

#### Claude implementation

Location:

```text
.claude/skills/create-di-component/
```

Invocation:

```text
/create-di-component DiAccordion full
```

#### Codex implementation

Location:

```text
.codex/skills/create-di-component/
```

Invocation:

```text
/create-di-component DiAccordion full
```

The Codex implementation is a behavioral migration of the Claude reference implementation. The
two versions should provide substantially the same user experience, workflow, quality gates,
and completion criteria.

## Using Project-Local Skills

### Invoke the narrowest applicable skill

Use a project-local skill only when the request matches its declared responsibility. Do not
force a specialized skill onto unrelated work.

For example:

```text
/create-di-component DiSwitch full
```

is appropriate for a reusable Diana switch and its showcase. It is not appropriate for a
customer settings form that merely happens to contain switches.

### Preserve invocation contracts

Treat documented slash-command syntax as a public user-facing contract. Equivalent Claude and
Codex skills should use the same invocation whenever technically possible.

Do not redesign invocation syntax as part of a migration between agents.

### Run the bootstrap workflow

Before acting, a project-local skill must:

1. Read `AGENTS.md`.
2. Follow its current documentation references.
3. Read project documentation relevant to the task.
4. Inspect current repository source and configuration.
5. Infer maintained local conventions.
6. Only then plan or implement.

Prior conversation context does not remove this requirement.

### Respect execution modes

When a skill defines modes:

- Resolve the mode before editing.
- Report the resolved mode.
- Honor exclusions associated with the mode.
- Do not expand a narrow mode silently.
- Use resume behavior to preserve valid interrupted work.

### Keep repository source authoritative

Skills provide workflow and preferred quality direction. Current source remains authoritative
for:

- Existing paths.
- Installed dependencies.
- Current APIs.
- Active routes.
- Locale structure.
- Available icons.
- Existing tests.
- Uncommitted work.

When maintained source and a skill conflict, investigate whether the source represents valid
evolution or known technical debt. Do not copy an inconsistency merely because it exists, and
do not overwrite valid current work merely because a skill reference is older.

### Report validation accurately

Skills must distinguish:

- Checks that passed.
- Checks that failed because of the change.
- Pre-existing failures.
- Checks not run.
- Incomplete artifacts.

Never report a full Definition of Done when required artifacts are missing.

## Creating New Skills

### Establish a bounded purpose

A new skill must cover a repeatable class of tasks with a clear trigger. Do not create a skill
for a one-time change or for generic behavior already covered by `AGENTS.md`.

The skill name should:

- Use lowercase letters, digits, and hyphens.
- Be shorter than 64 characters.
- Prefer a concise verb-led phrase.
- Match its folder name.

### Select the project-local location

Use the agent-appropriate project directory:

```text
.claude/skills/<skill-name>/
.codex/skills/<skill-name>/
```

When equivalent skills exist for both agents, keep names and user-facing invocation contracts
aligned.

### Use a focused package structure

Every skill requires `SKILL.md`.

Use additional resources only when needed:

```text
<skill-name>/
├── SKILL.md
├── agents/
│   └── openai.yaml
├── references/
├── examples/
├── scripts/
└── assets/
```

Agent-specific metadata belongs only in the format required by that agent. Do not add empty
directories or auxiliary files without an execution purpose.

Do not add skill-local files such as generic readmes, changelogs, or installation guides unless
the target skill system explicitly requires them. Project-level skill discovery belongs in this
document.

### Use `AGENTS.md` as the entry point

Every new project-local skill must instruct the agent to:

1. Read `AGENTS.md` first.
2. Follow documentation references from `AGENTS.md`.
3. Select relevant documentation dynamically.
4. Inspect current source.

Do not hardcode and maintain a second list of project documentation inside the skill.

### Separate workflow from references

Keep essential execution order and decision rules in `SKILL.md`.

Use references for:

- Detailed project-specific conventions.
- Quality gates.
- Schemas.
- Integration procedures.
- Extended examples.

Keep references directly discoverable from `SKILL.md`. Avoid deep chains where a reference can
only be found through another reference.

### Define quality and completion

A specialized engineering skill should define:

- Ownership boundaries.
- Required discovery.
- Planning expectations.
- Implementation phases.
- Quality gates.
- Validation order.
- Definition of Done.
- Interruption and resume behavior where applicable.
- Final reporting requirements.

Quality gates must test observable engineering outcomes rather than ceremonial file presence.

### Preserve architecture

A skill may operationalize accepted architecture but cannot establish new project architecture
silently.

When the workflow needs an unimplemented cross-cutting convention—such as stores, API clients,
repositories, authentication, or deployment—the skill must defer to project decision-making and
ADR policy.

### Include realistic examples

Examples should show:

- Normal invocation.
- Important modes or variants.
- A realistic successful request.
- At least one request that should not use the skill.

Equivalent skills should preserve example intent and invocation behavior.

### Validate the package

Use the target agent's official validation tooling where available.

Validate:

- Package and folder naming.
- Required metadata.
- Resource links.
- Invocation examples.
- Missing placeholders.
- Stale agent-specific variables.
- Definitions of Done.
- Behavioral parity for equivalent skills.

After validation, inspect the repository diff and confirm that no unrelated files changed.

### Register the skill

Add every new project-local skill to the Available Skills section of this document. Record:

- Skill name.
- Purpose.
- Trigger scope.
- Exclusions.
- Supported modes.
- Agent-specific locations.
- Invocation syntax.
- Parity relationship, if any.

## Equivalent Skills Across Agents

When migrating a skill between Claude and Codex:

- Treat the existing implementation as the behavioral reference.
- Preserve folder organization whenever supported.
- Preserve workflow and phase order.
- Preserve quality gates.
- Preserve reference responsibilities.
- Preserve tone and detail.
- Preserve user-facing invocation syntax.
- Adapt only technically agent-specific metadata, variables, and resource paths.

If generic target-agent conventions conflict with reference behavior, prefer behavioral parity
unless technically impossible.

When a difference is unavoidable:

1. Use the closest supported equivalent.
2. Keep the user experience unchanged where possible.
3. Document the incompatibility.
4. Do not use the migration as an opportunity to simplify or redesign the skill.

## Documentation Responsibilities

### When project documentation changes

Update `AGENTS.md` references when the documentation entry points change. Skills will discover
the current documentation through that file.

Do not update every skill with a copied documentation list.

### When architecture changes

Update:

- The appropriate architecture documentation.
- The relevant ADR or a superseding ADR.
- Affected project-local skill references and quality gates.

Do not rewrite accepted ADR history solely to match a newer decision.

### When a skill changes

Update this catalogue if a skill's:

- Purpose changes.
- Trigger scope changes.
- Modes change.
- Invocation changes.
- Location changes.
- Agent parity changes.

Keep skill-specific procedural detail inside the skill rather than duplicating it here.

## Skill Review Checklist

Before accepting a new or migrated skill, verify:

- [ ] The skill has a clear, bounded responsibility.
- [ ] The name and folder follow the target agent's rules.
- [ ] Trigger conditions and exclusions are explicit.
- [ ] `AGENTS.md` is the first project-documentation entry point.
- [ ] No duplicated hardcoded project-document list exists.
- [ ] Current source inspection is required.
- [ ] Workflow phases are explicit.
- [ ] Quality gates are actionable.
- [ ] Definitions of Done are unambiguous.
- [ ] Interrupted work is preserved when resume behavior is needed.
- [ ] Validation reporting distinguishes passed, failed, pre-existing, and unrun checks.
- [ ] References are directly discoverable from `SKILL.md`.
- [ ] Examples are realistic.
- [ ] Agent-specific metadata is valid.
- [ ] Equivalent agent versions preserve behavioral parity.
- [ ] The skill is listed in this catalogue.
- [ ] The final diff contains no unrelated changes.
