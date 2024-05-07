<template>
  <div class="order-detail-container">
    <div class="title">基本信息
      <span v-if="fileUrl"> <fileDownLoad :fileUrl="fileUrl" :fileName="fileName"></fileDownLoad></span>
    </div>
    <BaseInfo :order="order"></BaseInfo>
    <div class="title">商品详情</div>
    <goodinfo :parentCode="code"></goodinfo>
    <div>
      <div class="title">关联合同</div>
      <TransactionVoucher :orderCode="code"></TransactionVoucher>
    </div>
    <div>
      <div class="title">关联仓储</div>
      <relationWarehouse :orderCode="code"></relationWarehouse>
    </div>
    <div>
      <div class="title">关联物流</div>
      <transportationWL :orderCode="code"></transportationWL>
    </div>
    </div>
</template>
<script setup>
import  { ref } from 'vue';
import BaseInfo from "./components/BaseInfo.vue"
import goodinfo from "./components/goodinfo.vue";
import { useRoute } from 'vue-router'
import { qyzxOrder } from '@/api/archives'

const route = useRoute();

const order = ref({}) // 订单信息
const code = ref(); // 订单编号
const fileUrl = ref();
const fileName = ref()
// 获取主订单列表及详情
function getqyzxOrder() {
  qyzxOrder({
    page_size: 10,
    page: 1,
    code: code.value
  }).then(res => {
    order.value = res.data[0] || {}
    fileName.value = order.value?.material?.fileName || ''
    fileUrl.value = order.value?.material?.fileUrl || ''
  }).catch(err => {
  })
}

function init() {
  code.value = route.query.orderCode;
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
