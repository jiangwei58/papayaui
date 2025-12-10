import type { ComponentInternalInstance } from 'vue'

/**
 * 获取父组件实例
 * @param instance - 当前组件实例
 * @param name - 父组件名称
 */
export const getParentInstance = <
  PropsType = ComponentInternalInstance['props'],
  ExposeType = ComponentInternalInstance['exposed'],
>(
  instance: ComponentInternalInstance | null,
  name: string,
) => {
  if (!instance) return null
  let parent = instance.parent
  let parentName = parent?.type.__name
  while (parentName !== name) {
    parent = parent?.parent ?? null
    if (!parent) return null
    parentName = parent?.type.__name
  }
  return parent as (ComponentInternalInstance & { props: PropsType; exposed: ExposeType }) | null
}
