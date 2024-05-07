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
      <approval-record
        v-hasPerm="btnApprovalCode.approvallist"
      ></approval-record>
      <!-- <w-button v-hasPerm="btnApprovalCode.approvallist" style="margin-right: 8px;" @click="showRecord = true">审批记录</w-button> -->
      <w-button
        v-hasPerm="btnApprovalCode.approval" 
        type="primary"
        :disabled="form?.approveStatus != status.wait" 
        @click="updateApprval">审批</w-button>
    </div>
  </div>
  <!-- 企业用户申报详情 -->
  <div v-hasPerm="approvalMapping.appravalDetail">
    <div class="section">
    <div class="section-sub">
      <div class="title-sub">申报人信息</div>
      <el-form v-if="initPageParam.edit" ref="basefrom1" :model="form" layout="vertical" :rules="rules">
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
      <personInfo v-else :data="form"></personInfo>
    </div>
    <div class="section-sub">
      <div class="title-sub">申报额度信息</div>
      <el-form v-if="initPageParam.edit" ref="basefrom2" :model="form" layout="vertical" :rules="rules">
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
      <moneyInfo v-else :data="form"></moneyInfo>
    </div>
    </div>
    
    <div class="com-section" >
      <div class="title-sub">申报资料</div>
      <validateExcel
        v-if="initPageParam.edit"
        :form="form"
        :reportId="reportId"
        :errorFlag="errorFlag"
        :defaultfileList="ziliaoFile"
        @updateReportId="updateReportId"
        @updateFileData="updateFileData"
        ></validateExcel>
      <div style="margin-bottom: 12px;"  v-else>
        <FileList :file="ziliaoFile" :showOnline="false"></FileList>
      </div>
      <card-tab
        :tabData="tabData"
        :showExtra="false"
        :defaultKey = "defaultKey"
        @handleTab="handleTab"
      >
      </card-tab>
      <!-- <w-row class="grid-demo">
        <w-col :span="20">
        </w-col>
        <w-col v-if="initPageParam.edit" :span="4">
          <div class="flex-base-end"><w-button type="primary" @click="handleAdd">新增</w-button></div>
        </w-col>
      </w-row> -->
      <InfoDD
        v-show="curTab == pro.DD" 
        :reportId="reportId"
        :approveStatus="form.approveStatus"
      ></InfoDD>
      <InfoHT
        v-show="curTab == pro.HT"
        :reportId="reportId"
        :approveStatus="form.approveStatus"
      ></InfoHT>
      <!-- 发票不区分进项和销项 -->
      <InfoFP
        :reportId="reportId"
        v-show="curTab == pro.FP"
        :approveStatus="form.approveStatus"
      ></InfoFP>
      <InfoYH
        v-if="curTab == pro.YH"
        :reportId="reportId"
      ></InfoYH>
      <InfoCC
        v-if="curTab == pro.CC"
        :reportId="reportId"
      ></InfoCC>
      <InfoWL
        v-if="curTab == pro.WL"
        :reportId="reportId"
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
        <div style="margin-right: 16px">{{ nameMap[curTab] }}已选：<span class="num-light">{{ formatNumber(totalMoney?.count) || 0 }}</span></div>
        <div v-if="![pro.CC, pro.WL].includes(curTab)">金额合计：<span class="num-light">{{ formatNumber(totalMoney?.totalMoneySum) || 0 }}</span></div>
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
  
  <div v-if="type == 'add'" class="bottom flex-base-end">
    <w-button v-hasPerm="btnApprovalCode.save" style="margin-right: 20px" @click="handleSave(1, '暂存')">暂存</w-button>
    <w-button v-hasPerm="btnApprovalCode.submit" type="primary" @click="handleSave(2, '提交')">提交</w-button>
  </div>
  <div v-if="type == 'operate'" class="bottom flex-base-end">
    <w-button
      v-hasPerm="btnApprovalCode.save"
      style="margin-right: 20px"
      @click="handleSave(2, '更新')">更新</w-button>
    <w-button v-hasPerm="btnApprovalCode.submit" type="primary" @click="handleSave(2, '提交')">提交</w-button>
  </div>
  <detail-com 
    v-if="type == 'detail'"
    v-hasPerm="btnApprovalCode.approvalexcute" 
    :companyId="form.companyId"
    :companyName="form.companyName" 
    :reportId="reportId"
    :preStrMoney="form.preStrMoney"
  ></detail-com>
  <add-apply-com :showAdd="showAdd" :defaultKey="curTab" :companyName="form.companyName" @updateAdd="updateAdd" @updateData="updateData"></add-apply-com>
  <ApprovalDo :showAdd="showApproval" @updateAdd="updateApprval" @updateData="updateApprovalStatus" :reportId="reportId"></ApprovalDo>
  <fileError :showAdd="errdata.flag" :errObj="errdata" @updateAdd="closeError"></fileError>
  <el-dialog v-model="suafaErr.flag" :width="700">
    <template #header>
      <div class="dia-header">错误信息</div>
    </template>
    <div class="err-main">
      <div v-for="(item, i) in suafaErr.data" :key="i">{{ item }}</div>
    </div>
    <template #footer>
      <span class="dialog-footer">
        <w-button type="primary" style="margin-left: 16px;" @click="suafaErr.flag = false">确定</w-button>
      </span>
    </template>
  </el-dialog>
  <div v-if="loading" class="mask"><w-spin dot :loading="true"></w-spin></div>
</div>
</template>
<script lang="ts" setup>
import { ref, computed } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import addApplyCom from './addApplyCom.vue';
import detailCom from './detailCom.vue'
import ApprovalRecord from './ApprovalRecords.vue'
import { searcht, add, update, getOneByCompanyName, businessUpdate, businessAdd } from '@/api/intellApproval'
import { useUserStoreHook } from "@/store/modules/user";
import { pro, nameMap } from '../type'
import FileList from './FileList.vue';
import ApprovalDo from './ApprovalDo.vue';
import dayjs from "dayjs";
import { btnApprovalCode, approvalMapping } from '@/router/permissionCode'
import { approveStatus,approveStatusColor, status } from '../type'
import validateExcel from './validateExcel.vue'
import InfoDD from './InfoDD.vue'
import InfoHT from './InfoHT.vue'
import InfoFP from './InfoFP.vue'
import InfoWL from './InfoWL.vue'
import InfoYH from './InfoYH.vue'
import InfoCC from './InfoCC.vue'
import fileError from './fileError.vue'
import { useApprovalStore } from '@/store/modules/approval'
import { getTotalMoney } from '@/api/intellApproval/special'
import { useNoticeApprovalStore } from '@/store/modules/notice'
import { formatNumber } from '@/utils/common'
import moneyInfo from './moneyInfo.vue'
import personInfo from './personInfo.vue';

const noticeStore = useNoticeApprovalStore()

const approvalStore = useApprovalStore();

const userStore = useUserStoreHook();

const tabData = computed(() => {
  return approvalStore.tabData
})

let userId = userStore.user.id;
let username = userStore.user.name;
let companyName = userStore?.user?.organization?.name;

const route = useRoute();
const router = useRouter();

const suafaErr = ref({
  flag: false,
  data: []
})
const loading = ref(false)
const ziliaoFile = ref([]) // 申报资料上传的文件
const reportId = ref(-1)
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
  companyName: '', // 申请单位
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
  preStrMoney: '',// 需求预测
  businessDataMaterialList: [],
  transportationRequestList: []
})
const defaultKey = ref('1'); // 默认打开的tab
const curTab = ref('1') // 当前打开的tab
const showAdd = ref(false); // 新增资料弹窗
const showRecord = ref(false); // 审批记录
const showApproval = ref(false) // 审批窗口
const totalMoney = ref({
  count: 0
});
const fileList = ref([]) // 已经提交的文件
const queryPar = ref({}) // 路由查询参数
const uploadFlag = ref(-1) // -1未上传文件 0 上传文件失败 1上传成功
const errorFlag = ref(false) // 信息提交时，深白资料有误，提示信息

//关闭错误弹窗
function closeError() {
  errdata.value.flag = false
}

// 更新审批id
function updateReportId(id: any) {
  reportId.value = id;
}

// 文件上传成功，刷新列表
function updateFileData(Flag: any) {
  if(Flag == 1) { // 上传成功
    uploadFlag.value = Flag
  } else {
    uploadFlag.value = Flag
  }
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
function changeDate(v: any) {
  if(form.value.limitType == '2' && form.value.adjustType == '1') { //1当月
    form.value.validDateEnd = dayjs(form.value.validDateStart).add(30, 'day').format('YYYY-MM-DD')
  }
}
// 切换时间类型
function formateDate(now: any) {
  return `${now.getFullYear()}-${(now.getMonth() + 1).toString().padStart(2, '0')}-${now.getDate().toString().padStart(2, '0')}`
}
// 切换时间类型
function changeDateRange(v: any) {
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
function updateUpload(file: any) {
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
  if(![pro.CC as any, pro.WL as any].includes(curTab.value)) {
    getCurSumMoney(v) // 仓储和物流需要调该接口
  } else if(curTab.value == pro.CC){
    totalMoney.value.count = approvalStore.getListLength('CC') as any
  } else if(curTab.value == pro.WL) {
    totalMoney.value.count = approvalStore.getListLength('WL') as any
  }
}

function getCurSumMoney(v: any) {
  getTotalMoney({
    reportId: reportId.value,
    fileType: v
  }).then(res => {
    totalMoney.value = res.data;
  }).catch(err => {})
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
  if(loading.value) return;
  if(uploadFlag.value == 0) {
    ElMessage.warning("申报资料有误");
    errorFlag.value = true
    return;
  }
  basefrom1.value.validate((v: any) => {
    if(v) {
      basefrom2.value.validate((k: any) => {
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

const errdata = ref({
  flag: false,
  DD: {},
  FP: {},
  HT: {},
  YH: {},
  CC: {},
  WL: {}
}) // 记录错误信息
async function checkSave(type: any, msg: string) {
  // 1暂存 2提交 3更新
  // approveStatus：待审批1, 通过2, 驳回3
  // dataStatus：1：暂存 2：正常
  errdata.value = {
    flag: false,
    DD: {},
    FP: {},
    HT: {},
    YH: {},
    CC: {},
    WL: {}} // 重新校验附件错误/空之前，清空之前的校验

  if(type == 1) { // 暂存
    form.value.dataStatus = 1;
    if(reportId.value != -1) {
        form.value.id = reportId.value
        handleUpdate(msg);
      } else {
        // 新增
        handleAddNew(msg)
      }
  } else if(type == 2) {
    approvalStore.updateData(form.value, errdata.value)
    if(errdata.value.flag) return;
    form.value.dataStatus = 2;
    form.value.approveStatus = 1; // 提交将状态改为待审批
    if(reportId.value != -1) {
        form.value.id = reportId.value
        handleUpdateSubmit(msg);
      } else {
        // 新增
        handleAddNewSubmit(msg)
      }
  } 
  // else { // 更新
  //   approvalStore.updateData(form.value, errdata.value)
  //   if(errdata.value.flag) return;
  //   form.value.dataStatus = 2
  //   form.value.id = initPageParam.id as any;
  //   handleUpdate(msg);
  // }
}

function handleUpdateSubmit(msg: any) {
  if(loading.value) return;
  loading.value = true
  businessUpdate(form.value).then((res: any) => {
    loading.value = false
    checkSubmitError(res, msg)
  }).catch(err => {
    loading.value = false
    ElMessage.error( JSON.stringify(err));
  })
}

function handleAddNewSubmit(msg: any) {
  if(loading.value) return;
  loading.value = true
  businessAdd(form.value).then(res =>{
    loading.value = false
    checkSubmitError(res, msg)
  }).catch(err => {
    loading.value = false
    ElMessage.error( JSON.stringify(err));
  })
}

function checkSubmitError(res: any, msg: any) {
  if(res.result == 1 && !res.message) {
      ElMessage.success(msg +'成功');
      setTimeout(()=>{
        backToList()
      },500)
      noticeStore.refreshNotice()
    } else {
      suafaErr.value.flag = true;
      suafaErr.value.data = ['附件上传有误, 请核实'] as any
      approvalStore.getTableData(reportId.value);
      // ElMessage.error(res?.message || '算法校验失败');
    } 
    // else if(res.result == 1 && res.message) {
    //   suafaErr.value.flag = true;
    //   suafaErr.value.data = res.data || []
    //   approvalStore.getTableData(reportId.value);
    //   // 处理异常
    // } else {
    //   suafaErr.value.flag = true;
    //   suafaErr.value.data = res.data || []
    //   approvalStore.getTableData(reportId.value);
    //   // ElMessage.error(res?.message || '算法校验失败');
    // }
}

// 编辑新增成功，返回列表页
function backToList() {
  router.push({
    path: '/intellApproval',
 });
}

function handleUpdate(msg: string) {
  if(loading.value) return;
  loading.value = true
  update(form.value).then(res => {
    ElMessage.success(msg + "成功！");
    loading.value = false
    setTimeout(()=>{
      backToList()
    },500)
    noticeStore.refreshNotice()
  }).catch(err => {
    loading.value = false
    ElMessage.error("失败:" + JSON.stringify(err));
  })
}

// 新增
function handleAddNew(msg: any) {
  if(loading.value) return;
  loading.value = true
  add(form.value).then(res => {
    ElMessage.success(msg + "成功！");
    loading.value = false
    setTimeout(()=>{
      backToList()
    },500)
    noticeStore.refreshNotice()
  }).catch(err => {
    loading.value = false
    ElMessage.error("失败:" + JSON.stringify(err));
  })
}

// 申报详情
function getDetail(d: any) {
  searcht(d).then(res => {
    if(JSON.stringify(res.data) != '{}') { // 编辑或者有暂存
      initPageParam.type = 1
      initPageParam.id = res.data.id
      fileList.value = res.data.otherMaterialsResponseList
      res.data?.businessDataMaterialList.forEach((item: any) => {
        if(item.fileType == 7) {
          ziliaoFile.value = [item] as any; // check第一个文件的type是不是7，是7再赋值
          const businessDataMaterialList = {
            fileType: 7,  // 附件
            fileUrl: item.fileUrl,
            judgeId: item.judgeId
          }
          approvalStore.setFileInfo(businessDataMaterialList)
        }
      })
      form.value = res.data as any
      form.value.taxAuthority = '东疆综合保税区税务局'
      curDate.value = [res.data.validDateStart, res.data.validDateEnd] as any
      reportId.value = res.data.id
      approvalStore.getTableData(reportId.value); // 获取订单、合同、发票等信息
      getCurSumMoney(curTab.value)
    } else {
      approvalStore.clearTable(); // 获取订单、合同、发票等信息
      getgetOneByCompanyName() // 当前返回数据为空，新增，且无暂存，则查询企业基本信息
    }
  }).catch(err => {})
}

// 公司基本信息
function getgetOneByCompanyName() {
  getOneByCompanyName({
    companyName: companyName
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
  type.value = route.query.type as any; // add新增 edit编辑 detail详情
  queryPar.value = route.query;
  // 重置tab的状态
  approvalStore.resetTab(type.value); // 重置tab的状态
  approvalStore.setFileInfo({}) // 重置上传文件
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
    reportId.value = route.query.id as any
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
  padding-bottom: 90px;
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
  z-index: 9;
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
.mask {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(0,0,0,0.1);
  z-index: 999;
  display: flex;
  align-items: center;
  justify-content: center;
}

</style>

