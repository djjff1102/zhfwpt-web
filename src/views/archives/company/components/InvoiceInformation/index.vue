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
    <div class="title">企业进项发票趋势-待接口联调</div>
    <div class="tendencyChart w-full">
      <TendencyChart :dataList="echartData.x" :time="echartData.y"></TendencyChart>
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
  y: [],
  sum : 0
})

// 进项发票
function getgroupByInvoiceDateIn() {
  groupByInvoiceDate({
    receivingCompanyName: route.query.companyName
  }).then(res => {
    echartData.value = formatData(res.data.data);
  }).catch(err => {})
}

getgroupByInvoiceDateIn()
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
