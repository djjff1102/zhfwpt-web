<template>
  <div class="attention">
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
        <template v-slot:index="{rowIndex}">
          {{ rowIndex + 1 }}
        </template>
      </m-table>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from "vue";
import { useRouter } from 'vue-router';
import { companyItemData } from '@/api/archives'

const props = defineProps({
  companyId: {
    default: ''
  }
})

const loading = ref(false);
const tableData = ref([{
  data: '2024-4-4'
}]);
const columns = reactive([
  {
    title: "序号",
    dataIndex: "index",
    slotName: 'index',
    fixed: 'left',
    width: 80,
  },
  {
    title: "变更日期",
    dataIndex: "change_date",
    width: 220,
  },
  {
    title: "变更项目",
    dataIndex: "change_field",
    width: 240,
    tooltip: {position: 'left'},
    ellipsis: true,
  },
  {
    title: "变更前",
    dataIndex: "content_before",
    tooltip: {position: 'left'},
    ellipsis: true,
  },
  {
    title: "变更后",
    dataIndex: "content_after",
    tooltip: {position: 'left'},
    ellipsis: true,
  }
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
  companyId: props.companyId,
  itemCode: 'QYJBXX-BGXX' // 变更信息code
})

const changePagesize = (v) => {
  pagination.value.pageSize = v;
  searchPar.value.page_size = v;
  getpage();
};

const changepage = (v) => {
  searchPar.value.page = v;
  getpage();
};


// 变更信息
function getpage() {
  if(loading.value) return;
  loading.value = true;
  companyItemData(searchPar.value).then(res => {
    tableData.value = res.data
    pagination.value.total = res.total
    loading.value = false;
  }).catch(err => {
    loading.value = false;
  })
}

getpage();
</script>

<style lang="scss" scoped>
.attention {
  padding: 24px;
  padding-bottom: 16px;
  height: 100%;
  background: #fff;
}
</style>

