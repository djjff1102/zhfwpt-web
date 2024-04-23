<template>
  <!-- 销项 -->
  <el-descriptions class="margin-top" :column="2" border>
    <el-descriptions-item label="开票单位" width="60">
      {{ order?.receivingCompanyName || '--' }}
    </el-descriptions-item>
    <el-descriptions-item label="开票单位统一社会信用码" width="60">{{ order?.receivingCreditNo || '--' }}</el-descriptions-item>
    <el-descriptions-item label="受票单位" width="60">
      {{ order?.invoicingCompanyName || '--' }}
    </el-descriptions-item>
    <el-descriptions-item label="受票单位统一社会信用码" width="60">{{ order?.invoicingCreditNo || '--' }}</el-descriptions-item>
    <el-descriptions-item label="开票日期">
      {{ order?.invoicingDate || '--' }}
    </el-descriptions-item>
    <el-descriptions-item label="发票代码">
      {{ order?.code || '--' }}
    </el-descriptions-item>
     <el-descriptions-item label="发票号码">
      {{ order?.number || '--' }}
    </el-descriptions-item>
    <!-- <el-descriptions-item label="开票日期">
      {{ order?.invoicingDate || '--' }}
    </el-descriptions-item> -->
    <el-descriptions-item label="发票类别">
      {{ order?.type || '--' }}
    </el-descriptions-item>
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
