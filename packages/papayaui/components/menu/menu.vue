<template>
  <view :class="ns.b()">
    <view :class="ns.e('bar')" :style="{ zIndex: isMenuItemShow ? zIndex + 1 : 'auto' }">
      <view
        v-for="(item, index) in menuBarList"
        :key="index"
        :class="[ns.e('item'), ns.is('active', item.show)]"
        @tap="onShowMenu(index)"
      >
        <text :class="ns.e('title')">{{ item.title }}</text>
      </view>
    </view>
    <slot />
  </view>
</template>

<script lang="ts" setup>
import type { Ref } from 'vue'
import { computed, getCurrentInstance, onMounted, provide, ref } from 'vue'
import { useNamespace } from '@papayaui/core'
import { useRect } from '../../hooks'
import type { MenuItemInstance } from '../menu-item/menu-item.vue'
import type { MenuProps } from './props'
import { menuProps } from './props'

export interface MenuProvideData {
  props: Required<MenuProps>
  setChildren: (node: MenuItemInstance) => void
  isMenuItemShow: Ref<boolean>
  offset: Ref<{ top: number; bottom: number }>
}

const ns = useNamespace('menu')

const props = defineProps(menuProps)

const systemInfo = uni.getSystemInfoSync()
const instance = getCurrentInstance()

const children = ref<MenuItemInstance[]>([])
const menuBarList = computed(() => {
  return children.value.map((child) => {
    return {
      title: child.title || child.activeItem.text,
      show: child.show,
    }
  })
})
// 是否有菜单展开
const isMenuItemShow = computed<boolean>(() => {
  return menuBarList.value.some((item) => item.show)
})
const offset = ref<{ top: number; bottom: number }>({ top: 0, bottom: 0 })

onMounted(() => {
  if (!instance) return
  useRect(instance, `.${ns.b()}`).then((node) => {
    if (node) {
      offset.value = { top: node.top + node.height, bottom: systemInfo.windowHeight - node.top }
    }
  })
})

const setChildren = (node: MenuItemInstance) => {
  children.value.push(node as any)
}

const onShowMenu = (index: number) => {
  children.value.forEach((node, nodeIndex) => {
    const nodeExpose = node
    if (nodeIndex === index) {
      nodeExpose?.toggle()
    } else if (node.show) {
      nodeExpose?.toggle(false)
    }
  })
}

provide<MenuProvideData>(`${ns.b()}-provide`, {
  props,
  setChildren,
  isMenuItemShow,
  offset,
})
</script>

<style lang="scss">
@import './menu.scss';
</style>
