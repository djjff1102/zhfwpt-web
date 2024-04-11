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
      <TendencyChart :dataList="echartData" :time="echartData.x"></TendencyChart>
    </div>
  </div>
</template>
<script setup>
import { ref } from 'vue';
import TendencyChart from "./components/TendencyChart/index.vue";
import OutputInvoice from "./components/OutputInvoice.vue";
import InputInvoice from "./components/InputInvoice.vue";
import { groupByInvoiceDate } from '@/api/archives'
import { useRoute } from 'vue-router';
import { formatData } from '@/utils/common'
const route = useRoute();

const activeName = ref('output')
const echartData = ref({
  x:[],
  yOut: {
    data: [],
    name: '销项'
  },
  yIn: {
    data: [],
    name: '进项'
  }
})

// 进项发票
function getgroupByInvoiceDateIn() {
  return new Promise((resolve, reject) => {
    groupByInvoiceDate({
      receivingCompanyName: route.query.companyName
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
      invoicingCompanyName: route.query.companyName
    }).then(res => {
      resolve(res.data)
    }).catch(err => {
      reject(err)
    })
  })
 
}

Promise.all([getgroupByInvoiceDateIn(), getgroupByInvoiceDateOut()])
  .then(results => {
    // 两个接口都成功返回数据
    const result1 = results[0];
    const result2 = results[1];
    // 进行处理
    echartData.value.x = formatData(result2.data).x;
    echartData.value.yOut.data = formatData(result2.data).y;
    echartData.value.yIn.data = formatData(result1.data).y;
    console.log('biage------------:', echartData.value)
  })
  .catch(error => {
    console.error('Error fetching data:', error);
});
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
</style>
