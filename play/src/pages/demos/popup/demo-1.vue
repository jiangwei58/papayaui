<template>
  <pa-cell-group inset>
    <pa-cell title="顶部弹出" is-link @click="onOpen('top')" />
    <pa-cell title="底部弹出" is-link @click="onOpen('bottom')" />
    <pa-cell title="左侧弹出" is-link @click="onOpen('left')" />
    <pa-cell title="右侧弹出" is-link @click="onOpen('right')" />
    <pa-cell title="中间弹出" is-link @click="onOpen('center')" />
  </pa-cell-group>

  <pa-popup v-model:show="visible" :position="position">
    <view style="width: 200px; height: 200px"></view>
  </pa-popup>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import type { PopupPosition } from 'papayaui'

const visible = ref<boolean>(false)
const position = ref<PopupPosition>('bottom')

const onOpen = (_position: PopupPosition) => {
  position.value = _position
  visible.value = true
}
</script>
