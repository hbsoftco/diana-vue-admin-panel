import type { MaybeRefOrGetter } from 'vue'

import { onScopeDispose, toValue, watch } from 'vue'

/**
 * Coordinates "exclusive" dropdown groups: at most one open dropdown per named
 * group. Opening a member calls `closeSiblings()`, which closes every other
 * member registered under the same name.
 *
 * The registry is module-level on purpose so unrelated component trees (for
 * example the separate header controls) can share a group without wiring props
 * through a common ancestor.
 */
type GroupMember = {
  close: () => void
}

const groups = new Map<string, Set<GroupMember>>()

export function useDropdownGroup(
  group: MaybeRefOrGetter<string | undefined>,
  close: () => void,
) {
  const member: GroupMember = { close }
  let current: string | undefined

  function leave() {
    if (!current)
      return

    const members = groups.get(current)
    members?.delete(member)
    if (members && members.size === 0)
      groups.delete(current)

    current = undefined
  }

  function join(name: string | undefined) {
    if (name === current)
      return

    leave()

    if (!name)
      return

    current = name
    if (!groups.has(name))
      groups.set(name, new Set())
    groups.get(name)!.add(member)
  }

  watch(() => toValue(group), join, { immediate: true })
  onScopeDispose(leave)

  /** Close every other registered dropdown that shares this group name. */
  function closeSiblings() {
    if (!current)
      return

    for (const other of groups.get(current) ?? []) {
      if (other !== member)
        other.close()
    }
  }

  return { closeSiblings }
}
