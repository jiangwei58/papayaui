# 文本内容省略

<style lang="scss" scoped>
.wrapper > div {
  width: 200px;
  color: #fff;
  background-color: var(--pa-color-primary);
  margin-top: 20px;
}
</style>

范围：1-5

::: info 示例

```html
<view class="line-length-1">
  这是一段最多显示一行的文字，后面的内容会省略。
</view>
<view class="line-length-2">
  这是一段最多显示两行的文字，后面的内容会省略。这是一段最多显示两行的文字，后面的内容会省略。
</view>
<view class="line-length-3">
  这是一段最多显示三行的文字，后面的内容会省略。这是一段最多显示三行的文字，后面的内容会省略。
</view>
```

<div class="wrapper">
  <div class="line-length-1">
    这是一段最多显示一行的文字，后面的内容会省略。
  </div>
  <div class="line-length-2">
    这是一段最多显示两行的文字，后面的内容会省略。这是一段最多显示两行的文字，后面的内容会省略。
  </div>
  <div class="line-length-3">
    这是一段最多显示三行的文字，后面的内容会省略。这是一段最多显示三行的文字，后面的内容会省略。
  </div>
</div>
:::
