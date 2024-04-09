<template>
  <div class="content-one">
    <div class="risk-result">深圳市超级饰科技有限公司重庆市第三分公司，于2022年08月04日注销。</div>
    <div class="risk-reason">
      <line-echart></line-echart>
      <!-- <line-chart-right :chartId="rightId"></line-chart-right> -->
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  info: { // 风险信息
    default: {}
  }
})
</script>

<style lang="scss" scoped>
.content-one {
  padding: 16px 24px;
  font-family: PingFangSC, PingFang SC;
  font-weight: 400;
  font-size: 14px;
  color: #000000;
  line-height: 20px;
  text-align: left;
  font-style: normal;
  .risk-result {
    background: #FFF4E5;
    border-radius: 8px;
    border: 1px solid #FF9100;
    padding: 14px;
  }
  .risk-reason {
    margin-top: 16px;
    display: flex;
    justify-content: flex-start;
    div:first-child {
      flex-shrink: 0;
    }
  }
}
</style>
