<template>
  <pa-cell-group inset>
    <pa-cell title="单选" :value="value" is-link @click="visible = true" />
    <pa-cell title="多选" :value="value2.toString()" is-link @click="visible2 = true" />
  </pa-cell-group>

  <pa-picker-popup v-model:show="visible" v-model="value" :data="syncOptions" show-search />
  <pa-picker-popup
    v-model:show="visible2"
    v-model="value2"
    :data="syncOptions"
    multiple
    show-search
  />
</template>

<script setup lang="ts">
import { ref } from 'vue'

const value = ref<string>()
const visible = ref(false)

const value2 = ref<string[]>([])
const visible2 = ref(false)

const syncOptions = new Array(20)
  .fill(0)
  .map((_item, index) => ({ label: index.toString(), value: index.toString() }))
</script>

<style scoped lang="scss"></style>
