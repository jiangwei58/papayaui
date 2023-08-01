<template>
  <view class="grid grid-cols-2">
    <DocDemoBlock title="基础用法" card>
      <pa-sidebar v-model="activeVal">
        <pa-sidebar-item v-for="item in 3" :key="item" :title="`标签名${item}`" />
      </pa-sidebar>
    </DocDemoBlock>
    <DocDemoBlock title="徽标提示" card>
      <pa-sidebar v-model="activeVal2">
        <pa-sidebar-item title="标签名" dot />
        <pa-sidebar-item title="标签名" badge="9" />
        <pa-sidebar-item title="标签名" badge="99+" />
      </pa-sidebar>
    </DocDemoBlock>
  </view>
  <view class="grid grid-cols-2">
    <DocDemoBlock title="禁用选项" card>
      <pa-sidebar v-model="activeVal3">
        <pa-sidebar-item
          v-for="item in 3"
          :key="item"
          :title="`标签名${item}`"
          :disabled="item === 2"
        />
      </pa-sidebar>
    </DocDemoBlock>
    <DocDemoBlock title="切换事件" card>
      <pa-sidebar v-model="activeVal4" @change="onChange">
        <pa-sidebar-item title="标签名" />
        <pa-sidebar-item title="标签名" />
        <pa-sidebar-item title="标签名" />
      </pa-sidebar>
    </DocDemoBlock>
  </view>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import DocDemoBlock from '../../doc/doc-demo-block.vue'
import type { SidebarValue } from './sidebar.vue'

const activeVal = ref(0)
const activeVal2 = ref(0)
const activeVal3 = ref(0)
const activeVal4 = ref(0)

const onChange = (value: SidebarValue) => {
  uni.showToast({
    icon: 'none',
    title: `你切换的值是 ${value}`,
  })
}
</script>

<style lang="scss" scoped></style>
