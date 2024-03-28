<template>
  <div class="danger-point-container">
    <div class="table-warp">
      <m-table
        :style="{height: height}"
        :data="tableData"
        :columns="columns"
        :scroll="scroll"
        :pagination="false"
        @page-change="changepage"
        @page-size-change="changePagesize"
        :bordered="false"
      >
        <template v-slot:index="{ rowIndex }">
          {{ rowIndex + 1 }}
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

const props = defineProps({
  data: {
    default: []
  },
  height: {
    default: '160px'
  },
  scroll: {
    default: {
        y: 800,
        x: 1080,
    }
  }
})

watch(
  () => props.data,
  (v) => {
    if(v && v.length > 0) {
      tableData.value = v
    }
  }, {
    deep: true
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
    title: "风险分类",
    dataIndex: "secondCategory",
    width: 200,
  },
  {
    title: "风险名称",
    dataIndex: "name",
    width: 200,
  },
  {
    title: "风险描述",
    dataIndex: "description",
    slotName: "descriptionSlot",
  },
]);
const pagination = ref({
  total: 0,
  pageSize: 10,
  "show-total": true,
  "show-page-size": true,
  "show-jumper": true,
});
// const scroll = ref({
//   y: 800,
//   x: 1080,
// });
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
.search_box {
  display: flex;
  justify-content: flex-end;
}
</style>
