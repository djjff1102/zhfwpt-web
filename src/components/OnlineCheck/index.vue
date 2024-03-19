<template>
  <div>
    <el-image
    v-if="checkFileType('img')"
    alt="img"
    style="width: 100px; height: 100px"
    src="@/assets/iconfont/close.png"
    :preview-src-list="[viewFileUrl]"
  ></el-image>
    <el-button v-if="checkFileType('pdf')" type="text" @click="load('pdf')">在线查看1</el-button>
    <el-button v-if="checkFileType('word')" type="text" @click="load('word')">在线查看</el-button>
    <el-button v-if="checkFileType('excel')" type="text" @click="load('excel')">在线查看</el-button>
    <el-button v-if="checkFileType('img')" type="text" @click="loadImg('img')">在线查看4</el-button>
    <el-dialog
        v-model="excelShow"
        width="100%"
        :fullscreen="true"
        :before-close="handleClose"
      >
      <div class="content" v-if="type=='excel'">
         <el-table :data="excelData" style="width: 1400px">
            <el-table-column
                v-for="(value, key, index) in excelData[2]"
                :key="index"
                :prop="key"
                :label="key"
            ></el-table-column>
        </el-table>
      </div>
      <div class="content" v-if="type=='word'">
        <div id="wordView" v-html="vHtml"></div>
      </div>
      <div class="content" v-if="type=='img'">
        <img :src="viewFileUrl">
      </div>
      <template #header>
       <div style="padding-top: 16px;">在线查看</div>
      </template>
        <!-- <template #footer>
          <span class="dialog-footer">
            <el-button @click="dialogVisible = false">关闭</el-button>
          </span>
        </template> -->
      </el-dialog>
  </div>
</template>

<script setup>
import { downloadBuffer } from '@/api/file'
import * as XLSX from "xlsx"
import mammoth from "mammoth";
import { fileType } from './type'

const props = defineProps({
  fileUrl: {
    default: ''
  },
  viewFileUrl: {
    default: ''
  }
})
const excelShow = ref(false)
const excelData = ref([])
const type = ref('')
const vHtml = ref()

function checkFileType(n) {
  const t = props.fileUrl.toLowerCase().split('.').pop();
  if(fileType[n].includes(t)) {
    type.value = n
    return true
  } else {
    return false
  }
}

function handleClose() {
  excelShow.value = false
}
function loadImg() {
  excelShow.value = true
}

function load(type) {
  downloadBuffer({
    file_name: props.fileUrl
  }).then(res => {
    if(type == 'word') {
      initWord(res.data)
    } else if(type == 'excel') {
      exportExcel(res.data)
    }
  })
}

function initWord(data) {
  excelShow.value = true
  mammoth.convertToHtml({ arrayBuffer: new Uint8Array(data) })
  .then(function (resultObject) {
    vHtml.value = resultObject.value;
  });
}

function exportExcel(d) {
  excelShow.value = true
  var data = new Uint8Array(d);
  var excel = XLSX.read(data, { type: "array" });
  var sheetNames = excel.SheetNames; // 工作表名称集合
  var worksheet = excel.Sheets[sheetNames[0]];
  excelData.value = XLSX.utils.sheet_to_json(worksheet)
}
</script>

<style lang="scss" scoped>
.content {
  display: flex;
  justify-content: center;
  padding: 24px;
  img {
    max-width: 1400px;
  }
}

:deep(.el-dialog) {
  background: rgba(0,0,0,0);
}
:deep(.el-dialog__header) {
  border: none;
  height: 110px;
}
:deep(.el-dialog__headerbtn) {
  width: 40px;
  height: 40px;
  background: rgba(0,0,0,0.5);
  border-radius: 50%;
  font-size: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 24px;;
}
:deep(.el-dialog__body) {
  height: calc(100vh - 120px);
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>