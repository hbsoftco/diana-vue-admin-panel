# Component quality gates

A Diana component is complete only when the applicable gates below are satisfied.

## 1. Ownership and reusability

- The component is domain-agnostic.
- It has a single clear responsibility.
- A feature-local component was not promoted to `shared` prematurely.
- It does not import feature, page, layout, or business API code.

## 2. Public API

- The name starts with `Di`.
- Props express semantics, not raw styling.
- Default values are deliberate.
- Boolean combinations do not create obvious invalid states.
- Slots are used for composable content.
- Scoped slots are typed.
- Emits and models are typed.
- No new `any`, broad `string`, or unbounded arbitrary-value prop is introduced without a documented reason.
- Native attributes and events still work.
- Existing consumers remain compatible, or a breaking change is explicitly reported.

## 3. State correctness

- Controlled props remain synchronized.
- A state transition emits once.
- Disabled state blocks interaction consistently.
- Async/loading state cannot cause duplicate actions.
- Internal state resets at the correct lifecycle point.
- Multiple instances do not conflict.
- Global side effects are reference-counted or otherwise safe for stacked instances when applicable.

## 4. Accessibility

### All components

- Correct semantic root element.
- Accessible name where required.
- Visible focus.
- Disabled semantics.
- Color is not the sole state indicator.
- Sufficient text/icon contrast through theme tokens.

### Buttons and links

- Use native `button` or `a`.
- Icon-only control has `aria-label`.
- A disabled anchor prevents activation and exposes `aria-disabled`.
- Do not apply `type` or `disabled` to elements that do not support them.

### Inputs and selectable controls

- Label association is possible.
- `name`, `required`, `disabled`, `readonly`, `invalid`, and form behavior are preserved where relevant.
- Model and change/input events have predictable timing.
- Keyboard behavior follows the native or ARIA pattern.

### Disclosure, dropdown, tabs, menus

- Trigger exposes expanded state and controlled element.
- Keyboard navigation matches the chosen pattern.
- Focus is not trapped incorrectly.
- Escape behavior is supported when appropriate.
- Menu semantics are used only for actual application menus, not generic navigation or lists.

### Modal, drawer, popover

- Correct dialog/modal semantics.
- Focus enters predictably.
- Focus returns to the invoker.
- Escape and backdrop behavior respect props.
- Backdrop is not exposed as an unlabeled interactive element.
- Page scroll behavior is restored on close and unmount.
- Stacked overlays do not unlock scroll early.
- Teleported content remains labelled.

### Icons and status

- Decorative icon is hidden from assistive technology.
- Meaningful icon has accessible context.
- Loading uses `aria-busy` or status semantics as appropriate.
- Alerts/live updates use the appropriate role and politeness.

## 5. Styling

- daisyUI primitive is used when it provides the correct semantics.
- Diana semantic tokens work in light and dark themes.
- RTL works through logical properties.
- All Tailwind classes are statically discoverable.
- No arbitrary brand-independent color was added.
- Custom CSS is scoped to the component system and imported once.
- No empty CSS or style block.
- Hover, active, focus, disabled, loading, and selected states are covered when relevant.
- Reduced-motion behavior is respected for nonessential animation.

## 6. TypeScript and Vue

- `<script setup lang="ts">`
- Types are precise.
- Shared types are reused only for exact semantic matches.
- No unnecessary watcher.
- No stale closure or race around async state.
- No missing event/listener/timer/observer cleanup.
- Browser-only code is lifecycle-safe.
- Class maps are finite and typed.
- Template does not depend on undefined defaults or undeclared props.

## 7. Tests

For interactive components:

- renders essential default state;
- accepts and reflects model/controlled changes;
- emits correct payloads;
- supports keyboard use;
- respects disabled/read-only state;
- exposes expected ARIA state;
- cleans up global effects;
- covers one important edge case.

Tests assert user-visible behavior rather than internal refs or large snapshots.

## 8. Showcase and docs

When showcase integration is requested:

- demo uses the real public API;
- examples are focused and copyable;
- code preview matches rendered markup;
- every preview/source pair is exact, including wrappers, props, directives, slots, child
  components, classes, handlers, and required script state;
- supplied image and video references were converted into a capability comparison;
- reference-supported examples use the existing API without unnecessary component changes;
- reference gaps are served only by generic, reusable, backward-compatible API additions;
- showcase layout, grouping, spacing, ordering, and examples closely follow supplied references;
- meaningful variants and states are present;
- interaction examples actually work;
- no huge Cartesian matrix without design value;
- route, wrapper, page, sidebar, and translations agree;
- all locale JSON files remain valid and schema-aligned;
- RTL-sensitive behavior is demonstrated when relevant.

## 9. Validation report

The final report accurately distinguishes:

- passed checks;
- failed checks caused by the change;
- pre-existing failures;
- checks not run.

Never say “all tests pass” when only type-check or build was run.
