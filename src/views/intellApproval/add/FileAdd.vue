<template>
  <div>
    <w-button type="primary" style="margin-right: 8px;" @click="visible = true">新增</w-button>
    <w-modal v-model:visible="visible" @ok="handleBeforeClose" ok-text="知道了" :hide-cancel="true" :width="1800">
      <template #title>
        详情
      </template>
      <div class="detail-describe">
        注：选择订单信息，合同、发票、银行流水、仓储、物流数据自动被选择。若数据无法勾选，请查看“数据情况”字段中的说明。如需调整请在本企业的业务系统中调整，调整完的内容会自动同步到本系统
      </div>
      <div class="search_box">
        <el-form :model="searchPar" :inline="true" class="demo-form-inline">
          <el-form-item field="code" label="订单编号">
            <el-input v-model="searchPar.code" placeholder="请输入订单编号" clearable/>
          </el-form-item>
          <el-form-item class="mr-16px" field="buyer" label="买方名称">
            <el-input v-model="searchPar.buyer" placeholder="请输入买方名称" clearable/>
          </el-form-item>
          <el-form-item>
            <w-button type="primary" class="mr-8px" @click="search">搜索</w-button>
            <w-button @click="reset">重置</w-button>
          </el-form-item>
        </el-form>
      </div>
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
      </m-table>  
    </w-modal>
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
const columns = reactive([
  {
    title: "序号",
    width: 80,
    slotName: "index",
    // fixed: "left",
  },
  {
    title: "订单编号",
    // fixed: "left",
    dataIndex: "code",
    width: 200,
    ellipsis: true,
    tooltip: {position: 'left'},
  },
  {
    title: "订单创建日期",
    dataIndex: "orderCreateDate",
    width: 180,
    ellipsis: true,
    tooltip: {position: 'left'},
  },
  {
    title: "商品类别",
    dataIndex: "goodType",
    width: 180,
    ellipsis: true,
    tooltip: {position: 'left'},
  },
  {
    title: "买方名称",
    dataIndex: "buyerCompanyName",
    width: 220,
    ellipsis: true,
    tooltip: {position: 'left'},
  },
  {
    title: "买方信用代码",
    dataIndex: "buyerCreditNo",
    width: 220,
    ellipsis: true,
    tooltip: {position: 'left'},
  },
  {
    title: "卖方名称",
    dataIndex: "sellerCompanyName",
    width: 220,
    ellipsis: true,
    tooltip: {position: 'left'},
  },
  {
    title: "卖方信用代码",
    dataIndex: "sellerCreditNo",
    width: 220,
    ellipsis: true,
    tooltip: {position: 'left'},
  },
  {
    title: "商品所在地址",
    dataIndex: "goodAddress",
    width: 220,
    ellipsis: true,
    tooltip: {position: 'left'},
  },
  {
    title: "仓库名称",
    dataIndex: "warehouseName",
    width: 220,
    ellipsis: true,
    tooltip: {position: 'left'},
  },
  {
    title: "总金额",
    dataIndex: "totalMoney",
    width: 220,
    ellipsis: true,
    slotName: "moneySlot",
    tooltip: {position: 'left'},
  },
  {
    title: "附件",
    dataIndex: "material",
    width: 120,
    slotName: 'materialslot',
    fixed: "right",
  },
  {
    title: "操作",
    dataIndex: "operations",
    slotName: "operations",
    width: 220,
    fixed: "right",
  },
]);

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
  code: '', // 订单编号
  buyer: '' // 买方名称
})

const emits = defineEmits(['updateAdd'])

// 搜索
function search() {

}

// 重置
function reset() {

}

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

const changePagesize = (v: any) => {
  pagination.value.pageSize = v;
  searchPar.value.page = 1;
  searchPar.value.page_size = v;
  getfpspApproveDetail();
};

const changepage = (v: any) => {
  searchPar.value.page = v;
  getfpspApproveDetail();
};


async function handleBeforeClose(done: any) {
  await done()
  // visible.value = false
}

function handleCancel () {
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
.detail-describe {
  margin-bottom: 12px;
}
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