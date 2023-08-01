<template>
  <view
    :class="ns.b()"
    :style="{
      zIndex,
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
import useNamespace from '../../core/useNamespace'
import { watermarkProps } from './props'

const ns = useNamespace('watermark')

const props = defineProps(watermarkProps)

const { contents } = toRefs(props)

const internalInstance = getCurrentInstance()
const src = ref<string>('')

onMounted(() => {
  createWatermark(contents.value)
})

watch(contents, (newVal) => {
  src.value = ''
  createWatermark(newVal)
})

const createWatermark = (text: string | string[]) => {
  const textList = Array.isArray(text) ? text : [text]
  if (!textList.length) return

  const query = uni.createSelectorQuery()
  query
    .in(internalInstance)
    .select('#watermark')
    .fields({ node: true, size: true } as UniApp.NodeField, () => {})
    .exec((res) => {
      let canvas = null
      // #ifdef MP
      canvas = res[0].node as HTMLCanvasElement
      // #endif
      // #ifdef H5
      canvas = document.querySelector('#watermark canvas') as HTMLCanvasElement
      // #endif

      const ctx = canvas.getContext('2d')
      if (!ctx) return

      // #ifdef MP
      const dpr = uni.getSystemInfoSync().pixelRatio
      canvas.width = props.width * dpr
      canvas.height = props.height * dpr
      ctx.scale(dpr, dpr)
      // #endif

      ctx.textAlign = 'center'
      ctx.textBaseline = 'middle'

      ctx.translate(res[0].width / 2, res[0].height / 2 - textList.length * (props.fontSize / 2))
      ctx.rotate((Math.PI / 180) * Number(props.rotate))

      ctx.font = `${props.fontSize}px ${props.fontFamily}`
      ctx.fillStyle = props.fontColor
      textList.forEach((text, index) => {
        ctx.fillText(text, 0, index * (props.fontSize + 5))
      })

      src.value = canvas.toDataURL()
    })
}
</script>

<style lang="scss" scoped>
@import './watermark.scss';
</style>
