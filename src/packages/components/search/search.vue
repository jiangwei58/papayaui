<template>
  <view
    :class="computedClass('search', { [`search--${shape}`]: true })"
    class="flex items-center"
    :style="computedStyle({ backgroundColor: background })"
  >
    <slot name="before" />
    <view
      :class="computedClass('search-input')"
      class="flex items-center"
      :style="computedStyle({ backgroundColor: inputBackground })"
    >
      <slot name="prefix" />
      <Field
        class="flex-1"
        :model-value="modelValue"
        icon="search"
        :disabled="disabled"
        :placeholder="placeholder"
        value-align="left"
        center
        :clearable="clearable"
        @update:model-value="onUpdate"
        @confirm="emit('confirm', $event)"
        @clear="emit('clear')"
        @click-input="emit('click-input')"
      />
      <slot name="suffix" />
    </view>
    <slot name="after" />
  </view>
</template>

<script lang="ts" setup>
import { CSSProperties } from 'vue'
import { EventDetail } from '../../types'
import { computedClass, computedStyle } from '../../utils/style'
import Field, { FieldProps } from '../field/field.vue'

export interface SearchProps {
  /** 值 */
  modelValue?: string
  /** 搜索框形状 */
  shape?: 'square' | 'round'
  /** 输入提示 */
  placeholder?: FieldProps['placeholder']
  /** 是否显示清除控件 */
  clearable?: FieldProps['clearable']
  /** 是否禁用输入框 */
  disabled?: FieldProps['disabled']
  /** 搜索框背景色 */
  background?: CSSProperties['background-color']
  /** 搜索框内部背景色 */
  inputBackground?: CSSProperties['background-color']
}

withDefaults(defineProps<SearchProps>(), {
  modelValue: undefined,
  shape: 'square',
  placeholder: '请输入搜索关键词',
  clearable: true,
  disabled: false,
  background: undefined,
  inputBackground: undefined,
})

const emit = defineEmits<{
  (event: 'update:modelValue', value: string): void
  (event: 'change', value: string): void
  (event: 'confirm', value: EventDetail<{ value: string }>): void
  (event: 'clear'): void
  (event: 'click-input'): void
}>()

const onUpdate = (value: string) => {
  emit('update:modelValue', value)
  emit('change', value)
}
</script>

<style lang="scss" scoped>
@import '../../styles/vars.scss';
.#{$prefix}-search {
  @include _setVar(field-input-color, _var(color-text-black));
  @include _setVar(cell-bg-color, transparent);
  @include _setVar(cell-padding-x, 8px);
  @include _setVar(cell-padding-y, 8px);
  padding: _var(search-padding, 10px 12px);
  background-color: _var(search-bg-color, #fff);
  &-input {
    flex: 1;
    background-color: _var(search-input-bg-color, var(--color-page-bg-gray));
    border-radius: 3px;
  }
  &--round &-input {
    border-radius: 100px;
  }
}
</style>
