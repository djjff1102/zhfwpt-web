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
      <!-- <abnormal-one :info="info"></abnormal-one> -->
      <abnormal-two :info="info"></abnormal-two>
    </el-dialog>
  </div>

</template>

<script setup>
import { ref } from 'vue'

const props = defineProps({
  info: { // 风险信息
    default: {}
  }
})

const dialogTableVisible = ref(false)

function handleResult() {
  dialogTableVisible.value = true;
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
