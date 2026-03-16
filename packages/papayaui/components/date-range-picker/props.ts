import type { ExtractPropTypes, ExtractPublicPropTypes, PropType } from 'vue'
import type {
  DatePickerColumnType,
  DatePickerFilter,
  DatePickerFormatter,
} from '../../core/useDatePicker'
import { isDate } from '../../utils'

export const dateRangePickerProps = {
  /**
   * 开始时间
   */
  start: Date,
  /**
   * 结束时间
   */
  end: Date,
  /**
   * 选项类型
   */
  columnsType: {
    type: Array as PropType<DatePickerColumnType[]>,
    default: () => ['year', 'month', 'day'],
  },
  /**
   * 可选的最小时间，精确到分
   */
  minDate: Date,
  /**
   * 可选的最大时间，精确到分
   */
  maxDate: Date,
  /**
   * 顶部栏标题
   */
  title: {
    type: String,
    default: '选择时间区间',
  },
  /**
   * 是否显示顶部栏
   * @description 启用时只有 confirm 会触发值更新，禁用时 change 会触发更新
   */
  showToolbar: {
    type: Boolean,
    default: true,
  },
  /**
   * 选项高度
   */
  optionHeight: {
    type: Number,
    default: 44,
  },
  /**
   * 可见选项个数
   */
  visibleOptionNum: {
    type: Number,
    default: 6,
  },
  /**
   * 选项格式化函数
   */
  formatter: Function as PropType<DatePickerFormatter>,
  /**
   * 选项过滤函数
   */
  filter: Function as PropType<DatePickerFilter>,
  /**
   * 是否允许结束时间早于开始时间
   */
  allowReverse: {
    type: Boolean,
    default: false,
  },
  /**
   * 开始时间标签
   */
  startLabel: String,
  /**
   * 结束时间标签
   */
  endLabel: String,
  /**
   * 确认按钮文字
   */
  confirmButtonText: {
    type: String,
    default: '确认',
  },
  /**
   * 取消按钮文字
   */
  cancelButtonText: {
    type: String,
    default: '取消',
  },
} as const

export const dateRangePickerEmits = {
  'update:start': (value: Date) => isDate(value),
  'update:end': (value: Date) => isDate(value),
  change: (value: { start: Date; end: Date }) => isDate(value.start) && isDate(value.end),
  confirm: (value: { start: Date; end: Date }) => isDate(value.start) && isDate(value.end),
  cancel: () => true,
}

export type DateRangePickerProps = ExtractPropTypes<typeof dateRangePickerProps>
export type DateRangePickerPropsPublic = ExtractPublicPropTypes<typeof dateRangePickerProps>

export type DateRangePickerEmits = typeof dateRangePickerEmits
