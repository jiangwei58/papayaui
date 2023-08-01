import type { CSSProperties } from 'vue'

export const defaultNamespace = 'pa'

const _bem = (
  namespace: string,
  block: string,
  blockSuffix: string,
  element: string,
  modifier: string,
) => {
  let cls = `${namespace}-${block}`
  if (blockSuffix) {
    cls += `-${blockSuffix}`
  }
  if (element) {
    cls += `__${element}`
  }
  if (modifier) {
    cls += `--${modifier}`
  }
  return cls
}

export function useNamespace(block: string) {
  const namespace = defaultNamespace

  // pa-xxx-xxx
  const b = (blockSuffix = '') => _bem(namespace, block, blockSuffix, '', '')

  // pa-xxx__xxx
  const e = (element?: string) => (element ? _bem(namespace, block, '', element, '') : '')

  // pa-xxx--xxx
  const m = (modifier?: string) => (modifier ? _bem(namespace, block, '', '', modifier) : '')

  // pa-xxx-xxx__xxx
  const be = (blockSuffix?: string, element?: string) =>
    blockSuffix && element ? _bem(namespace, block, blockSuffix, element, '') : ''

  // pa-xxx__xxx--xxx
  const em = (element?: string, modifier?: string) =>
    element && modifier ? _bem(namespace, block, '', element, modifier) : ''

  // pa-xxx-xxx--xxx
  const bm = (blockSuffix?: string, modifier?: string) =>
    blockSuffix && modifier ? _bem(namespace, block, blockSuffix, '', modifier) : ''

  // pa-xxx-xxx__xxx--xxx
  const bem = (blockSuffix?: string, element?: string, modifier?: string) =>
    blockSuffix && element && modifier ? _bem(namespace, block, blockSuffix, element, modifier) : ''

  const is = (name: string, ...args: Array<boolean | undefined>) => {
    const state = args.length >= 1 ? args.every((arg) => !!arg) : true
    return name && state ? m(name) : ''
  }

  const style = (style: CSSProperties) => {
    for (const key in style) {
      if (typeof style[key as keyof CSSProperties] === 'undefined') {
        delete style[key as keyof CSSProperties]
      }
    }
    return style
  }

  const cssVarName = (name: string) => `--${namespace}-${name}`
  const cssVarBlockName = (name: string) => `--${namespace}-${block}-${name}`

  const cssVar = (object: Record<string, string>) => {
    const styles: Record<string, string> = {}
    for (const key in object) {
      if (object[key]) {
        styles[cssVarName(key)] = object[key]
      }
    }
    return styles
  }

  const cssVarBlock = (object: Record<string, string>) => {
    const styles: Record<string, string> = {}
    for (const key in object) {
      if (object[key]) {
        styles[cssVarBlockName(key)] = object[key]
      }
    }
    return styles
  }

  return {
    namespace,
    b,
    e,
    m,
    be,
    em,
    bm,
    bem,
    is,
    style,
    cssVarName,
    cssVarBlockName,
    cssVar,
    cssVarBlock,
  }
}

export default useNamespace
