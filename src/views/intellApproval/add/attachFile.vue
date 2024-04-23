<template>
  <div>
    <div v-if="!row.material">未上传</div>
    <el-button type="text" v-else @click="load(row.material)"> {{ row?.material.fileName}}</el-button>
    <!-- <div class="file-load" v-if="row?.material?.judgeCode == '1'" style="color: green" @click="load(row.material)">
        {{ row?.material.fileName}}</div> -->
  </div>
</template>

<script setup>
import { download } from '@/api/file'
import { ref } from 'vue'
import { exportBlob } from '@/utils/common'

const loading = ref(false)

const props = defineProps({
  row: {
    default: {}
  }
})

async function load(item) {
  if(loading.value) return;
  loading.value = true;
  download({
    file_name: item.fileUrl
  }).then(async(res) => {
    await exportBlob(res.data, item.fileName)
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
