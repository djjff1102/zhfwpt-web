<template>
  <div>
    <div id="RiskValueAssessment">
      <div class="title base-title">风险值评估</div>
      <RiskValueAssessment v-bind="$attrs" ></RiskValueAssessment>
      <div class="title base-title">企业进销项发票趋势</div>
      <el-tabs type="card" v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="进项发票" name="1">
          <PredictCom :data="echartData.sum"></PredictCom>
          <div class="tendencyChart w-full h-400px">
            <TendencyChart :dataList="echartData.x" :time="echartData.y"></TendencyChart>
          </div>
        </el-tab-pane>
        <el-tab-pane label="销项发票" name="2">
          <PredictCom :data="echartData.sum"></PredictCom>
          <div class="tendencyChart w-full h-400px">
            <TendencyChart :dataList="echartData.x" :time="echartData.y"></TendencyChart>
          </div>
        </el-tab-pane>
        <el-tab-pane label="近期申报" name="3">
          近期申报
        </el-tab-pane>
      </el-tabs>
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
// import { fpspReport } from '@/api/intellApproval'
import { formatData } from '@/utils/common'
import { ref } from 'vue'

const props = defineProps({
  companyName: {
    default: ''
  }
});

watch(
  () => props.companyName,
  (name) => {
    if(name) {
      getgroupByInvoiceDate({
        receivingCompanyName: props.companyName, 
        invoicingCompanyName: ""
      })
    }
  }
);

const activeName = ref('1')
const echartData = ref({
  x:[],
  y: [],
  sum : 0
})

function handleClick(v) {
  console.log('---------------------:', v.index,)
  if(v.index == '0') {
    const search = {
      receivingCompanyName: props.companyName, //收票单位
      invoicingCompanyName: "" // 开票单位
    }
    getgroupByInvoiceDate(search)
  } else if(v.index == '1') {
    const search = {
      receivingCompanyName: '', //收票单位
      invoicingCompanyName: props.companyName // 开票单位
    }
    getgroupByInvoiceDate(search);
  } else {
    getfpspReport();
  }
}

function getfpspReport() {
  const search = {

  }
}

function getgroupByInvoiceDate(search) {
  groupByInvoiceDate(search).then(res => {
    echartData.value = formatData(res.data.data);
  }).catch(err => {})
}
</script>