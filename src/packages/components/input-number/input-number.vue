<template>
  <view
    :class="[
      computedClass('input-number', {
        'input-number-controls': controls,
        'input-number--plain': plain,
      }),
      block ? 'flex' : 'inline-flex',
    ]"
    class="items-center"
  >
    <view
      v-if="controls"
      :class="
        computedClass('input-number-icon', 'input-number-minus', {
          'input-number-icon--disabled': disabled || numberVal <= min,
        })
      "
      class="flex items-center justify-center"
      @tap="onReduce()"
    >
      <Icon name="minus" block />
    </view>
    <input
      :class="
        computedClass('input-number-inner', {
          'input-number-inner--disabled': disabled,
        })
      "
      :style="
        computedStyle({ width: inputWidth && getUnitValue(inputWidth), textAlign: inputAlign })
      "
      :placeholder="placeholder"
      :value="numberVal"
      :type="decimalLength ? 'digit' : 'number'"
      :placeholder-class="computedClass('input-number-placeholder')"
      :disabled="readonly || disabled"
      @input="onInput"
      @blur="onBlur"
      @focus="onFocus"
    />
    <view
      v-if="controls"
      :class="
        computedClass('input-number-icon', 'input-number-plus', {
          'input-number-icon--disabled': disabled || numberVal >= max,
        })
      "
      class="flex items-center justify-center"
      @tap="onAdd()"
    >
      <Icon name="plus" block />
    </view>
  </view>
</template>

<script lang="ts" setup>
import { computed, nextTick, toRefs } from 'vue'
import { EventDetail } from '../..'
import useInputNumber, { InputNumberValue, minAndMax } from '../../core/useInputNumber'
import { getUnitValue } from '../../utils'
import { computedClass, computedStyle } from '../../utils/style'
import Icon from '../icon/icon.vue'

export interface InputNumberProps {
  modelValue?: InputNumberValue
  /** 标识符 */
  name?: string
  /** 输入提示 */
  placeholder?: string
  /** 内容对齐方式 */
  inputAlign?: 'left' | 'center' | 'right'
  /** 输入框宽度 */
  inputWidth?: string
  /** 最小值 */
  min?: InputNumberValue
  /** 最大值 */
  max?: InputNumberValue
  /** 步长 */
  step?: InputNumberValue
  /** 整数位长度 */
  intLength?: number
  /** 小数位长度 */
  decimalLength?: number
  /** 只读状态禁用输入框操作行为 */
  readonly?: boolean
  /** 禁用所有功能 */
  disabled?: boolean
  /** 是否显示控制按钮 */
  controls?: boolean
  /** 是否开启异步变更，开启后需要手动控制输入值 */
  asyncChange?: boolean
  /** 是否为块级元素 */
  block?: boolean
  /** 朴素样式 */
  plain?: boolean
}

const props = withDefaults(defineProps<InputNumberProps>(), {
  modelValue: undefined,
  name: '',
  placeholder: '',
  inputAlign: 'center',
  min: 1,
  max: 9999,
  step: 1,
  intLength: Number.MAX_SAFE_INTEGER.toString().length,
  decimalLength: 0,
  disabled: false,
  controls: true,
  inputWidth: undefined,
})

const emit = defineEmits<{
  (event: 'update:modelValue', value: number, name?: string): void
  (event: 'change', value: number, name?: string): void
  (event: 'focus', value: EventDetail<{ value: InputNumberValue; height: number }>): void
  (event: 'blur', value: EventDetail<{ value: InputNumberValue; cursor: number }>): void
}>()

const { modelValue, intLength, decimalLength } = toRefs(props)
const min = computed<number>(() => +props.min)
const max = computed<number>(() => +props.max)
const step = computed<number>(() => +props.step)

const {
  numberVal,
  getFormatVal,
  onAdd: _onAdd,
  onReduce: _onReduce,
} = useInputNumber({
  modelValue,
  min,
  max,
  step,
  intLength,
  decimalLength,
})

const onUpdate = (value: number) => {
  if (!props.asyncChange) {
    emit('update:modelValue', value, props.name)
  }
  emit('change', value, props.name)
}

const onAdd = () => {
  if (props.disabled || numberVal.value >= max.value) return
  const newVal = _onAdd(!props.asyncChange)
  onUpdate(newVal)
}

const onReduce = () => {
  if (props.disabled || numberVal.value <= min.value) return
  const newVal = _onReduce(!props.asyncChange)
  onUpdate(newVal)
}

const onInput = (e: unknown) => {
  const detail = (e as EventDetail<{ cursor: number; keyCode: number; value: string }>).detail
  return getFormatVal(detail.value)
}

const onBlur = async (e: unknown) => {
  let event = e as EventDetail<{ value: InputNumberValue; cursor: number }>
  if (event.detail.value) {
    const numVal = Number(event.detail.value)
    const result = minAndMax(numVal, min.value, max.value)
    // 防止处理后modelValue前后值一样视图不更新
    if (result === Number(modelValue.value) && result !== numVal) {
      emit('update:modelValue', numVal)
      await nextTick()
    }
    event.detail.value = result
    onUpdate(result)
  }
  emit('blur', event)
}

const onFocus = (e: unknown) => {
  emit('focus', e as EventDetail<{ value: InputNumberValue; height: number }>)
}
</script>

<style lang="scss" scoped>
@import '../../styles/vars.scss';
.#{$prefix}-input-number {
  $height: _var(input-number-height, 28px);
  $bgColor: _var(input-number-bg-color, #f2f3f5);
  $disabledColor: _var(input-number-disabled-color, #c8c9cc);
  $disabledBgColor: _var(input-number-disabled-bg-color, #f2f3f5);
  $round: _var(input-number-round, 4px);

  height: $height;
  color: _var(color-black);
  &-icon {
    flex-shrink: 0;
    width: $height;
    height: $height;
    background-color: $bgColor;
    &:active:not(.#{$prefix}-input-number-icon--disabled) {
      background-color: #e8e8e8;
    }
  }
  &-minus {
    border-radius: $round 0 0 $round;
  }
  &-plus {
    border-radius: 0 $round $round 0;
  }
  &-inner {
    flex: 1;
    width: _var(input-number-width, 32px);
    height: $height;
    font-size: _var(input-number-font-size, 14px);
    color: _var(input-number-color, _var(color-black));
    background-color: $bgColor;
    border-radius: $round;
    :deep(.#{$prefix}-input-number-placeholder) {
      color: _var(input-number-placeholder-color, $disabledColor);
    }
  }
  &-controls &-inner {
    margin: 0 2px;
    border-radius: 0;
  }
  &-icon--disabled {
    color: $disabledColor;
    background-color: $disabledBgColor;
    cursor: not-allowed;
  }
  &-inner--disabled {
    color: $disabledColor;
    background-color: $disabledBgColor;
  }
  &--plain &-inner {
    color: _var(input-number-color, _var(color-primary));
    background-color: transparent;
  }
}
</style>
