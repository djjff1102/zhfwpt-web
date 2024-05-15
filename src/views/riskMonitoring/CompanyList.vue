<template>
  <div class="attention">
    <div class="search_box">
      <el-form :model="searchPar" :inline="true" class="demo-form-inline">
        <el-form-item field="post" label="检测日期">
          <el-date-picker
              v-model="curDate"
              type="daterange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              format="YYYY-MM-DD"
              style="width: 300px"
              @change="onChange"
            >
            </el-date-picker>
        </el-form-item>
        <el-form-item field="companyName" label="企业名称">
          <el-input v-model="searchPar.companyName" placeholder="请输入企业名称" clearable/>
        </el-form-item>
        <el-form-item class="mr-16px" field="approveStatus" label="企业信用等级">
          <el-select v-model="searchPar.approveStatus" placeholder="全部" style="width: 160px" clearable>
            <el-option v-for="(item, i) in statusList" :key="i" :value="item.value" :label="item.label"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <w-button type="primary" class="mr-8px" @click="search">搜索</w-button>
          <w-button @click="reset">重置</w-button>
         </el-form-item>
      </el-form>
    </div>
    <div class="oper">
      <w-button :loading="loadingExport" type="primary" class="mr-8px" @click="handleExport">导出</w-button>
      <!-- <w-button v-hasPerm="btnApprovalCode.export" :loading="loadingExport" type="primary" class="mr-8px" @click="handleExport">导出</w-button> -->
    </div>
      <div class="table-warp">
      <m-table
        style="height: 100%"
        :data="tableData"
        :columns="columns"
        :scroll="scroll"
        :pagination="pagination"
        @page-change="changepage"
        @page-size-change="changePagesize"
        :bordered="false"
      >
        <template v-slot:index="{rowIndex}">
          {{ rowIndex + 1 }}
        </template>
        <template v-slot:creditLevel="{rowIndex}">
          {{ riskLeval[tableData[rowIndex].creditLevel] }}
        </template>
        <template v-slot:secordCategoryNum="{rowIndex}">
          {{ tableData[rowIndex].secordCategoryNum }}个
        </template>
        <template v-slot:operations="{rowIndex}">
          <el-button
            type="text" @click="operate('detail', tableData[rowIndex])">详情</el-button>
        </template>
      </m-table>
    </div>
  </div>
</template>

<script lang="ts" setup>
import {  ref, reactive } from "vue";
import { useRouter } from 'vue-router';
import { fxjkIndexFxzph, riskExport } from '@/api/riskmonitor'
import dayjs from "dayjs";
import { btnApprovalCode, approvalMapping } from '@/router/permissionCode'
import { useUserStoreHook } from "@/store/modules/user";
import { formatNumber, formateDate } from '@/utils/common'
import { riskLeval } from '@/utils/baseType'

const userStore = useUserStoreHook();
const router = useRouter();  

const curDate = ref('')
const loading = ref(false);
const tableData = ref();
const columns = ref([
  {
    title: "序号",
    dataIndex: "index",
    slotName: 'index',
    width: 80,
  },
  {
    title: "检测日期",
    dataIndex: "modifyDate",
    width: 180,
    ellipsis: true,
    tooltip: {position: 'left'},
  },
  {
    title: '企业名称',
    dataIndex: 'companyName',
    width: 220,
    ellipsis: true,
    tooltip: {position: 'left'},
  },
  {
    title: "企业信用等级",
    dataIndex: "creditLevel",
    width: 220,
    slotName: 'creditLevel',
    ellipsis: true,
    tooltip: {position: 'left'},
  },
  {
    title: '信用值分数',
    dataIndex: 'creditScore',
    width: 200,
    ellipsis: true,
    tooltip: {position: 'left'},
  },
  {
    title: "企业统一社会信息代码",
    dataIndex: "companyCreditNo",
    width: 200,
    ellipsis: true,
    tooltip: {position: 'left'},
  },
  {
    title: '涉风险项',
    dataIndex: 'firstCategories',
    width: 180,
    ellipsis: true,
    tooltip: {position: 'left'},
  },
  {
    title: "涉风险细则",
    dataIndex: "secordCategoryNum",
    slotName: 'secordCategoryNum',
    width: 180,
    ellipsis: true,
    tooltip: {position: 'left'},
  },
  {
    title: "操作",
    dataIndex: "operations",
    slotName: "operations",
    fixed: "right",
    width: 80,
  }
]);
const pagination = ref({
  total: 0,
  pageSize: 10,
  "show-total": true,
  "show-page-size": true,
  "show-jumper": true,
});
const searchPar = ref({
  page_size: 10,
  page: 1,
  companyName: '', // 申报单位
  approveStatus: '', // 审批状态
  startTime: '',
  endTime: ''
})
const scroll = ref({
  y: 800,
  x: 1080,
});

const loadingExport = ref(false)

function operate(item) {

}

// 导出
 function handleExport() {
  if(loadingExport.value) return
  loadingExport.value = true
  const data = {
    companyName: searchPar.value.companyName,
    approveStatus: searchPar.value.approveStatus,
    startTime: searchPar.value.startTime,
    endTime: searchPar.value.endTime
  }
  riskExport(data).then(res => {
    exportBlob(res);
    loadingExport.value = false
  }).catch(err => {
    loadingExport.value = false
  })
}

// 导出
function exportBlob(b: any) {
  const now = dayjs().format('YYYY-MM-DD');
  const fileName = `风险-${now}`
  const typeValue = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';
  const blob = new Blob([b.data], { type: typeValue});
  const a = document.createElement('a');
  a.download = fileName;
  a.href = URL.createObjectURL(blob);
  a.style.display = 'none';
  document.body.appendChild(a);
  a.click();
  URL.revokeObjectURL(a.href);
  document.body.removeChild(a);
}

// 从发票智能审批-跳转公司详情
function toCompanyDetail(d: any) {
  // 跳转企业详情
  router.push({ 
    path: '/archives/companyDetail', 
    query: {
      companyId: d.companyId,
      companyName: d.companyName
    }
  });
}

const changePagesize = (v) => {
  pagination.value.pageSize = v;
  searchPar.value.page = 1;
  searchPar.value.page_size = v;
  getRiskiList();
};

const changepage = (v) => {
  searchPar.value.page = v;
  getRiskiList();
};

function search() {
  searchPar.value.page = 1;
  getRiskiList();
}

function reset() {
  curDate.value = '';
  searchPar.value = {
    page_size: 10,
    page: 1,
    companyName: '', // 申报单位
    approveStatus: '', // 审批状态
    startTime: '',
    endTime: ''
  }
  getRiskiList();
}

// 选择时间
function onChange(dateString: any, date: any) {
  if(dateString && dateString.length > 0) {
    searchPar.value.startTime = formateDate(curDate.value[0])
    searchPar.value.endTime = formateDate(curDate.value[1])
  } else {
    searchPar.value.startTime = '';
    searchPar.value.endTime = '';
  }
}

// 申报列表
function getRiskiList() {
  if(loading.value) return
  loading.value = true
  fxjkIndexFxzph(searchPar.value).then(res => {
    tableData.value = res.data as any;
    pagination.value.total = res.total as any;
    loading.value = false
  }).catch(err => {
    loading.value = false
  })
}

const init = async () => {
  getRiskiList();
};

init()
</script>

<style lang="scss" scoped>
.attention {
  padding: 24px;
  padding-bottom: 16px;
  height: 100%;
  background: #fff;
  .oper {
    display: flex;
    justify-content: flex-end;
    margin-bottom: 16px;
  }
  .table-warp {
    height: calc(100% - 100px);
  }

  ::v-deep .m-table-container {
    height: 100%;
  }
}
:deep(.el-input-wrapper) {
  width: 188px;
  height: 32px;
}
:deep(.w-picker) {
  width: 240px;
  height: 32px;
}
:deep(.el-select-view) {
  width: 132px;
  height: 32px;
}
:deep(.el-form-item-label) {
  height: 32px;
  color: #000;
  font-weight: 500;
}
</style>

