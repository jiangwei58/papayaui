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
    <pa-swipe-cell :options="options2">
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

<script lang="ts" setup>
import DocDemoBlock from '../../doc/doc-demo-block.vue'
import { SwipeCellOption } from './props'

const options: SwipeCellOption[] = [{ text: '删除' }]

const options2: SwipeCellOption[] = [
  { text: '收藏', style: { backgroundColor: 'var(--pa-color-primary)' } },
  { text: '删除' },
]

const onOpen = () => {
  console.log('open')
}
</script>

<style lang="scss" scoped></style>
<style lang="scss">
page {
  background-color: var(--pa-color-gray);
}
</style>
