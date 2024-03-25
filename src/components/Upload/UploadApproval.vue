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
        <el-button plain>
          <template #icon><i class="iconfont icon-shangchuan"></i></template>
          <template #default>上传文件</template>
          <!-- <img src="@/assets/upload/up.png" class="upload-img">上传文件 -->
        </el-button>
        <div class="upload-msg">支持上传的文件格式包含：pdf、png、gif、zip、ppt、xlsx、doc、docx等。单个文件上传不超过100M；最多支持上传5个。</div>
      </div>
      
    </el-upload>
    <div class="file-wrap">
      <div class="flie-item" v-for="(item, i) in fileList" :key="item.name">
        <img src="@/assets/upload/file.png" style="width: 18px">
        <div class="file-name">{{ item }}</div>
        <img class="close" style="width: 20px" src="../../assets/base/cha.png" @click="handleDel(i)"/> 
        <img class="success" style="width: 20px" src="../../assets/base/right.png">
      </div>
    </div>
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
import { singleuploadFileApi} from "@/api/file";
import { splitFiltName } from '@/utils/common'

const emit = defineEmits(['updateUpload']);

const props = defineProps({
  /**
   * 文件上传数量限制
   */
  limit: {
    type: Number,
    default: 2,
  },
  file: {
    default: []
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
  let name = splitFiltName(res.data)
  fileList.value.push(name)
  emit('updateUpload', allFileList.value)
}

/**
 * 限制用户上传文件的格式和大小
 */
function handleBeforeUpload(file: UploadRawFile) {
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
  width: 80%;
  display: flex;
  align-items: center;
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
  font-size: 14px;
  color: #3470FF;
  font-weight: 400px;
}
.upload-msg {
  width: 350px;
  font-family: PingFangSC, PingFang SC;
  font-weight: 400;
  font-size: 14px;
  color: #BFC4CD;
  text-align: left;
  font-style: normal;
  padding-left: 16px;
}
.el-button {
  height: 32px;
  width: 110px;
}
.upload-img {
  width: 18px;
  display: block;
  margin-right: 6px;
  margin-bottom: 2px;
}
</style>