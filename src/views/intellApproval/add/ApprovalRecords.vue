<template>
  <el-dialog v-model="visible" :before-close="handleBeforeClose" :width="600">
    <div class="dia-content">
      <m-table
        :data="tableData"
        :columns="columns"
        :scroll="scroll"
        :pagination="pagination"
        @page-change="changepage"
        @page-size-change="changePagesize"
        :bordered="false"
      >
        <template v-slot:approveName="{rowIndex}">
          <div>{{ tableData[rowIndex].organizationName}}-{{ tableData[rowIndex].approveUserName }}</div>
        </template>
        <template v-slot:fileName="{rowIndex}">
          <el-button type="text" @click="load(tableData[rowIndex]?.fileUrl, tableData[rowIndex].fileName)">{{ tableData[rowIndex].fileName}}</el-button>
        </template>
    </m-table>
    </div>
    <template #header>
      <div class="dia-header">审批记录</div>
    </template>
    <template #footer>
      <span class="dialog-footer">
        <el-button type="primary" @click="handleCancel">知道了</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
import { ref, watch } from 'vue';
import { fpspApproveDetail } from '@/api/intellApproval';
import { download } from '@/api/file'

const props = defineProps({
  showRecord: {
    type: Boolean,
    default: false
  }
})

const tableData = ref([])
const columns = ref([
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
    title: "审批意见",
    dataIndex: "approveOpinion",
    width: 180,
  },
  {
    title: "备注",
    dataIndex: "approveRemark",
    width: 180,
  },
  {
    title: "附件下载",
    dataIndex: "fileUrl",
    slotName:'fileName',
    width: 180,
  },
])
const scroll = ref({
  y: 800,
  x: 1080,
});
const pagination = ref({
  total: 0,
  pageSize: 10,
  "show-total": true,
  "show-page-size": true,
  "show-jumper": true,
});
const visible = ref(false)
const searchPar = ref({
  page_size: 10,
  page: 1,
})

const emits = defineEmits(['updateAdd'])
watch(() => props.showRecord, (newValue) => {
  visible.value = newValue;
})

function load(fileUrl: any, filename: any) {
  download({
    file_name: fileUrl
  }).then(res => {
    exportBlob(res.data,filename )
  }).catch(err=>{})
}

// 导出
function exportBlob(b, name) {
  const fileName = name
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
  emits('updateAdd', false)
}

function handleCancel (v) {
  emits('updateAdd', false)
}

function getfpspApproveDetail() {
  fpspApproveDetail(searchPar.value).then(res => {
    tableData.value = res.data;
    pagination.value.total = res.total
  }).catch(err => {})
}

getfpspApproveDetail()
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