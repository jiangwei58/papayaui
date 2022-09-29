<template>
  <Cell :class="computedClass('field')" v-bind="$props">
    <view :class="computedClass('field__body')">
      <input
        :class="computedClass('field__input')"
        :type="type"
        :value="modelValue"
        :placeholder="placeholder"
        placeholder-style="color:var(--color-text-black-3)"
        :style="{ textAlign: inputAlign }"
        @input="onInput"
        @blur="emit('blur', $event as unknown as EventDetail<string>)"
      />
    </view>
    <view
      v-if="errorMessage"
      :class="computedClass('field__error-message')"
      :style="{ textAlign: inputAlign }"
    >
      {{ errorMessage }}
    </view>
  </Cell>
</template>

<script lang="ts" setup>
import { EventDetail } from '@/weiui/types'
import { computedClass } from '@/weiui/utils/style'
import Cell, { CellProps } from '../cell/cell.vue'

interface OwnProps
  extends Pick<CellProps, 'title' | 'titleWidth' | 'required' | 'icon' | 'center'> {
  modelValue?: string
  type?: 'text' | 'number' | 'idcard' | 'textarea' | 'digit'
  placeholder?: string
  errorMessage?: string
  inputAlign?: 'left' | 'center' | 'right'
  disabled?: boolean
}

withDefaults(defineProps<OwnProps>(), {
  modelValue: '',
  type: 'text',
  inputAlign: 'right',
  placeholder: '',
  errorMessage: '',
})

const emit = defineEmits<{
  (event: 'update:modelValue', value: string): void
  (event: 'input', value: string): void
  (event: 'blur', value: EventDetail<string>): void
}>()

const onInput = (payload: Event) => {
  const value = (payload as unknown as EventDetail<{ value: string }>).detail.value
  emit('update:modelValue', value)
  emit('input', value)
}
</script>

<style lang="scss" scoped>
@import '../../styles/vars.scss';
.#{$prefix}-field {
  // background-color: #fff;
}
.#{$prefix}-field__input {
  color: var(--color-text-black);
}
.#{$prefix}-field__error-message {
  color: var(--color-error);
  font-size: 12px;
  text-align: left;
}
</style>
