import type { Dayjs } from 'dayjs'
import type { ExtractPropTypes, PropType } from 'vue'
import type { DayItem, FirstDayOfWeekType } from '../../core/useCalendar'
import { isArray, isDate, isObject, pick } from '../../utils'
import { popupEmits, popupProps } from '../popup/props'

export type CalendarValue = Date | Date[]

/**
 * 当 type 为 range 时支持
 */
export const RangeProps = {
  /**
   * 是否允许日期范围的起止时间为同一天
   */
  allowSameDay: Boolean,
  /**
   * 日期区间最多可选天数，默认无限制
   */
  maxRange: Number,
  /**
   * 是否显示选择结果文字
   * @description 底部显示当前选中的日期，多选','分隔，范围'~'分隔
   */
  showResultText: Boolean,
}

export const calendarWrapperProps = {
  /**
   * 选择类型
   * @description single表示选择单个日期，multiple表示选择多个日期，range表示选择日期区间
   */
  type: {
    type: String as PropType<'single' | 'multiple' | 'range'>,
    default: 'single',
  },
  /**
   * 标题
   */
  title: {
    type: String,
    default: '日期选择',
  },
  /**
   * 可选择的最小日期
   */
  minDate: {
    type: Number,
    default: Date.now(),
  },
  /**
   * 可选择的最大日期
   */
  maxDate: {
    type: Number,
    default: Date.now() + 1000 * 60 * 60 * 24 * 180,
  },
  /**
   * 默认选中的日期，type 为 multiple 或 range 时为数组
   */
  defaultDate: {
    type: [Number, Array] as PropType<number | number[]>,
    default: Date.now(),
  },
  /**
   * 日期格式化函数
   */
  formatter: Function as PropType<(day: DayItem) => DayItem>,
  /**
   * 是否显示月份背景水印
   */
  showMark: {
    type: Boolean,
    default: true,
  },
  /**
   * 是否展示日历标题
   */
  showTitle: {
    type: Boolean,
    default: true,
  },
  /**
   * 是否展示日历副标题（年月）
   */
  showSubtitle: {
    type: Boolean,
    default: true,
  },
  /**
   * 是否展示确认按钮
   */
  showConfirm: {
    type: Boolean,
    default: true,
  },
  /**
   * 确认按钮的文字
   */
  confirmText: {
    type: String,
    default: '确定',
  },
  /**
   * 确认按钮处于禁用状态时的文字
   */
  confirmDisabledText: {
    type: String,
    default: '确定',
  },
  /**
   * 设置周起始日, 0代表周日开始
   */
  firstDayOfWeek: {
    type: Number as PropType<FirstDayOfWeekType>,
    default: 0,
  },
  /**
   * 是否为只读状态，只读状态下不能选择日期
   */
  readonly: Boolean,
  /**
   * 是否圆角
   */
  round: {
    type: popupProps.round,
    default: true,
  },
  /**
   * 是否适配底部安全区
   */
  safeAreaInsetBottom: popupProps.safeAreaInsetBottom,
  ...RangeProps,
}

export const calendarProps = {
  /**
   * 是否以弹层的形式展示日历
   */
  poppable: {
    type: Boolean,
    default: true,
  },
  /**
   * 高度
   */
  height: {
    type: popupProps.height,
    default: '80vh',
  },
  /**
   * 当 poppable 为 true 时支持
   */
  ...pick(popupProps, ['show', 'closeOnClickOverlay']),

  ...calendarWrapperProps,
}

export const calendarWrapperEmits = {
  confirm: (value: Dayjs[]) => isArray(value),
  select: (value: DayItem) => isObject(value),
}

export const calendarEmits = {
  ...popupEmits,
  confirm: (value: CalendarValue) => isDate(value) || isArray(value),
  select: (value: CalendarValue) => isDate(value) || isArray(value),
}

export type CalendarProps = ExtractPropTypes<typeof calendarProps>
export type CalendarWrapperProps = ExtractPropTypes<typeof calendarWrapperProps>
export type CalendarEmits = typeof calendarEmits
export type CalendarWrapperEmits = typeof calendarWrapperEmits
