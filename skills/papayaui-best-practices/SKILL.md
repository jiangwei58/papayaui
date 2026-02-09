---
name: papayaui-best-practices
description: 面向 uniapp 业务开发的 papayaui 最佳实践技能。用于实现、重构或评审页面/组件时，尤其是以下场景：内置样式类（flex、text-xx、m-xx、p-xx）应用、pa-container 页面骨架、useList 分页与加载状态、pa-form 表单建模与校验，以及 papayaui/request 拦截器封装、--pa-* 主题变量定制。
---

# papayaui 最佳实践

使用本技能输出可直接落地的 papayaui 业务开发方案。

## 第一版硬性范围

始终优先覆盖以下四个主题：

1. 内置样式工具类
2. `pa-container` 页面骨架
3. `useList` 列表分页流程
4. `pa-form` 表单建模与校验

将上述主题视为必答项，不作为可选项处理。

## 执行流程

1. 先识别用户问题属于哪个场景。
2. 如果是“组件选型/组件能力对比”问题，先查组件索引。
3. 只加载最小必要的 reference 文件。
4. 按固定顺序输出：
   - 推荐做法
   - 最小可运行示例
   - 常见误区与修正
5. 优先使用仓库中已验证的模式，不给泛化的 Vue 建议。

## 场景路由

- 内置样式：`references/inbuilt-style-patterns.md`
- 页面容器：`references/container-patterns.md`
- 列表分页：`references/use-list-patterns.md`
- 表单校验：`references/form-patterns.md`
- 请求封装：`references/request-patterns.md`
- 主题与变量：`references/theme-patterns.md`
- 组件索引：`references/component-index.md`
- 常见反模式：`references/anti-patterns.md`

## 第二优先主题

当用户问题涉及接口调用或主题定制时，补充以下主题：

1. `papayaui/request` 拦截器链路与错误处理
2. `--pa-*` 变量的全局/局部主题覆盖策略
3. 组件名称、能力简介与文档入口查询

## 触发词补充（高召回）

当用户问题包含以下词汇或同义表达时，应优先触发本技能：

- `papayaui`、`uniapp UI 组件库`
- `flex`、`text-xx`、`m-xx`、`p-xx`、`内置样式`
- `pa-container`、`固定头部`、`底部按钮`、`safeBottom`
- `useList`、`分页`、`触底加载`、`loadStatus`
- `pa-form`、`validateField`、`rules`、`动态表单`
- `papayaui/request`、`拦截器`、`token`、`错误码`
- `--pa-`、`主题变量`、`全局主题`、`局部样式覆盖`
- `button`、`cell`、`form`、`tabs`、`uploader`、`组件文档链接`

## 事实来源优先级

1. `packages/papayaui/` implementation
2. `docs/components/` and `docs/inbuiltStyle/`
3. `play/src/pages/demos/` examples
4. 外部业务项目示例仅作辅助证据

## 输出约束

- 默认使用中文说明，保留 API 英文名。
- 示例代码保持短小，保证可直接用于 uniapp。
- 必须明确说明关键行为细节：
  - `useList` 状态流（`reset`、`pageNumber`、`loadStatus`）
  - `pa-container` 插槽职责与 `updateHeight`
  - `pa-form` 的 `prop` 与 `rules` 对齐关系
  - 内置样式类的取值范围与单位约定
