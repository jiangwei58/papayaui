<template>
  <view
    class="grid"
    :class="[computedClass('checkbox-btns'), `grid-cols-${column}`]"
    :style="{ gap: getUnitValue(gap) }"
  >
    <view
      v-for="(item, index) in options"
      :key="index"
      class="text-black text-center"
      :class="[
        computedClass('checkbox-btn'),
        {
          active: typeof modelValue !== 'undefined' ? isSelected(item[valueKey]) : false,
        },
      ]"
      :style="{
        backgroundColor: bgColor,
        borderColor: bgColor,
        borderRadius: round === true ? getUnitValue('100') : getUnitValue(round),
      }"
      @tap="onSelect(item, index)"
    >
      <slot v-if="$slots.default" :item="item" :index="index" />
      <text v-else>{{ item[labelKey] }}</text>
    </view>
  </view>
</template>

<script lang="ts" setup>
import { toRefs } from 'vue'
import useSelect from '../../core/useSelect'
import { getUnitValue } from '../../utils/common'
import { computedClass } from '../../utils/style'

export type CheckboxItem = any
export type CheckboxValue = any

export interface CheckboxProps {
  /** 列数 */
  column?: number
  /** 间隔 */
  gap?: string
  /** 选中值 */
  modelValue?: CheckboxValue
  /** 选项列表 */
  options?: CheckboxItem[]
  /** 标题对应字段名 */
  labelKey?: string
  /** 内容对应字段名 */
  valueKey?: string
  /** 是否多选 */
  multiple?: boolean
  /** 背景色 */
  bgColor?: string
  /** 圆角大小, 值为true时半圆角 */
  round?: true | string
  /** 是否支持反选 */
  inverse?: boolean
}

const props = withDefaults(defineProps<CheckboxProps>(), {
  column: 3,
  gap: '20',
  modelValue: undefined,
  options: () => [],
  labelKey: 'label',
  valueKey: 'value',
  multiple: false,
  bgColor: '#F2F3F5',
  round: '4rpx',
  inverse: true,
})

const emit = defineEmits<{
  (event: 'update:modelValue', value: CheckboxProps['modelValue']): void
  (event: 'change', item: CheckboxItem, index: number): void
}>()

const { options, valueKey, modelValue, multiple, inverse } = toRefs(props)

const {
  selectedItems,
  selectedValues,
  onSelect: _onSelect,
  isSelected,
} = useSelect<CheckboxItem, CheckboxValue>({
  options,
  valueKey,
  defaultValue: modelValue,
  multiple,
  inverse,
})

const onSelect = (item: CheckboxItem, index: number) => {
  _onSelect(item[valueKey.value])
  emit('update:modelValue', selectedValues.value)
  emit('change', selectedItems.value, index)
}
</script>

<style lang="scss" scoped>
@import '../../styles/vars.scss';
.#{$prefix}-checkbox {
  &-btn {
    font-size: _var(checkbox-btns-font-size, 14px);
    padding: _var(checkbox-btns-padding, 7px 4px);
    border-width: _var(checkbox-btns-border-width, 2rpx);
    border-style: solid;
    &.active {
      color: _var(color-primary);
      background-color: rgba(0, 156, 93, 0.1) !important;
      border-color: _var(color-primary) !important;
    }
  }
}
</style>
