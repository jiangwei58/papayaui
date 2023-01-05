<template>
  <view
    :class="[computedClass('popup', `popup--${props.position}`), customClass]"
    :style="customStyle"
  >
    <TransitionComponent
      :show="visible"
      :duration="duration"
      mode="fade"
      :custom-style="overlayStyle"
      @click="onOverlayClick"
    />
    <TransitionComponent
      :show="visible"
      :duration="duration"
      :mode="animateMode"
      :custom-style="transitionStyle"
      @click="onContentClick"
      @before-enter="onBeforeEnter"
      @after-enter="onAfterEnter"
      @after-leave="onAfterLeave"
    >
      <view :class="computedClass('popup__content')" :style="contentStyle" @tap.stop="noop">
        <view v-if="closeable" :class="computedClass('popup__close')" @tap.stop="onClose">
          <Icon name="close" size="24px" block />
        </view>
        <slot />
      </view>
    </TransitionComponent>
  </view>
</template>

<script lang="ts" setup>
import { computed, CSSProperties, ref, toRefs, watch } from 'vue'
import { getUnitValue, noop } from '../../utils'
import { computedClass } from '../../utils/style'
import Icon from '../icon/icon.vue'
import TransitionComponent, { TransitionMode } from '../transition/transition.vue'

export type PopupPosition = 'top' | 'bottom' | 'left' | 'right' | 'center'

export interface PopupProps {
  show?: boolean
  /** 弹出方式 */
  position?: PopupPosition
  /** 遮罩打开或收起的动画过渡时间，单位ms */
  duration?: string | number
  /** 是否显示遮罩 */
  overlay?: boolean
  /** 点击遮罩是否关闭弹窗 */
  closeOnClickOverlay?: boolean
  /** 弹出宽度 */
  width?: string
  /** 弹窗高度 */
  height?: string
  /** 背景色 */
  bgColor?: CSSProperties['background-color']
  /** 是否圆角 */
  round?: boolean
  /** 是否显示关闭按钮 */
  closeable?: boolean
  /** 是否适配底部安全区 */
  safeAreaInsetBottom?: boolean
  /** 自定义样式类 */
  customClass?: string
  /** 自定义弹出层样式 */
  customStyle?: string
}

const props = withDefaults(defineProps<PopupProps>(), {
  show: false,
  position: 'bottom',
  duration: 300,
  overlay: true,
  width: undefined,
  height: undefined,
  closeOnClickOverlay: true,
  bgColor: undefined,
  customClass: undefined,
  customStyle: undefined,
})

const emit = defineEmits<{
  (event: 'update:show', value: PopupProps['show']): void
  (event: 'open'): void
  (event: 'opend'): void
  (event: 'close'): void
  (event: 'closed'): void
  (event: 'clickOverlay'): void
}>()

const { show } = toRefs(props)

const visible = ref<boolean>(false)

watch(
  show,
  (newVal) => {
    visible.value = newVal
  },
  {
    immediate: true,
  },
)

const overlayStyle = computed<CSSProperties>(() => {
  return {
    position: 'fixed',
    bottom: 0,
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
  }
})

const transitionStyle = computed<CSSProperties>(() => {
  const styleObj: { [key in PopupPosition]: CSSProperties } = {
    top: { top: 0, left: 0, right: 0 },
    bottom: { left: 0, right: 0, bottom: 0 },
    left: { top: 0, left: 0, bottom: 0 },
    right: { top: 0, right: 0, bottom: 0 },
    center: {
      alignItems: 'center',
      justifyContent: 'center',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
    },
  }
  return {
    position: 'fixed',
    display: 'flex',
    ...styleObj[props.position],
  }
})

const animateMode = computed<TransitionMode>(() => {
  const animateObj: { [key in PopupPosition]: TransitionMode } = {
    top: 'slide-down',
    bottom: 'slide-up',
    left: 'slide-left',
    right: 'slide-right',
    center: 'fade-zoom',
  }
  return animateObj[props.position]
})

const contentStyle = computed<CSSProperties>(() => {
  const style: CSSProperties = {}
  if (props.position !== 'center') {
    style.flex = 1
  }
  if (props.width && ['left', 'right', 'center'].includes(props.position)) {
    style.height = getUnitValue(props.width)
  }
  if (props.height && ['top', 'bottom', 'center'].includes(props.position)) {
    style.height = getUnitValue(props.height)
  }
  if (props.bgColor) {
    style.backgroundColor = props.bgColor
  }
  if (props.round) {
    const radiusObj: { [key in PopupPosition]: CSSProperties['border-radius'] } = {
      top: '0 0 16px 16px',
      bottom: '16px 16px 0 0',
      left: '0 16px 16px 0',
      right: '16px 0 0 16px',
      center: '16px',
    }
    style.borderRadius = radiusObj[props.position]
  }
  return style
})

const onOverlayClick = () => {
  emit('clickOverlay')
  if (!props.closeOnClickOverlay) return
  onClose()
}

const onContentClick = () => {
  // 由于中部弹出时，其transition占据了整个页面相当于遮罩，此时需要发出遮罩点击事件，是否无法通过点击遮罩关闭弹窗
  if (props.position === 'center') {
    onOverlayClick()
  }
}

const onBeforeEnter = () => {
  emit('open')
}

const onAfterEnter = () => {
  emit('opend')
}

const onClose = () => {
  visible.value = false
  emit('update:show', false)
  emit('close')
}

const onAfterLeave = () => {
  emit('closed')
}
</script>

<style lang="scss" scoped>
@import '../../styles/vars.scss';
.#{$prefix}-popup {
  position: fixed;
  z-index: 999;
  max-height: 100%;
  overflow-y: auto;

  &__content {
    position: relative;
    background-color: #fff;
  }

  &__close {
    position: absolute;
    top: 0;
    right: 0;
    padding: 10px;
    color: #c8c9cc;
  }
}
</style>
