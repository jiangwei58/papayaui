<template>
  <Popup
    :custom-class="ns.b()"
    :show="show"
    position="bottom"
    :height="height"
    :z-index="zIndex"
    :overlay="overlay"
    :bg-color="bgColor"
    :closeable="closeable"
    :round="round"
    :close-on-click-overlay="maskCloseAble"
    :safe-area-inset-bottom="false"
    @update:show="emit('update:show', !!$event)"
    @open="emit('open')"
    @opened="emit('opened')"
    @close="emit('close')"
    @closed="emit('closed')"
  >
    <view :class="[ns.e('wrapper'), { 'safe-bottom-padding': safeAreaInsetBottom }]">
      <view :class="ns.e('header')">
        <slot name="before-title"></slot>
        <text :class="ns.e('title')">{{ title }}</text>
        <slot name="after-title"></slot>
      </view>

      <view :class="ns.e('body')">
        <view class="flex-1" style="overflow: hidden">
          <slot></slot>
        </view>

        <view v-if="$slots.footer" :class="ns.e('footer')">
          <slot name="footer"></slot>
        </view>
      </view>
    </view>
  </Popup>
</template>

<script lang="ts" setup>
import { toRefs } from 'vue'
import useNamespace from '../../core/useNamespace'
import Popup from '../popup/popup.vue'
import { bottomPopupEmits, bottomPopupProps } from './props'

const ns = useNamespace('bottom-popup')

const props = defineProps(bottomPopupProps)
const emit = defineEmits(bottomPopupEmits)

const { show } = toRefs(props)
</script>

<style lang="scss">
@import './bottom-popup.scss';
</style>
