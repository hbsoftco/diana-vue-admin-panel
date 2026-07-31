<script setup lang="ts">
import DiIcon from '@/shared/ui/base/DiIcon.vue'
import DiPagination from '@/shared/ui/base/DiPagination.vue'
import PreviewCodeCard from '@/shared/ui/patterns/PreviewCodeCard.vue'

const basicCode = `<DiPagination
  :total-pages="2"
  layout="spaced"
  variant="primary"
  aria-label="Basic pagination"
>
  <template #previous>Prev</template>
  <template #next>Next</template>
</DiPagination>`

const iconsCode = `<DiPagination
  :total-pages="3"
  layout="spaced"
  variant="primary"
  aria-label="Pagination with icons"
>
  <template #previous>
    <DiIcon name="chevronLeft" size="xs" class="rtl:rotate-180" />
  </template>
  <template #next>
    <DiIcon name="chevronRight" size="xs" class="rtl:rotate-180" />
  </template>
</DiPagination>`

const sizingCode = `<div class="flex flex-wrap items-center justify-between gap-5">
  <DiPagination :total-pages="3" size="xs" layout="spaced" variant="primary" aria-label="Extra small pagination" />
  <DiPagination :total-pages="3" size="sm" layout="spaced" variant="primary" aria-label="Small pagination" />
  <DiPagination :total-pages="3" size="md" layout="spaced" variant="primary" aria-label="Medium pagination" />
</div>`

const alignedCode = `<div class="space-y-5">
  <div class="flex justify-center">
    <DiPagination :total-pages="2" layout="spaced" variant="primary" aria-label="Centered pagination">
      <template #previous>Prev</template>
      <template #next>Next</template>
    </DiPagination>
  </div>
  <div class="flex justify-end">
    <DiPagination :total-pages="2" layout="spaced" variant="primary" aria-label="Right aligned pagination">
      <template #previous>Prev</template>
      <template #next>Next</template>
    </DiPagination>
  </div>
</div>`

const disabledCode = `<DiPagination
  :total-pages="3"
  layout="spaced"
  variant="primary"
  disabled
  aria-label="Disabled pagination"
/>`

const styleOneCode = `<DiPagination
  :total-pages="21"
  :sibling-count="4"
  layout="spaced"
  variant="primary"
  aria-label="Compact pagination with icons"
>
  <template #previous>
    <DiIcon name="chevronLeft" size="xs" class="rtl:rotate-180" />
  </template>
  <template #next>
    <DiIcon name="chevronRight" size="xs" class="rtl:rotate-180" />
  </template>
</DiPagination>`

const styleTwoCode = `<DiPagination
  :total-pages="17"
  :sibling-count="4"
  layout="spaced"
  active-style="underline"
  variant="primary"
  aria-label="Underlined pagination"
>
  <template #previous>Prev</template>
  <template #next>Next</template>
</DiPagination>`

const styleThreeCode = `<DiPagination
  :total-pages="17"
  :sibling-count="4"
  layout="spaced"
  active-style="circle"
  variant="primary"
  aria-label="Rounded pagination"
>
  <template #previous>Prev</template>
  <template #next>Next</template>
</DiPagination>`

const styleFourCode = `<DiPagination
  :total-pages="17"
  :sibling-count="4"
  layout="spaced"
  variant="primary"
  aria-label="Filled pagination"
>
  <template #previous>Prev</template>
  <template #next>Next</template>
</DiPagination>`

const controlsCode = `<div class="space-y-3">
  <DiPagination
    :total-pages="11"
    :sibling-count="5"
    :boundary-count="2"
    :show-previous-next="false"
    layout="spaced"
    variant="primary"
    aria-label="Page controls"
  />
  <DiPagination
    :total-pages="11"
    :sibling-count="5"
    :boundary-count="2"
    layout="spaced"
    show-first-last
    variant="primary"
    aria-label="Full page controls"
  >
    <template #first>
      <DiIcon name="chevronDoubleRight" size="xs" class="rotate-180 rtl:rotate-0" />
    </template>
    <template #previous>
      <DiIcon name="chevronLeft" size="xs" class="rtl:rotate-180" />
    </template>
    <template #next>
      <DiIcon name="chevronRight" size="xs" class="rtl:rotate-180" />
    </template>
    <template #last>
      <DiIcon name="chevronDoubleRight" size="xs" class="rtl:rotate-180" />
    </template>
  </DiPagination>
</div>`
</script>

<template>
  <div class="grid grid-cols-1 items-start gap-4 lg:grid-cols-12">
    <PreviewCodeCard
      class="lg:col-span-3"
      :title="$t('features.ui-elements.pagination.basic')"
      :code="basicCode"
      language="html"
    >
      <DiPagination
        :total-pages="2"
        layout="spaced"
        variant="primary"
        aria-label="Basic pagination"
      >
        <template #previous>Prev</template>
        <template #next>Next</template>
      </DiPagination>
    </PreviewCodeCard>

    <PreviewCodeCard
      class="lg:col-span-3"
      :title="$t('features.ui-elements.pagination.icons')"
      :code="iconsCode"
      language="html"
    >
      <DiPagination
        :total-pages="3"
        layout="spaced"
        variant="primary"
        aria-label="Pagination with icons"
      >
        <template #previous>
          <DiIcon name="chevronLeft" size="xs" class="rtl:rotate-180" />
        </template>
        <template #next>
          <DiIcon name="chevronRight" size="xs" class="rtl:rotate-180" />
        </template>
      </DiPagination>
    </PreviewCodeCard>

    <PreviewCodeCard
      class="lg:col-span-6"
      :title="$t('features.ui-elements.pagination.sizing')"
      :code="sizingCode"
      language="html"
    >
      <div class="flex flex-wrap items-center justify-between gap-5">
        <DiPagination
          :total-pages="3"
          size="xs"
          layout="spaced"
          variant="primary"
          aria-label="Extra small pagination"
        />
        <DiPagination
          :total-pages="3"
          size="sm"
          layout="spaced"
          variant="primary"
          aria-label="Small pagination"
        />
        <DiPagination
          :total-pages="3"
          size="md"
          layout="spaced"
          variant="primary"
          aria-label="Medium pagination"
        />
      </div>
    </PreviewCodeCard>

    <PreviewCodeCard
      class="lg:col-span-6"
      :title="$t('features.ui-elements.pagination.aligned')"
      :code="alignedCode"
      language="html"
    >
      <div class="space-y-5">
        <div class="flex justify-center">
          <DiPagination
            :total-pages="2"
            layout="spaced"
            variant="primary"
            aria-label="Centered pagination"
          >
            <template #previous>Prev</template>
            <template #next>Next</template>
          </DiPagination>
        </div>
        <div class="flex justify-end">
          <DiPagination
            :total-pages="2"
            layout="spaced"
            variant="primary"
            aria-label="Right aligned pagination"
          >
            <template #previous>Prev</template>
            <template #next>Next</template>
          </DiPagination>
        </div>
      </div>
    </PreviewCodeCard>

    <PreviewCodeCard
      class="lg:col-span-6"
      :title="$t('features.ui-elements.pagination.disabled')"
      :code="disabledCode"
      language="html"
    >
      <DiPagination
        :total-pages="3"
        layout="spaced"
        variant="primary"
        disabled
        aria-label="Disabled pagination"
      />
    </PreviewCodeCard>

    <PreviewCodeCard
      class="lg:col-span-6"
      :title="$t('features.ui-elements.pagination.styleOne')"
      :code="styleOneCode"
      language="html"
    >
      <DiPagination
        :total-pages="21"
        :sibling-count="4"
        layout="spaced"
        variant="primary"
        aria-label="Compact pagination with icons"
      >
        <template #previous
          ><DiIcon name="chevronLeft" size="xs" class="rtl:rotate-180"
        /></template>
        <template #next><DiIcon name="chevronRight" size="xs" class="rtl:rotate-180" /></template>
      </DiPagination>
    </PreviewCodeCard>

    <PreviewCodeCard
      class="lg:col-span-6"
      :title="$t('features.ui-elements.pagination.styleTwo')"
      :code="styleTwoCode"
      language="html"
    >
      <DiPagination
        :total-pages="17"
        :sibling-count="4"
        layout="spaced"
        active-style="underline"
        variant="primary"
        aria-label="Underlined pagination"
      >
        <template #previous>Prev</template><template #next>Next</template>
      </DiPagination>
    </PreviewCodeCard>

    <PreviewCodeCard
      class="lg:col-span-6"
      :title="$t('features.ui-elements.pagination.styleThree')"
      :code="styleThreeCode"
      language="html"
    >
      <DiPagination
        :total-pages="17"
        :sibling-count="4"
        layout="spaced"
        active-style="circle"
        variant="primary"
        aria-label="Rounded pagination"
      >
        <template #previous>Prev</template><template #next>Next</template>
      </DiPagination>
    </PreviewCodeCard>

    <PreviewCodeCard
      class="lg:col-span-6"
      :title="$t('features.ui-elements.pagination.styleFour')"
      :code="styleFourCode"
      language="html"
    >
      <DiPagination
        :total-pages="17"
        :sibling-count="4"
        layout="spaced"
        variant="primary"
        aria-label="Filled pagination"
      >
        <template #previous>Prev</template><template #next>Next</template>
      </DiPagination>
    </PreviewCodeCard>

    <PreviewCodeCard
      class="lg:col-span-6"
      :title="$t('features.ui-elements.pagination.controls')"
      :code="controlsCode"
      language="html"
    >
      <div class="space-y-3">
        <DiPagination
          :total-pages="11"
          :sibling-count="5"
          :boundary-count="2"
          :show-previous-next="false"
          layout="spaced"
          variant="primary"
          aria-label="Page controls"
        />
        <DiPagination
          :total-pages="11"
          :sibling-count="5"
          :boundary-count="2"
          layout="spaced"
          show-first-last
          variant="primary"
          aria-label="Full page controls"
        >
          <template #first
            ><DiIcon name="chevronDoubleRight" size="xs" class="rotate-180 rtl:rotate-0"
          /></template>
          <template #previous
            ><DiIcon name="chevronLeft" size="xs" class="rtl:rotate-180"
          /></template>
          <template #next><DiIcon name="chevronRight" size="xs" class="rtl:rotate-180" /></template>
          <template #last
            ><DiIcon name="chevronDoubleRight" size="xs" class="rtl:rotate-180"
          /></template>
        </DiPagination>
      </div>
    </PreviewCodeCard>
  </div>
</template>
