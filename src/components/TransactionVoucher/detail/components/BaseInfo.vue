<template>
  <!-- 订单基本信息 -->
  <el-descriptions class="margin-top" :column="2" border>
    <el-descriptions-item label="合同编号">
      {{ order?.code || '--' }}
    </el-descriptions-item>
    <el-descriptions-item label="合同金额">{{ formatNumber(order?.amount) || '--' }}</el-descriptions-item>
    <el-descriptions-item label="甲方(买方/采购方/需方)">
      {{ order?.partyA || '--' }}
    </el-descriptions-item>
    <el-descriptions-item label="乙方(卖方/销售方/供方)">
      {{ order?.partyB || '--' }}
    </el-descriptions-item>
    <el-descriptions-item label="签订时间">
      {{ order?.signDate || '--' }}
    </el-descriptions-item>
    <el-descriptions-item label="签订地点">
      {{ order?.signAddress || '--' }}
    </el-descriptions-item>
    <el-descriptions-item label="交货方式"> {{ order?.deliveryType || '--' }} </el-descriptions-item>
    <el-descriptions-item label="交货地点">
      {{order.deliveryAddress || '--' }}
    </el-descriptions-item>
  </el-descriptions>
</template>
<script setup>
import { formatNumber } from '@/utils/common'
const props = defineProps({
  order: {
    default: {}
  }
})
</script>
<style lang="">
</style>
