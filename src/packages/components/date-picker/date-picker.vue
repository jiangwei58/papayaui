<template>
  <view :class="ns.b()">
    <slot name="columns-top" />

    <view v-if="showToolbar" :class="ns.b('toolbar')" class="border-bottom">
      <view :class="ns.e('btn')" class="text-black" hover-class="btn-hover" @click="onCancel">
        <slot v-if="$slots.cancel" />
        <template v-else>{{ cancelButtonText }}</template>
      </view>
      <slot v-if="$slots.title" name="title" />
      <view v-else :class="ns.e('title')">{{ title }}</view>
      <view :class="ns.e('btn')" class="color-primary" hover-class="btn-hover" @click="onConfirm">
        <slot v-if="$slots.confirm" />
        <template v-else>{{ confirmButtonText }}</template>
      </view>
    </view>

    <picker-view
      :class="ns.b('columns')"
      :indicator-style="`height: ${getUnitValue(optionHeight, 'px')}`"
      :immediate-change="false"
      :value="indexes"
      :style="{
        height: `calc(${getUnitValue(optionHeight, 'px')} * ${visibleOptionNum})`,
      }"
      @change="onChange"
    >
      <picker-view-column v-for="(col, colIndex) in _columnsType" :key="col">
        <template v-for="item in columns[colIndex]" :key="item.value">
          <slot v-if="$slots.option" :option="item" :type="col" :colIndex="colIndex" />
          <view v-else :class="ns.b('column')">
            {{ item.text }}
          </view>
        </template>
      </picker-view-column>
    </picker-view>

    <slot name="columns-bottom" />
  </view>
</template>

<script lang="ts" setup>
import { toRefs } from 'vue'
import useDatePicker, {
  DatePickerColumnType,
  DatePickerFilter,
  DatePickerFormatter,
} from '../../core/useDatePicker'
import useNamespace from '../../core/useNamespace'
import { EventDetail } from '../../types'
import { getUnitValue } from '../../utils/common'

export type columnItem = string | Record<string, any>

export interface PickerViewProps {
  /** 值 */
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
  /** 顶部栏标题 */
  title?: string
  /**
   * 是否显示顶部栏
   * @description 启用时只有confirm会触发modelValue更新，禁用时change会触发modelValue更新
   */
  showToolbar?: boolean
  /** 确认按钮文字 */
  confirmButtonText?: string
  /** 取消按钮文字 */
  cancelButtonText?: string
  /** 选项高度 */
  optionHeight?: number
  /** 可见选项个数 */
  visibleOptionNum?: number
  /** 选项格式化函数 */
  formatter?: DatePickerFormatter
  /** 选项过滤函数 */
  filter?: DatePickerFilter
}

const ns = useNamespace('date-picker')

const props = withDefaults(defineProps<PickerViewProps>(), {
  modelValue: undefined,
  columnsType: undefined,
  minDate: undefined,
  maxDate: undefined,
  title: '',
  showToolbar: true,
  confirmButtonText: '确认',
  cancelButtonText: '取消',
  optionHeight: 44,
  visibleOptionNum: 6,
  formatter: undefined,
  filter: undefined,
})

const emit = defineEmits<{
  (event: 'update:modelValue', value: Date): void
  (event: 'change', value: Date): void
  (event: 'confirm', value: Date): void
  (event: 'cancel'): void
}>()

const { modelValue, columnsType, minDate, maxDate } = toRefs(props)

const {
  columnsType: _columnsType,
  indexes,
  selectedDate,
  columns,
  onChangeColumnIndexes,
} = useDatePicker({
  modelValue,
  columnsType,
  minDate,
  maxDate,
  formatter: props.formatter,
  filter: props.filter,
})

const onChange = (event: EventDetail<{ value: number[] }>) => {
  onChangeColumnIndexes(event.detail.value)
  emit('change', selectedDate.value)
  if (!props.showToolbar) {
    emit('update:modelValue', selectedDate.value)
  }
}

const onConfirm = () => {
  emit('update:modelValue', selectedDate.value)
  emit('confirm', selectedDate.value)
}

const onCancel = () => {
  emit('cancel')
}
</script>

<style lang="scss" scoped>
@import '../../styles/vars.scss';

.#{$prefix}-date-picker {
  $toolbarHeight: 88rpx;

  display: flex;
  flex-direction: column;

  &-toolbar {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: $toolbarHeight;
    font-size: 32rpx;
    background-color: #fff;
  }

  &__title {
    font-weight: 500;
    line-height: 42rpx;
    color: _var(color-black);
  }

  &__btn {
    font-size: 28rpx;
    line-height: $toolbarHeight;
    height: 100%;
    padding: 0 32rpx;
  }

  &-column {
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
  }
}

.btn-hover {
  opacity: 0.7;
}
</style>
