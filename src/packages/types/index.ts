import type { Ref } from 'vue'

/** 事件返回类型 */
export interface EventDetail<T> {
  detail: T
}

/** 普通或ref类型 */
export type MaybeRef<T> = T | Ref<T>

/** 属性包含ref类型 */
export type IncludeRefs<T> = {
  [P in keyof T]: MaybeRef<T[P]>
}
