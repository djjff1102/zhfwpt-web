<template>
  <w-spin :loading="loading">
    <el-tabs type="card" v-modl="activeTab"  @tab-click="handleChange">
      <el-tab-pane label="行政许可" name="0"> </el-tab-pane>
      <el-tab-pane label="历史行政许可" name="1"> </el-tab-pane>
    </el-tabs>
    <div class="search_box">
      <w-form :model="form" layout="inline">
        <w-form-item class="mr-16px" field="post" label="许可机关">
          <w-select v-model="form.post" placeholder="不限" />
        </w-form-item>
        <w-button type="primary" class="mr-8px">搜索</w-button>
        <w-button>重置</w-button>
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
        <template v-slot:index="{ $index }">
          {{ $index + 1 }}
        </template>
        <template v-slot:operations>
          <w-button type="text" disabled>详情</w-button>
        </template>
      </m-table>
    </div>
  </w-spin>
  <!-- 行政许可 -->

</template>
<script setup>
import { ref, reactive } from "vue";
import { companyLicenseInfoCreditchinaNew } from '@/api/archives'

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
    title: "决定文书/许可编号",
    dataIndex: "licenceNo",
    width: 180,
    fixed: "left",
  },
  {
    title: "决定文书/许可证名称",
    dataIndex: "licenceName",
    fixed: "left",
  },
  {
    title: "有效期自",
    dataIndex: "allowStartdate",
    fixed: "left",
  },
  {
    title: "有效期至",
    dataIndex: "endDate",
  },
  {
    title: "许可机关",
    dataIndex: "department",
  },
  {
    title: "内容",
    dataIndex: "licenceContent",
  },
  {
    title: "操作",
    dataIndex: "operations",
    slotName: "operations",
    fixed: "right",
  },
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
  department: '', // 许可单位
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

function handleChange(tab, event) {
  activeTab.value = tab.index
  searchPar.page = 1;
  pagination.value.current = 1
  searchPar.value.isHistory = Number(activeTab.value);
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
function onSelect(dateString, date) {
  console.log("onSelect", dateString, date);
}

function onChange(dateString, date) {
  console.log("onChange: ", dateString, date);
}

function onOk(dateString, date) {
  console.log("onOk: ", dateString, date);
}

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
}


init();
</script>

<style lang="scss" scoped>
.container {
}
.table-warp {
  height: calc(100% - 100px);
}
</style>
