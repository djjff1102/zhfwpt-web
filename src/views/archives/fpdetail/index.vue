<template>
  <div class="order-detail-container">
    <div class="title">{{ name }}基本信息</div>
    <BaseInfo v-if="name == '销项发票'" :order="fapiao"></BaseInfo>
    <BaseInfoIN v-else :order="fapiao"></BaseInfoIN>
    <div class="title">商品单信息</div>
    <SecondWarehousing :id="fapiao.id"></SecondWarehousing>
  </div>
</template>
<script setup>
import  { ref } from 'vue';
import BaseInfo from "./components/BaseInfo.vue"
import SecondWarehousing from "./components/SecondWarehousing.vue";
import InvoiceInformation from "@/components/InvoiceInformation/components/InputInvoice.vue";
import BaseInfoIN from './components/BaseInfoIN.vue'
import { useRoute } from 'vue-router'

const route = useRoute();

const fapiao = ref({}) // 发票信息
const name = ref(); // 

function init() {
  fapiao.value = JSON.parse(route.query.fapiao);
  name.value = route.query.name
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
