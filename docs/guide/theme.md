# 定制主题

<style lang="scss" scoped>
.demo-box {
  width: 100px;
  height: 20px;
}
</style>

::: tip
完全基于 CSS 变量的主题定制，不需要修改任何源码。可以局部修改，也可以全局修改
:::

## 样式变量

所有变量名以 `--pa-` 开头，下面是一些基本的样式变量，所有可用的颜色变量请参考 [配置文件](https://github.com/jiangwei58/papayaui/blob/main/src/packages/styles/color.scss)。

| 变量名               | 说明      | 颜色值                                | 效果                                    |
| -------------------- | --------- | ------------------------------------- | --------------------------------------- |
| `--pa-color-primary` | 主色      | `#009c5d`                             | <div class="demo-box bg-primary"></div> |
| `--pa-color-success` | 成功色    | `#09be4f`                             | <div class="demo-box bg-success"></div> |
| `--pa-color-warning` | 警告色    | `#ffb703`                             | <div class="demo-box bg-warning"></div> |
| `--pa-color-danger`  | 危险色    | `#ff2b2b`                             | <div class="demo-box bg-danger"></div>  |
| `--pa-color-error`   | 错误色    | `#ee0a24`                             | <div class="demo-box bg-error"></div>   |

## 定制组件样式

组件样式变量名以 `--pa-${componentName}-` 开头，例如 `--pa-cell-title-color`，可以通过`class` 属性来修改组件样式。

```html
<pa-cell class="my-cell" title="单元格" value="内容" />
```

```css
.my-cell {
  --pa-cell-title-color: #000;
}
```

或通过 style 属性来设置 CSS 变量，这使你能够轻松实现主题的动态切换

```html
<pa-cell title="单元格" value="内容" :style="cellStyle" />
```

```ts
const cellStyle = ref<CSSProperties>({
  '--pa-cell-title-color': '#000',
});

onMounted(() => {
  setTimeout(() => {
    cellStyle.value['--pa-cell-title-color'] = 'blur';
  }, 1000
});
```

## 定制多个组件样式

与单个组件的定制方式类似，只需用一个父级节点包裹住需要定制的组件，并将 CSS 变量 设置在父级节点上

```html
<view class="container">
  <pa-button>默认按钮</pa-button>

  <pa-cell title="单元格" value="内容" />
</view>
```

```css
.container {
  --pa-button-color: #000;
  --pa-cell-title-color: #000;
}
```

## 定制全局主题样式

> [!TIP]
> 可以在`App.vue`中设置全局样式

```css
/* 小程序 */
page {
  /* 主题色 */
  --pa-color-primary: #409eff;
  /* 组件样式 */
  --pa-cell-title-color: #000;
}

/* H5 */
:root {
  /* 主题色 */
  --pa-color-primary: #409eff;
  /* 组件样式 */
  --pa-cell-title-color: #000;
}
```
