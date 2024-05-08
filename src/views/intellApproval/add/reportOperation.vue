<template>
  <div>
    <div class="flex-base-around">
      <SingleUpload
        v-if="pageType != 'detail'"
        @updateUpload="updateUpload">
      </SingleUpload>
      <el-button
        v-if="pageType != 'detail'"
        type="text"
        @click="handleError(row)"
        :disabled="checkError(row)"
      >错误情况</el-button>
      <el-button :disabled="[pro.YH, pro.CC, pro.WL].includes(type)" type="text" @click="toDetail(row)">详情</el-button>
      <!-- <el-button type="text" disabled>取消</el-button> -->
    </div>

    <el-dialog
        title="错误信息"
        v-model="dialogVisible"
        width="600"
        :before-close="handleClose"
        :append-to-body="true"
      >
      <div style="padding: 24px 30px">
        <div v-for="(item, i) in row?.material.judgeResult" :key="item" class="common-click-txt">{{ i+ 1}}、{{ item }}</div>
        <div class="common-click-txt" style="margin-top: 16px">可前往该附件中进行修改</div>
        <div class="common-click-txt center-content">可 <span class="click-txt" @click="abortMsg">忽略</span>
          <el-tooltip content="若选择忽略，提交时不会再进行错误提示" placement="bottom">
           <img style="width: 20px" src="@/assets/tip.png">
          </el-tooltip>改错误信息
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script setup>
import { useRouter, useRoute } from 'vue-router'
import { useApprovalStore } from '@/store/modules/approval'
import { fileSave } from '@/api/intellApproval/special'
import { splitFiltName } from '@/utils/common'
import { pro, urlMap } from '../type'
import { status } from '../type' 

const router = useRouter();
const route = useRoute();
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
  },
  approveStatus: {  // 审批状态 1 待审批 2通过 3 reject
    default: ''
  }
})

const dialogVisible = ref(false)
const pageType = ref(route.query.type)

const emits = defineEmits(['updateUploadRow'])

// 忽略错误信息
function abortMsg() {
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
    reportId: props.reportId,
    fileUrl: file,
    fileName: splitFiltName(file),
    judgeId: props.rowId,
    fileType: props.type, // 文件对应的数据类型，0为其他材料，1为订单，2为合同，3为发票，4为银行流水，5为仓储，6为物流
    judgeCode: 0 // judgeCode 0为未处理的，1为校验通过的，2为校验异常的，3为用户选择忽略,重新上传默认为未处理
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
  let query = {}
  // 标记从订单调走，针对back时，做模块定位
  switch(props.type) {
    case pro.DD:
      query.orderCode = d.code
      if(props.approveStatus != status.pass) {
        query.reportId = props.reportId;
      }
      formateURL( urlMap[pro.DD], query)
      break;
    case pro.HT:
      query.parentCode = d.code
      if(props.approveStatus != status.pass) {
        query.reportId = props.reportId;
      }
      formateURL( urlMap[pro.HT], query)
      break;
    case pro.FP:
      query = {
        name:'发票详情',
        number: d.number, // 发票号码
        code: d.code // 发票代码
      }
      if(props.approveStatus != status.pass) {
        query.reportId = props.reportId;
      }
      formateURL( urlMap[pro.FP], query)
      break;
    case pro.YH:
      // formateURL( urlMap[pro.HT], {parentCode: d.code})
      break;
    case pro.CC:
      // formateURL( urlMap[pro.HT], {parentCode: d.code})
      break;
    case pro.WL:
      // formateURL( urlMap[pro.HT], {parentCode: d.code})
      break;
  }

}

function formateURL(path, query) {
  router.push({
    path,
    query
  })
}
</script>

<style scoped>
.common-click-txt {
  margin-bottom: 4px;
}
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