<template>
  <Popup
    v-if="poppable"
    :custom-class="computedClass('calendar')"
    :show="show"
    :height="getUnitValue(height)"
    :closeable="showTitle || showSubtitle"
    :round="true"
    v-bind="$attrs"
    @update:show="emit('update:show', $event)"
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
    :class="computedClass('calendar')"
    :style="{ height: getUnitValue(height), borderRadius: getUnitValue($attrs.round as string ?? '0') }"
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
import { Dayjs } from 'dayjs'
import { onMounted, ref, watch, nextTick } from 'vue'
import { DayItem } from '../../core/useCalendar'
import { getUnitValue } from '../../utils'
import { computedClass } from '../../utils/style'
import CalendarWrapper, { CalendarWrapperProps } from '../calendar/calendar-wrapper.vue'
import Popup, { PopupProps } from '../popup/popup.vue'

export type CalendarValue = Date | Date[]

export interface CalendarProps
  extends Pick<PopupProps, 'round' | 'closeOnClickOverlay' | 'safeAreaInsetBottom'>,
    CalendarWrapperProps {
  /** 是否以弹层的形式展示日历 */
  poppable?: boolean
  /** 是否显示 */
  show?: boolean
  /** 高度 */
  height?: string
  /** 选择类型: single表示选择单个日期，multiple表示选择多个日期，range表示选择日期区间 */
  type?: 'single' | 'multiple' | 'range'
  /** 是否展示日历标题 */
  showTitle?: boolean
  /** 是否展示日历副标题（年月） */
  showSubtitle?: boolean
}

const props = withDefaults(defineProps<CalendarProps>(), {
  poppable: true,
  show: false,
  height: '80vh',
  type: 'single',
  showTitle: true,
  showSubtitle: true,
})

const emit = defineEmits<{
  (event: 'update:show', value: CalendarProps['show']): void
  (event: 'confirm', value: CalendarValue): void
  (event: 'select', value: CalendarValue): void
  (event: 'close'): void
  (event: 'closed'): void
}>()

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

<style lang="scss" scoped>
@import '../../styles/vars.scss';
.#{$prefix}-calendar {
  background-color: #fff;
}
</style>
