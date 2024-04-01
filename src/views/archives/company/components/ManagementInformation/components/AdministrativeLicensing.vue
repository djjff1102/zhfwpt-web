<template>
  <!-- <w-spin :loading="loading"> -->
    <!-- <el-tabs type="card" v-modl="activeTab"  @tab-click="handleChange">
      <el-tab-pane label="行政许可" name="0"> </el-tab-pane>
      <el-tab-pane label="历史行政许可" name="1"> </el-tab-pane>
    </el-tabs> -->
    <div class="tab-wrap" style="margin-bottom: 8px;">
      <div class="tab-item" :class="{'tab-item-active': activeTab == '0'}" @click="handleChange('0')">行政许可</div>
      <div class="tab-item" :class="{'tab-item-active': activeTab == '1'}" @click="handleChange('1')">历史行政许可</div>
    </div>
    <div class="search_box">
      <el-form :model="searchPar" :inline="true">
        <el-form-item class="mr-16px" field="departmentNo" label="许可机关" style="margin-top: 8px;">
          <el-select v-model="searchPar.departmentNo" placeholder="不限" style="width: 400px" clearable>
            <el-option v-for="(item, i) in listdata" :key="i" :value="item.department_no" :label="item.department"></el-option>
          </el-select>
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
        <!-- <template v-slot:operations>
          <w-button type="text" disabled>详情</w-button>
        </template> -->
      </m-table>
    </div>
  <!-- </w-spin> -->
  <!-- 行政许可 -->

</template>
<script setup>
import { ref, reactive } from "vue";
import { companyLicenseInfoCreditchinaNew, BDaeegmnopprrttuy } from '@/api/archives'

const props = defineProps({
  companyName: {
    default: ''
  }
})

const activeTab = ref(0)
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
    title: "决定文书/许可证名称",
    dataIndex: "licenceFliename",
    width: 240,
    ellipsis: true,
    tooltip: {position: 'left'},
  },
  {
    title: "决定文书/许可编号",
    dataIndex: "licenceNumber",
    width: 300,
    ellipsis: true,
    tooltip: {position: 'left'},
  },
  {
    title: "有效期自",
    dataIndex: "allowStartdate",
    width: 180,
  },
  {
    title: "有效期至",
    dataIndex: "endDate",
    width: 180,
  },
  {
    title: "许可机关",
    dataIndex: "department",
    ellipsis: true,
    slotName: "recommendSlot",
    tooltip: {position: 'left'},
  },
  {
    title: "内容",
    dataIndex: "licenceContent",
    ellipsis: true,
    slotName: "recommendSlot",
    tooltip: {position: 'left'},
  },
  // {
  //   title: "操作",
  //   width: 100,
  //   dataIndex: "operations",
  //   slotName: "operations",
  //   fixed: "right",
  // },
]);
const pagination = ref({
  total: 0,
  pageSize: 10,
  current: 1,
  "show-total": true,
  "show-page-size": true,
  "show-jumper": true,
});
const searchPar = ref({
  page_size: 10,
  page: 1,
  companyName: props.companyName,
  departmentNo: '', // 许可单位
  isHistory: 0 // 0官网还存在 1官网不存在
})
const scroll = ref({
  y: 800,
  x: 1080,
});
const form = ref({
  name: "",
  post: "",
});

function search() {
  searchPar.value.page = 1;
  pagination.value.current = 1
  init();
}

function reset() {
  searchPar.value.departmentNo = ''
  searchPar.value.page = 1;
  pagination.value.current = 1
  init();
}

function handleChange(tab) {
  activeTab.value = tab
  searchPar.value.page = 1;
  pagination.value.current = 1
  searchPar.value.isHistory = Number(activeTab.value);
  searchPar.value.departmentNo = ''
  init();
}

const changePagesize = (v) => {
  searchPar.value.page_size = v
  searchPar.value.page = 1
  pagination.value.current = 1
  pagination.value.pageSize = v;
  init();
};

const changepage = (v) => {
  searchPar.value.page = v
  pagination.value.current = v
  init();
};

const listdata = ref([])
function init () {
  if(loading.value) return
  loading.value = true
  companyLicenseInfoCreditchinaNew(searchPar.value).then(res => {
    tableData.value = res.data
    pagination.value.total = res.total
     loading.value = false
  }).catch(err => {
     loading.value = false
  })

  BDaeegmnopprrttuy(searchPar.value).then(res => {
    listdata.value = res.data.records;
  }).catch(err => {})
}


init();
</script>

<style lang="scss" scoped>
.table-warp {
  height: calc(100% - 100px);
}
.tab-wrap {
  display: flex;
  justify-content: flex-start;
  margin-bottom: 12px;
  .tab-item {
    width: 176px;
    height: 48px;
    line-height: 48px;
    background: #F8F8F8;
    border-radius: 4px;
    margin-right: 4px;
    font-weight: 400;
    font-size: 14px;
    color: #6A6A6A;
    text-align: center;
    font-style: normal;
    cursor: pointer;
  }

  .tab-item-active {
    font-weight: 500;
    background: #F7FAFF;
    color: rgba(52, 112, 255, 1);
  }
}
// :deep(.w-select) {
//   width: 400px!important;
// }
:deep(.tab-wrap) {
  margin-bottom: 8px!important;
}
</style>
