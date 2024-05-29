
<template>
  <!-- 申报人信息 -->
  <div>
    <el-descriptions class="margin-top" :column="1" border>
      <el-descriptions-item label="主管税务机关" label-class-name="my-label">
        {{ data?.taxAuthority || '--' }}
      </el-descriptions-item>
      <el-descriptions-item label="申报单位" label-class-name="my-label">
        <el-button v-if="data?.companyName" type="text" @click="toCompanyDetail">{{ data?.companyName }}</el-button>
        <span v-else>--</span>
      </el-descriptions-item>
      <el-descriptions-item label="注册地址" label-class-name="my-label"> {{ data?.registerAddress || '--' }} </el-descriptions-item>
      <el-descriptions-item label="操作人" label-class-name="my-label"> {{ data?.applyUserName || '--' }} </el-descriptions-item>
      <el-descriptions-item label="申请日期" label-class-name="my-label"> {{ data?.applyTime && data?.applyTime.split(' ')[0] || '--' }} </el-descriptions-item>
    </el-descriptions>
  </div>
</template>
<script setup>
import { useRouter } from 'vue-router';
const router = useRouter()

const props = defineProps({
  data: {
    default: {}
  }
})

// 从发票智能审批-跳转公司详情
function toCompanyDetail() {
  // 跳转企业详情
  router.push({ 
    path: '/archives/companyDetail', 
    query: {
      companyId: props.data.companyId,
      companyName: props.data.companyName
    }
  });
}
</script>

<style lang="scss" scoped>
:deep(.my-label) {
  width: 140px !important;
}
</style>
