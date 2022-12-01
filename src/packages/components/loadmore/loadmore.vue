<template>
  <view :class="computedClass('loadmore')">
    <view
      v-if="status === 'loading'"
      :style="{ width: getUnitValue(iconSize), height: getUnitValue(iconSize) }"
      class="loadmore_img loadmore_img_weixin"
    >
      <view
        class="loadmore_img-icon"
        :style="{ borderTopColor: color, borderTopWidth: 20 / 12 }"
      ></view>
      <view
        class="loadmore_img-icon"
        :style="{ borderTopColor: color, borderTopWidth: 20 / 12 }"
      ></view>
      <view
        class="loadmore_img-icon"
        :style="{ borderTopColor: color, borderTopWidth: 20 / 12 }"
      ></view>
    </view>
    <text v-if="showText" class="loadmore_text" :style="{ color: textColor }">
      {{
        status === 'loadmore'
          ? localConfig.loadmore
          : status === 'loading'
          ? localConfig.loading
          : localConfig.nomore
      }}
    </text>
  </view>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import { getUnitValue } from '../../utils'
import { computedClass, PREFIX } from '../../utils/style'

export interface LoadStatus {
  loadmore: string
  loading: string
  nomore: string
}

export interface LoadmoreProps {
  /** 加载状态配置{loadmore, loading, nomore} */
  config?: Partial<LoadStatus>
  /** 当前状态 */
  status?: keyof LoadStatus
  /** 加载图标颜色 */
  color?: string
  /** 文字颜色 */
  textColor?: string
  /** 加载图标大小 */
  iconSize?: string
  /** 显示文字 */
  showText?: boolean
}

const props = withDefaults(defineProps<LoadmoreProps>(), {
  config: undefined,
  status: 'loadmore',
  color: `var(--${PREFIX}-color-primary)`,
  textColor: '#646566',
  iconSize: '20px',
  showText: true,
})

const localConfig = computed<LoadStatus>(() => {
  return {
    loadmore: '轻轻上拉',
    loading: '加载中...',
    nomore: '没有更多了',
    ...props.config,
  }
})
</script>

<style lang="scss" scoped>
@import '../../styles/vars.scss';
.#{$prefix}-loadmore {
  display: flex;
  flex-direction: row;
  height: 40px;
  align-items: center;
  justify-content: center;
}

.loadmore_text {
  font-size: 14px;
  margin-left: 8px;
}

.loadmore_img {
  width: 24px;
  height: 24px;
}

.loadmore_img_weixin {
  position: relative;
  width: 24px;
  height: 24px;
  transform: rotate(0deg);
  animation: loading-ios 1s 0s ease infinite;
}

.loadmore_img_weixin .loadmore_img-icon {
  position: absolute;
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  border-radius: 50%;
  border: solid 2px transparent;
  border-top: solid 2px #777777;
  transform-origin: center;
}

.loadmore_img_weixin .loadmore_img-icon:nth-child(1) {
  animation: loading-animation-1 1s 0s linear infinite;
}

.loadmore_img_weixin .loadmore_img-icon:nth-child(2) {
  animation: loading-animation-2 1s 0s linear infinite;
}

.loadmore_img_weixin .loadmore_img-icon:nth-child(3) {
  animation: loading-animation-3 1s 0s linear infinite;
}

@keyframes loading-animation-1 {
  0% {
    transform: rotate(0deg);
  }

  50% {
    transform: rotate(90deg);
  }

  100% {
    transform: rotate(360deg);
  }
}

@keyframes loading-animation-2 {
  0% {
    transform: rotate(0deg);
  }

  50% {
    transform: rotate(180deg);
  }

  100% {
    transform: rotate(360deg);
  }
}

@keyframes loading-animation-3 {
  0% {
    transform: rotate(0deg);
  }

  50% {
    transform: rotate(270deg);
  }

  100% {
    transform: rotate(360deg);
  }
}
</style>
