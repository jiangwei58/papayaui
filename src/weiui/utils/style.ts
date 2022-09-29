const PREFIX = 'wei'

export const computedClass = (
  ...classNames: (string | Record<string, boolean | undefined>)[]
): string => {
  const result: string[] = []
  classNames.forEach((className) => {
    if (typeof className === 'string') {
      result.push(`${PREFIX}-${className}`)
    } else {
      for (const key in className) {
        if (className[key] === true) {
          result.push(`${PREFIX}-${key}`)
        }
      }
    }
  })
  return result.join(' ')
}
