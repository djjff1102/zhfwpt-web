<template>
  <div class="content-one">
    <div class="risk-result">{{ info.result }}</div>
    <el-descriptions class="margin-top" :column="2" border style="margin: 16px 0">
      <el-descriptions-item label="经营范围">
        {{ info?.otherSource || '暂无' }}
      </el-descriptions-item>
    </el-descriptions>
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
  padding: 16px 24px;
  font-family: PingFangSC, PingFang SC;
  font-weight: 400;
  font-size: 14px;
  color: #000000;
  line-height: 20px;
  text-align: left;
  font-style: normal;
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
:deep(.el-descriptions__cell) {
  width: 100px;
}
</style>
