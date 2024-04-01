<template>
  <div class="attention">
    <div class="search_box">
      <el-form :model="searchPar" :inline="true" class="demo-form-inline">
        <el-form-item field="companyName" label="企业名称" >
          <el-input v-model="searchPar.companyName" placeholder="请输入企业名称" clearable/>
        </el-form-item>
        <el-form-item field="provinceShort" label="省份地区">
          <el-select v-model="searchPar.provinceShort" placeholder="请选择省份地区" clearable>
            <el-option v-for="(item, i) in provinceResult" :key="i" :value="item.province_short"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item field="legalPerson" label="法人" >
          <el-input v-model="searchPar.legalPerson" placeholder="请输入法人" clearable/>
        </el-form-item>
        <el-form-item class="mr-16px" field="companyStatus" label="登记状态">
          <el-select v-model="searchPar.companyStatus" placeholder="请选择登记状态" clearable>
            <el-option v-for="(item, i) in signStatus" :key="i" :value="item.label"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item field="creditNo" label="统一社会信用代码" >
          <el-input v-model="searchPar.creditNo" placeholder="请输入统一社会信用代码" clearable/>
        </el-form-item>
        <el-form-item field="companyType" class="mr-16px" label="企业类型">
          <el-select v-model="searchPar.companyType" placeholder="请选择企业类型" clearable>
            <el-option v-for="(item, i) in companyType" :key="i" :value="item"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item field="companyAddress" label="注册地址">
          <el-input v-model="searchPar.companyAddress" placeholder="请输入注册地址" clearable/>
        </el-form-item>
        <el-form-item>
          <w-button type="primary" class="mr-8px" @click="search">搜索</w-button>
          <w-button @click="reset">重置</w-button>
        </el-form-item>
      </el-form>
    </div>
    <!-- <div class="oper">
      <w-button type="primary" class="mr-8px">新增</w-button>
    </div> -->
    <div class="table-warp">
      <div class="export-btn">
        <w-button :loading="loadingExport" type="primary" @click="handleExport">导出</w-button>
      </div>
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
        <template v-slot:index="{rowIndex}">
          {{ rowIndex + 1 }}
        </template>
        <template v-slot:operations="{rowIndex}">
          <el-button type="text" @click="handleCompanyDetail(tableData[rowIndex])">详情</el-button>
        </template>
      </m-table>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive } from "vue";
import { useRouter } from 'vue-router';
import { debounce } from "lodash-es";
import { attentionCompanyQuery, groupByProvince, attentionCompanyExport } from '@/api/archives'
import dayjs from "dayjs";
import { signStatus, companyType } from '@/utils/baseType'

const router = useRouter();

const loading = ref(false);
const tableData = ref([]);
const columns = reactive([
  {
    title: "序号",
    dataIndex: "index",
    slotName: 'index',
    fixed: 'left',
    width: 80,
  },
  {
    title: "统一社会信用代码",
    dataIndex: "creditNo",
    fixed: 'left',
    width: 220,
  },
  {
    title: "企业名称",
    dataIndex: "companyName",
    ellipsis: true,
    width: 240,
    tooltip: {position: 'left'},
  },
  {
    title: "风险值评估",
    width: 180,
    dataIndex: "riskValue",
  },
  {
    title: "登记状态",
    width: 220,
    dataIndex: "companyStatus",
  },
  {
    title: "法定负责人",
    dataIndex: "legalPerson",
    width: 180,
  },
  {
    title: "联系方式",
    dataIndex: "companyPhone",
    width: 180,
  },
  {
    title: "登记机关",
    dataIndex: "authority",
    ellipsis: true,
    tooltip: {position: 'left'},
    width: 220,
  },
  {
    title: "注册地址",
    dataIndex: "companyAddress",
    ellipsis: true,
    tooltip: {position: 'left'},
    width: 220,
  },
  {
    title: "企业类型",
    dataIndex: "companyType",
    ellipsis: true,
    width: 220,
    tooltip: {position: 'left'},
  },
  
  {
    title: "操作",
    dataIndex: "operations",
    slotName: "operations",
    width: 80,
    fixed: "right",
  },
]);
const pagination = ref({
  total: 0,
  pageSize: 10,
  "show-total": true,
  "show-page-size": true,
  "show-jumper": true,
});
const searchPar = ref({
  page_size: 10,
  page: 1,
  companyName: '', // 企业名称
  provinceShort: '' , // 省份
  legalPerson: '', // 法人
  creditNo: '', // 统一社会信用代码
  companyAddress: '', // 注册地址
  companyStatus: '', // 登记状态
  companyType :'' // 企业类型
})
const provinceResult = ref([])
const loadingExport = ref(false)
const scroll = ref({
  y: 800,
  x: 1080,
});

const changePagesize = (v: any) => {
  pagination.value.pageSize = v;
  searchPar.value.page_size = v;
  getpage();
};

const changepage = (v: any) => {
  searchPar.value.page = v;
  getpage();
};

// 导出
 function handleExport() {
  if(loadingExport.value) return;
  loadingExport.value = true
  const data = {
    companyName: searchPar.value.companyName,
    provinceShort: searchPar.value.provinceShort,
    legalPerson: searchPar.value.legalPerson,
    creditNo: searchPar.value.creditNo,
    companyAddress: searchPar.value.companyAddress
  }
  attentionCompanyExport(data).then(res => {
    exportBlob(res);
  }).catch(err => {
    loadingExport.value = false
  })
}

// 导出
function exportBlob(b: any) {
  const now = dayjs().format('YYYY-MM-DD');
  const fileName = `我关注的企业信息${now}`
  // const fileName = decodeURIComponent(b.headers["content-disposition"].split('filename*=utf-8')[1])
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
  loadingExport.value = false
}

function handleCompanyDetail(d) {
  router.push({ 
    path: '/archives/companyDetail', 
    query: {
      companyId: d.companyId,
      companyName: d.companyName
    }
  });
}

// 重置搜索条件
function reset() {
  pagination.value.pageSize = 10;
  searchPar.value = {
    page_size: 10,
    page: 1,
    companyName: '', // 企业名称
    provinceShort: '' , // 省份
    legalPerson: '', // 法人
    creditNo: '', // 统一社会信用代码
    companyAddress: '', // 注册地址
    companyStatus: '', // 登记状态
    companyType :'' // 企业类型
  }
  getpage();
}

// 搜索-重置分页
function search() {
  searchPar.value.page = 1;
  getpage();
}

// 我关注的企业
function getpage() {
  if(loading.value) return;
  loading.value = true;
  attentionCompanyQuery(searchPar.value).then(res => {
    tableData.value = res.data as  any;
    pagination.value.total = res.total as any;
    loading.value = false;
  }).catch(err => {
    loading.value = false;
  })
}

// 获取省份
function getProvince() {
  groupByProvince({
    provinceShort: '',
    allContentSearch: ''
  }).then(res => {
    provinceResult.value = res.data;
  }).catch(err => {})
}

function init() {
  getpage();
  getProvince();
}

init();

// const init = async () => {
//   loading.value = true;
//   let data = {
//     current: current.value,
//     size: size.value,
//     name: keyWords.value,
//     authority: categoryType.value,
//     role: roleValue.value,
//   };
//   let res = await knowledgePage(data);
//   if (res.code === 200) {
//     loading.value = false;
//     tableData.value = res.data.records;
//     pagination.value.total = res.data.total;
//   } else {
//     loading.value = false;
//   }
// };
</script>

<style lang="scss" scoped>
.attention {
  padding: 24px;
  padding-bottom: 16px;
  height: 100%;
  background: #fff;
  .oper {
    display: flex;
    justify-content: flex-end;
    margin-bottom: 16px;
  }
  .table-warp {
    height: calc(100% - 100px);
  }

  ::v-deep .m-table-container {
    height: 100%;
  }
}
.export-btn {
  display: flex;
  justify-content: flex-end;
  padding: 16px 0;
}
:deep(.el-input-wrapper) {
  width: 188px;
  height: 32px;
}
:deep(.w-picker) {
  width: 240px;
  height: 32px;
}
:deep(.el-select-view) {
  width: 188px;
  height: 32px;
}
:deep(.el-form-item-label) {
  height: 32px;
  color: #000;
  font-weight: 500;
}
</style>

