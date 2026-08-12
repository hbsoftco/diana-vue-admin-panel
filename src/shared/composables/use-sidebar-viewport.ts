import { onBeforeUnmount, onMounted, readonly, ref } from 'vue'

const DESKTOP_MEDIA_QUERY = '(min-width: 1024px)'
const HOVER_MEDIA_QUERY = '(hover: hover) and (pointer: fine)'

const isDesktop = ref(false)
const canHover = ref(false)

const readonlyIsDesktop = readonly(isDesktop)
const readonlyCanHover = readonly(canHover)

let activeConsumers = 0
let desktopMediaQuery: MediaQueryList | undefined
let hoverMediaQuery: MediaQueryList | undefined

function updateDesktop(event: MediaQueryListEvent) {
  isDesktop.value = event.matches
}

function updateHoverCapability(event: MediaQueryListEvent) {
  canHover.value = event.matches
}

function startListening() {
  if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') {
    return
  }

  activeConsumers += 1

  if (activeConsumers > 1) {
    return
  }

  desktopMediaQuery = window.matchMedia(DESKTOP_MEDIA_QUERY)
  hoverMediaQuery = window.matchMedia(HOVER_MEDIA_QUERY)

  isDesktop.value = desktopMediaQuery.matches
  canHover.value = hoverMediaQuery.matches

  desktopMediaQuery.addEventListener('change', updateDesktop)
  hoverMediaQuery.addEventListener('change', updateHoverCapability)
}

function stopListening() {
  if (activeConsumers === 0) {
    return
  }

  activeConsumers -= 1

  if (activeConsumers > 0) {
    return
  }

  desktopMediaQuery?.removeEventListener('change', updateDesktop)
  hoverMediaQuery?.removeEventListener('change', updateHoverCapability)
  desktopMediaQuery = undefined
  hoverMediaQuery = undefined
}

export function useSidebarViewport() {
  onMounted(startListening)
  onBeforeUnmount(stopListening)

  return {
    isDesktop: readonlyIsDesktop,
    canHover: readonlyCanHover,
  }
}
