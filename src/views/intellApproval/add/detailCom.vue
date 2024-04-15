<template>
  <div id="RiskValueAssessment">
    <!-- 风险值评估 -->
    <div v-hasPerm="approvalMapping.approvalEvaluate">
      <div class="title base-title">风险值评估</div>
      <RiskValueAssessment :companyId="data.id" :companyName="data.name" :reportId="data.reportId"></RiskValueAssessment>
    </div>
    <!-- 企业用票需求预测 -->
    <div v-hasPerm="approvalMapping.approvalPredict">
      <div class="title base-title">企业进销项发票趋势</div>
      <TendencyChart chartId="chartId1" :dataList="echartData" :time="echartData.x"></TendencyChart>
    </div>
    <!-- 历史审批情况 -->
    <div v-hasPerm="approvalMapping.approvalHistory">
      <div class="title base-title">历史审批</div>
      <historyList :companyId="data.id"></historyList>
    </div>
  </div>
</template>

<script setup>
import RiskValueAssessment from "@/components/RiskValueAssessment/index.vue";
import historyList from './historyList.vue'
// import TendencyChart from "../../archives/company/components/InvoiceInformation/components/TendencyChart/index.vue";
import { groupByInvoiceDate } from '@/api/archives'
import { queryFpspReport } from '@/api/intellApproval'
// import { fpspReport } from '@/api/intellApproval'
import { formatData } from '@/utils/common'
import { ref } from 'vue'
import { approvalMapping } from '@/router/permissionCode'

const props = defineProps({
  companyName: {
    default: ''
  },
  companyId: {
    default: ''
  },
  preStrMoney: {
    default: 0
  },
  reportId: {
    default: ''
  }
});
const data = ref()
watch(
  () => props.companyName,
  (name) => {
    if(name) {
      data.value = {
        name,
        id: props.companyId,
        reportId: props.reportId
      }
      init()
    }
  },
  {
    immediate: true
  }
);

const echartData = ref({
  x:[],
  series: [
    {
      name: "进项",
      type: "line",
      symbolSize: 8,
      data: [],
    },
    {
      name: "销项",
      type: "line",
      symbolSize: 8,
      data: [],
    },
    {
      name: "近期申报",
      type: "line",
      symbolSize: 8,
      data: [],
    },
  ],
})

// 进项发票
function getgroupByInvoiceDateIn() {
  return new Promise((resolve, reject) => {
    groupByInvoiceDate({
      receivingCompanyName: data.value.name
    }).then(res => {
      resolve(res.data)
    }).catch(err => {
      reject(err)
    })
  })
}

// 销项发票
function getgroupByInvoiceDateOut() {
  return new Promise((resolve, reject) => {
    groupByInvoiceDate({
      invoicingCompanyName: data.value.name
    }).then(res => {
      resolve(res.data)
    }).catch(err => {
      reject(err)
    })
  })
}

// 近期申报
function getfpspReport() {
  // TODO: 暂时这是 id传值为空
  // return new Promise((resolve, reject) => {
  //   queryFpspReport({id: data.value?.id}).then(res => {
  //     const data = res.data;
  //     let x = []
  //     let y = []
  //     data.forEach(item =>{
  //       x.push(item.yearMoth)
  //       y.push(item.moneySum)
  //     })
  //     resolve(x, y)
  //   }).catch(err => {
  //     reject(err)
  //   })
  // })
}

function init() {
  Promise.all([getgroupByInvoiceDateIn(), getgroupByInvoiceDateOut(), getfpspReport()])
  .then(results => {
    // 两个接口都成功返回数据
    const result1 = results[0];
    const result2 = results[1];
    const result3 = results[2]
    // 进行处理
    echartData.value.x = getfpspReport().x || formatData(result1.data).x || formatData(result2.data).x;
    echartData.value.series[0].data = formatData(result1.data).y;
    echartData.value.series[1].data = formatData(result2.data).y;
    echartData.value.series[2].data = result3.y;
  })
  .catch(error => {
    console.error('Error fetching data:', error);
});
}

</script>
<style lang="scss" scoped>
.tab-wrap {
  position: relative
}
.predict-wrap {
  position: absolute;
  top: 0;
  right: 0;
}
</style>