let activeItem: Record<string, unknown> | null = null

export function setActiveDraggableItem(item: Record<string, unknown>) {
  activeItem = item
}

export function getActiveDraggableItem() {
  return activeItem
}

export function clearActiveDraggableItem() {
  activeItem = null
}
