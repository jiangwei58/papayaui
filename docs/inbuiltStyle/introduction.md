# 内置样式

通过内置的样式，可以快速的实现一些常用的页面布局，提高效率。

::: tip
如果你使用过`tailwindcss`，那么你一定会非常熟悉。
:::

::: warning
后面所有的`${x}`都只有能被 2 或 5 除尽的数，如（0、2、4、5、6、8、10、12、15...）,
单位默认是 `rpx`
:::

<style lang="scss" scoped>
.container {
  width: 375px;
  height: 667px;
  .btn {
    width: 120px;
    height: 42px;
    color: #fff;
    background-color: var(--pa-color-primary);
  }
}
.wrapper > div {
  width: 100%;
  min-height: 26px;
  color: #fff;
  background-color: var(--vp-c-gray);
}
</style>

## 基础示例

```html
<view class="container flex flex-col border">
  <view class="text-center font-bold">标题</view>

  <view>搜索栏</view>

  <view class="wrapper grid grid-cols-3 gap-20 mt-20">
    <view>菜单1</view>
    <view>菜单2</view>
    <view>菜单3</view>
  </view>

  <scroll-view scroll-y class="flex-1 mt-20" style="height:110px;">
    <view v-for="(index) in 30" :key="index">列表选项{{ index }}</view>
  </scroll-view>
  
  <view class="flex justify-between px-12 py-8 border-top">
    <view class="btn">按钮1</view>
    <view class="btn">按钮2</view>
  </view>
</view>
```

<div class="container flex flex-col border">
  <div class="text-center font-bold">标题</div>
  <div>搜索栏</div>
  <div class="wrapper grid grid-cols-3" style="margin-top:20px;gap:20px;">
    <div>菜单1</div>
    <div>菜单2</div>
    <div>菜单3</div>
  </div>
  <div class="flex-1" style="height:110px;overflow-y:auto;margin-top:20px;">
    <div v-for="(index) in 30" :key="index">列表选项{{ index }}</div>
  </div>
  <div class="flex justify-between border-top" style="padding: 8px 12px;">
    <div class="btn">按钮1</div>
    <div class="btn">按钮2</div>
  </div>
</div>
