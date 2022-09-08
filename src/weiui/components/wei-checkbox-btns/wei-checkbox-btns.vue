<template>
  <view
    class="wei-checkbox-btns"
    :style="{ gridTemplateColumns: `repeat(${column}, 1fr)`, gap: getUnitValue(gap) }"
  >
    <view
      v-for="(item, index) in options"
      :key="index"
      class="wei-checkbox-btn"
      :class="{
        active: Array.isArray(modelValue)
          ? modelValue.includes(item[valueKey])
          : item[valueKey] === modelValue,
      }"
      :style="{ backgroundColor: bgColor, borderColor: bgColor }"
      @tap="onSelect(item, index)"
      >{{ item[labelKey] }}</view
    >
  </view>
</template>

<script lang="ts" setup>
import { toRefs } from 'vue'
import { getUnitValue } from '../../utils/common'

export type WeiCheckboxItem = Record<string, unknown>

interface OwnProps {
  column?: number
  gap?: string
  modelValue?: any
  options?: WeiCheckboxItem[]
  labelKey?: string
  valueKey?: string
  multiple?: boolean
  bgColor?: string
}

const props = withDefaults(defineProps<OwnProps>(), {
  column: 3,
  gap: '0',
  modelValue: undefined,
  options: () => [],
  labelKey: 'label',
  valueKey: 'value',
  multiple: false,
  bgColor: '#fff',
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
.wei-checkbox-btns {
  display: grid;
  .wei-checkbox-btn {
    line-height: 64rpx;
    height: 64rpx;
    font-size: 30rpx;
    color: var(--text-color-black);
    border-radius: 4rpx;
    text-align: center;
    border-width: 2rpx;
    border-style: solid;
    &.active {
      color: var(--color-primary);
      background-color: rgba(0, 156, 93, 0.1) !important;
      border-color: var(--color-primary) !important;
    }
  }
}
</style>
