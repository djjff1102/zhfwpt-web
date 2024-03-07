<template>
  <el-dialog v-model="visible" :before-close="handleBeforeClose" :width="600">
    <div class="dia-content">
      <m-table></m-table>
    </div>
    <template #header>
      <div class="dia-header">审批记录</div>
    </template>
    <template #footer>
      <span class="dialog-footer">
        <el-button type="primary" @click="handleCancel">知道了</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
import { ref, watch } from 'vue';

const props = defineProps({
  showRecord: {
    type: Boolean,
    default: false
  }
})

const emits = defineEmits(['updateAdd'])
watch(() => props.showRecord, (newValue) => {
  visible.value = newValue;
})

const visible = ref(false)

function handleTab() {}

function handleOk() {
  emits('updateAdd', false)
}

async function handleBeforeClose(done) {
  await done()
  emits('updateAdd', false)
}

function handleCancel (v) {
  emits('updateAdd', false)
}
</script>

<style lang="scss" scoped>
.dia-content {
  padding: 12px 24px;
}
.dia-header {
  font-family: PingFangSC, PingFang SC;
  font-weight: 600;
  font-size: 18px;
  color: #383B40;
  line-height: 48px;
  text-align: left;
}
</style>