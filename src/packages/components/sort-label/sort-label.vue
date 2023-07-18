<template>
  <view :class="[ns.b(), sort]" @tap="onChange">
    <text class="text-28 leading-40" :class="[sort ? 'color-primary' : 'text-black-2']">
      {{ title }}
    </text>
    <view class="ml-8">
      <view class="sort-up"></view>
      <view class="sort-down"></view>
    </view>
  </view>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import useNamespace from '../../core/useNamespace'
import type { Sort } from './props'
import { sortLabelEmits, sortLabelProps, SortTypeEnum } from './props'

const ns = useNamespace('sort-label')

const props = defineProps(sortLabelProps)
const emit = defineEmits(sortLabelEmits)

const sort = computed<Sort>(() => {
  const value = props.modelValue || ''
  if (value.endsWith(SortTypeEnum.DOWN)) {
    return 'down'
  } else if (value.endsWith(SortTypeEnum.UP)) {
    return 'up'
  } else {
    return undefined
  }
})

const onChange = () => {
  let newVal: string | undefined
  if (sort.value === 'down') {
    newVal = `${props.datakey}${SortTypeEnum.UP}`
  } else {
    newVal = `${props.datakey}${SortTypeEnum.DOWN}`
  }
  emit('update:modelValue', newVal)
  emit('change', props.datakey, newVal)
}
</script>

<style lang="scss" scoped>
@import './sort-label.scss';
</style>
