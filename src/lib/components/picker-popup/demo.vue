<template>
  <view>当前值：{{ value }}</view>
  <button @click="onChangeVisible">打开</button>

  <PickerPopup v-model:show="visible" v-model="value" :data="syncOptions" multiple show-search />
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import PickerPopup from './picker-popup.vue'

const visible = ref<boolean>(false)
const value = ref<string>()

const syncOptions = new Array(20)
  .fill(0)
  .map((_item, index) => ({ label: index.toString(), value: index.toString() }))

const onChangeVisible = () => {
  visible.value = !visible.value
}
</script>

<style lang="scss" scoped></style>
