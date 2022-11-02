<template>
  <DocDemoBlock
    v-for="groupItem in navList"
    :key="groupItem.title"
    :title="groupItem.title"
    class="block px-26"
  >
    <DocNavBlockCell
      v-for="(item, index) in groupItem.list"
      :key="index"
      :title="item.title"
      :path="item.path"
    />
  </DocDemoBlock>
  <view class="safe-buttom-padding" />
</template>

<script lang="ts" setup>
import DocDemoBlock from '../../packages/doc/doc-demo-block.vue'
import DocNavBlockCell from '../../packages/doc/doc-nav-block-cell.vue'
import { onMounted, ref } from 'vue'
import pageConfig from '../../pages.json'

interface NavGroupItem {
  title: string
  list: NavItem[]
}

interface NavItem {
  title: string
  path: string
}

const navList = ref<NavGroupItem[]>([])

onMounted(() => {
  const group: Record<string, { title: string; index: number }> = {
    layout: { title: '布局组件', index: 0 },
    base: { title: '基础组件', index: 1 },
    form: { title: '表单组件', index: 2 },
    nav: { title: '导航组件', index: 3 },
    show: { title: '展示组件', index: 4 },
  }
  const data: NavGroupItem[] = []
  pageConfig.pages.forEach((page) => {
    if (!page.type) return
    const classify = group[page.type]
    if (!data[classify.index]) {
      data[classify.index] = {
        title: classify.title,
        list: [],
      }
    }
    if (page.path.startsWith('packages')) {
      data[classify.index].list.push({
        title: page.style.navigationBarTitleText,
        path: `/${page.path}`,
      })
    }
  })
  navList.value = data
})
</script>

<style lang="scss" scoped></style>
