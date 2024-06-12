<template>
  <div id="RiskValueAssessment">
    <!-- 风险值评估 -->
    <div v-hasPerm="approvalMapping.approvalEvaluate">
      <div class="title base-title">风险值评估</div>
      <RiskValueAssessment :companyId="data.id" :companyName="data.name" :reportId="data.reportId"></RiskValueAssessment>
    </div>
    <!-- 企业用票需求预测 -->
    <div v-hasPerm="approvalMapping.approvalPredict" style="margin-top: 64px;">
      <div class="title base-title">企业进销项发票趋势</div>
      <PredictCom :data="preStrMoney"></PredictCom>
      <div class="date-month">
        <el-date-picker
          v-model="monthRange"
          type="monthrange"
          range-separator="到"
          start-placeholder="开始月份"
          end-placeholder="结束月份"
          value-format="YYYY-MM-DD"
          :shortcuts="shortcuts"
          :clearable="false"
          :popper-options="{
              modifiers: [
                  {
                      name: 'flip',
                      options: {
                          fallbackPlacements: ['bottom'],
                          allowedAutoPlacements: ['bottom'],
                      }
                  }
              ]
          }"
          @change="changeMonth"
        />
      </div>
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
import PredictCom from './PredictCom.vue'
import dayjs from "dayjs";

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
const data = ref({
  name: '',
  id: '',
  reportId: ''
})
const monthRange = ref('') // 时间月份
const shortcuts = ref([
  {
    text: '近一年',
    value: () => {
      const now = dayjs();
      const twelveMonthsAgo = now.subtract(11, 'month');
      return [ twelveMonthsAgo.format('YYYY-MM-DD'), now.format('YYYY-MM-DD') ]
    }
  },
  {
    text: '近半年',
    value: () => {
      const now = dayjs();
      const fiveMonthsAgo = now.subtract(5, 'month');
      return [ fiveMonthsAgo.format('YYYY-MM-DD'), now.format('YYYY-MM-DD') ]
    },
  },
  {
    text: '今年至今',
    value: () => {
      const firstday = dayjs().startOf('year')
      const now = dayjs();
      return [ firstday.format('YYYY-MM-DD'), now.format('YYYY-MM-DD') ]
    },
  },
])

watch(
  () => props.companyName,
  (name) => {
    if(name) {
      data.value = {
        name,
        id: props.companyId,
        reportId: props.reportId
      }
    }
  },
  {
    immediate: true
  }
);

watch(
  () => props.companyId,
  (id) => {
    if(id) {
      const now = dayjs();
      // 计算11个月前的日期
      const twelveMonthsAgo = now.subtract(11, 'month');
      monthRange.value = [ twelveMonthsAgo.startOf('month').format('YYYY-MM-DD'), now.endOf('month').format('YYYY-MM-DD') ]
      setTimeout(() => {
        init(id)
      }, 0)
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
      symbol: "circle",
      symbolSize: 8,
      data: [],
    },
    {
      name: "销项",
      type: "line",
      symbol: "circle",
      symbolSize: 8,
      data: [],
    },
    {
      name: "近期申报",
      symbol: "circle",
      type: "line",
      symbolSize: 8,
      data: [],
    },
  ],
})

// 切换月份查询
function changeMonth() {
  if(monthRange.value && monthRange.value[1]) {
    monthRange.value[0] = dayjs(monthRange.value[0]).startOf('month').format('YYYY-MM-DD');
    monthRange.value[1] = dayjs(monthRange.value[1]).endOf('month').format('YYYY-MM-DD');
  }
  init(props.companyId)
}

// 进项发票
function getgroupByInvoiceDateIn() {
  return new Promise((resolve, reject) => {
    groupByInvoiceDate({
      receivingCompanyName: props.companyName,
      invoiceDateStart: monthRange.value[0],
      invoiceDateEnd: monthRange.value[1]
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
      // invoicingCompanyName: data.value.name,
      invoicingCompanyName: props.companyName,
      invoiceDateStart: monthRange.value[0],
      invoiceDateEnd: monthRange.value[1]
    }).then(res => {
      resolve(res.data)
    }).catch(err => {
      reject(err)
    })
  })
}

// 近期申报
function getfpspReport(id) {
  return queryFpspReport({ 
    companyId: id,
    reportStartTime: monthRange.value[0],
    reportEndTime: monthRange.value[1]
   }).then(res => {
    return res.data;
  })
}

function init(id) {
  Promise.all([getgroupByInvoiceDateIn(), getgroupByInvoiceDateOut(), getfpspReport(id)])
  .then(results => {
    // 两个接口都成功返回数据
    const result1 = results[0];
    const result2 = results[1]
    const result3 = results[2]
    // 进行处理
    echartData.value.x = formatData(result2).x;
    echartData.value.series[0].data = formatData(result1).y;
    echartData.value.series[1].data = formatData(result2).y;
    echartData.value.series[2].data = formatData(result3).y;
  })
  .catch(error => {
    // ElMessage.waring(JSON.stringify(error));
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
.date-month {
  margin-top: 24px;
  text-align: right;
}
</style>