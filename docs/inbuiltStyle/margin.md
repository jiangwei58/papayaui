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
  <div class="m-20"></div>
  <div class="mt-30"></div>
  <div class="ml-30"></div>
  <div class="mr-30"></div>
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
<div class="wrapper flex flex-col gap-20">
  <div class="p-20">内容内容内容</div>
  <div class="pt-20">内容内容内容</div>
  <div class="pl-20">内容内容内容</div>
  <div class="pr-20">内容内容内容</div>
</div>
:::

| 类名 (0-80) | 属性                                          |
| ----------- | --------------------------------------------- |
| `m-${x}`    | margin: `${x}`                                |
| `ml-${x}`   | margin-left: `${x}`                           |
| `mr-${x}`   | margin-right: `${x}`                          |
| `mt-${x}`   | margin-top: `${x}`                            |
| `mb-${x}`   | margin-bottom: `${x}`                         |
| `mx-${x}`   | margin-left: `${x}`<br />margin-right: `${x}` |
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