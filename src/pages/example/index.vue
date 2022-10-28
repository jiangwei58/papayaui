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
    components: { title: '基础组件', index: 0 },
  }
  const data: NavGroupItem[] = []
  pageConfig.pages.forEach((page) => {
    for (const key in group) {
      if (!data[group[key].index]) {
        data[group[key].index] = {
          title: group[key].title,
          list: [],
        }
      }
      if (page.path.includes(key)) {
        data[group[key].index].list.push({
          title: page.style.navigationBarTitleText,
          path: `/${page.path}`,
        })
      }
    }
  })
  navList.value = data
})
</script>

<style lang="scss" scoped></style>
