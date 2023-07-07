<template>
  <view
    :class="[ns.b(), ns.is('controls', controls), ns.is('plain', plain)]"
    :style="{ display: block ? 'flex' : 'inline-flex' }"
  >
    <view
      v-if="controls"
      :class="[
        ns.b('icon'),
        ns.b('minus'),
        ns.is('icon-disabled', disabled || safeNumberVal <= min),
      ]"
      @tap="onReduce()"
    >
      <Icon name="minus" block />
    </view>
    <input
      :class="[ns.b('inner'), ns.is('inner-disabled', disabled)]"
      :style="ns.style({ width: inputWidth && getUnitValue(inputWidth), textAlign: inputAlign })"
      :placeholder="placeholder"
      :value="numberVal"
      :type="decimalLength ? 'digit' : 'number'"
      :placeholder-class="ns.b('placeholder')"
      :disabled="readonly || disabled"
      @input="onInput"
      @blur="onBlur"
      @focus="onFocus"
    />
    <view
      v-if="controls"
      :class="[
        ns.b('icon'),
        ns.b('plus'),
        ns.is('icon-disabled', disabled || safeNumberVal >= max),
      ]"
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
import useNamespace from '../../core/useNamespace'
import { getUnitValue } from '../../utils'
import Icon from '../icon/icon.vue'
import { inputNumberEmits, inputNumberProps } from './props'

const ns = useNamespace('input-number')

const props = defineProps(inputNumberProps)
const emit = defineEmits(inputNumberEmits)

const { modelValue, intLength, decimalLength } = toRefs(props)
const min = computed<number>(() => +props.min)
const max = computed<number>(() => +props.max)
const step = computed<number>(() => +props.step)

const {
  numberVal,
  safeNumberVal,
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
  if (props.disabled || safeNumberVal.value >= max.value) return
  const newVal = _onAdd(!props.asyncChange)
  onUpdate(newVal)
}

const onReduce = () => {
  if (props.disabled || safeNumberVal.value <= min.value) return
  const newVal = _onReduce(!props.asyncChange)
  onUpdate(newVal)
}

const onInput = (e: unknown) => {
  const detail = (e as EventDetail<{ cursor: number; keyCode: number; value: string }>).detail
  return getFormatVal(detail.value)
}

const onBlur = async (e: unknown) => {
  let event = e as EventDetail<{ value: InputNumberValue; cursor: number }>
  const numVal = Number(event.detail.value ?? 0)
  let result = minAndMax(numVal, min.value, max.value)
  // 处理空值的情况
  if (!event.detail.value && props.nullable) {
    result = props.nullValue
  }
  // 防止处理后modelValue前后值一样视图不更新
  if (result === Number(props.modelValue) && result !== numVal) {
    numberVal.value = numVal
    await nextTick()
    numberVal.value = result
  }
  event.detail.value = result
  // 值没变不发送更新事件
  if (result !== Number(props.modelValue) || result !== numVal) {
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

  align-items: center;
  height: $height;
  color: _var(color-black);
  &-icon {
    display: flex;
    align-items: center;
    justify-content: center;
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
  &--controls &-inner {
    margin: 0 2px;
    border-radius: 0;
  }
  &--icon-disabled {
    color: $disabledColor;
    background-color: $disabledBgColor;
    cursor: not-allowed;
  }
  &--inner-disabled {
    color: $disabledColor;
    background-color: $disabledBgColor;
  }
  &--plain &-inner {
    color: _var(input-number-color, _var(color-primary));
    background-color: transparent;
  }
}
</style>
