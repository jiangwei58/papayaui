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
      <IconComponent v-else name="image" :class="ns.e('loading-icon')" />
    </view>
    <view v-if="status === 'error'" :class="ns.e('error')">
      <slot v-if="$slots.error" name="error" />
      <IconComponent v-else name="image-error" :class="ns.e('error-icon')" />
    </view>
  </view>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { useNamespace } from '@papayaui/core'
import { getUnitValue } from '@papayaui/utils'
import IconComponent from '../icon/icon.vue'
import { imageEmits, imageProps } from './props'

const ns = useNamespace('image')

defineProps(imageProps)
const emit = defineEmits(imageEmits)

const status = ref<'success' | 'loading' | 'error'>('loading')

const onError = () => {
  status.value = 'error'
}

const onLoad = () => {
  status.value = 'success'
}
</script>

<style lang="scss">
@import './image.scss';
</style>
