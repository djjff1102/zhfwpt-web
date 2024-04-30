<template >
  <!-- 发票信息 -->
  <div>
    <el-tabs v-model="activeName" type="card">
      <el-tab-pane label="销项发票" name="output">
        <OutputInvoice v-if="activeName === 'output'"></OutputInvoice>
      </el-tab-pane>
      <el-tab-pane label="进项发票" name="input">
        <InputInvoice v-if="activeName === 'input'"></InputInvoice>
      </el-tab-pane>
    </el-tabs>
    <div class="title">企业进项发票趋势</div>
    <div class="tendencyChart w-full">
      <div class="date-month">
        <el-date-picker
          v-model="monthRange"
          type="monthrange"
          range-separator="到"
          start-placeholder="开始月份"
          end-placeholder="结束月份"
          value-format="YYYY-MM-DD"
          :clearable="false"
          :shortcuts="shortcuts"
          @change="changeMonth"
        />
      </div>
      <TendencyChart :dataList="echartData" :time="echartData.x"></TendencyChart>
    </div>
  </div>
</template>
<script setup>
import { ref } from 'vue';
// import TendencyChart from "./components/TendencyChart/index.vue";
// import OutputInvoice from "./components/OutputInvoice.vue";
import InputInvoice from "./components/InputInvoice.vue";
import { groupByInvoiceDate } from '@/api/archives'
import { useRoute } from 'vue-router';
import { formatData } from '@/utils/common'
import dayjs from 'dayjs'
const route = useRoute();

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


const monthRange = ref('') // 时间月份
const activeName = ref('output')
const echartData = ref({
  x:[],
  series: [
    {
      name: '进项',
      type: "line",
      symbolSize: 8,
      symbol: "circle",
      data: [],
    },
    {
      name: "销项",
      type: "line",
      symbolSize: 8,
      symbol: "circle",
      data: [],
    }
  ]
})

// 切换月份查询
function changeMonth() {
  init()
}

// 进项发票
function getgroupByInvoiceDateIn() {
  return new Promise((resolve, reject) => {
    groupByInvoiceDate({
      receivingCompanyName: route.query.companyName,
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
      invoicingCompanyName: route.query.companyName,
      invoiceDateStart: monthRange.value[0],
      invoiceDateEnd: monthRange.value[1]
    }).then(res => {
      resolve(res.data)
    }).catch(err => {
      reject(err)
    })
  })
 
}

function init() {
  Promise.all([getgroupByInvoiceDateIn(), getgroupByInvoiceDateOut()])
  .then(results => {
    // 两个接口都成功返回数据
    const result1 = results[0];
    const result2 = results[1];
    // 进行处理
    echartData.value.x = formatData(result2).x;
    echartData.value.series[0].data = formatData(result1).y;
    echartData.value.series[1].data = formatData(result2).y;
  })
  .catch(error => {
    console.error('Error fetching data:', error);
});
}
const now = dayjs();
const twelveMonthsAgo = now.subtract(11, 'month');
monthRange.value = [ twelveMonthsAgo.format('YYYY-MM-DD'), now.format('YYYY-MM-DD') ]
// monthRange.value = [ dayjs().format('YYYY-MM-DD'), dayjs().add(1, 'year').format('YYYY-MM-DD') ]
init();

</script>
<style lang="scss" scoped>
.title {
  position: relative;
  margin: 16px 0;
  font-family: PingFangSC, PingFang SC;
  font-weight: 400;
  font-size: 16px;
  color: #333333;
  line-height: 22px;
}
.date-month {
  margin-top: 24px;
  text-align: right;
}
</style>
