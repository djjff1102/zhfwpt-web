<template>
  <div class="per-title flex-base-start">
    <span class="pre-label">合理用票需求预测值(元)</span>
    <span class="amount">{{ data }}</span>
  </div>
</template>

<script setup>
const props = defineProps({
  data: {
    type: Number,
    default: 0
  }
})
</script>

<style lang="scss" scoped>
.per-title {
  background: rgba(52, 112, 255, 0.04);
  padding: 0 24px;
  // padding-left: 70px;
  .pre-label {
    height: 26px;
    font-family: PingFangSC, PingFang SC;
    font-size: 14px;
    color: #272A31;
    line-height: 26px;
    text-align: justify;
    font-style: normal;
    display: block;
    padding-right: 16px;
  }
  .amount {
    font-family: DINAlternate, DINAlternate;
    font-weight: bold;
    font-size: 35px;
    color: #F76161;
    text-align: left;
    font-style: normal;
  }
}
</style>
