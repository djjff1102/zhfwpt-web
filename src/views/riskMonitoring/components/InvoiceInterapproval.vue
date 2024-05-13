<template>
  <div class="ratio card">
    <TitleCom title-text="发票审批情况">
      <template #dateRange>
        <div>
          <DateRangeShort></DateRangeShort>
        </div>
      </template>
    </TitleCom>
    <el-row :gutter="16">
      <el-col :span="8">
        <div id="approvalChart"></div>
      </el-col>
      <el-col :span="16">
        <div id="statisticsChart"></div>
      </el-col>
    </el-row>
  </div>
</template>

<script setup>
import * as echarts from "echarts";
import { pieOption, barOption } from "../option"
import TitleCom from '@/components/TitleCom.vue';

onMounted(() => {
  nextTick(() => {
    init();
  });
});

function init() {
  const approvalDom = document.getElementById("approvalChart"); // 审批占比
  const approvalChart = echarts.init(approvalDom, null, {
    width: "auto",
    height: '260'
  });
  approvalChart.setOption(renderOption(pieOption(), 'approval'));

  const statisticsDom = document.getElementById("statisticsChart");
  const statisticsChart = echarts.init(statisticsDom, null, {
    width: "auto",
    height: '260'
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

</style>