<template>
  <div class="validate-excel">
    <div class="file-message">系统中存在申报所需订单，可通过【新增】功能进行勾选；系统中不存在申报所需订单，可手动上传</div>
    <div class="validate-excel-wrap">
      <div class="flex-base-start">
        <el-button type="text" style="margin-right: 8px">下载模版</el-button>
        <el-upload
          :before-upload="handleBeforeUpload"
          :http-request="handleUpload"
          :accept="acceptType"
          :on-exceed="handleExceed"
          :limit="1"
          :show-file-list="false"
        >
          <div class="flex-base-start">
            <w-button type="primary">上传文件</w-button>
          </div>
        </el-upload>
        <!-- <InfoUpload  
          @updateUpload="updateUpload"
          :file="fileList"
          :showText="false"
          maxUploadCount="1"
          :acceptType="acceptType"
        ></InfoUpload> -->
        <!-- <div class="success-text flex-base-start"><img src="@/assets/base/success.svg">{{ successText }}</div> -->
        <div class="success-text flex-base-start"><img src="@/assets/base/waring.svg">
          请查看<el-button type="text" @click="dialogVisible = true">错误信息</el-button>，修改后重新上传文件。
        </div>
      </div>

      <div class="file-wrap">
        <div class="flie-item" v-for="(item) in fileList" :key="item.name">
          <img src="@/assets/base/file.png">
          <div class="file-name">{{ item }}</div>
          <img class="close" style="width: 20px" src="@/assets/base/cha.png" @click="handleDel"/> 
          <img class="success" style="width: 20px" src="@/assets/base/right.png">
        </div>
      </div>
    </div>

    <el-dialog
      title="错误信息"
      v-model="dialogVisible"
      width="60%"
      :before-close="handleClose"
    >
    <div style="padding: 24px">
      <m-table
        style="height: 100%"
        :data="tableData"
        :columns="columns"
        :scroll="false"
        :pagination="false"
        :bordered="false"
      >
        <template v-slot:index="{ $index }">
          {{ $index + 1 }}
        </template>
      </m-table>
    </div>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import InfoUpload from './InfoUpload.vue'
import { add, importData  } from '@/api/intellApproval'
import { splitFiltName } from '@/utils/common'

const successText = '上传成功，上传信息已展示在下述列表中，可上传相关附件，其中合同和银行流水的附件必须要上传'
const acceptType = '.xlsx,.xls'

const props = defineProps({
  form: {
    default: {}
  },
  reportId: {
    default: -1
  }
})

const emits = defineEmits(['updateReportId'])

const fileList = ref([])
const dialogVisible = ref(false)
const tableData = ref([
  {name: 'test'}
])
const columns = reactive([
  {
    title: "序号",
    width: 80,
    slotName: "index",
    fixed: "left",
  },
  {
    title: "错误位置",
    dataIndex: "name",
    width: 180,
    fixed: "left",
  },
   {
    title: "错误字段",
    dataIndex: "name",
    width: 180,
    fixed: "left",
  },
  {
    title: "错误内容",
    dataIndex: "name",
    width: 180,
    fixed: "left",
  }
])

async function handleBeforeUpload() {
  if(props.reportId == -1) {
    const data = JSON.parse(JSON.stringify(props.form))
    data.dataStatus = 1
    const result = await add(data)
    console.log('result=----------------:', result)
    if(result.result == 1) {
      //TODO: 更新id
      emits('updateReportId', 111)
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
  // 上传API调用
  const formData = new FormData();
  formData.append("file", options.file);
  formData.append("reportId", props.reportId);
  const res = await importData(formData);
  // allFileList.value.push(res.data);
  let name = splitFiltName(res.data)
  fileList.value.push(name)
}

function handleDel() {
  fileList.value = []
}

function handleClose() {
  dialogVisible.value = false
}
</script>

<style scoped lang="scss">
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