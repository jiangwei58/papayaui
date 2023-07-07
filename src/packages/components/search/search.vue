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
@import './search.scss';
</style>
