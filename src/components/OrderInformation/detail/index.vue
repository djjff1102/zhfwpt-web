<template>
  <div class="order-detail-container">
    <div class="title">基本信息</div>
    <BaseInfo v-if="fromOrder == 'true'" :order="order"></BaseInfo>
    <BaseInfoFP v-else :order="fapiao"></BaseInfoFP>
    <div class="title">子订单信息</div>
    <SecondWarehousing :parentCode="code"></SecondWarehousing>
    <div v-if="fromOrder == 'true'">
      <div class="title">关联发票列表</div>
      <InvoiceInformation :parentCode="order.code"></InvoiceInformation></div>
    </div>
</template>
<script setup>
import  { ref } from 'vue';
import BaseInfo from "./components/BaseInfo.vue"
import SecondWarehousing from "./components/SecondWarehousing.vue";
import InvoiceInformation from "@/components/InvoiceInformation/components/InputInvoice.vue";
import BaseInfoFP from './components/BaseInfoFP.vue'
import { useRoute } from 'vue-router'

const route = useRoute();

const order = ref({}) // 订单信息
const fapiao = ref({}) // 发票信息
const fromOrder = ref(false) // 从发票跳转、订单跳转
const code = ref(); // 订单编号

function init() {
  fromOrder.value = route.query.fromOrder;
  if(fromOrder.value == 'true') {
    order.value = JSON.parse(route.query.order);
    code.value = order.value.code;
  } else {
    fapiao.value = JSON.parse(route.query.fapiao);
    code.value = fapiao.value.orderCode;
  }
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
</style>
