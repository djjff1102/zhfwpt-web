<template>
  <div class="risk-attention-container">
    <RiskCard :riskData="riskData" :linkFlag="false"/>
    <div class="card">
      <div class="title">信用值排行</div>
      <!-- 重点关注企业:isAttentionCompany 企业信用等级：type全部-->
      <Rank :isAttentionCompany="1"/>
    </div>
  </div>
</template>
<script setup>
import RiskCard from "./components/RiskCard.vue";
import Rank from "./components/Rank.vue";
import { attentionCreditInfo } from '@/api/riskmonitor'

const riskData = ref({
  sumary: 0, // 服务企业总数
  low: {},
  middle: {},
  high: {}
})

// 重点关注企业-企业信用类型
function getattentionCreditInfo() {
  attentionCreditInfo({}).then(res => {
    riskData.value.sumary = res.data.authCompanyNum;
    res?.data?.riskOverviewVoList.forEach(item => {
      if(item.riskOrCreditLevel === '1') {
        riskData.value.high = item
      } else if(item.riskOrCreditLevel === '2') {
        riskData.value.middle = item
      } else if(item.riskOrCreditLevel === '3') {
        riskData.value.low = item
      }
    })
  }).catch(err => {
    console.log('我关注的企业信用值', err)
  })
}

getattentionCreditInfo()
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
