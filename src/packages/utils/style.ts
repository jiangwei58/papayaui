import { CSSProperties } from 'vue'

export const PREFIX = 'pa'

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

export const computedStyle = (style: CSSProperties) => {
  for (const key in style) {
    if (typeof style[key as keyof CSSProperties] === 'undefined') {
      delete style[key as keyof CSSProperties]
    }
  }
  return style
}
