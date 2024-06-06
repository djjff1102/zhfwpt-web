<template>
  <!-- 申报额度信息 -->
  <div style="margin-bottom: 24px;">
    <el-descriptions class="margin-top" :column="1" border>
      <el-descriptions-item  label="申请额度" label-class-name="my-label">
        {{ formatNumber(data?.money)   || '--'}} 万元
      </el-descriptions-item>
      <el-descriptions-item label="申请调整额度类型" label-class-name="my-label" >
        {{ data?.limitType == '1' ? '长期' : '短期' || '--' }}
      </el-descriptions-item>
      <el-descriptions-item label="起止有效期" label-class-name="my-label"> 
        {{ data?.validDateStart && data?.validDateStart.split(' ')[0] }} - {{ data?.validDateEnd && data?.validDateEnd.split(' ')[0] }}
      </el-descriptions-item>
      <el-descriptions-item label="申请理由" label-class-name="my-label reson-my-label"> {{ data?.reason || '--' }} </el-descriptions-item>
    </el-descriptions>
  </div>
</template>
<script setup>
import { formatNumber } from '@/utils/common'
const props = defineProps({
  data: {
    default: {}
  }
})
</script>

<style lang="scss" scoped>
:deep(.my-label) {
  width: 170px !important;
}
:deep(.reson-my-label) {
  height: 90px;
}
</style>