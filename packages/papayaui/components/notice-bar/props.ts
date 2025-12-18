import type { ExtractPropTypes, ExtractPublicPropTypes, PropType } from 'vue'

export const noticeBarProps = {
  /**
   * 通知栏模式
   */
  mode: String as PropType<'closeable' | 'link'>,
  /**
   * 通知文本内容
   */
  text: {
    type: String,
    default: '',
  },
  /**
   * 通知文本颜色
   */
  color: String,
  /**
   * 滚动条背景
   */
  background: String,
  /**
   * 左侧图标名称或图片链接
   */
  leftIcon: String,
  /**
   * 动画延迟时间 (ms)
   */
  delay: {
    type: Number,
    default: 1,
  },
  /**
   * 滚动速率 (px/s)
   */
  speed: {
    type: Number,
    default: 60,
  },
  /**
   * 是否开启滚动播放，内容长度溢出时默认开启
   */
  scrollable: {
    type: Boolean,
    default: undefined,
  },
  /**
   * 是否开启文本换行，只在禁用滚动时生效
   */
  wrapable: {
    type: Boolean,
    default: false,
  },
}

export const noticeBarEmits = {
  click: (_event: Event) => true,
  close: () => true,
}

export type NoticeBarProps = ExtractPropTypes<typeof noticeBarProps>
export type NoticeBarPropsPublic = ExtractPublicPropTypes<typeof noticeBarProps>

export type NoticeBarEmits = typeof noticeBarEmits
