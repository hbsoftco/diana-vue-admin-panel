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
import FingerprintIcon from '~icons/material-symbols/fingerprint'
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
import AdjustmentsHorizontalIcon from '~icons/tabler/adjustments-horizontal'
import ArrowsHorizontalIcon from '~icons/tabler/arrows-horizontal'
import CheckboxIcon from '~icons/tabler/checkbox'
import ColorPickerIcon from '~icons/tabler/color-picker'
import CursorTextIcon from '~icons/tabler/cursor-text'
import EyeIcon from '~icons/tabler/eye'
import EyeOffIcon from '~icons/tabler/eye-off'
import FileUploadIcon from '~icons/tabler/file-upload'
import FormsIcon from '~icons/tabler/forms'
import LayoutAlignMiddleIcon from '~icons/tabler/layout-align-middle'
import LayoutColumnsIcon from '~icons/tabler/layout-columns'
import LockQuestionIcon from '~icons/tabler/lock-question'
import LoginIcon from '~icons/tabler/login'
import MoonIcon from '~icons/tabler/moon'
import PasswordIcon from '~icons/tabler/password'
import SelectIcon from '~icons/tabler/select'
import ShieldCheckIcon from '~icons/tabler/shield-check'
import SunIcon from '~icons/tabler/sun'
import UserPlusIcon from '~icons/tabler/user-plus'
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
  fingerprint: FingerprintIcon,
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
  // Form control icons (DiInput prefix/suffix, password visibility toggle)
  eye: EyeIcon,
  eyeOff: EyeOffIcon,
  // Sidebar submenu icons
  forms: FormsIcon,
  signIn: LoginIcon,
  signUp: UserPlusIcon,
  resetPassword: LockQuestionIcon,
  twoStepVerification: ShieldCheckIcon,
  layoutCentered: LayoutAlignMiddleIcon,
  layoutSplit: LayoutColumnsIcon,
  cursorText: CursorTextIcon,
  checkbox: CheckboxIcon,
  adjustmentsHorizontal: AdjustmentsHorizontalIcon,
  arrowsHorizontal: ArrowsHorizontalIcon,
  selectDropdown: SelectIcon,
  fileUpload: FileUploadIcon,
  colorPicker: ColorPickerIcon,
  otpInput: PasswordIcon,
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
  // Tabler (form field affixes)
  mail: () => import('~icons/tabler/mail'),
  lock: () => import('~icons/tabler/lock'),
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
