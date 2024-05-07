<template>
  <div class="order-detail-container">
    <div class="title">发票详情基本信息</div>
    <BaseInfoBoth :order="fapiao"></BaseInfoBoth>
    <div class="title">商品信息</div>
    <goodinfo :id="fapiao.id" :code="route.query.code" :number="route.query.number" :fapiao="fapiao" :reportId="reportId"></goodinfo>
  </div>
</template>
<script setup>
import  { ref } from 'vue';
import BaseInfoBoth from "./components/BaseInfoBoth.vue"
import goodinfo from "./components/goodinfo.vue";
import { useRoute } from 'vue-router'
import { qyzxInvoice } from '@/api/archives'

const route = useRoute();

const fapiao = ref({}) // 发票信息
const name = ref(); // 
const reportId = ref()

// 发票详情
function getqyzxInvoice() {
  const data = {
    code: route.query.code,
    number: route.query.number,
    page: 1,
    page_size: 10
  }
  if(reportId.value) {
    data.dataType = reportId.value
  }
  qyzxInvoice(data).then(res => {
    fapiao.value = res.data[0] || {};
  }).catch(err => {
  })
}

function init() {
  // fapiao.value = JSON.parse(route.query.fapiao);
  name.value = route.query.name
  reportId.value = route.query.reportId
  getqyzxInvoice()
}

init()
</script>
<style lang="scss" scoped>
.title {
  position: relative;
  margin: 32px 0 16px 0;
  padding-left: 11px;
  font-family: PingFangSC, PingFang SC;
  font-weight: 500;
  font-size: 18px;
  color: #333333;
  line-height: 22px;
  &::before {
    content: "";
    position: absolute;
    left: 0px;
    top: 50%;
    transform: translateY(-50%);
    width: 3px;
    height: 18px;
    background-color: #1890ff;
  }
}
.order-detail-container {
  height: 100%;
  overflow: auto;
  background-color: #fff;
  padding: 16px 90px;
}
</style>
