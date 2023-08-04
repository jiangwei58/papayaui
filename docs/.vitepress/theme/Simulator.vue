<template>
  <iframe class="doc-simulator" src="/index.html"></iframe>
</template>

<script setup lang="ts"></script>

<style>
.doc-simulator {
  flex: 1;
  width: 360px;
  max-height: 640px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 20px;
}
</style>
