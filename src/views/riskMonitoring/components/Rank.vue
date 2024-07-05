<template>
  <!-- 订单信息 -->
  <div class="input-invoice-container">
    <div class="search_box">
      <el-form :model="searchPar" :inline="true" class="demo-form-inline">
        <el-form-item field="post" label="检测日期">
          <el-date-picker
              v-model="curDate"
              type="daterange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              format="YYYY-MM-DD"
              style="width: 300px"
              @change="onChange"
            >
            </el-date-picker>
        </el-form-item>
        <el-form-item field="companyName" label="企业名称">
          <el-input v-model="searchPar.companyName" placeholder="请输入企业名称" clearable/>
        </el-form-item>
        <el-form-item class="mr-16px" field="creditLevel" label="企业信用等级">
          <el-select v-model="searchPar.creditLevel" placeholder="全部" style="width: 160px" clearable>
            <el-option v-for="(item, i) in companyCreditType" :key="i" :value="item.value" :label="item.name"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <w-button type="primary" class="mr-8px" @click="search">搜索</w-button>
          <w-button @click="reset">重置</w-button>
         </el-form-item>
      </el-form>
    </div>
    <div class="table-warp">
      <div class="flex-base-end" style="margin-bottom: 16px;">
        <w-button :loading="loadingExport" type="primary" class="mr-8px" @click="handleExport">导出</w-button>
      </div>
      <m-table
        style="height: 100%"
        :data="tableData"
        :columns="columns"
        :pagination="pagination"
        :row-selection="rowSelection"
        row-key="companyId"
        :selected-keys="rowId"
        @page-change="changepage"
        @page-size-change="changePagesize"
        @select="handlSelectRow"
        @select-all="selectAll"
        :bordered="false"
      >
        <template v-slot:index="{ rowIndex }">
          {{ rowIndex + 1 }}
        </template>
        <template v-slot:creditLevel="{rowIndex}">
          {{ riskLeval[tableData[rowIndex].creditLevel] }}
        </template>
        <template v-slot:secordCategoryNum="{rowIndex}">
          {{ tableData[rowIndex].secordCategoryNum }}个
        </template>
        <template v-slot:operations="{rowIndex}">
          <el-button type="text" @click="handleDetail(tableData[rowIndex])">详情</el-button>
        </template>
      </m-table>
    </div>
  </div>
</template>
<script setup>
import { ref} from "vue";
import { useRouter, useRoute } from "vue-router";
import { fxjkIndexFxzph, riskExport } from '@/api/riskmonitor'
import { companyCreditType, riskLeval } from '@/utils/baseType'
import { formatNumber, formateDate } from '@/utils/common'
import dayjs from "dayjs";

const router = useRouter()
const route = useRoute()

const props = defineProps({
  isAuthCompany: { // 只查询授权公司
    default: ''
  }, 
  isAttentionCompany: { // 重点关注企业
    default: ''
  }
})

const curDate = ref('')
const loading = ref(false);
const tableData = ref([]);
const columns = ref([
  {
    title: "序号",
    dataIndex: "index",
    slotName: 'index',
    width: 80,
  },
  {
    title: "检测日期",
    dataIndex: "modifyDate",
    width: 180,
    ellipsis: true,
    tooltip: {position: 'left'},
  },
  {
    title: '企业名称',
    dataIndex: 'companyName',
    width: 220,
    ellipsis: true,
    tooltip: {position: 'left'},
  },
  {
    title: "企业信用等级",
    dataIndex: "creditLevel",
    width: 220,
    slotName: 'creditLevel',
    ellipsis: true,
    tooltip: {position: 'left'},
  },
  {
    title: '信用值分数',
    dataIndex: 'creditScore',
    width: 200,
    ellipsis: true,
    tooltip: {position: 'left'},
  },
  {
    title: "企业统一社会信息代码",
    dataIndex: "companyCreditNo",
    width: 200,
    ellipsis: true,
    tooltip: {position: 'left'},
  },
  {
    title: '涉风险项',
    dataIndex: 'firstCategories',
    width: 180,
    ellipsis: true,
    tooltip: {position: 'left'},
  },
  {
    title: "涉风险细则",
    dataIndex: "secordCategoryNum",
    slotName: 'secordCategoryNum',
    width: 180,
    ellipsis: true,
    tooltip: {position: 'left'},
  },
  {
    title: "操作",
    dataIndex: "operations",
    slotName: "operations",
    fixed: "right",
    width: 80,
  }
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
  companyName: '', // 企业名称
  creditLevel: route.query.type || '', // 企业信用等级
  startDate: '',
  endDate: ''
})
const loadingExport = ref(false)
const rowId = ref([])
const rowSelection = ref({
  type: 'checkbox',
  showCheckedAll: true
})

// 全选、取消全选
function selectAll(rows) {
  if(rows) {
    let ids = []
    tableData.value.forEach((item) => {
      ids.push(item.companyId)
    })
    rowId.value = ids;
  } else {
    rowId.value = []
  }
}

function handlSelectRow(row) {
  rowId.value = row;
}


// 重置
function reset() {
  searchPar.value = {
    page_size: 10,
    page: 1,
    companyName: '', // 企业名称
    creditLevel: '', // 企业信用等级
    startDate: '',
    endDate: ''
  }
  curDate.value = ''
  getRiskiList()
}

function search() {
  getRiskiList()
}

// 跳转详情
function handleDetail(d) {
  router.push({ 
    path: '/riskMonitoring/detail', 
    query: {
      companyId: d.companyId,
      companyName: d.companyName,
      type: 'risk'
    }
  });
}

const changePagesize = (v) => {
  searchPar.value.page_size = v;
  pagination.value.pageSize = v;
  getRiskiList();
};

const changepage = (v) => {
  rowId.value = []
  pagination.value.current = v;
  searchPar.value.page = v
  getRiskiList();
};

// 选择时间
function onChange(dateString, date) {
  if(dateString && dateString.length > 0) {
    searchPar.value.startDate = formateDate(curDate.value[0])
    searchPar.value.endDate = formateDate(curDate.value[1])
  } else {
    searchPar.value.startDate = '';
    searchPar.value.endDate = '';
  }
}

// 信用值列表
function getRiskiList() {
  if(loading.value) return
  loading.value = true
  if(props.isAttentionCompany) {
    searchPar.value.isAttentionCompany = props.isAttentionCompany;
  }
  if(props.isAuthCompany) {
    searchPar.value.isAuthCompany = props.isAuthCompany;
  }
  fxjkIndexFxzph(searchPar.value).then(res => {
    tableData.value = res.data;
    pagination.value.total = res.total;
    loading.value = false
  }).catch(err => {
    loading.value = false
    console.log('信用值排行异常：', err)
  })
}

//导出
function handleExport() {
  if(loadingExport.value) return
  if(rowId.value.length == 0){
    ElMessage.warning("请选择需要导出的公司");
    return;
  }
  loadingExport.value = true
  //  if(props.isAttentionCompany) {
  //   searchPar.value.isAttentionCompany = props.isAttentionCompany;
  // }
  // if(props.isAuthCompany) {
  //   searchPar.value.isAuthCompany = props.isAuthCompany;
  // }
  riskExport(rowId.value).then(res => {
    exportBlob(res);
    loadingExport.value = false
  }).catch(err => {
    loadingExport.value = false
  })
}

// 导出
function exportBlob(b) {
  const now = dayjs().format('YYYY-MM-DD');
  const fileName = `信用值排行-${now}`
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

getRiskiList()
</script>

<style lang="scss" scoped>
.title {
  position: relative;
  margin: 16px 0;
  font-family: PingFangSC, PingFang SC;
  font-weight: 400;
  font-size: 16px;
  color: #333333;
  line-height: 22px;
}
.container {
}

.table-warp {
  height: calc(100% - 100px);
}
</style>
