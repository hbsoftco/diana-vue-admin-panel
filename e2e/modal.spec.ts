import { expect, test } from '@playwright/test'

const themes = ['diana-light', 'diana-dark'] as const
const directions = ['ltr', 'rtl'] as const

type Bounds = { x: number, y: number, width: number, height: number }
type Viewport = { width: number, height: number }

function assertTop(bounds: Bounds, viewport: Viewport) {
  expect(bounds.x + bounds.width / 2).toBeCloseTo(viewport.width / 2, -1)
  expect(bounds.y).toBeLessThan(viewport.height * 0.2)
}

function assertMiddle(bounds: Bounds, viewport: Viewport) {
  expect(bounds.x + bounds.width / 2).toBeCloseTo(viewport.width / 2, -1)
  expect(bounds.y + bounds.height / 2).toBeCloseTo(viewport.height / 2, -1)
}

function assertBottom(bounds: Bounds, viewport: Viewport) {
  expect(bounds.x + bounds.width / 2).toBeCloseTo(viewport.width / 2, -1)
  expect(bounds.y + bounds.height).toBeGreaterThan(viewport.height * 0.8)
}

function assertLeft(bounds: Bounds, viewport: Viewport) {
  expect(bounds.x).toBeLessThan(viewport.width * 0.2)
}

function assertRight(bounds: Bounds, viewport: Viewport) {
  expect(bounds.x + bounds.width).toBeGreaterThan(viewport.width * 0.8)
}

const placementAssertions = {
  ltr: {
    top: assertTop,
    middle: assertMiddle,
    bottom: assertBottom,
    start: assertLeft,
    end: assertRight,
  },
  rtl: {
    top: assertTop,
    middle: assertMiddle,
    bottom: assertBottom,
    start: assertRight,
    end: assertLeft,
  },
} as const

const expectedAlignment = {
  top: { alignItems: 'flex-start', justifyItems: 'center' },
  middle: { alignItems: 'center', justifyItems: 'center' },
  bottom: { alignItems: 'flex-end', justifyItems: 'center' },
  start: { alignItems: 'center', justifyItems: 'start' },
  end: { alignItems: 'center', justifyItems: 'end' },
} as const

test.beforeEach(async ({ page }) => {
  await page.goto('/advanced-ui/modals')
})

for (const theme of themes) {
  test(`opens without backdrop blur and closes normally in ${theme}`, async ({ page }) => {
    await page.locator('html').evaluate((element, selectedTheme) => {
      element.dataset.theme = selectedTheme
    }, theme)

    const trigger = page.getByRole('button', { name: 'Open modal' })
    const dialog = page.locator('dialog[aria-labelledby="basic-modal-title"]')

    await trigger.click()
    await expect(dialog).toHaveAttribute('open', '')
    await expect(dialog).toHaveClass(/modal-middle/)
    await expect.poll(() => dialog.evaluate(element => element.matches(':modal'))).toBe(true)

    const appearance = await dialog.evaluate((element) => {
      const dialogStyle = getComputedStyle(element)
      const backdropStyle = getComputedStyle(element, '::backdrop')

      return {
        backdropFilter: dialogStyle.backdropFilter,
        nativeBackdropFilter: backdropStyle.backdropFilter,
        backgroundColor: dialogStyle.backgroundColor,
      }
    })

    expect(appearance.backdropFilter).toBe('none')
    expect(appearance.nativeBackdropFilter).toBe('none')
    expect(appearance.backgroundColor).not.toBe('rgba(0, 0, 0, 0)')

    const viewport = page.viewportSize()
    expect(viewport).not.toBeNull()
    await expect
      .poll(async () => {
        const bounds = await dialog.locator('.modal-box').boundingBox()

        return bounds
          ? {
              x: Math.round(bounds.x + bounds.width / 2),
              y: Math.round(bounds.y + bounds.height / 2),
            }
          : null
      })
      .toEqual({ x: Math.round(viewport!.width / 2), y: Math.round(viewport!.height / 2) })

    await dialog.locator('.modal-box').evaluate(async (element) => {
      await Promise.all(element.getAnimations().map(animation => animation.finished))
    })

    await dialog.getByRole('button', { name: 'Close' }).click()
    await expect(dialog).not.toHaveAttribute('open', '')

    await trigger.click()
    await dialog.click({ position: { x: 5, y: 5 } })
    await expect(dialog).not.toHaveAttribute('open', '')

    await trigger.click()
    await page.keyboard.press('Escape')
    await expect(dialog).not.toHaveAttribute('open', '')
  })

  for (const direction of directions) {
    test(`anchors and blurs every position in ${theme} ${direction}`, async ({ page }) => {
      await page.locator('html').evaluate(
        (element, settings) => {
          element.dataset.theme = settings.theme
          element.dir = settings.direction
        },
        { theme, direction },
      )

      const viewport = page.viewportSize()
      expect(viewport).not.toBeNull()

      for (const placement of ['top', 'middle', 'bottom', 'start', 'end'] as const) {
        const label = placement[0]!.toUpperCase() + placement.slice(1)
        const dialog = page.locator(`dialog[aria-labelledby="position-modal-${placement}"]`)

        await page.getByRole('button', { name: label, exact: true }).click()
        await expect(dialog).toHaveAttribute('open', '')
        await expect(dialog).toHaveClass(new RegExp(`modal-${placement}`))
        await expect(dialog).toHaveClass(/backdrop:backdrop-blur-sm/)
        await dialog.locator('.modal-box').evaluate(async (element) => {
          await Promise.all(element.getAnimations().map(animation => animation.finished))
        })

        const computedStyle = await dialog.evaluate((element) => {
          const dialogStyle = getComputedStyle(element)
          const backdropStyle = getComputedStyle(element, '::backdrop')

          return {
            alignItems: dialogStyle.alignItems,
            justifyItems: dialogStyle.justifyItems,
            backdropFilter: backdropStyle.backdropFilter,
          }
        })
        expect(computedStyle).toEqual({
          ...expectedAlignment[placement],
          backdropFilter: 'blur(8px)',
        })

        const bounds = await dialog.locator('.modal-box').boundingBox()
        expect(bounds).not.toBeNull()
        placementAssertions[direction][placement](bounds!, viewport!)

        await dialog.getByRole('button', { name: 'Close' }).click()
        await expect(dialog).not.toHaveAttribute('open', '')
        await expect(dialog).toBeHidden()
      }
    })
  }
}
