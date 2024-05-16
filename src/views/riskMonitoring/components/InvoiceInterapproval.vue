<template>
  <div class="ratio card">
    <TitleCom title-text="发票审批情况">
      <template #dateRange>
        <div>
          <DateRangeShort :defaultDate="defaultDate" @hanleMonth="hanleMonth"></DateRangeShort>
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
import { invoiceCheckByDate } from '@/api/riskmonitor'
import { ref } from 'vue'
import dayjs from "dayjs";
import { InitializableXmlComponent } from "docx";

const searchPar = ref({
  startDate: '',
  endDate: ''
})


function hanleMonth(v) {
  searchPar.value.startDate = v[0]
  searchPar.value.endDate = v[1]
  getinvoiceCheckByDate()
}

function getinvoiceCheckByDate() {
  invoiceCheckByDate( searchPar.value ).then(res => {
    initPie(res.data)
    initBar(res.data.invoiceCheckStatistic)
  }).catch(err => {
    console.log('整体概况发票审批情况按月份查询:', err)
  })
}

function initPie(data) {
  const approvalDom = document.getElementById("approvalChart"); // 审批占比
  const approvalChart = echarts.init(approvalDom, null, {
    width: "auto",
    height: '260'
  });
  approvalChart.setOption(renderOption(pieOption(), data));
}

function initBar(data) {
  const statisticsDom = document.getElementById("statisticsChart");
  const statisticsChart = echarts.init(statisticsDom, null, {
    width: "auto",
    height: '260'
  });
  const option = barOption()
  const pass = []
  const reject = []
  const wait = []
  const money = []
  const time = []
  data.forEach(item => {
    pass.push(item.monthlyPassNum)
    reject.push(item.monthlyRefuseNum)
    wait.push(item.monthlyUnCheckNum)
    money.push(item.monthlyPassMoney)
    time.push(item.yearAndMonth)
  })
  option.xAxis[0].data = time
  option.series[0].data = reject// 驳回
  option.series[1].data = wait // 待审批
  option.series[2].data = pass // 通过
  option.series[3].data = money// 审批金额
  statisticsChart.setOption(option);
}

function init() {
  const now = dayjs();
  const twelveMonthsAgo = now.subtract(11, 'month');
  searchPar.value.startDate = twelveMonthsAgo.format('YYYY-MM-DD')
  searchPar.value.endDate = now.format('YYYY-MM-DD')
  getinvoiceCheckByDate()
}

// 根据不同的图表，配置不同的option
function renderOption(option, data) {
  option.series[0].data = [
      {
        value: data.refuseNum || 0,
        name: "驳回",
        itemStyle: {
          color: "#F76161",
        },
      },
      {
        value: data.unCheckNum || 0,
        name: "未审批",
        itemStyle: {
          color: "#FF9100",
        },
      },
      {
        value: data.passNum || 0,
        name: "通过",
        itemStyle: {
          color: "#5ECF69",
        },
      },
    ]
    option.series[0].radius =  ["0%", "60%"],
    delete option.title
    return option
}

init()
</script>

<style lang="scss" scoped>

</style>