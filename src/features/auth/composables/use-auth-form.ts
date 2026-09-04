import { computed, reactive, ref } from 'vue'
import { useI18n } from 'vue-i18n'

import { mockAuthSubmit } from '../lib/mock-submit'

/**
 * Shared scaffolding for the auth forms (Sign In, Sign Up, Reset Password).
 *
 * Each form declares a flat field map and, per field, a validator built from the
 * helpers below. The composable owns:
 * - the single email regex,
 * - the "only surface errors after a submit attempt" gate,
 * - the localized error strings (`errors`),
 * - the fake async round-trip and the post-submit `submitting` / `succeeded`
 *   state that every form now shares.
 */
export const EMAIL_PATTERN = /^[^\s@]+@[^\s@][^\s.@]*\.[^\s@]+$/

export type AuthFieldValue = string | boolean
export type AuthFields = Record<string, AuthFieldValue>

/** Returns an i18n key when invalid, or an empty string when the value passes. */
export type AuthValidator = (value: AuthFieldValue, fields: AuthFields) => string

function asText(value: AuthFieldValue): string {
  return typeof value === 'string' ? value : ''
}

export function requiredKey(key: string, options: { trim?: boolean } = {}): AuthValidator {
  const trim = options.trim ?? true
  return (value) => {
    const text = asText(value)
    return (trim ? text.trim() : text) ? '' : key
  }
}

export function checkedKey(key: string): AuthValidator {
  return value => (value === true ? '' : key)
}

export function emailKey(requiredMessageKey: string, invalidMessageKey: string): AuthValidator {
  return (value) => {
    const text = asText(value).trim()
    if (!text)
      return requiredMessageKey
    if (!EMAIL_PATTERN.test(text))
      return invalidMessageKey
    return ''
  }
}

export function minLenKey(
  length: number,
  requiredMessageKey: string,
  tooShortMessageKey: string,
): AuthValidator {
  return (value) => {
    const text = asText(value)
    if (!text)
      return requiredMessageKey
    if (text.length < length)
      return tooShortMessageKey
    return ''
  }
}

export function matchKey(
  otherField: string,
  requiredMessageKey: string,
  mismatchMessageKey: string,
): AuthValidator {
  return (value, fields) => {
    const text = asText(value)
    if (!text)
      return requiredMessageKey
    if (text !== fields[otherField])
      return mismatchMessageKey
    return ''
  }
}

type UseAuthFormOptions<TFields extends AuthFields> = {
  /** Short label used by the shared mock submit logger, e.g. `SignIn`. */
  tag: string
  /** Initial field values; also defines the payload shape. */
  fields: TFields
  /** Validator per field; fields without one are always considered valid. */
  validators?: Partial<Record<keyof TFields, AuthValidator>>
  /** String fields trimmed when the payload is built (e.g. `email`). */
  trimFields?: (keyof TFields)[]
  /** Fields kept for validation but left out of the built payload (e.g. `confirmPassword`). */
  omitFields?: (keyof TFields)[]
  /** Called with the final payload once the fake round-trip resolves. */
  onSubmit?: (payload: TFields) => void
}

export function useAuthForm<TFields extends AuthFields>(options: UseAuthFormOptions<TFields>) {
  const { t } = useI18n()

  const fields = reactive({ ...options.fields }) as TFields
  const validators = (options.validators ?? {}) as Partial<Record<keyof TFields, AuthValidator>>
  const validatedNames = Object.keys(validators) as (keyof TFields)[]

  const submitted = ref(false)
  const submitting = ref(false)
  const succeeded = ref(false)

  function errorKeyFor(name: keyof TFields): string {
    const validate = validators[name]
    if (!validate)
      return ''
    const value = (fields as AuthFields)[name as string] ?? ''
    return validate(value, fields as AuthFields)
  }

  const isValid = computed(() => validatedNames.every(name => errorKeyFor(name) === ''))

  /** Localized, submit-gated error message per validated field. */
  const errors = computed(() => {
    const result = {} as Record<keyof TFields, string>
    for (const name of validatedNames) {
      const key = submitted.value ? errorKeyFor(name) : ''
      result[name] = key ? t(key) : ''
    }
    return result
  })

  function buildPayload(): TFields {
    const payload = { ...(fields as AuthFields) }
    for (const name of options.trimFields ?? []) {
      const value = payload[name as string]
      if (typeof value === 'string')
        payload[name as string] = value.trim()
    }
    for (const name of options.omitFields ?? [])
      delete payload[name as string]
    return payload as TFields
  }

  async function handleSubmit() {
    submitted.value = true

    if (!isValid.value || submitting.value)
      return

    submitting.value = true
    const payload = buildPayload()

    await mockAuthSubmit(options.tag, payload)

    submitting.value = false
    succeeded.value = true
    options.onSubmit?.(payload)
  }

  return {
    fields,
    errors,
    submitted,
    submitting,
    succeeded,
    isValid,
    handleSubmit,
  }
}
