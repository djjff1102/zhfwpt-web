<template>
<div class="flex-base-around">
  <SingleUpload
    @updateUpload="updateUpload">
  </SingleUpload>
  <el-button
    type="text"
    @click="handleError(row)"
    :disabled="checkError(row)"
  >错误情况</el-button>
  <el-button type="text" @click="toDetail(row)">详情</el-button>
  <el-button type="text" disabled>取消</el-button>

  <el-dialog
      title="错误信息"
      v-model="dialogVisible"
      width="600"
      :before-close="handleClose"
    >
    <div style="padding: 24px 30px">
      <div class="click-txt">{{ row?.material.judgeResult }}</div>
      <div>可前往 <span class="click-txt" @click="toFile"> 该[附件] </span> 中进行修改</div>
      <div class="center-content" v-if="!hideType.includes(type)">可 <span class="click-txt" @click="abortMsg">忽略</span>
        <w-popover
          placement="bottom">
          <template #content>
          <span class="err-msg">若选择忽略，提交时不会再进行错误提示</span>
          </template>
          <img style="width: 20px" src="@/assets/tip.png">
        </w-popover> 
         改错误信息</div>
    </div>
  </el-dialog>
</div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { useApprovalStore } from '@/store/modules/approval'
import { fileSave } from '@/api/intellApproval/special'
import { updateJudgeCode } from '@/api/intellApproval'
import { splitFiltName } from '@/utils/common'
import { pro } from '../type'

const hideType = [ pro.FP, pro.YH] // 银行和发票不可忽略
const router = useRouter();
const approvalStore = useApprovalStore();

const props = defineProps({
  rowIndex: {
    default: -1
  },
  rowId: {
    default: -1
  },
  type: {
    default: ''
  },
  row: {
    default: {}
  },
  reportId: {
    default: ''
  }
})

const dialogVisible = ref(false)

const emits = defineEmits(['updateUploadRow'])

// 忽略错误信息
function abortMsg() {
  const material = props.row.material || {}
  const data = {
    reportId: props.reportId,
    judgeId: props.rowId,
    judgeCode: 3
  }
  fileSave( data).then(res => {
    approvalStore.setListData( props.type) // 忽略成功刷新接口
  }).catch(err => {
    ElMessage.success("忽略附件错误失败：" + JSON.stringify(err));
  })
  dialogVisible.value = false
}

function updateUpload(file) {
  const material = props.row.material || {}
  const data = {
    // id: material.id || '',
    reportId: props.reportId,
    fileUrl: file,
    fileName: splitFiltName(file),
    judgeId: props.rowId,
    fileType: props.type, // 文件对应的数据类型，0为其他材料，1为订单，2为合同，3为发票，4为银行流水，5为仓储，6为物流
    judgeCode: material.judgeCode || 0
  }
  fileSave( data ).then(res => {
    approvalStore.setListData( props.type)
  }).catch(err => {
    ElMessage.success("附件更新失败：" + JSON.stringify(err));
  })
}

// 检验错误信息的状态
function checkError() {
  if( props.row?.material?.judgeCode == 2 ) {
    return false;
  } else {
    return true
  }
}

// 附件错误信息
function handleError() {
  dialogVisible.value = true
}

function toFile() {
  dialogVisible.value = false
}

// 跳转订单详情
function toDetail(d) {
  // 标记从订单调走，针对back时，做模块定位
  // router.push({
  //   path: '/archives/orderDetail',
  //   query: {
  //     order: JSON.stringify(d)
  //   }
  // })
}
</script>

<style scoped>
.click-txt {
  color:#3470FF;
  cursor: pointer;
  display: inline-block;
  /* padding: 4px; */
}
.err-msg {
  font-size: 12px;
  color: #333;
}
.center-content {
  display: flex;
  justify-content: flex-start;
  align-items: center;
}
</style>