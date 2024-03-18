<template>
<div class="operate-wrap">
  <div class="title">企业用户申报{{ initPageParam.title }}</div>
  <div class="section section-detail-header">
    <div class="section-sub">
      <span style="color: rgba(153, 153, 153, 1);padding-right: 30px;">申请编号：1000</span>
      <span><span style="color: rgba(51, 51, 51, 1)">审批状态：</span><span style="color: rgba(5, 148, 235, 1)">待审批</span></span>
    </div>
    <div v-if="initPageParam.title == '详情'" class="section-sub flex-base-end">
      <w-button style="margin-right: 8px;" @click="showRecord = true">审批记录</w-button>
      <w-button type="primary" @click="toApproval">审批</w-button>
    </div>
  </div>
  <div class="section">
    <div class="section-sub">
      <div class="title-sub">申报人信息</div>
      <w-form :model="form" layout="vertical">
        <w-form-item field="taxAuthority"  label="主管税务机关" disabled required>
          <w-input v-if="initPageParam.edit" style="height: 30px" v-model="form.taxAuthority" placeholder="please enter your username..." />
          <div v-else>{{ form?.taxAuthority }}</div>
        </w-form-item>
        <w-form-item field="companyName" label="申请单位" disabled required>
          <w-input v-if="initPageParam.edit" style="height: 30px" v-model="form.companyName" placeholder="please enter your post..." />
          <div v-else>{{ form.companyName }}</div>
        </w-form-item>
        <w-form-item field="registerAddress" label="注册地址" disabled required>
          <w-input v-if="initPageParam.edit" style="height: 30px" v-model="form.registerAddress" placeholder="please enter your post..." />
           <div v-else>{{ form.registerAddress }}</div>
        </w-form-item>
        <w-form-item field="applyUserName" label="操作人" disabled required>
          <w-input v-if="initPageParam.edit" style="height: 30px" v-model="form.applyUserName" placeholder="please enter your post..." />
           <div v-else>{{ form.applyUserName }}</div>
        </w-form-item>
        <w-form-item field="applyTime" label="申请日期" required>
          <w-date-picker v-if="initPageParam.edit" v-model="form.applyTime" style="width: 100%;height: 30px;" placeholder="请选择日期">
            <template #extra>
              <div>请填写在税务申报系统提交申报的日期</div>
            </template>
          </w-date-picker>
          <!-- <img src="/download?file_name=${filename}"> -->
           <div v-else>{{ form.applyTime }}</div>
        </w-form-item>
      </w-form>
    </div>
    <div class="section-sub">
      <div class="title-sub">申报额度信息</div>
      <w-form :model="form" layout="vertical">
        <w-form-item field="limitType" label="申请调整额度类型" required>
          <w-select v-if="initPageParam.edit" v-model="form.limitType" placeholder="请选择申请调整额度类型" style="height: 30px" @change="handleLone">
            <w-option :value="1" label="长期"></w-option>
            <w-option :value="2" label="短期"></w-option>
          </w-select>
           <div v-else>{{ form.limitType == '1' ? '长期' : '短期' }}</div>
        </w-form-item>
        <w-form-item v-if="form.limitType == '2'" field="adjustType" label="发票短期调整类型" required>
          <w-select v-if="initPageParam.edit" v-model="form.adjustType" placeholder="请选择发票短期调整类型" style="height: 30px" @change="handleLone">
            <w-option :value="1" labbel="当月">当月</w-option>
            <w-option :value="2" labbel="指定时间">指定时间</w-option>
          </w-select>
           <div v-else>{{ form.adjustType == '1' ? '当月' : '指定时间' }}</div>
        </w-form-item>
        <!-- 指定时间 -->
        <w-form-item field="validDateStart" label="起止有效期" required>
          <w-range-picker 
            v-if="initPageParam.edit"
            :popup-visible="popupVisible"
            v-model="dateRange"
            style="width: 100%; height: 30px;"
            @change="onChange"
            @select="dataSelect"
            @popup-visible-change="popupVisibleChange"
          />
           <div v-else>{{ form.validDateStart }} - {{ form.validDateEnd }}</div>
        </w-form-item>
        <w-form-item field="reason" label="申请理由" required>
           <w-textarea v-if="initPageParam.edit" v-model="form.reason" placeholder="请输入申请理由"/>
            <div v-else>{{ form.reason }}</div>
        </w-form-item>
      </w-form>
    </div>
  </div>
  <div class="com-section">
    <div class="title-sub">申报资料</div>
    <card-tab
      :showExtra="false"
      :defaultKey = "defaultKey"
      @handleTab="handleTab"
    >
    </card-tab>
    <w-row class="grid-demo">
      <w-col :span="20">
        <div class="base-flex-start">
          <w-input :style="{width: '532px', height: '32px', marginRight:'16px'}" placeholder="请输入搜索内容"></w-input>
          <w-button type="primary">搜索</w-button>
        </div>
      </w-col>
      <w-col v-if="initPageParam.edit" :span="4">
        <div class="flex-base-end"><w-button type="primary" @click="handleAdd">新增</w-button></div>
      </w-col>
    </w-row>
    <m-table
      :data="dataList"
      :columns="columns"
      :virtual-list-props="{height: 'auto'}" 
      :pagination="false">
      <template v-slot:index="{rowIndex}">
        <div>{{ rowIndex +1 }}</div>
      </template>
    </m-table>
    <div class="flex-base-start sum-line">
      <div style="margin-right: 16px">{{ nameMap[curTab] }}已选：<span class="num-light">{{ dataList.length }}</span></div>
      <div>金额合计：<span class="num-light">{{ totalMoney }}</span></div>
    </div>
  </div>
  <div class="com-section">
    <div class="title-sub title-sub-sub">其他资料</div>
    <div v-if="initPageParam.edit">
      <MultiUpload @updateUpload="updateUpload" :file="fileList"></MultiUpload>
    </div>
    <FileList v-if="!initPageParam.edit" :file="fileList"></FileList>
  </div>
  <div v-if="initPageParam.edit" class="bottom flex-base-end">
    <w-button style="margin-right: 20px" @click="handleSave(1)">暂存</w-button>
    <w-button type="primary" @click="handleSave(2)">提交</w-button>
  </div>
  <detail-com v-if="!initPageParam.edit" :companyId="form.companyId" :companyName="form.companyName" ></detail-com>
  <add-apply-com :showAdd="showAdd" :defaultKey="curTab" :companyName="form.companyName" @updateAdd="updateAdd" @updateData="updateData"></add-apply-com>
  <approval-record :showRecord="showRecord" :reportId="route.query.id" @updateAdd="showRecord = false"></approval-record>
  <ApprovalDo :showAdd="showApproval" @updateAdd="updateApprval" :reportId="route.query.id"></ApprovalDo>
</div>
</template>
<script lang="ts" setup>
import { ref } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import addApplyCom from './addApplyCom.vue';
import detailCom from './detailCom.vue'
import ApprovalRecord from './ApprovalRecords.vue'
import { searcht, add, update, getOneByCompanyName } from '@/api/intellApproval'
import { useUserStoreHook } from "@/store/modules/user";
import { pro, columnsHT,columnsDD, columnsFP, columnsCC, columnsYH, nameMap } from '../type'
import FileList from './FileList.vue';
import ApprovalDo from './ApprovalDo.vue';
import dayjs from "dayjs";
import { rangeArr } from 'element-plus';


const userStore = useUserStoreHook();
let userId = userStore.user.id;
let username = userStore.user.name;
let companyName = userStore?.user?.organization?.name;

const route = useRoute();
const router = useRouter();

const popupVisible = ref(false)
const type = ref('add')
const dataList = ref([])
const columns = ref([])
const dataHT = ref([]) // 已选的合同list
const dataDD = ref([]) // 已选的订单list
const dataFP = ref([]) // 已选的发票list
const dataCC = ref([]) // 已选的仓储list
const dataYH = ref([]) // 已选的银行流水list
const initPageParam = reactive({
  title: '新增',
  edit: true,
  type: 2, // 1有详情数据-更新   2无详情数据-新增
  id: ''
})
const dateRange = ref([])
const form = ref({
  companyId: '', // 企业ID
  applyUserId: '', // 申请人ID :TODO

  taxAuthority: '', // 主管税务机关
  limitType: '', // 申请额度调整类型
  companyName: companyName, // 申请单位
  adjustType:'', // 发票短期调整类型
  registerAddress: '', // 注册地址
  validDateStart: '', // 起始有效期-开始
  validDateEnd: '', // 起始有效期-结束
  applyUserName: '', // 操作人
  reason: '', // 申请理由
  transactionCertificateMapRequestList: [], // 合同
  orderMapRequestList: [], // 订单
  invoiceMapRequestList: [], // 发票
  warehouseMapRequestList: [], // 仓储
  bankStatementMapRequestList: [], // 银行流水
  otherMaterialsRequestList: [], // 其他资料
})
const defaultKey = ref('1'); // 默认打开的tab
const curTab = ref('1') // 当前打开的tab
const showAdd = ref(false); // 新增资料弹窗
const showRecord = ref(false); // 审批记录
const showApproval = ref(false) // 审批窗口
const totalMoney = ref(0);
const fileList = ref([]) // 已经提交的文件

// 切换长qi
function handleLone(v) {
  dateRange.value = []
}

function updateApprval() {
  showApproval.value = false;
}

function toApproval() {
  showApproval.value = true;
}

// 更新上传的文件
function updateUpload(file) {
  form.value.otherMaterialsRequestList = file;
}

// 添加资料
function handleAdd() {
  showAdd.value = true;
}

function getSum(key: string) {
  let sum = 0;
  dataList.value.forEach((item: any) => {
    sum += item[key]
  })
  totalMoney.value = sum;
}

function handleTab(v: any) {
  curTab.value = v;
  updateTable(dataHT.value, dataDD.value, dataFP.value, dataCC.value, dataYH.value);
}

function updateTable(HT:any, DD:any, FP:any, CC:any, YH:any,) {
    switch(curTab.value) {
    case pro.HT:
      dataList.value = HT;
      columns.value = columnsHT as any;
      getSum('amount');
      break;
    case pro.DD:
      columns.value = columnsDD as any;
      dataList.value = DD;
      getSum('totalMoney')
      break;
     case pro.FP:
      columns.value = columnsFP as any;
      dataList.value = FP;
      getSum('amountTotal')
      break;
    case pro.CC:
      columns.value = columnsCC as any;
      dataList.value = CC;
      totalMoney.value = 0;
      break;
     case pro.YH:
      columns.value = columnsYH as any;
      dataList.value = YH;
      getSum('paymentAmount')
      break;
  }
}

function updateData(HT:any, DD:any, FP:any, CC:any, YH:any,) {
  dataHT.value = HT
  dataDD.value = DD
  dataFP.value = FP
  dataCC.value = CC
  dataYH.value = YH 
  updateTable(HT, DD, FP, CC, YH);
}

function updateAdd(codeHT:any, codeDD: any, codeFP: any, codeCC: any, codeYH: any) {
  showAdd.value = false;
  form.value.transactionCertificateMapRequestList = codeHT  // 合同
  form.value.orderMapRequestList = codeDD   // 订单
  form.value.bankStatementMapRequestList = codeYH // 银行流水
  form.value.invoiceMapRequestList = codeFP   // 发票
  form.value.warehouseMapRequestList = codeCC    // 仓储
}

// 新增暂存、新增提交
function handleSave(type: any) {
  // 1暂存 2提交
  form.value.dataStatus = type;
  form.value.validDateStart = dateRange.value[0];
  form.value.validDateEnd = dateRange.value[1]
  if(initPageParam.type == 1) {
    // 更新
    form.value.id = initPageParam.id
    handleUpdate();
  } else {
    // 新增
    handleAddNew()
  }
}

// 编辑新增成功，返回列表页
function backToList() {
  router.push({ 
    path: '/intellApproval', 
 });
}

function handleUpdate() {
  update(form.value).then(res => {
    ElMessage.success("编辑成功！");
    setTimeout(()=>{
      backToList()
    },500)
  }).catch(err => {})
}

// 新增
function handleAddNew() {
  add(form.value).then(res => {
    ElMessage.success("保存成功！");
    setTimeout(()=>{
      backToList()
    },500)
  }).catch(err => {})
}

function dataSelect(d:any) {
  if(form.value.limitType == '1') { // 长期
    dateRange.value = [d[0], '2099-12-31']
    popupVisibleChange()
  } else if(form.value.limitType == '2' && form.value.adjustType == '1') { // 当月
    let nextMonth = dayjs(d[0]).add(30, 'day')
    dateRange.value = [d[0], nextMonth]
    popupVisibleChange()
  }
}

function popupVisibleChange() {
  popupVisible.value = !popupVisible.value
}

// 时间选择
function onChange(dateString, date) {
  // dateRange.value = [d, 2024-03-13 00:00:00]
  if(dateString && dateString.length > 0) {
    form.value.validDateStart = dateString[0];
    form.value.validDateEnd = dateString[1];
  } else {
    form.value.validDateStart = '';
    form.value.validDateEnd = '';
  }
}

// 申报详情
function getDetail(d) {
  searcht(d).then(res => {
    if(JSON.stringify(res.data) != '{}') {
      initPageParam.type = 1
      initPageParam.id = res.data.id
      dataHT.value = res.data.transactionCertificateMapResponseList
      dataDD.value = res.data.orderMapResponseList
      dataFP.value = res.data.invoiceMapResponseList
      dataCC.value = res.data.warehouseMapResponseList
      dataYH.value = res.data.bankStatementMapResponseList
      fileList.value = res.data.otherMaterialsResponseList
      dataList.value = res.data.transactionCertificateMapResponseList
      columns.value = columnsHT
      form.value = res.data as any
      dateRange.value = [res.data.validDateStart, res.data.validDateEnd]
    } else {
      getgetOneByCompanyName() // 当前返回数据为空，新增，且无暂存，则查询企业基本信息
    }
  }).catch(err => {})
}

// 公司基本信息
function getgetOneByCompanyName() {
  getOneByCompanyName({
    companyName: form.value.companyName
  }).then(res => {
    form.value.taxAuthority = res.data.taxAuthority;
    form.value.companyName = res.data.companyName;
    form.value.registerAddress = res.data.companyAddress;
    form.value.applyUserName = username as any
    form.value.applyUserId = userId as any
    form.value.companyId = res.data.companyId
  }).catch(err => {})
}

function init() {
  type.value = route.query.type as any;
  let id = route.query.id // 申请人发票ID
  if(type.value === 'detail') {
    initPageParam.edit = false;
    initPageParam.title = '详情'
    getDetail({
      id,
    });
  } else if(type.value === 'add') {
    initPageParam.title = '新增'
    getDetail({
      applyUserId: userId
    })
    // 查询是否有暂的数据
  } else {
    // 编辑 查询详情
    initPageParam.title = '编辑'
    getDetail({
      id,
    })
  }
}

init()
</script>

<style lang="scss" scoped>
.section-detail-header {
  padding-bottom: 18px;
  margin-bottom: 24px;
  border-bottom: 1px solid #EDF1FC;;
}
.grid-demo {
  margin-top: 24px;
  margin-bottom: 16px;
}
.operate-wrap {
  padding: 30px 90px;
  height: calc(100vh - 200px);
  background: #fff;
  overflow-y: scroll;
  .title-sub {
    width: 90px;
    height: 25px;
    font-family: PingFangSC, PingFang SC;
    font-weight: 500;
    font-size: 18px;
    color: #000000;
    line-height: 25px;
    text-align: left;
    font-style: normal;
    margin-bottom: 16px;
  }
  .title-sub-sub {
    font-size: 16px;
    margin-top: 22px;
  }
  .section {
    display: flex;
    .title-sub {
      width: 100%;
    }
    .section-sub:nth-child(2) {
      margin-left: 25px;
    }
    .section-sub {
     flex: 1;
    }

  }
  .title {
    position: relative;
    margin-bottom: 24px;
    padding-left: 11px;
    font-family: PingFangSC, PingFang SC;
    font-weight: 500;
    font-size: 18px;
    color: #333333;
    line-height: 22px;
    &::before {
      content: "";
      position: absolute;
      left: 0px;
      top: 50%;
      transform: translateY(-50%);
      width: 3px;
      height: 18px;
      background-color: #1890ff;
    }
  }
}
.num-light {
  color: rgba(52, 112, 255, 1);
  line-height: 22px;
}
.sum-line {
  margin-top: 24px;
}
.upload-msg {
  font-family: PingFangSC, PingFang SC;
  font-weight: 400;
  font-size: 14px;
  color: #BFC4CD;
  line-height: 20px;
  text-align: left;
}
.bottom {
  margin-top: 20px;
  padding: 12px 0;
  border-top: solid 1px rgba(237, 241, 252, 1);
}
:deep(.w-textarea) {
  height: 120px;
}
:deep(.w-tabs-content) {
  display: none;
}
</style>

