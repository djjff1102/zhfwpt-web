<template >
  <div>
    <TabCom
      v-model:model-value="curTab"
      :TabData="TabData"
      :loading="loading"
      @updateTable="updateTable"
    ></TabCom>
    <div class="search_box">
      <el-form :model="searchPar" :inline="true" class="demo-form-inline">
      <el-form-item label="案号" >
        <el-input v-model="searchPar.companyName" placeholder="请输入案号" clearable/>
      </el-form-item>
      <el-form-item label="执行法院">
        <el-input v-model="searchPar.companyName" placeholder="请输入执行法院" clearable/>
      </el-form-item>
      </el-form>
    </div>
    <m-table
        style="height: 100%"
        :data="tableData"
        :columns="columns"
        :pagination="pagination"
        @page-change="changepage"
        @page-size-change="changePagesize"
        :bordered="false"
      >
        <template v-slot:index="{rowIndex}">
          {{ rowIndex + 1 }}
        </template>
      </m-table>
  </div>

</template>
<script setup>
import { ref } from 'vue'
import { useUserStoreHook } from "@/store/modules/user";
import { approvalMapping } from '@/router/permissionCode'
import TabCom from '../TabCom.vue'

const userStore = useUserStoreHook();
const dataPermissionCode = userStore.user.dataPermissionCode || []

const curTab = ref(1) // 当前选中的tab标签
const TabData = ref([{
  name: '行政处罚',
  disable: true,
},
{
  name: '经营异常',
  disable: false,
},
{
  name: '严重违法',
  disable: false,
}
])

const pagination = ref({
  total: 0,
  pageSize: 10,
  current: 1,
  "show-total": true,
  "show-page-size": true,
  "show-jumper": true,
});
const tableData = ref([])
const columns = ref([])
const searchPar = ref({
  page_size: 10,
  page: 1,
})
const loading = ref(false)

// 切换tab标签，加载数据，重置分页
function updateTable(item ,i) {
  pagination.value.current = 1
  searchPar.value.page = 1
}

const changePagesize = (v) => {
  pagination.value.pageSize = v;
  searchPar.value.page_size = v;
  getpage();
};

const changepage = (v) => {
  searchPar.value.page = v;
  getpage();
};


</script>
<style lang="scss" scoped>
:deep(.el-tabs__header) {
  margin-bottom: 8px !important;
}
.search_box {
  margin: 16px 0;
}
</style>
