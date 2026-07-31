export type SliderBounds = {
  min: number
  max: number
  step: number
}

export function clampSliderValue(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value))
}

export function snapSliderValue(value: number, bounds: SliderBounds) {
  if (bounds.step <= 0)
    return clampSliderValue(value, bounds.min, bounds.max)

  const decimals = String(bounds.step).split('.')[1]?.length ?? 0
  const snapped = bounds.min + Math.round((value - bounds.min) / bounds.step) * bounds.step
  return Number(clampSliderValue(snapped, bounds.min, bounds.max).toFixed(decimals))
}

export function sliderValueToPercent(value: number, min: number, max: number) {
  if (max <= min)
    return 0

  return clampSliderValue(((value - min) / (max - min)) * 100, 0, 100)
}

export function sliderPercentToValue(percent: number, bounds: SliderBounds) {
  return snapSliderValue(bounds.min + (bounds.max - bounds.min) * (percent / 100), bounds)
}
