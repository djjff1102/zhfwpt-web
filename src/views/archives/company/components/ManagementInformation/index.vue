<template >
  <!-- 经营信息 -->
  <el-tabs type="card" >
    <el-tab-pane v-if="dataPermissionCode.includes(approvalMapping.archiveAdmin)" label="行政许可">
      <AdministrativeLicensing v-bind="$attrs"></AdministrativeLicensing>
    </el-tab-pane>
    <el-tab-pane v-if="dataPermissionCode.includes(approvalMapping.archiveInOut)" label="进出口信用">
      <ImportAndExport v-bind="$attrs"></ImportAndExport>
    </el-tab-pane>
    <el-tab-pane v-if="dataPermissionCode.includes(approvalMapping.archiveTaxes)" label="纳税人资质">
      <TaxpayerQualification v-bind="$attrs"></TaxpayerQualification>
    </el-tab-pane>
    <el-tab-pane v-if="dataPermissionCode.includes(approvalMapping.archiveCompany)" label="企业图谱">
      <CompanyGraph v-bind="$attrs"></CompanyGraph>
    </el-tab-pane>
    <el-tab-pane v-if="dataPermissionCode.includes(approvalMapping.archiveStockRight)" label="股权穿透">
      <EquityPenetration v-bind="$attrs"></EquityPenetration>
    </el-tab-pane>
    <el-tab-pane v-if="dataPermissionCode.includes(approvalMapping.archiveSupply)" label="供应链分析">
      <SupplyChainAnalysis></SupplyChainAnalysis>
    </el-tab-pane>
    <el-tab-pane v-if="dataPermissionCode.includes(approvalMapping.GoodsInformation)" label="主营商品">
      <GoodsInformation v-bind="$attrs"></GoodsInformation>
      <!-- <SupplyChainAnalysis></SupplyChainAnalysis> -->
    </el-tab-pane>
  </el-tabs>
</template>
<script setup>
import { useUserStoreHook } from "@/store/modules/user";
import ImportAndExport from "./components/ImportAndExport.vue";
import AdministrativeLicensing from "./components/AdministrativeLicensing.vue";
import TaxpayerQualification from "./components/TaxpayerQualification.vue";
import CompanyGraph from "./components/CompanyGraph.vue";
import EquityPenetration from "./components/EquityPenetration.vue";
import SupplyChainAnalysis from "./components/SupplyChainAnalysis.vue";
import GoodsInformation from "../GoodsInformation.vue";
import { approvalMapping } from '@/router/permissionCode'

const userStore = useUserStoreHook();
const dataPermissionCode = userStore.user.dataPermissionCode || []
</script>
<style lang="scss" scoped>
:deep(.el-tabs__header) {
  margin-bottom: 8px !important;
}
</style>
