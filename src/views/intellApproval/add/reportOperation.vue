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
</div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { useApprovalStore } from '@/store/modules/approval'

const router = useRouter();
const approvalStore = useApprovalStore();

const props = defineProps({
  row: {
    default: {}
  },
  type: {
    default: ''
  },
  tableData: {
    default: []
  }
})

const emits = defineEmits(['updateUploadRow'])

function updateUpload(file) {
  props.row.businessDataMaterialList = {
    fileType: props.type,   //订单例子
    fileUrl: file,
    judgeId: props.row.id
  }
  console.log('当前表单--------------：', props.tableData)
  approvalStore.setListData(props.tableData, props.type)
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
