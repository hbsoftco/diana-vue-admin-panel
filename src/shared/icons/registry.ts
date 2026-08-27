import PartyIcon from '~icons/bx/party'
import SearchIcon from '~icons/feather/search'
import FormIcon from '~icons/fluent/form-48-regular'
import CheckCircleIcon from '~icons/heroicons/check-circle'
import ChevronDoubleRightIcon from '~icons/heroicons/chevron-double-right-20-solid'
import CloudArrowUpIcon from '~icons/heroicons/cloud-arrow-up'
import DocumentIcon from '~icons/heroicons/document'
import ExclamationTriangleIcon from '~icons/heroicons/exclamation-triangle'
import HeartIcon from '~icons/heroicons/heart'
import InformationCircleIcon from '~icons/heroicons/information-circle'
import PlusIcon from '~icons/heroicons/plus-20-solid'
import StarIcon from '~icons/heroicons/star'
import UserIcon from '~icons/heroicons/user'
import XCircleIcon from '~icons/heroicons/x-circle'
import XMarkIcon from '~icons/heroicons/x-mark-20-solid'
import ArrowDownIcon from '~icons/hugeicons/arrow-down-01'
import MenuIcon from '~icons/hugeicons/menu-02'
import BellIcon from '~icons/iconoir/bell-notification'
import CheckIcon from '~icons/material-symbols/check'
import CircleIcon from '~icons/material-symbols/circle'
import CircleOutlineIcon from '~icons/material-symbols/circle-outline'
import FullscreenIcon from '~icons/material-symbols/fullscreen'
import FullscreenExitIcon from '~icons/material-symbols/fullscreen-exit'
import HomeOutlineRoundedIcon from '~icons/material-symbols/home-outline-rounded'
import LogoutIcon from '~icons/material-symbols/logout'
import MapOutlineIcon from '~icons/material-symbols/map-outline'
import UserOutlineRoundedIcon from '~icons/material-symbols/person-outline-rounded'
import ChevronDownIcon from '~icons/mdi/chevron-down'
import ChevronLeftIcon from '~icons/mdi/chevron-left'
import ChevronRightIcon from '~icons/mdi/chevron-right'
import CloseIcon from '~icons/mingcute/close-line'
import MedalLineIcon from '~icons/ri/medal-line'
import HeartBoldIcon from '~icons/solar/heart-bold'
import MoonIcon from '~icons/tabler/moon'
import SunIcon from '~icons/tabler/sun'
import ComponentDropdownIcon from '~icons/tdesign/component-dropdown'

// Core icons render synchronously because the application shell, navigation, or reusable
// components use them during common interactions.
export const coreIconRegistry = {
  moon: MoonIcon,
  sun: SunIcon,
  bell: BellIcon,
  chevronLeft: ChevronLeftIcon,
  chevronRight: ChevronRightIcon,
  chevronDown: ChevronDownIcon,
  logout: LogoutIcon,
  mapOutline: MapOutlineIcon,
  fullscreenExit: FullscreenExitIcon,
  fullscreen: FullscreenIcon,
  circle: CircleIcon,
  circleOutline: CircleOutlineIcon,
  homeOutlineRounded: HomeOutlineRoundedIcon,
  userOutlineRounded: UserOutlineRoundedIcon,
  lightCheck: CheckIcon,
  heart: HeartIcon,
  star: StarIcon,
  user: UserIcon,
  chevronDoubleRight: ChevronDoubleRightIcon,
  plus: PlusIcon,
  xMark: XMarkIcon,
  informationCircle: InformationCircleIcon,
  checkCircle: CheckCircleIcon,
  exclamationTriangle: ExclamationTriangleIcon,
  xCircle: XCircleIcon,
  menu: MenuIcon,
  arrowDown: ArrowDownIcon,
  close: CloseIcon,
  search: SearchIcon,
  heartBold: HeartBoldIcon,
  party: PartyIcon,
  componentDropdown: ComponentDropdownIcon,
  medalLine: MedalLineIcon,
  form48regular: FormIcon,
  uploadCloud: CloudArrowUpIcon,
  fileDocument: DocumentIcon,
} as const

// Lazy icons are limited to feature-specific screens, showcases, and playground examples.
export const lazyIconRegistry = {
  // Mdi Icons
  cog: () => import('~icons/mdi/cog'),
  image: () => import('~icons/mdi/image'),
  video: () => import('~icons/mdi/video'),
  magnify: () => import('~icons/mdi/magnify'),
  phone: () => import('~icons/mdi/phone'),
  chevronUp: () => import('~icons/mdi/chevron-up'),
  // Material Symbols
  settingsOutlineRounded: () => import('~icons/material-symbols/settings-outline-rounded'),
  folderOutlineRounded: () => import('~icons/material-symbols/folder-outline-rounded'),
  dashboardOutlineRounded: () => import('~icons/material-symbols/dashboard-outline-rounded'),
  copy: () => import('~icons/material-symbols/content-copy'),
  inbox: () => import('~icons/material-symbols/inbox'),
  dragHandle: () => import('~icons/material-symbols/drag-indicator'),
  // Heroicons Icons
  camera: () => import('~icons/heroicons/camera'),
  calendarDays: () => import('~icons/heroicons/calendar-days-16-solid'),
  chevronRightHero: () => import('~icons/heroicons/chevron-right-20-solid'),
  home: () => import('~icons/heroicons/home'),
  slash: () => import('~icons/heroicons/slash'),
  questionMarkCircle: () => import('~icons/heroicons/question-mark-circle'),
  cogHero: () => import('~icons/heroicons/cog-20-solid'),
  paperClip: () => import('~icons/heroicons/paper-clip'),
  trash: () => import('~icons/heroicons/trash'),
  // Mingcute Icons
  pauseLine: () => import('~icons/mingcute/pause-line'),
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
} as const

export const iconRegistry = {
  ...coreIconRegistry,
  ...lazyIconRegistry,
} as const

export type IconName = keyof typeof iconRegistry
export type CoreIconName = keyof typeof coreIconRegistry
export type LazyIconName = keyof typeof lazyIconRegistry
