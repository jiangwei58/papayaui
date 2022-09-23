const PREFIX = 'wei'

export const computedClass = (...classNames: string[]): string => {
  return classNames.reduce((result, className) => {
    result += `${PREFIX}-${className} `
    return result
  }, '')
}
