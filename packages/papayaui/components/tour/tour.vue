<template>
  <template v-if="show">
    <!-- 遮罩：有目标时用 4 块拼接实现镂空高亮效果 -->
    <template v-if="hasTarget && spotlightRect">
      <view :class="ns.e('mask')" :style="maskTopStyle" @tap="onMaskClick" />
      <view :class="ns.e('mask')" :style="maskLeftStyle" @tap="onMaskClick" />
      <view :class="ns.e('mask')" :style="maskRightStyle" @tap="onMaskClick" />
      <view :class="ns.e('mask')" :style="maskBottomStyle" @tap="onMaskClick" />
    </template>
    <!-- 遮罩：无目标时铺满全屏 -->
    <view v-else :class="ns.e('mask')" :style="maskFullStyle" @tap="onMaskClick" />

    <!-- 高亮边框环绕目标元素 -->
    <view v-if="hasTarget && spotlightRect" :class="ns.e('spotlight')" :style="spotlightStyle" />

    <!-- 引导气泡 -->
    <view v-if="currentStep" :class="ns.e('bubble')" :style="bubbleStyle">
      <!-- 箭头（仅有目标且完成测量后显示） -->
      <view
        v-if="hasTarget && measured"
        :class="[ns.e('arrow'), ns.em('arrow', bubblePlacement)]"
        :style="arrowOffsetStyle"
      />

      <!-- 关闭按钮 -->
      <view v-if="showClose" :class="ns.e('close')" @tap="onClose">
        <text>✕</text>
      </view>

      <!-- 标题 -->
      <view v-if="currentStep.title" :class="ns.e('title')">{{ currentStep.title }}</view>

      <!-- 描述内容 -->
      <view :class="ns.e('content')">{{ currentStep.content }}</view>

      <!-- 底部：步骤点 + 操作按钮 -->
      <view :class="ns.e('footer')">
        <view :class="ns.e('indicators')">
          <view
            v-for="(_, idx) in steps"
            :key="idx"
            :class="[ns.e('dot'), idx === current && ns.em('dot', 'active')]"
          />
        </view>
        <view :class="ns.e('actions')">
          <ButtonComponent
            v-if="current > 0"
            type="primary"
            plain
            size="small"
            @click="onPrev"
          >
            {{ prevText }}
          </ButtonComponent>
          <ButtonComponent
            v-if="current < steps.length - 1"
            type="primary"
            size="small"
            @click="onNext"
          >
            {{ nextText }}
          </ButtonComponent>
          <ButtonComponent
            v-else
            type="primary"
            size="small"
            @click="onFinish"
          >
            {{ finishText }}
          </ButtonComponent>
        </view>
      </view>
    </view>
  </template>
</template>

<script lang="ts" setup>
import type { CSSProperties } from 'vue'
import { computed, getCurrentInstance, nextTick, ref, watch } from 'vue'
import useNamespace from '../../core/useNamespace'
import useRect from '../../hooks/useRect'
import ButtonComponent from '../button/button.vue'
import { tourEmits, tourProps } from './props'
import type { TourPlacement } from './props'

defineOptions({ name: 'PaTour' })

const props = defineProps(tourProps)
const emit = defineEmits(tourEmits)

const ns = useNamespace('tour')
const instance = getCurrentInstance()

const currentStep = computed(() => props.steps[props.current] ?? null)
const hasTarget = computed(() => !!currentStep.value?.target)

/** 目标元素的位置信息 */
const targetRect = ref<UniApp.NodeInfo | null>(null)
/** 气泡高度，用于计算上方弹出时的位移 */
const bubbleHeight = ref(0)
/** 是否完成尺寸测量，控制气泡的 opacity 避免闪烁 */
const measured = ref(false)

const sysInfo = uni.getSystemInfoSync()
const screenWidth = sysInfo.windowWidth
const screenHeight = sysInfo.windowHeight

/** 气泡固定宽度：最大 300px，至少留 32px 边距 */
const BUBBLE_WIDTH = Math.min(300, screenWidth - 32)
/** 气泡与目标元素之间的间距 px */
const BUBBLE_GAP = 12

/**
 * 查询目标元素的位置。
 * 微信小程序的 createSelectorQuery 查询范围由传入的组件实例决定，
 * 必须使用实际持有目标元素的那个组件实例（即 scope prop）。
 * H5 由 useRect 内部通过 querySelector 全局查找，scope 同样有效。
 */
const queryTargetRect = (selector: string): Promise<UniApp.NodeInfo | null> => {
  const ctx = props.scope ?? instance
  if (!ctx) return Promise.resolve(null)
  return useRect(ctx, selector)
}

/**
 * 查询气泡自身高度。
 * 气泡在组件内部，以当前组件实例为上下文调用 useRect。
 */
const queryBubbleHeight = (): Promise<number> => {
  if (!instance) return Promise.resolve(120)
  return useRect(instance, `.${ns.e('bubble')}`).then((res) => res?.height || 120)
}

/** 更新目标元素位置和气泡高度 */
const updateRects = async () => {
  measured.value = false

  if (currentStep.value?.target) {
    const rect = await queryTargetRect(currentStep.value.target)
    targetRect.value = rect
  } else {
    targetRect.value = null
  }

  await nextTick()
  const height = await queryBubbleHeight()
  bubbleHeight.value = height
  measured.value = true
}

watch(
  () => [props.show, props.current] as const,
  ([newShow]) => {
    if (newShow) {
      nextTick(() => updateRects())
    } else {
      measured.value = false
      targetRect.value = null
    }
  },
  { immediate: true },
)

/** 高亮区域（目标 + padding） */
const spotlightRect = computed(() => {
  if (!targetRect.value) return null
  const p = props.padding
  return {
    left: (targetRect.value.left || 0) - p,
    top: (targetRect.value.top || 0) - p,
    right: (targetRect.value.right || 0) + p,
    bottom: (targetRect.value.bottom || 0) + p,
    width: (targetRect.value.width || 0) + 2 * p,
    height: (targetRect.value.height || 0) + 2 * p,
  }
})

/** 气泡弹出方向：优先使用步骤配置，其次根据目标位置自动判断 */
const bubblePlacement = computed<TourPlacement>(() => {
  if (currentStep.value?.placement) return currentStep.value.placement
  if (!targetRect.value) return 'bottom'
  const targetCenter = (targetRect.value.top || 0) + (targetRect.value.height || 0) / 2
  return targetCenter > screenHeight * 0.55 ? 'top' : 'bottom'
})

// ---- 遮罩样式 ----

const maskTopStyle = computed<CSSProperties>(() => ({
  position: 'fixed' as const,
  left: '0px',
  top: '0px',
  width: '100vw',
  height: `${spotlightRect.value?.top ?? 0}px`,
  backgroundColor: props.maskColor,
  zIndex: String(props.zIndex),
}))

const maskLeftStyle = computed<CSSProperties>(() => {
  const sr = spotlightRect.value
  if (!sr) return {}
  return {
    position: 'fixed',
    left: '0px',
    top: `${sr.top}px`,
    width: `${Math.max(0, sr.left)}px`,
    height: `${sr.height}px`,
    backgroundColor: props.maskColor,
    zIndex: String(props.zIndex),
  }
})

const maskRightStyle = computed<CSSProperties>(() => {
  const sr = spotlightRect.value
  if (!sr) return {}
  return {
    position: 'fixed',
    left: `${sr.right}px`,
    top: `${sr.top}px`,
    width: `${Math.max(0, screenWidth - sr.right)}px`,
    height: `${sr.height}px`,
    backgroundColor: props.maskColor,
    zIndex: String(props.zIndex),
  }
})

const maskBottomStyle = computed<CSSProperties>(() => {
  const sr = spotlightRect.value
  if (!sr) return {}
  return {
    position: 'fixed',
    left: '0px',
    top: `${sr.bottom}px`,
    width: '100vw',
    height: `${Math.max(0, screenHeight - sr.bottom)}px`,
    backgroundColor: props.maskColor,
    zIndex: String(props.zIndex),
  }
})

const maskFullStyle = computed<CSSProperties>(() => ({
  position: 'fixed',
  top: '0px',
  left: '0px',
  right: '0px',
  bottom: '0px',
  backgroundColor: props.maskColor,
  zIndex: String(props.zIndex),
}))

/** 高亮边框样式 */
const spotlightStyle = computed<CSSProperties>(() => {
  const sr = spotlightRect.value
  if (!sr) return {}
  return {
    position: 'fixed',
    left: `${sr.left}px`,
    top: `${sr.top}px`,
    width: `${sr.width}px`,
    height: `${sr.height}px`,
    zIndex: String(props.zIndex),
    pointerEvents: 'none',
  }
})

// ---- 气泡位置计算 ----

/** 气泡水平中心对齐目标，并限制在屏幕内 */
const bubbleLeftBase = computed(() => {
  if (!targetRect.value) return (screenWidth - BUBBLE_WIDTH) / 2
  const targetCenter = (targetRect.value.left || 0) + (targetRect.value.width || 0) / 2
  const left = targetCenter - BUBBLE_WIDTH / 2
  return Math.max(16, Math.min(left, screenWidth - BUBBLE_WIDTH - 16))
})

/** 根据弹出方向决定气泡的最终 left */
const bubbleLeftFinal = computed(() => {
  const sr = spotlightRect.value
  const placement = bubblePlacement.value
  if (placement === 'left') {
    return Math.max(16, (sr?.left ?? 0) - BUBBLE_WIDTH - BUBBLE_GAP)
  }
  if (placement === 'right') {
    return Math.min((sr?.right ?? 0) + BUBBLE_GAP, screenWidth - BUBBLE_WIDTH - 16)
  }
  return bubbleLeftBase.value
})

/** 根据弹出方向决定气泡的 top */
const bubbleTopFinal = computed(() => {
  const sr = spotlightRect.value
  const placement = bubblePlacement.value
  const bh = bubbleHeight.value || 120

  if (!sr) return (screenHeight - bh) / 2

  switch (placement) {
    case 'bottom':
      return sr.bottom + BUBBLE_GAP
    case 'top':
      return sr.top - bh - BUBBLE_GAP
    case 'left':
    case 'right':
      return Math.max(16, sr.top + sr.height / 2 - bh / 2)
    default:
      return sr.bottom + BUBBLE_GAP
  }
})

/** 气泡整体样式 */
const bubbleStyle = computed<CSSProperties>(() => ({
  position: 'fixed',
  left: `${bubbleLeftFinal.value}px`,
  top: `${Math.max(
    16,
    Math.min(bubbleTopFinal.value, screenHeight - (bubbleHeight.value || 120) - 16),
  )}px`,
  width: `${BUBBLE_WIDTH}px`,
  opacity: measured.value ? '1' : '0',
  zIndex: String(props.zIndex + 1),
}))

/** 箭头偏移样式：使箭头对准目标元素中心 */
const arrowOffsetStyle = computed(() => {
  if (!targetRect.value) return {}
  const placement = bubblePlacement.value
  const ARROW_HALF = 8

  if (placement === 'top' || placement === 'bottom') {
    const targetCenter = (targetRect.value.left || 0) + (targetRect.value.width || 0) / 2
    const raw = targetCenter - bubbleLeftFinal.value - ARROW_HALF
    const clamped = Math.max(12, Math.min(raw, BUBBLE_WIDTH - 28))
    return { left: `${clamped}px` }
  }

  if (placement === 'left' || placement === 'right') {
    const targetMiddle = (targetRect.value.top || 0) + (targetRect.value.height || 0) / 2
    const raw = targetMiddle - Math.max(16, bubbleTopFinal.value) - ARROW_HALF
    const clamped = Math.max(12, Math.min(raw, (bubbleHeight.value || 120) - 28))
    return { top: `${clamped}px` }
  }

  return {}
})

// ---- 事件处理 ----

const onMaskClick = () => {
  if (props.maskClosable) onClose()
}

const onClose = () => {
  emit('update:show', false)
  emit('close')
}

const onPrev = () => {
  const prev = props.current - 1
  emit('update:current', prev)
  emit('change', prev)
}

const onNext = () => {
  const next = props.current + 1
  emit('update:current', next)
  emit('change', next)
}

const onFinish = () => {
  emit('update:show', false)
  emit('finish')
}
</script>

<style lang="scss">
@import './tour.scss';
</style>
