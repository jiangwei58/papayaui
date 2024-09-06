<template>
  <view class="text-28 text-black px-32 pt-16">
    (此组件停止维护,推荐使用Input和Textarea组件代替)
  </view>
  <DocDemoBlock title="基础用法">
    <pa-field v-model="value" title="输入框" clearable />
    <pa-field title="文本域" type="textarea" />
  </DocDemoBlock>
  <DocDemoBlock title="仅显示输入框">
    <pa-field only-input />
  </DocDemoBlock>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import DocDemoBlock from '../../doc/doc-demo-block.vue'

const value = ref<string>()
</script>

<style lang="scss" scoped></style>
<style lang="scss">
page {
  background-color: var(--pa-color-gray);
}
</style>
