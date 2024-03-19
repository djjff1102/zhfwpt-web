<template>
  <!-- 风险点 -->
  <div class="container">
    <div class="search_box">
      <w-form :model="form" layout="inline">
        <w-form-item field="name" label="风险名称">
          <w-input v-model="form.name" placeholder="请输入风险名称" />
        </w-form-item>
        <w-form-item class="mr-16px" field="post" label="风险程度">
          <w-select v-model="form.post" placeholder="全部" />
        </w-form-item>
        <el-button type="primary" class="mr-8px">搜索</el-button>
        <el-button>重置</el-button>
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
          <el-button type="text">详情</el-button>
        </template>
      </m-table>
    </div>
  </div>
</template>
<script setup>
import dayjs from "dayjs";
import { onMounted, ref, reactive, unref, computed, watch } from "vue";
const videoRef = ref();
const dialogVisible = ref();
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
    dataIndex: "salary",
    width: 180,
  },
  {
    title: "风险描述",
    dataIndex: "name",
    width: 180,
  },
  {
    title: "风险结果",
    dataIndex: "name",
    width: 180,
  },
  {
    title: "风险建议",
    dataIndex: "name",
    width: 180,
  },
]);
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
const init = async () => {};
</script>

<style lang="scss" scoped>
.container {
}
.table-warp {
  height: calc(100% - 100px);
}
</style>
