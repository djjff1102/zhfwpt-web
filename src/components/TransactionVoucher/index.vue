<template>
  <!-- 合同 -->
  <div>
    <div v-if="companyName" class="search_box">
      <el-form :model="searchPar" :inline="true" class="demo-form-inline">
        <el-form-item field="code" label="合同编号">
          <el-input v-model="searchPar.code" placeholder="请输入合同编号" clearable/>
        </el-form-item>
        <el-form-item class="mr-16px" field="partyA" label="甲方">
          <el-input v-model="searchPar.partyA" placeholder="请输入关键字" clearable/>
        </el-form-item>
        <el-form-item class="mr-16px" field="partyB" label="乙方">
          <el-input v-model="searchPar.partyB" placeholder="请输入关键字" clearable/>
        </el-form-item>
        <el-form-item class="mr-16px" field="post" label="签订日期">
          <el-date-picker
              v-model="curDate"
              type="daterange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              format="YYYY-MM-DD"
              @change="onChange"
            >
          </el-date-picker>
        </el-form-item>
        <el-form-item>
          <w-button type="primary" class="mr-8px" @click="search">搜索</w-button>
          <w-button @click="reset">重置</w-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="table-warp">
      <m-table
        style="height: 100%"
        :data="tableData"
        :columns="columns"
        :scroll="scroll"
        :pagination="pagination"
        @page-change="changepage"
        @page-size-change="changePagesize"
        :bordered="false"
      >
        <template v-slot:index="{ rowIndex }">
          {{ rowIndex + 1 }}
        </template>
        <template v-slot:amountSlot="{ rowIndex }">
          {{ tableData[rowIndex].currency }}{{ formatNumber(tableData[rowIndex].amount) }}{{ tableData[rowIndex].amountUnit }}
        </template>
        <template v-slot:operations="{ rowIndex }">
          <!-- <el-button
            v-if="tableData[rowIndex]?.material?.fileUrl"
            :loading="curRow == rowIndex && loading"
            type="text"
            @click="load(tableData[rowIndex].material)"> {{ splitFiltName(tableData[rowIndex].material.fileUrl) }}</el-button> -->
          <!-- <el-button v-if="orderCode" type="text" >1原件</el-button> -->
          <el-button v-if="companyName" type="text"  @click="toDetail(tableData[rowIndex])">详情</el-button>
        </template>
      </m-table>
    </div>
  </div>
</template>
<script setup>
import { ref, reactive } from "vue";
import { qyzxTransactionCertificate } from '@/api/archives'
import { formatNumber, formateDate } from '@/utils/common' 
import { useRouter } from 'vue-router'
import { download } from '@/api/file'
import { exportBlob, splitFiltName } from '@/utils/common'

const router = useRouter();
const props = defineProps({
  companyName: String,
  orderCode: String
})

const curRow = ref(-1)
const curDate = ref('')
const loading = ref(false);
const tableData = ref([]);
const columns = reactive([
  {
    title: "序号",
    width: 80,
    slotName: "index",
    fixed: "left",
  },
  {
    title: "合同编号",
    dataIndex: "code",
    fixed: "left",
    width: 220,
    ellipsis: true,
    tooltip: {position: 'left'},
  },
  {
    title: "甲方（买方/采购方/需方）",
    dataIndex: "partyA",
    width: 220,
    ellipsis: true,
    tooltip: {position: 'left'},
  },
  {
    title: "乙方（卖方/销售方/供方）",
    dataIndex: "partyB",
    width: 220,
    ellipsis: true,
    tooltip: {position: 'left'},
  },
  {
    title: "签订地点",
    dataIndex: "signAddress",
    width: 220,
    ellipsis: true,
    tooltip: {position: 'left'},
  },
  {
    title: "签订日期",
    dataIndex: "signDate",
    width: 220,
    ellipsis: true,
    tooltip: {position: 'left'},
  },
  {
    title: "合同金额",
    dataIndex: "amount",
    slotName: 'amountSlot',
    width: 220,
    ellipsis: true,
    tooltip: {position: 'left'},
  },
  {
    title: "操作",
    width: 80,
    dataIndex: "operations",
    slotName: "operations",
    fixed: "right",
  },
]);
const pagination = ref({
  total: 0,
  pageSize: 10,
  current: 1,
  "show-total": true,
  "show-page-size": true,
  "show-jumper": true,
});
const searchPar = ref({
  page_size: 10,
  page: 1,
  signDateStart: '',
  signDateEnd: '',
  code: '',
  companyName: '', // 传过来的公司名称
  partyA: '', // 甲方
  partyB: '', // 乙方
  orderCode: props.orderCode // 订单关联合同
})
const scroll = ref({
  y: 800,
  x: 1080,
});

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

// 跳转合同详情
function toDetail(d) {
  // 标记从合同跳走，针对back时，做模块定位
  sessionStorage.setItem('detailId', 'TransactionVoucher')
  router.push({
    path: '/archives/transactDetail',
    query: {
      parentCode: d.code,
    }
  })
}

const changePagesize = (v) => {
  searchPar.value.page_size = v;
  pagination.value.pageSize = v;
  pagination.value.current = 1;
  searchPar.value.page = 1;
  getqyzxTransactionCertificate();
};
const changepage = (v) => {
  searchPar.value.page = v;
  pagination.value.current = v
  getqyzxTransactionCertificate();
};

// 时间选择
function onChange(dateString, date) {
  if(dateString && dateString.length > 0) {
    searchPar.value.signDateStart = formateDate(dateString[0]);
    searchPar.value.signDateEnd = formateDate(dateString[1]);
  } else {
    searchPar.value.signDateStart = '';
    searchPar.value.signDateEnd = '';
  }
}

function search() {
  searchPar.value.page = 1;
  pagination.value.current = 1
  getqyzxTransactionCertificate();
}

function reset() {
  pagination.value.pageSize = 10;
  let name = searchPar.value.companyName;
  curDate.value = ''
  searchPar.value = {
    page_size: 10,
    page: 1,
    signDateStart: '',
    signDateEnd: '',
    code: '',
    companyName: name, // 传过来的公司名称
    partyA: '', // 甲方
    partyB: '', // 乙方
    orderCode: props.orderCode
  }
  getqyzxTransactionCertificate()
}

// 交易凭证
function getqyzxTransactionCertificate() {
  if(loading.value) return
  loading.value = true
  qyzxTransactionCertificate(searchPar.value).then(res => {
    tableData.value = res.data;
    loading.value = false
    pagination.value.total = res.total;
  }).catch(err => {
    loading.value = false
  })
}

const init = async () => {
  searchPar.value.companyName = props.companyName
  getqyzxTransactionCertificate()
};
init();
</script>

<style lang="scss" scoped>
.container {
}
.table-warp {
  height: calc(100% - 100px);
}
</style>
