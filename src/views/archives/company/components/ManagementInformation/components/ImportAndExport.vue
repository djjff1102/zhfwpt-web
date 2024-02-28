<template>
  <!-- 进出口信用 -->
  <div class="title">备案信息</div>
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
  </el-descriptions>
  <div class="title">备案编码</div>
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
  </w-table>
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
  },
  {
    title: "海关备案编码",
    dataIndex: "name",
  },
  {
    title: "经营类别",
    dataIndex: "salary",
  },
  {
    title: "报关有效期",
    dataIndex: "address",
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
