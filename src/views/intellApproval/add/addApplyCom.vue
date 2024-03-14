<template>
  <el-dialog v-model="visible" :before-close="handleBeforeClose" :width="600">
    <w-spin :loading="loading">
    <div class="dia-content">
      <card-tab
        :showExtra="false"
        :defaultKey = "defaultKey"
        @handleTab="handleTab"
      >
      </card-tab>
      <div style="margin-top: 12px; margin-left: 3px;">
        <m-transfer
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
        ></m-transfer>
        <m-transfer
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
        ></m-transfer>
      </div>
    </div>
    </w-spin>
    <template #header>
      <div class="dia-header">新增资料</div>
    </template>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="handleCancel">取消</el-button>
        <el-button type="primary" @click="handleOk">确定</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
import { ref, watch } from 'vue';
import { qyzxTransactionCertificate, qyzxOrder, qyzxInvoice, qyzxWarehouse, qyzxBankStatement } from '@/api/archives'
import { pro, prosMap } from '../type'

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

// TODO:未开发
function load(code) {
  switch(curTab.value) {
    case pro.HT:
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

// 更新穿梭组件选中的code
function updateChecked(code: any) {
  switch(curTab.value) {
    case pro.HT:
      codeHT.value = code
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

function init(i: any) {
  switch(i) {
    case pro.HT:
      transferProps.value = prosMap[pro.HT]
      rightDefaultChecked.value = codeHT.value
      getList(qyzxTransactionCertificate, searchHT.value)
      break;
    case pro.DD:
      transferProps.value = prosMap[pro.DD]
      rightDefaultChecked.value = codeDD.value
      getList(qyzxOrder, searchDD.value)
      break;
     case pro.FP:
      transferProps.value = prosMap[pro.FP]
      rightDefaultChecked.value = codeFP.value
      getList(qyzxInvoice, searchFP.value)
      break;
    case pro.CC:
      transferProps.value = prosMap[pro.CC]
      rightDefaultChecked.value = codeCC.value
      getList(qyzxWarehouse, searchCC.value)
      break;
     case pro.YH:
      transferProps.value = prosMap[pro.YH]
      rightDefaultChecked.value = codeYH.value
      getList(qyzxBankStatement, searchYH.value)
      break;
  }
}

// 获取数据list
function getList(fun: any, par: any) {
  fun(par).then((res: any) => {
    updataDataList(res.data, res.total);
  }).catch((err: any) => {})
}

// 赋值穿梭组件左侧
function updataDataList(data: any, total: any) {
  switch(curTab.value) {
    case pro.HT:
      totalHT.value = total
      dataHT.value = data
      break;
    case pro.DD:
      totalDD.value = total
      dataDD.value = data
      break;
     case pro.FP:
      totalFP.value = total
      dataFP.value = data
      break;
    case pro.CC:
      totalCC.value = total
      dataCC.value = data
      break;
     case pro.YH:
      totalYH.value = total
      dataYH.value = data
      break;
  }
}

// 切换tab
function handleTab(i: any) {
  // 切换tab前，对list数据做深拷贝，通过已选code对list过滤，存储已选的完整数据
  // 点击确定时，将已选的code和完整数据回传到编辑、添加页面回显
  curTab.value = i;
  checkLoadList(i);
  init(i)
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
  emits('updateData', filterData(dataHT.value, codeHT.value), filterData(dataDD.value, codeDD.value), filterData(dataFP.value, codeFP.value), filterData(dataCC.value, codeCC.value), filterData(dataYH.value, codeYH.value)  )
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