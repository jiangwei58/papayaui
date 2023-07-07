import type { ExtractPropTypes, PropType } from 'vue'
import {
  DatePickerColumnType,
  DatePickerFilter,
  DatePickerFormatter,
} from '../../core/useDatePicker'
import { isDate } from '../../utils'

export const datePickerProps = {
  /**
   * 值
   */
  modelValue: Date,
  /**
   * 选项类型，由选项组成数组，数据顺序代表排序顺序
   * ```
   * year: 年, month: 月, day: 日, hour: 小时, minute: 分钟
   * ```
   * @default - ['year', 'month', 'day']
   */
  columnsType: Array as PropType<DatePickerColumnType[]>,
  /**
   * 可选的最小时间，精确到分
   * @default - 十年前
   */
  minDate: Date,
  /**
   * 可选的最大时间，精确到分
   * @default - 十年后
   */
  maxDate: Date,
  /**
   * 顶部栏标题
   */
  title: {
    type: String,
    default: '',
  },
  /**
   * 是否显示顶部栏
   * @description 启用时只有confirm会触发modelValue更新，禁用时change会触发modelValue更新
   */
  showToolbar: {
    type: Boolean,
    default: true,
  },
  /**
   * 是否显示列标题栏
   */
  showColumnsHeader: Boolean,
  /**
   * 列标题名称
   * @default - 默认根据列的类型自动匹配显示，如：year -> 年
   */
  columnsHeader: [Array, Function] as PropType<
    string[] | ((types: DatePickerColumnType[]) => string[])
  >,
  /**
   *  确认按钮文字
   */
  confirmButtonText: {
    type: String,
    default: '确认',
  },
  /**
   *  取消按钮文字
   */
  cancelButtonText: {
    type: String,
    default: '取消',
  },
  /**
   *  选项高度
   */
  optionHeight: {
    type: Number,
    default: 44,
  },
  /**
   *  可见选项个数
   */
  visibleOptionNum: {
    type: Number,
    default: 6,
  },
  /**
   *  选项格式化函数
   */
  formatter: Function as PropType<DatePickerFormatter>,
  /**
   *  选项过滤函数
   */
  filter: Function as PropType<DatePickerFilter>,
}

export const datePickerEmits = {
  'update:modelValue': (value: Date) => isDate(value),
  change: (value: Date) => isDate(value),
  confirm: (value: Date) => isDate(value),
  cancel: () => true,
}

export type columnItem = string | Record<string, any>

export type DatePickerProps = ExtractPropTypes<typeof datePickerProps>
export type datePickerEmits = typeof datePickerEmits
