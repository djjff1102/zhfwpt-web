<template>
  <!-- 订单基本信息 -->
  <el-descriptions class="margin-top" :column="2" border>
    <el-descriptions-item label="订单编号">
      {{ order?.code }}
    </el-descriptions-item>
    <el-descriptions-item label="订单创建日期">{{ order?.orderCreateDate }}</el-descriptions-item>
    <el-descriptions-item label="买方名称">
      {{ order?.buyerCompanyName }}
    </el-descriptions-item>
    <el-descriptions-item label="买方信用代码">
      {{ order?.buyerCreditNo }}
    </el-descriptions-item>
    <el-descriptions-item label="卖方名称">
      {{ order?.sellerCompnayName }}
    </el-descriptions-item>
    <el-descriptions-item label="卖方信用代码">
      {{ order?.sellerCreditNo }}
    </el-descriptions-item>
    <el-descriptions-item label="商品所在地省"> {{ order?.goodProvince }} </el-descriptions-item>
    <el-descriptions-item label="商品所在地市">
      {{ order?.goodAddress }}
    </el-descriptions-item>
    <el-descriptions-item label="商品所在地址">
      {{ order?.goodAddress }}
    </el-descriptions-item>
    <el-descriptions-item label="仓库名称"> {{ order?.warehouseName }} </el-descriptions-item>
    <el-descriptions-item label="交易凭证（合同）编号">
     {{ order?.certificateCode }}
    </el-descriptions-item>
    <el-descriptions-item label="总金额"> {{ order?.totalMoney }} </el-descriptions-item>
  </el-descriptions>
</template>
<script setup>
const props = defineProps({
  order: {
    default: {}
  }
})
</script>
<style lang="">
</style>
