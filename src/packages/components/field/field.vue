<template>
  <Cell :class="[ns.b(), ns.is('only-input', onlyInput)]" :border="false" v-bind="$props">
    <view :class="ns.e('body')" @tap="emit('click-input', $event)">
      <input
        v-if="type !== 'textarea'"
        :class="ns.e('input')"
        :type="type"
        :value="modelValue"
        :disabled="disabled || readonly"
        :placeholder="placeholder"
        :placeholder-style="`color:var(${ns.cssVarName('number-input-placeholder-color')}`"
        :style="{ textAlign: valueAlign }"
        :maxlength="maxlength"
        :focus="focus"
        :confirm-type="confirmType"
        :confirm-hold="confirmHold"
        :cursor="cursor"
        :selection-start="selectionStart"
        :selection-end="selectionEnd"
        :adjust-position="adjustPosition"
        :always-embed="alwaysEmbed"
        :hold-keyboard="holdKeyboard"
        @input="onInput"
        @blur="emit('blur', $event)"
        @confirm="emit('confirm', $event)"
      />
      <textarea
        v-else
        :class="ns.e('input')"
        :value="modelValue"
        :disabled="disabled || readonly"
        :placeholder="placeholder"
        :placeholder-style="`color:var(${ns.cssVarName('number-input-placeholder-color')})`"
        :style="{ textAlign: valueAlign, width: '100%', height: getUnitValue(height) }"
        :auto-height="autoHeight"
        :maxlength="maxlength"
        :focus="focus"
        :confirm-type="confirmType"
        :confirm-hold="confirmHold"
        :cursor="cursor"
        :selection-start="selectionStart"
        :selection-end="selectionEnd"
        :adjust-position="adjustPosition"
        :hold-keyboard="holdKeyboard"
        @input="onInput"
        @blur="emit('blur', $event)"
        @confirm="emit('confirm', $event)"
      />
      <IconComponent
        v-if="!disabled && clearable && !!modelValue"
        name="round-close-fill"
        :class="ns.e('icon')"
        @tap.stop="onClear"
      />
    </view>
  </Cell>
</template>

<script lang="ts" setup>
import useNamespace from '../../core/useNamespace'
import type { EventDetail } from '../../types'
import { getUnitValue } from '../../utils'
import Cell from '../cell/cell.vue'
import IconComponent from '../icon/icon.vue'
import { fieldEmits, fieldProps } from './props'

const ns = useNamespace('field')

defineProps(fieldProps)
const emit = defineEmits(fieldEmits)

const onInput = (payload: Event) => {
  const value = (payload as unknown as EventDetail<{ value: string }>).detail.value
  emit('update:modelValue', value)
  emit('input', value)
}

const onClear = () => {
  emit('update:modelValue', '')
  emit('clear')
}
</script>

<style lang="scss" scoped>
@import './field.scss';
</style>
