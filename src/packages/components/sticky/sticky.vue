<template>
  <view :id="elId" :class="[ns.b(), ns.is('fixed', isFixed)]" :style="style">
    <view :class="ns.e('content')" :style="stickyContent">
      <slot />
    </view>
  </view>
</template>

<script setup lang="ts">
import { computed, CSSProperties, getCurrentInstance, nextTick, onMounted, ref } from 'vue'
import useNamespace from '../../core/useNamespace'
import { useRect } from '../../hooks'
import { StickyProps } from './props'

const instance = getCurrentInstance()

const ns = useNamespace('sticky')

const props = defineProps(StickyProps)

const elId = 'stickyId' + new Date().getTime().toString()
let _contentObserver: UniApp.IntersectionObserver | undefined = void 0

const isFixed = ref(false)
const height = ref(0)

// 吸顶的top值，因为可能受自定义导航栏影响，最终的吸顶值非offsetTop值
const stickyTop = computed(() => {
  let navHeight = props.customNavHeight
  // #ifdef H5
  // H5端的导航栏属于“自定义”导航栏的范畴，因为它是非原生的，与普通元素一致
  navHeight = 44
  // #endif
  return getPx(props.offsetTop) + getPx(navHeight)
})

const _zIndex = computed<CSSProperties['zIndex']>(() => {
  return props.zIndex ? +props.zIndex : 97
})

const style = computed(() => {
  const style: CSSProperties = {}
  if (!props.disabled) {
    if (props.cssSticky) {
      style.top = stickyTop.value + 'px'
      style.zIndex = _zIndex.value
    } else {
      style.height = isFixed.value ? height.value + 'px' : 'auto'
    }
  } else {
    style.position = 'static'
  }
  return style
})

const stickyContent = computed(() => {
  // 吸顶内容的样式
  const style: CSSProperties = {}
  if (!props.cssSticky) {
    style.position = isFixed.value ? 'fixed' : 'static'
    style.top = stickyTop.value + 'px'
    style.zIndex = _zIndex.value
  }
  return style
})

const getPx = (value: string | number) => {
  if (/^[+-]?(\d+\.?\d*|\.\d+|\d\.\d+e\+\d+)$/.test(value.toString())) {
    return Number(value)
  }
  // 如果带有rpx，先取出其数值部分，再转为px值
  if (/(rpx|upx)$/.test(value.toString())) {
    return Number(uni.upx2px(parseInt(value.toString())))
  }
  return parseInt(value.toString())
}

const initObserveContent = () => {
  // 获取吸顶内容的高度，用于在js吸顶模式时，给父元素一个填充高度，防止"塌陷"
  if (!instance) return
  useRect(instance, `#${elId}`).then((node) => {
    if (node) {
      height.value = node.height
    }
    nextTick(() => {
      observeContent()
    })
  })
}

const observeContent = () => {
  // 先断掉之前的观察
  disconnectObserver()
  const contentObserver = uni.createIntersectionObserver(instance, {
    // 检测的区间范围
    thresholds: [0.95, 0.98, 1],
  })
  // 到屏幕顶部的高度时触发
  contentObserver.relativeToViewport({
    top: -stickyTop.value,
  })
  // 绑定观察的元素
  contentObserver.observe(`#${elId}`, (res) => {
    const top = res.boundingClientRect.top
    isFixed.value = top <= stickyTop.value
  })
  _contentObserver = contentObserver
}

const disconnectObserver = () => {
  // 断掉观察，释放资源
  _contentObserver && _contentObserver.disconnect()
}

onMounted(() => {
  if (!props.disabled && !props.cssSticky) {
    initObserveContent()
  }
})
</script>

<style lang="scss" scoped>
@import '../../styles/vars.scss';
.#{$prefix}-sticky {
  position: sticky;

  &--fixed &__content {
    position: fixed;
    top: 0;
    right: 0;
    left: 0;
  }
}
</style>
