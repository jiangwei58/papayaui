<template>
  <view :class="computedClass('calendar-wrapper')">
    <view :class="computedClass('calendar-header')">
      <view v-if="showTitle" :class="computedClass('calendar-header__title')">{{ title }}</view>
      <view v-if="showSubtitle" :class="computedClass('calendar-header__subtitle')">
        {{ months[monthCurrent]?.date.format('YYYY年M月') || '' }}
      </view>
      <view :class="computedClass('calendar__weekdays')">
        <view v-for="item in weekdays" :key="item" :class="computedClass('calendar__weekday')">
          {{ item }}
        </view>
      </view>
    </view>
    <scroll-view scroll-y :class="computedClass('calendar-body')" @scroll="onScroll">
      <view
        v-for="(monthItem, monthIndex) in months"
        :key="monthIndex"
        :class="computedClass('calendar__month')"
      >
        <view v-if="monthIndex !== 0" :class="computedClass('calendar__month-title')">
          {{ monthItem.date.format('YYYY年M月') }}
        </view>
        <view :class="computedClass('calendar__days')">
          <view v-if="showMark" :class="computedClass('calendar__month-mark')">
            {{ monthItem.date.month() + 1 }}
          </view>
          <view
            v-for="(dayItem, dayIndex) in getDays(monthItem.date)"
            :key="dayItem.text"
            :class="computedClass('calendar__day', `calendar__day--${dayItem.type}`)"
            :style="{ gridColumnStart: dayIndex === 0 ? monthItem.dayOfWeekStart + 1 : 'auto' }"
            @tap="onSelect(dayItem)"
          >
            <view :class="computedClass('calendar__top-info')">{{ dayItem.topInfo }}</view>
            <view :class="computedClass('calendar__day__select')">
              {{ dayItem.text }}
            </view>
            <view :class="computedClass('calendar__bottom-info')">{{ dayItem.bottomInfo }}</view>
          </view>
        </view>
      </view>
      <SafeBottom v-if="!showConfirm && safeAreaInsetBottom" />
    </scroll-view>
    <view v-if="showConfirm" :class="computedClass('calendar-footer')" class="px-26 py-15">
      <ButtonComponent type="primary" block :disabled="!confirmEnabled" @click="onConfirm">
        {{ confirmEnabled ? confirmText : confirmDisabledText }}
      </ButtonComponent>
      <SafeBottom v-if="safeAreaInsetBottom" />
    </view>
  </view>
</template>

<script lang="ts" setup>
import { Dayjs } from 'dayjs'
import { computed, getCurrentInstance, ref, toRefs } from 'vue'
import useCalendar, { DayItem, FirstDayOfWeekType } from '../../core/useCalendar'
import { useRect } from '../../hooks'
import { EventDetail } from '../../types'
import { computedClass } from '../../utils/style'
import ButtonComponent from '../button/button.vue'
import SafeBottom from '../safe-bottom/safe-bottom.vue'

export interface CalendarWrapperProps {
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
  /** 是否适配底部安全区 */
  safeAreaInsetBottom?: boolean
  /** ===当 Calendar 的 type 为 range 时，支持以下 props=== */
  /** 是否允许日期范围的起止时间为同一天 */
  allowSameDay?: boolean
  /** 日期区间最多可选天数，默认无限制 */
  maxRange?: number
}

const props = withDefaults(defineProps<CalendarWrapperProps>(), {
  type: 'single',
  title: '日期选择',
  minDate: Date.now(),
  maxDate: Date.now() + 1000 * 60 * 60 * 24 * 180,
  defaultDate: Date.now(),
  formatter: undefined,
  showMark: true,
  showTitle: true,
  showSubtitle: true,
  showConfirm: true,
  confirmText: '确定',
  confirmDisabledText: '确定',
  firstDayOfWeek: 0,
  safeAreaInsetBottom: true,
  maxRange: undefined,
})

const emit = defineEmits<{
  (event: 'confirm', value: Dayjs[]): void
  (event: 'select', value: DayItem): void
}>()

const instance = getCurrentInstance()
const { type, minDate, maxDate, defaultDate, firstDayOfWeek, formatter, allowSameDay, maxRange } =
  toRefs(props)

const {
  weekdays,
  months,
  selectedItems,
  getDays,
  onSelect: _onSelect,
} = useCalendar({
  type,
  min: minDate,
  max: maxDate,
  defaultDate,
  firstDayOfWeek,
  formatter,
  allowSameDay,
  maxRange,
})
const monthCurrent = ref<number>(0)
const monthTops = ref<number[]>([])

const confirmEnabled = computed<boolean>(() => {
  if (props.type === 'range') return selectedItems.value.length >= 2
  return selectedItems.value.length > 0
})

const onScroll = (e: EventDetail<{ scrollTop: number }>) => {
  let current = 0
  const scrollTop = e.detail.scrollTop
  for (let i = 0; i < monthTops.value.length; i++) {
    if (scrollTop >= monthTops.value[i] - 10) {
      current = i
    }
  }
  monthCurrent.value = current
}

const updateMonthTop = () => {
  if (!instance) return
  useRect(instance, '.pa-calendar__month', true).then((nodes) => {
    const tops = (nodes ?? []).reduce((result, node) => {
      result.push((result[result.length - 1] || 0) + node.height)
      return result
    }, [] as number[])
    tops.unshift(0)
    monthTops.value = tops
  })
}

const onSelect = (dayItem: DayItem) => {
  if (dayItem.type === 'disabled' || props.readonly) return
  _onSelect(dayItem.date)
  emit('select', dayItem)
  if (!props.showConfirm && confirmEnabled.value) {
    onConfirm()
  }
}

const onConfirm = () => {
  emit('confirm', selectedItems.value)
}

defineExpose({
  updateMonthTop,
})
</script>

<style lang="scss" scoped>
@import '../../styles/vars.scss';

.#{$prefix}-calendar {
  $calendarColor: _var(calendar-color, _var(color-primary));

  @mixin titleStyle() {
    height: 44px;
    font-weight: 500;
    line-height: 44px;
    text-align: center;
  }

  &-wrapper {
    display: flex;
    flex-direction: column;
    height: 100%;
  }

  &-header {
    flex-shrink: 0;
    box-shadow: 0 2px 10px rgb(125 126 128 / 16%);

    &__title,
    &__subtitle {
      @include titleStyle();
    }
    &__title {
      font-size: 16px;
    }
    &__subtitle {
      font-size: 14px;
    }
  }

  &__weekdays {
    display: flex;
  }
  &__weekday {
    flex: 1;
    font-size: 12px;
    line-height: 30px;
    text-align: center;
  }

  &-body {
    flex: 1;
    overflow: hidden;
  }
  &__month {
    &-mark {
      position: absolute;
      top: 50%;
      left: 50%;
      z-index: 0;
      color: rgba(242, 243, 245, 0.8);
      font-size: 160px;
      transform: translate(-50%, -50%);
      pointer-events: none;
    }
    &-title {
      @include titleStyle();
      font-size: 14px;
    }
  }
  &__days {
    position: relative;
    display: grid;
    grid-template-columns: repeat(7, minmax(0, 1fr));
    user-select: none;
  }
  &__day {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 64px;
    font-size: 16px;
    cursor: pointer;

    &__select {
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    &--selected,
    &--start,
    &--end,
    &--start-end {
      color: #fff;
      background-color: $calendarColor;
    }

    &--selected,
    &--start-end {
      border-radius: 4px;
    }
    &--start {
      border-radius: 4px 0 0 4px;
    }
    &--end {
      border-radius: 0 4px 4px 0;
    }
    &--middle {
      color: $calendarColor;
      &::after {
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        background-color: currentColor;
        opacity: 0.1;
        content: '';
      }
    }
    &--disabled {
      color: #c8c9cc;
    }
  }

  &__top-info,
  &__bottom-info {
    position: absolute;
    right: 0;
    left: 0;
    font-size: 10px;
    line-height: 14px;
    text-align: center;
  }
  &__top-info {
    top: 6px;
  }
  &__bottom-info {
    bottom: 6px;
  }

  &-footer {
    flex-shrink: 0;
  }
}
</style>
