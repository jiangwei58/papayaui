<template>
  <view
    :class="ns.b()"
    :style="
      ns.style({
        width: width && getUnitValue(width.toString()),
        height: height && getUnitValue(height.toString()),
        borderRadius: round === true ? getUnitValue('999') : getUnitValue(round || '0'),
      })
    "
    @tap="emit('click')"
  >
    <image
      :class="ns.e('img')"
      :src="src"
      :mode="mode"
      :lazy-load="lazyLoad"
      :webp="webp"
      :show-menu-by-longpress="showMenuByLongpress"
      @error="onError"
      @load="onLoad"
    />
    <view v-if="status === 'loading'" :class="ns.e('loading')">
      <slot v-if="$slots.loading" name="loading" />
      <Icon v-else name="image" size="32px" color="#dcdee0" />
    </view>
    <view v-if="status === 'error'" :class="ns.e('error')">
      <slot v-if="$slots.error" name="error" />
      <Icon v-else name="image-error" size="32px" color="#dcdee0" />
    </view>
  </view>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import useNamespace from '../../core/useNamespace'
import { getUnitValue } from '../../utils'
import Icon from '../icon/icon.vue'

interface ImageProps {
  /** 图片资源地址 */
  src?: string
  /** 图片裁剪、缩放的模式[详细地址](https://uniapp.dcloud.net.cn/component/image.html) */
  mode?: string
  /** 宽度 */
  width?: string | number
  /** 高度 */
  height?: string | number
  /** 圆角 */
  round?: boolean | string
  /** 图片懒加载 */
  lazyLoad?: boolean
  /** 在系统不支持webp的情况下是否单独启用webp。默认false，只支持网络资源。 */
  webp?: boolean
  /** 开启长按图片显示识别小程序码菜单 */
  showMenuByLongpress?: boolean
}

const ns = useNamespace('image')

withDefaults(defineProps<ImageProps>(), {
  src: '',
  mode: 'scaleToFill',
  width: undefined,
  height: undefined,
  round: undefined,
})

const emit = defineEmits<{
  (event: 'click'): void
}>()

const status = ref<'success' | 'loading' | 'error'>('loading')

const onError = () => {
  status.value = 'error'
}

const onLoad = () => {
  status.value = 'success'
}
</script>

<style lang="scss" scoped>
@import '../../styles/vars.scss';

.#{$prefix}-image {
  position: relative;
  display: inline-block;
  &__img {
    width: inherit;
    height: inherit;
    border-radius: inherit;
  }
  &__loading,
  &__error {
    position: absolute;
    top: 0;
    left: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    background-color: #f7f8fa;
    border-radius: inherit;
  }
}
</style>
