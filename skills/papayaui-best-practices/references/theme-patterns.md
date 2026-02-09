# 主题变量与样式定制模式

## 目标

通过 `--pa-*` CSS 变量完成全局主题和局部组件样式定制，不改动组件源码。

## 推荐分层策略

1. 全局主题层：在 `App.vue` 的 `page`（小程序）和 `:root`（H5）设置品牌色与全局变量。
2. 页面主题层：在页面根类中覆盖页面级变量。
3. 组件主题层：在组件外层 class 上覆盖单组件变量。

## 全局示例

```scss
/* App.vue */
page {
  --pa-color-primary: #00a34f;
  --pa-color-warning: #ffaf42;
  --pa-color-danger: #f56c6c;
  --pa-color-gray: #f0f2f5;
}

:root {
  --pa-color-primary: #00a34f;
}
```

## 页面/组件局部示例

```vue
<template>
  <view class="task-page">
    <pa-cell-group class="task-group">
      <pa-cell title="标题" value="内容" />
    </pa-cell-group>
  </view>
</template>

<style lang="scss" scoped>
.task-page {
  --pa-cell-group-margin-x: 24rpx;
  --pa-cell-group-rounded: 5px;
}

.task-group {
  --pa-cell-title-color: #222;
}
</style>
```

## 动态主题示例

使用绑定 style 的方式动态切换变量值。

```ts
const cellStyle = ref({
  "--pa-cell-title-color": "#222",
});
```

## 与内置样式协同建议

1. 结构和间距优先用内置样式类（`flex`、`p-*`、`m-*`）。
2. 视觉主题通过 `--pa-*` 变量控制，不直接覆盖组件内部实现类。
3. 仅在必要场景使用 `:deep`，优先变量覆盖。

## 常见误区与修正

1. 误区：直接修改 papayaui 组件源码来改色。
   修正：统一通过 `--pa-*` 变量覆盖。
2. 误区：把所有变量都写在单个页面，导致主题分散。
   修正：品牌与全局变量放 App 层，页面只保留差异变量。
3. 误区：用大量硬编码颜色替代变量。
   修正：先使用主题变量，再考虑个别补充色。
4. 误区：内置样式类和变量同时冲突修改同一属性。
   修正：结构由工具类决定，主题由变量决定，职责分离。

## 快速检查清单

- 全局品牌色是否在 App 层集中维护。
- 页面是否只覆盖必要变量。
- 组件微调是否优先变量覆盖。
- 主题定制是否避免修改组件源码。
