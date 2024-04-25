<template>
  <div>
    <div class="risk-result" @click="handleResult">
      {{ info?.result }}
    </div>
    <el-dialog v-model="dialogTableVisible" :width="getWidth">
      <template #header>
        <div class="flex-base-start">
          <img src="@/assets/base/waring.svg">
          <div class="risk-title">{{ info?.name }}异常</div>
        </div>
      </template>
      <template #footer>
        <span class="dialog-footer">
          <w-button type="primary" @click="dialogTableVisible = false">知道了</w-button>
        </span>
      </template>
      <abnormal-ty v-if="riskType == abnormalStatus.TY" :info="info" :columns="columns"></abnormal-ty>
      <abnormal-djpl v-else-if="riskType == abnormalStatus.DJPL" :info="info" :columns="columns"></abnormal-djpl>
      <abnormal-cfwjy v-else-if="riskType == abnormalStatus.CFWJY" :info="info" :columns="columns"></abnormal-cfwjy>
      <abnormal-jxxsp v-else-if="riskType == abnormalStatus.JXXSP" :info="info"></abnormal-jxxsp>
      <abnormal-glyc v-else-if="riskType == abnormalStatus.GLYC" :info="info" :columns="columns"></abnormal-glyc>
      <abnormal-htzt v-else-if="riskType == abnormalStatus.HTZT" :info="info" :columns="columns"></abnormal-htzt>
      <abnormal-jygm v-else-if="riskType == abnormalStatus.JYGM" :info="info" :columns="columns"></abnormal-jygm>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, onMounted, computed } from 'vue'
import { fxjkFieldMapping } from '@/api/archives'
import { JYriskCode, TSriskCode } from '@/utils/baseType'
import { abnormalStatus } from './type'

const props = defineProps({
  info: { // 风险信息
    default: {}
  }
})

const dialogTableVisible = ref(false)
const riskType = ref(-1); // 根据风险类型控制页面显示
const columns = ref([])
const barJXX = ref() // 企业进销项商品匹配异常

const getWidth = computed(() => {
  if(riskType.value == abnormalStatus.DJPL) {
    return 1074;
  } else if(riskType.value == 1){
    return 900;
  } else {
    return 900;
  }
})

// 处理数据，生成columns
function formateWord(d) {
  columns.value = []
  const arr = [{
    title: "序号",
    dataIndex: "index",
    slotName: 'index',
    width: 80,
  }]
  Object.keys(d).forEach(item => {
    let cur = {
      title: d[item],
      dataIndex: item
    }
    arr.push(cur)
  })
  columns.value = arr;
}

// 处理数据，处理成图标的Y轴值 处理成符合柱状的数据
function formateY(d) {
  columns.value = []
  const arr = []
  const left = [];
  const right = [];
  Object.keys(d).forEach(item => {
    arr.push(d[item])
  })
  columns.value = arr;
}

// 处理字段对应关系
function handleResult() {
  dialogTableVisible.value = true;
  riskType.value = props.info.handleMethod
  formateWord(JSON.parse(props.info.fieldMapping)); // 字段对应关系
}

</script>

<style scoped lang="scss">
.risk-result {
  color:#3470FF;
  cursor: pointer;
}
.risk-title {
  font-family: PingFangSC, PingFang SC;
  font-weight: 600;
  font-size: 18px;
  color: #383B40;
  text-align: left;
  font-style: normal;
  margin-left: 12px;
}
// :deep(.el-dialog__header) {
//   border-bottom: none;
// }
// :deep(.el-dialog__footer) {
//   border-top: none;
// }
</style>
