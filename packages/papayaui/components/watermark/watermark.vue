<template>
  <view
    :class="[ns.b(), ns.is('full-page', fullPage)]"
    :style="{
      zIndex,
      backgroundSize: `${gapX + width}px`,
      backgroundImage: `url(${imageUrl})`,
    }"
  >
  </view>
</template>

<script lang="ts" setup>
import { onMounted, ref, toRefs, watch } from 'vue'
import useNamespace from '../../core/useNamespace'
import { watermarkProps } from './props'

const ns = useNamespace('watermark')

const props = defineProps(watermarkProps)

const { contents } = toRefs(props)

const imageUrl = ref<string>('')

onMounted(() => {
  createWatermark(contents.value)
})

watch(contents, (newVal) => {
  imageUrl.value = ''
  createWatermark(newVal)
})

const createWatermark = (text: string | string[]) => {
  const textList = Array.isArray(text) ? text : [text]
  if (!textList.length) return

  // #ifdef H5
  initH5(textList)
  // #endif
  // #ifndef H5
  initMP(textList)
  // #endif
}

const initMP = (textList: string[]) => {
  const ratio = uni.getWindowInfo().pixelRatio
  const canvasWidth = `${(props.gapX + props.width) * ratio}`
  const canvasHeight = `${(props.gapY + props.height) * ratio}`
  const markWidth = props.width * ratio
  const markHeight = props.height * ratio
  const canvas: any = uni.createOffscreenCanvas({
    type: '2d',
    width: Number(canvasWidth),
    height: Number(canvasHeight),
  })
  const ctx = canvas.getContext('2d')
  if (!ctx) return

  drawText({ ctx, canvas, markWidth, markHeight, ratio, textList })
}

const initH5 = (textList: string[]) => {
  const ratio = window.devicePixelRatio
  const canvasWidth = `${(props.gapX + props.width) * ratio}px`
  const canvasHeight = `${(props.gapY + props.height) * ratio}px`
  const markWidth = props.width * ratio
  const markHeight = props.height * ratio
  const canvas = document.createElement('canvas')
  const ctx = canvas.getContext('2d')
  canvas.setAttribute('width', canvasWidth)
  canvas.setAttribute('height', canvasHeight)
  if (!ctx) return

  drawText({ ctx, canvas, markWidth, markHeight, ratio, textList })
}

const drawText = ({
  ctx,
  canvas,
  markWidth,
  markHeight,
  ratio,
  textList,
}: {
  ctx: any
  canvas: HTMLCanvasElement
  markWidth: number
  markHeight: number
  ratio: number
  textList: string[]
}) => {
  ctx.textBaseline = 'middle'
  ctx.textAlign = 'center'
  // 文字绕中间旋转
  ctx.translate(markWidth / 2, markHeight / 2)
  ctx.rotate((Math.PI / 180) * Number(props.rotate))
  const markSize = Number(props.fontSize) * ratio
  ctx.font = `normal normal normal ${markSize}px/${markHeight}px ${props.fontFamily}`
  ctx.fillStyle = props.fontColor
  textList.forEach((text, index) => {
    ctx.fillText(text, 0, index * (props.fontSize * ratio + 5))
  })
  ctx.restore()
  imageUrl.value = canvas.toDataURL()
}
</script>

<style lang="scss">
@import './watermark.scss';
</style>
