<template>
  <div class="risk-monitoring-container">
    <RiskCard :riskData="riskData" :linkFlag="true"/>
    <RiskRatio :riskData="riskData"></RiskRatio>
    <InvoiceInterapproval></InvoiceInterapproval>
  </div>
</template>
<script setup>
import RiskRatio from './components/RiskRatio.vue'
import InvoiceInterapproval from './components/InvoiceInterapproval.vue'
import RiskCard from "./components/RiskCard.vue";
import { groupByRisk } from '@/api/riskmonitor'
import { ref } from 'vue'

const riskData = ref({
  sumary: 0, // 授权企业总数
  low: {},
  middle: {},
  high: {}
})

function groupByRiskData() {
  groupByRisk({}).then(res => {
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
    console.log('整体概况异常：', err)
  })
}

groupByRiskData()
</script>

<style lang="scss" scoped>
#ratioChart,
#approvalChart {
  height: 260px;
}
#statisticsChart {
  height: 260px;
}
.risk-monitoring-container {
  height: 100%;
  overflow: auto;
  padding: 24px;
  background-color: #fff;
}
.statistics,
.risk {
  width: 100%;
}
.card {
  margin-top: 16px;
  padding: 0px 24px 18px;
  border-radius: 8px;
  background: rgba($color: #dddfe7, $alpha: 0.1);
}
.title {
  position: relative;
  padding: 16px 0;
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
.ratio {
  .ratio-content {
    display: flex;
  }
}
</style>
