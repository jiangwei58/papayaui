<template>
  <DocDemoBlock title="基础用法">
    <pa-notice-bar left-icon="notice" text="落霞与孤鹜齐飞，秋水共长天一色" />
  </DocDemoBlock>

  <DocDemoBlock title="滚动播放">
    <pa-notice-bar text="在天愿作比翼鸟，在地愿为连理枝。天长地久有时尽，此恨绵绵无绝期。" />
  </DocDemoBlock>

  <DocDemoBlock title="多行展示">
    <pa-notice-bar
      text="远上寒山石径斜，白云深处有人家。停车坐爱枫林晚，霜叶红于二月花。"
      wrapable
    />
  </DocDemoBlock>

  <DocDemoBlock title="通知栏模式">
    <pa-notice-bar text="曾经沧海难为水，除却巫山不是云。" mode="link" />
  </DocDemoBlock>

  <DocDemoBlock title="可关闭">
    <pa-notice-bar text="夜合花开香满庭，夜深微雨醉初醒。" mode="closeable" />
  </DocDemoBlock>

  <DocDemoBlock title="自定义样式">
    <pa-notice-bar
      left-icon="message"
      text="落絮无声春堕泪，行云有影月含羞。"
      color="#1989fa"
      background="#ecf9ff"
    />
  </DocDemoBlock>
</template>

<script setup lang="ts">
import DocDemoBlock from '../../doc/doc-demo-block.vue'
</script>

<style lang="scss" scoped></style>
