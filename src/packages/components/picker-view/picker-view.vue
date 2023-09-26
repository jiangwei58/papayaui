<template>
  <view class="flex flex-col" :class="ns.b()" :style="{ height: getUnitValue(height) }">
    <view class="flex items-center justify-between text-32 border-bottom" :class="ns.b('toolbar')">
      <view class="btn height-full text-black px-32" hover-class="btn-hover" @click="onCancel"
        >取消</view
      >
      <view class="font-w-500 leading-42 text-black">{{ title }}</view>
      <view class="btn height-full color-primary px-32" hover-class="btn-hover" @click="onConfirm"
        >确认</view
      >
    </view>
    <picker-view
      class="base-picker-view flex-1"
      indicator-style="height: 44px"
      :immediate-change="true"
      :value="pickerIndexes"
      @change="onChange"
    >
      <picker-view-column>
        <view
          v-for="(item, index) in columns"
          :key="index"
          class="flex items-center justify-center text-center"
          >{{ optionText(item) }}</view
        >
      </picker-view-column>
    </picker-view>
  </view>
</template>

<script lang="ts" setup>
import { ref, toRefs, watch } from 'vue'
import useNamespace from '../../core/useNamespace'
import type { EventDetail } from '../../types'
import { getUnitValue } from '../../utils'
import type { PickerViewColumnItem } from './props'
import { pickerViewEmits, pickerViewProps } from './props'

const ns = useNamespace('picker-view')

const props = defineProps(pickerViewProps)
const emit = defineEmits(pickerViewEmits)

const { defaultIndex } = toRefs(props)

const pickerIndexes = ref<number[]>([0])

watch(
  defaultIndex,
  (newVal: number) => {
    pickerIndexes.value = [newVal]
  },
  {
    immediate: true,
  },
)

const optionText = (item: PickerViewColumnItem) => {
  return typeof item === 'object' ? item[props.valueKey] : item
}

const onChange = (event: EventDetail<{ value: number[] }>) => {
  const indexes = event.detail.value
  pickerIndexes.value = indexes
  emit('update:modelValue', indexes)
  emit('change', indexes)
}

const onConfirm = () => {
  emit('confirm', pickerIndexes.value)
}

const onCancel = () => {
  emit('cancel')
}
</script>

<style lang="scss">
@import './picker-view.scss';
</style>
