
<template>
  <!-- 申报人信息 -->
  <div>
    <el-descriptions class="margin-top" :column="1" border>
      <el-descriptions-item label="主管税务机关" label-class-name="my-label">
        {{ data?.taxAuthority || '--' }}
      </el-descriptions-item>
      <el-descriptions-item label="申报单位" label-class-name="my-label">
        {{ data?.companyName || '--' }}
      </el-descriptions-item>
      <el-descriptions-item label="注册地址" label-class-name="my-label"> {{ data?.registerAddress || '--' }} </el-descriptions-item>
      <el-descriptions-item label="操作人" label-class-name="my-label"> {{ data?.applyUserName || '--' }} </el-descriptions-item>
      <el-descriptions-item label="申请日期" label-class-name="my-label"> {{ data?.applyTime && data?.applyTime.split(' ')[0] || '--' }} </el-descriptions-item>
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

<style lang="scss" scoped>
:deep(.my-label) {
  width: 140px !important;
}
</style>
