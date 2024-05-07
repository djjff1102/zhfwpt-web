<template>
  <div>
    <w-button style="margin-right: 8px;" @click="visible = true">审批记录</w-button>
    <el-dialog v-model="visible" :before-close="handleBeforeClose" :width="1200">
        <div class="dia-content">
          <m-table
            :data="tableData"
            :columns="columns"
            :pagination="pagination"
            @page-change="changepage"
            @page-size-change="changePagesize"
            :bordered="false"
          >
            <template v-slot:index="{rowIndex}">
                <div>{{ rowIndex + 1 }}</div>
            </template> 
            <template v-slot:approveName="{rowIndex}">
              <div>{{ tableData[rowIndex].organizationName}}-{{ tableData[rowIndex].approveUserName }}</div>
            </template>
            <template v-slot:approveResultSlot="{rowIndex}">
              <div>{{ approveStatus[tableData[rowIndex].approveResult] }}</div>
            </template>
            <template v-slot:fileName="{rowIndex}">
              <el-button
                :loading="curLoadIndex == i && curLoadRowIndex == rowIndex && loading"
                v-for="(item, i) in tableData[rowIndex]?.fileNames"
                :key="item"
                type="text"
                @click="load(tableData[rowIndex]?.fileUrls[i], item, i, rowIndex)"
                >{{ getFileName(item) }}</el-button>
            </template>
        </m-table>
        </div>
        <template #header>
          <div class="dia-header">审批记录</div>
        </template>
        <template #footer>
          <span class="dialog-footer">
            <w-button type="primary" @click="handleCancel">知道了</w-button>
          </span>
        </template>
      </el-dialog>
  </div>
</template>

<script lang="ts" setup>
import { ref, watch } from 'vue';
import { fpspApproveDetail } from '@/api/intellApproval';
import { download } from '@/api/file'
import { approveStatus } from '../type'

const props = defineProps({
  showRecord: {
    type: Boolean,
    default: false
  },
  reportId: {
    type: String,
    default: ''
  }
})

watch( () => props.reportId, (v) => {
  if(v && v!= '-1') {
    getfpspApproveDetail()
  }
})

const loading = ref(false)
const curLoadIndex = ref(-1) // 当前正在下载的index
const curLoadRowIndex = ref(-1) // 当前正在下载的行index
const tableData = ref([])
const columns = ref([
  {
    title: "序号",
    width: 80,
    slotName: "index",
    // fixed: "left",
  },
  {
    title: "审批人",
    dataIndex: "approveUserName",
    slotName: 'approveName',
    width: 200,
  },
  {
    title: '审批时间',
    dataIndex: 'approveDate',
    width: 180,
  },
  {
    title: '审批状态',
    dataIndex: 'approveResult',
    slotName: 'approveResultSlot',
    width: 180,
  },
  {
    title: "审批意见",
    dataIndex: "approveOpinion",
    ellipsis: true,
    width: 240,
    tooltip: {position: 'left'},
  },
  {
    title: "备注",
    dataIndex: "approveRemark",
    ellipsis: true,
    width: 240,
    tooltip: {position: 'left'},
  },
  {
    
    title: "附件下载",
    dataIndex: "fileUrl",
    slotName:'fileName',
    fixed: "right",
    width: 240,
  },
])
const pagination = ref({
  total: 0,
  pageSize: 10,
  "show-total": true,
  "show-jumper": true,
});
const visible = ref(false)
const searchPar = ref({
  page_size: 10,
  page: 1,
  reportId: ''
})

const emits = defineEmits(['updateAdd'])

function getFileName(fullFileName: string) {
  if(fullFileName.length > 12) {
    const fileName = fullFileName.substring(0, 6);
    const fileExtension = fullFileName.substring(fullFileName.lastIndexOf('.'));
    return fileName + '...' + fileExtension;
  } else {
    return fullFileName
  }
}

function load(fileUrl: any, filename: any, i: any, rowIndex: any) {
  if(loading.value) return
  loading.value = true
  curLoadIndex.value = i
  curLoadRowIndex.value = rowIndex
  download({
    file_name: fileUrl
  }).then(res => {
    exportBlob(res.data,filename )
    loading.value = false
    curLoadIndex.value = -1
    curLoadRowIndex.value = -1
  }).catch(err=>{
    loading.value = false
    curLoadIndex.value = -1
    curLoadRowIndex.value = -1
  })
}

// 导出
function exportBlob(b, name) {
  const fileName = name
  const typeValue = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';
  const blob = new Blob([b], { type: typeValue});
  const a = document.createElement('a');
  a.download = fileName;
  a.href = URL.createObjectURL(blob);
  a.style.display = 'none';
  document.body.appendChild(a);
  a.click();
  URL.revokeObjectURL(a.href);
  document.body.removeChild(a);
}

const changePagesize = (v) => {
  pagination.value.pageSize = v;
  searchPar.value.page = 1;
  searchPar.value.page_size = v;
  getfpspApproveDetail();
};

const changepage = (v) => {
  searchPar.value.page = v;
  getfpspApproveDetail();
};


async function handleBeforeClose(done) {
  await done()
  // visible.value = false
}

function handleCancel (v) {
  visible.value = false
}

function getfpspApproveDetail() {
  if(loading.value) return 
  loading.value = true
  searchPar.value.reportId = props.reportId as any
  fpspApproveDetail(searchPar.value).then(res => {
    tableData.value = res.data as any;
    pagination.value.total = res.total as any
    loading.value = false
  }).catch(err => {
    loading.value = false
  })
}
</script>

<style lang="scss" scoped>
.dia-content {
  padding: 12px 24px;
}
.dia-header {
  font-family: PingFangSC, PingFang SC;
  font-weight: 600;
  font-size: 18px;
  color: #383B40;
  line-height: 48px;
  text-align: left;
}
</style>