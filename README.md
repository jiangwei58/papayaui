# weiui

适用于 uniapp 的 ui 框架

## 准备工作

### 安装

```
npm i @pagodaui/weiui

or

yarn add @pagodaui/weiui
```

### SCSS

此 ui 库依赖 SCSS，请确保已经安装

```
npm i sass -D

or

yarn add sass -D
```

## 配置步骤

1. 在引入全局 SCSS 文件

> 注意
> 在`App.vue`中首行的位置引入，注意给 style 标签加入 lang="scss"属性

```html
<style lang="scss">
  /* 注意要写在第一行，同时给style标签加入lang="scss"属性 */
  @import '@pagodaui/weiui/index.scss';
  @import '@pagodaui/weiui/fonts/iconfont.css'; // 引入字体图标
</style>
```

2. 配置 easycom 组件模式

此配置需要在项目 src 目录的 pages.json 中进行。

> 温馨提示
>
> 1. uni-app 为了调试性能的原因，修改 easycom 规则不会实时生效，配置完后，您需要重启 HX 或者重新编译项目才能正常使用。
> 2. 请确保您的 pages.json 中只有一个 easycom 字段，否则请自行合并多个引入规则。

```json
// pages.json
{
  "easycom": {
    "autoscan": true,
    "custom": {
      "^wei-(.*)": "@pagodaui/weiui/components/$1/$1.vue"
    }
  },

  // 此为本身已有的内容
  "pages": [
    // ......
  ]
}
```

3. 引入 ts 组件声明文件

> 在`env.d.ts`中上方引入，可以得到代码提示

```typescript
/// <reference types="@pagodaui/weiui/components" />
```
