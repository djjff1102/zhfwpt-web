<template>
  <!-- 仓库基本信息 -->
  <el-descriptions class="margin-top" :column="2" border>
     <el-descriptions-item label="仓库名称" width="40">
      {{ info?.shortName || '--'  }}
     </el-descriptions-item>
    <el-descriptions-item label="本公司截止目前为止订单数量" width="40">
      {{ info?.orderCount ? formatNumber(info?.orderCount) : '--' }}
      </el-descriptions-item>
    <el-descriptions-item label="本公司货物运输总金额">
      {{ info?.orderMoneySum ? formatNumber(info?.orderMoneySum): '--'  }}
    </el-descriptions-item>
    <el-descriptions-item label="常储备商品类别">
      {{ info?.reserveGoodType || '--'  }}
    </el-descriptions-item>
    <el-descriptions-item label="仓库地址" :span="2" width="40">
      {{ info?.locationAddress || '--' }}
    </el-descriptions-item>
  </el-descriptions>
</template>
<script setup>
import { formatNumber } from '@/utils/common'

const props = defineProps({
  info: {
    default: {}
  }
})
</script>
<style lang="">
</style>
