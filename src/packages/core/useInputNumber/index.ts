import { computed, reactive, ref, watch } from 'vue'
import type { IncludeRefs } from '../../types'

export type InputNumberValue = string | number

export interface UseInputNumberProps {
  /** 值 */
  modelValue?: InputNumberValue
  /** 最小值 */
  min?: number
  /** 最大值 */
  max?: number
  /** 步长 */
  step?: number
  /** 整数位长度 */
  intLength?: number
  /** 小数位长度 */
  decimalLength?: number
}

export function useInputNumber(props: IncludeRefs<UseInputNumberProps>) {
  const _props = props as UseInputNumberProps
  const state = reactive({
    ...props,
    modelValue: _props.modelValue ?? 0,
    min: _props.min ?? 1,
    max: _props.max ?? Number.MAX_SAFE_INTEGER,
    step: _props.step ?? 1,
    intLength: _props.intLength ?? Number.MAX_SAFE_INTEGER.toString().length,
    decimalLength: _props.decimalLength ?? 0,
  })

  const numberVal = ref<number | null>(+state.modelValue)

  const safeNumberVal = computed<number>(() => {
    return Number(numberVal.value ?? 0)
  })

  watch(
    () => state.modelValue,
    (newVal) => {
      if ((typeof newVal === 'string' && !!newVal.length) || typeof newVal === 'number') {
        numberVal.value = +newVal
      } else {
        numberVal.value = null
      }
    },
  )

  const getFormatVal = (text: InputNumberValue) => {
    return formatToString(text, state.intLength, state.decimalLength)
  }

  const onUpdate = (type: 'add' | 'reduce', updateValue = true) => {
    let newVal = safeNumberVal.value
    if (type === 'add') {
      newVal += state.step
    } else {
      newVal -= state.step
    }
    newVal = minAndMax(newVal, state.min, state.max)
    if (state.decimalLength) {
      newVal = parseFloat(newVal.toFixed(state.decimalLength))
    }
    if (updateValue) {
      numberVal.value = newVal
    }
    return newVal
  }

  const onAdd = (updateValue = true) => {
    return onUpdate('add', updateValue)
  }

  const onReduce = (updateValue = true) => {
    return onUpdate('reduce', updateValue)
  }

  return {
    numberVal,
    safeNumberVal,
    getFormatVal,
    onAdd,
    onReduce,
  }
}

export const formatToString = (
  value: InputNumberValue,
  intLength = Number.MAX_SAFE_INTEGER.toString().length,
  decimalLength = 0,
) => {
  // 根据整数位和小数位处理值
  value = String(value).replace(/[^0-9.]/g, '')
  const valSplit = value.split('.').slice(0, 2)
  valSplit[0] = valSplit[0].slice(0, intLength)
  if (typeof valSplit[1] !== 'undefined' && decimalLength) {
    valSplit[1] = valSplit[1].slice(0, decimalLength)
  } else {
    valSplit.splice(1, 1)
  }
  return valSplit.join('.')
}

export const minAndMax = (val: number, min?: number, max?: number) => {
  if (typeof min !== 'undefined') {
    val = Math.max(min, val)
  }
  if (typeof max !== 'undefined') {
    val = Math.min(max, val)
  }
  return val
}
