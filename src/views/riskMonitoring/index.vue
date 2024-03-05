<template>
  <div class="risk-monitoring-container">
    <RiskCard />
    <div class="ratio card">
      <div class="title">企业风险占比</div>
      <el-row :gutter="16">
        <el-col :span="8">
          <div class="chart" id="ratioChart"></div>
        </el-col>
        <el-col :span="16">
          <div class="table">
            <DangerPoint />
            <el-tabs type="card">
              <!-- <el-tab-pane label="高风险">
                
              </el-tab-pane>
              <el-tab-pane label="中风险">
                <DangerPoint />
              </el-tab-pane>
              <el-tab-pane label="低风险">
                <DangerPoint />
              </el-tab-pane> -->
            </el-tabs>
          </div>
        </el-col>
      </el-row>
    </div>
    <el-row :gutter="16">
      <el-col :span="8">
        <div class="risk card h-340px">
          <div class="title">风险指标概述</div>
          <div id="riskChart"></div>
        </div>
      </el-col>
      <el-col :span="16">
        <div class="statistics card h-340px">
          <div class="title">风险分类统计</div>
          <div id="statisticsChart"></div>
        </div>
      </el-col>
    </el-row>
    <div class="rank card">
      <div class="title">风险值排行</div>
      <Rank />
    </div>
  </div>
</template>
<script setup>
import * as echarts from "echarts";
import DangerPoint from "@/components/RiskValueAssessment/components/DangerPoint.vue";

import RiskCard from "./components/RiskCard.vue";
import Rank from "./components/Rank.vue";
import { pieOption, barOption } from "./option";
onMounted(() => {
  nextTick(() => {
    // 初始化图表
    const ratioDom = document.getElementById("ratioChart");
    const riskDom = document.getElementById("riskChart");
    const statisticsDom = document.getElementById("statisticsChart");
    const ratioChart = echarts.init(riskDom, null, {
      width: "auto",
    });
    const riskChart = echarts.init(ratioDom, null, {
      width: "auto",
    });
    const statisticsChart = echarts.init(statisticsDom, null, {
      width: "auto",
    });
    ratioChart.setOption(pieOption());
    riskChart.setOption(pieOption());
    statisticsChart.setOption(barOption());
  });
});
</script>
<style lang="scss" scoped>
#ratioChart,
#riskChart {
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
.ratio {
  .ratio-content {
    display: flex;
  }
}
</style>
