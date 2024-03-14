<template>
  <el-dialog v-model="visible" :before-close="handleBeforeClose" :width="600">
    
    <template #header>
      <div class="dia-header">审批意见</div>
    </template>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="handleCancel">取消</el-button>
        <el-button type="primary" @click="handleOk">确定</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const visible = ref(false)

const emits = defineEmits(['updateAdd', 'updateData'])

function handleCancel (v: any) {
  emits('updateAdd', false)
}

function handleOk() {
  emits('updateAdd')
}

async function handleBeforeClose(done: any) {
  await done()
  emits('updateAdd', false)
}
</script>

<style lang="scss" scoped>

</style>