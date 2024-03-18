<template>
  <div>
    <div id="RiskValueAssessment">
      <div class="title base-title">风险值评估</div>
      <RiskValueAssessment v-bind="$attrs" ></RiskValueAssessment>
      <div class="title base-title">企业进销项发票趋势</div>
      <div class="tendencyChart w-full h-400px">
        <TendencyChart :dataList="echartData.x" :time="echartData.y"></TendencyChart>
      </div>
      <div class="title base-title">历史审批</div>
      <historyList v-bind="$attrs"></historyList>
    </div>
  </div>
</template>

<script setup>
import RiskValueAssessment from "@/components/RiskValueAssessment/index.vue";
import historyList from './historyList.vue'
import TendencyChart from "../../archives/company/components/InvoiceInformation/components/TendencyChart/index.vue";
import { groupByInvoiceDate } from '@/api/archives'
import { formatData } from '@/utils/common'
import { ref } from 'vue'

const echartData = ref({
  x:[],
  y: [],
  sum : 0
})

function getgroupByInvoiceDate() {

  groupByInvoiceDate({
    receivingCompanyName: ''
  }).then(res => {
    echartData.value = formatData(res.data.data);
  }).catch(err => {})
}
getgroupByInvoiceDate()
</script>