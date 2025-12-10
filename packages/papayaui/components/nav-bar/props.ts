import type { ExtractPropTypes, PropType } from 'vue'
import { isNumber } from '@papayaui/utils'

export const navBarProps = {
  /**
   * 标题
   */
  title: {
    type: String,
    default: '标题',
  },
  /**
   * 背景色
   */
  bgColor: {
    type: String,
    default: '#fff',
  },
  /**
   * 主题样式
   * @description 会同时影响胶囊菜单和标题的样式
   */
  theme: {
    type: String as PropType<'black' | 'white'>,
    default: 'black',
  },
  /**
   * 左侧返回按钮或胶囊菜单
   * @description 只有一个的情况下直接显示图标，没有胶囊样式
   */
  leftMenu: [String, Array] as PropType<string | [string, string]>,
  /**
   * 是否开启顶部安全区适配
   */
  safeAreaInsetTop: {
    type: Boolean,
    default: true,
  },
}

export const navBarEmits = {
  menuClick: (index: number) => isNumber(index),
}

export type NavBarProps = ExtractPropTypes<typeof navBarProps>
export type NavBarEmits = typeof navBarEmits
