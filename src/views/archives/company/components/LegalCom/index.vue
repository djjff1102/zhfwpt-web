<template >
  <div>
    <TabCom
      v-model:model-value="curTab"
      :TabData="TabData"
      :loading="loading"
      @updateTable="updateTable"
    ></TabCom>
    <div class="search_box">
      <!--  搜索条件
      案号：失信被执行人、被执行人、限制高消费、终本案件、裁判文书、立案信息、开庭公告、法院公告、送达公告
      ['FLSS-SXBZXR', 'FLSS-SDGG', 'FLSS-LAXX', 'FLSS-CPWS', 'FLSS-ZBAJ', 'FLSS-XZGXF', 'FLSS-BZXR']

      执行法院：失信被执行人、被执行人、终本案件
      ['FLSS-ZBAJ', 'FLSS-BZXR', 'FLSS-SXBZXR']

      当事人：裁判文书、立案信息、开庭公告、法院公告、送达公告
      ['FLSS-SDGG', 'FLSS-FYGG', 'FLSS-KTGG', 'FLSS-LAXX', 'FLSS-CPWS']

      案由：立案信息、开庭公告、法院公告、送达公告
      ['FLSS-SDGG', 'FLSS-FYGG', 'FLSS-KTGG', 'FLSS-LAXX']

      标题：司法拍卖（调整）
      ['FLSS-SFPM']

      处置单位：司法拍卖（调整）
      ['FLSS-SFPM']

      限制出境和询价评估无查询条件 -->
      <el-form :model="searchPar" :inline="true" class="demo-form-inline">
        <el-form-item v-if="CASECODE.includes(searchPar.itemCode)" label="案号" >
          <el-input v-model="searchPar.caseNo" placeholder="请输入案号" clearable/>
        </el-form-item>
        <el-form-item v-if="COURTNAME.includes(searchPar.itemCode)" label="执行法院">
          <el-input v-model="searchPar.enforcementCourt" placeholder="请输入执行法院" clearable/>
        </el-form-item>
        <el-form-item v-if="LITIGANT.includes(searchPar.itemCode)" label="当事人">
          <el-input v-model="searchPar.parties" placeholder="请输入当事人" clearable/>
        </el-form-item>
        <el-form-item v-if="CASEREASON.includes(searchPar.itemCode)" label="案由">
          <el-input v-model="searchPar.caseReason" placeholder="请输入案由" clearable/>
        </el-form-item>
        <el-form-item v-if="TITLE.includes(searchPar.itemCode)" label="标题">
          <el-input v-model="searchPar.title" placeholder="请输入标题" clearable/>
        </el-form-item>
        <el-form-item v-if="COURT.includes(searchPar.itemCode)" label="处置单位">
          <el-input v-model="searchPar.dispositionUnit" placeholder="请输入处置单位" clearable/>
        </el-form-item>
        <el-form-item v-if="searchPar.itemCode && (SEARCHCODEALL.includes(searchPar.itemCode))">
          <w-button type="primary" class="mr-8px" @click="search">搜索</w-button>
          <w-button @click="reset">重置</w-button>
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
import { companyItemSetting, companyItemData } from '@/api/archives'
import TabCom from '../TabCom.vue'
import { formateWord } from '@/utils/common'

const userStore = useUserStoreHook();
const dataPermissionCode = userStore.user.dataPermissionCode || []

const CASECODE = ['FLSS-SDGG', 'FLSS-LAXX', 'FLSS-CPWS', 'FLSS-ZBAJ', 'FLSS-XZGXF', 'FLSS-BZXR'] // 案号
const COURTNAME = ['FLSS-ZBAJ', 'FLSS-BZXR', 'FLSS-SXBZXR'] // 执行法院
const LITIGANT = ['FLSS-SDGG', 'FLSS-FYGG', 'FLSS-KTGG', 'FLSS-LAXX', 'FLSS-CPWS'] // 当事人
const CASEREASON =  ['FLSS-SDGG', 'FLSS-FYGG', 'FLSS-KTGG', 'FLSS-LAXX'] // 案由
const TITLE = ['FLSS-SFPM'] // 标题
const COURT = ['FLSS-SFPM'] // 处置单位
const SEARCHCODEALL = ['FLSS-SXBZXR', 'FLSS-SDGG', 'FLSS-LAXX', 'FLSS-CPWS', 'FLSS-ZBAJ', 'FLSS-XZGXF', 'FLSS-BZXR', 'FLSS-SFPM', 'FLSS-FYGG', 'FLSS-KTGG']

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

// 搜索
function search() {
  searchPar.value.page = 1;
  pagination.value.current = 1;
  getcompanyItemData()
}

// 重置
function reset() {
  searchPar.value = {
    page: 1,
    itemCode: curTab.value,
    companyId: props.companyId
  }
  pagination.value.current = 1;
  getcompanyItemData()
}

// 切换tab标签，加载数据，重置分页
function updateTable(item ,i) {
  pagination.value.current = 1
  searchPar.value = {
    page: 1,
    itemCode: item.itemCode,
    companyId: props.companyId
  }
  const mapping = item.fieldMappingTwo || item.fieldMappingOne
  columns.value = formateWord(JSON.parse(mapping))
  
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
  pagination.value.current = v;
  getcompanyItemData()
};


// 获取tab标签和列表columns
function getcompanyItemSetting() {
  companyItemSetting({
    company_id: props.companyId
  }).then(res => {
    TabData.value = res.data[2]?.itemDetailList || []
    res.data[2].itemDetailList.forEach((item, i) => {
      if(item.hasValue && curTab.value == -1) {
        curTab.value = item.itemCode
        let mapping = item.fieldMappingTwo || item.fieldMappingOne
        columns.value = formateWord(JSON.parse(mapping))
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
.search_box {
  margin: 16px 0;
}
</style>

