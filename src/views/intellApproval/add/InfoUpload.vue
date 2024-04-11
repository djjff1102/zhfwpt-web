<!--
  多图上传组件
  @author: anonymity
  @date 2022/11/20
-->

<template>
  <div>
    <el-upload
      :before-upload="handleBeforeUpload"
      :http-request="handleUpload"
      :accept="acceptType"
      :on-exceed="handleExceed"
      :limit="limit"
      :show-file-list="false"
      multiple
    >
      <div class="flex-base-start ">
        <w-button type="primary">上传文件</w-button>
      </div>
    </el-upload>
  </div>
</template>

<script setup lang="ts">
import {
  UploadRawFile,
  UploadRequestOptions,
  UploadUserFile,
  UploadFile,
  UploadProps,
} from "element-plus";
import { importData } from "@/api/intellApproval";
import { splitFiltName } from '@/utils/common'

const emit = defineEmits(['updateUpload']);

const props = defineProps({
  /**
   * 文件上传数量限制
   */
  limit: {
    type: Number,
    default: 1,
  },
  file: {
    default: []
  },
  showText: {
    default: true
  },
  acceptType: {
    default: '.pdf,.png,.jpg,.jpeg,.gif,.zip,.ppt,.pptx,.xlsx,.xls,.doc,.docx'
  }
});

const dialogVisible = ref(false);

const fileList = ref<string[]>([]);
const allFileList = ref<string[]>([]);
watch(
  () => props.file,
  (newVal: string[]) => {
 init()
  },
  { immediate: true }
);

function init() {
  let arr:string[]= []
  let all: string[] = []
  props.file.forEach(item => {
    arr.push(item?.fileName)
    all.push(item?.fileUrl)
  })
  fileList.value = arr
  allFileList.value = all
}

function handleDel(i: any) {
  fileList.value.splice(i, 1)
  allFileList.value.splice(i, 1)
  emit('updateUpload', allFileList.value)
}

async function handleExceed() {
  if(fileList.value.length > 5){
    ElMessage.warning("最多上传5个文件");
    return false;
  }
}
/**
 * 自定义图片上传
 *
 * @param params
 */
async function handleUpload(options: UploadRequestOptions): Promise<any> {
  // 上传API调用
  const formData = new FormData();
  formData.append("file", options.file);
  formData.append("reportId", '1111');
  const res = await importData(formData);
  allFileList.value.push(res.data);
  let name = splitFiltName(res.data)
  fileList.value.push(name)
  emit('updateUpload', allFileList.value)
}

/**
 * 限制用户上传文件的格式和大小
 */
function handleBeforeUpload(file: UploadRawFile) {
  console.log('fileUpload--num:', file)
  if (file.size > 100 * 1024 * 1024) {
    ElMessage.warning("上传文件不能大于100M");
    return false;
  }
  return true;
}

</script>

<style lang="scss" scoped>
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