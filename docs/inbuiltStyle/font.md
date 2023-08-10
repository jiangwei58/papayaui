# 文本内容相关

## 字体大小

格式：`text-${x}`, 范围: 20-65

<style lang="scss" scoped>
@for $i from 20 through 65 {
  .text-#{$i} {
    font-size: #{$i}px;
    line-height: normal;
  }
}
@for $i from 10 through 65 {
  .leading-#{$i} {
    line-height: #{$i}px;
  }
}
</style>

::: info 示例

```html
<view class="text-20">标题</view>
<view class="text-28">标题</view>
<view class="text-36">标题</view>
<view class="text-50">标题</view>
```

<div class="text-20">标题</div>
<div class="text-28">标题</div>
<div class="text-36">标题</div>
<div class="text-50">标题</div>

:::

## 字体粗细
::: info 示例

```html
<view class="text-32 font-normal">标题</view>
<view class="text-32 font-bold">标题</view>
```

<div class="text-32 font-normal">标题</div>
<div class="text-32 font-bold">标题</div>

:::

## 行高
格式：`leading-${x}`, 范围: 10-65

::: info 示例

```html
<view class="text-20 leading-40">标题</view>
<view class="text-30 leading-60">标题</view>
```

<div class="text-20 leading-40">标题</div>
<div class="text-30 leading-60">标题</div>

:::