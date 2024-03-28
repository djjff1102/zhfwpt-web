<template>
  <el-dialog v-model="visible" :before-close="handleBeforeClose" :width="1200">
    <w-spin :loading="loading" style="display: block;">
    <div class="dia-content">
      <card-tab
        :showExtra="false"
        :defaultKey="defaultKey"
        @handleTab="handleTab"
      >
      </card-tab>
      <div style="margin-top: 12px; margin-left: 3px;">
        <!-- <m-transfer
          v-show="curTab == pro.HT"
          :dataList="dataHT"
          :transferProps="prosMap[pro.HT]"
          :rightDefaultChecked="codeHT"
          :total="totalHT"
          @updateChecked="updateChecked"
          @load="load"
        ></m-transfer>
        <m-transfer
          v-show="curTab == pro.DD"
          :dataList="dataDD"
          :total="totalDD"
          :transferProps="prosMap[pro.DD]"
          :rightDefaultChecked="codeDD"
          @updateChecked="updateChecked"
           @load="load"
        ></m-transfer> -->
        <!-- <m-transfer
          v-show="curTab == pro.FP"
          :dataList="dataFP"
          :total="totalFP"
          :transferProps="prosMap[pro.FP]"
          :rightDefaultChecked="codeFP"
          @updateChecked="updateChecked"
           @load="load"
        ></m-transfer>
        <m-transfer
          v-show="curTab == pro.CC"
          :dataList="dataCC"
          :total="totalCC"
          :transferProps="prosMap[pro.CC]"
          :rightDefaultChecked="codeCC"
          @updateChecked="updateChecked"
          @load="load"
        ></m-transfer>
        <m-transfer
          v-show="curTab == pro.YH"
          :dataList="dataYH"
          :total="totalYH"
          :transferProps="prosMap[pro.YH]"
          :rightDefaultChecked="codeYH"
          @updateChecked="updateChecked"
          @load="load"
        ></m-transfer> -->
        <m-table
          v-show="curTab == pro.HT"
          :data="dataHT"
          row-key="code"
          :columns="columnsHT"
          :pagination="objectHT.pagination"
          :row-selection="rowSelection"
          @page-change="changepage"
          @selection-change="handleSelectionChange"
        ></m-table>
        <m-table
          v-show="curTab == pro.DD"
          :data="dataDD"
          :columns="columnsDD"
          row-key="code"
          :row-selection="rowSelection"
          :pagination="objectDD.pagination"
          @page-change="changepage"
          @selection-change="handleSelectionChange"
        ></m-table>
        <m-table
          v-show="curTab == pro.FP"
          :data="dataFP"
          :columns="columnsFP"
          :row-selection="rowSelection"
          row-key="code"
          :pagination="objectFP.pagination"
          @page-change="changepage"
          @selection-change="handleSelectionChange"
        ></m-table>
        <m-table
          v-show="curTab == pro.CC"
          :data="dataCC"
          :columns="columnsCC"
          :row-selection="rowSelection"
          row-key="code"
          :pagination="objectCC.pagination"
          @page-change="changepage"
          @selection-change="handleSelectionChange"
        ></m-table>
        <m-table
          v-show="curTab == pro.YH"
          :data="dataYH"
          :columns="columnsYH"
          :row-selection="rowSelection"
          row-key="orderCode"
          :pagination="objectYH.pagination"
          @page-change="changepage"
          @selection-change="handleSelectionChange"
        ></m-table>
      </div>
    </div>
    </w-spin>
    <template #header>
      <div class="dia-header">新增资料</div>
    </template>
    <template #footer>
      <span class="dialog-footer">
        <w-button @click="handleCancel" style="margin-right: 8px">取消</w-button>
        <w-button type="primary" @click="handleOk">确定</w-button>
      </span>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
import { ref, watch } from 'vue';
import { qyzxTransactionCertificate, qyzxOrder, qyzxInvoice, qyzxWarehouse, qyzxBankStatement } from '@/api/archives'
import { pro, prosMap, columnsHT, columnsDD, columnsFP, columnsCC, columnsYH } from '../type'

const props = defineProps({
  showAdd: {
    type: Boolean,
    default: false
  },
  defaultKey: {
    type: String,
    default: '1'
  },
  companyName:{
    type: String,
    default: ''
  }
})

const emits = defineEmits(['updateAdd', 'updateData'])

watch(() => props.showAdd, (newValue) => {
  visible.value = newValue;
  if(newValue) {
    curTab.value = props.defaultKey;
    init(props.defaultKey)
  }
})

const rowSelection = ref({
  type: 'checkbox',
  showCheckedAll: true
})
const objectHT = ref({
  data:[], // 存储所有数据
  insertCurrent: 1, // 记录将要存储的页码
  pagination: {
      total: 0,
      pageSize: 10,
      current: 1,
      "show-total": true,
      // "show-page-size": true,
      "show-jumper": true,
  }
})

const objectDD = ref({
  data:[], // 存储所有数据
  insertCurrent: 1, // 记录将要存储的页码
  pagination: {
      total: 0,
      pageSize: 10,
      current: 1,
      "show-total": true,
      // "show-page-size": true,
      "show-jumper": true,
  }
})

const objectFP = ref({
  data:[], // 存储所有数据
  insertCurrent: 1, // 记录将要存储的页码
  pagination: {
      total: 0,
      pageSize: 10,
      current: 1,
      "show-total": true,
      // "show-page-size": true,
      "show-jumper": true,
  }
})

const objectCC = ref({
  data:[], // 存储所有数据
  insertCurrent: 1, // 记录将要存储的页码
  pagination: {
      total: 0,
      pageSize: 10,
      current: 1,
      "show-total": true,
      // "show-page-size": true,
      "show-jumper": true,
  }
})

const objectYH = ref({
  data:[], // 存储所有数据
  insertCurrent: 1, // 记录将要存储的页码
  pagination: {
      total: 0,
      pageSize: 10,
      current: 1,
      "show-total": true,
      // "show-page-size": true,
      "show-jumper": true,
  }
})


const rightDefaultChecked = ref([]) // 穿梭组件默认选中的
const curTab = ref('') // 当前选中的tab
const transferProps = ref({}) // 适配穿梭组件自定义属性
const visible = ref(false)
const loading = ref(false)

const searchHT = ref({ // 合同
  page_size: 10,
  page: 1,
  companyName: props.companyName
})
const searchDD = ref({ // 订单
  page_size: 10,
  page: 1,
  sellerCompnayName: props.companyName
}) 
const searchFP = ref({ // 发票
  page_size: 10,
  page: 1,
  invoicingCompanyName: props.companyName // 开票单位
}) 
const searchCC = ref({ // 仓储
  page_size: 10,
  page: 1,
  companyName: props.companyName
}) 
const searchYH = ref({ // 银行流水
  page_size: 10,
  page: 1,
  companyName: props.companyName
}) 

const codeHT = ref([]) // 已选的合同code
const codeDD = ref([]) // 已选的订单code
const codeFP = ref([]) // 已选的发票code
const codeCC = ref([]) // 已选的仓储code
const codeYH = ref([]) // 已选的银行流水code

const dataHT = ref([]) // 已选的合同list
const dataDD = ref([]) // 已选的订单list
const dataFP = ref([]) // 已选的发票list
const dataCC = ref([]) // 已选的仓储list
const dataYH = ref([]) // 已选的银行流水list

const totalHT = ref(0) // 总数
const totalDD = ref(0)
const totalFP = ref(0)
const totalCC = ref(0)
const totalYH = ref(0)

// 存储选中的code
function handleSelectionChange(code) {
  switch(curTab.value) {
    case pro.HT:
      codeHT.value = code;
      break;
    case pro.DD:
      codeDD.value = code
      break;
    case pro.FP:
      codeFP.value = code
      break;
    case pro.CC:
      codeCC.value = code
      break;
    case pro.YH:
      codeYH.value = code
      break;
  }
}

// 切换分页
function changepage(v) {
  switch(curTab.value) {
    case pro.HT:
      searchHT.value.page = v;
      objectHT.value.pagination.current = v
      getList(qyzxTransactionCertificate, searchHT.value)
      break;
    case pro.DD:
      searchDD.value.page = v;
      objectDD.value.pagination.current = v
      getList(qyzxOrder, searchDD.value)
      break;
    case pro.FP:
      searchFP.value.page = v;
      objectFP.value.pagination.current = v
      getList(qyzxInvoice, searchFP.value)
      break;
    case pro.CC:
      searchCC.value.page = v;
      objectCC.value.pagination.current = v
      getList(qyzxWarehouse, searchCC.value)
      break;
    case pro.YH:
      searchYH.value.page = v;
      objectYH.value.pagination.current = v
      getList(qyzxBankStatement, searchYH.value)
      break;
  }
}

function init(i: any) {
  switch(i) {
    case pro.HT:
      getList(qyzxTransactionCertificate, searchHT.value)
      break;
    case pro.DD:
      getList(qyzxOrder, searchDD.value)
      break;
     case pro.FP:
      getList(qyzxInvoice, searchFP.value)
      break;
    case pro.CC:
      getList(qyzxWarehouse, searchCC.value)
      break;
     case pro.YH:
      getList(qyzxBankStatement, searchYH.value)
      break;
  }
}

// 获取数据list
function getList(fun: any, par: any) {
  fun(par).then((res: any) => {
    updataDataList(res.data, Number(res.total));
  }).catch((err: any) => {})
}

// 赋值穿梭组件左侧
function updataDataList(data: any, total: any) {
  switch(curTab.value) {
    case pro.HT:
      objectHT.value.pagination.total = total
      dataHT.value = data
      if(objectHT.value.insertCurrent == objectHT.value.pagination.current) {
        objectHT.value.data.push(...data);
        objectHT.value.insertCurrent++;
      }
      break;
    case pro.DD:
      objectDD.value.pagination.total = total
      dataDD.value = data
      if(objectDD.value.insertCurrent == objectDD.value.pagination.current) {
        objectDD.value.data.push(...data);
        objectDD.value.insertCurrent++;
      }
      break;
    case pro.FP:
      objectFP.value.pagination.total = total
      dataFP.value = data
      if(objectFP.value.insertCurrent == objectFP.value.pagination.current) {
        objectFP.value.data.push(...data);
        objectFP.value.insertCurrent++;
      }
      break;
    case pro.CC:
      objectCC.value.pagination.total = total
      dataCC.value = data
      if(objectCC.value.insertCurrent == objectCC.value.pagination.current) {
        objectCC.value.data.push(...data);
        objectCC.value.insertCurrent++;
      }
      break;
     case pro.YH:
      objectYH.value.pagination.total = total
      dataYH.value = data
      if(objectYH.value.insertCurrent == objectYH.value.pagination.current) {
        objectYH.value.data.push(...data);
        objectYH.value.insertCurrent++;
      }
      break;
  }
}

// 切换tab
function handleTab(i: any) {
  // 切换tab前，对list数据做深拷贝，通过已选code对list过滤，存储已选的完整数据
  // 点击确定时，将已选的code和完整数据回传到编辑、添加页面回显
  curTab.value = i;
  checkLoadList(i);
}

function checkLoadList(i: any) {
  switch(i) {
    case pro.HT:
      if(dataHT.value.length == 0) {
        init(i)
      } 
      break;
    case pro.DD:
      if(dataDD.value.length === 0) {
        init(i)
      }
      break;
     case pro.FP:
      if(dataFP.value.length === 0) {
        init(i)
      }
      break;
    case pro.CC:
      if(dataCC.value.length == 0) {
        init(i)
      }
      break;
     case pro.YH:
      if(dataYH.value.length == 0) {
         init(i)
      }
      break;
  }
}

// 过滤已选数据
function filterData(data: any, code: any) {
   const result = data.filter((item: any) => {
    return code.includes(item.code) || code.includes(item.orderCode)
   })
   return result;
}

function handleOk() {
  emits('updateData', filterData(objectHT.value.data, codeHT.value), filterData(objectDD.value.data, codeDD.value), filterData(objectFP.value.data, codeFP.value), filterData(objectCC.value.data, codeCC.value), filterData(objectYH.value.data, codeYH.value)  )
  emits('updateAdd', codeHT.value, codeDD.value, codeFP.value, codeCC.value, codeYH.value)
}

async function handleBeforeClose(done: any) {
  await done()
  emits('updateAdd', false)
}

function handleCancel (v: any) {
  emits('updateAdd', false)
}
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