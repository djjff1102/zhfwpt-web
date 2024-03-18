<template>
  <div>
    <el-button @click="load">在线查看excel</el-button>
    <el-dialog
        title="提示"
        v-model="excelShow"
        width="30%"
        :before-close="handleClose"
      >
        <el-table :data="excelData" style="width: 100%">
          <el-table-column
              v-for="(value, key, index) in excelData[2]"
              :key="index"
              :prop="key"
              :label="key"
          ></el-table-column>
      </el-table>
        <template #footer>
          <span class="dialog-footer">
            <el-button @click="dialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
          </span>
        </template>
      </el-dialog>
  </div>
</template>

<script setup>
import { downloadBuffer } from '@/api/file'
// import XLSX from "xlsx";
import * as XLSX from "xlsx" 

const props = defineProps({
  fileUrl: {
    default: ''
  }
})

const excelShow = ref(false)
const excelData = ref([])

function handleClose() {}

function load() {
  downloadBuffer({
    file_name: props.fileUrl
  }).then(res => {
    exportExcel(res.data)
  })
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