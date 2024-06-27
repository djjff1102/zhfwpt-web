<template>
  <div>
    <el-upload
      :before-upload="handleBeforeUpload"
      :http-request="handleUpload"
      :on-exceed="handleExceed"
      accept=".doc,.docx,.pdf,.png,.jpg,.jpeg,.gif,.zip,.ppt,.pptx,.xlsx,.xls"
      :limit="5"
      :show-file-list="false"
      multiple
    >
      <div class="flex-base-start upload-flex">
        <w-button plain>
          <template #icon><i class="iconfont icon-shangchuan"></i></template>
          <template #default>上传文件</template>
          <!-- <img src="@/assets/upload/up.png" class="upload-img">上传文件 -->
        </w-button>
        <div class="upload-msg">支持上传的文件格式包含：pdf、png、gif、zip、ppt、xlsx、doc、docx等。单个文件上传不超过100M；最多支持上传5个。</div>
      </div>
      
    </el-upload>
    <div class="file-wrap">
      <div class="flie-item" v-for="(item, i) in fileList" :key="item.name">
        <img class="file-normal" src="@/assets/upload/file.png" style="width: 18px">
        <img class="file-active" src="@/assets/upload/file-del.png" style="width: 18px">
        <div class="file-name">{{ item }}</div>
        <delete style="width: 1em; height: 1em; margin-right: 8px;" @click="handleDel(i)"/>
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
.upload-flex {
  align-items: flex-start;
}
.file-wrap {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  flex-wrap: wrap;
}
.flie-item {
  padding: 0 8px;
  width: 100%;
  display: flex;
  align-items: center;
  border-radius: 2px;
  margin-top: 12px;
  cursor: pointer;
  .file-active {
    display: none;
  }
  .file-name {
    width: 260px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    padding-left: 8px;
  }
  &:hover {
    .file-normal {
      display: none;
    }
    .file-active {
      display: block;
    }
    background: #F4F4F5;
    color: rgba(247, 97, 97, 1);
    .file-name {
      color: rgba(247, 97, 97, 1);
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
  width: 420px;
  font-family: PingFangSC, PingFang SC;
  font-weight: 400;
  font-size: 14px;
  color: #BFC4CD;
  text-align: left;
  font-style: normal;
  padding-left: 16px;
  line-height: 18px;
}
.w-button {
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