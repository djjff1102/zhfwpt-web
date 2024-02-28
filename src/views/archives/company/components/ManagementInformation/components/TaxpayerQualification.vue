<template>
  <!-- 纳税人资质 -->
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
    <w-table
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
        <w-button type="text">详情</w-button>
      </template>
    </w-table>
  </div>
</template>
<script setup>
import dayjs from "dayjs";
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
    title: "纳税人识别号",
    dataIndex: "name",
    width: 180,
    fixed: "left",
  },
  {
    title: "纳税人资格类型",
    dataIndex: "salary",
    fixed: "left",
  },
  {
    title: "主管税务机关",
    dataIndex: "address",
    fixed: "left",
  },
  {
    title: "有效期起",
    dataIndex: "email",
  },
  {
    title: "有效期止",
    dataIndex: "email",
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
