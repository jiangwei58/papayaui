import { computed, reactive, ref, watch } from 'vue'
import { IncludeRefs } from '../types'

export type SwitchValue = boolean | string | number

export interface UseSwitchProps {
  /** 开关状态 */
  modelValue?: SwitchValue
  /** 打开时组件的值 */
  activeValue?: SwitchValue
  /** 关闭组件的值 */
  inactiveValue?: SwitchValue
  /** 禁用状态 */
  loading?: boolean
  /** 加载状态 */
  disabled?: boolean
}

export default (props: IncludeRefs<UseSwitchProps>) => {
  const _props = props as UseSwitchProps
  const state = reactive({
    ..._props,
    modelValue: _props.modelValue ?? false,
    activeValue: _props.activeValue ?? true,
    inactiveValue: _props.inactiveValue ?? false,
  })

  const checked = ref<SwitchValue>(
    typeof _props.modelValue !== 'undefined' ? state.modelValue : state.inactiveValue,
  )

  const isChecked = computed<boolean>(() => checked.value === state.activeValue)

  const onToggle = () => {
    if (state.loading || state.disabled) return
    checked.value = checked.value === state.activeValue ? state.inactiveValue : state.activeValue
    return checked.value
  }

  watch(
    () => state.modelValue,
    (newVal) => {
      checked.value = newVal
    },
  )

  return {
    checked,
    isChecked,
    onToggle,
  }
}
