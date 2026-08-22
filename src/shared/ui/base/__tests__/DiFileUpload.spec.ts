import { mount } from '@vue/test-utils'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

import type { DiFileUploadItem } from '../DiFileUpload.vue'

import DiFileUpload from '../DiFileUpload.vue'

function createFile(name: string, type: string, size: number): File {
  const file = new File([new Uint8Array(size)], name, { type })
  return file
}

beforeEach(() => {
  URL.createObjectURL = vi.fn(() => 'blob:mock-url')
  URL.revokeObjectURL = vi.fn()
})

afterEach(() => {
  vi.restoreAllMocks()
})

describe('diFileUpload', () => {
  it('renders an accessible dropzone with a hidden native input', () => {
    const wrapper = mount(DiFileUpload, { props: { accept: 'image/*' } })
    const dropzone = wrapper.get('[role="button"]')

    expect(dropzone.attributes('tabindex')).toBe('0')
    expect(dropzone.attributes('aria-label')).toBeTruthy()
    expect(wrapper.get('input[type="file"]').classes()).toContain('sr-only')
  })

  it('opens the file picker on click and on Enter/Space', async () => {
    const wrapper = mount(DiFileUpload)
    const clickSpy = vi.spyOn(HTMLInputElement.prototype, 'click')
    const dropzone = wrapper.get('[role="button"]')

    await dropzone.trigger('click')
    await dropzone.trigger('keydown', { key: 'Enter' })
    await dropzone.trigger('keydown', { key: ' ' })

    expect(clickSpy).toHaveBeenCalledTimes(3)
  })

  it('does not open the picker or accept drops while disabled', async () => {
    const wrapper = mount(DiFileUpload, { props: { disabled: true } })
    const clickSpy = vi.spyOn(HTMLInputElement.prototype, 'click')
    const dropzone = wrapper.get('[role="button"]')

    expect(dropzone.attributes('tabindex')).toBe('-1')
    expect(dropzone.attributes('aria-disabled')).toBe('true')

    await dropzone.trigger('click')
    expect(clickSpy).not.toHaveBeenCalled()
  })

  it('adds a selected file, updates the model, and emits file-added', async () => {
    const wrapper = mount(DiFileUpload, { props: { modelValue: [] } })
    const input = wrapper.get<HTMLInputElement>('input[type="file"]')
    const file = createFile('report.pdf', 'application/pdf', 1024)

    Object.defineProperty(input.element, 'files', { value: [file], configurable: true })
    await input.trigger('change')

    const emitted = wrapper.emitted('update:modelValue')
    expect(emitted).toBeTruthy()
    const items = emitted![0]![0] as DiFileUploadItem[]
    expect(items).toHaveLength(1)
    expect(items[0]!.file.name).toBe('report.pdf')
    expect(items[0]!.status).toBe('idle')

    const added = wrapper.emitted('fileAdded')
    expect((added![0]![0] as DiFileUploadItem).file.name).toBe('report.pdf')
  })

  it('creates an object URL preview for image files only', async () => {
    const wrapper = mount(DiFileUpload, { props: { multiple: true, modelValue: [] } })
    const input = wrapper.get<HTMLInputElement>('input[type="file"]')
    const image = createFile('cover.png', 'image/png', 2048)
    const doc = createFile('notes.txt', 'text/plain', 512)

    Object.defineProperty(input.element, 'files', { value: [image, doc], configurable: true })
    await input.trigger('change')

    const items = wrapper.emitted('update:modelValue')![0]![0] as DiFileUploadItem[]
    expect(items[0]!.previewUrl).toBe('blob:mock-url')
    expect(items[1]!.previewUrl).toBeUndefined()
  })

  it('rejects files larger than maxSizeBytes without adding them', async () => {
    const wrapper = mount(DiFileUpload, { props: { maxSizeBytes: 1024, modelValue: [] } })
    const input = wrapper.get<HTMLInputElement>('input[type="file"]')
    const file = createFile('huge.zip', 'application/zip', 4096)

    Object.defineProperty(input.element, 'files', { value: [file], configurable: true })
    await input.trigger('change')

    expect(wrapper.emitted('update:modelValue')).toBeUndefined()
    expect(wrapper.emitted('reject')?.[0]).toEqual(['size', file])
  })

  it('rejects files that do not match the accept filter', async () => {
    const wrapper = mount(DiFileUpload, { props: { accept: 'image/*', modelValue: [] } })
    const input = wrapper.get<HTMLInputElement>('input[type="file"]')
    const file = createFile('notes.txt', 'text/plain', 100)

    Object.defineProperty(input.element, 'files', { value: [file], configurable: true })
    await input.trigger('change')

    expect(wrapper.emitted('update:modelValue')).toBeUndefined()
    expect(wrapper.emitted('reject')?.[0]).toEqual(['type', file])
  })

  it('replaces the current file in single-file mode', async () => {
    const first = createFile('first.pdf', 'application/pdf', 100)
    const wrapper = mount(DiFileUpload, {
      props: {
        multiple: false,
        modelValue: [
          { id: 'existing', file: first, status: 'idle', progress: 0 } satisfies DiFileUploadItem,
        ],
      },
    })
    const input = wrapper.get<HTMLInputElement>('input[type="file"]')
    const second = createFile('second.pdf', 'application/pdf', 100)

    Object.defineProperty(input.element, 'files', { value: [second], configurable: true })
    await input.trigger('change')

    const emissions = wrapper.emitted('update:modelValue')!
    const items = emissions[emissions.length - 1]![0] as DiFileUploadItem[]
    expect(items).toHaveLength(1)
    expect(items[0]!.file.name).toBe('second.pdf')
    expect(wrapper.emitted('fileRemoved')).toBeTruthy()
  })

  it('handles drag-and-drop and toggles the active state', async () => {
    const wrapper = mount(DiFileUpload, { props: { multiple: true, modelValue: [] } })
    const dropzone = wrapper.get('[role="button"]')
    const file = createFile('dropped.pdf', 'application/pdf', 100)
    const dataTransfer = { types: ['Files'], files: [file] } as unknown as DataTransfer

    await dropzone.trigger('dragenter', { dataTransfer })
    await dropzone.trigger('drop', { dataTransfer })

    const items = wrapper.emitted('update:modelValue')![0]![0] as DiFileUploadItem[]
    expect(items[0]!.file.name).toBe('dropped.pdf')
  })

  it('removes a file and revokes its object URL', async () => {
    const file = createFile('cover.png', 'image/png', 100)
    const wrapper = mount(DiFileUpload, {
      props: {
        modelValue: [
          { id: 'item-1', file, previewUrl: 'blob:mock-url', status: 'success', progress: 100 } satisfies DiFileUploadItem,
        ],
      },
    })

    const removeButton = wrapper.get(`[aria-label="Remove ${file.name}"]`)
    await removeButton.trigger('click')

    expect(URL.revokeObjectURL).toHaveBeenCalledWith('blob:mock-url')
    expect(wrapper.emitted('fileRemoved')).toBeTruthy()
    expect(wrapper.emitted('update:modelValue')![0]![0]).toEqual([])
  })

  it('runs the provided upload handler and reports progress to completion', async () => {
    const uploadHandler = vi.fn((_file: File, onProgress: (percent: number) => void) => {
      onProgress(50)
      onProgress(100)
      return Promise.resolve()
    })
    const wrapper = mount(DiFileUpload, { props: { uploadHandler, modelValue: [] } })
    const input = wrapper.get<HTMLInputElement>('input[type="file"]')
    const file = createFile('report.pdf', 'application/pdf', 100)

    Object.defineProperty(input.element, 'files', { value: [file], configurable: true })
    await input.trigger('change')
    await vi.waitFor(() => {
      expect(wrapper.emitted('uploadComplete')).toBeTruthy()
    })

    expect(uploadHandler).toHaveBeenCalledTimes(1)
    const completed = wrapper.emitted('uploadComplete')![0]![0] as DiFileUploadItem
    expect(completed.status).toBe('success')
    expect(completed.progress).toBe(100)
  })

  it('reports upload-error when the handler rejects', async () => {
    const uploadHandler = vi.fn(() => Promise.reject(new Error('network down')))
    const wrapper = mount(DiFileUpload, { props: { uploadHandler, modelValue: [] } })
    const input = wrapper.get<HTMLInputElement>('input[type="file"]')
    const file = createFile('report.pdf', 'application/pdf', 100)

    Object.defineProperty(input.element, 'files', { value: [file], configurable: true })
    await input.trigger('change')
    await vi.waitFor(() => {
      expect(wrapper.emitted('uploadError')).toBeTruthy()
    })

    const [item, error] = wrapper.emitted('uploadError')![0] as [DiFileUploadItem, unknown]
    expect(item.status).toBe('error')
    expect(item.errorMessage).toBe('network down')
    expect(error).toBeInstanceOf(Error)
  })
})
