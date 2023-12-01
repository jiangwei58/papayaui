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
}
</style>

## 基础示例

```html
<view class="container flex flex-col border">
  <view class="text-center font-bold py-10">标题</view>

  <view class="bg-gray px-15 py-10 rounded-full">搜索栏</view>

  <view class="wrapper grid grid-cols-4 gap-20 mt-20">
    <view class="p-15 bg-gray rounded-5">菜单1</view>
    <view class="p-15 bg-gray rounded-5">菜单2</view>
    <view class="p-15 bg-gray rounded-5">菜单3</view>
    <view class="p-15 bg-gray rounded-5">菜单4</view>
  </view>

  <scroll-view scroll-y class="flex-1 mt-20" style="height:110px;">
    <view 
      v-for="(index) in 30"
      :key="index"
      class="p-15 bg-gray rounded-5 mt-15"
    >
      列表选项{{ index }}
    </view>
  </scroll-view>
  
  <view class="flex justify-between px-12 py-8 border-top">
    <view class="width-full px-15 py-10 bg-primary text-white text-center rounded-full">按钮</view>
  </view>
</view>
```

<view class="container flex flex-col border">
  <view class="text-center font-bold py-10">标题</view>

  <view class="bg-gray px-15 py-10 rounded-full">搜索栏</view>

  <view class="wrapper grid grid-cols-4 gap-20 mt-20">
    <view class="p-15 bg-gray rounded-5">菜单1</view>
    <view class="p-15 bg-gray rounded-5">菜单2</view>
    <view class="p-15 bg-gray rounded-5">菜单3</view>
    <view class="p-15 bg-gray rounded-5">菜单4</view>
  </view>

  <view class="flex-1 mt-20" style="height:110px;overflow-y:auto;">
    <view 
      v-for="(index) in 30"
      :key="index"
      class="p-15 bg-gray rounded-5 mt-15"
    >
      列表选项{{ index }}
    </view>
  </view>

  <view class="flex justify-between px-12 py-8 border-top">
    <view class="width-full px-15 py-10 bg-primary text-white text-center rounded-full">按钮</view>
  </view>
</view>
