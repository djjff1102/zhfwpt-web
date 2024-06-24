<template>
  <div>
    <w-button type="primary" style="margin-right: 8px;" @click="visible = true">新增</w-button>
    <w-modal
      ok-text="确定"
      cancel-text="取消"
      v-model:visible="visible"
      @ok="handleOK"
      @cancel="handleCancel"
      :width="1400">
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
        :row-selection="rowSelection"
        row-key="code"
        :default-selected-keys="defaultselectedkeys"
        :pagination="pagination"
        @page-change="changepage"
        @page-size-change="changePagesize"
        @select="handlSelectRow"
        @selectAll="selectAll"
        :bordered="false"
      >
        <template v-slot:index="{rowIndex}">
            <div>{{ rowIndex + 1 }}</div>
        </template> 
      </m-table>
    </w-modal>
  </div>
</template>

<script setup>
import { ref,onMounted } from 'vue';
import { qyzxOrder } from '@/api/archives'
import { useApprovalStore } from '@/store/modules/approval'

const approvalStore = useApprovalStore();

const props = defineProps({})

const loading = ref(false)
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
const defaultselectedkeys = ref(['li005']) // 默认选中的行
const rowId = ref(['li005']) // 已选的行code
const searchPar = ref({
  page_size: 10,
  page: 1,
  code: 'li005', // 订单编号
  enterpriseDataFlag: true // 买方名称
})

const rowSelection = ref({
  type: 'checkbox',
  showCheckedAll: true
})

const emits = defineEmits(['updateAdd'])

// 全选
function selectAll(e) {
  console.log('是否全选----------：', e)
  if(e) {
    // 全选

  } else {
    // 取消全选

  }
}

function handlSelectRow(row) {
  rowId.value = row;
  console.log('row-----------------------:', row)
}

// 搜索
function search() {

}

// 重置
function reset() {

}

const changePagesize = (v) => {
  pagination.value.pageSize = v;
  searchPar.value.page = 1;
  searchPar.value.page_size = v;
  getOrder();
};

const changepage = (v) => {
  searchPar.value.page = v;
  getOrder();
};

// 点击确定查询数据
async function handleOK() {
  visible.value = false
  if(rowId.value.length != 0) {
    approvalStore.getTableDataAuto(rowId.value);
  } else {
    approvalStore.clearTable()
    approvalStore.resetMoney()
  }
  defaultselectedkeys.value = rowId.value
}

// 点击关闭，清空选择
function handleCancel () {
  console.log('关闭弹窗----------')
  visible.value = false
}

// 获取订单
function getOrder() {
  qyzxOrder( searchPar.value ).then(res => {
    console.log('order-----------------:', res)
    tableData.value = res.data || []
  }).catch(err => {
  })
}

onMounted(() => {
  getOrder();
})

</script>

<style lang="scss" scoped>
:deep(.no-data) {
  width: 1300px!important;
}
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