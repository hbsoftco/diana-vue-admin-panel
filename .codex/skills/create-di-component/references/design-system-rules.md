# Diana Design System Rules

## Purpose

Diana components are an enterprise-grade design system built on top of DaisyUI.

DaisyUI is the foundation, not the limitation.

The goal is to provide:

- Full DaisyUI capability coverage.
- Consistent Diana project APIs.
- Additional admin-panel-specific capabilities.
- Reusable, scalable UI primitives.

---

# Core Philosophy

Every DI component must follow this rule:

```
Diana = DaisyUI capabilities + Diana extensions
```

DaisyUI defines the minimum capability set.

Diana may extend beyond DaisyUI when the application requires additional functionality.

Never reduce DaisyUI capabilities for simplicity.

---

# Component Reuse Policy (MANDATORY)

Before creating any UI element:

1. Search existing Diana components.
2. Identify whether an equivalent DI component already exists.
3. Reuse existing components whenever possible.

Never recreate existing components.

Forbidden:

```vue
<button>
Save
</button>

<input />

<select />
```

when an equivalent Diana component exists.

Use:

```vue
<DiButton />

<DiInput />

<DiSelect />
```

instead.

Direct HTML elements are only allowed when:

- No equivalent DI component exists.
- There is a documented technical reason.

---

# Component Classification

Before implementation, determine the component type:

## 1. Existing Component Extension

If a DI component already exists:

- Extend it.
- Preserve backward compatibility.
- Do not create a duplicate component.

---

## 2. Base Component

A foundational UI primitive.

Examples:

- DiButton
- DiInput
- DiSelect
- DiModal
- DiDropdown
- DiCard

Base components must follow DaisyUI parity rules.

---

## 3. Composite Component

A higher-level component built using existing DI components.

Examples:

- DataTable
- FilterPanel
- SearchToolbar
- FormBuilder
- UserSelector

Composite components should not duplicate base component logic.

---

# Base Component Rules

When creating a new base component:

You MUST:

1. Inspect DaisyUI documentation.
2. Review all available variants.
3. Review all modifiers.
4. Review all states.
5. Review accessibility behavior.
6. Review responsive behavior.
7. Review dark mode behavior.

The implementation must provide complete DaisyUI parity.

---

# DaisyUI Parity Rule (MANDATORY)

A DI base component must include all relevant DaisyUI capabilities.

Examples:

For Button:

Required DaisyUI capabilities may include:

- color variants
- sizes
- outline
- ghost
- link
- loading state
- disabled state
- active state
- wide
- block
- square
- circle
- icon-only usage
- slot support

Do not implement only the currently used features.

The component should be production-ready for future usage.

---

# Diana Extension Rule

Diana components are allowed and encouraged to add capabilities beyond DaisyUI.

Additional features may include:

- permission handling
- tooltip integration
- confirmation dialogs
- analytics hooks
- loading strategies
- icon systems
- form integration
- validation support
- application-specific behavior

Example:

DaisyUI Button:

```vue
<DiButton color="primary" variant="outline" />
```

Diana Button may support:

```vue
<DiButton
  color="primary"
  variant="outline"
  permission="users.create"
  loading
  confirm
  tooltip="Create user"
/>
```

---

# Wrapper Philosophy

DI components are not simple wrappers.

They are enhanced abstractions.

Bad:

```
DaisyUI button renamed to DiButton
```

Good:

```
DaisyUI button
+
stable Diana API
+
enterprise features
```

---

# Implementation Order

Every component task should follow this order:

1. Read AGENTS.md.
2. Check existing DI components.
3. Check project conventions.
4. Read DaisyUI documentation.
5. Create a capability matrix.
6. Design the DI API.
7. Implement the component.
8. Add Diana-specific enhancements.
9. Create showcase examples.
10. Run quality checks.

---

# Capability Matrix Requirement

Before implementing a base component, identify:

| Category         | Supported           |
| ---------------- | ------------------- |
| Variants         | Yes/No              |
| Sizes            | Yes/No              |
| States           | Yes/No              |
| Slots            | Yes/No              |
| Accessibility    | Yes/No              |
| Dark Mode        | Yes/No              |
| Responsive       | Yes/No              |
| DaisyUI Features | Complete/Incomplete |
| Diana Extensions | List                |

---

# Quality Gate

A component is considered incomplete if:

- Existing DI components were ignored.
- Raw HTML was used instead of available DI components.
- DaisyUI features were removed.
- The component only supports the current screen.
- The API cannot be extended.
- No showcase example exists.
- Documentation is missing.

---

# Design System Evolution

The design system evolves over time.

When new requirements appear:

1. Prefer extending existing components.
2. Avoid breaking existing APIs.
3. Preserve DaisyUI compatibility.
4. Add reusable capabilities instead of one-off solutions.

Every new component should make future development easier.
