<template>
  <div class="order-detail-container">
    <div class="title">基本信息</div>
    <BaseInfo :order="order"></BaseInfo>
    <div class="title">子仓库信息</div>
    <SecondWarehousing :parentCode="order.code"></SecondWarehousing>
    <div class="title">关联发票列表</div>
    <InvoiceInformation></InvoiceInformation>
  </div>
</template>
<script setup>
import  { ref, reactive } from 'vue';
import BaseInfo from "./components/BaseInfo.vue";
import SecondWarehousing from "./components/SecondWarehousing.vue";
import InvoiceInformation from "@/components/InvoiceInformation/components/InputInvoice.vue";
import { useRoute } from 'vue-router'

const route = useRoute();

const order = ref({}) // 订单信息

function init() {
  order.value = JSON.parse(route.query.order);
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
