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

export type Sort = 'up' | 'down' | undefined

export interface SortLabelProps {
  modelValue?: string
  title?: string
  datakey: string
}

enum SortTypeEnum {
  UP = ':asc',
  DOWN = ':desc',
}

const ns = useNamespace('sort-label')

const props = withDefaults(defineProps<SortLabelProps>(), {
  modelValue: undefined,
  title: '',
})

const emit = defineEmits<{
  (event: 'update:modelValue', value?: string): void
  (event: 'change', key: string, sort?: string): void
}>()

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
@import '../../styles/vars.scss';
.#{$prefix}-sort-label {
  display: flex;
  align-items: center;
  justify-content: center;
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
    border-bottom-color: _var(color-primary);
  }
  &.down .sort-down {
    border-top-color: _var(color-primary);
  }
}
</style>
