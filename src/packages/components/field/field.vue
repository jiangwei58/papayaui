<template>
  <Cell
    :class="computedClass('field', { 'field--only-input': onlyInput })"
    :border="false"
    v-bind="$props"
  >
    <view :class="computedClass('field__body')">
      <input
        v-if="type !== 'textarea'"
        :class="computedClass('field__input')"
        :type="type"
        :value="modelValue"
        :placeholder="placeholder"
        :placeholder-style="`color:var(--${PREFIX}-number-input-placeholder-color)`"
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
        :class="computedClass('field__input')"
        :value="modelValue"
        :placeholder="placeholder"
        :placeholder-style="`color:var(--${PREFIX}-number-input-placeholder-color)`"
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
    </view>
  </Cell>
</template>

<script lang="ts" setup>
import { EventDetail } from '../../types'
import { getUnitValue } from '../../utils'
import { computedClass, PREFIX } from '../../utils/style'
import Cell from '../cell/cell.vue'
import { CellProps } from '../cell/cell.vue'

export interface FieldProps
  extends Pick<
    CellProps,
    'title' | 'titleWidth' | 'required' | 'icon' | 'center' | 'errorMessage'
  > {
  modelValue?: string
  /** 输入框类型 */
  type?: 'text' | 'number' | 'idcard' | 'textarea' | 'digit'
  /** 值对齐方式 */
  valueAlign?: CellProps['valueAlign']
  /** 输入提示 */
  placeholder?: string
  /** 是否禁用 */
  disabled?: boolean
  /** 是否只用输入框（主要用于表单情况） */
  onlyInput?: boolean
  /** 自动高度（textarea生效） */
  autoHeight?: boolean
  /** 最大输入长度，设置为 -1 的时候不限制最大长度 */
  maxlength?: number
  /** 获取焦点 */
  focus?: boolean
  /** 设置键盘右下角按钮的文字，仅在 type="text" 时生效 */
  confirmType?: string
  /** 点击键盘右下角按钮时是否保持键盘不收起 */
  confirmHold?: boolean
  /** 指定focus时的光标位置 */
  cursor?: number
  /** 光标起始位置，自动聚集时有效，需与selection-end搭配使用 */
  selectionStart?: number
  /** 光标结束位置，自动聚集时有效，需与selection-start搭配使用 */
  selectionEnd?: number
  /** 键盘弹起时，是否自动上推页面 */
  adjustPosition?: boolean
  /** 强制 input 处于同层状态，默认 focus 时 input 会切到非同层状态 (仅在 iOS 下生效) */
  alwaysEmbed?: boolean
  /** focus时，点击页面的时候不收起键盘 */
  holdKeyboard?: boolean
  /** 高度（textarea生效）*/
  height?: string
}

withDefaults(defineProps<FieldProps>(), {
  modelValue: '',
  type: 'text',
  placeholder: '请输入',
  valueAlign: 'right',
  maxlength: -1,
  confirmType: undefined,
  cursor: undefined,
  selectionStart: undefined,
  selectionEnd: undefined,
  adjustPosition: true,
  height: '75px',
})

const emit = defineEmits<{
  (event: 'update:modelValue', value: string): void
  (event: 'input', value: string): void
  (event: 'blur', value: FocusEvent): void
  (event: 'confirm', value: EventDetail<{ value: string }>): void
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
  &__input {
    color: _var(field-input-color);
  }
  &--only-input {
    @include _setVar(cell-padding-y, 0);
    @include _setVar(cell-padding-x, 0);
  }
  &__textarea {
    display: block;
    box-sizing: border-box;
    width: 100%;
    min-width: 0;
    margin: 0;
    padding: 0;
    color: #323233;
    line-height: inherit;
    text-align: left;
    background-color: transparent;
    border: 0;
    resize: none;
    font: inherit;
  }
}
</style>
