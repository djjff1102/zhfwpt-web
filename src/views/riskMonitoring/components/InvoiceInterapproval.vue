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
import { computStep } from '@/utils/common'
import noData from "@/assets/images/no-data.png";

const searchPar = ref({
  startDate: '',
  endDate: ''
})
let statisticsChartRef = null
const approvalChartRef = ref()

function hanleMonth(v) {
  searchPar.value.startDate = v[0]
  searchPar.value.endDate = v[1]
  getinvoiceCheckByDate()
}

function getinvoiceCheckByDate() {
  invoiceCheckByDate( searchPar.value ).then(res => {
    let refuseNum = res.data.refuseNum || 0
    let unCheckNum = res.data.unCheckNum || 0
    let passNum = res.data.passNum || 0
    if(refuseNum == 0 && unCheckNum == 0 && passNum == 0) {
      renderEmpty()
    } else {
      initPie(res.data)
      initBar(res.data.invoiceCheckStatistic)
    }
  }).catch(err => {
    console.log('整体概况发票审批情况按月份查询:', err)
  })
}

// 空数据处理
function renderEmpty() {
  statisticsChartRef.clear()
  approvalChartRef.value.clear();
  let d = `<div class="no-data">
    <img src="${noData}" alt="" />
    <span class="text-#BFC4CD">暂无数据</span>
  </div>`
  var img = document.createElement("img");
  img.src = noData;

  var img2 = document.createElement("img");
  img2.src = noData;
  var approvalChart = document.getElementById("approvalChart");
  var statisticsChart = document.getElementById("statisticsChart");
  approvalChart.innerHTML = d
  statisticsChart.innerHTML = d
}

function initPie(data) {
  let approvalDom = document.getElementById("approvalChart"); // 审批占比
  if (echarts.getInstanceByDom(approvalDom)) {
    echarts.dispose(approvalDom);
    approvalDom = document.getElementById("approvalChart");
  }
  approvalChartRef.value = echarts.init(approvalDom, null, {
    width: "auto",
    height: '260'
  });
  approvalChartRef.value.setOption(renderOption(pieOption(), data));
}

function initBar(data) {
  let statisticsDom = document.getElementById("statisticsChart");
  if (echarts.getInstanceByDom(statisticsDom)) {
    echarts.dispose(statisticsDom);
    statisticsDom = document.getElementById("statisticsChart");
  }
  statisticsChartRef = echarts.init(statisticsDom, null, {
    width: "auto",
    height: '260'
  });
  const option = barOption()
  const pass = []
  const reject = []
  const wait = []
  const money = []
  const time = []
  let maxApprovalNum = 0 // 最大审批量
  let maxApprovalMoney = 0 // 最大审批金额
  let splitNum = 5 // y轴分隔总数
  data.forEach(item => {
    pass.push(item.monthlyPassNum)
    maxApprovalNum = Math.max(maxApprovalNum, item.monthlyPassNum)
    reject.push(item.monthlyRefuseNum)
    maxApprovalNum = Math.max(maxApprovalNum, item.monthlyRefuseNum)
    wait.push(item.monthlyUnCheckNum)
    maxApprovalNum = Math.max(maxApprovalNum, item.monthlyUnCheckNum)
    money.push(item.monthlyPassMoney)
    maxApprovalMoney = Math.max(item.monthlyPassMoney, maxApprovalMoney)
    time.push(item.yearAndMonth)
  })
  // 计算两个y轴的步数
  let approvalNumStep = computStep(maxApprovalNum, splitNum)
  let approvalMoneyStep = computStep(maxApprovalMoney, splitNum)
  option. yAxis[0].interval = approvalNumStep.step;
  option. yAxis[0].max = approvalNumStep.sum;
  option. yAxis[1].interval = approvalMoneyStep.step;
  option. yAxis[1].max = approvalMoneyStep.sum;
  
  option.xAxis[0].data = time
  option.series[0].data = reject// 驳回
  option.series[1].data = wait // 待审批
  option.series[2].data = pass // 通过
  option.series[3].data = money// 审批金额
  statisticsChartRef.setOption(option);
}

function init() {
  const now = dayjs();
  const twelveMonthsAgo = now.subtract(11, 'month');
  searchPar.value.startDate = twelveMonthsAgo.startOf('month').format('YYYY-MM-DD')
  searchPar.value.endDate = now.endOf('month').format('YYYY-MM-DD')
  getinvoiceCheckByDate()
}

// 根据不同的图表，配置不同的option
function renderOption(option, data) {
  option.series[0].data = [
      {
        value: data.refuseNum || 0,
        name: "驳回",
        itemStyle: {
          color: "rgba(247, 97, 97, 1)",
        },
      },
      {
        value: data.unCheckNum || 0,
        name: "未审批",
        itemStyle: {
          color: "rgba(5, 148, 235, 1)",
        },
      },
      {
        value: data.passNum || 0,
        name: "通过",
        itemStyle: {
          color: "rgba(94, 207, 105, 1)",
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