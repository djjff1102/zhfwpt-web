<template>
  <div>
    <div id="RiskValueAssessment">
      <div class="title base-title">风险值评估</div>
      <RiskValueAssessment v-bind="$attrs" ></RiskValueAssessment>
      <div class="title base-title">企业进销项发票趋势</div>
      <div class="tab-wrap">
        <el-tabs type="card" v-model="activeName" @tab-click="handleClick">
          <el-tab-pane label="进项发票" name="1">
            <div class="tendencyChart w-full">
              <TendencyChart chartId="chartId1" :dataList="echartData.x" :time="echartData.y"></TendencyChart>
            </div>
          </el-tab-pane>
          <el-tab-pane label="销项发票" name="2">
            <div class="tendencyChart w-full">
              <TendencyChart chartId="chartId2" :dataList="echartData2.x" :time="echartData2.y"></TendencyChart>
            </div>
          </el-tab-pane>
          <el-tab-pane label="近期申报" name="3">
            <div class="tendencyChart w-full">
              <TendencyChart chartId="chartId3" :dataList="recentEchartData.y" :time="recentEchartData.x"></TendencyChart>
            </div>
          </el-tab-pane>
        </el-tabs>
        <div class="predict-wrap">
          <PredictCom :data="echartData.sum"></PredictCom>
        </div>
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
import { queryFpspReport } from '@/api/intellApproval'
// import { fpspReport } from '@/api/intellApproval'
import { formatData } from '@/utils/common'
import { ref } from 'vue'

const props = defineProps({
  companyName: {
    default: ''
  },
  companyId: {
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
  },
  {
    immediate: true
  }
);

const activeName = ref('1')
const echartData = ref({
  x:[],
  y: []
})
const echartData2 = ref({
  x:[],
  y: []
})
const recentEchartData = ref({
  x:[],
  y: []
})

function handleClick(v) {
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
  queryFpspReport({id: props.companyId}).then(res => {
    const data = res.data;
    let x = []
    let y = []
    recentEchartData.value.x= []
    recentEchartData.value.y = []
    data.forEach(item =>{
      x.push(item.yearMoth)
      y.push(item.moneySum)
    })
    recentEchartData.value.x = x
    recentEchartData.value.y = y
    console.log('222222222222222222222222222:', recentEchartData.value)
  }).catch(err => {

  })
}

function getgroupByInvoiceDate(search) {
  groupByInvoiceDate(search).then(res => {
    if(activeName.value == '1') {
      echartData.value = formatData(res.data.data);
    } else {
      echartData2.value = formatData(res.data.data);
    }
  }).catch(err => {})
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