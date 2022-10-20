export const isPlainObject = (val: any) => {
  if (toString.call(val) !== '[object Object]') {
    return false
  }

  const prototype = Object.getPrototypeOf(val)
  return prototype === null || prototype === Object.prototype
}

export const isArray = (val: any) => {
  return Array.isArray(val)
}

export const merge = <TObject>(...args: Partial<TObject>[]) => {
  const result: Record<string, any> = {}
  function assignValue(val: any, key: string) {
    if (isPlainObject(result[key]) && isPlainObject(val)) {
      result[key] = merge(result[key], val)
    } else if (isPlainObject(val)) {
      result[key] = merge({}, val)
    } else if (isArray(val)) {
      result[key] = val.slice()
    } else {
      result[key] = val
    }
  }

  for (let i = 0, l = args.length; i < l; i++) {
    for (const key in args[i]) {
      assignValue(args[i][key], key)
    }
  }
  return result as TObject
}
