<template>
  <div>
    <div class="title">基本信息</div>
    <BaseInfo></BaseInfo>
    <div class="title">子仓库信息</div>
    <SecondWarehousing></SecondWarehousing>
    <div class="title">关联发票列表</div>
    <InvoiceInformation></InvoiceInformation>
  </div>
</template>
<script setup>
import BaseInfo from "./components/BaseInfo.vue";
import SecondWarehousing from "./components/SecondWarehousing.vue";
import InvoiceInformation from "@/components/InvoiceInformation";
</script>
<style lang="">
</style>
