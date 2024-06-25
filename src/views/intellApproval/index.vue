<template>
  <div class="attention">
    <div class="search_box">
      <el-form :model="searchPar" :inline="true" class="demo-form-inline">
        <el-form-item field="post" label="创建日期">
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
        <el-form-item field="post" label="申报日期">
          <el-date-picker
              v-model="curDateApplication"
              type="daterange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              format="YYYY-MM-DD"
              style="width: 300px"
              @change="onChangeApplication"
            >
            </el-date-picker>
        </el-form-item>
        <el-form-item field="companyName" label="申报单位">
          <el-input v-model="searchPar.companyName" placeholder="请输入申报单位" clearable/>
        </el-form-item>
        <el-form-item class="mr-16px" field="approveStatus" label="审批状态">
          <el-select v-model="searchPar.approveStatus" placeholder="请选择审批状态" style="width: 160px" clearable>
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
      <w-button v-hasPerm="btnApprovalCode.add" type="primary" class="mr-8px" @click="operate('add')">新增</w-button>
      <w-button v-hasPerm="btnApprovalCode.loadfile" :loading="loadZip" type="primary" class="mr-8px" @click="handleLoadZip">下载资料</w-button>
      <w-button v-hasPerm="btnApprovalCode.export" :loading="loadingExport" type="primary" class="mr-8px" @click="handleExport">导出</w-button>
    </div>
      <div class="table-warp">
      <m-table
        style="height: 100%"
        :data="tableData"
        :columns="columns"
        :scroll="scroll"
        :pagination="pagination"
        :row-selection="rowSelection"
        row-key="id"
        @page-change="changepage"
        @page-size-change="changePagesize"
        @select="handlSelectRow"
        :bordered="false"
      >
        <template v-slot:index="{rowIndex}">
          {{ rowIndex + 1 }}
        </template>
        <template v-slot:companyNameSlot="{rowIndex}">
          <el-button
            v-if="userStore.user.authorityCode?.includes(btnApprovalCode.companyDetail)"
            type="text" 
            @click="toCompanyDetail(tableData[rowIndex])">
            {{ tableData[rowIndex].companyName }}
          </el-button>
          <span v-else>{{ tableData[rowIndex].companyName }}</span>
        </template>
        <template v-slot:moneySlot="{rowIndex}">
          {{ formatNumber(tableData[rowIndex].money) }}
        </template>
        <template v-slot:approvalstatus="{rowIndex}">
            <div :style="{color: approveStatusColor[tableData[rowIndex].approveStatus]}">{{ approveStatus[tableData[rowIndex].approveStatus] }}</div>
        </template>
        <template v-slot:taskStatus="{rowIndex}">
          <w-progress v-if="tableData[rowIndex].taskStatus == tasks.doing" status='success' :percent="tableData[rowIndex].finishNum / 100"/>
          <div
            v-else
            :style="{color: taskStatusColor[tableData[rowIndex].taskStatus]}">
            {{ taskStatus[tableData[rowIndex].taskStatus] }}
          </div>
        </template>
        <template v-slot:operations="{rowIndex}">
          <el-button
            v-hasPerm="btnApprovalCode.approval"
            type="text"
            :disabled="tableData[rowIndex].approveStatus != status.wait"
            @click="approval(tableData[rowIndex])">审批</el-button>
          <el-button
            v-hasPerm="btnApprovalCode.edit"
            type="text" @click="operate('operate', tableData[rowIndex])"
            :disabled="tableData[rowIndex].approveStatus == status.pass || tableData[rowIndex].editStatus == 1">编辑</el-button>
          <el-button
            v-hasPerm="btnApprovalCode.detail"
            type="text" @click="operate('detail', tableData[rowIndex])">详情</el-button>
          <el-button
            v-hasPerm="btnApprovalCode.del"
            type="danger" link @click="del(tableData[rowIndex])" :disabled="tableData[rowIndex].approveStatus == status.pass">删除</el-button>
        </template>
      </m-table>
    </div>
    <ApprovalDo :showAdd="showApproval" @updateAdd="updateApprval" :reportId="reportId" @updateData="getfpspReport"></ApprovalDo>
  </div>
</template>

<script lang="ts" setup>
import {  ref, watch } from "vue";
import ApprovalDo from './add/ApprovalDo.vue';
import { useRouter } from 'vue-router';
import { fpspReport, approvalExport, delReport, exportApproveMaterialsZipByReportId } from '@/api/intellApproval'
import { status, approveStatus,approveStatusColor, statusList, taskStatus, taskStatusColor, tasks } from './type.ts'
import dayjs from "dayjs";
import { btnApprovalCode, approvalMapping } from '@/router/permissionCode'
import { useUserStoreHook } from "@/store/modules/user";
import { formatNumber, formateDate } from '@/utils/common'

const userStore = useUserStoreHook();
const router = useRouter();  

// 监听权限吗
watch(() => userStore.user.dataPermissionCode,  (v) => {
  nextTick(() => {
    if( !v?.includes(approvalMapping.approvalTask)) {
      columns.value.splice(10, 1)
    }
  })
}, {
  deep: true,
  immediate: true
})

const curDateApplication = ref('') // 申报日期
const curDate = ref('') // 创建日期
const rowSelection = ref({
  type: 'checkbox',
  showCheckedAll: true
})
const showApproval = ref(false)
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
    title: "申报编号",
    dataIndex: "reportCode",
    width: 180,
    ellipsis: true,
    tooltip: {position: 'left'},
  },
  {
    title: '创建日期',
    dataIndex: 'createDate',
    width: 180,
    ellipsis: true,
    tooltip: {position: 'left'},
    // sortable: {
    //   sortDirections: ['ascend', 'descend']
    // }
  },
  {
    title: "申报单位",
    dataIndex: "companyName",
    width: 220,
    slotName: 'companyNameSlot',
    ellipsis: true,
    tooltip: {position: 'left'},
  },
  {
    title: '申报额度(万元)',
    dataIndex: 'money',
    slotName: 'moneySlot',
    width: 200,
    ellipsis: true,
    tooltip: {position: 'left'},
  },
  {
    title: "申报人",
    dataIndex: "applyUserName",
    width: 200,
    ellipsis: true,
    tooltip: {position: 'left'},
  },
  {
    title: '联系方式',
    dataIndex: 'applyContactPhone',
    width: 180,
    ellipsis: true,
    tooltip: {position: 'left'},
  },
  {
    title: "审批人",
    dataIndex: "approveUserName",
    width: 180,
    ellipsis: true,
    tooltip: {position: 'left'},
  },
  {
    title: '审批时间',
    dataIndex: 'approveDate',
    width: 180,
    ellipsis: true,
    tooltip: {position: 'left'},
  },
  {
    title: "审批状态",
    dataIndex: "approveStatus",
    slotName: 'approvalstatus',
    width: 100,
  },
  {
    title: "风险评估任务",
    dataIndex: "taskStatus",
    slotName: 'taskStatus',
    width: 180,
  },
  {
    title: "操作",
    dataIndex: "operations",
    slotName: "operations",
    fixed: "right",
    width: 200,
  },
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
  endTime: '',
  applyStartTime: '', // 申报开始时间
  applyEndTime: '' // 申报结束时间
})
const scroll = ref({
  y: 800,
  x: 1080,
});

const reportId = ref('') // 报告id
const rowId = ref([]);
const loadZip = ref(false)

function handlSelectRow(row: any) {
  rowId.value = row;
}

function handleLoadZip() {
  if(loadZip.value) return;
  if(rowId.value.length == 0){
    ElMessage.warning("请选择需要下载的材料");
    return;
  }
  loadZip.value = true;
  exportApproveMaterialsZipByReportId(rowId.value).then(res => {
     loadZip.value = false;
     fileHandleCompressed(res, '发票智能审批资料')
  }).catch(err => {
    loadZip.value = false;
    console.log('下载zip包失败：', err)
  })
}

function  fileHandleCompressed(data: any, fileName: any) {
  let blob = new Blob([data.data], { type: 'application/zip,charset=utf-8'})//此处必须添加
  let url = window.URL.createObjectURL(blob);
  const link = window.document.createElement('a'); // 创建a标签
  link.href = url;
  link.download = fileName; // 重命名文件
  link.click();
  URL.revokeObjectURL(url); // 释放内存
}

function updateApprval() {
  showApproval.value = false;
}

function approval(d) {
  reportId.value = d.id;
  showApproval.value = true;
}

function del(row: any) {
  if(loading.value) return;
    ElMessageBox.confirm("确认删除该申请吗?", "警告", {
      confirmButtonText: "确定",
      cancelButtonText: "取消",
      type: "warning",
    })
    .then(() => {
        loading.value = true;
        delReport({
          id: row.id
        }).then(res => {
          loading.value = false;
          ElMessage.success("删除成功！");
          getfpspReport();
        }).catch(err => {
          loading.value = false;
        })
    })
    .catch(() => ElMessage.info("已取消删除"));
}

const loadingExport = ref(false)
// 导出
 function handleExport() {
  if(loadingExport.value) return
  if(rowId.value.length == 0){
    ElMessage.warning("请选择需要导出的材料");
    return;
  }
  loadingExport.value = true
  // const data = {
  //   companyName: searchPar.value.companyName,
  //   approveStatus: searchPar.value.approveStatus,
  //   startTime: searchPar.value.startTime,
  //   endTime: searchPar.value.endTime
  // }
  approvalExport(rowId.value).then(res => {
    exportBlob(res);
    loadingExport.value = false
  }).catch(err => {
    loadingExport.value = false
  })
}

// 导出
function exportBlob(b: any) {
  const now = dayjs().format('YYYY-MM-DD');
  const fileName = `发票申报${now}`
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

function operate(type: string, data: any) {
  router.push({ 
    name: 'IntellApprovalOperate', 
    query: {
      id: data?.id || '-1',
      reportCode: data?.reportCode,
      approveStatus: approveStatus[data?.approveStatus],
      applyUserId: data?.applyUserId || '-1',
      type
    }
 });
}

const changePagesize = (v) => {
  pagination.value.pageSize = v;
  searchPar.value.page = 1;
  searchPar.value.page_size = v;
  getfpspReport();
};

const changepage = (v) => {
  searchPar.value.page = v;
  getfpspReport();
};

function search() {
  searchPar.value.page = 1;
  getfpspReport();
}

function reset() {
  curDate.value = '';
  curDateApplication.value = ''
  searchPar.value = {
    page_size: 10,
    page: 1,
    companyName: '', // 申报单位
    approveStatus: '', // 审批状态
    startTime: '', // 创建开始时间
    endTime: '', // 创建结束日期
    applyStartTime: '', // 申报开始时间
    applyEndTime: '' // 申报结束时间
  }
  getfpspReport();
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
function onChangeApplication(dateString: any, date: any) {
  if(dateString && dateString.length > 0) {
    searchPar.value.applyStartTime = formateDate(curDateApplication.value[0])
    searchPar.value.applyEndTime = formateDate(curDateApplication.value[1])
  } else {
    searchPar.value.applyStartTime = '';
    searchPar.value.applyEndTime = '';
  }
}

// 申报列表
function getfpspReport() {
  if(loading.value) return
  loading.value = true
  fpspReport(searchPar.value).then(res => {
    tableData.value = res.data as any;
    pagination.value.total = res.total as any;
    loading.value = false
  }).catch(err => {
    loading.value = false
  })
}

const init = async () => {
  getfpspReport();
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

