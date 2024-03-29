<template>
  <!-- 销项 -->
  <el-descriptions class="margin-top" :column="2" border>
    <el-descriptions-item label="收票单位" width="120">
      {{ order?.invoicingCompanyName || '--' }}
    </el-descriptions-item>
    <el-descriptions-item label="收票单位统一社会信用码" width="120">{{ order?.invoicingCreditNo || '--' }}</el-descriptions-item>
    <el-descriptions-item label="发票号码">
      {{ order?.code || '--' }}
    </el-descriptions-item>
    <el-descriptions-item label="开票日期">
      {{ order?.invoicingDate || '--' }}
    </el-descriptions-item>
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
