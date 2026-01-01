export const iconRegistry = {
  // Tabler Icons
  moon: () => import('~icons/tabler/moon'),
  sun: () => import('~icons/tabler/sun'),
  // Iconoir Icons
  bell: () => import('~icons/iconoir/bell-notification'),
  // Mdi Icons
  cog: () => import('~icons/mdi/cog'),
  image: () => import('~icons/mdi/image'),
  video: () => import('~icons/mdi/video'),
  magnify: () => import('~icons/mdi/magnify'),
  phone: () => import('~icons/mdi/phone'),
  chevronRight: () => import('~icons/mdi/chevron-right'),
  // Material Symbols
  logout: () => import('~icons/material-symbols/logout'),
  fullscreenExit: () => import('~icons/material-symbols/fullscreen-exit'),
  fullscreen: () => import('~icons/material-symbols/fullscreen'),
  circle: () => import('~icons/material-symbols/circle'),
  circleOutline: () => import('~icons/material-symbols/circle-outline'),
  homeOutlineRounded: () => import('~icons/material-symbols/home-outline-rounded'),
  lightCheck: () => import('~icons/material-symbols/check'),
  copy: () => import('~icons/material-symbols/content-copy'),
  // Heroicons Icons
  heart: () => import('~icons/heroicons/heart'),
  star: () => import('~icons/heroicons/star'),
  camera: () => import('~icons/heroicons/camera'),
  calendarDays: () => import('~icons/heroicons/calendar-days-16-solid'),
  user: () => import('~icons/heroicons/user'),
  // Hugeicons Icons
  menu: () => import('~icons/hugeicons/menu-02'),
  arrowDown: () => import('~icons/hugeicons/arrow-down-01'),
  // Mingcute Icons
  close: () => import('~icons/mingcute/close-line'),
  // Feather Icons
  search: () => import('~icons/feather/search'),
  // Oui Icons
  tokenElement: () => import('~icons/oui/token-element'),
  // Prime Icons
  code: () => import('~icons/prime/code'),
  // Humbleicons Icons
  codeClose: () => import('~icons/humbleicons/code'),
} as const

export type IconName = keyof typeof iconRegistry
