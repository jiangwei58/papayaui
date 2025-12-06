<template>
  <view :class="ns.b()">
    <view
      :class="[
        ns.e('content'),
        ns.is('border', border),
        ns.is('fixed', fixed),
        ns.is('safe-bottom', safeAreaInsetBottom),
      ]"
      :style="contentStyle"
    >
      <slot />
    </view>
    <view
      v-if="fixed && placeholder"
      :class="ns.e('placeholder')"
      :style="{
        height: placeholderHeight + 'px',
      }"
    />
  </view>
</template>

<script setup lang="ts">
import { computed, getCurrentInstance, onMounted, ref, type CSSProperties } from 'vue'
import { useNamespace } from '../../core'
import { useRect } from '../../hooks'
import { tabbarEmits, tabbarProps, type TabbarExpose } from './props'

const ns = useNamespace('tabbar')

const props = defineProps(tabbarProps)
const emit = defineEmits(tabbarEmits)

const instance = getCurrentInstance()
const children = ref<Array<string | number>>([])
const placeholderHeight = ref(0)

const contentStyle = computed(() => {
  const style: CSSProperties = {}
  if (props.zIndex) {
    style.zIndex = props.zIndex
  }
  return style
})

const updatePlaceholderHeight = () => {
  if (!instance) return
  useRect(instance, `.${ns.e('content')}`).then((rect) => {
    if (rect) {
      placeholderHeight.value = rect.height
    }
  })
}

const onChange = (name: string | number) => {
  emit('update:modelValue', name)
  emit('change', name)
}

onMounted(() => {
  updatePlaceholderHeight()
})

defineExpose<TabbarExpose>({
  children,
  onChange,
})
</script>

<style lang="scss">
@import './tabbar.scss';
</style>
