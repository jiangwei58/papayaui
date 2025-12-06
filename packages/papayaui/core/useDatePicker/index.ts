import dayjs from 'dayjs'
import { computed, reactive, ref, toRefs, watch } from 'vue'
import type { IncludeRefs } from '../../types'
import { getRefValue, padZero } from '../../utils'

export type DatePickerColumnType = 'year' | 'month' | 'day' | 'hour' | 'minute'

export type DatePickerFormatter = (
  type: DatePickerColumnType,
  value: DatePickerOption['text'],
) => number | string

export type DatePickerFilter = (
  type: DatePickerColumnType,
  options: DatePickerOption[],
) => DatePickerOption[]

export interface UseDatePickerProps {
  /**
   * 初始值
   * @default - 当天
   */
  modelValue?: Date
  /**
   * 选项类型，由选项组成数组，数据顺序代表排序顺序
   * ```
   * year: 年, month: 月, day: 日, hour: 小时, minute: 分钟
   * ```
   * @default - ['year', 'month', 'day']
   */
  columnsType?: DatePickerColumnType[]
  /**
   * 可选的最小时间，精确到分
   * @default - 十年前
   */
  minDate?: Date
  /**
   * 可选的最大时间，精确到分
   * @default - 十年后
   */
  maxDate?: Date
  /**
   * 选项格式化函数
   */
  formatter?: DatePickerFormatter
  /**
   * 选项过滤函数
   */
  filter?: DatePickerFilter
}

/** 列的每一个选项数据 */
export interface DatePickerOption {
  /** 选项对应的值，且唯一 */
  value: number
  /** 选项的文字内容 */
  text: string
}

export function useDatePicker(props: IncludeRefs<UseDatePickerProps> = {}) {
  const _props = props as UseDatePickerProps

  const columnsSort: DatePickerColumnType[] = ['year', 'month', 'day', 'hour', 'minute']

  const currentYear = new Date().getFullYear()
  const state = reactive({
    modelValue: _props.modelValue,
    columnsType: getRefValue(_props.columnsType, columnsSort.slice(0, 3)),
    minDate: getRefValue(_props.minDate, new Date(currentYear - 10, 0, 1)),
    maxDate: getRefValue(_props.maxDate, new Date(currentYear + 10, 11, 31)),
  })

  const indexes = ref<number[]>(new Array(state.columnsType.length).fill(0))

  const columns = computed(() => {
    let currentDate = dayjs()

    // 按从大到小维度生成数据，确保在任何顺序下低维度可以依赖高纬度的数据
    return columnsSort.reduce<DatePickerOption[][]>((result, type) => {
      if (!state.columnsType.includes(type)) return result
      const [start, end] = getTypeRange(type, currentDate.toDate(), state.minDate, state.maxDate)
      const colIndex = state.columnsType.indexOf(type)

      if (colIndex !== -1) {
        // 生成当前列的选项
        const options = generateOptions(type, start, end, _props.formatter, _props.filter)
        result[colIndex] = options

        // 如果当前列有选中的索引，且对应的选项有效，更新 currentDate 以供下一维度使用
        const selectedIndex = indexes.value[colIndex]
        const selectedOption = options[selectedIndex]
        if (selectedOption) {
          currentDate = currentDate.set(getType(type), selectedOption.value)
        }
      }
      return result
    }, [])
  })

  const getTypeRange = (
    type: DatePickerColumnType,
    currentDate: Date,
    minDate: Date,
    maxDate: Date,
  ): [number, number, Date] => {
    let newDate = dayjs(currentDate)
    switch (type) {
      case 'year':
        return [minDate.getFullYear(), maxDate.getFullYear(), newDate.toDate()]
      case 'month':
      case 'day':
      case 'hour':
      case 'minute': {
        const config: {
          [key in Exclude<DatePickerColumnType, 'year'>]: [number, number]
        } = {
          month: [0, 11],
          day: [1, newDate.daysInMonth()],
          hour: [0, 23],
          minute: [0, 59],
        }
        let start = config[type][0]
        let end = config[type][1]
        // 根据上一维度确定当前维度的数据区间
        const prevType = columnsSort[columnsSort.indexOf(type) - 1]
        if (newDate.isSame(minDate, getType(prevType))) {
          start = dayjs(minDate).get(getType(type))
          newDate = newDate.set(getType(type), start)
        }
        if (newDate.isSame(maxDate, getType(prevType))) {
          end = dayjs(maxDate).get(getType(type))
          newDate = newDate.set(getType(type), end)
        }
        return [start, end, newDate.toDate()]
      }
    }
  }

  const generateOptions = (
    type: DatePickerColumnType,
    start: number,
    end: number,
    formatter?: DatePickerFormatter,
    filter?: DatePickerFilter,
  ) => {
    const options: DatePickerOption[] = []
    for (let index = start; index <= end; index++) {
      const item: DatePickerOption = {
        value: index,
        text: padZero(index + (type === 'month' ? 1 : 0)),
      }
      // 选项格式化
      if (typeof formatter === 'function') {
        item.text = formatter(type, item.text).toString()
      }
      options.push(item)
    }
    // 选项过滤
    return typeof filter === 'function' ? filter(type, options) : options
  }

  const getType = (type: DatePickerColumnType) => {
    // day是指当周的第几天，date才是指当月的第几天，理解容易偏差，所以转换一下
    return type === 'day' ? 'date' : type
  }

  const getSelectedDate = (indexList: number[]) => {
    if (!columns.value?.length) return state.minDate
    let now = dayjs()
    columns.value.forEach((col, colIndex) => {
      const type = state.columnsType[colIndex]
      const option = col[indexList[colIndex]]
      if (option) {
        now = now.set(getType(type), option.value)
      }
    })
    return now.toDate()
  }

  const selectedDate = computed(() => getSelectedDate(indexes.value))

  const updateIndexesByModelValue = () => {
    const date = dayjs(state.modelValue)
    indexes.value = state.columnsType.map((type, colIndex) => {
      return columns.value[colIndex].findIndex((option) => option.value === date.get(getType(type)))
    })
  }

  watch(
    () => state.modelValue,
    () => {
      if (!state.modelValue || !columns.value.length) return
      updateIndexesByModelValue()
    },
    {
      immediate: true,
      flush: 'post',
    },
  )

  const onChangeColumnIndexes = (indexList: number[]) => {
    const newIndexes = indexList
    indexes.value = newIndexes
  }

  return {
    ...toRefs(state),
    indexes,
    columns,
    selectedDate,
    onChangeColumnIndexes,
  }
}
