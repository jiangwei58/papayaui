# Border 边框

::: tip
黑色主题下会看的更清楚哦 :stuck_out_tongue_winking_eye:
:::

## 1px 边框

基于伪类 transform 实现

::: info 示例

```html
<view class="border">1</view>
<view class="border-top">2</view>
<view class="border-bottom">3</view>
<view class="border-left">4</view>
<view class="border-right">5</view>
<view class="border-top-bottom">6</view>
```

<div class="border">1</div>
<div class="border-top" style="margin-top:20px">2</div>
<div class="border-bottom" style="margin-top:20px">3</div>
<div class="border-left" style="margin-top:20px">4</div>
<div class="border-right" style="margin-top:20px">5</div>
<div class="border-top-bottom" style="margin-top:20px">6</div>
:::

## 圆角

<style lang="scss" scoped>
.rounded-wrapper > div {
  width: 120px;
  height: 50px;
  color: #fff;
  background-color: var(--pa-color-primary);
  margin-top: 20px;
}
@for $i from 3 through 35 {
  .rounded-#{$i} {
    border-radius: #{$i}px;
  }
}
</style>

范围：3-35

::: info 示例

```html
<view class="rounded-3"></view>
<view class="rounded-10"></view>
<view class="rounded-20"></view>
```

<div class="rounded-wrapper">
  <div class="rounded-3"></div>
  <div class="rounded-10"></div>
  <div class="rounded-20"></div>
</div>
:::
