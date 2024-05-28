
<template>
  <div>
    <el-descriptions class="margin-top" :column="2" border>
      <el-descriptions-item  label="清算组负责人">
        {{ data?.clear_director  }}
      </el-descriptions-item>
      <el-descriptions-item label="清算组成员">
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
