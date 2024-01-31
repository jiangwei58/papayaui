# Sticky

<!--codes start-->

## 基础用法

```html [template]
<pa-sticky>
  <view class="flex justify-start ml-26">
    <pa-button width="200">基础用法</pa-button>
  </view>
</pa-sticky>
```

## 吸顶距离
  
```html [template]
<pa-sticky offset-top="30">
  <view class="flex justify-center">
    <pa-button width="200">吸顶距离</pa-button>
  </view>
</pa-sticky>
```

<!--codes end-->

## Sticky Props

<!--props start-->

| 参数 | 说明 | 类型 | 默认值 |
| --- | ----- | --- | --- |
| offsetTop | 吸顶容器到顶部某个距离的时候，进行吸顶，在H5平台，NavigationBar为44px | string \| number |  0 |
| customNavHeight | 自定义导航栏的高度 | string \| number |  0 |
| disabled | 是否开启吸顶功能 | boolean | - |
| zIndex | z-index值 | string \| number | - |
| index | 列表中的索引值 | string \| number | - |
| cssSticky | 是否使用css模式，同position: sticky属性实现效果一致 | boolean |  true |

<!--props end-->

## Sticky Event

<!--event start-->

| 事件名 | 参数 |
| --- | --- |


<!--event end-->

## Sticky Slot

<!--slot start-->

| 名称 | 说明 |
| --- | --- |
| default | - |

<!--slot end-->

## 样式变量

<!--cssVar start-->

:see_no_evil:

<!--cssVar end-->

