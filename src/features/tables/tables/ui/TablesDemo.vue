<script setup lang="ts">
import userAvatarUrl from '@assets/images/user.png'
import { useI18n } from 'vue-i18n'

import DiAvatar from '@/shared/ui/base/avatar/DiAvatar.vue'
import { DiCheckbox } from '@/shared/ui/base/checkbox'
import DiBadge from '@/shared/ui/base/DiBadge.vue'
import DiButton from '@/shared/ui/base/DiButton.vue'
import DiIcon from '@/shared/ui/base/DiIcon.vue'
import DiProgress from '@/shared/ui/base/DiProgress.vue'
import PreviewCodeCard from '@/shared/ui/patterns/PreviewCodeCard.vue'

import { invoices, orders, people, projects } from './table-fixtures'
import {
  TABLE_ACTIVE_CLASS,
  TABLE_BORDERED_CLASS,
  TABLE_BORDERLESS_CLASS,
  TABLE_DARK_ROW_CLASS,
  TABLE_EVEN_COLUMN_CLASS,
  TABLE_LIGHT_ROW_CLASS,
  TABLE_VARIANT_ROW_CLASSES,
} from './table-variants'

const { t } = useI18n()

const alphaTeam = people.slice(0, 2)
const betaTeam = people.slice(2)

const allVariantRows = [
  { key: 'default', labelKey: 'features.tables.tables.misc.variantDefault', class: '' },
  { key: 'primary', labelKey: 'common.variants.primary', class: TABLE_VARIANT_ROW_CLASSES.primary },
  {
    key: 'secondary',
    labelKey: 'common.variants.secondary',
    class: TABLE_VARIANT_ROW_CLASSES.secondary,
  },
  { key: 'success', labelKey: 'common.variants.success', class: TABLE_VARIANT_ROW_CLASSES.success },
  {
    key: 'danger',
    labelKey: 'features.tables.tables.misc.variantDanger',
    class: TABLE_VARIANT_ROW_CLASSES.error,
  },
  { key: 'warning', labelKey: 'common.variants.warning', class: TABLE_VARIANT_ROW_CLASSES.warning },
  { key: 'info', labelKey: 'common.variants.info', class: TABLE_VARIANT_ROW_CLASSES.info },
  {
    key: 'light',
    labelKey: 'features.tables.tables.misc.variantLight',
    class: TABLE_LIGHT_ROW_CLASS,
  },
  { key: 'dark', labelKey: 'features.tables.tables.misc.variantDark', class: TABLE_DARK_ROW_CLASS },
]

const borderedColorTables = [
  {
    key: 'primary',
    titleKey: 'sections.borderedPrimary',
    class: TABLE_VARIANT_ROW_CLASSES.primary,
  },
  {
    key: 'success',
    titleKey: 'sections.borderedSuccess',
    class: TABLE_VARIANT_ROW_CLASSES.success,
  },
  {
    key: 'warning',
    titleKey: 'sections.borderedWarning',
    class: TABLE_VARIANT_ROW_CLASSES.warning,
  },
]

const headVariants = [
  { key: 'primary', titleKey: 'sections.headPrimary', class: TABLE_VARIANT_ROW_CLASSES.primary },
  { key: 'warning', titleKey: 'sections.headWarning', class: TABLE_VARIANT_ROW_CLASSES.warning },
  { key: 'success', titleKey: 'sections.headSuccess', class: TABLE_VARIANT_ROW_CLASSES.success },
  { key: 'info', titleKey: 'sections.headInfo', class: TABLE_VARIANT_ROW_CLASSES.info },
  {
    key: 'secondary',
    titleKey: 'sections.headSecondary',
    class: TABLE_VARIANT_ROW_CLASSES.secondary,
  },
  { key: 'danger', titleKey: 'sections.headDanger', class: TABLE_VARIANT_ROW_CLASSES.error },
]

const fullColorTables = [
  { key: 'primary', titleKey: 'sections.colorPrimary', class: TABLE_VARIANT_ROW_CLASSES.primary },
  {
    key: 'secondary',
    titleKey: 'sections.colorSecondary',
    class: TABLE_VARIANT_ROW_CLASSES.secondary,
  },
  { key: 'warning', titleKey: 'sections.colorWarning', class: TABLE_VARIANT_ROW_CLASSES.warning },
  { key: 'danger', titleKey: 'sections.colorDanger', class: TABLE_VARIANT_ROW_CLASSES.error },
  { key: 'dark', titleKey: 'sections.colorDark', class: TABLE_DARK_ROW_CLASS },
]

function statusVariant(status: 'active' | 'inactive') {
  return status === 'active' ? 'success' : 'neutral'
}

function invoiceStatusVariant(status: 'paid' | 'cancelled') {
  return status === 'paid' ? 'success' : 'error'
}

const basicCode = `<div class="overflow-x-auto">
  <table class="table">
    <thead>
      <tr>
        <th>#</th>
        <th>Name</th>
        <th>Status</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="person in people" :key="person.id">
        <td>{{ person.id }}</td>
        <td>{{ person.name }}</td>
        <td>
          <DiBadge :variant="person.status === 'active' ? 'success' : 'neutral'" soft>
            {{ person.status }}
          </DiBadge>
        </td>
      </tr>
    </tbody>
  </table>
</div>`

const borderedCode = `<div class="overflow-x-auto">
  <table class="table" :class="TABLE_BORDERED_CLASS">
    <thead>
      <tr><th>Name</th><th>Status</th><th>Actions</th></tr>
    </thead>
    <tbody>
      <tr v-for="person in people" :key="person.id">
        <td>
          <div class="flex items-center gap-3">
            <DiAvatar :src="userAvatarUrl" :status="person.online ? 'online' : 'offline'" size="sm" />
            <span>{{ person.name }}</span>
          </div>
        </td>
        <td>
          <DiBadge :variant="person.status === 'active' ? 'success' : 'neutral'" soft>
            {{ person.status }}
          </DiBadge>
        </td>
        <td>
          <DiButton variant="ghost" size="sm" circle :aria-label="\`Edit \${person.name}\`">
            <DiIcon name="pencil" size="sm" />
          </DiButton>
          <DiButton variant="ghost" size="sm" circle :aria-label="\`Delete \${person.name}\`">
            <DiIcon name="trash" size="sm" />
          </DiButton>
        </td>
      </tr>
    </tbody>
  </table>
</div>`

const borderedColorCode = `<table class="table" :class="TABLE_BORDERED_CLASS">
  <tbody>
    <tr v-for="person in people" :key="person.id" :class="TABLE_VARIANT_ROW_CLASSES.primary">
      <td>
        <div class="flex items-center gap-3">
          <DiAvatar :src="userAvatarUrl" :status="person.online ? 'online' : 'offline'" size="sm" />
          <span>{{ person.name }}</span>
        </div>
      </td>
      <td><DiBadge variant="success" soft>{{ person.status }}</DiBadge></td>
      <td><DiBadge variant="neutral" soft pill>{{ person.date }}</DiBadge></td>
    </tr>
  </tbody>
</table>`

const borderlessCode = `<table class="table" :class="TABLE_BORDERLESS_CLASS">
  <!-- same rows as Basic Tables, with daisyUI's default row dividers removed -->
</table>`

const groupDividersCode = `<table class="table">
  <tbody>
    <tr v-for="person in alphaTeam" :key="person.id"><!-- ... --></tr>
  </tbody>
  <tbody class="border-t-2 border-base-300">
    <tr v-for="person in betaTeam" :key="person.id"><!-- ... --></tr>
  </tbody>
</table>`

const stripedRowsCode = `<table class="table table-zebra">
  <tbody>
    <tr v-for="person in people" :key="person.id">
      <td>{{ person.name }}</td>
      <td>{{ person.role }}</td>
      <td>
        <DiButton variant="ghost" size="xs">
          <template #icon-left><DiIcon name="download" size="xs" /></template>
          Download
        </DiButton>
        <DiButton variant="ghost" size="xs">
          <template #icon-left><DiIcon name="trash" size="xs" /></template>
          Delete
        </DiButton>
      </td>
    </tr>
  </tbody>
</table>`

const stripedColumnsCode = `<table class="table">
  <tbody>
    <tr v-for="person in people" :key="person.id">
      <td>{{ person.name }}</td>
      <td :class="TABLE_EVEN_COLUMN_CLASS">{{ person.role }}</td>
      <td>{{ person.date }}</td>
      <td :class="TABLE_EVEN_COLUMN_CLASS"><!-- Download / Delete buttons --></td>
    </tr>
  </tbody>
</table>`

const fullColorCode = `<table class="table">
  <tbody>
    <tr v-for="person in people" :key="person.id" :class="TABLE_VARIANT_ROW_CLASSES.primary">
      <td>{{ person.name }}</td>
      <td>{{ person.role }}</td>
      <td>{{ person.status }}</td>
    </tr>
  </tbody>
</table>`

const successStripedCode = `<table class="table">
  <tbody>
    <tr
      v-for="(person, index) in people"
      :key="person.id"
      :class="index % 2 === 0 ? 'bg-success/10' : 'bg-success/20'"
    >
      <td>{{ person.name }}</td>
      <td>{{ person.role }}</td>
      <td>{{ person.status }}</td>
    </tr>
  </tbody>
</table>`

const hoverableCode = `<table class="table">
  <tbody>
    <tr v-for="project in projects" :key="project.name" class="hover:bg-base-200">
      <td>{{ project.name }}</td>
      <td>
        <div class="flex -space-x-2">
          <DiAvatar
            v-for="member in project.team"
            :key="member"
            :initials="member"
            size="xs"
            class="ring-2 ring-base-100"
          />
          <DiAvatar
            v-if="project.extraMembers"
            :initials="\`+\${project.extraMembers}\`"
            size="xs"
            variant="neutral"
            class="ring-2 ring-base-100"
          />
        </div>
      </td>
      <td><DiProgress :value="project.progress" variant="primary" size="sm" show-value /></td>
    </tr>
  </tbody>
</table>`

const hoverableStripedCode = `<table class="table table-zebra">
  <tbody>
    <tr v-for="invoice in invoices" :key="invoice.id" class="hover:bg-base-200/70">
      <td>{{ invoice.id }}</td>
      <td>{{ invoice.customer }}</td>
      <td>{{ invoice.amount }}</td>
      <td>
        <DiBadge :variant="invoice.status === 'paid' ? 'success' : 'error'" soft>
          <template #icon-left>
            <DiIcon :name="invoice.status === 'paid' ? 'checkCircle' : 'xCircle'" size="xs" />
          </template>
          {{ invoice.status }}
        </DiBadge>
      </td>
    </tr>
  </tbody>
</table>`

const headVariantCode = `<table class="table">
  <thead>
    <tr :class="TABLE_VARIANT_ROW_CLASSES.primary">
      <th>Name</th>
      <th>Role</th>
      <th>Status</th>
    </tr>
  </thead>
  <tbody><!-- ... --></tbody>
</table>`

const footerCode = `<table class="table">
  <thead>
    <tr><th>Item</th><th>Qty</th><th>Price</th><th>Subtotal</th></tr>
  </thead>
  <tbody><!-- line items --></tbody>
  <tfoot class="bg-base-200 font-semibold">
    <tr>
      <td colspan="3">Total</td>
      <td>$1,240.00</td>
    </tr>
  </tfoot>
</table>`

const captionBottomCode = `<table class="table">
  <caption class="caption-bottom pt-3 text-sm text-base-content/60">
    Table 1: Recent team activity.
  </caption>
  <!-- head + body -->
</table>`

const captionTopCode = `<table class="table">
  <caption class="caption-top pb-3 text-sm text-base-content/60">
    Table 2: Quarterly project summary.
  </caption>
  <!-- head + body -->
</table>`

const activeCode = `<table class="table">
  <tbody>
    <tr v-for="person in people" :key="person.id" :class="person.id === 2 && TABLE_ACTIVE_CLASS">
      <td>{{ person.name }}</td>
      <td>{{ person.role }}</td>
      <td :class="person.id === 4 && TABLE_ACTIVE_CLASS">{{ person.status }}</td>
    </tr>
  </tbody>
</table>`

const smallCode = `<table class="table table-sm">
  <thead>
    <tr>
      <th><DiCheckbox size="xs" aria-label="Select all" /></th>
      <th>Name</th>
      <th>Role</th>
      <th>Status</th>
    </tr>
  </thead>
  <tbody>
    <tr v-for="person in people" :key="person.id">
      <td>
        <DiCheckbox size="xs">
          <template #label><span class="sr-only">Select {{ person.name }}</span></template>
        </DiCheckbox>
      </td>
      <td>{{ person.name }}</td>
      <td>{{ person.role }}</td>
      <td>{{ person.status }}</td>
    </tr>
  </tbody>
</table>`

const allVariantsCode = `<table class="table">
  <tbody>
    <tr v-for="row in allVariantRows" :key="row.key" :class="row.class">
      <td>{{ row.label }}</td>
      <td>Column 1</td>
      <td>Column 2</td>
    </tr>
  </tbody>
</table>`

const nestingCode = `<table class="table">
  <thead>
    <tr><th>Order</th><th>Customer</th><th>Date</th><th>Total</th></tr>
  </thead>
  <tbody>
    <tr>
      <td>{{ order.id }}</td>
      <td>{{ order.customer }}</td>
      <td>{{ order.date }}</td>
      <td>{{ order.amount }}</td>
    </tr>
    <tr>
      <td colspan="4" class="bg-base-200/50">
        <table class="table table-xs">
          <!-- nested line items for this order -->
        </table>
      </td>
    </tr>
  </tbody>
</table>`

const responsiveCode = `<div class="overflow-x-auto">
  <table class="table">
    <thead>
      <tr>
        <th><DiCheckbox size="xs" aria-label="Select all" /></th>
        <th>Name</th>
        <th>Category</th>
        <th>Team</th>
        <th>Revenue</th>
        <th>Progress</th>
        <th>Actions</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="order in orders" :key="order.id">
        <td><DiCheckbox size="xs" /></td>
        <td>
          <div class="flex items-center gap-3">
            <DiAvatar :src="userAvatarUrl" size="sm" />
            <div>
              <div>{{ order.name }}</div>
              <div class="text-xs text-base-content/60">{{ order.email }}</div>
            </div>
          </div>
        </td>
        <td><DiBadge variant="info" soft>{{ order.category }}</DiBadge></td>
        <td><!-- stacked avatar group --></td>
        <td>{{ order.revenue }}</td>
        <td><DiProgress :value="order.progress" size="sm" show-value /></td>
        <td><!-- edit / delete actions --></td>
      </tr>
    </tbody>
  </table>
</div>`
</script>

<template>
  <div class="grid gap-6 xl:grid-cols-2">
    <!-- 1. Basic Tables -->
    <PreviewCodeCard
      :title="t('features.tables.tables.sections.basic')"
      accent-color="#8b5cf6"
      :code="basicCode"
      language="html"
      class="xl:col-span-2"
    >
      <div class="overflow-x-auto">
        <table class="table">
          <thead>
            <tr>
              <th>{{ t('features.tables.tables.columns.id') }}</th>
              <th>{{ t('features.tables.tables.columns.name') }}</th>
              <th>{{ t('features.tables.tables.columns.status') }}</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="person in people" :key="person.id">
              <td>{{ person.id }}</td>
              <td>{{ person.name }}</td>
              <td>
                <DiBadge :variant="statusVariant(person.status)" soft>
                  {{ t(`features.tables.tables.statuses.${person.status}`) }}
                </DiBadge>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </PreviewCodeCard>

    <!-- 2. Bordered Tables -->
    <PreviewCodeCard
      :title="t('features.tables.tables.sections.bordered')"
      accent-color="#06b6d4"
      :code="borderedCode"
      language="html"
      class="xl:col-span-2"
    >
      <div class="overflow-x-auto">
        <table class="table" :class="TABLE_BORDERED_CLASS">
          <thead>
            <tr>
              <th>{{ t('features.tables.tables.columns.name') }}</th>
              <th>{{ t('features.tables.tables.columns.status') }}</th>
              <th>{{ t('features.tables.tables.columns.actions') }}</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="person in people" :key="person.id">
              <td>
                <div class="flex items-center gap-3">
                  <DiAvatar
                    :src="userAvatarUrl"
                    :alt="person.name"
                    :status="person.online ? 'online' : 'offline'"
                    size="sm"
                  />
                  <span>{{ person.name }}</span>
                </div>
              </td>
              <td>
                <DiBadge :variant="statusVariant(person.status)" soft>
                  {{ t(`features.tables.tables.statuses.${person.status}`) }}
                </DiBadge>
              </td>
              <td>
                <DiButton
                  variant="ghost"
                  size="sm"
                  circle
                  :aria-label="t('features.tables.tables.actions.editAria', { name: person.name })"
                >
                  <DiIcon name="pencil" size="sm" />
                </DiButton>
                <DiButton
                  variant="ghost"
                  size="sm"
                  circle
                  :aria-label="
                    t('features.tables.tables.actions.deleteAria', { name: person.name })
                  "
                >
                  <DiIcon name="trash" size="sm" />
                </DiButton>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </PreviewCodeCard>

    <!-- 3. Bordered Primary / Success / Warning -->
    <PreviewCodeCard
      v-for="item in borderedColorTables"
      :key="item.key"
      :title="t(`features.tables.tables.${item.titleKey}`)"
      accent-color="#14b8a6"
      :code="borderedColorCode"
      language="html"
    >
      <div class="overflow-x-auto">
        <table class="table" :class="TABLE_BORDERED_CLASS">
          <tbody>
            <tr v-for="person in people" :key="person.id" :class="item.class">
              <td>
                <div class="flex items-center gap-3">
                  <DiAvatar
                    :src="userAvatarUrl"
                    :alt="person.name"
                    :status="person.online ? 'online' : 'offline'"
                    size="sm"
                  />
                  <span>{{ person.name }}</span>
                </div>
              </td>
              <td>
                <DiBadge :variant="statusVariant(person.status)" soft>
                  {{ t(`features.tables.tables.statuses.${person.status}`) }}
                </DiBadge>
              </td>
              <td>
                <DiBadge variant="neutral" soft pill>
                  {{ person.date }}
                </DiBadge>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </PreviewCodeCard>

    <!-- 4. Table Without Borders -->
    <PreviewCodeCard
      :title="t('features.tables.tables.sections.borderless')"
      accent-color="#64748b"
      :code="borderlessCode"
      language="html"
    >
      <div class="overflow-x-auto">
        <table class="table" :class="TABLE_BORDERLESS_CLASS">
          <tbody>
            <tr v-for="person in people" :key="person.id">
              <td>{{ person.name }}</td>
              <td>{{ person.role }}</td>
              <td>
                <DiBadge :variant="statusVariant(person.status)" soft>
                  {{ t(`features.tables.tables.statuses.${person.status}`) }}
                </DiBadge>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </PreviewCodeCard>

    <!-- 5. Table Group Dividers -->
    <PreviewCodeCard
      :title="t('features.tables.tables.sections.groupDividers')"
      accent-color="#f59e0b"
      :code="groupDividersCode"
      language="html"
    >
      <div class="overflow-x-auto">
        <table class="table">
          <thead>
            <tr>
              <th>{{ t('features.tables.tables.columns.name') }}</th>
              <th>{{ t('features.tables.tables.columns.role') }}</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td colspan="2" class="text-xs font-semibold uppercase text-base-content/50">
                {{ t('features.tables.tables.misc.groupAlpha') }}
              </td>
            </tr>
            <tr v-for="person in alphaTeam" :key="person.id">
              <td>{{ person.name }}</td>
              <td>{{ person.role }}</td>
            </tr>
          </tbody>
          <tbody class="border-t-2 border-base-300">
            <tr>
              <td colspan="2" class="pt-3 text-xs font-semibold uppercase text-base-content/50">
                {{ t('features.tables.tables.misc.groupBeta') }}
              </td>
            </tr>
            <tr v-for="person in betaTeam" :key="person.id">
              <td>{{ person.name }}</td>
              <td>{{ person.role }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </PreviewCodeCard>

    <!-- 6. Striped rows / Striped columns -->
    <PreviewCodeCard
      :title="t('features.tables.tables.sections.stripedRows')"
      accent-color="#22c55e"
      :code="stripedRowsCode"
      language="html"
    >
      <div class="overflow-x-auto">
        <table class="table table-zebra">
          <thead>
            <tr>
              <th>{{ t('features.tables.tables.columns.name') }}</th>
              <th>{{ t('features.tables.tables.columns.role') }}</th>
              <th>{{ t('features.tables.tables.columns.actions') }}</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="person in people" :key="person.id">
              <td>{{ person.name }}</td>
              <td>{{ person.role }}</td>
              <td>
                <DiButton variant="ghost" size="xs">
                  <template #icon-left>
                    <DiIcon name="download" size="xs" />
                  </template>
                  {{ t('features.tables.tables.actions.download') }}
                </DiButton>
                <DiButton variant="ghost" size="xs">
                  <template #icon-left>
                    <DiIcon name="trash" size="xs" />
                  </template>
                  {{ t('features.tables.tables.actions.delete') }}
                </DiButton>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </PreviewCodeCard>

    <PreviewCodeCard
      :title="t('features.tables.tables.sections.stripedColumns')"
      accent-color="#3b82f6"
      :code="stripedColumnsCode"
      language="html"
    >
      <div class="overflow-x-auto">
        <table class="table">
          <thead>
            <tr>
              <th>{{ t('features.tables.tables.columns.name') }}</th>
              <th :class="TABLE_EVEN_COLUMN_CLASS">
                {{ t('features.tables.tables.columns.role') }}
              </th>
              <th>{{ t('features.tables.tables.columns.date') }}</th>
              <th :class="TABLE_EVEN_COLUMN_CLASS">
                {{ t('features.tables.tables.columns.actions') }}
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="person in people" :key="person.id">
              <td>{{ person.name }}</td>
              <td :class="TABLE_EVEN_COLUMN_CLASS">
                {{ person.role }}
              </td>
              <td>{{ person.date }}</td>
              <td :class="TABLE_EVEN_COLUMN_CLASS">
                <DiButton variant="ghost" size="xs">
                  <template #icon-left>
                    <DiIcon name="download" size="xs" />
                  </template>
                  {{ t('features.tables.tables.actions.download') }}
                </DiButton>
                <DiButton variant="ghost" size="xs">
                  <template #icon-left>
                    <DiIcon name="trash" size="xs" />
                  </template>
                  {{ t('features.tables.tables.actions.delete') }}
                </DiButton>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </PreviewCodeCard>

    <!-- 7. Color-variant full tables -->
    <PreviewCodeCard
      v-for="item in fullColorTables"
      :key="item.key"
      :title="t(`features.tables.tables.${item.titleKey}`)"
      accent-color="#a855f7"
      :code="fullColorCode"
      language="html"
    >
      <div class="overflow-x-auto">
        <table class="table">
          <tbody>
            <tr v-for="person in people" :key="person.id" :class="item.class">
              <td>{{ person.name }}</td>
              <td>{{ person.role }}</td>
              <td>{{ t(`features.tables.tables.statuses.${person.status}`) }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </PreviewCodeCard>

    <!-- 8. Success table combined with striped rows -->
    <PreviewCodeCard
      :title="t('features.tables.tables.sections.successStriped')"
      accent-color="#22c55e"
      :code="successStripedCode"
      language="html"
    >
      <div class="overflow-x-auto">
        <table class="table">
          <tbody>
            <tr
              v-for="(person, index) in people"
              :key="person.id"
              :class="index % 2 === 0 ? 'bg-success/10' : 'bg-success/20'"
            >
              <td>{{ person.name }}</td>
              <td>{{ person.role }}</td>
              <td>{{ t(`features.tables.tables.statuses.${person.status}`) }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </PreviewCodeCard>

    <!-- 9. Hoverable Rows -->
    <PreviewCodeCard
      :title="t('features.tables.tables.sections.hoverable')"
      accent-color="#ec4899"
      :code="hoverableCode"
      language="html"
      class="xl:col-span-2"
    >
      <div class="overflow-x-auto">
        <table class="table">
          <thead>
            <tr>
              <th>{{ t('features.tables.tables.columns.name') }}</th>
              <th>{{ t('features.tables.tables.columns.team') }}</th>
              <th>{{ t('features.tables.tables.columns.progress') }}</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="project in projects" :key="project.name" class="hover:bg-base-200">
              <td>{{ project.name }}</td>
              <td>
                <div class="flex -space-x-2">
                  <DiAvatar
                    v-for="member in project.team"
                    :key="member"
                    :initials="member"
                    size="xs"
                    class="ring-2 ring-base-100"
                  />
                  <DiAvatar
                    v-if="project.extraMembers"
                    :initials="`+${project.extraMembers}`"
                    :alt="
                      t('features.tables.tables.misc.moreMembers', { count: project.extraMembers })
                    "
                    size="xs"
                    variant="secondary"
                    class="ring-2 ring-base-100"
                  />
                </div>
              </td>
              <td class="w-40">
                <DiProgress
                  :value="project.progress"
                  :variant="project.variant"
                  size="sm"
                  show-value
                />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </PreviewCodeCard>

    <!-- 10. Hoverable rows combined with striped rows -->
    <PreviewCodeCard
      :title="t('features.tables.tables.sections.hoverableStriped')"
      accent-color="#f59e0b"
      :code="hoverableStripedCode"
      language="html"
      class="xl:col-span-2"
    >
      <div class="overflow-x-auto">
        <table class="table table-zebra">
          <thead>
            <tr>
              <th>{{ t('features.tables.tables.columns.id') }}</th>
              <th>{{ t('features.tables.tables.columns.customer') }}</th>
              <th>{{ t('features.tables.tables.columns.date') }}</th>
              <th>{{ t('features.tables.tables.columns.amount') }}</th>
              <th>{{ t('features.tables.tables.columns.status') }}</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="invoice in invoices" :key="invoice.id" class="hover:bg-base-200/70">
              <td>{{ invoice.id }}</td>
              <td>{{ invoice.customer }}</td>
              <td>{{ invoice.date }}</td>
              <td>{{ invoice.amount }}</td>
              <td>
                <DiBadge :variant="invoiceStatusVariant(invoice.status)" soft>
                  <template #icon-left>
                    <DiIcon
                      :name="invoice.status === 'paid' ? 'checkCircle' : 'xCircle'"
                      size="xs"
                    />
                  </template>
                  {{ t(`features.tables.tables.statuses.${invoice.status}`) }}
                </DiBadge>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </PreviewCodeCard>

    <!-- 11. Colored table HEAD variants -->
    <PreviewCodeCard
      v-for="item in headVariants"
      :key="item.key"
      :title="t(`features.tables.tables.${item.titleKey}`)"
      accent-color="#0ea5e9"
      :code="headVariantCode"
      language="html"
    >
      <div class="overflow-x-auto">
        <table class="table">
          <thead>
            <tr :class="item.class">
              <th>{{ t('features.tables.tables.columns.name') }}</th>
              <th>{{ t('features.tables.tables.columns.role') }}</th>
              <th>{{ t('features.tables.tables.columns.status') }}</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="person in people.slice(0, 3)" :key="person.id">
              <td>{{ person.name }}</td>
              <td>{{ person.role }}</td>
              <td>{{ t(`features.tables.tables.statuses.${person.status}`) }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </PreviewCodeCard>

    <!-- 12. Table with tfoot -->
    <PreviewCodeCard
      :title="t('features.tables.tables.sections.footer')"
      accent-color="#64748b"
      :code="footerCode"
      language="html"
    >
      <div class="overflow-x-auto">
        <table class="table">
          <thead>
            <tr>
              <th>{{ t('features.tables.tables.columns.item') }}</th>
              <th>{{ t('features.tables.tables.columns.qty') }}</th>
              <th>{{ t('features.tables.tables.columns.price') }}</th>
              <th>{{ t('features.tables.tables.columns.subtotal') }}</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Diana Pro License</td>
              <td>2</td>
              <td>$420.00</td>
              <td>$840.00</td>
            </tr>
            <tr>
              <td>Priority Support</td>
              <td>1</td>
              <td>$400.00</td>
              <td>$400.00</td>
            </tr>
          </tbody>
          <tfoot class="bg-base-200 font-semibold">
            <tr>
              <td colspan="3">
                {{ t('features.tables.tables.columns.total') }}
              </td>
              <td>$1,240.00</td>
            </tr>
          </tfoot>
        </table>
      </div>
    </PreviewCodeCard>

    <!-- 13. Table with a caption (bottom + top) -->
    <PreviewCodeCard
      :title="t('features.tables.tables.sections.captionBottom')"
      accent-color="#8b5cf6"
      :code="captionBottomCode"
      language="html"
    >
      <div class="overflow-x-auto">
        <table class="table">
          <caption class="caption-bottom pt-3 text-sm text-base-content/60">
            {{
              t('features.tables.tables.misc.captionBottomText')
            }}
          </caption>
          <thead>
            <tr>
              <th>{{ t('features.tables.tables.columns.name') }}</th>
              <th>{{ t('features.tables.tables.columns.role') }}</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="person in people.slice(0, 3)" :key="person.id">
              <td>{{ person.name }}</td>
              <td>{{ person.role }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </PreviewCodeCard>

    <PreviewCodeCard
      :title="t('features.tables.tables.sections.captionTop')"
      accent-color="#06b6d4"
      :code="captionTopCode"
      language="html"
    >
      <div class="overflow-x-auto">
        <table class="table">
          <caption class="caption-top pb-3 text-sm text-base-content/60">
            {{
              t('features.tables.tables.misc.captionTopText')
            }}
          </caption>
          <thead>
            <tr>
              <th>{{ t('features.tables.tables.columns.name') }}</th>
              <th>{{ t('features.tables.tables.columns.role') }}</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="person in people.slice(2)" :key="person.id">
              <td>{{ person.name }}</td>
              <td>{{ person.role }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </PreviewCodeCard>

    <!-- 14. Active Table -->
    <PreviewCodeCard
      :title="t('features.tables.tables.sections.active')"
      accent-color="#ef4444"
      :code="activeCode"
      language="html"
    >
      <div class="overflow-x-auto">
        <table class="table">
          <thead>
            <tr>
              <th>{{ t('features.tables.tables.columns.name') }}</th>
              <th>{{ t('features.tables.tables.columns.role') }}</th>
              <th>{{ t('features.tables.tables.columns.status') }}</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="person in people"
              :key="person.id"
              :class="person.id === 2 ? TABLE_ACTIVE_CLASS : ''"
            >
              <td>{{ person.name }}</td>
              <td>{{ person.role }}</td>
              <td :class="person.id === 4 ? TABLE_ACTIVE_CLASS : ''">
                {{ t(`features.tables.tables.statuses.${person.status}`) }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </PreviewCodeCard>

    <!-- 15. Small / compact table with a checkbox column -->
    <PreviewCodeCard
      :title="t('features.tables.tables.sections.small')"
      accent-color="#14b8a6"
      :code="smallCode"
      language="html"
    >
      <div class="overflow-x-auto">
        <table class="table table-sm">
          <thead>
            <tr>
              <th>
                <DiCheckbox size="xs" :aria-label="t('features.tables.tables.columns.select')" />
              </th>
              <th>{{ t('features.tables.tables.columns.name') }}</th>
              <th>{{ t('features.tables.tables.columns.role') }}</th>
              <th>{{ t('features.tables.tables.columns.status') }}</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="person in people" :key="person.id">
              <td>
                <DiCheckbox size="xs">
                  <template #label>
                    <span class="sr-only">
                      {{ t('features.tables.tables.misc.selectRow', { name: person.name }) }}
                    </span>
                  </template>
                </DiCheckbox>
              </td>
              <td>{{ person.name }}</td>
              <td>{{ person.role }}</td>
              <td>{{ t(`features.tables.tables.statuses.${person.status}`) }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </PreviewCodeCard>

    <!-- 16. Combined color-variants comparison table -->
    <PreviewCodeCard
      :title="t('features.tables.tables.sections.allVariants')"
      accent-color="#a855f7"
      :code="allVariantsCode"
      language="html"
      class="xl:col-span-2"
    >
      <div class="overflow-x-auto">
        <table class="table">
          <tbody>
            <tr v-for="row in allVariantRows" :key="row.key" :class="row.class">
              <td class="font-medium">
                {{ t(row.labelKey) }}
              </td>
              <td>{{ t('features.tables.tables.columns.columnOne') }}</td>
              <td>{{ t('features.tables.tables.columns.columnTwo') }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </PreviewCodeCard>

    <!-- 17. Nesting -->
    <PreviewCodeCard
      :title="t('features.tables.tables.sections.nesting')"
      accent-color="#3b82f6"
      :code="nestingCode"
      language="html"
      class="xl:col-span-2"
    >
      <div class="overflow-x-auto">
        <table class="table">
          <thead>
            <tr>
              <th>{{ t('features.tables.tables.columns.order') }}</th>
              <th>{{ t('features.tables.tables.columns.customer') }}</th>
              <th>{{ t('features.tables.tables.columns.date') }}</th>
              <th>{{ t('features.tables.tables.columns.total') }}</th>
            </tr>
          </thead>
          <tbody>
            <template v-for="invoice in invoices.slice(0, 2)" :key="invoice.id">
              <tr>
                <td>{{ invoice.id }}</td>
                <td>{{ invoice.customer }}</td>
                <td>{{ invoice.date }}</td>
                <td>{{ invoice.amount }}</td>
              </tr>
              <tr>
                <td colspan="4" class="bg-base-200/50 p-3">
                  <p class="mb-2 text-xs font-semibold uppercase text-base-content/50">
                    {{ t('features.tables.tables.misc.nestedOrderItems') }}
                  </p>
                  <table class="table table-xs">
                    <thead>
                      <tr>
                        <th>{{ t('features.tables.tables.columns.item') }}</th>
                        <th>{{ t('features.tables.tables.columns.qty') }}</th>
                        <th>{{ t('features.tables.tables.columns.price') }}</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>Diana Pro License</td>
                        <td>1</td>
                        <td>{{ invoice.amount }}</td>
                      </tr>
                    </tbody>
                  </table>
                </td>
              </tr>
            </template>
          </tbody>
        </table>
      </div>
    </PreviewCodeCard>

    <!-- 18. Always Responsive -->
    <PreviewCodeCard
      :title="t('features.tables.tables.sections.responsive')"
      accent-color="#22c55e"
      :code="responsiveCode"
      language="html"
      class="xl:col-span-2"
    >
      <div class="overflow-x-auto">
        <table class="table">
          <thead>
            <tr>
              <th>
                <DiCheckbox size="xs" :aria-label="t('features.tables.tables.columns.select')" />
              </th>
              <th>{{ t('features.tables.tables.columns.name') }}</th>
              <th>{{ t('features.tables.tables.columns.category') }}</th>
              <th>{{ t('features.tables.tables.columns.team') }}</th>
              <th>{{ t('features.tables.tables.columns.revenue') }}</th>
              <th>{{ t('features.tables.tables.columns.progress') }}</th>
              <th>{{ t('features.tables.tables.columns.actions') }}</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="order in orders" :key="order.id">
              <td>
                <DiCheckbox size="xs">
                  <template #label>
                    <span class="sr-only">
                      {{ t('features.tables.tables.misc.selectRow', { name: order.name }) }}
                    </span>
                  </template>
                </DiCheckbox>
              </td>
              <td>
                <div class="flex items-center gap-3">
                  <DiAvatar :src="userAvatarUrl" :alt="order.name" size="sm" />
                  <div class="min-w-0">
                    <div class="truncate">
                      {{ order.name }}
                    </div>
                    <div class="truncate text-xs text-base-content/60">
                      {{ order.email }}
                    </div>
                  </div>
                </div>
              </td>
              <td>
                <DiBadge variant="info" soft>
                  {{ order.category }}
                </DiBadge>
              </td>
              <td>
                <div class="flex -space-x-2">
                  <DiAvatar
                    v-for="member in order.team"
                    :key="member"
                    :initials="member"
                    size="xs"
                    class="ring-2 ring-base-100"
                  />
                  <DiAvatar
                    v-if="order.extraMembers"
                    :initials="`+${order.extraMembers}`"
                    :alt="
                      t('features.tables.tables.misc.moreMembers', { count: order.extraMembers })
                    "
                    size="xs"
                    variant="secondary"
                    class="ring-2 ring-base-100"
                  />
                </div>
              </td>
              <td>{{ order.revenue }}</td>
              <td class="w-36">
                <DiProgress :value="order.progress" size="sm" show-value />
              </td>
              <td class="whitespace-nowrap">
                <DiButton
                  variant="ghost"
                  size="sm"
                  circle
                  :aria-label="t('features.tables.tables.actions.editAria', { name: order.name })"
                >
                  <DiIcon name="pencil" size="sm" />
                </DiButton>
                <DiButton
                  variant="ghost"
                  size="sm"
                  circle
                  :aria-label="t('features.tables.tables.actions.deleteAria', { name: order.name })"
                >
                  <DiIcon name="trash" size="sm" />
                </DiButton>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </PreviewCodeCard>
  </div>
</template>
