<template>
  <div class="content-one">
    <div class="risk-result">{{ info.result }}</div>
    TODO: 计算公式待替换
    <img src="./img/djpl.svg" class="pl-img">
    <m-table
      :columns="columns"
      :data="JSON.parse(info.source)"
      style="height: 100%"
      :pagination="false"
      :bordered="false"
    >
    <template v-slot:index="{ rowIndex }">
      {{ rowIndex + 1 }}
    </template>
  </m-table>
  </div>
</template>

<script setup>
const props = defineProps({
  info: { // 风险信息
    default: {}
  },
  columns: {
    default: []
  }
})
</script>

<style lang="scss" scoped>
.content-one {
  padding: 16px 0;
  font-family: PingFangSC, PingFang SC;
  font-weight: 400;
  font-size: 14px;
  color: #000000;
  line-height: 20px;
  text-align: left;
  font-style: normal;
  overflow: hidden;
  .risk-result {
    background: #FFF4E5;
    border-radius: 8px;
    border: 1px solid #FF9100;
    padding: 14px;
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
.pl-img {
  display: block;
  margin: 18px 0;
  width: 100%;
}
:deep(.el-descriptions__cell) {
  width: 100px;
}
</style>
