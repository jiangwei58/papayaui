const PREFIX = 'wei'

export const computedClass = (...classNames: string[]): string => {
  return classNames.reduce((result, className, index) => {
    result += `${PREFIX}-${className}${index < classNames.length - 1 ? ' ' : ''}`
    return result
  }, '')
}
