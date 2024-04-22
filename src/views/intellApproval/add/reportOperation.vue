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
      <div>可 <span class="click-txt" @click="abortMsg"> 忽略 </span>改错误信息</div>
    </div>
    </el-dialog>
</div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { useApprovalStore } from '@/store/modules/approval'
import { fileSave } from '@/api/intellApproval/special'
import { splitFiltName } from '@/utils/common'

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

function abortMsg() {
  dialogVisible.value = false
}

function updateUpload(file) {
  // const businessDataMaterialList = {
  //   fileType: props.type,   //订单例子
  //   fileUrl: file,
  //   judgeId: props.rowId
  // }
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
  padding: 4px;
}
</style>