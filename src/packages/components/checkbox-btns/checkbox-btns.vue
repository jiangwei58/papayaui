<template>
  <view
    class="grid"
    :class="[computedClass('checkbox-btns'), `grid-cols-${column}`]"
    :style="{ gap: getUnitValue(gap) }"
  >
    <view
      v-for="(item, index) in options"
      :key="index"
      class="text-black rounded-4 text-center"
      :class="[
        computedClass('checkbox-btn'),
        {
          active:
            typeof modelValue !== 'undefined'
              ? Array.isArray(modelValue)
                ? modelValue.includes(item[valueKey])
                : item[valueKey] === modelValue
              : false,
        },
      ]"
      :style="{ backgroundColor: bgColor, borderColor: bgColor }"
      @tap="onSelect(item, index)"
    >
      {{ item[labelKey] }}
    </view>
  </view>
</template>

<script lang="ts" setup>
import { getUnitValue } from '../../utils/common'
import { computedClass } from '../../utils/style'

export type CheckboxItem = Record<string, unknown>

export interface CheckboxProps {
  /** 列数 */
  column?: number
  /** 间隔 */
  gap?: string
  modelValue?: any
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
})

const emit = defineEmits<{
  (event: 'update:modelValue', value: CheckboxProps['modelValue']): void
  (event: 'change', item: any, index: number): void
}>()

const onSelect = (item: CheckboxItem, index: number) => {
  if (props.multiple && Array.isArray(props.modelValue)) {
    let exist = false
    const newVal = props.modelValue.filter((val) => {
      if (val === item[props.valueKey]) {
        exist = true
        return false
      }
      return true
    })
    if (!exist) {
      newVal.push(item[props.valueKey])
    }
    emit('update:modelValue', newVal)
    emit(
      'change',
      props.options.filter((option) => newVal.includes(option.value)),
      index,
    )
  } else {
    emit('update:modelValue', item[props.valueKey])
    emit('change', item, index)
  }
}
</script>

<style lang="scss" scoped>
@import '../../styles/vars.scss';
.#{$prefix}-checkbox-btns {
  .#{$prefix}-checkbox-btn {
    font-size: _var(checkbox-btns-font-size);
    line-height: _var(checkbox-btns-height);
    border-width: 2rpx;
    border-style: solid;
    &.active {
      color: _var(color-primary);
      background-color: rgba(0, 156, 93, 0.1) !important;
      border-color: _var(color-primary) !important;
    }
  }
}
</style>
