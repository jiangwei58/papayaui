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
  const first = Array.isArray(defaultDate.value) ? defaultDate.value[0] : defaultDate.value
  let firstDate = dayjs(first)
  if (!firstDate.isValid()) {
    firstDate = months.value[0].date
  }
  months.value.forEach((item, index) => {
    if (item.date.diff(firstDate.startOf('month')) === 0) {
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

<style lang="scss">
@import './calendar-wrapper.scss';
</style>
