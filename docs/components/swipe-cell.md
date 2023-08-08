# SwipeCell

## 示例

<!--codes start-->

::: code-group

```html [template]
<template>
  <DocDemoBlock title="基础用法">
    <pa-swipe-cell :options="options" @open="onOpen">
      <pa-cell title="单元格" value="内容" />
    </pa-swipe-cell>
  </DocDemoBlock>
  <DocDemoBlock title="自定义内容">
    <pa-swipe-cell :options="options">
      <view class="flex bg-white p-20">
        <pa-image src="" width="200" height="200" round="10" />
        <view class="flex-1 ml-15 text-28">
          <text class="text-black block">内容标题</text>
          <text class="text-black-3 block">描述信息</text>
          <view class="flex justify-between mt-80">
            <text class="text-price">2.00</text>
            <text class="text-black-3">x2</text>
          </view>
        </view>
      </view>
    </pa-swipe-cell>
  </DocDemoBlock>
  <DocDemoBlock title="多个按钮">
    <pa-swipe-cell :options="options2" @click="onClick">
      <pa-cell title="单元格" value="内容" />
    </pa-swipe-cell>
  </DocDemoBlock>
  <DocDemoBlock title="禁用">
    <pa-swipe-cell :options="options2" disabled>
      <pa-cell title="单元格" value="内容" />
    </pa-swipe-cell>
  </DocDemoBlock>
  <DocDemoBlock title="插槽">
    <pa-swipe-cell>
      <pa-cell title="单元格" value="内容" />
      <template #right>
        <view
          class="flex items-center justify-center"
          style="
            width: 100px;
            height: 100%;
            border-radius: 0 100px 100px 0;
            color: #fff;
            background: linear-gradient(315deg, rgb(73, 143, 242) 0%, rgb(73, 101, 242) 100%);
          "
        >
          自定义内容
        </view>
      </template>
    </pa-swipe-cell>
  </DocDemoBlock>
</template>
```
```ts [script]
<script lang="ts" setup>
import DocDemoBlock from '../../doc/doc-demo-block.vue'
import type { SwipeCellOption } from './props'

const options: SwipeCellOption[] = [{ text: '删除' }]

const options2: SwipeCellOption[] = [
  { text: '收藏', style: { backgroundColor: 'var(--pa-color-primary)' } },
  { text: '删除' },
]

const onOpen = () => {
  console.log('open')
}

const onClick = (name: string, index: number, item: SwipeCellOption) => {
  uni.showToast({
    title: `点击了 ${item.text}`,
    icon: 'none',
  })
  console.log(name, index, item)
}
</script>
```

<!--codes end-->

## Props

<!--props start-->

| 参数 | 说明 | 类型 | 默认值 |
| --- | ----- | --- | --- |
| name | 标识名 | string |  '' |
| show | 控制打开或者关闭 | boolean |  false |
| disabled | 是否禁用 | boolean |  false |
| threshold | 滑动距离阈值，只有大于此值，才被认为是要打开菜单 | number |  20 |
| options | 右侧按钮内容 | SwipeCellOption[] |  () => [] |

<!--props end-->

## Event

<!--event start-->

| 事件名 | 参数 |
| --- | --- |
| length | number |
| toString |  |
| toLocaleString |  |
| pop |  |
| push | ...items:T[] |
| concat | ...items:ConcatArray\<T\>[] |
| join | separator?:string |
| reverse |  |
| shift |  |
| slice | start?:number,end?:number |
| sort | compareFn?:(a:T,b:T)=\>number |
| splice | start:number,deleteCount?:number |
| unshift | ...items:T[] |
| indexOf | searchElement:T,fromIndex?:number |
| lastIndexOf | searchElement:T,fromIndex?:number |
| every | S extends T |
| some | predicate:(value:T,index:number,array:T[])=\>unknown,thisArg?:any |
| forEach | callbackfn:(value:T,index:number,array:T[])=\>void,thisArg?:any |
| map | U |
| filter | S extends T |
| reduce | callbackfn:(previousValue:T,currentValue:T,currentIndex:number,array:T[])=\>T |
| reduceRight | callbackfn:(previousValue:T,currentValue:T,currentIndex:number,array:T[])=\>T |
| find | S extends T |
| findIndex | predicate:(value:T,index:number,obj:T[])=\>unknown,thisArg?:any |
| fill | value:T,start?:number,end?:number |
| copyWithin | target:number,start?:number,end?:number |
| entries |  |
| keys |  |
| values |  |
| includes | searchElement:T,fromIndex?:number |
| flatMap | U,This=undefined |
| flat | A,D extends number=1 |
| at | index:number |
| findLast | S extends T |
| findLastIndex | predicate:(value:T,index:number,array:T[])=\>unknown,thisArg?:any |
| __@iterator@150 |  |
| __@unscopables@152 | : |

<!--event end-->

## Slot

<!--slot start-->

| 名称 | 说明 |
| --- | --- |
| default | - |
| right | - |

<!--slot end-->

