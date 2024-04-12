<template>
<div class="operate-wrap">
  <div class="title">企业用户申报{{ initPageParam.title }}</div>
  <div class="section section-detail-header">
    <div v-if="queryPar.reportCode" class="section-sub">
      <span style="color: rgba(153, 153, 153, 1); padding-right: 30px;">申请编号：{{ queryPar?.reportCode }}</span>
      <span>
        <span style="color: rgba(51, 51, 51, 1)">审批状态：</span>
          <span :style="{color: approveStatusColor[form?.approveStatus]}">{{ approveStatus[form?.approveStatus] }}</span>
        </span>
    </div>
    <div v-if="initPageParam.title == '详情'" class="section-sub flex-base-end">
      <w-button v-hasPerm="btnApprovalCode.approvallist" style="margin-right: 8px;" @click="showRecord = true">审批记录</w-button>
      <w-button v-hasPerm="btnApprovalCode.approval" type="primary" @click="updateApprval">审批</w-button>
    </div>
  </div>
  <!-- 企业用户申报详情 -->
  <div v-hasPerm="approvalMapping.appravalDetail">
    <div class="section">
    <div class="section-sub">
      <div class="title-sub">申报人信息</div>
      <el-form ref="basefrom1" :model="form" layout="vertical" :rules="rules">
        <el-form-item prop="taxAuthority"  label="主管税务机关" required>
          <w-input v-if="initPageParam.edit" style="height: 32px" disabled  v-model="form.taxAuthority" placeholder="请输入主管税务机关" />
          <div v-else>{{ form?.taxAuthority }}</div>
        </el-form-item>
        <el-form-item prop="companyName" label="申请单位" required>
          <w-input v-if="initPageParam.edit" style="height: 32px" disabled v-model="form.companyName" placeholder="请输入申请单位" />
          <div v-else>{{ form.companyName }}</div>
        </el-form-item>
        <el-form-item prop="registerAddress" label="注册地址" required>
          <w-input v-if="initPageParam.edit" style="height: 32px" v-model="form.registerAddress" disabled placeholder="请输入注册地址" />
           <div v-else>{{ form.registerAddress }}</div>
        </el-form-item>
        <el-form-item prop="applyUserName" label="操作人" required>
          <w-input v-if="initPageParam.edit" style="height: 32px" v-model="form.applyUserName" disabled placeholder="请输入操作人" />
           <div v-else>{{ form.applyUserName }}</div>
        </el-form-item>
        <el-form-item prop="applyTime" label="申请日期">
          <el-date-picker 
            v-if="initPageParam.edit"
            v-model="form.applyTime"
            style="width: 100%;
            height: 32px;" 
            placeholder="请选择日期"
            format="YYYY-MM-DD"
            value-format="YYYY-MM-DD"
          ></el-date-picker>
           <div v-else>{{ form.applyTime && form.applyTime.split(' ')[0] }}</div>
           <span v-if="initPageParam.edit" class="date-msg">请填写在税务申报系统提交申报时的日期</span>
        </el-form-item>
      </el-form>
    </div>
    <div class="section-sub">
      <div class="title-sub">申报额度信息</div>
      <el-form ref="basefrom2" :model="form" layout="vertical" :rules="rules">
         <el-form-item prop="money" label="申请额度" required>
          <w-input-number v-if="initPageParam.edit" v-model="form.money" placeholder="请输入额度" style="height: 32px">
          </w-input-number>
           <div v-else>{{ form.money }}</div>
        </el-form-item>
        <el-form-item prop="limitType" label="申请调整额度类型" required>
          <el-select v-if="initPageParam.edit" v-model="form.limitType" placeholder="请选择申请调整额度类型" style="height: 32px" @change="handleChangeDate">
            <el-option :value="1" label="长期"></el-option>
            <el-option :value="2" label="短期"></el-option>
          </el-select>
           <div v-else>{{ form.limitType == '1' ? '长期' : '短期' }}</div>
        </el-form-item>

        <el-form-item v-if="form.limitType == '2'" prop="adjustType" label="发票短期调整类型" required>
          <el-select v-if="initPageParam.edit" v-model="form.adjustType" placeholder="请选择发票短期调整类型" style="height: 32px" @change="handleChangeDate">
            <el-option :value="1" label="当月"></el-option>
            <el-option :value="2" label="指定时间"></el-option>
          </el-select>
           <div v-else>{{ form.adjustType == '1' ? '当月' : '指定时间' }}</div>
        </el-form-item>
        <div v-if="initPageParam.edit">
          <el-form-item v-if="form.limitType== '1' || (form.limitType== '2') && form.adjustType == '1'" prop="validDateStart" label="起止有效期">
            <el-date-picker v-model="form.validDateStart" format="YYYY-MM-DD" type="date" placeholder="请选择日期" @change="changeDate"></el-date-picker>
            <span style="display: inline-block;padding: 0 40px;"> 至 </span>
            <span>{{ form.validDateEnd }}</span>
          </el-form-item>
          <el-form-item v-if=" (form.limitType== '2') && form.adjustType == '2'" prop="validDateStart" label="起止有效期">
            <el-date-picker
              v-model="curDate"
              type="daterange"
              :clearable="false"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              format="YYYY-MM-DD"
              @change="changeDateRange"
            >
            </el-date-picker>
          </el-form-item>
        </div>
        <el-form-item v-else prop="validDateStart" label="起止有效期">
          <span>{{ form.validDateStart && form.validDateStart.split(' ')[0] }}</span>
            <span style="display: inline-block;padding: 0 40px;"> 至 </span>
            <span>{{ form.validDateEnd && form.validDateEnd.split(' ')[0] }}</span>
        </el-form-item>
        <el-form-item prop="reason" label="申请理由" required>
          <el-input v-if="initPageParam.edit" type="textarea" v-model="form.reason"></el-input>
          <div v-else>{{ form.reason }}</div>
        </el-form-item>
      </el-form>
    </div>
    </div>
    
    <div class="com-section" >
      <div class="title-sub">申报资料</div>
      <validateExcel
        :form="form"
        :reportId="reportId"
        @updateReportId="updateReportId"
        @updateFileData="updateFileData"
        ></validateExcel>
      <card-tab
        :tabData="tabData"
        :showExtra="false"
        :defaultKey = "defaultKey"
        @handleTab="handleTab"
      >
      </card-tab>
      <!-- <w-row class="grid-demo">
        <w-col :span="20">
          <div class="base-flex-start">
            <w-input :style="{width: '532px', height: '32px', marginRight:'16px'}" placeholder="请输入搜索内容"></w-input>
            <w-button type="primary">搜索</w-button>
          </div>
        </w-col>
        <w-col v-if="initPageParam.edit" :span="4">
          <div class="flex-base-end"><w-button type="primary" @click="handleAdd">新增</w-button></div>
        </w-col>
      </w-row> -->
      <InfoDD
        v-if="curTab == pro.DD" 
        :reportId="reportId"
      ></InfoDD>
      <InfoHT
        v-if="curTab == pro.HT"
        :companyName="companyName"
      ></InfoHT>
      <!-- 发票不区分进项和销项 -->
      <InfoFP
        v-if="curTab == pro.FP"
      ></InfoFP>
      <InfoYH
        v-if="curTab == pro.YH"
        :companyName="companyName"
      ></InfoYH>
      <InfoCC
        v-if="curTab == pro.CC"
        :companyName="companyName"
      ></InfoCC>
      <InfoWL
        v-if="curTab == pro.WL"
      ></InfoWL>
      <!-- <m-table
        :data="dataList"
        :columns="columns"
        :virtual-list-props="{height: 'auto'}"
        :pagination="false">
        <template v-slot:index="{rowIndex}">
          <div>{{ rowIndex +1 }}</div>
        </template>
      </m-table> -->
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
  </div>
  
  <div v-if="initPageParam.edit" class="bottom flex-base-end">
    <w-button v-hasPerm="btnApprovalCode.save" style="margin-right: 20px" @click="handleSave(1, '暂存')">暂存</w-button>
    <w-button v-hasPerm="btnApprovalCode.submit" type="primary" @click="handleSave(2, '提交')">提交</w-button>
  </div>
  <detail-com v-hasPerm="btnApprovalCode.approvalexcute" :companyId="form.companyId" :companyName="form.companyName" :reportId="route.query.id" :preStrMoney="form.preStrMoney"></detail-com>
  <add-apply-com :showAdd="showAdd" :defaultKey="curTab" :companyName="form.companyName" @updateAdd="updateAdd" @updateData="updateData"></add-apply-com>
  <approval-record :showRecord="showRecord" :reportId="route.query.id" @updateAdd="showRecord = false"></approval-record>
  <ApprovalDo :showAdd="showApproval" @updateAdd="updateApprval" @updateData="updateApprovalStatus" :reportId="route.query.id"></ApprovalDo>
</div>
</template>
<script lang="ts" setup>
import { ref, watch } from 'vue';
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
import { btnApprovalCode, approvalMapping } from '@/router/permissionCode'
import { approveStatus,approveStatusColor } from '../type'
import validateExcel from './validateExcel.vue'
import InfoDD from './InfoDD.vue'
import InfoHT from './InfoHT.vue'
import InfoFP from './InfoFP.vue'
import InfoWL from './InfoWL.vue'
import InfoYH from './InfoYH.vue'
import InfoCC from './InfoCC.vue'

const userStore = useUserStoreHook();

let userId = userStore.user.id;
let username = userStore.user.name;
let companyName = userStore?.user?.organization?.name;
// const dataPermissionCode = userStore.user.dataPermissionCode || []; // 模块权限码

const route = useRoute();
const router = useRouter();

const reportId = ref(-1)
const tabData = ref({
  HT: {
    name: '订单',
    key: "2",
    status: 0 // 默认状态为0 1为附件有误 2为正确
  },
  DD: {
    name: '合同',
    key: "1",
    status: 1 // 默认状态为0 1为附件有误 2为正确
  },
  PF: {
    name: '发票',
    key: "3",
    status: 2 // 默认状态为0 1为附件有误 2为正确
  },
  YH: {
    name: '银行流水',
    key: "5",
    status: 2 // 默认状态为0 1为附件有误 2为正确
  },
  CC: {
    name: '仓储',
    key: "4",
    status: 2 // 默认状态为0 1为附件有误 2为正确
  },
  WL: {
    name: '物流',
    key: "6",
    status: 0 // 默认状态为0 1为附件有误 2为正确
  },
})
const basefrom1 = ref();
const basefrom2 = ref();
const rules = reactive({
  applyTime: [{ required: true, message: '申请日期不能为空', trigger: ['blur', 'change'] }],
  money: [{ required: true, message: '请输入申请额度', trigger: 'focus' }],
  reason: [{ required: true, message: '请输入申请理由', trigger: 'blur' }],
  limitType: [{ required: true, message: '请选择调整类型', trigger: ['blur', 'change'] }],
  adjustType: [{ required: true, message: '请选择短期调整类型' }],
  validDateStart: [{ required: true, message: '请选择起止有效期',trigger: ['blur', 'change'] }],
})
const type = ref('add')
const dataList = ref([])
// const columns = ref([])
// const dataHT = ref([]) // 已选的合同list
// const dataDD = ref([]) // 已选的订单list
// const dataFP = ref([]) // 已选的发票list
// const dataCC = ref([]) // 已选的仓储list
// const dataYH = ref([]) // 已选的银行流水list
const initPageParam = reactive({
  title: '新增',
  edit: true,
  type: 2, // 1有详情数据-更新   2无详情数据-新增
  id: ''
})
const curDate = ref('')
const form = ref({
  companyId: '', // 企业ID
  applyUserId: '', // 申请人ID :TODO
  money: 0,
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
  preStrMoney: ''// 需求预测
})
const defaultKey = ref('2'); // 默认打开的tab
const curTab = ref('2') // 当前打开的tab
const showAdd = ref(false); // 新增资料弹窗
const showRecord = ref(false); // 审批记录
const showApproval = ref(false) // 审批窗口
const totalMoney = ref(0);
const fileList = ref([]) // 已经提交的文件
const queryPar = ref({}) // 路由查询参数

// 更新审批id
function updateReportId(id) {
  reportId.value = id;
}

// 文件上传成功，刷新列表
function updateFileData() {
  let tab = curTab.value;
  curTab.value = '-1';
  nextTick(() => {
    curTab.value = tab
  })
  
}

// 切换时间类型
function handleChangeDate() {
  // 长期 limitType
  form.value.validDateStart = dayjs().format('YYYY-MM-DD')
  if(form.value.limitType == '1') {
    form.value.validDateEnd = '2099-12-31'
  } else if(form.value.limitType == '2' && form.value.adjustType == '1') { //1当月
    form.value.validDateEnd = dayjs(form.value.validDateStart).add(30, 'day').format('YYYY-MM-DD')
  } else {
    curDate.value = '';
    form.value.validDateEnd = ''
    form.value.validDateStart = ''
  }
}
// 切换时间类型
function changeDate(v) {
  if(form.value.limitType == '2' && form.value.adjustType == '1') { //1当月
    form.value.validDateEnd = dayjs(form.value.validDateStart).add(30, 'day').format('YYYY-MM-DD')
  }
}
// 切换时间类型
function formateDate(now) {
  return `${now.getFullYear()}-${(now.getMonth() + 1).toString().padStart(2, '0')}-${now.getDate().toString().padStart(2, '0')}`
}
// 切换时间类型
function changeDateRange(v) {
  form.value.validDateStart = formateDate(curDate.value[0])
  form.value.validDateEnd = formateDate(curDate.value[1])
}

// 更新审批状态
function updateApprovalStatus() {
  let id = route.query.id // 申请人发票ID
  getDetail({
    id,
  });
}

function updateApprval() {
  showApproval.value = !showApproval.value;
}

// 更新上传的文件
function updateUpload(file) {
  form.value.otherMaterialsRequestList = file;
}

// 添加资料
// function handleAdd() {
//   showAdd.value = true;
// }

// function getSum(key: string) {
//   let sum = 0;
//   dataList.value.forEach((item: any) => {
//     sum += item[key]
//   })
//   totalMoney.value = sum;
// }

function handleTab(v: any) {
  curTab.value = v;
  // updateTable(dataHT.value, dataDD.value, dataFP.value, dataCC.value, dataYH.value);
}

// function updateTable(HT:any, DD:any, FP:any, CC:any, YH:any,) {
//     switch(curTab.value) {
//     case pro.HT:
//       dataList.value = HT;
//       columns.value = columnsHT as any;
//       getSum('amount');
//       break;
//     case pro.DD:
//       columns.value = columnsDD as any;
//       dataList.value = DD;
//       getSum('totalMoney')
//       break;
//      case pro.FP:
//       columns.value = columnsFP as any;
//       dataList.value = FP;
//       getSum('amountTotal')
//       break;
//     case pro.CC:
//       columns.value = columnsCC as any;
//       dataList.value = CC;
//       totalMoney.value = 0;
//       break;
//      case pro.YH:
//       columns.value = columnsYH as any;
//       dataList.value = YH;
//       getSum('paymentAmount')
//       break;
//   }
// }

// function updateData(HT:any, DD:any, FP:any, CC:any, YH:any,) {
//   dataHT.value = HT
//   dataDD.value = DD
//   dataFP.value = FP
//   dataCC.value = CC
//   dataYH.value = YH
//   updateTable(HT, DD, FP, CC, YH);
// }


// function updateAdd(codeHT:any, codeDD: any, codeFP: any, codeCC: any, codeYH: any) {
//   showAdd.value = false;
//   form.value.transactionCertificateMapRequestList = codeHT  // 合同
//   form.value.orderMapRequestList = codeDD   // 订单
//   form.value.bankStatementMapRequestList = codeYH // 银行流水
//   form.value.invoiceMapRequestList = codeFP   // 发票
//   form.value.warehouseMapRequestList = codeCC    // 仓储
// }

// 新增暂存、新增提交

function handleSave(type: any, msg: string) {
  basefrom1.value.validate(v => {
    if(v) {
      basefrom2.value.validate(k => {
        if(k) {
          checkSave(type, msg)
        } else {
          ElMessage.warning("请核实必填信息");
        }
      })
    } else {
      ElMessage.warning("请核实必填信息");
    }
  })
}

function checkSave(type: any, msg: string) {
    // 1暂存 2提交
  form.value.dataStatus = type;
  if(initPageParam.type == 1) {
    // 更新
    form.value.id = initPageParam.id
    handleUpdate(msg);
  } else {
    // 新增
    handleAddNew(msg)
  }
}

// 编辑新增成功，返回列表页
function backToList() {
  router.push({
    path: '/intellApproval',
 });
}

function handleUpdate(msg: string) {
  update(form.value).then(res => {
    ElMessage.success(msg + "成功！");
    setTimeout(()=>{
      backToList()
    },500)
  }).catch(err => {})
}

// 新增
function handleAddNew(msg) {
  add(form.value).then(res => {
    ElMessage.success(msg + "成功！");
    setTimeout(()=>{
      backToList()
    },500)
  }).catch(err => {})
}

// 申报详情
function getDetail(d) {
  searcht(d).then(res => {
    if(JSON.stringify(res.data) != '{}') {
      initPageParam.type = 1
      initPageParam.id = res.data.id
      // TODO: 第一个版本的逻辑，选择河东订单前端本地缓存
      // dataHT.value = res.data.transactionCertificateMapResponseList
      // dataDD.value = res.data.orderMapResponseList
      // dataFP.value = res.data.invoiceMapResponseList
      // dataCC.value = res.data.warehouseMapResponseList
      // dataYH.value = res.data.bankStatementMapResponseList
      // columns.value = columnsHT
      fileList.value = res.data.otherMaterialsResponseList
      dataList.value = res.data.transactionCertificateMapResponseList
      form.value = res.data as any
      form.value.taxAuthority = '东疆综合保税区税务局'
      curDate.value = [res.data.validDateStart, res.data.validDateEnd]
      reportId.value = res.data.id
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
    form.value.taxAuthority = '东疆综合保税区税务局'
    form.value.companyName = res.data.companyName;
    form.value.registerAddress = res.data.companyAddress;
    form.value.applyUserName = username as any
    form.value.applyUserId = userId as any
    form.value.companyId = res.data.companyId
  }).catch(err => {})
}

function init() {
  type.value = route.query.type as any;
  queryPar.value = route.query;
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
    reportId.value = route.query.id
    getDetail({
      id,
    })
  }
}

init()
</script>

<style lang="scss" scoped>
.date-msg {
  display: block;
  margin-top: 12px;
  padding-left: 17px;
  height: 22px;
  font-family: PingFangSC, PingFang SC;
  font-weight: 400;
  font-size: 14px;
  color: #999999;
  line-height: 22px;
  text-align: right;
  font-style: normal;
}
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
  height: calc(100vh - 120px);
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
  position: fixed;
  left: 16px;
  right: 16px;
  bottom: 0;
  z-index: 99;
  padding: 12px 24px;
  background: #fff;
  border-top: solid 1px rgba(237, 241, 252, 1);
}
.section {
  :deep(.w-textarea) {
    height: 120px;
  }
  :deep(.w-tabs-content) {
    display: none;
  }
  :deep(.el-form-item) {
    flex-direction: column;
    // align-items: flex-start;
  }
  :deep(.el-form-item__label ) {
    justify-content: flex-start;
  }
  :deep(.el-form-item__label) {
    color: rgba(39, 42, 49, 1);
    font-weight: 500;
    font-size: 14px;;
  }
  :deep(.el-form-item--default) {
    margin-bottom: 24px;;
  }
  :deep(.el-textarea__inner) {
    height: 148px;
  }
}


</style>

