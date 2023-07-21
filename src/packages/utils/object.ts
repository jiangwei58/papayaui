/**
 * @description 创建由所选对象属性组成的对象
 */
export const pick = <T extends object, U extends keyof T>(object: T, keys: Array<U>) => {
  return keys.reduce((newObject, key) => {
    newObject[key] = object[key]
    return newObject
  }, {} as Pick<T, U>)
}
