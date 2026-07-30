# Example invocations

## New primitive with full showcase

```text
/create-di-component DiSwitch full

Create a reusable switch based on daisyUI. It needs v-model, sizes, disabled and indeterminate states, labels, RTL support, keyboard behavior, tests, and a UI Elements showcase.
```

## Component-only implementation

```text
/create-di-component DiVisuallyHidden component

Add a minimal accessible utility component. Do not add a showcase route.
```

## Extend an existing API safely

```text
/create-di-component DiModal component

Add a persistent mode that blocks Escape and backdrop close. Preserve existing consumers, fix focus return and stacked scroll locking, and add targeted tests.
```

## Showcase only

```text
/create-di-component DiDropdown showcase

Rework the existing documentation into focused examples for default selection, custom keys, disabled options, keyboard navigation, RTL, and controlled state. Do not change the component API.
```

## Requests that should not use this skill

```text
Build a customer invoice table for the billing feature.
```

That is feature-specific business UI and belongs in a feature-development skill unless the task separately identifies a reusable design-system primitive.
