<!--
  多图上传组件
  @author: anonymity
  @date 2022/11/20
-->

<template>
  <el-upload
    :before-upload="handleBeforeUpload"
    :http-request="handleUpload"
    accept="'.pdf,.png,.jpg,.jpeg,.gif,.zip,.ppt,.pptx,.xlsx,.xls,.doc,.docx'"
    :limit="1"
    :show-file-list="false"
  >
    <el-button type="text">附件</el-button>
  </el-upload>
</template>

<script setup lang="ts">
import {
  UploadRawFile,
  UploadRequestOptions
} from "element-plus";
import { singleuploadFileApi } from "@/api/file";
import { splitFiltName } from '@/utils/common'

// const props = defineProps({
//   row: {
//     default: {}
//   }
// })

const emit = defineEmits(['updateUpload']);

const fileList = ref<string[]>([]);
const allFileList = ref<string[]>([])


/**
 * 自定义图片上传
 *
 * @param params
 */
async function handleUpload(options: UploadRequestOptions): Promise<any> {
  // 上传API调用
  singleuploadFileApi(options.file).then(res => {
    allFileList.value.push(res.data);
    let name = splitFiltName(res.data)
    fileList.value.push(name)
    ElMessage.success(`附件${name}上传成`);
    emit('updateUpload', allFileList.value[0])
  }).catch(err => {
    ElMessage.error(`附件上失败`);
  })

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
</style>