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
import DocDemoBlock from '../../lib/doc/doc-demo-block.vue'
import DocNavBlockCell from '../../lib/doc/doc-nav-block-cell.vue'
import { ref } from 'vue'

interface NavGroupItem {
  title: string
  list: NavItem[]
}

interface NavItem {
  title: string
  path: string
}

const navList = ref<NavGroupItem[]>([
  {
    title: '基础组件',
    list: [
      { title: 'Container 页面容器', path: '/lib/components/container/demo' },
      { title: 'Cascader 级联选择', path: '/lib/components/cascader/demo' },
      { title: 'PickerPopup 选择弹窗', path: '/lib/components/picker-popup/demo' },
      { title: 'Form 表单', path: '/lib/components/form/demo' },
    ],
  },
])
</script>

<style lang="scss" scoped></style>
