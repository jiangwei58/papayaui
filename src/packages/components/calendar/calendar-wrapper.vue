<template>
  <view :class="ns.b('wrapper')">
    <view :class="ns.b('header')">
      <view v-if="showTitle" :class="ns.be('header', 'title')">{{ title }}</view>
      <view v-if="showSubtitle" :class="ns.be('header', 'subtitle')">
        {{ months[monthCurrent]?.date.format('YYYY年M月') || '' }}
      </view>
      <view :class="ns.e('weekdays')">
        <view v-for="item in weekdays" :key="item" :class="ns.e('weekday')">
          {{ item }}
        </view>
      </view>
    </view>
    <scroll-view scroll-y :scroll-top="scrollTop" :class="ns.b('body')" @scroll="onThrottleScroll">
      <view v-for="(monthItem, monthIndex) in months" :key="monthIndex" :class="ns.e('month')">
        <view v-if="monthIndex !== 0" :class="ns.e('month-title')">
          {{ monthItem.date.format('YYYY年M月') }}
        </view>
        <view
          :class="ns.e('days')"
          :style="{
            height: isVisualRange(monthIndex)
              ? 'auto'
              : getUnitValue(
                  Math.ceil((monthItem.dayOfWeekStart + monthItem.dayLength) / 7) * 64,
                  'px',
                ),
          }"
        >
          <template v-if="isVisualRange(monthIndex)">
            <view v-if="showMark" :class="ns.e('month-mark')">
              {{ monthItem.date.month() + 1 }}
            </view>
            <view
              v-for="(dayItem, dayIndex) in getDays(monthItem.date)"
              :key="dayItem.text"
              :class="[ns.e('day'), ns.em('day', dayItem.type)]"
              :style="{ gridColumnStart: dayIndex === 0 ? monthItem.dayOfWeekStart + 1 : 'auto' }"
              @tap="onSelect(dayItem)"
            >
              <view :class="ns.e('top-info')">{{ dayItem.topInfo }}</view>
              <view :class="ns.e('day__select')">
                {{ dayItem.text }}
              </view>
              <view :class="ns.e('bottom-info')">{{ dayItem.bottomInfo }}</view>
            </view>
          </template>
        </view>
      </view>
      <SafeBottom v-if="!showConfirm && safeAreaInsetBottom" />
    </scroll-view>
    <view v-if="showConfirm" :class="ns.b('footer')">
      <text v-if="showResultText" :class="ns.e('result_text')">{{ resultText }}</text>
      <ButtonComponent type="primary" block :disabled="!confirmEnabled" :sync-click="onConfirm">
        {{ confirmEnabled ? confirmText : confirmDisabledText }}
      </ButtonComponent>
      <SafeBottom v-if="safeAreaInsetBottom" />
    </view>
  </view>
</template>

<script lang="ts" setup>
import dayjs from 'dayjs'
import { computed, getCurrentInstance, nextTick, ref, toRefs } from 'vue'
import type { DayItem } from '../../core/useCalendar'
import { useCalendar } from '../../core/useCalendar'
import useNamespace from '../../core/useNamespace'
import { useRect } from '../../hooks'
import type { EventDetail } from '../../types'
import { getUnitValue, throttle } from '../../utils'
import ButtonComponent from '../button/button.vue'
import SafeBottom from '../safe-bottom/safe-bottom.vue'
import { calendarWrapperEmits, calendarWrapperProps } from './props'

const ns = useNamespace('calendar')

const props = defineProps(calendarWrapperProps)
const emit = defineEmits(calendarWrapperEmits)

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
const scrollTop = ref<number>(0)

const confirmEnabled = computed<boolean>(() => {
  if (props.type === 'range') return selectedItems.value.length >= 2
  return selectedItems.value.length > 0
})

const resultText = computed(() => {
  const separator = type.value === 'range' ? '~' : ','
  return selectedItems.value.map((item) => item.format('YYYY-MM-DD')).join(separator)
})

/**
 * 月份是否在显示范围
 */
const isVisualRange = (monthIndex: number) => {
  const diff = monthIndex - monthCurrent.value
  return diff >= -1 && diff <= 1
}

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
const onThrottleScroll = throttle(onScroll, 100, { trailing: true })

const updateMonthTop = () => {
  if (!instance) return
  useRect(instance, `.${ns.e('month')}`, true).then((nodes) => {
    const tops = (nodes ?? []).reduce((result, node) => {
      result.push((result[result.length - 1] || 0) + node.height)
      return result
    }, [] as number[])
    tops.unshift(0)
    monthTops.value = tops
    scrollToMonth()
  })
}

// 跳转到默认值的月份
const scrollToMonth = async () => {
  if (!defaultDate.value) return
  if (scrollTop.value !== 0) {
    scrollTop.value = 0
    await nextTick()
  }
  const start = Array.isArray(defaultDate.value) ? defaultDate.value[0] : defaultDate.value
  months.value.forEach((item, index) => {
    if (item.date.diff(dayjs(start).startOf('month')) === 0) {
      monthCurrent.value = index
      scrollTop.value = monthTops.value[index]
    }
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
    padding: 8px 13px;
  }

  &__result_text {
    display: block;
    font-size: 14px;
    text-align: center;
    color: _var(color-primary);
    line-height: 20px;
    padding-bottom: 8px;
  }
}
</style>
