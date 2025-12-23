import type { Ref } from 'vue'
import { computed, ref } from 'vue'

/**
 * 双向绑定 hook，类似 Vue 3.4+ 的 defineModel
 * 如果外部传入了 value，则使用外部的值；否则使用内部维护的值
 *
 * @param props - 组件的 props 对象
 * @param key - 要绑定的 prop 名称
 * @param emit - emit 函数
 * @param defaultValue - 默认值（当 props[key] 为 undefined 时使用）
 *
 * @example
 * ```ts
 * const props = defineProps<{ modelValue?: string }>()
 * const emit = defineEmits(['update:modelValue'])
 * const data = useModel<string>(props, 'modelValue', emit, '')
 * ```
 */
export function useModel<T, P extends Record<string, any> = any, K extends keyof P = any>(
  props: P,
  key: K,
  emit: (event: any, value: any) => void,
  defaultValue?: T,
): Ref<T> {
  const internalValue = ref<T>(defaultValue as T) as Ref<T>

  const model = computed<T>({
    get: () => {
      console.log('props[key]:', key, props[key])
      return props[key] !== undefined ? props[key] : internalValue.value
    },
    set: (value: T) => {
      internalValue.value = value
      emit(`update:${key as string}`, value)
    },
  })

  return model
}
