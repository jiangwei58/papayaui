import dayjs, { ConfigType, Dayjs } from 'dayjs'
import { computed, reactive, ref, watch } from 'vue'
import { IncludeRefs } from '../types'

export type FirstDayOfWeekType = 0 | 1 | 2 | 3 | 4 | 5 | 6

export interface UseCalendarProps {
  /** 选择类型: single表示选择单个日期，multiple表示选择多个日期，range表示选择日期区间 */
  type?: 'single' | 'multiple' | 'range'
  /** 可选择的最小日期 */
  min?: ConfigType
  /** 可选择的最大日期 */
  max?: ConfigType
  /** 默认选中的日期，type为multiple或range时为数组 */
  defaultDate?: number | number[]
  /** 是否为只读状态 */
  readonly?: boolean
  /** 周起始日0-6，0(周日)-6(周六) */
  firstDayOfWeek?: 0 | 1 | 2 | 3 | 4 | 5 | 6
  /** 日期格式化函数 */
  formatter?: (day: DayItem) => DayItem
  /** 是否允许日期范围的起止时间为同一天(当type为range时支持) */
  allowSameDay?: boolean
  /** 日期区间最多可选天数，默认无限制 */
  maxRange?: number
}

export type MonthItem = {
  /** 日期 */
  date: Dayjs
  /** 当月有多少天 */
  dayLength: number
  /** 当月1号的周起始 */
  dayOfWeekStart: number
}

export type DayItem = {
  /** 日期 */
  date: Dayjs
  /** 状态类型 */
  type: 'selected' | 'start' | 'end' | 'start-end' | 'middle' | 'disabled' | ''
  /** 中间文字 */
  text: string
  /** 上方的提示信息 */
  topInfo?: string
  /** 下方的提示信息 */
  bottomInfo?: string
}

export const WEEKDAYS = ['日', '一', '二', '三', '四', '五', '六']

export default (props: IncludeRefs<UseCalendarProps>) => {
  const _porps = props as UseCalendarProps
  const state = reactive({
    ...props,
    type: _porps.type ?? 'single',
    min: _porps.min ?? dayjs().valueOf(),
    max: _porps.max ?? dayjs().add(6, 'month'),
    defaultDate: _porps.defaultDate ?? dayjs().valueOf(),
    firstDayOfWeek: _porps.firstDayOfWeek ?? 0,
  })

  const selectedItems = ref<Dayjs[]>([])

  const weekdays = computed(() => {
    const WEEKDAYS_CLONE = [...WEEKDAYS]
    const splitStart = WEEKDAYS_CLONE.splice(0, state.firstDayOfWeek)
    return WEEKDAYS_CLONE.concat(splitStart)
  })

  const months = computed<MonthItem[]>(() => {
    const startDate = dayjs(state.min).startOf('month')
    const monthDiffLength = dayjs(state.max).endOf('month').diff(startDate, 'month')
    return new Array(monthDiffLength < 1 ? 1 : monthDiffLength).fill(0).map((_, index) => {
      const date = startDate.add(index, 'month')
      return {
        date,
        dayLength: date.daysInMonth(),
        dayOfWeekStart: date.add(WEEKDAYS.length - state.firstDayOfWeek, 'day').day(),
      }
    })
  })

  const isSameDay = (date: Dayjs, otherDate: Dayjs) => date.isSame(otherDate, 'day')

  const getDays = (month: Dayjs) => {
    const date = month.startOf('month')
    return new Array(date.daysInMonth()).fill(0).map<DayItem>((_, dayIndex) => {
      const day = date.add(dayIndex, 'day').startOf('day')
      const type = getDayType(day)
      const dayItem = {
        date: day,
        type,
        text: day.date().toString(),
        bottomInfo: getDayBottomInfo(day, type),
      }
      return typeof state.formatter === 'function' ? state.formatter(dayItem) : dayItem
    })
  }

  const getDayType = (date: Dayjs): DayItem['type'] => {
    if (date.diff(state.min, 'd') < 0 || date.diff(state.max, 'd') > 0) return 'disabled'
    if (state.type === 'single' || state.type === 'multiple') {
      return selectedItems.value.some((item) => isSameDay(item, date)) ? 'selected' : ''
    } else if (state.type === 'range') {
      if (isSameDay(date, selectedItems.value[0] ?? 0)) {
        return isSameDay(date, selectedItems.value[1] ?? 0) ? 'start-end' : 'start'
      } else if (isSameDay(date, selectedItems.value[1] ?? 0)) {
        return 'end'
      } else if (date > selectedItems.value[0] && date < selectedItems.value[1]) {
        return 'middle'
      }
    }
    return ''
  }

  const getDayBottomInfo = (_date: Dayjs, type: DayItem['type']): DayItem['bottomInfo'] => {
    if (type === 'start') {
      return '开始'
    } else if (type === 'end') {
      return '结束'
    } else if (type === 'start-end') {
      return '开始/结束'
    }
  }

  const onSelect = (value: Dayjs) => {
    switch (state.type) {
      case 'single':
        selectedItems.value = [value]
        break
      case 'multiple':
        if (selectedItems.value.some((item) => isSameDay(item, value))) {
          selectedItems.value = selectedItems.value.filter((item) => !isSameDay(item, value))
          return
        }
        selectedItems.value.push(value)
        break
      case 'range':
        if (selectedItems.value.length === 1) {
          // 判断是否能选择同一天
          if (!state.allowSameDay && isSameDay(selectedItems.value[0], value)) return
          // 最多可选天数
          if (
            typeof state.maxRange !== 'undefined' &&
            Math.abs(selectedItems.value[0].diff(value, 'day')) > state.maxRange
          ) {
            value = selectedItems.value[0].add(state.maxRange - 1, 'day')
          }
        }
        // 区间只能选择2个
        if (selectedItems.value.length >= 2) {
          onClear()
        }
        value > selectedItems.value[0]
          ? selectedItems.value.push(value)
          : selectedItems.value.unshift(value)
        break
    }
  }

  const onClear = () => {
    selectedItems.value = []
  }

  watch(
    () => state.defaultDate,
    (newVal) => {
      const timestamps = Array.isArray(newVal) ? newVal : [newVal]
      timestamps.forEach((timestamp) => {
        onClear()
        onSelect(dayjs(timestamp))
      })
    },
    {
      immediate: true,
    },
  )

  return {
    weekdays,
    months,
    selectedItems,
    getDays,
    getDayType,
    onSelect,
    onClear,
  }
}
