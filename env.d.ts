/// <reference types="vite/client" />
/// <reference types="unplugin-icons/types/vue" />

type ImportMetaEnv = {
  readonly VITE_GOOGLE_MAPS_API_KEY?: string
}

type ImportMeta = {
  readonly env: ImportMetaEnv
}
