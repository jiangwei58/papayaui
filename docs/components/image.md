# Image

## 示例

<!--codes start-->

::: code-group

```html [template]
<template>
  <DocDemoBlock title="基础用法" card>
    <pa-image :src="src" width="200" height="200" />
  </DocDemoBlock>
  <DocDemoBlock title="填充模式" card>
    <view class="grid grid-cols-3 gap-30">
      <view v-for="mode in modeList" :key="mode">
        <pa-image :src="src" width="100%" height="27vw" :mode="mode" />
        <text class="block text-28 text-black-2 text-center">{{ mode }}</text>
      </view>
    </view>
  </DocDemoBlock>
  <DocDemoBlock title="圆角" card>
    <view class="grid grid-cols-3 gap-30">
      <pa-image :src="src" width="200" height="200" round />
      <pa-image :src="src" width="200" height="200" round="10" />
    </view>
  </DocDemoBlock>
  <DocDemoBlock title="加载中" card>
    <view class="grid grid-cols-3 gap-30">
      <view>
        <pa-image width="100%" height="27vw" />
        <text class="block text-28 text-black-2 text-center">默认提示</text>
      </view>
      <view>
        <pa-image width="100%" height="27vw">
          <template #loading>
            <pa-loading-icon />
          </template>
        </pa-image>
        <text class="block text-28 text-black-2 text-center">自定义提示</text>
      </view>
    </view>
  </DocDemoBlock>
  <DocDemoBlock title="加载失败" card>
    <view class="grid grid-cols-3 gap-30">
      <view>
        <pa-image src="error.png" width="100%" height="27vw" />
        <text class="block text-28 text-black-2 text-center">默认提示</text>
      </view>
      <view>
        <pa-image src="error.png" width="100%" height="27vw">
          <template #error>
            <text>error</text>
          </template>
        </pa-image>
        <text class="block text-28 text-black-2 text-center">自定义提示</text>
      </view>
    </view>
  </DocDemoBlock>
  <pa-safe-bottom />
</template>
```
```ts [script]
<script lang="ts" setup>
import DocDemoBlock from '../../doc/doc-demo-block.vue'
import src from '../../images/demo.jpeg' // 推荐使用图片链接

const modeList = [
  'scaleToFill',
  'aspectFit',
  'aspectFill',
  'center',
  'widthFix',
  'top',
  'heightFix',
]
</script>
```

<!--codes end-->

## Props

<!--props start-->

| 参数 | 说明 | 类型 | 默认值 |
| --- | ----- | --- | --- |
| src | 图片资源地址 | string |  '' |
| mode | 图片裁剪、缩放的模式[详细地址](https://uniapp.dcloud.net.cn/component/image.html) | string |  'scaleToFill' |
| width | 宽度 | string \| number | - |
| height | 高度 | string \| number | - |
| round | 圆角 | boolean \| string | - |
| lazyLoad | 图片懒加载 | boolean | - |
| webp | 在系统不支持webp的情况下是否单独启用webp。默认false，只支持网络资源。 | boolean | - |
| showMenuByLongpress | 开启长按图片显示识别小程序码菜单 | boolean | - |

<!--props end-->

## Event

<!--event start-->

| 事件名 | 参数 |
| --- | --- |
| click | ()  |

<!--event end-->

## Slot

<!--slot start-->

| 名称 | 说明 |
| --- | --- |
| loading | - |
| error | - |

<!--slot end-->
