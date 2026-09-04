import type { DiOtpInputSize } from './types'

/**
 * Per-box class map for DiOtpInput.
 *
 * Mirrors DiInput's `control`/`content` tokens (`input-{size}` + font size) so
 * OTP boxes stay visually consistent with regular text inputs at every size,
 * plus a fixed width that keeps each single-character box roughly square.
 */
export const OTP_BOX_SIZE_CLASSES: Record<DiOtpInputSize, string> = {
  sm: 'input-sm text-xs w-9',
  md: 'input-md text-sm w-11',
  lg: 'input-lg text-base w-14',
}

/** Horizontal gap between boxes, scaled with size like DiInput's affix gap. */
export const OTP_GROUP_GAP_CLASSES: Record<DiOtpInputSize, string> = {
  sm: 'gap-2',
  md: 'gap-2.5',
  lg: 'gap-3',
}
