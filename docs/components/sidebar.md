# Sidebar

## 示例

<!--codes start-->

::: code-group

```html [template]
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
```
```ts [script]
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
```

<!--codes end-->

## Props

<!--props start-->

| 参数 | 说明 | 类型 | 默认值 |
| --- | ----- | --- | --- |
| modelValue | 选择项值 | SidebarValue | - |
| customClass | 根节点样式类 | string | - |
| customStyle | 根节点样式 | string\|CSSProperties | - |

<!--props end-->

## Event

<!--event start-->

| 事件名 | 参数 |
| --- | --- |
| update:modelValue | (value: SidebarValue)  |
| change | (value: SidebarValue)  |

<!--event end-->

## Slot

<!--slot start-->

| 名称 | 说明 |
| --- | --- |
| default | - |

<!--slot end-->

