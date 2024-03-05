<template>
  <div class="risk-attention-container">
    <RiskCard />
    <div class="card">
      <div class="title">风险值排行</div>
      <Rank />
    </div>
  </div>
</template>
<script setup>
import RiskCard from "./components/RiskCard.vue";
import Rank from "./components/Rank.vue";
</script>
<style lang="scss" scoped>
.risk-attention-container {
  height: 100%;
  overflow: auto;
  padding: 24px;
  background-color: #fff;
}
.card {
  margin-top: 16px;
  padding: 8px 24px;
  border-radius: 8px;
  background: rgba($color: #dddfe7, $alpha: 0.1);
}
.title {
  position: relative;
  margin: 16px 0;
  padding-left: 11px;
  font-family: PingFangSC, PingFang SC;
  font-weight: 500;
  font-size: 18px;
  color: #333333;
  line-height: 22px;
  &::before {
    content: "";
    position: absolute;
    left: 0px;
    top: 50%;
    transform: translateY(-50%);
    width: 3px;
    height: 18px;
    background-color: #1890ff;
  }
}
</style>
