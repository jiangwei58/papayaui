# useList 列表分页模式

## 目标

使用 `useList` 统一分页加载、空状态和加载状态，避免每个页面重复手写分页逻辑。

## 标准流程

1. 通过 `useList` 初始化列表状态。
2. 用 `getData` 包装接口请求。
3. 条件变化（筛选/搜索）时执行 `reset -> getData`。
4. 仅在触底回调里递增 `pageNumber` 并加载下一页。

## 推荐做法

```vue
<script setup lang="ts">
import { onReachBottom, onShow } from "@dcloudio/uni-app";
import { ref } from "vue";
import { useList } from "papayaui";

interface TaskItem {
  id: number;
  name: string;
}

const { list, pageNumber, pageSize, loadStatus, isEmpty, onlyOnePage, getListData, reset } =
  useList<TaskItem>();

const keyword = ref("");

const getData = () => {
  return getListData(async () => {
    const res = await fetchTaskList({
      pageNumber: pageNumber.value + 1,
      pageSize: pageSize.value,
      keyword: keyword.value,
    });
    return { list: res.content };
  });
};

const onFilterChange = () => {
  reset();
  getData();
};

onShow(() => {
  reset();
  getData();
});

onReachBottom(() => {
  pageNumber.value += 1;
  getData();
});
</script>
```

## 状态渲染建议

```vue
<template>
  <BaseEmpty v-if="isEmpty" description="暂无数据" />
  <pa-loadmore v-else-if="!onlyOnePage" :status="loadStatus" />
</template>
```

## 并发防覆盖（key 方案）

筛选、搜索快速切换时，使用 `key` 保证“最后一次请求”生效。

```ts
const getDataByKey = (query: string) => {
  const requestKey = `${query}-${Date.now()}`;
  return getListData(
    async () => {
      const res = await fetchTaskList({ query, pageNumber: 1, pageSize: pageSize.value });
      return { list: res.content, key: requestKey };
    },
    { key: requestKey },
  );
};
```

## 常见误区与修正

1. 误区：筛选变化后直接请求，不 `reset`。
   修正：固定使用 `reset -> getData`。
2. 误区：在多个地方递增 `pageNumber`。
   修正：只在 `onReachBottom` 中递增一次。
3. 误区：忽略 `onlyOnePage`，始终显示 `pa-loadmore`。
   修正：按 `isEmpty` / `onlyOnePage` / `loadStatus` 分支渲染。
4. 误区：并发请求导致旧数据覆盖新数据。
   修正：使用 `key` 做最新请求保护。

## 快速检查清单

- `getData` 返回结构满足 `{ list }`。
- 刷新和筛选均执行 `reset`。
- 触底流程固定为 `pageNumber += 1` 后再 `getData`。
- 页面显式处理 `isEmpty`、`onlyOnePage`、`loadStatus`。
