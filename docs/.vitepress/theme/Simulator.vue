<template>
  <iframe ref="simulatorRef" class="doc-simulator" :src="src"></iframe>
</template>

<script setup lang="ts">
import { useData, useRoute } from 'vitepress'
import { onMounted, ref, watch } from 'vue'
import pageConfig from '../../../src/pages.json'

const simulatorRef = ref<HTMLIFrameElement>()

const { site } = useData()
const route = useRoute()

const baseUrl = `${site.value.base}mobile.html`
const src = ref(baseUrl)

const hideScroller = (el: HTMLIFrameElement) => {
  el.onload = () => {
    const doc = el.contentDocument
    if (!doc) return
    const style = doc.createElement('style')
    style.innerHTML = `::-webkit-scrollbar { width: 0; background: transparent; }`
    doc.querySelector('head')?.appendChild(style)
  }
}

const updatePath = () => {
  const name = route.data.relativePath.replace('.md', '')
  const demoPath = pageConfig.pages.find((page) => page.path.includes(name))
  if (demoPath) {
    src.value = `${baseUrl}#/${demoPath.path}`
  }
}

onMounted(() => {
  if (simulatorRef.value) {
    hideScroller(simulatorRef.value)
    updatePath()
  }
})

watch(route, () => {
  updatePath()
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
