import { reactive, ref, watch } from 'vue'
import { IncludeRefs } from '../types'

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
  /** 禁用 */
  disabled?: boolean
}

export default (props: IncludeRefs<UseInputNumberProps>) => {
  const _porps = props as UseInputNumberProps
  const state = reactive({
    ...props,
    modelValue: _porps.modelValue ?? 0,
    min: _porps.min ?? 1,
    max: _porps.max ?? Number.MAX_SAFE_INTEGER,
    step: _porps.step ?? 1,
    intLength: _porps.intLength ?? Number.MAX_SAFE_INTEGER.toString().length,
    decimalLength: _porps.decimalLength ?? 0,
  })

  const numberVal = ref<number>(+state.modelValue)

  watch(
    () => state.modelValue,
    (newVal) => {
      numberVal.value = +newVal
    },
  )

  const getFormatVal = (text: InputNumberValue) => {
    return formatToString(text, state.intLength, state.decimalLength)
  }

  const onUpdate = (type: 'add' | 'reduce') => {
    if (state.disabled) return
    let newVal = numberVal.value
    if (type === 'add') {
      newVal += state.step
    } else {
      newVal -= state.step
    }
    newVal = minAndMax(newVal, state.min, state.max)
    if (state.decimalLength) {
      newVal = parseFloat(newVal.toFixed(state.decimalLength))
    }
    numberVal.value = newVal
  }

  const onAdd = () => {
    onUpdate('add')
  }

  const onReduce = () => {
    onUpdate('reduce')
  }

  return {
    numberVal,
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
