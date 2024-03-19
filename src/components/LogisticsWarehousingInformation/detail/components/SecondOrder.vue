<template>
  <!-- 物流仓储信息 -->
  <div class="container">
    <div class="search_box">
      <w-form :model="form" layout="inline">
        <w-form-item class="mr-16px" field="post" label="所属地区">
          <w-select v-model="form.post" placeholder="请输入角色编号" />
        </w-form-item>
        <w-form-item field="name" label="仓库地址">
          <w-input v-model="form.name" placeholder="请输入仓库地址" />
        </w-form-item>
        <w-form-item field="name" label="仓库简称">
          <w-input v-model="form.name" placeholder="请输入仓库简称" />
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
<script lang="ts" setup>
import { onMounted, ref, reactive, unref, computed, watch } from "vue";

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
    title: "子仓库简称",
    dataIndex: "name",
    width: 180,
    fixed: "left",
  },
  {
    title: "所属地区",
    dataIndex: "salary",
    fixed: "left",
  },
  {
    title: "子仓库地址",
    dataIndex: "address",
    fixed: "left",
  },
  {
    title: "涉及订单数量",
    dataIndex: "email",
  },
  {
    title: "货物运输总金额",
    dataIndex: "email",
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
const init = async () => {};
</script>

<style lang="scss" scoped>
.container {
}
.table-warp {
  height: calc(100% - 100px);
}
</style>
