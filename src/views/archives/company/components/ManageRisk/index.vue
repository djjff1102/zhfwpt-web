<template >
  <div>
    <TabCom
      v-model:model-value="curTab"
      :TabData="TabData"
      :loading="loading"
      @updateTable="updateTable"
    ></TabCom>
    <m-table
        v-if="(curTab != CLMSGCODE) && (curTab != DEREGISTRATIONCODE)"
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
      <clearMessage v-if="curTab == CLMSGCODE" :data="tableData[0]"></clearMessage>
      <degegistration v-if="curTab == DEREGISTRATIONCODE" :data="tableData[0]"></degegistration>
  </div>

</template>
<script setup>
import { ref } from 'vue'
import { useUserStoreHook } from "@/store/modules/user";
import { approvalMapping } from '@/router/permissionCode'
import { companyItemSetting, companyItemData } from '@/api/archives'
import TabCom from '../TabCom.vue'
import { formateWord } from '@/utils/common'
import clearMessage from './clearMessage.vue'
import degegistration from './degegistration.vue'

const userStore = useUserStoreHook();
const dataPermissionCode = userStore.user.dataPermissionCode || []
// 企业资信档案库，需要特殊处理的风险类型
const CLMSGCODE = 'JYFX_QSXX' // 清算信息
const DEREGISTRATIONCODE = 'JYFX_ZXBA' // 注销备案

const props = defineProps({
  companyId: ''
})

const curTab = ref(-1) // 当前选中的tab标签
const TabData = ref([])
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
  itemCode: '',
  companyId: ''
})
const loading = ref(false)

// 切换tab标签，加载数据，重置分页
function updateTable(item ,i) {
  pagination.value.current = 1
  searchPar.value.page = 1
  columns.value = formateWord(JSON.parse(item.fieldMappingOne))
  searchPar.value.itemCode = item.itemCode
  getcompanyItemData()
}

const changePagesize = (v) => {
  pagination.value.pageSize = v;
  searchPar.value.page_size = v;
  pagination.value.current = 1
  searchPar.value.page = 1
  getcompanyItemData()
};

const changepage = (v) => {
  searchPar.value.page = v;
};


// 获取tab标签和列表columns
// TODO:清算信息、注销备案
function getcompanyItemSetting() {
  companyItemSetting({
    company_id: props.companyId
  }).then(res => {
    TabData.value = res.data[1]?.itemDetailList || []
    res.data[1].itemDetailList.forEach((item, i) => {
      if(item.hasValue && curTab.value == -1) {
        curTab.value = item.itemCode
        columns.value = formateWord(JSON.parse(item.fieldMappingOne))
        searchPar.value.companyId = props.companyId
        searchPar.value.itemCode = item.itemCode
        getcompanyItemData()
      }
    })
  }).catch(err => {
    console.log('获取公司风险tab失败：', err)
  })
}

// 查询企业资信库中每个项目数据
function getcompanyItemData() {
  companyItemData(searchPar.value).then(res => {
    tableData.value = res.data
    pagination.value.total = res.total
  }).catch(err => {
    console.log('查询企业资信库中每个项目数据异常：', err)
  })
}

getcompanyItemSetting()
</script>
<style lang="scss" scoped>
:deep(.el-tabs__header) {
  margin-bottom: 8px !important;
}
</style>
