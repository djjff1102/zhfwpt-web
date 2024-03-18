<template>
  <div>
    <el-button type="text" @click="load">在线查看world</el-button>
    <div id="wordView" v-html="vHtml"></div>
  </div>
</template>

<script setup>
import { downloadBuffer } from '@/api/file'
import mammoth from "mammoth";

const props = defineProps({
  fileUrl: {
    default: ''
  }
})

const vHtml = ref('')

function load() {
  downloadBuffer({
    file_name: props.fileUrl
  }).then(res => {
    initWord(res.data)
  }).catch(err => {})
}

function initWord(data) {
  mammoth.convertToHtml({ arrayBuffer: new Uint8Array(data) })
  .then(function (resultObject) {
    vHtml.value = resultObject.value;
  });
}
</script>