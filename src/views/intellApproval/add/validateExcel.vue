<template>
  <div class="validate-excel">
    <div class="file-message">系统中存在申报所需订单，可通过【新增】功能进行勾选；系统中不存在申报所需订单，可手动上传</div>
    <div class="validate-excel-wrap" :class="{'error-mesg': errorFlag && uploadFlag == 0 }">
      <div class="flex-base-start">
        <el-button :loading="loading" type="text" style="margin-right: 8px" @click="downloadTemplate">下载模版</el-button>
        <el-upload
          :before-upload="handleBeforeUpload"
          :http-request="handleUpload"
          :accept="acceptType"
          :on-exceed="handleExceed"
          :show-file-list="false"
        >
          <div class="flex-base-start">
            <w-button type="primary" :loading="uploading">上传文件</w-button>
          </div>
        </el-upload>
        <div v-if="uploadFlag == 1" class="success-text flex-base-start">
          <img src="@/assets/base/success.svg">{{ successText }}
        </div>
        <div v-if="uploadFlag == 0" class="success-text flex-base-start"><img src="@/assets/base/waring.svg">
          请查看<el-button type="text" @click="dialogVisible = true">错误信息</el-button>，修改后重新上传文件。
        </div>
      </div>

      <div class="file-wrap">
        <div class="flie-item" v-for="(item) in fileList" :key="item.name">
          <img src="@/assets/base/file.png">
          <div class="file-name">{{ item.name }}</div>
          <img class="close" style="width: 20px" src="@/assets/base/cha.png" @click="handleDel"/> 
          <img class="success" style="width: 20px" src="@/assets/base/right.png">
        </div>
      </div>
    </div>

    <el-dialog
      title="错误信息"
      v-model="dialogVisible"
      width="800"
      :before-close="handleClose"
    >
    <div style="padding: 24px 30px">
      <m-table
        v-if="tableData && tableData.length > 0"
        :data="tableData"
        :columns="columns"
        :scroll="scroll"
        :pagination="false"
        :bordered="false"
      >
        <template v-slot:index="{ rowIndex }">
          {{ rowIndex + 1 }}
        </template>
      </m-table>
      <div v-if="relationList && relationList.length > 0">
        <div class="relation-info" v-for="(item, i) in relationList" :key="i">{{ i+1 }}、{{ item }}</div>
      </div>
      <div v-if="originResult">{{ originResult }}</div>
    </div>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import { add, importData, deleteDataAfterDeleteExcel } from '@/api/intellApproval'
import { singleuploadFileApi } from "@/api/file";
import { download } from '@/api/file'
import { exportBlob, splitFiltName } from '@/utils/common'
import { useApprovalStore } from '@/store/modules/approval'

const approvalStore = useApprovalStore();

const uploading = ref(false)
const successText = '上传成功，上传信息已展示在下述列表中，可上传相关附件，其中合同和银行流水的附件必须要上传'
const acceptType = '.xlsx,.xls'

const props = defineProps({
  form: {
    default: {}
  },
  reportId: {
    default: -1
  },
  errorFlag: {
    default: false
  },
  defaultfileList: {
    default: []
  }
})

watch(() => props.defaultfileList, (v) => {
  if(v && v.length > 0 && v[0]?.fileUrl) {
    nextTick(() => {
      fileList.value = [{name: splitFiltName(v[0].fileUrl)}]
    })
  }
}, {
  deep: true,
})

const emits = defineEmits(['updateReportId', 'updateFileData'])

const scroll = ref({
  y: 500
})
const uploadFlag = ref(-1) // -1 未上传文件，0上传有误，1上传成功
const loading = ref(false)
const fileList = ref([])
const dialogVisible = ref(false)
const tableData = ref([])
const originResult = ref('')
const columns = reactive([
  {
    title: "序号",
    width: 80,
    slotName: "index",
  },
  {
    title: "错误位置",
    dataIndex: "position",
  },
   {
    title: "错误字段",
    dataIndex: "field",
  },
  {
    title: "错误内容",
    dataIndex: "content",
  }
])
const relationList = ref([]) // 关联关系错误

// 模版下载
async function downloadTemplate() {
  if(loading.value) return;
  loading.value = true;
  download({
    file_name: '20240411/1778318595530911746@quesoar@审批上传模版.xlsx'
  }).then(async(res) => {
    await exportBlob(res.data, '审批上传模版')
    loading.value = false;
  }).catch(err=>{
    loading.value = false;
  })
}

// 上传文件前，验证是否有审批id，没有审批id需要调暂存接口，生成审批id
async function handleBeforeUpload() {
  if(props.reportId == -1) {
    const data = JSON.parse(JSON.stringify(props.form))
    data.dataStatus = 1
    const result = await add(data)
    if(result.result == 1) {
      emits('updateReportId', result.data)
      return true;
    } else {
      return false;
    }
  } else {
    return true;
  }
}

function handleExceed() {}

async function handleUpload(options) {
  uploading.value = true
  // 上传API调用
  const formData = new FormData();
  formData.append("file", options.file);
  formData.append("reportId", props.reportId);
  const res = await importData(formData);
  approvalStore.getTableData(props.reportId); // 获取订单、合同、发票等信息
  if(res.data.fieldList && res.data.fieldList.length > 0) {
    fileList.value = [];
    relationList.value = []
    originResult.value = []
    tableData.value = res.data.fieldList
    uploadFlag.value = 0
    approvalStore.setFileInfo({})
    uploading.value = false
    ElMessage.warning(res.data.result);
  } else if(res.data.relationList && res.data.relationList.length > 0) {
    fileList.value = [];
    tableData.value = []
    originResult.value = []
    relationList.value = res.data.relationList
    uploadFlag.value = 0
    approvalStore.setFileInfo({})
    uploading.value = false
    ElMessage.warning(res.data.result);
  } else if(res.data.originResult) {
    fileList.value = [];
    tableData.value = []
    relationList.value = []
    uploadFlag.value = 0
    originResult.value = res.data.result+ ':' + res.data.originResult
    approvalStore.setFileInfo({})
    ElMessage.warning(res.data.originResult);
    uploading.value = false
  } else { // 上传成功，调一下上传接口，上传文件
    fileList.value = [options.file]
    uploadFlag.value = 1
    UploadFile(options)
    uploading.value = false
    ElMessage.success("上传成功");
  }
}

async function UploadFile(options) {
  // 上传API调用
  const res = await singleuploadFileApi(options.file);
   const businessDataMaterialList = {
    fileType: 7,  // 附件
    fileUrl: res.data,
    judgeId: props.reportId
  }
  approvalStore.setFileInfo(businessDataMaterialList)
}


function handleDel() {
  let reportId = props.reportId;
  deleteDataAfterDeleteExcel({ reportId }).then(res => {
    fileList.value = []
    uploadFlag.value = -1
    approvalStore.getTableData(props.reportId); // 获取订单、合同、发票等信息
    emits('updateFileData')
  }).catch(err => {
    console.log('err------------:', err)
  })
}

function handleClose() {
  dialogVisible.value = false
}

// onMounted(() => {
//   var scrollPosition = sessionStorage.getItem('scrollPosition');
//   if (scrollPosition !== null) {
//     document.getElementsByClassName('operate-wrap')[0].scrollTo(0, parseInt(scrollPosition, 10));
//     sessionStorage.setItem('scrollPosition', null)
//   }
// })
</script>

<style scoped lang="scss">
.relation-info {
  height: 20px;
  font-family: PingFangSC, PingFang SC;
  font-weight: 400;
  font-size: 14px;
  color: #333333;
  line-height: 20px;
  text-align: left;
  font-style: normal;
  margin-bottom: 8px;
}
.file-message {
  height: 22px;
  font-family: PingFangSC, PingFang SC;
  font-weight: 400;
  font-size: 14px;
  color: #999999;
  line-height: 22px;
  font-style: normal;
}
.validate-excel-wrap {
  background: #FFFFFF;
  border-radius: 4px;
  border: 1px dashed #DDDFE8;
  padding: 24px;
  margin-top: 12px;
  margin-bottom: 32px;
}
.error-mesg {
  border: 1px dashed red;
}
.success-text {
  height: 24px;
  font-family: PingFangSC, PingFang SC;
  font-weight: 400;
  font-size: 14px;
  color: #272A31;
  line-height: 24px;
  text-align: left;
  font-style: normal;
  margin-left: 24px;
  flex:1;
  img {
    display: block;
    margin-right: 8px;
  }
}
.file-wrap {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  flex-wrap: wrap;
}
.flie-item {
  width: 48%;
  background: #F5FCFF;
  display: flex;
  align-items: center;
  padding: 20px 24px;
  margin-top: 16px;
  &:hover {
    .success {
      display: none;
    }
    .close {
      cursor: pointer;
      display: block;
    } 
  }
}
.success {
  display: block;
}
.close {
  display: none;
} 
.file-name {
  flex-grow: 1;
  font-size: 16px;
  color: #272A31;
}
.upload-msg {
  width: 477px;
  font-family: PingFangSC, PingFang SC;
  font-weight: 400;
  font-size: 14px;
  color: #BFC4CD;
  text-align: left;
  font-style: normal;
  padding-left: 16px;
}
</style>