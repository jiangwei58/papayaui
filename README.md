# papayaui &middot; [![npm](https://img.shields.io/npm/v/papayaui.svg)](https://www.npmjs.com/package/papayaui)

适用于 uniapp 的 ui 框架

- 💪 Vue 3 Composition API
- 🔥 Written in TypeScript

## 准备工作

### 安装

```bash
# 通过 npm 安装
npm i papayaui

# 通过 pnpm 安装
pnpm install papayaui
```

### SASS

此 ui 库依赖 SASS，请确保已经安装

```bash
# 通过 npm 安装
npm i sass -D

# 通过 pnpm 安装
pnpm install sass -D
```

### 附加依赖（仅使用 pnpm 时注意）

因 uniapp easycom 组件模式的限制，如果您使用 pnpm 作为包管理器，您需要手动安装以下依赖

```bash
pnpm install async-validator dayjs
```

## 配置步骤

### 引入全局 SCSS 文件

> 注意
> 在`App.vue`中首行的位置引入，注意给 style 标签加入 lang="scss"属性

```html
<style lang="scss">
  /* 注意要写在第一行，同时给style标签加入lang="scss"属性 */
  @import 'papayaui/index.scss';
  @import 'papayaui/fonts/iconfont.css'; // 引入字体图标
</style>
```

### 配置 easycom 组件模式（推荐）

此配置需要在项目 src 目录的 pages.json 中进行。

> 温馨提示
>
> 1. uni-app 为了调试性能的原因，修改 easycom 规则不会实时生效，配置完后，您需要重启 HX 或者重新编译项目才能正常使用。
> 2. 请确保您的 pages.json 中只有一个 easycom 字段，否则请自行合并多个引入规则。

```json
{
  "easycom": {
    "autoscan": true,
    "custom": {
      "^pa-(.*)": "papayaui/components/$1/$1.vue"
    }
  }
}
```

### Volar 支持

> 如果您使用 Volar，请在 tsconfig.json 中通过 compilerOptions.type 指定全局组件类型。

```typescript
// tsconfig.json
{
  "compilerOptions": {
    // ...
    "types": ["papayaui/global"]
  },
  // 防止组件props类型识别错误
  "include": ["node_modules/papayaui/components/*/*.vue"]
}
```

> 注意，如果使用 pnpm，全局组件类型无法识别，请尝试按照以下方式配置（二选一）
>
> - 安装 `@vue/runtime-core`
> ```bash
> pnpm install @vue/runtime-core -D
> ```
> - 创建 .npmrc, 添加以下内容
> ```
> shamefully-hoist=true
> ```

### 修改主题色

> 所有颜色都基于 css 变量定义，覆盖 css 变量即可

```css
/* 小程序 */
page {
  --pa-color-primary: #409eff;
}

/* H5 */
:root {
  --pa-color-primary: #409eff;
}
```
