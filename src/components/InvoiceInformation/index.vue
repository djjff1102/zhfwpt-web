<template >
  <!-- 发票信息 -->
  <el-tabs type="border-card">
    <el-tab-pane label="销项发票">
      <OutputInvoice></OutputInvoice>
    </el-tab-pane>
    <el-tab-pane label="进项发票">
      <InputInvoice></InputInvoice>
    </el-tab-pane>
  </el-tabs>
</template>
<script setup>
import OutputInvoice from "./components/OutputInvoice.vue";
import InputInvoice from "./components/InputInvoice.vue";
</script>
<style lang="scss" scoped>
</style>
