<template>
  <view
    class="grid"
    :class="[computedClass('checkbox-btns'), `grid-cols-${column}`]"
    :style="{ gap: getUnitValue(gap) }"
  >
    <view
      v-for="(item, index) in options"
      :key="index"
      class="text-30 text-black rounded-4 text-center"
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
      >{{ item[labelKey] }}</view
    >
  </view>
</template>

<script lang="ts" setup>
import { toRefs } from 'vue'
import { getUnitValue } from '../../utils/common'
import { computedClass } from '../../utils/style'

export type WeiCheckboxItem = Record<string, unknown>

interface OwnProps {
  /** 列数 */
  column?: number
  /** 间隔 */
  gap?: string
  modelValue?: any
  /** 选项列表 */
  options?: WeiCheckboxItem[]
  /** 标题对应字段名 */
  labelKey?: string
  /** 内容对应字段名 */
  valueKey?: string
  /** 是否多选 */
  multiple?: boolean
  /** 背景色 */
  bgColor?: string
}

const props = withDefaults(defineProps<OwnProps>(), {
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
  (event: 'update:modelValue', value: OwnProps['modelValue']): void
  (event: 'change', item: any, index: number): void
}>()

const { modelValue, options, valueKey, multiple } = toRefs(props)

const onSelect = (item: WeiCheckboxItem, index: number) => {
  if (multiple.value && Array.isArray(modelValue.value)) {
    let exist = false
    const newVal = modelValue.value.filter((val) => {
      if (val === item[valueKey.value]) {
        exist = true
        return false
      }
      return true
    })
    if (!exist) {
      newVal.push(item[valueKey.value])
    }
    emit('update:modelValue', newVal)
    emit(
      'change',
      options.value.filter((option) => newVal.includes(option.value)),
      index,
    )
  } else {
    emit('update:modelValue', item[valueKey.value])
    emit('change', item, index)
  }
}
</script>

<style lang="scss" scoped>
@import '../../styles/vars.scss';
.#{$prefix}-checkbox-btns {
  .#{$prefix}-checkbox-btn {
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
