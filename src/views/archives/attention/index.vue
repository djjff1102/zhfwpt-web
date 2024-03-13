<template>
  <div class="attention">
    <div class="search_box">
      <w-form :model="searchPar" layout="inline">
        <w-form-item field="companyName" label="企业名称" >
          <w-input v-model="searchPar.companyName" placeholder="请输入企业名称" clearable/>
        </w-form-item>
        <w-form-item field="provinceShort" label="省份地区">
          <w-select v-model="searchPar.provinceShort" placeholder="请选择省份地区" clearable>
            <w-option v-for="(item, i) in provinceResult" :key="i">{{ item.province_short }}</w-option>
          </w-select>
        </w-form-item>
        <w-form-item class="mr-16px" field="post" label="登记状态">
          <w-select placeholder="请选择登记状态" clearable>
            <w-option v-for="(item, i) in provinceResult" :key="i">{{ item.province_short }}</w-option>
          </w-select>
        </w-form-item>
        <w-form-item field="legalPerson" label="法人" >
          <w-input v-model="searchPar.legalPerson" placeholder="请输入法人" clearable/>
        </w-form-item>
        <w-form-item field="creditNo" label="统一社会信用代码" >
          <w-input v-model="searchPar.creditNo" placeholder="请输入统一社会信用代码" clearable/>
        </w-form-item>
        <w-form-item class="mr-16px" label="企业类型">
          <w-select placeholder="请选择企业类型" clearable>
            <w-option v-for="(item, i) in provinceResult" :key="i">{{ item.province_short }}</w-option>
          </w-select>
        </w-form-item>
        <w-form-item field="companyAddress" label="注册地址">
          <w-input v-model="searchPar.companyAddress" placeholder="请输入注册地址" clearable/>
        </w-form-item>
        <w-button type="primary" class="mr-8px" @click="search">搜索</w-button>
        <w-button @click="reset">重置</w-button>
      </w-form>
    </div>
    <!-- <div class="oper">
      <w-button type="primary" class="mr-8px">新增</w-button>
    </div> -->
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
        <template v-slot:operations="{rowIndex}">
          <w-button type="text" @click="handleCompanyDetail(tableData[rowIndex])">详情</w-button>
        </template>
      </m-table>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive } from "vue";
import { useRouter } from 'vue-router';
import { debounce } from "lodash-es";
import { attentionCompanyQuery, groupByProvince } from '@/api/archives'

const router = useRouter();

const loading = ref(false);
const tableData = ref([]);
const columns = reactive([
  {
    title: "统一社会信用代码",
    dataIndex: "creditNo",
    width: 180,
  },
  {
    title: "企业名称",
    dataIndex: "companyName",
  },
  {
    title: "风险值评估",
    dataIndex: "riskValue",
  },
  {
    title: "登记状态",
    dataIndex: "companyStatus",
  },
  {
    title: "法定负责人",
    dataIndex: "legalPerson",
  },
  {
    title: "联系方式",
    dataIndex: "companyPhone",
  },
  {
    title: "登记机关",
    dataIndex: "authority",
  },
  {
    title: "注册地址",
    dataIndex: "companyAddress",
  },
  {
    title: "企业类型",
    dataIndex: "companyType",
  },
  {
    title: "操作",
    dataIndex: "operations",
    slotName: "operations",
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
})
const provinceResult = ref([])
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

function handleCompanyDetail(d) {
  // 跳转企业详情
  router.push({ 
    path: '/archives/companyDetail', 
    query: {
      company: JSON.stringify(d)
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
</style>

