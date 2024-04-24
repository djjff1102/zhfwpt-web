<template>
  <el-dialog v-model="visible" :before-close="handleBeforeClose" :width="700">
    <template #header>
      <div class="dia-header">错误信息</div>
    </template>
    <div class="err-main">
      <div class="err-item" v-if="errObj.DD.title">{{ errObj.DD.title }}</div>
      <div class="err-item" v-if="errObj.HT.title ">{{ errObj.HT.title }}</div>
      <div class="err-item" v-if="errObj.FP.title">{{ errObj.FP.title }}</div>
      <div class="err-item" v-if="errObj.YH.title">{{ errObj.YH.title }}</div>
      <div class="err-item" v-if="errObj.CC.title">{{ errObj.CC.title }}</div>
      <div class="err-item" v-if="errObj.WL.title">{{ errObj.WL.title }}</div>
    </div>
    <template #footer>
      <span class="dialog-footer">
        <w-button type="primary" @click="handleOk" style="margin-left: 16px;">确定</w-button>
      </span>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
import { ref, watch } from 'vue'

const props = defineProps({
  showAdd: {
    type: Boolean,
    default: false
  },
  errObj: {
    type: Object,
    default: {}
  }
})

const visible = ref(false)

const emits = defineEmits(['updateAdd'])

watch(() => props.showAdd, (newValue) => {
  visible.value = newValue;
})


function handleOk() {
  emits('updateAdd', false)
}

async function handleBeforeClose(done: any) {
  await done()
  emits('updateAdd', false)
}
</script>

<style lang="scss" scoped>
.err-main {

}
.err-item {
  margin-bottom: 8px;
  color: #3470FF;
}
.proval-content {
  padding: 12px 24px;
  position: relative;
  z-index: 9999;
}
// :deep(.upload-msg) {
//   width: 307px;
// }

</style>