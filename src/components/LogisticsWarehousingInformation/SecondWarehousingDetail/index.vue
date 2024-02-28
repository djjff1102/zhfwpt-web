<template>
  <div>
    <div class="title">基本信息</div>
    <BaseInfo></BaseInfo>
    <div class="title">关联订单列表</div>
    <OrderInformation></OrderInformation>
  </div>
</template>
<script setup>
import BaseInfo from "../detail/components/BaseInfo.vue";
import OrderInformation from "@/components/OrderInformation";
</script>
<style lang="">
</style>
