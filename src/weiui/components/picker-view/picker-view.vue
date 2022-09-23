<template>
  <view
    class="flex flex-col"
    :class="computedClass('picker-view')"
    :style="{ height: getUnitValue(height) }"
  >
    <view
      class="flex items-center justify-between text-32 border-bottom"
      :class="computedClass('picker-view-toolbar')"
    >
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
      :value="pickerIndexs"
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
import { EventDetail } from '../../types'
import { getUnitValue } from '../../utils/common'
import { computedClass } from '../../utils/style'
import { toRefs, ref, watch } from 'vue'

type columnItem = string | Record<string, any>

interface OwnProps {
  columns?: columnItem[]
  showToolbar?: boolean
  title?: string
  height?: string
  valueKey?: string
  defaultIndex?: number
}

const props = withDefaults(defineProps<OwnProps>(), {
  modelValue: () => [],
  columns: () => [],
  showToolbar: true,
  title: '',
  height: '50vh',
  valueKey: 'text',
  defaultIndex: 0,
})

const emit = defineEmits<{
  (event: 'update:modelValue', value: number[]): void
  (event: 'change', value: number[]): void
  (event: 'confirm', value: number[]): void
  (event: 'cancel'): void
}>()

const { columns, valueKey, defaultIndex } = toRefs(props)

const pickerIndexs = ref<number[]>([0])

watch(
  defaultIndex,
  (newVal: number) => {
    pickerIndexs.value = [newVal]
  },
  {
    immediate: true,
  },
)

const optionText = (item: columnItem) => {
  return typeof item === 'object' ? item[valueKey.value] : item
}

const onChange = (event: EventDetail<{ value: number[] }>) => {
  const indexs = event.detail.value
  pickerIndexs.value = indexs
  emit('update:modelValue', indexs)
  emit('change', indexs)
}

const onConfirm = () => {
  emit('confirm', pickerIndexs.value)
}

const onCancel = () => {
  emit('cancel')
}
</script>

<style lang="scss" scoped>
@import '../../styles/vars.scss';
.#{$prefix}-picker-view-toolbar {
  $height: 88rpx;
  height: $height;
  > .btn {
    line-height: $height;
  }
}
.btn-hover {
  opacity: 0.7;
}
</style>
