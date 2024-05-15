<template>
  <div class="risk-monitoring-container">
    <RiskCard />
    <RiskRatio></RiskRatio>
    <InvoiceInterapproval></InvoiceInterapproval>
    <!-- <div class="rank card">
      <div class="title">风险值排行</div>
      <Rank />
    </div> -->
  </div>
</template>
<script setup>
import * as echarts from "echarts";
import RiskRatio from './components/RiskRatio.vue'
import InvoiceInterapproval from './components/InvoiceInterapproval.vue'

import RiskCard from "./components/RiskCard.vue";
// import Rank from "./components/Rank.vue";
import { pieOption, barOption } from "./option";
onMounted(() => {
  nextTick(() => {
    init();
  });
});

function init() {
  // 初始化图表
  const ratioDom = document.getElementById("ratioChart"); // 风险占比
  const ratioChart = echarts.init(ratioDom, null, {
    width: "auto",
  });
  ratioChart.setOption(pieOption());


  const approvalDom = document.getElementById("approvalChart"); // 审批占比
  const approvalChart = echarts.init(approvalDom, null, {
    width: "auto",
  });
  approvalChart.setOption(renderOption(pieOption(), 'approval'));

  const statisticsDom = document.getElementById("statisticsChart");
  const statisticsChart = echarts.init(statisticsDom, null, {
    width: "auto",
  });
  statisticsChart.setOption(barOption());
}

// 根据不同的图表，配置不同的option
function renderOption(option, type) {
  if(type === 'risk') {
    return option;
  } else if(type === 'approval') {
    option.series[0].data = [
      {
        value: 1800,
        name: "驳回",
        itemStyle: {
          color: "#F76161",
        },
      },
      {
        value: 484,
        name: "未审批",
        itemStyle: {
          color: "#FF9100",
        },
      },
      {
        value: 300,
        name: "通过",
        itemStyle: {
          color: "#5ECF69",
        },
      },
    ]
    delete option.series[0].radius
    delete option.title
    return option
  } else  {
    return option;
  }
}
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
:deep(.el-tabs__item) {
  padding: 0 100px !important;
}
</style>
