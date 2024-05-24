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
        <div v-if="uploadFlag == 2" class="success-text flex-base-start"><img src="@/assets/base/waring.svg">
          请
        <fileDownLoad :fileUrl="fpspOtherMaterials.fileUrl" :fileName="fpspOtherMaterials.fileName" btn="下载"></fileDownLoad>
          文件，修改后重新上传文件。
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
import { add, update, importData, deleteDataAfterDeleteExcel } from '@/api/intellApproval'
import { singleuploadFileApi } from "@/api/file";
import { download, templatedownload } from '@/api/file'
import { fileSave } from '@/api/intellApproval/special'
import { exportBlob, splitFiltName } from '@/utils/common'
import { useApprovalStore } from '@/store/modules/approval'

const approvalStore = useApprovalStore();

const uploading = ref(false)
const successText = '上传成功，上传信息已展示在下述列表中，可上传相关附件，其中合同和银行流水的附件必须要上传'
const acceptType = '.xlsx,.xls'
const fpspOtherMaterials = ref('') // 文件下载路径

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
      const businessDataMaterialList = {
        fileType: 7,  // 附件
        fileUrl: v[0].fileUrl,
        judgeId: props.reportId
      }
      approvalStore.setFileInfo(businessDataMaterialList)
    })
  }
}, {
  deep: true,
})

const emits = defineEmits(['updateReportId', 'updateFileData'])

const scroll = ref({
  y: 500
})
const uploadFlag = ref(-1) // -1 未上传文件，0上传有误，1上传成功, 2 上传文件有误，下载查看
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
  templatedownload({}).then(async(res) => {
    await exportBlob(res.data, '审批上传模版')
    loading.value = false;
  }).catch(err=>{
    loading.value = false;
  })
}

// 上传文件前，验证是否有审批id，没有审批id需要调暂存接口，生成审批id
// 添加一个删除判断的逻辑，重新上传前，先删除在上传，因此此时肯定有reportId
async function handleBeforeUpload() {
  if(props.reportId == -1) { 
    const data = JSON.parse(JSON.stringify(props.form))
    data.dataStatus = 1 // 暂存
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
  if(fileList.value && fileList.value.length > 0) { // 删除再上传
    await handleDel()
  }
  uploading.value = true
  // 上传API调用
  const formData = new FormData();
  formData.append("file", options.file);
  formData.append("reportId", props.reportId);
  importData(formData).then(res=>{
    let rediusReportId = res.data.reportId // 上传成功，后端缓存，返回缓存ID，接下来获取table数据通过后端缓存获取
    approvalStore.setRediusReportId(rediusReportId)
    approvalStore.getTableData(rediusReportId); // 获取订单、合同、发票等信息
    // approvalStore.getTableData(props.reportId); // 获取订单、合同、发票等信息
     if(res.data.fpspOtherMaterials) { // 字段校验错误 & 关系校验错误
        fpspOtherMaterials.value = res.data.fpspOtherMaterials
        uploadFlag.value = 2
        approvalStore.setFileInfo({})
        uploading.value = false
        ElMessage.warning(res.data.result);
      } else if(res.data.originResult) { // 文件不符合要求，请重新上传
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
  }).catch(err => {
    approvalStore.getTableData(props.reportId); // 获取订单、合同、发票等信息
    uploading.value = false
  })
}

// 将申报资料的附件上传至miniio
async function UploadFile(options) {
  // 上传API调用
  const res = await singleuploadFileApi(options.file);
  // 上传miniio成功后，存储生成的fileUrl，后面提交或暂存时的传参
  const businessDataMaterialList = {
    fileType: 7,  // 附件
    fileUrl: res.data,
    judgeId: props.reportId
  }
  approvalStore.setFileInfo(businessDataMaterialList)
  // if(res.result == 1) {
  //   fileSave({
  //     reportId: props.reportId, //'申报ID,审批ID'
  //     fileUrl: res.data, //上传附件路径
  //     fileName: splitFiltName(res.data),  //附件文件名称
  //     fileType: "7",      // 文件对应的数据类型 7为excel本身的附件
  //     // judgeCode: 0 
  //   }).then(res => {})
  // }
}
// REPORT_dd3d69a2b5be4746aa8a4ee97f2bc2d7_1793818234518593538
// 删除上传的附件
// 直接将缓存id置为空，将table清空
async function handleDel() {
  fileList.value = []
  uploadFlag.value = -1
  approvalStore.setRediusReportId('')
  approvalStore.clearTable()
  approvalStore.setFileInfo({})

  // let reportId = props.reportId;
  // await deleteDataAfterDeleteExcel({ reportId }).then(res => {
  //   fileList.value = []
  //   uploadFlag.value = -1
  //   approvalStore.setFileInfo({})
  //   approvalStore.getTableData(props.reportId); // 获取订单、合同、发票等信息
  //   emits('updateFileData')
  // }).catch(err => {
  //   console.log('err------------:', err)
  // })
}

function handleClose() {
  dialogVisible.value = false
}
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
    margin-right: 4px;
    width: 18px;
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