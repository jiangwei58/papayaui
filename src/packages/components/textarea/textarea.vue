<template>
  <view :class="[ns.b(), ns.is('disabled', disabled)]">
    <textarea
      :class="ns.e('textarea')"
      :style="{ height: autoHeight ? 'auto' : getUnitValue(height), textAlign: inputAlign }"
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
import useNamespace from '../../core/useNamespace'
import { EventDetail } from '../../types'
import { getUnitValue } from '../../utils'
import { textareaEmits, textareaProps } from './props'

const ns = useNamespace('textarea')

defineProps(textareaProps)
const emit = defineEmits(textareaEmits)

const onInput = (e: Event) => {
  const value = (e as unknown as EventDetail<{ value: string }>).detail.value
  emit('update:modelValue', value)
  emit('input', e)
}
</script>

<style lang="scss" scoped>
@import '../../styles/vars.scss';

.#{$prefix}-textarea {
  position: relative;
  display: flex;
  width: 100%;
  background-color: #fff;
  padding: _var(textarea-padding, 10px 25px);
  font-size: _var(textarea-font-size, 14px);
  color: _var(textarea-color, _var(color-black));
  line-height: _var(textarea-line-height, 24px);
  &__textarea {
    width: inherit;
    font: inherit;
    color: inherit;
    line-height: inherit;
  }
  &__limit {
    position: absolute;
    right: 15px;
    bottom: 12px;
    font-size: _var(textarea-font-size, 14px);
    color: gray;
  }
  :deep(.#{$prefix}-textarea__placeholder) {
    color: _var(textarea-placeholder-color, #c8c9cc);
  }
  &--disabled {
    color: _var(textarea-disabled-color, #c8c9cc);
  }
}
</style>
