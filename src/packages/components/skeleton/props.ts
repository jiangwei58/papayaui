import type { ExtractPropTypes, PropType } from 'vue'
import { pickProps } from '../../utils'

export const skeletonProps = {
  /**
   * 段落占位图行数
   */
  row: {
    type: [Number, String],
    default: 0,
  },
  /**
   * 段落占位图宽度，可传数组来设置每一行的宽度
   */
  rowWidth: [Number, String, Array] as PropType<number | string | (number | string)[]>,
  /**
   * 是否显示标题占位图
   */
  title: [Boolean],
  /**
   * 是否显示头像占位图
   */
  avatar: [Boolean],
  /**
   * 是否显示骨架屏，传 false 时会展示子组件内容
   */
  loading: {
    type: [Boolean],
    default: true,
  },
  /**
   * 是否开启动画
   */
  animate: {
    type: [Boolean],
    default: true,
  },
  /**
   * 是否将标题和段落显示为圆角风格
   */
  round: [Boolean],
  /**
   * 标题占位图宽度
   */
  titleWidth: [Number, String],
  /**
   * 头像占位图大小
   */
  avatarSize: [Number, String],
  /**
   * 头像占位图形状
   */
  avatarShape: {
    type: [String] as PropType<'round' | 'square'>,
    default: 'round',
  },
}

export const skeletonTitleProps = pickProps(skeletonProps, ['round', 'titleWidth'])

export const skeletonAvatarProps = pickProps(skeletonProps, ['avatarSize', 'avatarShape'])

export const skeletonParagraphProps = {
  rowWidth: [Number, String],
  round: skeletonProps.round,
}

export type SkeletonProps = ExtractPropTypes<typeof skeletonProps>
