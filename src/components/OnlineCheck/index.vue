<template>
  <div>
    <!-- <el-button v-if="checkFileType('pdf')" type="text" @click="load('pdf')">在线查看1</el-button> -->
    <el-button v-if="checkFileType('word')" type="text" @click="load('word')">在线查看</el-button>
    <el-button v-if="checkFileType('excel')" type="text" @click="load('excel')">在线查看</el-button>
    <!-- <el-button v-if="checkFileType('img')" type="text" @click="load('img')">在线查看4</el-button> -->
    <el-dialog
        v-model="excelShow"
        width="80%"
        :before-close="handleClose"
      >
      <div class="content" v-if="type=='excel'">
         <el-table :data="excelData" style="width: 100%">
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
  padding-bottom: 24px;
}
</style>