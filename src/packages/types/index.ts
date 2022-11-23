import { ToRef } from 'vue'

/** 事件返回类型 */
export interface EventDetail<T> {
  detail: T
}

/** 属性包含ref类型 */
export type IncludeRefs<T> = {
  [P in keyof T]: T[P] | ToRef<T[P]>
}
