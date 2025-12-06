<template>
  <pa-slider v-model="value">
    <template #button>
      <div class="slider-demo-button">{{ value }}</div>
    </template>
  </pa-slider>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const value = ref(20)
</script>

<style lang="scss" scoped>
.slider-demo-button {
  width: 26px;
  color: #fff;
  font-size: 10px;
  line-height: 18px;
  text-align: center;
  background-color: var(--pa-color-primary);
  border-radius: 100px;
}
</style>
