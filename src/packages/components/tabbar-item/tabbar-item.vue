<template>
  <view :class="[ns.b(), ns.is('active', isActive)]" :style="customStyle" @tap="onClick">
    <Badge :show="dot || !isUndefined(info)" :dot="dot" :content="info">
      <view :class="ns.e('icon')">
        <slot v-if="$slots.icon" name="icon" :active="isActive" />
        <IconComponent v-else :name="icon" :class-prefix="iconPrefix" />
      </view>
    </Badge>
    <view :class="ns.e('text')">{{ text }}</view>
  </view>
</template>

<script setup lang="ts">
import { computed, getCurrentInstance, onMounted, ref, type CSSProperties } from 'vue'
import { useNamespace } from '../../core'
import { isUndefined } from '../../utils'
import { getParentInstance } from '../../utils/component'
import Badge from '../badge/badge.vue'
import IconComponent from '../icon/icon.vue'
import type { TabbarExpose, TabbarProps } from '../tabbar/props'
import { tabbarItemProps } from './props'

const ns = useNamespace('tabbar-item')

const props = defineProps(tabbarItemProps)

const instance = getCurrentInstance()
const parent = getParentInstance<TabbarProps, TabbarExpose>(instance, 'tabbar')

const index = ref<number | undefined>()

const name = computed(() => {
  return props.name ?? index.value ?? 0
})

const isActive = computed(() => {
  return name.value === parent?.props.modelValue
})

const customStyle = computed(() => {
  if (!parent) return void 0
  const style: CSSProperties = {}
  if (parent.props.activeColor && isActive.value) {
    style.color = parent.props.activeColor
  }
  if (parent.props.inactiveColor && !isActive.value) {
    style.color = parent.props.inactiveColor
  }
  return style
})

const onClick = () => {
  // 非激活状态才发出事件
  if (parent && parent.exposed && !isActive.value) {
    parent.exposed.onChange(name.value)
    toPage()
  }
}

const toPage = () => {
  if (props.url) {
    uni[props.linkType]({
      url: props.url,
    })
  }
}

onMounted(() => {
  if (parent && parent.exposed) {
    // 操作父组件的children对象，按照添加顺序记录子组件的index
    index.value = parent.exposed.children.value.length
    parent.exposed.children.value.push(name.value)
  }
})
</script>

<style lang="scss" scoped>
@import './tabbar-item.scss';
</style>
<style lang="scss">
/* #ifdef MP */
// 由于小程序都使用shadow DOM形式实现，需要给影子宿主设置flex: 1才能让其撑开
:host {
  flex: 1;
}
/* #endif */
</style>
