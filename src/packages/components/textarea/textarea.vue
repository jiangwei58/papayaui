<template>
  <view
    :class="
      computedClass('textarea', {
        'textarea--disabled': disabled,
      })
    "
  >
    <textarea
      :class="computedClass('textarea__textarea')"
      :style="{ height: autoHeight ? 'auto' : getUnitValue(height) }"
      :value="modelValue"
      :placeholder="placeholder"
      :placeholder-class="computedClass('textarea__placeholder')"
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
    <view v-if="showCount" :class="computedClass('textarea__limit')">
      {{ modelValue ? modelValue.length : '0' }}/{{ maxlength }}
    </view>
  </view>
</template>

<script lang="ts" setup>
import { EventDetail } from '../../types'
import { getUnitValue } from '../../utils'
import { computedClass } from '../../utils/style'

export interface TextareaProps {
  /** 值 */
  modelValue?: string
  /** 设置占位提示文字 */
  placeholder?: string
  /** 输入框高度 */
  height?: string
  /** 是否只读 */
  readonly?: boolean
  /** 是否禁用 */
  disabled?: boolean
  /** 最大输入长度，设置为 -1 的时候不限制最大长度 */
  maxlength?: number
  /** 是否自动增高，设置auto-height时，style.height不生效 */
  autoHeight?: boolean
  /** 是否显示统计字数 */
  showCount?: boolean
  /** 设置键盘右下角按钮的文字，仅微信小程序，App-vue和H5有效 */
  confirmType?: string
  /** 是否自动获取焦点 */
  focus?: boolean
  /** 如果textarea是在一个position:fixed的区域，需要显示指定属性fixed为true */
  fixed?: boolean
  /** 指定光标与键盘的距离 */
  cursorSpacing?: number
  /** 指定focus时的光标位置 */
  cursor?: number
  /** 是否显示键盘上方带有”完成“按钮那一栏 */
  showConfirmBar?: boolean
  /** 光标起始位置，自动聚焦时有效，需与selection-end搭配使用 */
  selectionStart?: number
  /** 光标结束位置，自动聚焦时有效，需与selection-start搭配使用 */
  selectionEnd?: number
  /** 键盘弹起时，是否自动上推页面 */
  adjustPosition?: boolean
  /** 是否去掉 iOS 下的默认内边距，只微信小程序有效 */
  disableDefaultPadding?: boolean
  /** focus时，点击页面的时候不收起键盘，只微信小程序有效 */
  holdKeyboard?: boolean
}

withDefaults(defineProps<TextareaProps>(), {
  modelValue: undefined,
  placeholder: '请输入',
  height: '70px',
  maxlength: 140,
  autoHeight: false,
  confirmType: undefined,
  cursorSpacing: 0,
  cursor: undefined,
  showConfirmBar: true,
  selectionStart: -1,
  selectionEnd: -1,
  adjustPosition: true,
})

const emit = defineEmits<{
  (event: 'update:modelValue', value: string): void
  (event: 'input', value: Event): void
  (event: 'focus', value: Event): void
  (event: 'blur', value: Event): void
  (event: 'confirm', value: Event): void
  (event: 'linechange', value: Event): void
  (event: 'keyboardheightchange', value: Event): void
}>()

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
