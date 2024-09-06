<template>
  <pa-collapse accordion>
    <pa-collapse-item v-for="index in 3" :key="index" :title="`标题${index}`">
      折叠内容折叠内容折叠内容折叠内容
    </pa-collapse-item>
  </pa-collapse>
</template>
