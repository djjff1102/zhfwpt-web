<template>
 <div class="file-wrap">
    <div class="flie-item" v-for="(item, i) in file" :key="i">
      <img src="@/assets/base/file.png">
      <div class="file-name">{{ item.fileName || (item.fileUrl && splitFiltName(item.fileUrl)) }}</div>
      <!-- <el-tooltip
        class="item"
        effect="dark"
        :content="item.fileName"
        placement="top-start"
      >
        <div class="file-name">...{{ item.fileName.substr(-15) }}</div>
      </el-tooltip> -->
      
      <Online-check :fileUrl="item.fileUrl" :viewFileUrl="item.viewFileUrl"></Online-check>
      <!-- <div class="file-load" type="text" @click="load(item)"> -->
      <el-button :loading="loading && curLoadId == i" type="text" @click="load(item, i)" style="width: 80px">下载</el-button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { download } from '@/api/file'
import { exportBlob, splitFiltName } from '@/utils/common'

const pros = defineProps({
  file: {
    default: []
  }
})

const loading = ref(false)
const curLoadId = ref(-1)

async function load(item, i) {
  if(loading.value) return;
  loading.value = true;
  curLoadId.value = i
  download({
    file_name: item.fileUrl
  }).then(async(res) => {
    await exportBlob(res.data, item.fileName)
    loading.value = false;
  }).catch(err=>{
    loading.value = false;
  })
}

// 导出
// function exportBlob(b,name) {
//   const fileName = name
//   const a = document.createElement('a');
//   a.download = fileName;
//   a.href = URL.createObjectURL(b);
//   a.style.display = 'none';
//   document.body.appendChild(a);
//   a.click();
//   URL.revokeObjectURL(a.href);
//   document.body.removeChild(a);
//   loading.value = false;
// }

</script>

<style scoped lang="scss">
.file-load {
  flex-shrink: 0;
  display: flex;
  align-items: center;
  width: 60px;
  height: 20px;
  font-family: PingFangSC, PingFang SC;
  font-weight: 400;
  font-size: 14px;
  color: #BFC4CD;
  line-height: 20px;
  text-align: left;
  font-style: normal;
  margin-left: 16px;
  cursor: pointer;
  &:hover {
    opacity: 0.8;
  }
}
.file-wrap {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  flex-wrap: wrap;
}
.flie-item {
  width: 45%;
  background: #F5FCFF;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px 24px;
  margin-top: 16px;
  flex-wrap: wrap;
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
  padding-left: 24px;
  width: 300px;
  flex-grow: 1;
  font-size: 16px;
  color: #272A31;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
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

