/**
 * 获取指定的prop
 * @description 通常用在组件的props复用情况
 */
export const pickProps = <T extends object, U extends keyof T>(props: T, keys: Array<U>) => {
  return keys.reduce((newProps, key) => {
    newProps[key] = props[key]
    return newProps
  }, {} as Pick<T, U>)
}
