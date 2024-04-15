<template>
  <div class="danger-point-container">
    <div class="title">风险点</div>
    <div class="search_box">
      <w-form :model="form" layout="inline">
        <w-form-item field="name" label="风险名称">
          <w-input v-model="form.name" placeholder="请输入风险名称" />
        </w-form-item>
        <w-form-item class="mr-16px" field="post" label="风险程度">
          <w-select v-model="form.post" placeholder="全部" />
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
        <template v-slot:index="{ rowIndex }">
          {{ rowIndex + 1 }}
        </template>
        <template v-slot:operations>
          <w-button type="text">详情</w-button>
        </template>
      </m-table>
    </div>
  </div>
</template>
<script setup>
import dayjs from "dayjs";
import { onMounted, ref, reactive, unref, computed, watch } from "vue";
import { queryRiskInfoByCompanyInfo } from '@/api/archives'

const props = defineProps({
  data: {
    default: []
  },
  companyId: {},
  companyName: {}
})

watch(
  () => props.companyId,
  (v) => {
    // if(v && v.length > 0) {
    //   tableData.value = v
    // }
  }
);

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
    title: "风险名称",
    dataIndex: "name",
    width: 180,
  },
  {
    title: "风险描述",
    dataIndex: "description",
  },
  {
    title: "扫描结果",
    dataIndex: "result",
    width: 180,
  },
  {
    title: "风险建议",
    dataIndex: "recommend",
  },
]);
const pagination = ref({
  total: 0,
  pageSize: 10,
  "show-total": true,
  "show-page-size": true,
  "show-jumper": true,
});

const searchPar = ref({ // 查询参数-以公司维度查询风险信息
  companyName: '',
  companyId: '',
  riskType: 0
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
  size.value = v;
  pagination.value.pageSize = v;
  init();
};
const changepage = (v) => {
  current.value = v;
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

// 公司维度查询风险信息
function getqueryRiskInfoByCompanyInfo() {
  queryRiskInfoByCompanyInfo(searchPar.value).then(res => {
    tableData.value = res.data;
  }).catch(err => {})
}


const init = async () => {};
</script>

<style lang="scss" scoped>
.table-warp {
  height: calc(100% - 100px);
}
.search_box {
  display: flex;
  justify-content: flex-start;
}
.title {
  position: relative;
  margin: 16px 0;
  padding-left: 11px;
  font-family: PingFangSC, PingFang SC;
  font-weight: 500;
  font-size: 18px;
  color: #333333;
  line-height: 22px;
  margin-top: -20px;
  &::before {
    content: "";
    position: absolute;
    left: 0px;
    top: 50%;
    transform: translateY(-50%);
    width: 3px;
    height: 18px;
    background-color: #1890ff;
  }
}
</style>
