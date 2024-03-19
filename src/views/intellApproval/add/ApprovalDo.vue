<template>
  <el-dialog v-model="visible" :before-close="handleBeforeClose" :width="600">
    <div class="proval-content">
       <w-form :model="form" >
          <w-form-item field="approveResult" label="审批结果" required>
            <el-select v-model="form.approveResult" placeholder="请选择审批结果" style="height: 30px">
              <el-option v-for="(item, i) in appravalResultList" :key="i" :value="item.value" :label="item.label"></el-option>
              <!-- <el-option :value="3" >驳回</el-option> -->
            </el-select>
          </w-form-item>
          <w-form-item field="approveOpinion" label="审批意见" required>
            <w-textarea v-model="form.approveOpinion" placeholder="请输入审批意见"/>
          </w-form-item>
          <w-form-item field="approveRemark" label="备注" required>
            <w-textarea v-model="form.approveRemark" placeholder="请输入备注"/>
          </w-form-item>
          <w-form-item field="fileUrl" label="调研报告">
            <MultiUpload @updateUpload="updateUpload"></MultiUpload>
          </w-form-item>
        </w-form>
    </div>
    <template #header>
      <div class="dia-header">审批意见</div>
    </template>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="handleCancel">取消</el-button>
        <el-button type="primary" @click="handleOk" style="margin-left: 16px;">确定</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
import { ref, watch } from 'vue'
import { appravalResultList } from '../type'
import { approveSave } from '@/api/intellApproval'
import { useRouter } from 'vue-router';

const props = defineProps({
  showAdd: {
    type: Boolean,
    default: false
  },
  reportId: {
    type: String,
    default: ''
  }
})

const visible = ref(false)
const form = ref({
  reportId: '', // 申报id
  approveResult: 2, // 审批结果
  approveOpinion: '', // 审批意见
  approveRemark: '', // 审批备注
  fileUrl: '', // 附件路径
})

const emits = defineEmits(['updateAdd', 'updateData'])

watch(() => props.showAdd, (newValue) => {
  visible.value = newValue;
})

function handleCancel (v: any) {
  emits('updateAdd', false)
}

function handleOk() {
  form.value.reportId = props.reportId;
  approveSave(form.value).then(res => {
    emits('updateData')
    emits('updateAdd')
    ElMessage.success("审批成功！");
  }).catch(err => {})
  
}

// 更新上传的文件
function updateUpload(file) {
  form.value.fileUrl = file;
}

async function handleBeforeClose(done: any) {
  await done()
  emits('updateAdd', false)
}
</script>

<style lang="scss" scoped>
.proval-content {
  padding: 12px 24px;
  position: relative;
  z-index: 9999;
}
:deep(.upload-msg) {
  width: 307px;
  }
</style>