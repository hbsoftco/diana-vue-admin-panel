import { ref, watch } from 'vue'

import { useSidebarViewport } from '@/shared/composables/use-sidebar-viewport'

const isDesktopSidebarCollapsed = ref(false)
const isMobileSidebarOpen = ref(false)

export function useSidebar() {
  const { isDesktop, canHover } = useSidebarViewport()

  const toggleDesktopSidebar = () => {
    isDesktopSidebarCollapsed.value = !isDesktopSidebarCollapsed.value
  }

  const collapseDesktopSidebar = () => {
    isDesktopSidebarCollapsed.value = true
  }

  const expandDesktopSidebar = () => {
    isDesktopSidebarCollapsed.value = false
  }

  const toggleMobileSidebar = () => {
    isMobileSidebarOpen.value = !isMobileSidebarOpen.value
  }

  const openMobileSidebar = () => {
    isMobileSidebarOpen.value = true
  }

  const closeMobileSidebar = () => {
    isMobileSidebarOpen.value = false
  }

  const toggleSidebar = () => {
    if (isDesktop.value) {
      toggleDesktopSidebar()
      return
    }

    toggleMobileSidebar()
  }

  watch(isDesktop, (desktop, wasDesktop) => {
    if (desktop && !wasDesktop) {
      closeMobileSidebar()
    }
  })

  return {
    isDesktopSidebarCollapsed,
    isMobileSidebarOpen,
    isDesktop,
    canHover,
    toggleSidebar,
    toggleDesktopSidebar,
    collapseDesktopSidebar,
    expandDesktopSidebar,
    toggleMobileSidebar,
    openMobileSidebar,
    closeMobileSidebar,
  }
}
