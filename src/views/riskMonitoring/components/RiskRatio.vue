<template>
  <div class="ratio card">
    <TitleCom title-text="企业信用占比"></TitleCom>
    <el-row :gutter="16">
      <el-col :span="8">
        <div class="chart" id="ratioChart"></div>
      </el-col>
      <el-col :span="16">
        <div class="table">
          <el-tabs type="card">
            <el-tab-pane label="高风险指标">
              <m-table
                style="height: 100%"
                :data="tableData"
                :columns="columns"
                :scroll="scroll"
                :pagination="false"
                :bordered="false"
              >
                <template v-slot:index="{rowIndex}">
                  {{ rowIndex + 1 }}
                </template>
              </m-table>
            </el-tab-pane>
            <el-tab-pane label="中风险指标">
              <m-table
                style="height: 100%"
                :data="tableData"
                :columns="columns"
                :scroll="scroll"
                :pagination="false"
                :bordered="false"
              >
                <template v-slot:index="{rowIndex}">
                  {{ rowIndex + 1 }}
                </template>
              </m-table>
              <!-- <DangerPoint /> -->
            </el-tab-pane>
            <el-tab-pane label="低风险指标">
              <m-table
                style="height: 100%"
                :data="tableData"
                :columns="columns"
                :scroll="scroll"
                :pagination="false"
                :bordered="false"
              >
                <template v-slot:index="{rowIndex}">
                  {{ rowIndex + 1 }}
                </template>
              </m-table>
              <!-- <DangerPoint /> -->
            </el-tab-pane>
          </el-tabs>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import * as echarts from "echarts";
import { pieOption } from "../option";
import TitleCom from '@/components/TitleCom.vue';

const tableData = ref([])
const columns = reactive([
  {
    title: "序号",
    width: 80,
    slotName: "index",
    fixed: "left",
  },
  {
    title: "风险分类",
    dataIndex: "secondCategory",
    ellipsis: true,
    width: 200,
  },
  {
    title: "风险细则名称",
    dataIndex: "name",
    slotName: 'nameSlot',
    ellipsis: true,
    width: 200,
  },
  {
    title: "描述",
    dataIndex: "description",
    ellipsis: true,
    tooltip: {position: 'left'},
  },
  {
    title: "扫描结果",
    width: 300,
    dataIndex: "result",
    slotName: 'resultSlot',
  },
  {
    title: "操作",
    dataIndex: "operations",
    slotName: "operations",
    fixed: "right",
    width: 80,
  }
]);
const scroll = ref({
  // y: 800,
  // x: 1080,
});

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
    height: '260'
  });
  ratioChart.setOption(pieOption());
}
</script>

<style lang="scss" scoped>
.ratio {
  .ratio-content {
    display: flex;
  }
}
</style>
