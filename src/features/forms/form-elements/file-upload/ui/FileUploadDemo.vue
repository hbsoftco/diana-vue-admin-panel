<script setup lang="ts">
import { ref } from 'vue'

import type { DiFileUploadItem } from '@/shared/ui/base/DiFileUpload.vue'

import DiFileUpload from '@/shared/ui/base/DiFileUpload.vue'
import PreviewCodeCard from '@/shared/ui/patterns/PreviewCodeCard.vue'

const sizes = ['sm', 'md', 'lg'] as const

function createMockFile(name: string, type: string, base64: string): File {
  const binary = atob(base64)
  const bytes = new Uint8Array(binary.length)
  for (let index = 0; index < binary.length; index += 1) bytes[index] = binary.charCodeAt(index)
  return new File([bytes], name, { type })
}

// 1x1 transparent PNG, embedded so the demo never depends on network assets.
const TRANSPARENT_PNG
  = 'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNk+A8AAQUBAScY42YAAAAASUVORK5CYII='

function simulateUpload(file: File, onProgress: (percent: number) => void): Promise<void> {
  return new Promise((resolve, reject) => {
    let progress = 0
    const timer = setInterval(() => {
      progress = Math.min(progress + 15 + Math.random() * 15, 100)
      onProgress(progress)

      if (progress >= 100) {
        clearInterval(timer)
        if (file.name.toLowerCase().includes('fail'))
          reject(new Error('The server rejected this upload.'))
        else resolve()
      }
    }, 300)
  })
}

/* Default: multi-file gallery */
const galleryFiles = ref<DiFileUploadItem[]>([])

/* Single file: profile photo */
const avatarFiles = ref<DiFileUploadItem[]>([])

/* Pre-populated file list states */
const mockImage = createMockFile('diana-cover.png', 'image/png', TRANSPARENT_PNG)
const mockUploadingDoc = createMockFile('release-notes.pdf', 'application/pdf', TRANSPARENT_PNG)
const mockErrorDoc = createMockFile('quarterly-report.csv', 'text/csv', TRANSPARENT_PNG)
const stateFiles = ref<DiFileUploadItem[]>([
  {
    id: 'demo-success',
    file: mockImage,
    previewUrl: URL.createObjectURL(mockImage),
    status: 'success',
    progress: 100,
  },
  {
    id: 'demo-uploading',
    file: mockUploadingDoc,
    status: 'uploading',
    progress: 62,
  },
  {
    id: 'demo-error',
    file: mockErrorDoc,
    status: 'error',
    progress: 0,
    errorMessage: 'Network error, please retry.',
  },
])

/* Interactive upload with a simulated handler */
const attachmentFiles = ref<DiFileUploadItem[]>([])

/* Sizes */
const sizeFiles = ref<Record<(typeof sizes)[number], DiFileUploadItem[]>>({
  sm: [],
  md: [],
  lg: [],
})

/* Invalid state */
const invalidFiles = ref<DiFileUploadItem[]>([])

const codes = {
  default:
    '<DiFileUpload\n  v-model="files"\n  multiple\n  accept="image/png,image/jpeg"\n  :max-size-bytes="5 * 1024 * 1024"\n  label="Product gallery"\n/>',
  single:
    '<DiFileUpload\n  v-model="files"\n  accept="image/*"\n  label="Profile photo"\n  helper-text="Square image recommended"\n/>',
  states:
    '<DiFileUpload v-model="files" multiple />\n<!-- files: one succeeded, one uploading, one errored -->',
  interactive:
    '<DiFileUpload\n  v-model="files"\n  multiple\n  :max-files="4"\n  :upload-handler="uploadToServer"\n  @upload-complete="onUploadComplete"\n  @upload-error="onUploadError"\n/>',
  sizes: '<DiFileUpload v-for="size in sizes" v-model="files[size]" :size="size" />',
  disabled: '<DiFileUpload v-model="files" disabled label="Attachments" />',
  invalid:
    '<DiFileUpload\n  v-model="files"\n  required\n  error="Please attach at least one file"\n  label="Attachments"\n/>',
} as const
</script>

<template>
  <div class="grid grid-cols-1 gap-6 xl:grid-cols-12">
    <PreviewCodeCard
      :title="$t('features.forms.fileUpload.sections.default')"
      class="xl:col-span-6"
      :code="codes.default"
      language="html"
    >
      <DiFileUpload
        v-model="galleryFiles"
        multiple
        accept="image/png,image/jpeg"
        :max-size-bytes="5 * 1024 * 1024"
        :label="$t('features.forms.fileUpload.labels.gallery')"
        :helper-text="$t('features.forms.fileUpload.labels.galleryHelper')"
      />
    </PreviewCodeCard>

    <PreviewCodeCard
      :title="$t('features.forms.fileUpload.sections.single')"
      class="xl:col-span-6"
      :code="codes.single"
      language="html"
    >
      <DiFileUpload
        v-model="avatarFiles"
        accept="image/*"
        :label="$t('features.forms.fileUpload.labels.avatar')"
        :helper-text="$t('features.forms.fileUpload.labels.avatarHelper')"
      />
    </PreviewCodeCard>

    <PreviewCodeCard
      :title="$t('features.forms.fileUpload.sections.states')"
      class="xl:col-span-6"
      :code="codes.states"
      language="html"
    >
      <DiFileUpload v-model="stateFiles" multiple />
    </PreviewCodeCard>

    <PreviewCodeCard
      :title="$t('features.forms.fileUpload.sections.interactive')"
      class="xl:col-span-6"
      :code="codes.interactive"
      language="html"
    >
      <DiFileUpload
        v-model="attachmentFiles"
        multiple
        :max-files="4"
        :upload-handler="simulateUpload"
        :label="$t('features.forms.fileUpload.labels.attachments')"
      />
    </PreviewCodeCard>

    <PreviewCodeCard
      :title="$t('features.forms.fileUpload.sections.sizes')"
      class="xl:col-span-8"
      :code="codes.sizes"
      language="html"
    >
      <div class="grid gap-4 sm:grid-cols-3">
        <DiFileUpload
          v-for="size in sizes"
          :key="size"
          v-model="sizeFiles[size]"
          :size="size"
          :aria-label="`${size.toUpperCase()} upload`"
        />
      </div>
    </PreviewCodeCard>

    <PreviewCodeCard
      :title="$t('features.forms.fileUpload.sections.disabled')"
      class="xl:col-span-4"
      :code="codes.disabled"
      language="html"
    >
      <DiFileUpload
        :model-value="[]"
        disabled
        :label="$t('features.forms.fileUpload.labels.attachments')"
      />
    </PreviewCodeCard>

    <PreviewCodeCard
      :title="$t('features.forms.fileUpload.sections.invalid')"
      class="xl:col-span-6"
      :code="codes.invalid"
      language="html"
    >
      <DiFileUpload
        v-model="invalidFiles"
        required
        :error="$t('features.forms.fileUpload.labels.invalidError')"
        :label="$t('features.forms.fileUpload.labels.attachments')"
        :helper-text="$t('features.forms.fileUpload.labels.invalidHelper')"
      />
    </PreviewCodeCard>
  </div>
</template>
