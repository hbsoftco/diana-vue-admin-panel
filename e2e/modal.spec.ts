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
    await expect(dialog).toHaveClass(/bg-base-content\/40/)
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

  test(`renders the video-reference modal patterns in ${theme}`, async ({ page }) => {
    await page.locator('html').evaluate((element, selectedTheme) => {
      element.dataset.theme = selectedTheme
    }, theme)

    const persistentDialog = page.locator('dialog[aria-labelledby="persistent-modal-title"]')
    await page.getByRole('button', { name: 'Open persistent modal' }).click()
    await expect(persistentDialog).toHaveAttribute('open', '')
    await page.keyboard.press('Escape')
    await expect(persistentDialog).toHaveAttribute('open', '')
    await persistentDialog.click({ position: { x: 5, y: 5 } })
    await expect(persistentDialog).toHaveAttribute('open', '')
    await persistentDialog.getByRole('button', { name: 'Close' }).click()

    const scrollableDialog = page.locator('dialog[aria-labelledby="scrollable-modal-title"]')
    await page.getByRole('button', { name: 'Open scrollable modal' }).click()
    await expect(scrollableDialog).toHaveAttribute('open', '')
    await expect
      .poll(() =>
        scrollableDialog.locator('.modal-box').evaluate(element =>
          element.scrollHeight > element.clientHeight))
      .toBe(true)
    await scrollableDialog.getByRole('button', { name: 'Close' }).click()

    const headerlessDialog = page.getByRole('dialog', { name: 'Headerless information modal' })
    await page.getByRole('button', { name: 'Open headerless modal' }).click()
    await expect(headerlessDialog).toHaveAttribute('open', '')
    await expect(headerlessDialog.getByRole('heading')).toHaveCount(0)
    await headerlessDialog.getByRole('button', { name: 'Understood' }).click()

    const fullscreenDialog = page.locator('dialog[aria-labelledby="fullscreen-modal-title"]')
    await page.getByRole('button', { name: 'Open fullscreen modal' }).click()
    await expect(fullscreenDialog).toHaveAttribute('open', '')
    await fullscreenDialog.locator('.modal-box').evaluate(async (element) => {
      await Promise.all(element.getAnimations().map(animation => animation.finished))
    })
    const fullscreenBounds = await fullscreenDialog.locator('.modal-box').boundingBox()
    const fullscreenViewport = page.viewportSize()
    expect(fullscreenBounds).not.toBeNull()
    expect(fullscreenViewport).not.toBeNull()
    expect(fullscreenBounds!.width).toBeCloseTo(fullscreenViewport!.width, 0)
    expect(fullscreenBounds!.height).toBeCloseTo(fullscreenViewport!.height, 0)
    const fullscreenActions = await fullscreenDialog.locator('.modal-action').boundingBox()
    expect(fullscreenActions).not.toBeNull()
    expect(fullscreenActions!.y).toBeGreaterThan(fullscreenViewport!.height * 0.8)
    await fullscreenDialog.getByRole('button', { name: 'Close' }).click()

    const blurredDialog = page.locator('dialog[aria-labelledby="blurred-modal-title"]')
    await page.getByRole('button', { name: 'Open blurred modal' }).click()
    await expect(blurredDialog).toHaveAttribute('open', '')
    await expect(blurredDialog).toHaveClass(/backdrop:backdrop-blur-md/)
    await expect
      .poll(() => blurredDialog.evaluate(element =>
        getComputedStyle(element, '::backdrop').backdropFilter))
      .toBe('blur(12px)')
    await blurredDialog.getByRole('button', { name: 'Close' }).click()

    const ratingDialog = page.locator('dialog[aria-labelledby="rating-modal-title"]')
    await page.getByRole('button', { name: 'Edit rating' }).click()
    await expect(ratingDialog).toHaveAttribute('open', '')
    await ratingDialog.locator('input[name="modal-rating"]').nth(4).check()
    await expect(ratingDialog.locator('input[name="modal-rating"]').nth(4)).toBeChecked()
    await ratingDialog.getByRole('button', { name: 'Close' }).click()

    const parentDialog = page.locator('dialog[aria-labelledby="parent-modal-title"]')
    const childDialog = page.locator('dialog[aria-labelledby="child-modal-title"]')
    await page.getByRole('button', { name: 'Open parent modal' }).click()
    await parentDialog.getByRole('button', { name: 'Open nested modal' }).click()
    await expect(parentDialog).toHaveAttribute('open', '')
    await expect(childDialog).toHaveAttribute('open', '')
    await childDialog.getByRole('button', { name: 'Close' }).click()
    await expect(parentDialog).toHaveAttribute('open', '')
    await parentDialog.getByRole('button', { name: 'Close' }).click()

    const messageDialog = page.locator('dialog[aria-labelledby="message-modal-title"]')
    await page.getByRole('button', { name: '@mdo' }).click()
    await expect(messageDialog).toHaveAttribute('open', '')
    await expect(messageDialog.getByLabel('Recipient')).toHaveValue('@mdo')
    await expect(messageDialog.locator('.modal-box')).toHaveClass(/max-w-sm/)
    await messageDialog.getByLabel('Message').fill('Hello from Diana')
    await messageDialog.getByRole('button', { name: 'Send message' }).click()
    await expect(messageDialog).not.toHaveAttribute('open', '')
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
        await expect(dialog).toHaveClass(/bg-base-content\/40/)
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
