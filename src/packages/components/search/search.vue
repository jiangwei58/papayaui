<template>
  <view :class="computedClass('search')">
    <Field
      :model-value="modelValue"
      class="var(--color-page-bg-gray)"
      icon="search"
      :placeholder="placeholder"
      value-align="left"
      center
      @update:model-value="emit('update:modelValue', $event)"
      @confirm="emit('confirm', $event)"
    />
  </view>
</template>

<script lang="ts" setup>
import { EventDetail } from '../../types'
import { computedClass } from '../../utils/style'
import Field from '../field/field.vue'

export interface SearchProps {
  modelValue?: string
  /** 输入提示 */
  placeholder?: string
}

withDefaults(defineProps<SearchProps>(), {
  modelValue: undefined,
  placeholder: '请输入搜索关键词',
})

const emit = defineEmits<{
  (event: 'update:modelValue', value: string): void
  (event: 'confirm', value: EventDetail<{ value: string }>): void
}>()
</script>

<style lang="scss" scoped>
@import '../../styles/vars.scss';
.#{$prefix}-search {
  @include _setVar(field-input-color, _var(color-text-black));
  @include _setVar(cell-bg-color, var(--color-page-bg-gray));
  @include _setVar(cell-padding-x, 8px);
  @include _setVar(cell-padding-y, 8px);
  padding: 10px 12px;
  background-color: #fff;
}
</style>
