<!-- 订单关联仓储-仓储详情 -->
<template>
  <div class="second-warehousing-container">
    <div class="title">基本信息</div>
    <BaseInfo :info="info"></BaseInfo>
    <div class="title">关联商品</div>
    <relationOrder></relationOrder>
  </div>
</template>
<script setup>
import BaseInfo from "./BaseInfo.vue";
import relationOrder from "./relationOrder.vue";
import {qyzxwarehouseoutgood} from '@/api/archives'
import { ref } from 'vue'
import { useRoute } from "vue-router";
const route = useRoute()

const info = ref({})

function init() {
  const query = route.query
  const data = {
    id: query.id,
  }
  qyzxwarehouseoutgood( data ).then(res => {
    info.value = res.data
  })
}

init()
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
