<template>
  <el-dialog v-model="visible" :before-close="handleBeforeClose" :width="600">
    <div class="dia-content">
      <card-tab
        :showExtra="false"
        :defaultKey = "defaultKey"
        @handleTab="handleTab"
      >
      </card-tab>
      <div style="margin-top: 12px; margin-left: 3px;">
        <m-transfer></m-transfer>
      </div>
    </div>
    <template #header>
      <div class="dia-header">新增资料</div>
    </template>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="handleOk">取 消</el-button>
        <el-button type="primary" @click="handleCancel"
          >确 定</el-button
        >
      </span>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
import { ref, watch } from 'vue';

const props = defineProps({
  showAdd: {
    type: Boolean,
    default: false
  },
  defaultKey: {
    type: String,
    default: '1'
  }
})

const emits = defineEmits(['updateAdd'])
watch(() => props.showAdd, (newValue) => {
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