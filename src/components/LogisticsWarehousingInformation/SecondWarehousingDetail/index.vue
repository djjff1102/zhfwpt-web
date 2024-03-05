<template>
  <div class="second-warehousing-container">
    <div class="title">基本信息</div>
    <BaseInfo></BaseInfo>
    <div class="title">关联订单列表</div>
    <OrderInformation></OrderInformation>
  </div>
</template>
<script setup>
import BaseInfo from "../detail/components/BaseInfo.vue";
import OrderInformation from "@/components/OrderInformation/index.vue";
</script>
<style lang="scss" scoped>
.second-warehousing-container {
  background-color: #fff;
  padding: 16px 90px;
}

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
</style>
