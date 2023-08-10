# 定制主题

::: tip
完全基于 CSS 变量的主题定制，不需要修改任何源码。可以局部修改，也可以全局修改
:::

## 样式变量

所有变量名以 `--pa-` 开头，下面是一些基本的样式变量，所有可用的颜色变量请参考 [配置文件](https://github.com/jiangwei58/papayaui/blob/main/src/packages/styles/color.scss)。

```css
// 主色
--pa-color-primary: #009c5d;
// 成功色
--pa-color-success: #09be4f;
// 警告色
--pa-color-warning: #ffb703;
// 危险色
--pa-color-danger: #ff2b2b;
// 错误色
--pa-color-error: #ee0a24;
```

## 定制组件样式

组件样式变量名以 `--pa-${componentName}-` 开头，例如 `--pa-cell-title-color`，可以通过 `style` 属性或者 `class` 属性来修改组件样式。

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

## 定制全局主题样式

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
