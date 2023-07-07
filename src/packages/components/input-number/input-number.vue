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
@import './input-number.scss';
</style>
