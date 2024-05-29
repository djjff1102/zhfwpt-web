
<template>
<div>
  <div v-if="!data || (!data?.clear_director && !data?.clear_members)" class="no-data">
    <img src="@/assets/images/no-data.png" style="width: 250px">
    暂无数据
  </div>
  <el-descriptions class="margin-top" :column="2" border v-else>
    <el-descriptions-item width="120" label="清算组负责人">
      {{ data?.clear_director  }}
    </el-descriptions-item>
    <el-descriptions-item width="120" label="清算组成员">
      {{ data?.clear_members }}
    </el-descriptions-item>
  </el-descriptions>
</div>
</template>
<script setup>
const props = defineProps({
  data: {
    default: {}
  }
})
</script>

<style scoped>
.no-data {
  color: #bfc4cd;
  padding-bottom: 12px;
  border-bottom: 1px solid var(--color-neutral-3);
}
</style>