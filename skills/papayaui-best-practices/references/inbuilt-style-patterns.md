# 内置样式应用模式

## 目标

使用 papayaui 内置样式类完成页面与组件布局，降低重复 SCSS，保持风格一致。

## 基础规则

1. 优先使用工具类组合，再补充少量业务样式。
2. 工具类数值默认单位为 `rpx`。
3. `${x}` 取值优先使用可被 `2` 或 `5` 整除的值。
4. 模板中先写结构类，再写视觉类，避免类名无序堆叠。

## 高频类族

### 布局

- `flex`、`flex-col`、`items-center`、`justify-between`
- `grid`、`grid-cols-${x}`、`gap-${x}`

### 间距

- 外边距：`m-${x}`、`mx-${x}`、`my-${x}`、`mt-${x}`、`mr-${x}`、`mb-${x}`、`ml-${x}`
- 内边距：`p-${x}`、`px-${x}`、`py-${x}`、`pt-${x}`、`pr-${x}`、`pb-${x}`、`pl-${x}`
- 文档常用范围：`0-80`

### 文字与颜色

- 字号：`text-${x}`（文档常用范围：`20-65`）
- 字重：`font-normal`、`font-bold`
- 对齐：`text-left`、`text-center`、`text-right`
- 文字色：`text-white`、`text-black`、`text-black-2`、`text-black-3`
- 背景色：`bg-white`、`bg-gray`、`bg-primary`

### 边框与圆角

- 细边框：`border`、`border-top`、`border-bottom`、`border-top-bottom`
- 圆角：`rounded-${x}`（文档常用范围：`3-35`）

## 推荐做法

页面结构直接使用工具类搭建，业务细节样式放到局部类里。

```vue
<template>
  <view class="page flex flex-col">
    <view class="flex items-center justify-between px-24 py-20 bg-white border-bottom">
      <text class="text-32 font-bold text-black">任务列表</text>
      <text class="text-24 text-black-2">筛选</text>
    </view>

    <view class="flex-1 px-24 py-20">
      <view v-for="item in list" :key="item.id" class="bg-white rounded-12 p-24 mb-20">
        <text class="text-28 text-black">{{ item.name }}</text>
      </view>
    </view>

    <view class="bg-white border-top px-24 py-16">
      <pa-button block type="primary">提交</pa-button>
    </view>
  </view>
</template>
```

## 组件最小示例

```vue
<template>
  <view class="card p-24 rounded-12 bg-white">
    <view class="flex items-center justify-between">
      <text class="text-28 font-bold">标题</text>
      <text class="text-24 text-black-3">更多</text>
    </view>
  </view>
</template>
```

## 常见误区与修正

1. 误区：大量使用内联样式控制间距和排版。
   修正：用 `p-*`、`m-*`、`flex`、`text-*` 替代。
2. 误区：使用不规则数值类名（如 `p-13`、`mt-17`）。
   修正：使用约定取值，优先可被 `2` 或 `5` 整除的值。
3. 误区：同一节点同时写工具类和冲突自定义样式。
   修正：保持工具类语义稳定，业务视觉用额外类扩展。
4. 误区：每个页面重复拼接同一批类组合。
   修正：提炼公共块类，仅在页面中做组合。

## 快速检查清单

- 页面骨架主要由工具类完成。
- 文本层级使用 `text-*` + 颜色类。
- 卡片/区块统一使用 `bg-*` + `rounded-*` + `border-*`。
- 业务 SCSS 仅负责差异化视觉。
