# BottomPopup

## 示例

<!--codes start-->

::: code-group

```html [template]
<template>
  <DocDemoBlock title="基础用法">
    <pa-cell-group inset>
      <pa-cell title="基础用法" is-link @click="visible = true" />
      <pa-cell title="自定义底部" is-link @click="visible2 = true" />
    </pa-cell-group>

    <pa-bottom-popup v-model:show="visible" title="标题">
      <view class="px-20">{{ text }}</view>
    </pa-bottom-popup>
    <pa-bottom-popup v-model:show="visible2" title="标题">
      <view class="px-20">{{ text }}</view>
      <template #footer>
        <view class="flex justify-around px-26">
          <pa-button type="default" block style="width: 50%">取消</pa-button>
          <pa-button class="ml-15" block style="width: 50%">确定</pa-button>
        </view>
      </template>
    </pa-bottom-popup>
  </DocDemoBlock>
</template>
```
```ts [script]
<script lang="ts" setup>
import DocDemoBlock from '../../doc/doc-demo-block.vue'
import { computed, ref } from 'vue'

const visible = ref<boolean>(false)
const visible2 = ref<boolean>(false)

const text = computed(() => {
  return new Array(100)
    .fill(0)
    .map(() => '内容')
    .join('')
})
</script>
```

<!--codes end-->

## Props

<!--props start-->

| 参数 | 说明 | 类型 | 默认值 |
| --- | ----- | --- | --- |
| title | 标题 | string | - |
| height | 弹窗高度 |  |  '80vh' |
| round | 是否圆角 |  |  true |
| closeable | 是否显示关闭按钮 |  |  true |
| maskCloseAble | 是否可以点击空白处关闭 |  | - |

<!--props end-->

## Event

<!--event start-->

| 事件名 | 参数 |
| --- | --- |


<!--event end-->

## Slot

<!--slot start-->

| 名称 | 说明 |
| --- | --- |
| before-title | - |
| after-title | - |
| default | - |
| footer | - |

<!--slot end-->
