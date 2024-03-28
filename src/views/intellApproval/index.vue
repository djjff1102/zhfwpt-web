<template>
  <div class="attention">
    <div class="search_box">
      <w-form :model="searchPar" layout="inline">
        <w-form-item field="post" label="创建日期">
         <w-range-picker
            v-model="curDate"
            class="w-250px"
            :time-picker-props="{
              defaultValue: [
                dayjs('00:00:00', 'HH:mm:ss'),
                dayjs('09:09:06', 'HH:mm:ss'),
              ],
            }"
            format="YYYY-MM-DD"
            @change="onChange"
          />
        </w-form-item>
        <w-form-item field="companyName" label="申报单位">
          <w-input v-model="searchPar.companyName" placeholder="请输入申报单位" />
        </w-form-item>
        <w-form-item class="mr-16px" field="approveStatus" label="审批状态">
          <w-select v-model="searchPar.approveStatus" placeholder="请选择审批状态" style="width: 160px">
            <w-option v-for="(item, i) in statusList" :key="i" :value="item.value">{{ item.label }}</w-option>
          </w-select>
        </w-form-item>
        <el-button type="primary" class="mr-8px" @click="search">搜索</el-button>
        <el-button @click="reset">重置</el-button>
      </w-form>
    </div>
    <div class="oper">
      <el-button v-hasPerm="btnApprovalCode.add" type="primary" class="mr-8px" @click="operate('add')">新增</el-button>
      <el-button v-hasPerm="btnApprovalCode.export" :loading="loadingExport" type="primary" class="mr-8px" @click="handleExport">导出</el-button>
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
        <template v-slot:approvalstatus="{rowIndex}">
            <div :style="{color: approveStatusColor[tableData[rowIndex].approveStatus]}">{{ approveStatus[tableData[rowIndex].approveStatus] }}</div>
        </template>
        <template v-slot:taskStatus="{rowIndex}">
            <div :style="{color: taskStatusColor[tableData[rowIndex].taskStatus]}">{{ taskStatus[tableData[rowIndex].taskStatus] }}</div>
        </template>
        <template v-slot:operations="{rowIndex}">
          <el-button v-hasPerm="btnApprovalCode.approval" type="text" @click="approval(tableData[rowIndex])">审批</el-button>
          <el-button v-hasPerm="btnApprovalCode.edit" type="text" @click="operate('operate', tableData[rowIndex])" :disabled="tableData[rowIndex].approveStatus == 2">编辑</el-button>
          <el-button v-hasPerm="btnApprovalCode.detail" type="text" @click="operate('detail', tableData[rowIndex])">详情</el-button>
          <el-button v-hasPerm="btnApprovalCode.del" type="danger" link @click="del(tableData[rowIndex])" :disabled="tableData[rowIndex].approveStatus == 2">删除</el-button>
        </template>
      </m-table>
    </div>
    <ApprovalDo :showAdd="showApproval" @updateAdd="updateApprval" :reportId="reportId" @updateData="getfpspReport"></ApprovalDo>
  </div>
</template>

<script lang="ts" setup>
import {  ref, reactive } from "vue";
import ApprovalDo from './add/ApprovalDo.vue';
import { useRouter } from 'vue-router';
import { fpspReport, approvalExport, delReport } from '@/api/intellApproval'
import { approveStatus,approveStatusColor, statusList, taskStatus, taskStatusColor } from './type.ts'
import dayjs from "dayjs";
import { btnApprovalCode } from '@/router/permissionCode'

const router = useRouter();

const showApproval = ref(false)
const curDate = ref([])
const loading = ref(false);
const tableData = ref();
const columns = reactive([
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
  },
  {
    title: '创建日期',
    dataIndex: 'createDate',
    width: 180,
    // sortable: {
    //   sortDirections: ['ascend', 'descend']
    // }
  },
  {
    title: "申报单位",
    dataIndex: "companyName",
    width: 220
  },
  {
    title: '申报额度',
    dataIndex: 'money',
    width: 100,
  },
  {
    title: "申报人",
    dataIndex: "applyUserName",
    width: 200,
  },
  {
    title: '联系方式',
    dataIndex: 'applyContactPhone',
    width: 180,
  },
  {
    title: "审批人",
    dataIndex: "approveUserName",
    width: 180,
  },
  {
    title: '审批时间',
    dataIndex: 'approveDate',
    width: 180,
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
    width: 240,
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
  endTime: ''
})
const scroll = ref({
  y: 800,
  x: 1080,
});

const reportId = ref('') // 报告id

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
  loadingExport.value = true
  const data = {
    companyName: searchPar.value.companyName,
    approveStatus: searchPar.value.approveStatus,
    startTime: searchPar.value.startTime,
    endTime: searchPar.value.endTime
  }
  approvalExport(data).then(res => {
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
  curDate.value = [];
  searchPar.value = {
    page_size: 10,
    page: 1,
    companyName: '', // 申报单位
    approveStatus: '', // 审批状态
    startTime: '',
    endTime: ''
  }
  getfpspReport();
}

// 选择时间
function onChange(dateString: any, date: any) {
  if(dateString && dateString.length > 0) {
    searchPar.value.startTime = dateString[0];
    searchPar.value.endTime = dateString[1];
  } else {
    searchPar.value.startTime = '';
    searchPar.value.endTime = '';
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
:deep(.w-input-wrapper) {
  width: 188px;
  height: 32px;
}
:deep(.w-picker) {
  width: 240px;
  height: 32px;
}
:deep(.w-select-view) {
  width: 132px;
  height: 32px;
}
:deep(.w-form-item-label) {
  height: 32px;
  color: #000;
  font-weight: 500;
}
</style>

