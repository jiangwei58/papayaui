# Float 浮动

<style lang="scss" scoped>
.wrapper > div {
  width: 120px;
  min-height: 40px;
  color: #fff;
  background-color: var(--pa-color-primary);
}
</style>

::: info 示例

```html
<view class="clearfix">
  <view></view>
  <view class="float-right"></view>
</view>
```

<div class="wrapper clearfix">
  <div></div>
  <div class="float-right"></div>
</div>

:::

| 类名          | 属性         |
| ------------- | ------------ |
| `float-left`  | float: left  |
| `float-right` | float: right |
| `float-none`  | float: none  |

---

| 类名       | 属性                                                                         |
| ---------- | ---------------------------------------------------------------------------- |
| `clearfix` | &::after {<br />content: '';<br />display: block;<br />visibility: hidden;<br />clear: both;<br />} |
