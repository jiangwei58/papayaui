# pa-container 页面容器模式

## 目标

将 `pa-container` 作为页面默认骨架，统一处理固定头部、内容区和底部操作区。

## 插槽职责

1. `header`：放固定顶部内容（搜索栏、筛选条、页签）。
2. `default`：放主要业务内容（列表、表单、详情）。
3. `bottom`：放固定底部操作（提交、批量操作、确认按钮）。

## 推荐做法

```vue
<template>
  <pa-container ref="containerRef" class="page">
    <template #header>
      <view class="bg-white border-bottom px-24 py-16">
        <pa-search v-model="keyword" placeholder="搜索" />
      </view>
    </template>

    <view class="px-24 py-20">
      <view v-for="item in list" :key="item.id" class="bg-white p-24 rounded-12 mb-20">
        {{ item.name }}
      </view>
    </view>

    <template #bottom>
      <view class="bg-white border-top px-24 py-16">
        <pa-button block type="primary">确定</pa-button>
      </view>
    </template>
  </pa-container>
</template>

<script setup lang="ts">
import { ref } from "vue";
import type { ContainerInstance } from "papayaui";

const containerRef = ref<ContainerInstance>();
</script>
```

## 动态高度刷新

当 `header` 或 `bottom` 内容动态变化高度时，调用 `containerRef.value?.updateHeight()`。

典型触发时机：

- 展开或收起筛选区域
- 切换底部按钮组
- 异步渲染导致固定区域高度变化

## 常用属性建议

1. `safeBottom`：小程序底部安全区兼容建议保持开启。
2. `partialContent`：只希望中间内容区滚动时开启。
3. `useHeaderSlot` / `useFooterSlot`：明确无头部或无底部时显式关闭。

## 常见误区与修正

1. 误区：固定底部用自定义 `position: fixed` 写在 `pa-container` 外层。
   修正：将操作区放进 `#bottom` 插槽。
2. 误区：动态切换头部/底部内容后不刷新高度。
   修正：结构变化后调用 `updateHeight`。
3. 误区：把大量可滚动内容放进 `#header`。
   修正：`#header` 保持轻量，将长内容放回默认插槽。
4. 误区：页面滚动与内部滚动混用且无约束。
   修正：明确滚动模型，必要时配合 `partialContent` 统一。

## 快速检查清单

- 页面根节点是否使用 `pa-container`。
- `header/default/bottom` 职责是否清晰。
- 固定区域动态变高时是否调用 `updateHeight`。
- 安全区与滚动行为是否在真机验证通过。
