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
      :on-exceed="handleExceed"
      :limit="5"
      :show-file-list="false"
      multiple
    >
      <div class="flex-base-start ">
        <w-button type="primary">上传文件</w-button>
        <div class="upload-msg">支持上传的文件格式包含：pdf、png、gif、zip、ppt、xlsx、doc、docx等。单个文件上传不超过100M；最多支持上传5个。</div>
      </div>
      
    </el-upload>
    <div class="file-wrap">
      <div class="flie-item" v-for="(item, i) in fileList" :key="item">
        <img src="../../assets/base/file.png">
        <div class="file-name">{{ item }}</div>
        <img class="close" style="width: 20px" src="../../assets/base/cha.png" @click="handleDel(i)"/> 
        <img class="success" style="width: 20px" src="../../assets/base/right.png">
      </div>
    </div>
  </div>
    
  <!-- <el-dialog v-model="dialogVisible">
    <img w-full :src="previewImgUrl" alt="Preview Image" />
  </el-dialog> -->
</template>

<script setup lang="ts">
import {
  UploadRawFile,
  UploadRequestOptions,
  UploadUserFile,
  UploadFile,
  UploadProps,
} from "element-plus";
import { uploadFileApi, deleteFileApi, singleuploadFileApi} from "@/api/file";

const emit = defineEmits(['updateUpload']);

const props = defineProps({
  /**
   * 文件路径集合
   */
  modelValue: {
    type: Array<string>,
    default: () => [],
  },
  /**
   * 文件上传数量限制
   */
  limit: {
    type: Number,
    default: 2,
  },
});

const dialogVisible = ref(false);

const fileList = ref([] as UploadUserFile[]);
const allFileList = ref([])
watch(
  () => props.modelValue,
  (newVal: string[]) => {
    const filePaths = fileList.value.map((file) => file.url);
    // 监听modelValue文件集合值未变化时，跳过赋值
    if (
      filePaths.length > 0 &&
      filePaths.length === newVal.length &&
      filePaths.every((x) => newVal.some((y) => y === x)) &&
      newVal.every((y) => filePaths.some((x) => x === y))
    ) {
      return;
    }

    fileList.value = newVal.map((filePath) => {
      return { url: filePath } as UploadUserFile;
    });
  },
  { immediate: true }
);

function handleDel(i: any) {
  fileList.value.splice(i, 1)
  allFileList.value.slice(i, 1)
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
async function handleUpload(options: UploadRequestOptions, f): Promise<any> {
  // 上传API调用
  const res = await singleuploadFileApi(options.file);
  allFileList.value.push(res.data);
  let name = res.data.split('@quesoar@')[1]
  fileList.value.push(name)
  emit('updateUpload', allFileList.value)
}

/**
 * 限制用户上传文件的格式和大小
 */
function handleBeforeUpload(file: UploadRawFile) {
  if (file.size > 2 * 1048 * 1048) {
    ElMessage.warning("上传图片不能大于2M");
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