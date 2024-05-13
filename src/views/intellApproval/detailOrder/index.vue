<template>
  <div class="order-detail-container">
    <div class="title">基本信息</div>
    <BaseInfo :order="order"></BaseInfo>
    <div class="title">商品详情</div>
    <goodinfo :parentCode="code" :reportId="reportId"></goodinfo>
    </div>
</template>
<script setup>
import  { ref } from 'vue';
import BaseInfo from "../detailOrder/components/BaseInfo.vue"
import goodinfo from "../detailOrder/components/goodinfo.vue";
import { useRoute } from 'vue-router'
import { qyzxOrder } from '@/api/archives'

const route = useRoute();

const order = ref({}) // 订单信息
const code = ref(); // 订单编号
const reportId = ref() // 审批ID

// 获取主订单列表及详情
function getqyzxOrder() {
  const data = {
    page_size: 10,
    page: 1,
    code: code.value
  }
  if(reportId.value) {
    data.dataType = reportId.value
  }
  qyzxOrder( data ).then(res => {
    order.value = res.data[0] || {}
  }).catch(err => {
  })
}

function init() {
  code.value = route.query.orderCode;
  reportId.value = route.query.reportId
  getqyzxOrder()
}

init()
</script>
<style lang="scss" scoped>
.title {
  position: relative;
  margin: 16px 0;
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
:deep(.w-input-wrapper) {
  width: 188px;
  height: 32px;
}
:deep(.w-picker) {
  width: 240px;
  height: 32px;
}
:deep(.w-select-view) {
  width: 132px;
  height: 32px;
}
:deep(.w-form-item-label) {
  height: 32px;
  color: #000;
  font-weight: 500;
}
</style>
