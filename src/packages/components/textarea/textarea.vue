<template>
  <view :class="[ns.b(), ns.is('auto-height', autoHeight), ns.is('disabled', disabled)]">
    <textarea
      :class="ns.e('textarea')"
      :style="customStyle"
      :value="modelValue"
      :placeholder="placeholder"
      :placeholder-class="ns.e('placeholder')"
      :disabled="readonly || disabled"
      :maxlength="maxlength"
      :auto-height="autoHeight"
      :confirm-type="confirmType"
      :focus="focus"
      :fixed="fixed"
      :cursor-spacing="cursorSpacing"
      :cursor="cursor"
      :show-confirm-bar="showConfirmBar"
      :selection-start="selectionStart"
      :selection-end="selectionEnd"
      :adjust-position="adjustPosition"
      :disable-default-padding="disableDefaultPadding"
      :hold-keyboard="holdKeyboard"
      @input="onInput"
      @focus="emit('focus', $event)"
      @blur="emit('blur', $event)"
      @confirm="emit('confirm', $event)"
      @linechange="emit('linechange', $event)"
      @keyboardheightchange="emit('keyboardheightchange', $event)"
    />
    <view v-if="showCount" :class="ns.e('limit')">
      {{ modelValue ? modelValue.length : '0' }}/{{ maxlength }}
    </view>
  </view>
</template>

<script lang="ts" setup>
import { computed, type CSSProperties } from 'vue'
import useNamespace from '../../core/useNamespace'
import type { EventDetail } from '../../types'
import { getUnitValue } from '../../utils'
import { textareaEmits, textareaProps } from './props'

const ns = useNamespace('textarea')

const props = defineProps(textareaProps)
const emit = defineEmits(textareaEmits)

const customStyle = computed(() => {
  const style: CSSProperties = {}
  if (props.height && !props.autoHeight) {
    style.height = getUnitValue(props.height)
  }
  if (props.inputAlign !== textareaProps.inputAlign.default) {
    style.textAlign = props.inputAlign
  }
  return style
})

const onInput = (e: Event) => {
  const value = (e as unknown as EventDetail<{ value: string }>).detail.value
  emit('update:modelValue', value)
  emit('input', e)
}
</script>

<style lang="scss">
@import './textarea.scss';
</style>
