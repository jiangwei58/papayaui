import type { ExtractPropTypes, PropType } from 'vue'
import { pickProps } from '../../utils'
import { transitionProps } from '../transition/props'
import { popupProps } from '../popup/props'

export const menuProps = {
  ...pickProps(popupProps, ['overlay', 'closeOnClickOverlay']),
  /**
   *  菜单展开方向
   */
  direction: {
    type: String as PropType<'up' | 'down'>,
    default: 'down',
  },
  /**
   *  菜单栏 z-index 层级
   */
  zIndex: {
    type: Number,
    default: 10,
  },
  /**
   *  动画时长，单位ms
   */
  duration: {
    type: transitionProps.duration.type,
    default: 200,
  },
}

export type MenuProps = ExtractPropTypes<typeof menuProps>
