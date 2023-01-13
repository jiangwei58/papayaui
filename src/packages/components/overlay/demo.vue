<template>
  <DocDemoBlock title="基础用法" card>
    <pa-button @click="onShow(0)">显示遮罩层</pa-button>
  </DocDemoBlock>
  <DocDemoBlock title="嵌入内容" card>
    <pa-button @click="onShow(1)">嵌入内容</pa-button>
  </DocDemoBlock>
  <pa-overlay :show="showArray[0]" @click="onShow(0, false)" />
  <pa-overlay :show="showArray[1]" @click="onShow(1, false)">
    <view class="flex items-center justify-center height-full">
      <view style="width: 200px; height: 200px; background-color: #fff"></view>
    </view>
  </pa-overlay>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import DocDemoBlock from '../../doc/doc-demo-block.vue'

const showArray = ref<boolean[]>([false, false])

const onShow = (index: number, show = true) => {
  showArray.value[index] = show
}
</script>

<style lang="scss" scoped></style>
