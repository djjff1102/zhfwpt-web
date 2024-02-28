<template >
  <!-- 经营信息 -->
  <el-tabs type="border-card">
    <el-tab-pane label="进出口信用">
      <ImportAndExport></ImportAndExport>
    </el-tab-pane>
    <el-tab-pane label="行政许可">
      <AdministrativeLicensing></AdministrativeLicensing>
    </el-tab-pane>
    <el-tab-pane label="纳税人资质">
      <TaxpayerQualification></TaxpayerQualification>
    </el-tab-pane>
    <el-tab-pane label="企业图谱">
      <CompanyGraph></CompanyGraph>
    </el-tab-pane>
    <el-tab-pane label="股权穿透">
      <EquityPenetration></EquityPenetration>
    </el-tab-pane>
    <el-tab-pane label="供应链分析">
      <SupplyChainAnalysis></SupplyChainAnalysis>
    </el-tab-pane>
  </el-tabs>
</template>
<script setup>
import ImportAndExport from "./components/ImportAndExport.vue";
import AdministrativeLicensing from "./components/AdministrativeLicensing.vue";
import TaxpayerQualification from "./components/TaxpayerQualification.vue";
import CompanyGraph from "./components/CompanyGraph.vue";
import EquityPenetration from "./components/EquityPenetration.vue";
import SupplyChainAnalysis from "./components/SupplyChainAnalysis.vue";
</script>
<style lang="scss" scoped>
</style>
