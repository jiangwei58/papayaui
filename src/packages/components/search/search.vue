<template>
  <view
    :class="[ns.b(), ns.m(shape)]"
    class="flex items-center"
    :style="ns.style({ backgroundColor: background })"
  >
    <slot name="before" />
    <view
      :class="ns.b('input')"
      class="flex items-center"
      :style="ns.style({ backgroundColor: inputBackground })"
    >
      <slot name="prefix" />
      <Field
        class="flex-1"
        :model-value="modelValue"
        icon="search"
        :disabled="disabled"
        :readonly="readonly"
        :placeholder="placeholder"
        :value-align="inputAlign"
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
import useNamespace from '../../core/useNamespace'
import Field from '../field/field.vue'
import { searchEmits, searchProps } from './props'

const ns = useNamespace('search')

defineProps(searchProps)
const emit = defineEmits(searchEmits)

const onUpdate = (value: string) => {
  emit('update:modelValue', value)
  emit('change', value)
}
</script>

<style lang="scss" scoped>
@import '../../styles/vars.scss';
.#{$prefix}-search {
  @include _setVar(field-input-color, _var(color-black));
  @include _setVar(number-input-placeholder-color, #c8c9cc);
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
