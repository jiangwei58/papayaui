<template>
  <view :class="ns.b()">
    <canvas
      :id="id"
      :canvas-id="id"
      type="2d"
      :style="{
        width: getUnitValue(size, 'px'),
        height: getUnitValue(size, 'px'),
      }"
    />
    <view v-if="!text" :class="ns.e('text')">
      <slot></slot>
    </view>
    <cover-view v-else :class="ns.e('text')">{{ text }}</cover-view>
  </view>
</template>

<script setup lang="ts">
import { getCurrentInstance, onMounted, watch } from 'vue'
import { useNamespace } from '../../core'
import { getUnitValue } from '../../utils'
import { circleProps } from './props'

const ns = useNamespace('circle')

const props = defineProps(circleProps)

const instance = getCurrentInstance()
const id = ns.e('canvas') + Date.now()

const BEGIN_ANGLE = -Math.PI / 2
const PERIMETER = 2 * Math.PI
const STEP = 1

let context: CanvasRenderingContext2D | null = null
let currentValue = 0

onMounted(() => {
  // #ifdef H5
  initH5()
  // #endif
  // #ifndef H5
  initMP()
  // #endif
})

watch(
  () => props.modelValue,
  () => {
    if (context) {
      renderCircle(context)
    }
  },
)

const initMP = () => {
  const ratio = uni.getSystemInfoSync().pixelRatio
  const query = uni.createSelectorQuery()
  query
    .in(instance)
    .select('#' + id)
    .node(() => {})
    .exec((res) => {
      const canvas = res[0].node as HTMLCanvasElement
      const canvasSize = props.size * ratio
      canvas.width = canvasSize
      canvas.height = canvasSize
      context = canvas.getContext('2d')
      if (!context) return

      context.scale(ratio, ratio)
      renderCircle(context)
    })
}

const initH5 = () => {
  const ratio = window.devicePixelRatio
  const canvasSize = props.size * ratio
  const canvas = document.querySelector(`#${id} canvas`) as HTMLCanvasElement
  canvas.width = canvasSize
  canvas.height = canvasSize
  context = canvas.getContext('2d')
  if (!context) return

  context.scale(ratio, ratio)
  renderCircle(context)
}

const renderCircle = (ctx: CanvasRenderingContext2D) => {
  if (props.speed <= 0 || props.speed > 1000) {
    drawCircle(ctx, props.modelValue)
    return
  }

  let interval: number | null
  currentValue = currentValue ?? 0
  const run = () => {
    interval = setTimeout(() => {
      if (currentValue === props.modelValue) {
        stop()
        return
      }
      if (Math.abs(currentValue - props.modelValue) < STEP) {
        currentValue = props.modelValue
      } else if (currentValue < props.modelValue) {
        currentValue += STEP
      } else {
        currentValue -= STEP
      }
      drawCircle(ctx, currentValue)
      run()
    }, 1000 / props.speed) as unknown as number | null
  }

  const stop = () => {
    if (interval) {
      clearTimeout(interval)
      interval = null
    }
  }

  stop()
  run()
}

const drawLayerCircle = (ctx: CanvasRenderingContext2D) => {
  drawCanvas(ctx, BEGIN_ANGLE, PERIMETER, props.layerColor)
}

const drawCircle = (ctx: CanvasRenderingContext2D, value: number) => {
  const progress = PERIMETER * (value / 100)
  const endAngle = props.clockwise ? BEGIN_ANGLE + progress : 3 * Math.PI - (BEGIN_ANGLE + progress)
  ctx.clearRect(0, 0, props.size, props.size)
  drawLayerCircle(ctx)
  if (value !== 0) {
    drawCanvas(ctx, BEGIN_ANGLE, endAngle, props.color, props.clockwise)
  }
}

const drawCanvas = (
  ctx: CanvasRenderingContext2D,
  sRadian: number,
  eRadian: number,
  color: string,
  clockwise = true,
) => {
  const position = props.size / 2
  const lineWidth = Number(props.strokeWidth)
  const radius = position - lineWidth / 2

  ctx.beginPath()
  ctx.lineCap = 'round'
  ctx.strokeStyle = color
  ctx.lineWidth = lineWidth
  ctx.arc(position, position, radius, sRadian, eRadian, !clockwise)
  ctx.stroke()
}
</script>

<style lang="scss" scoped>
@import './circle.scss';
</style>
