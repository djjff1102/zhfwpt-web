<template>
  <div >
    <div class="search_box">
      <w-form :model="searchPar" layout="inline">
        <w-form-item field="name" label="申报日期">
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
        <w-form-item class="mr-16px" field="post" label="审批状态">
          <w-select v-model="searchPar.approveStatus" placeholder="请选择审批状态" style="width: 160px">
            <w-option v-for="(item, i) in statusListHis" :key="i" :value="item.value">{{ item.label }}</w-option>
          </w-select>
        </w-form-item>
        <el-button type="primary" class="mr-8px" @click="search">搜索</el-button>
        <el-button @click="reset">重置</el-button>
      </w-form>
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
        <template v-slot:index="{ rowIndex }">
          {{ rowIndex + 1 }}
        </template>
        <template v-slot:approvalstatus="{rowIndex}">
            <div>{{ approveStatus[tableData[rowIndex].approveStatus] }}</div>
        </template>
      </m-table>
    </div>
  </div>
</template>
<script setup>
import dayjs from "dayjs";
import { ref, reactive} from "vue";
import { reporthistroy } from '@/api/intellApproval'
import { approveStatus, statusListHis } from '../type'

const props = defineProps({
  companyId: {
    default: ''
  }
})

watch(
  () => props.companyId,
  (v) => {
    if(v) {
      init();
    }
  }
);

const curDate = ref([])
const loading = ref(false);
const tableData = ref([]);
const columns = reactive([
  {
    title: "申报编号",
    dataIndex: "reportCode",
    width: 180,
  },
  {
    title: '申报日期',
    dataIndex: 'applyTime',
    width: 180,
  },
  // {
  //   title: "申报单位",
  //   dataIndex: "companyName",
  //   width: 180
  // },
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
    title: "备注",
    dataIndex: "approveRemark",
    width: 100,
  },
  // {
  //   title: "风险评估任务",
  //   dataIndex: "taskStatus",
  //   width: 180,
  // },
  // {
  //   title: "审批操作-指定操作的人才能看到",
  //   dataIndex: "status",
  //   slotName: 'approvalstatus',
  //   width: 180,
  // },
  // {
  //   title: "操作",
  //   dataIndex: "operations",
  //   slotName: "operations",
  //   fixed: "right",
  //   width: 240,
  // }
])

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
  approveStatus: '', // 审批状态
  startTime: '',
  endTime: '',
  companyId: ''
})
const scroll = ref({
  y: 800,
  x: 1080,
});
const form = ref({
  name: "",
  post: "",
});
const changePagesize = (v) => {
  searchPar.value.page_size = v;
  pagination.value.pageSize = v;
  getreporthistroy();
};

const changepage = (v) => {
  pagination.value.current = v
  searchPar.value.page = v
  getreporthistroy();
};

// 选择时间
function onChange(dateString, date) {
  if(dateString && dateString.length > 0) {
    searchPar.value.startTime = dateString[0];
    searchPar.value.endTime = dateString[1];
  } else {
    searchPar.value.startTime = '';
    searchPar.value.endTime = '';
  }
}

function reset() {
  pagination.value.current = 1;
  searchPar.value.page = 1;
  searchPar.value.approveStatus = ''
  searchPar.value.startTime = ''
  searchPar.value.endTime = ''
  curDate.value = []
  getreporthistroy();
}

function search() {
  pagination.value.current = 1;
  searchPar.value.page = 1;
  getreporthistroy()
}

// 申报历史
function getreporthistroy() {
  if(loading.value) return
  loading.value = true
  searchPar.value.companyId = props.companyId
  reporthistroy(searchPar.value).then(res => {
    tableData.value = res.data
    pagination.value.total = res.total
    loading.value = false
  }).catch(err => {
    loading.value = false
  })
}

const init = async () => {
  getreporthistroy()
};
</script>

<style lang="scss" scoped>
.container {
}
.table-warp {
  height: calc(100% - 100px);
}
</style>
