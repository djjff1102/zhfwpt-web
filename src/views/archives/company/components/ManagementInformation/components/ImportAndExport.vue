<template>
  <!-- 进出口信用 -->
  <!-- <div class="title">备案信息</div>
  <el-descriptions class="margin-top" :column="2" border>
    <el-descriptions-item label="备案日期">
      91440300MA5FFW09283
    </el-descriptions-item>
    <el-descriptions-item label="所在海关"> 18100000000 </el-descriptions-item>
    <el-descriptions-item label="行政区划"> Suzhou </el-descriptions-item>
    <el-descriptions-item label="地址"> Suzhou </el-descriptions-item>
    <el-descriptions-item label="经济区划"> Suzhou </el-descriptions-item>
    <el-descriptions-item label="经营类别"> Suzhou </el-descriptions-item>
    <el-descriptions-item label="统计经济区划"> Suzhou </el-descriptions-item>
    <el-descriptions-item label="行业种类"> Suzhou </el-descriptions-item>
    <el-descriptions-item label="海关注销标志"> Suzhou </el-descriptions-item>
    <el-descriptions-item label="跨境贸易电子商务类型">
      Suzhou
    </el-descriptions-item>
    <el-descriptions-item label="年报情况"> Suzhou </el-descriptions-item>
    <el-descriptions-item label="信用等级"> Suzhou </el-descriptions-item>
  </el-descriptions> -->
  <div class="title">备案编码</div>
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
  </m-table>
</template>
<script lang="ts" setup>
import { ref, reactive } from "vue";
import {companybusinessimportexportcredit} from '@/api/archives'
import { table } from "console";

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
  },
  {
    title: "海关备案编码",
    dataIndex: "crCode",
  },
  {
    title: "经营类别",
    dataIndex: "managementCategory",
  },
  {
    title: "报关有效期",
    dataIndex: "validityDate",
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
  pagination.value.current = 1
  pagination.value.pageSize = v;
  searchPar.value.page_size = v
  searchPar.value.page = 1
  init();
};
const changepage = (v) => {
  pagination.value.current = v
  searchPar.value.page = v
  init();
};
const init = async () => {
  if(loading.value) return
  loading.value = true
  companybusinessimportexportcredit(searchPar.value).then(res => {
    tableData.value = res.data;
    pagination.value.total = res.total;
    loading.value = false
  }).catch(err => {
    loading.value = false
  })
};
init()
</script>

<style lang="scss" scoped>
.title {
  position: relative;
  margin: 16px 0;
  font-family: PingFangSC, PingFang SC;
  font-weight: 400;
  font-size: 16px;
  color: #333333;
  line-height: 22px;
}
</style>
