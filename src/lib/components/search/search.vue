<template>
  <view :class="computedClass('search')">
    <Field
      :model-value="modelValue"
      class="var(--color-page-bg-gray)"
      icon="search"
      placeholder="请输入搜索关键词"
      input-align="left"
      center
      @update:model-value="emit('update:modelValue', $event)"
    />
  </view>
</template>

<script lang="ts" setup>
import { computedClass } from '../../utils/style'
import Field from '../field/field.vue'

interface OwnProps {
  modelValue?: string
}

defineProps<OwnProps>()

const emit = defineEmits<{
  (event: 'update:modelValue', value: string): void
}>()
</script>

<style lang="scss" scoped>
@import '../../styles/vars.scss';
.#{$prefix}-search {
  --cell-bg-color: _var(color-page-bg-gray);
  --cell-padding-x: 8px;
  --cell-padding-y: 5px;
  padding: 10px 12px;
  background-color: #fff;
}
</style>
