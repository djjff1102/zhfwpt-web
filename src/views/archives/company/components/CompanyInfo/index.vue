<template >
  <div>
    <!-- 企业基本信息 -->
    <el-tabs type="card" >
      <el-tab-pane v-if="dataPermissionCode.includes(approvalMapping.archiveAdmin)" label="变更信息">
        <ChangeInfo v-bind="$attrs"></ChangeInfo>
      </el-tab-pane>
      <el-tab-pane v-if="dataPermissionCode.includes(approvalMapping.archiveCompany)" label="企业图谱">
        <CompanyGraph v-bind="$attrs"></CompanyGraph>
      </el-tab-pane>
      <el-tab-pane v-if="dataPermissionCode.includes(approvalMapping.archiveStockRight)" label="股权穿透">
        <EquityPenetration v-bind="$attrs"></EquityPenetration>
      </el-tab-pane>
      <el-tab-pane v-if="dataPermissionCode.includes(approvalMapping.archiveSupply)" label="新闻舆情">
        新闻舆情
      </el-tab-pane>
    </el-tabs>
  </div>

</template>
<script setup>
import { ref } from 'vue'
import { useUserStoreHook } from "@/store/modules/user";
import { approvalMapping } from '@/router/permissionCode'
import CompanyGraph from './CompanyGraph.vue'
import EquityPenetration from './EquityPenetration.vue'
import ChangeInfo from './ChangeInfo.vue'

const userStore = useUserStoreHook();
const dataPermissionCode = userStore.user.dataPermissionCode || []
</script>
<style lang="scss" scoped>
:deep(.el-tabs__header) {
  margin-bottom: 8px !important;
}
</style>
