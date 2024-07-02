<template>
  <div>
    <w-button type="primary" style="margin-right: 8px;" @click="handleAdd">新增</w-button>
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

      <el-table
        ref="multipleTableRef"
        :data="tableData"
        style="width: 100%"
        @select-all="selectAll"
        @selection-change="handlSelectRow">
        <el-table-column type="selection" width="55" :selectable="checkselect"/>
        <el-table-column label="订单编号" width="120" show-overflow-tooltip>
          <template #default="scope">{{ scope.row.code }}</template>
        </el-table-column>
        <el-table-column property="orderCreateDate" label="订单创建日期" width="120"/>
        <el-table-column
          width="120"
          property="goodType"
          label="商品类别"
          show-overflow-tooltip
        />
        <el-table-column property="buyerCompanyName" label="买方名称" width="120" show-overflow-tooltip/>
        <el-table-column property="buyerCreditNo" label="买方信用代码" width="120"  show-overflow-tooltip/>
        <el-table-column property="sellerCompanyName" label="卖方名称" width="120" show-overflow-tooltip/>
        <el-table-column property="sellerCreditNo" label="卖方信用代码" width="120" show-overflow-tooltip/>
        <el-table-column property="goodAddress" label="商品所在地址" width="120" show-overflow-tooltip/>
        <el-table-column property="warehouseName" label="仓库名称" width="120" />
        <el-table-column property="totalMoney" label="总金额" width="120"/>
        <el-table-column property="dataDesc" label="数据情况" width="120"/>
        <!-- <el-table-column property="address" label="操作" /> -->
        <el-table-column label="操作"  min-width="80">
          <template #default="scope">
            <el-button type="text" size="small" :disabled="!scope.row.chooseFlag" @click="handleDetail(scope.$index, scope.row)">
              详情
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <div style="display: flex; justify-content: flex-end; padding-top: 12px;">
        <el-pagination
          :page-size="searchPar.page_size"
          :pager-count="searchPar.page"
          layout="prev, pager, next, jumper"
          :total="total"
          @current-change="changepage"
        />
      </div>


    </w-modal>
  </div>
</template>

<script setup>
import { ref,onMounted } from 'vue';
import { qyzxOrder } from '@/api/archives'
import { useApprovalStore } from '@/store/modules/approval'
import { useRouter } from 'vue-router';

const router = useRouter();
const approvalStore = useApprovalStore();

const props = defineProps({
  reportId: {
    default: ''
  }
})

const tableData = ref([])

const visible = ref(false)
const defaultselectedkeys = ref([]) // 默认选中的行
const total = ref(0)
const selectedRows = ref([]) // 已选择的行
const searchPar = ref({
  page_size: 2,
  page: 1,
  code: '', // 订单编号
  enterpriseDataFlag: true // 买方名称
})
const pagesSelectRows = ref({}) // 记录每页选择的row

const multipleTableRef = ref()
const emits = defineEmits(['updateAdd'])

// 跳转详情
function handleDetail(index, row) {
  router.push({
    path: '/intellApproval/intellApprovalOrderDetail',
    query: {
      orderCode: row.code,
      // reportId: props.reportId
    }
  })
}

// 判断是否可选
function checkselect(row) {
  return row.chooseFlag
}

// 新增
function handleAdd() {
  visible.value = true
  toggleSelection(pagesSelectRows.value[searchPar.value.page])
}

// 默认选中
const toggleSelection = (rows) => {
  if (rows) {
    rows.forEach((row) => {
      rows.forEach(el => { // 记录的数据
        const row = tableData.value.find(e => e.code === el.code); // row是当前表格数据
        row && multipleTableRef.value.toggleRowSelection(row, true);
      });
    })
  } else {
    multipleTableRef.value.clearSelection()
  }
}

// 全选
function selectAll(row) {
  selectedRows.value = row
}

// 多选
function handlSelectRow(row) {
  selectedRows.value = row
}

// 搜索
function search() {
  searchPar.value.page = 1;
  getOrder();
}

// 重置
function reset() {
  searchPar.value.code = ''
  searchPar.value.page = 1;
  getOrder();
}


const changepage = (v) => {
  pagesSelectRows.value[searchPar.value.page] = JSON.parse(JSON.stringify(selectedRows.value)) 
  searchPar.value.page = v;
  getOrder();
};

// 点击确定查询数据
async function handleOK() {
  searchPar.value.code = ''
  getOrder();
  visible.value = false
  pagesSelectRows.value[searchPar.value.page] = selectedRows.value; // 存储已经选中的行
  let ids = []
  Object.keys(pagesSelectRows.value).forEach(key => {
    pagesSelectRows.value[key].forEach( item =>{
      ids.push(item.code)
    })
   })
  if(ids.length == 0) {
    approvalStore.clearTable()
    approvalStore.resetMoney()
  } else {
    approvalStore.getTableDataAuto(ids);
  }
}

// 点击关闭，清空选择
function handleCancel () {
 searchPar.value.code = ''
 getOrder();
  visible.value = false
}

// 获取订单
function getOrder() {
  qyzxOrder( searchPar.value ).then(res => {
    tableData.value = res.data || []
    total.value = Number(res.total)
    nextTick(() => {
      toggleSelection(pagesSelectRows.value[searchPar.value.page])
    })
  }).catch(err => {
  })
}

getOrder()

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