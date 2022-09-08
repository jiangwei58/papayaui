<template>
  <view class="sort-view flex items-center justify-center" :class="[sort]" @tap="onChange">
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
import { computed, toRefs } from 'vue'

export type Sort = 'up' | 'down' | undefined

enum SortTypeEnum {
  UP = ':asc',
  DOWN = ':desc',
}

interface OwnProps {
  modelValue?: string
  title?: string
  datakey: string
}

const props = withDefaults(defineProps<OwnProps>(), {
  modelValue: undefined,
  title: '',
})

const emit = defineEmits<{
  (evevt: 'update:modelValue', value?: string): void
  (event: 'change', key: string, sort?: string): void
}>()

const { modelValue, title, datakey } = toRefs(props)

const sort = computed<Sort>(() => {
  const value = modelValue.value || ''
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
    newVal = `${datakey.value}${SortTypeEnum.UP}`
  } else {
    newVal = `${datakey.value}${SortTypeEnum.DOWN}`
  }
  emit('update:modelValue', newVal)
  emit('change', datakey.value, newVal)
}
</script>

<style lang="scss" scoped>
.sort-view {
  padding: 24rpx 0;
  .sort-up,
  .sort-down {
    width: 0;
    height: 0;
    border: 8rpx solid transparent;
  }
  .sort-up {
    border-bottom: 8rpx solid #969799;
  }
  .sort-down {
    margin-top: 4rpx;
    border-top: 8rpx solid #969799;
  }

  &.up .sort-up {
    border-bottom-color: var(--color-primary);
  }
  &.down .sort-down {
    border-top-color: var(--color-primary);
  }
}
</style>
