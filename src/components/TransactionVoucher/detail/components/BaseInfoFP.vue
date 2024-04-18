<template>
  <!-- 订单基本信息 -->
  <el-descriptions class="margin-top" :column="2" border>
    <el-descriptions-item label="发票号码">
      {{ order?.code }}
    </el-descriptions-item>
    <el-descriptions-item label="开票日期">{{ order?.invoicingDate }}</el-descriptions-item>
    <el-descriptions-item label="发票类别">
      {{ order?.type }}
    </el-descriptions-item>
    <el-descriptions-item label="开票单位">
      {{ order?.invoicingCompanyName }}
    </el-descriptions-item>
    <el-descriptions-item label="开票单位统一社会信用代码">
      {{ order?.invoicingCreditNo }}
    </el-descriptions-item>
    <el-descriptions-item label="收票单位">
      {{ order?.receivingCompanyName }}
    </el-descriptions-item>
    <el-descriptions-item label="收票单位统一社会信用代码"> {{ order?.receivingCreditNo }} </el-descriptions-item>
    <el-descriptions-item label="项目名称">
      {{ order?.goodName }}
    </el-descriptions-item>
    <el-descriptions-item label="规格型号">
      {{ order?.standard }}
    </el-descriptions-item>
    <el-descriptions-item label="数量"> {{ order?.quantity }} </el-descriptions-item>
    <el-descriptions-item label="计量单位">
     {{ order?.measureUnit }}
    </el-descriptions-item>
    <el-descriptions-item label="含税金额"> {{ order?.amountIncludeTax }} </el-descriptions-item>
    <el-descriptions-item label="税率"> {{ order?.taxRate }} </el-descriptions-item>
    <el-descriptions-item label="税额"> {{ order?.taxAmount }} </el-descriptions-item>
    <el-descriptions-item label="单价"> {{ order?.unitPrice }} </el-descriptions-item>
    <el-descriptions-item label="价税合计"> {{ order?.amountTotal }} </el-descriptions-item>
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
