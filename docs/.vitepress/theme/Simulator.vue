<template>
  <iframe ref="simulatorRef" class="doc-simulator" :src="src"></iframe>
</template>

<script setup lang="ts">
import { useData } from 'vitepress'
import { onMounted, ref } from 'vue'

const simulatorRef = ref<HTMLIFrameElement>()

const { site } = useData()
const src = `${site.value.base}index.html`

const hideScroller = (el: HTMLIFrameElement) => {
  el.onload = () => {
    const doc = el.contentDocument
    if (!doc) return
    const style = doc.createElement('style')
    style.innerHTML = `::-webkit-scrollbar { width: 0; background: transparent; }`
    doc.querySelector('head')?.appendChild(style)
  }
}

onMounted(() => {
  if (simulatorRef.value) {
    hideScroller(simulatorRef.value)
  }
})
</script>

<style>
.doc-simulator {
  flex: 1;
  width: 360px;
  max-height: 640px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 20px;
}
</style>
