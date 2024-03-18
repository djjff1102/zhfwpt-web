<template>
  <!-- 纳税人资质 -->
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
</template>
<script setup>
import { ref, reactive } from "vue";
import { tbGeneralTaxpayer } from '@/api/archives'

const props = defineProps({
  companyName: {
    default: ''
  }
})

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
    dataIndex: "taxCode",
    width: 180,
    fixed: "left",
  },
  {
    title: "纳税人资格类型",
    dataIndex: "taxType",
    fixed: "left",
  },
  {
    title: "主管税务机关",
    dataIndex: "taxAuthority",
    fixed: "left",
  },
  {
    title: "有效期起",
    dataIndex: "validStartdate",
  },
  {
    title: "有效期止",
    dataIndex: "validEnddate",
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
})
const scroll = ref({
  y: 800,
  x: 1080,
});

const changePagesize = (v) => {
  pagination.value.current = 1;
  pagination.value.pageSize = v;
  searchPar.value.page_size = v;
  searchPar.value.page = 1
  init();
}

const changepage = (v) => {
  pagination.value.current = v;
  searchPar.value.page = v
  init();
};

function init() {
  if(loading.value) return
  loading.value = true
  tbGeneralTaxpayer(searchPar.value).then(res => {
    loading.value = false
    tableData.value = res.data;
    pagination.value.total = res.total
  }).catch(err => {
    loading.value = false
  })
}

init()
</script>

<style lang="scss" scoped>
.container {
}
.table-warp {
  height: calc(100% - 100px);
}
</style>
