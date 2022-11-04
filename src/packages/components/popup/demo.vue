<template>
  <DocDemoBlock title="基础用法">
    <wei-cell-group inset>
      <wei-cell title="顶部弹出" is-link @click="onOpen('top')" />
      <wei-cell title="底部弹出" is-link @click="onOpen('bottom')" />
      <wei-cell title="左侧弹出" is-link @click="onOpen('left')" />
      <wei-cell title="右侧弹出" is-link @click="onOpen('right')" />
      <wei-cell title="中间弹出" is-link @click="onOpen('center')" />
    </wei-cell-group>
  </DocDemoBlock>

  <DocDemoBlock title="关闭按钮">
    <wei-cell-group inset>
      <wei-cell title="关闭按钮" is-link @click="onOpen('bottom', true)" />
    </wei-cell-group>
  </DocDemoBlock>

  <DocDemoBlock title="圆角弹窗">
    <wei-cell-group inset>
      <wei-cell title="圆角弹窗" is-link @click="onOpen('bottom', true, true)" />
    </wei-cell-group>
  </DocDemoBlock>

  <wei-popup
    v-model:show="visible"
    :position="position"
    :closeable="closeable"
    :round="round"
  ></wei-popup>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import DocDemoBlock from '../../doc/doc-demo-block.vue'
import { PopupPosition } from './popup.vue'

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
