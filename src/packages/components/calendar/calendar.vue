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
      @select="onSelect"
      @confirm="onConfirm"
    />
  </view>
</template>

<script lang="ts" setup>
import { Dayjs } from 'dayjs'
import { onMounted, ref, watch } from 'vue'
import { DayItem, FirstDayOfWeekType } from '../../core/useCalendar'
import { getUnitValue } from '../../utils'
import { computedClass } from '../../utils/style'
import CalendarWrapper, { CalendarWrapperProps } from '../calendar/calendar-wrapper.vue'
import Popup, { PopupProps } from '../popup/popup.vue'

export type CalendarValue = Date | Date[]

export interface CalendarProps
  extends Pick<PopupProps, 'round' | 'closeOnClickOverlay' | 'safeAreaInsetBottom'> {
  /** 是否以弹层的形式展示日历 */
  poppable?: boolean
  /** 是否显示 */
  show?: boolean
  /** 高度 */
  height?: string

  /** 选择类型: single表示选择单个日期，multiple表示选择多个日期，range表示选择日期区间 */
  type?: 'single' | 'multiple' | 'range'
  /** 标题 */
  title?: string
  /** 可选择的最小日期 */
  minDate?: number
  /** 可选择的最大日期 */
  maxDate?: number
  /** 默认选中的日期，type为multiple或range时为数组 */
  defaultDate?: number | number[]
  /** 日期格式化函数 */
  formatter?: (day: DayItem) => DayItem
  /** 是否显示月份背景水印 */
  showMark?: boolean
  /** 是否展示日历标题 */
  showTitle?: boolean
  /** 是否展示日历副标题（年月） */
  showSubtitle?: boolean
  /** 是否展示确认按钮 */
  showConfirm?: boolean
  /** 确认按钮的文字 */
  confirmText?: string
  /** 确认按钮处于禁用状态时的文字 */
  confirmDisabledText?: string
  /** 设置周起始日 */
  firstDayOfWeek?: FirstDayOfWeekType
  /** 是否为只读状态，只读状态下不能选择日期 */
  readonly?: boolean
  /** ===当 Calendar 的 type 为 range 时，支持以下 props=== */
  /** 是否允许日期范围的起止时间为同一天 */
  allowSameDay?: boolean
  /** 日期区间最多可选天数，默认无限制 */
  maxRange?: number
}

const props = withDefaults(defineProps<CalendarProps>(), {
  poppable: true,
  show: false,
  height: '80vh',
  type: 'single',
  title: '日期选择',
  minDate: Date.now(),
  maxDate: Date.now() + 1000 * 60 * 60 * 24 * 365,
  defaultDate: Date.now(),
  formatter: undefined,
  showMark: true,
  showTitle: true,
  showSubtitle: true,
  showConfirm: true,
  confirmText: '确定',
  confirmDisabledText: '确定',
  firstDayOfWeek: 0,
  maxRange: undefined,
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
      wrapperRef.value?.updateMonthTop()
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
