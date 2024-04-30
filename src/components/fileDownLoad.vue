<template>
    <el-button :loading="loading" type="text" @click="load(fileUrl, fileName)"> {{ fileName }}</el-button>
</template>

<script setup>
import { download } from '@/api/file'
import { ref } from 'vue'
import { exportBlob } from '@/utils/common'

const loading = ref(false)

const props = defineProps({
  fileUrl: {
    default: ''
  },
  fileName: {
    default: ''
  }
})

async function load(fileUrl, fileName) {
  if(loading.value) return;
  loading.value = true;
  download({
    file_name: fileUrl
  }).then(async(res) => {
    await exportBlob(res.data, fileName)
    loading.value = false;
  }).catch(err=>{
    loading.value = false;
  })
}
</script>

<style scoped>
.file-load{
  cursor: pointer;
}
</style>
