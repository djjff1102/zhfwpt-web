<template>
  <!-- 仓库基本信息 -->
  <el-descriptions class="margin-top" :column="2" border>
    <el-descriptions-item label="过户/出库单号" width="40">
      {{ info?.transferCode || '--'  }}
     </el-descriptions-item>
     <el-descriptions-item label="仓库名称" width="40">
      {{ info?.shortName || '--'  }}
     </el-descriptions-item>
     <el-descriptions-item label="过户/出库日期" width="40">
      {{ info?.transferDate || '--'  }}
     </el-descriptions-item>
     <el-descriptions-item label="原货主" width="40">
      {{ info?.originalOwner || '--'  }}
     </el-descriptions-item>
     <el-descriptions-item label="新货主" width="40">
      {{ info?.currentOwner || '--'  }}
     </el-descriptions-item>
     <el-descriptions-item label="原存储位置" :span="2" width="40">
      {{ info?.originLocation || '--' }}
    </el-descriptions-item>
    <el-descriptions-item label="新存储位置" width="40">
      {{ info?.currentLocation || '--' }}
      </el-descriptions-item>
    <el-descriptions-item label="入库日期">
      {{ info?.inventoryListRegistrationDate || '--'  }}
    </el-descriptions-item>
    <el-descriptions-item label="出库负责人">
      {{ info?.inventoryRegistrar || '--'  }}
    </el-descriptions-item>

    <el-descriptions-item label="运输方式">
      {{ info?.transportationMode || '--'  }}
    </el-descriptions-item>
    <el-descriptions-item label="运输工具">
      {{ info?.transportationVehicle || '--'  }}
    </el-descriptions-item>
    <el-descriptions-item label="运输牌号">
      {{ info?.transportationCarno || '--'  }}
    </el-descriptions-item>

    <el-descriptions-item label="运输负责人">
      {{ info?.transportationPerson || '--'  }}
    </el-descriptions-item>
    <el-descriptions-item label="运输人证件号">
      {{ info?.transportationPersonCode || '--'  }}
    </el-descriptions-item>
    <el-descriptions-item label="目的地">
      {{ info?.destinationLocation || '--'  }}
    </el-descriptions-item>
    <el-descriptions-item label="费用">
      {{ info?.transportationFeeAmount || '--'  }}
    </el-descriptions-item>
    <el-descriptions-item label="签收人">
      {{ info?.receiver || '--'  }}
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
