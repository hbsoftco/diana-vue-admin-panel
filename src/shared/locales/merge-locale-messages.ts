type LocaleMessage = string | { [key: string]: LocaleMessage }
type LocaleMessages = Record<string, LocaleMessage>

export function mergeLocaleMessages(...modules: LocaleMessages[]): LocaleMessages {
  return Object.assign({}, ...modules)
}
