<template >
  <!-- 发票信息 -->
  <el-tabs v-model="activeName" type="card">
    <el-tab-pane label="销项发票" name="output">
      <OutputInvoice v-if="activeName === 'output'"></OutputInvoice>
    </el-tab-pane>
    <el-tab-pane label="进项发票" name="input">
      <InputInvoice v-if="activeName === 'input'"></InputInvoice>
    </el-tab-pane>
  </el-tabs>
</template>
<script setup>
import { ref } from 'vue';
const activeName = ref('output')

import OutputInvoice from "./components/OutputInvoice.vue";
import InputInvoice from "./components/InputInvoice.vue";
</script>
<style lang="scss" scoped>
</style>
