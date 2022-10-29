<template>
  <view
    :class="computedClass('watermark')"
    :style="{
      zIndex: zindex,
      background: `url(${src}) repeat`,
      backgroundSize: `${width}px ${height}px`,
    }"
  >
    <canvas
      v-if="!src"
      id="watermark"
      canvas-id="watermark"
      type="2d"
      :style="{ width: width + 'px', height: height + 'px' }"
    ></canvas>
  </view>
</template>

<script lang="ts" setup>
import { ref, toRefs, onMounted, getCurrentInstance, watch } from 'vue'
import { computedClass } from '../../utils/style'

interface WatermarkProps {
  /** 单个水印宽度 */
  width?: number
  /** 单个水印高度 */
  height?: number
  /** 水印内容距离画布顶部的距离 */
  top?: number
  /** 水印透明度 */
  opacity?: number
  /** 水印字体大小 */
  fontsize?: number
  /** 水印元素层级 */
  zindex?: number
  /** 水印内容，数组的每个元素代表每一行的内容 */
  contents?: string[]
}

const props = withDefaults(defineProps<WatermarkProps>(), {
  width: 125,
  height: 125,
  top: 50,
  opacity: 0.2,
  fontsize: 12,
  zindex: 1000,
  contents: () => [],
})

const { width, top, opacity, fontsize, contents } = toRefs(props)

const internalInstance = getCurrentInstance()
const src = ref<string>('')

onMounted(() => {
  createWatermark(contents.value)
})

watch(contents, (newVal) => {
  src.value = ''
  createWatermark(newVal)
})

const createWatermark = (textList: string[]) => {
  if (!textList.length) return
  const query = uni.createSelectorQuery()
  query
    .in(internalInstance)
    .select('#watermark')
    .fields({ node: true, size: true }, () => {})
    .exec((res) => {
      const canvas = res[0].node
      const ctx = canvas.getContext('2d')

      const dpr = uni.getSystemInfoSync().pixelRatio
      canvas.width = res[0].width * dpr
      canvas.height = res[0].height * dpr
      ctx.scale(dpr, dpr)

      ctx.rotate((-20 * Math.PI) / 180)
      ctx.fillStyle = `rgba(0,0,0,${opacity.value})`
      ctx.font = `${fontsize.value}px`
      ctx.textAlign = 'center'
      textList.forEach((text, index) => {
        ctx.fillText(text, res[0].width / 2 - 20, top.value + index * 16)
      })

      src.value = canvas.toDataURL()
    })
}
</script>

<style lang="scss" scoped>
@import '../../styles/vars.scss';
.#{$prefix}-watermark {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  min-height: 100vh;
  pointer-events: none;
}
</style>
