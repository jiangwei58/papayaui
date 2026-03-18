---
name: add-component
description: papayaui 组件库新增或修改组件的完整规范。当用户提到"新增组件"、"创建组件"、"添加组件"、"修改组件"、"增加示例"、"新增 demo"、"注册组件"等场景时，必须读取并遵循此 skill。
---

# papayaui 组件新增 / 修改规范

## 目录约定

| 简称 | 实际路径 |
|------|---------|
| 组件目录 | `packages/papayaui/components/` |
| 组件入口 | `packages/papayaui/components/index.ts` |
| play 示例 | `play/src/` |

---

## 一、新增组件完整流程

### 步骤 1：创建组件目录与文件

在组件目录下新建 `<component-name>/`，文件名全部使用 **kebab-case**：

```
components/
└── my-component/
    ├── my-component.vue    # 组件主文件
    ├── my-component.scss   # 组件样式（若无样式可省略）
    ├── props.ts            # Props / Emits 定义
    └── index.ts            # 导出入口
```

> **easycom 规则**：`pa-my-component` 会自动映射到 `my-component/my-component.vue`，组件名与目录名必须保持一致。

---

### 步骤 2：编写 `props.ts`

```typescript
import type { ExtractPropTypes, ExtractPublicPropTypes } from 'vue'
import { isXxx } from '../../utils'  // 按需引入工具函数

/** 组件 props 定义 */
export const myComponentProps = {
  /** 值 */
  modelValue: { type: String, default: '' },
} as const

/** 组件 emits 定义 */
export const myComponentEmits = {
  'update:modelValue': (value: string) => typeof value === 'string',
  change: (value: string) => typeof value === 'string',
}

export type MyComponentProps = ExtractPropTypes<typeof myComponentProps>
export type MyComponentPropsPublic = ExtractPublicPropTypes<typeof myComponentProps>
export type MyComponentEmits = typeof myComponentEmits
```

**规范要点：**
- 每个 prop 必须加 JSDoc 注释说明用途
- 导出 4 个类型：`XxxProps`、`XxxPropsPublic`、`XxxEmits`，以及 Props / Emits 本体

---

### 步骤 3：编写 `index.ts`

```typescript
import MyComponent from './my-component.vue'

export type MyComponentInstance = InstanceType<typeof MyComponent>
export * from './props'

export default MyComponent
```

固定模式：导出组件默认导出 + Instance 类型 + props 的所有内容。

---

### 步骤 4：编写 `my-component.vue`

```vue
<template>
  <view :class="ns.b()">
    <!-- 组件内容 -->
  </view>
</template>

<script lang="ts" setup>
import { useNamespace } from '../../core/useNamespace'
import { myComponentProps, myComponentEmits } from './props'

defineOptions({ name: 'PaMyComponent' })

const props = defineProps(myComponentProps)
const emit = defineEmits(myComponentEmits)

const ns = useNamespace('my-component')
</script>
```

**规范要点：**
- 使用 `<script setup>` + `defineOptions({ name: 'PaMyComponent' })`
- 通过 `useNamespace` 生成 BEM 类名，不要直接硬写类名字符串
- Props / Emits 从 `props.ts` 引入，不要内联写在组件里
- 复合组件优先复用已有 `pa-*` 子组件（如 `pa-bottom-popup`、`pa-date-picker` 等）
- 时间处理统一使用 `dayjs`

---

### 步骤 5：编写 `my-component.scss`

```scss
@import '../../styles/vars.scss';

.#{$prefix}-my-component {
  // BEM 子元素用 & 嵌套
  &-header { ... }
  &-body { ... }
}
```

**规范要点：**
- 必须 `@import '../../styles/vars.scss'`
- 类名前缀通过 `$prefix` 变量注入，与 `useNamespace` 保持一致
- 设计 token（颜色、间距等）使用 `_var(color-*)` 等变量，不要硬编码

---

### 步骤 6：在组件入口注册导出

编辑 `packages/papayaui/components/index.ts`，在文件**末尾**追加：

```typescript
export * from './my-component'
```

保持与其他组件相同的 `export * from` 格式，按字母顺序或追加末尾均可，但不要打乱原有顺序。

---

### 步骤 7：创建 play 示例页面

在 `play/src/pages/demos/` 下创建同名目录：

```
play/src/pages/demos/
└── my-component/
    ├── index.vue       # 汇总展示页
    ├── demo-1.vue      # 场景一
    ├── demo-2.vue      # 场景二（按需增加）
    └── ...
```

**`index.vue` 固定结构：**

```vue
<template>
  <DocDemoBlock title="基础用法" card><Demo1 /></DocDemoBlock>
  <DocDemoBlock title="其他场景" card><Demo2 /></DocDemoBlock>
  <pa-safe-bottom />
</template>

<script lang="ts" setup>
import DocDemoBlock from '../../../components/doc-demo-block.vue'
import Demo1 from './demo-1.vue'
import Demo2 from './demo-2.vue'
</script>
```

**`demo-N.vue` 规范：**
- 每个 demo 聚焦一个使用场景，保持简洁
- 使用 `ref` / `reactive` 声明响应式状态并绑定给组件
- 日期格式化统一使用 `dayjs`

---

### 步骤 8：在 `pages.json` 注册路由

编辑 `play/src/pages.json`，在 `pages` 数组的对应 `type` 分组中插入：

```json
{
  "path": "pages/demos/my-component/index",
  "style": { "navigationBarTitleText": "MyComponent 组件中文名" },
  "type": "对应分类"
}
```

**`type` 取值参考：**

| type | 适用组件类型 |
|------|------------|
| `base` | 基础展示类（图标、按钮、图片、单元格等） |
| `layout` | 布局类（容器、吸顶等） |
| `form` | 表单类（输入、选择、日期、上传等） |
| `nav` | 导航类（导航栏、侧边栏、标签页等） |
| `feedback` | 反馈类（弹窗、对话框、覆盖层等） |
| `show` | 展示类（徽标、折叠、倒计时、标签等） |
| `other` | 其他 |

---

## 二、修改已有组件

- 修改 `props.ts`：新增 prop 必须写 JSDoc 注释；**不得删除已有 prop**（考虑兼容性，废弃时用注释标注 `@deprecated`）
- 修改 `.vue` 文件：保留已有注释（尤其是用户手写的行内注释），逻辑未改动时不得删改注释
- 修改 `.scss` 文件：只追加或修改，不删除已有样式类，避免破坏已有用户自定义覆盖
- 修改 core 模块（`packages/papayaui/core/`）内任何文件后，**必须**在组件库包目录下执行 `pnpm test`

---

## 三、命名规范速查

| 对象 | 命名规则 | 示例 |
|------|---------|------|
| 组件目录 | kebab-case | `date-range-picker/` |
| `.vue` 文件 | kebab-case，与目录同名 | `date-range-picker.vue` |
| `.scss` 文件 | kebab-case，与组件同名 | `date-range-picker.scss` |
| Props 对象 | `xxxProps`（camelCase） | `dateRangePickerProps` |
| Emits 对象 | `xxxEmits`（camelCase） | `dateRangePickerEmits` |
| 类型导出 | `XxxProps` / `XxxPropsPublic` / `XxxEmits` / `XxxInstance` | `DateRangePickerProps` |
| `defineOptions.name` | `Pa` + PascalCase | `PaDateRangePicker` |
| 工具函数 / hooks | camelCase 文件 | `useDateRange.ts` |

---

## 四、类型检查

完成新增后运行：

```bash
# 在 play/ 目录下
pnpm run type-check

# 在 packages/papayaui/ 目录下
pnpm run type-check
```

如有修改 core 模块，额外执行：

```bash
# 在 packages/papayaui/ 目录下
pnpm test
```
