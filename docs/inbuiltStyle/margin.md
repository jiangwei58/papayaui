# Margin 和 Padding

<style lang="scss" scoped>
.wrapper > div {
  width: 120px;
  min-height: 40px;
  color: #fff;
  background-color: var(--pa-color-primary);
}
</style>

### Margin 外边距

::: info 示例

```html
<view class="m-20"></view>
<view class="mt-30"></view>
<view class="ml-30"></view>
<view class="mr-30"></view>
```
<div class="wrapper flex">
  <div style="margin:20px"></div>
  <div style="margin-top:30px"></div>
  <div style="margin-left:30px"></div>
  <div style="margin-right:30px"></div>
</div>
:::

### Padding 内填充

::: info 示例

```html
<view class="p-20"></view>
<view class="pt-20"></view>
<view class="pl-20"></view>
<view class="pr-20"></view>
```
<div class="wrapper">
  <div style="padding:20px">内容内容内容</div>
  <div style="padding-top:20px;margin-top:20px">内容内容内容</div>
  <div style="padding-left:20px;margin-top:20px">内容内容内容</div>
  <div style="padding-right:20px;margin-top:20px">内容内容内容</div>
</div>
:::

| 类名 (0-80) | 属性                                          |
| ----------- | --------------------------------------------- |
| `p-${x}`    | margin: `${x}`                                |
| `pl-${x}`   | margin-left: `${x}`                           |
| `pr-${x}`   | margin-right: `${x}`                          |
| `pt-${x}`   | margin-top: `${x}`                            |
| `pb-${x}`   | margin-bottom: `${x}`                         |
| `px-${x}`   | margin-left: `${x}`<br />margin-right: `${x}` |
| `my-${x}`   | margin-top: `${x}`<br />margin-bottom: `${x}` |

| 类名 (0-80) | 属性                                            |
| ----------- | ----------------------------------------------- |
| `p-${x}`    | padding: `${x}`                                 |
| `pl-${x}`   | padding-left: `${x}`                            |
| `pr-${x}`   | padding-right: `${x}`                           |
| `pt-${x}`   | padding-top: `${x}`                             |
| `pb-${x}`   | padding-bottom: `${x}`                          |
| `px-${x}`   | padding-left: `${x}`<br />padding-right: `${x}` |
| `py-${x}`   | padding-top: `${x}`<br />padding-bottom: `${x}` |