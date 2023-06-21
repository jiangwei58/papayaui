<template>
  <DocDemoBlock title="基础用法">
    <pa-cell-group inset>
      <pa-cell title="顶部弹出" is-link @click="onOpen('top')" />
      <pa-cell title="底部弹出" is-link @click="onOpen('bottom')" />
      <pa-cell title="左侧弹出" is-link @click="onOpen('left')" />
      <pa-cell title="右侧弹出" is-link @click="onOpen('right')" />
      <pa-cell title="中间弹出" is-link @click="onOpen('center')" />
    </pa-cell-group>
  </DocDemoBlock>

  <DocDemoBlock title="关闭按钮">
    <pa-cell-group inset>
      <pa-cell title="关闭按钮" is-link @click="onOpen('bottom', true)" />
    </pa-cell-group>
  </DocDemoBlock>

  <DocDemoBlock title="圆角弹窗">
    <pa-cell-group inset>
      <pa-cell title="圆角弹窗" is-link @click="onOpen('bottom', true, true)" />
    </pa-cell-group>
  </DocDemoBlock>

  <pa-popup v-model:show="visible" :position="position" :closeable="closeable" :round="round">
    <view style="width: 200px; height: 200px"></view>
  </pa-popup>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import DocDemoBlock from '../../doc/doc-demo-block.vue'
import type { PopupPosition } from './props'

const visible = ref<boolean>(false)
const position = ref<PopupPosition>('bottom')
const closeable = ref<boolean>(false)
const round = ref<boolean>(false)

const onOpen = (_position: PopupPosition, _closeable = false, _round = false) => {
  position.value = _position
  closeable.value = _closeable
  round.value = _round
  visible.value = true
}
</script>

<style lang="scss" scoped></style>
<style lang="scss">
page {
  background-color: var(--color-page-bg-gray);
}
</style>
