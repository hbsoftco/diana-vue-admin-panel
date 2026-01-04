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
  settingsOutlineRounded: () => import('~icons/material-symbols/settings-outline-rounded'),
  userOutlineRounded: () => import('~icons/material-symbols/person-outline-rounded'),
  folderOutlineRounded: () => import('~icons/material-symbols/folder-outline-rounded'),
  dashboardOutlineRounded: () => import('~icons/material-symbols/dashboard-outline-rounded'),
  lightCheck: () => import('~icons/material-symbols/check'),
  copy: () => import('~icons/material-symbols/content-copy'),
  // Heroicons Icons
  heart: () => import('~icons/heroicons/heart'),
  star: () => import('~icons/heroicons/star'),
  camera: () => import('~icons/heroicons/camera'),
  calendarDays: () => import('~icons/heroicons/calendar-days-16-solid'),
  user: () => import('~icons/heroicons/user'),
  chevronDoubleRight: () => import('~icons/heroicons/chevron-double-right-20-solid'),
  chevronRightHero: () => import('~icons/heroicons/chevron-right-20-solid'),
  home: () => import('~icons/heroicons/home'),
  slash: () => import('~icons/heroicons/slash'),
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
  // Line-md Icons
  chevronRightAnimate: () => import('~icons/line-md/chevron-right'),
  // ph Icons
  tilde: () => import('~icons/ph/tilde'),
  // Solar Icons
  arrowRightOutline: () => import('~icons/solar/arrow-right-outline'),
  heartBold: () => import('~icons/solar/heart-bold'), //
} as const

export type IconName = keyof typeof iconRegistry
