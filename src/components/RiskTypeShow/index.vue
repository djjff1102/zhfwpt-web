<template>
  <div>
    <div class="risk-result" @click="handleResult">
      {{ info?.result }}
    </div>
    <el-dialog v-model="dialogTableVisible" width="1074">
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
      <abnormal-one v-if="riskType == 2" :info="info"></abnormal-one>
      <abnormal-two v-if="riskType == 1" :info="info" :columns="columns"></abnormal-two>
      <abnormal-three v-if="riskType == 3" :info="info"></abnormal-three>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref, watch, onMounted } from 'vue'
import { fxjkFieldMapping } from '@/api/archives'
import { JYriskCode } from '@/utils/baseType'

const props = defineProps({
  info: { // 风险信息
    default: {}
  }
})

const dialogTableVisible = ref(false)
const riskType = ref(-1); // 根据风险类型控制页面显示
const columns = ref([])

// 获取汉字和英文关系
function getfxjkFieldMapping(code) {
  fxjkFieldMapping({
    indexCode: code
  }).then(res => {
    let d = JSON.parse(res.data[0].fieldMapping);
    formateWord(d);
  }).catch(err => {
  })
}

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

function handleResult() {
  dialogTableVisible.value = true;
  let code = props.info.code
  if(JYriskCode.includes(code)) {   // 经营类异常
    getfxjkFieldMapping(code)
    riskType.value = 1
  }
  
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
