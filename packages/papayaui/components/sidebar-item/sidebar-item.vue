<template>
  <view
    :class="[
      ns.b(),
      ns.is('active', sidebarProvide.isSelected(value)),
      ns.is('disabled', disabled),
      customClass,
    ]"
    :style="customStyle"
    @tap="onSelect"
  >
    <Badge :show="dot || !isUndefined(badge)" :dot="dot" :content="badge">
      <slot v-if="$slots.title" name="title" />
      <text v-else :class="ns.e('text')">{{ title }}</text>
    </Badge>

    <slot v-if="$slots.after" name="after" />
  </view>
</template>

<script lang="ts" setup>
import { computed, inject, onMounted, ref, type Ref } from 'vue'
import { defaultNamespace, useNamespace } from '@papayaui/core'
import { isUndefined, noop } from '@papayaui/utils'
import Badge from '../badge/badge.vue'
import type { SidebarProvideData, SidebarValue } from '../sidebar/sidebar.vue'
import { sidebarItemEmits, sidebarItemProps } from './props'

export interface SidebarItemInstance {
  index: Ref<number>
}

const ns = useNamespace('sidebar-item')

const props = defineProps(sidebarItemProps)
const emit = defineEmits(sidebarItemEmits)

const sidebarProvide = inject<SidebarProvideData>(`${defaultNamespace}-sidebar-provide`, {
  setChildren: noop,
  onSelect: noop,
  isSelected: noop,
})

const index = ref<number>(0)
const value = computed<SidebarValue>(() => props.name ?? index.value)

const onSelect = () => {
  if (props.disabled) return
  sidebarProvide.onSelect(value.value)
  emit('click', value.value)
}

onMounted(() => {
  sidebarProvide.setChildren({
    index,
  })
})
</script>

<style lang="scss">
@import './sidebar-item.scss';
</style>
