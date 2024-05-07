<template>
  <div>
    <div v-if="!row.material">未上传</div>
    <el-button type="text" v-if="row.material" @click="load(row.material)">下载</el-button>
    <el-button type="danger" link v-if="row.material" @click="del">删除</el-button>
    <!-- <div class="file-load" v-if="row?.material?.judgeCode == '1'" style="color: green" @click="load(row.material)">
        {{ row?.material.fileName}}</div> -->
  </div>
</template>

<script setup>
import { download } from '@/api/file'
import { fileSave } from '@/api/intellApproval/special'
import { ref } from 'vue'
import { exportBlob } from '@/utils/common'
import { useApprovalStore } from '@/store/modules/approval'
const approvalStore = useApprovalStore();
const loading = ref(false)

const props = defineProps({
  row: {
    default: {}
  },
  type: {
    deafault: ''
  },
  reportId: {
    deafault: ''
  }
})

// 删除附件
async function del() {
  const data = {
    reportId: props.reportId,
    judgeId: props.row.id,
    isDelete: 1,
    fileType: props.type, // 文件对应的数据类型，0为其他材料，1为订单，2为合同，3为发票，4为银行流水，5为仓储，6为物流
  }
  fileSave( data ).then(res => {
    approvalStore.setListData( props.type)
  }).catch(err => {
    ElMessage.success("附件删除失败");
  })
}

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
