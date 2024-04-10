<template>
  <div class="content-one">
    <div class="risk-result">{{ info.companyName }}，于{{ JSON.parse(info.source)[0]?.operationStartdate }}{{ JSON.parse(info.source)[0]?.companyStatus }}。</div>
    <div class="risk-reason">
      <div>注销原因：</div>
      <div>{{ JSON.parse(info.source)[0]?.cancelReason}}</div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  info: { // 风险信息
    default: {}
  },
  columns: {
    default: []
  }
})
</script>

<style lang="scss" scoped>
.content-one {
  padding: 16px 24px 16px 60px;
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
