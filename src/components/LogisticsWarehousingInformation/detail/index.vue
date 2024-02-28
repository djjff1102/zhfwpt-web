<template>
  <div>
    <div class="title">基本信息</div>
    <BaseInfo></BaseInfo>
    <div class="title">子订单信息</div>
    <SecondOrder></SecondOrder>
    <div class="title">关联订单列表</div>
    <OrderInformation></OrderInformation>
  </div>
</template>
<script setup>
import BaseInfo from "./components/BaseInfo.vue";
import SecondOrder from "./components/SecondOrder.vue";
import OrderInformation from "@/components/OrderInformation";
</script>
<style lang="">
</style>
