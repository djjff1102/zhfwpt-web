<template>
 <div class="file-wrap">
    <div class="flie-item" v-for="(item, i) in file" :key="i">
      <img src="@/assets/base/file.png">
      <div class="file-name">{{ item.fileName }}</div>
      <Online-check :fileUrl="item.fileUrl"></Online-check>
      <!-- <online-excel :fileUrl="item.fileUrl"></online-excel>
      <online-word :fileUrl="item.fileUrl"></online-word>
      <online-pdf :fileUrl="item.viewFileUrl"></online-pdf> -->
      <!-- <el-button type="text" @click="checkFile(item)">在线查看</el-button> -->
      <span class="file-load" type="text" @click="load(item)">下载</span>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { download } from '@/api/file'

const pros = defineProps({
  file: {
    default: []
  }
})


function checkFile(item) {}

function load(item) {
  download({
    file_name: item.fileUrl
  }).then(res => {
    exportBlob(res.data, item.fileName)
  }).catch(err=>{})
}

// 导出
function exportBlob(b,name) {
  const fileName =name
  const typeValue = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';
  const blob = new Blob([b.data], { type: typeValue});
  const a = document.createElement('a');
  a.download = fileName;
  a.href = URL.createObjectURL(blob);
  a.style.display = 'none';
  document.body.appendChild(a);
  a.click();
  URL.revokeObjectURL(a.href);
  document.body.removeChild(a);
}


</script>

<style scoped lang="scss">
.file-load {
  width: 28px;
  height: 20px;
  font-family: PingFangSC, PingFang SC;
  font-weight: 400;
  font-size: 14px;
  color: #BFC4CD;
  line-height: 20px;
  text-align: left;
  font-style: normal;
  display: block;
  margin-left: 16px;
  cursor: pointer;
}
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

