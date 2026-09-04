import type { DiInputSize } from '../input/types'

/** Reuses DiInput's size scale so OTP boxes match other inputs in the same form. */
export type DiOtpInputSize = DiInputSize

export type DiOtpInputType = 'numeric' | 'alphanumeric'
