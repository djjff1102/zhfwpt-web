<template>
  <div class="content-one">
    <div class="risk-result">
      <threeRow :info="info.error"></threeRow>
    </div>
    <m-table
      :columns="columns"
      :data="info.source"
      style="height: 100%"
      :pagination="false"
      :bordered="false"
      :scroll="scroll"
    >
      <template v-slot:index="{ rowIndex }">
        {{ rowIndex + 1 }}
      </template>
    </m-table>
  </div>
</template>

<script setup>
import threeRow from "./threeRow.vue";
const props = defineProps({
  info: {
    // 风险信息
    default: {},
  },
  columns: {
    default: [],
  },
});
const scroll = ref({
  y: 300,
});
</script>

<style lang="scss" scoped>
.three-row {
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 3; /*省略几行写几*/
  -webkit-box-orient: vertical;
  cursor: pointer;
}
.content-one {
  // padding: 16px 24px;
  font-family:
    PingFangSC,
    PingFang SC;
  font-weight: 400;
  font-size: 14px;
  color: #000000;
  line-height: 20px;
  text-align: left;
  font-style: normal;
  .risk-result {
    background: #fff4e5;
    border-radius: 8px;
    border: 1px solid #ff9100;
    padding: 14px;
    margin-bottom: 16px;
  }
  .risk-reason {
    margin-top: 16px;
    display: flex;
    justify-content: flex-start;
    div:first-child {
      flex-shrink: 0;
    }
  }
}
:deep(.el-descriptions__cell) {
  width: 100px;
}
</style>
