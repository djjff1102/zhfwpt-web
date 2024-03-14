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
        <w-button type="primary" class="mr-8px" @click="search">搜索</w-button>
        <w-button @click="reset">重置</w-button>
      </w-form>
    </div>
    <div class="oper">
      <w-button type="primary" class="mr-8px" @click="operate('add')">新增</w-button>
      <w-button type="primary" class="mr-8px" @click="handleExport">导出</w-button>
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
        <template v-slot:approvalstatus="{rowIndex}">
            <div>{{ approveStatus[tableData[rowIndex].approveStatus] }}</div>
        </template>
        <template v-slot:operations="{rowIndex}">
          <el-button type="text" @click="operate('operate', tableData[rowIndex])" :disabled="tableData[rowIndex].approveStatus == 2">编辑</el-button>
          <el-button type="text" @click="operate('detail', tableData[rowIndex])">详情</el-button>
          <el-button type="text" @click="del(tableData[rowIndex])" :disabled="tableData[rowIndex].approveStatus == 2">删除</el-button>
        </template>
      </m-table>
    </div>
  </div>
</template>

<script lang="ts" setup>
import {  ref, reactive } from "vue";
import { debounce } from "lodash-es";
import { useRouter } from 'vue-router';
import { fpspReport, approvalExport } from '@/api/intellApproval'
import { approveStatus, statusList } from './type.ts'
import dayjs from "dayjs";

const router = useRouter();

const curDate = ref([])
const loading = ref(false);
const tableData = ref();
const columns = reactive([
  {
    title: "申报编号",
    dataIndex: "reportCode",
    width: 180,
  },
  {
    title: '创建日期',
    dataIndex: 'createDate',
    width: 180,
    sortable: {
      sortDirections: ['ascend', 'descend']
    }
  },
  {
    title: "申报单位",
    dataIndex: "companyName",
    width: 180
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
    width: 180,
  },
  {
    title: "审批操作-指定操作的人才能看到",
    dataIndex: "status",
    slotName: 'approvalstatus',
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

// 导出
 function handleExport() {
  const data = {
    companyName: searchPar.value.companyName,
    approveStatus: searchPar.value.approveStatus,
    startTime: searchPar.value.startTime,
    endTime: searchPar.value.endTime
  }
  approvalExport(data).then(res => {
    exportBlob(res);
  }).catch(err => {})
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
</style>

