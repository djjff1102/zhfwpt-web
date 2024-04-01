<template>
  <!-- 审批信息 -->
  <div>
    <div class="search_box">
      <el-form :model="searchPar" :inline="true">
        <el-form-item class="mr-16px" field="post" label="申报日期">
          <el-date-picker
              v-model="curDate"
              type="daterange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              format="YYYY-MM-DD"
              @change="onChange"
            >
          </el-date-picker>
        </el-form-item>
        <el-form-item class="mr-16px" field="post" label="审批状态">
          <el-select v-model="searchPar.approveStatus" placeholder="请选择审批状态" style="width: 160px" clearable>
            <el-option v-for="(item, i) in statusList" :key="i" :value="item.value" :label="item.label"></el-option>
          </el-select>
          <!-- <el-select v-model="form.post" placeholder="请输入审批状态" /> -->
        </el-form-item>
        <el-form-item>
          <w-button type="primary" class="mr-8px" @click="search">搜索</w-button>
          <w-button @click="reset">重置</w-button>
        </el-form-item>
      </el-form>
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
        <template v-slot:moneySlot="{ rowIndex }">
          {{ tableData[rowIndex].money && formatNumber(tableData[rowIndex].money) }}
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
import { onMounted, ref, reactive, unref, computed, watch } from "vue";
import { reporthistroy } from '@/api/intellApproval'
import { approveStatus, statusList } from './type'
import { formatNumber, formateDate } from '@/utils/common'

const props = defineProps({
  companyId: {
    default: ''
  }
})

const curDate = ref('')
const current = ref(1);
const size = ref(10);
const loading = ref(false);
const tableData = ref([]);
const columns = reactive([
    {
    title: "序号",
    width: 80,
    slotName: "index",
    fixed: "left",
  },
  {
    title: "申报编号",
    dataIndex: "reportCode",
    width: 180,
  },
  {
    title: '申报日期',
    dataIndex: 'createDate',
    width: 180,
    // sortable: {
    //   sortDirections: ['ascend', 'descend']
    // }
  },
  // {
  //   title: "申报单位",
  //   dataIndex: "companyName",
  //   width: 180
  // },
  {
    title: '申报额度',
    dataIndex: 'money',
    slotName: 'moneySlot',
    width: 180,
  },
  {
    title: "申报人",
    dataIndex: "applyUserName",
    width: 180,
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
    width: 200,
    ellipsis: true,
    slotName: "descriptionSlot",
    tooltip: {position: 'left'},
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
const scroll = ref({
  y: 800,
  x: 1080,
});
const form = ref({
  name: "",
  post: "",
});

const searchPar = ref({
  page_size: 10,
  page: 1,
  approveStatus: '', // 审批状态
  startTime: '',
  endTime: '',
  companyId: '',
  approveResultList: [1, 2, 3]
})

const changePagesize = (v) => {
  searchPar.value.page_size = v;
  pagination.value.pageSize = v;
  init();
};

const changepage = (v) => {
  pagination.value.current = v
  searchPar.value.page = v
  init();
};

function reset() {
  pagination.value.current = 1;
  searchPar.value.page = 1;
  searchPar.value.approveStatus = ''
  searchPar.value.startTime = ''
  searchPar.value.endTime = ''
  curDate.value = ''
  init();
}

function search() {
  pagination.value.current = 1;
  searchPar.value.page = 1;
  init()
}

// 选择时间
function onChange(dateString, date) {
  if(dateString && dateString.length > 0) {
    searchPar.value.startTime = formateDate(curDate.value[0])
    searchPar.value.endTime = formateDate(curDate.value[1])
  } else {
    searchPar.value.startTime = '';
    searchPar.value.endTime = '';
  }
}

const init = async () => {
  searchPar.value.companyId = props.companyId
  reporthistroy(searchPar.value).then(res => {
    tableData.value = res.data;
    pagination.value.total = res.total;
  })
};

init()
</script>

<style lang="scss" scoped>
.container {
}
.table-warp {
  height: calc(100% - 100px);
}
</style>
