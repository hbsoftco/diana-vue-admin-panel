<script setup lang="ts">
import { ref } from 'vue'

import DiButton from '@/shared/ui/base/DiButton.vue'
import DiCard from '@/shared/ui/base/DiCard.vue'
import DiDraggable from '@/shared/ui/base/DiDraggable.vue'
import PreviewCodeCard from '@/shared/ui/patterns/PreviewCodeCard.vue'

type TaskCard = { id: string, title: string, description: string, status: string }

const initialCards: TaskCard[] = [
  {
    id: 'research',
    title: 'Research insights',
    description: 'Summarize customer interviews for the planning session.',
    status: 'Discovery',
  },
  {
    id: 'prototype',
    title: 'Prototype review',
    description: 'Collect feedback on the responsive navigation concept.',
    status: 'Design',
  },
  {
    id: 'handoff',
    title: 'Developer handoff',
    description: 'Confirm states, tokens, and acceptance criteria.',
    status: 'Ready',
  },
]

const basicCards = ref([...initialCards])
const handleCards = ref([...initialCards])
const disabledCards = ref([...initialCards.slice(0, 2)])
const rtlCards = ref([...initialCards])
const connectedLeftCards = ref([...initialCards.slice(0, 2)])
const connectedRightCards = ref([
  initialCards[2]!,
  {
    id: 'release',
    title: 'Release checklist',
    description: 'Verify monitoring and rollout ownership.',
    status: 'Scheduled',
  },
])
const connectedGroup = { name: 'project-work', pull: true, put: true }
const approved = ref<string[]>([])

function approve(id: string) {
  if (!approved.value.includes(id))
    approved.value.push(id)
}

const basicCode = `<script setup lang="ts">
import { ref } from 'vue'
import DiDraggable from '@/shared/ui/base/DiDraggable.vue'

const cards = ref([
  { id: 'research', title: 'Research insights' },
  { id: 'prototype', title: 'Prototype review' },
])
<\/script>

<template>
  <DiDraggable v-model="cards" item-key="id">
    <template #item="{ item }">
      <article class="card bg-base-100 shadow-sm">
        <div class="card-body">{{ item.title }}</div>
      </article>
    </template>
  </DiDraggable>
</template>`

const handleCode = `<DiDraggable v-model="cards" item-key="id" handle>
  <template #item="{ item }">
    <DiCard :title="item.title">{{ item.description }}</DiCard>
  </template>
</DiDraggable>`

const disabledCode = `<DiDraggable v-model="cards" item-key="id" disabled>
  <template #item="{ item }">
    <DiCard :title="item.title" />
  </template>
</DiDraggable>`

const composedCode = `<div dir="rtl" data-theme="diana-dark">
  <DiDraggable v-model="cards" item-key="id" handle>
    <template #item="{ item }">
      <DiCard :title="item.title">
        <DiButton @click="approve(item.id)">Approve</DiButton>
      </DiCard>
    </template>
  </DiDraggable>
</div>`

const connectedCode = `<script setup lang="ts">
import { ref } from 'vue'
import DiCard from '@/shared/ui/base/DiCard.vue'
import DiDraggable from '@/shared/ui/base/DiDraggable.vue'

const backlog = ref([
  { id: 'research', title: 'Research insights' },
  { id: 'prototype', title: 'Prototype review' },
])
const scheduled = ref([
  { id: 'handoff', title: 'Developer handoff' },
])
const group = { name: 'project-work', pull: true, put: true }
<\/script>

<template>
  <div class="grid gap-4 md:grid-cols-2">
    <DiDraggable v-model="backlog" item-key="id" :group="group">
      <template #item="{ item }">
        <DiCard :title="item.title" border />
      </template>
    </DiDraggable>
    <DiDraggable v-model="scheduled" item-key="id" :group="group">
      <template #item="{ item }">
        <DiCard :title="item.title" border />
      </template>
    </DiDraggable>
  </div>
</template>`
</script>

<template>
  <div class="space-y-6">
    <div class="grid grid-cols-1 gap-6 xl:grid-cols-2">
      <PreviewCodeCard
        :title="$t('features.advancedUi.draggable.basic')"
        :code="basicCode"
        language="vue"
      >
        <DiDraggable
          v-model="basicCards"
          item-key="id"
          :label="$t('features.advancedUi.draggable.listLabel')"
        >
          <template #item="{ item }">
            <DiCard :title="item.title" border class="cursor-grab active:cursor-grabbing">
              <p class="text-sm text-base-content/70">
                {{ item.description }}
              </p>
              <template #footer>
                <span class="badge badge-outline">{{ item.status }}</span>
              </template>
            </DiCard>
          </template>
        </DiDraggable>
      </PreviewCodeCard>

      <PreviewCodeCard :title="$t('features.advancedUi.draggable.handle')" :code="handleCode">
        <DiDraggable
          v-model="handleCards"
          item-key="id"
          handle
          :label="$t('features.advancedUi.draggable.listLabel')"
          :handle-label="$t('features.advancedUi.draggable.handleLabel')"
        >
          <template #item="{ item }">
            <DiCard :title="item.title" border title-class="ltr:pr-10 rtl:pl-10">
              <p class="text-sm text-base-content/70">
                {{ item.description }}
              </p>
            </DiCard>
          </template>
        </DiDraggable>
      </PreviewCodeCard>

      <PreviewCodeCard :title="$t('features.advancedUi.draggable.disabled')" :code="disabledCode">
        <DiDraggable
          v-model="disabledCards"
          item-key="id"
          disabled
          :label="$t('features.advancedUi.draggable.disabledLabel')"
        >
          <template #item="{ item }">
            <DiCard :title="item.title" border class="opacity-70">
              <p class="text-sm text-base-content/70">
                {{ item.description }}
              </p>
            </DiCard>
          </template>
        </DiDraggable>
      </PreviewCodeCard>

      <PreviewCodeCard :title="$t('features.advancedUi.draggable.composed')" :code="composedCode">
        <div
          dir="rtl"
          data-theme="diana-dark"
          class="rounded-box bg-base-200 p-4 text-base-content"
        >
          <DiDraggable
            v-model="rtlCards"
            item-key="id"
            handle
            :label="$t('features.advancedUi.draggable.rtlLabel')"
            :handle-label="$t('features.advancedUi.draggable.handleLabel')"
          >
            <template #item="{ item }">
              <DiCard :title="item.title" border title-class="pl-10">
                <p class="text-sm text-base-content/70">
                  {{ item.description }}
                </p>
                <template #actions>
                  <DiButton
                    size="sm"
                    :disabled="approved.includes(item.id)"
                    @click="approve(item.id)"
                  >
                    {{
                      approved.includes(item.id)
                        ? $t('features.advancedUi.draggable.approved')
                        : $t('features.advancedUi.draggable.approve')
                    }}
                  </DiButton>
                </template>
              </DiCard>
            </template>
          </DiDraggable>
        </div>
      </PreviewCodeCard>
    </div>

    <PreviewCodeCard
      :title="$t('features.advancedUi.draggable.connected')"
      :code="connectedCode"
      language="vue"
    >
      <div class="grid gap-4 md:grid-cols-2">
        <section class="rounded-box border border-base-300 bg-base-200/50 p-3">
          <h3 class="mb-3 font-semibold text-base-content">
            {{ $t('features.advancedUi.draggable.backlog') }}
          </h3>
          <DiDraggable
            v-model="connectedLeftCards"
            item-key="id"
            :group="connectedGroup"
            class="min-h-48"
            :label="$t('features.advancedUi.draggable.backlog')"
          >
            <template #item="{ item }">
              <DiCard :title="item.title" border class="cursor-grab active:cursor-grabbing">
                <p class="text-sm text-base-content/70">
                  {{ item.description }}
                </p>
                <template #footer>
                  <span class="badge badge-outline">{{ item.status }}</span>
                </template>
              </DiCard>
            </template>
          </DiDraggable>
        </section>

        <section class="rounded-box border border-base-300 bg-base-200/50 p-3">
          <h3 class="mb-3 font-semibold text-base-content">
            {{ $t('features.advancedUi.draggable.scheduled') }}
          </h3>
          <DiDraggable
            v-model="connectedRightCards"
            item-key="id"
            :group="connectedGroup"
            class="min-h-48"
            :label="$t('features.advancedUi.draggable.scheduled')"
          >
            <template #item="{ item }">
              <DiCard :title="item.title" border class="cursor-grab active:cursor-grabbing">
                <p class="text-sm text-base-content/70">
                  {{ item.description }}
                </p>
                <template #footer>
                  <span class="badge badge-outline">{{ item.status }}</span>
                </template>
              </DiCard>
            </template>
          </DiDraggable>
        </section>
      </div>
    </PreviewCodeCard>
  </div>
</template>
