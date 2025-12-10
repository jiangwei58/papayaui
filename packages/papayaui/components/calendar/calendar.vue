<template>
  <Popup
    v-if="poppable"
    :custom-class="ns.b()"
    :show="show"
    :height="getUnitValue(height)"
    :closeable="showTitle || showSubtitle"
    :round="round"
    :close-on-click-overlay="closeOnClickOverlay"
    :safe-area-inset-bottom="safeAreaInsetBottom"
    @update:show="emit('update:show', $event)"
    @open="emit('open')"
    @opened="emit('opened')"
    @close="emit('close')"
    @closed="emit('closed')"
  >
    <CalendarWrapper
      ref="wrapperRef"
      v-bind="($props as CalendarWrapperProps)"
      @select="onSelect"
      @confirm="onConfirm"
    />
  </Popup>
  <view
    v-else
    :class="ns.b()"
    :style="{
      height: getUnitValue(height),
      borderRadius: typeof props.round === 'boolean' ? '8px' : getUnitValue(props.round),
    }"
  >
    <CalendarWrapper
      ref="wrapperRef"
      v-bind="($props as CalendarWrapperProps)"
      :show-confirm="false"
      :safe-area-inset-bottom="false"
      @select="onSelect"
      @confirm="onConfirm"
    />
  </view>
</template>

<script lang="ts" setup>
import type { Dayjs } from 'dayjs'
import { nextTick, onMounted, ref, watch } from 'vue'
import type { DayItem } from '@papayaui/core'
import { useNamespace } from '@papayaui/core'
import { getUnitValue } from '@papayaui/utils'
import CalendarWrapper from '../calendar/calendar-wrapper.vue'
import Popup from '../popup/popup.vue'
import { calendarEmits, calendarProps, type CalendarWrapperProps } from './props'

const ns = useNamespace('calendar')

const props = defineProps(calendarProps)
const emit = defineEmits(calendarEmits)

const wrapperRef = ref<InstanceType<typeof CalendarWrapper>>()

watch(
  () => props.show,
  (newVal, oldVal) => {
    if (newVal !== oldVal && newVal && props.poppable) {
      nextTick(() => {
        wrapperRef.value?.updateMonthTop()
      })
    }
  },
)

onMounted(() => {
  if (!props.poppable) {
    wrapperRef.value?.updateMonthTop()
  }
})

const onSelect = (dayItem: DayItem) => {
  emit('select', dayItem.date.toDate())
}

const onConfirm = (selectedItems: Dayjs[]) => {
  const result = selectedItems.map((item) => item.toDate())
  emit('confirm', props.type === 'single' ? result[0] : result)
  emit('update:show', false)
}
</script>

<style lang="scss">
@import './calendar.scss';
</style>
