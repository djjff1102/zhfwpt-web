<template>
  <!-- 交易凭证 -->
  <div>
    <div class="search_box">
      <w-form :model="searchPar" layout="inline">
        <w-form-item field="code" label="合同编号">
          <w-input v-model="searchPar.code" placeholder="请输入合同编号" />
        </w-form-item>
        <w-form-item class="mr-16px" field="partyA" label="甲方">
          <w-input v-model="searchPar.partyA" placeholder="请输入关键字" />
        </w-form-item>
        <w-form-item class="mr-16px" field="partyB" label="乙方">
          <w-input v-model="searchPar.partyB" placeholder="请输入关键字" />
        </w-form-item>
        <w-form-item class="mr-16px" field="post" label="签订日期">
          <w-range-picker
            class="w-250px"
            :time-picker-props="{
              defaultValue: [
                dayjs('00:00:00', 'HH:mm:ss'),
                dayjs('09:09:06', 'HH:mm:ss'),
              ],
            }"
            format="YYYY-MM-DD"
            @change="onChange"
          />
        </w-form-item>
        <w-button type="primary" class="mr-8px" @click="search">搜索</w-button>
        <w-button @click="reset">重置</w-button>
      </w-form>
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
          {{ formatNumber(tableData[rowIndex].amount) }}
        </template>
        <template v-slot:operations>
          <w-button type="text" disabled>详情</w-button>
        </template>
      </m-table>
    </div>
  </div>
</template>
<script setup>
import dayjs from "dayjs";
import { onMounted, ref, reactive, unref, computed, watch } from "vue";
import { qyzxTransactionCertificate } from '@/api/archives'
import { formatNumber } from '@/utils/common' 

const props = defineProps({
  companyName: String
})

const current = ref(1);
const size = ref(10);
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
    width: 220,
    fixed: "left",
  },
  {
    title: "甲方（买方/采购方/需方）",
    dataIndex: "partyA",
    ellipsis: true,
    tooltip: {position: 'left'},
  },
  {
    title: "乙方（卖方/销售方/供方）",
    dataIndex: "partyB",
    fellipsis: true,
    tooltip: {position: 'left'},
  },
  {
    title: "签订地点",
    dataIndex: "signAddress",
    ellipsis: true,
    tooltip: {position: 'left'},
  },
  {
    title: "签订日期",
    dataIndex: "signDate",
    ellipsis: true,
    tooltip: {position: 'left'},
  },
  {
    title: "合同金额",
    dataIndex: "amount",
    ellipsis: true,
    slotName: 'amountSlot',
    tooltip: {position: 'left'},
  },
  {
    title: "操作",
    width:100,
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
  signDateStart: '',
  signDateEnd: '',
  code: '',
  companyName: '', // 传过来的公司名称
  partyA: '', // 甲方
  partyB: '' // 乙方
})
const scroll = ref({
  y: 800,
  x: 1080,
});

const changePagesize = (v) => {
  searchPar.value.page_size = v;
  pagination.value.pageSize = v;
  searchPar.value.page = 1;
  getqyzxTransactionCertificate();
};
const changepage = (v) => {
  searchPar.value.page = v;
  getqyzxTransactionCertificate();
};

// 时间选择
function onChange(dateString, date) {
  if(dateString && dateString.length > 0) {
    searchPar.value.signDateStart = dateString[0];
    searchPar.value.signDateEnd = dateString[1];
  } else {
    searchPar.value.signDateStart = '';
    searchPar.value.signDateEnd = '';
  }
}

function search() {
  searchPar.value.page = 1;
  getqyzxTransactionCertificate();
}

function reset() {
  pagination.value.pageSize = 10;
  let name = searchPar.value.companyName;
  searchPar.value = {
    page_size: 10,
    page: 1,
    signDateStart: '',
    signDateEnd: '',
    code: '',
    companyName: name, // 传过来的公司名称
    partyA: '', // 甲方
    partyB: '' // 乙方
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
