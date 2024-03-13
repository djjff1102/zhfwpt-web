<template>
<div class="operate-wrap">
  <div class="title">企业用户申报{{ initPageParam.title }}</div>
  <div class="section section-detail-header">
    <div class="section-sub">
      <span style="color: rgba(153, 153, 153, 1);padding-right: 30px;">申请编号：1000</span>
      <span><span style="color: rgba(51, 51, 51, 1)">审批状态：</span><span style="color: rgba(5, 148, 235, 1)">待审批</span></span>
    </div>
    <div class="section-sub flex-base-end">
      <w-button style="margin-right: 8px;" @click="showRecord = true">审批记录</w-button>
      <w-button type="primary">审批</w-button>
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
           <div v-else>{{ form.applyTime }}</div>
        </w-form-item>
      </w-form>
    </div>
    <div class="section-sub">
      <div class="title-sub">申报额度信息</div>
      <w-form :model="form" layout="vertical">
        <w-form-item field="limitType" label="申请调整额度类型" required>
          <w-select v-if="initPageParam.edit" v-model="form.limitType" placeholder="请选择申请调整额度类型" style="height: 30px">
            <w-option value="1">长期</w-option>
            <w-option value="2">短期</w-option>
          </w-select>
           <div v-else>{{ form.limitType }}</div>
        </w-form-item>
        <w-form-item field="adjustType" label="发票短期调整类型" required>
          <w-select v-if="initPageParam.edit" v-model="form.adjustType" placeholder="请选择发票短期调整类型" style="height: 30px">
            <w-option value="1">Beijing</w-option>
            <w-option value="2">Shanghai</w-option>
          </w-select>
           <div v-else>{{ form.adjustType }}</div>
        </w-form-item>
        <w-form-item field="validDateStart" label="起止有效期" required>
          <w-range-picker v-if="initPageParam.edit"
            v-model="dateRange"
            style="width: 100%; height: 30px;"
            @change="onChange"
          />
           <div v-else>{{ form.name }}</div>
        </w-form-item>
        <w-form-item field="reason" label="申请理由" required>
           <w-textarea v-if="initPageParam.edit" v-model="form.reason" placeholder="Please enter something"/>
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
      <template v-slot:applycontent>
      </template>
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
    <m-table></m-table>
    <div class="flex-base-start sum-line">
      <div style="margin-right: 16px">合同已选：<span class="num-light">9</span></div>
      <div>金额合计：<span class="num-light">3232</span></div>
    </div>
  </div>
  <div class="com-section">
    <div class="title-sub title-sub-sub">其他资料</div>
    <div v-if="initPageParam.edit">
      <w-upload action="/" :limit="3">
        <template #upload-button>
          <w-button type="primary" style="margin-right: 16px;">上传文件</w-button>
          <span class="upload-msg">支持上传的文件格式包含：pdf、png、gif、zip, 最多支持上传5个。</span>
        </template>
      </w-upload>
    </div>
    <div>
      未开发：在线查看资料
    </div>
  </div>
  <div v-if="initPageParam.edit" class="bottom flex-base-end">
    <w-button style="margin-right: 20px" @click="handleSave(1)">暂存</w-button>
    <w-button type="primary" @click="handleSave(2)">提交</w-button>
  </div>
  <detail-com v-if="!initPageParam.edit"></detail-com>
  <add-apply-com :showAdd="showAdd" :defaultKey="defaultKey" @updateAdd="updateAdd"></add-apply-com>
  <approval-record :showRecord="showRecord" @updateAdd="showRecord = false"></approval-record>
</div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import addApplyCom from './addApplyCom.vue';
import detailCom from './detailCom.vue'
import ApprovalRecord from './ApprovalRecords.vue'
import { searcht, add, update } from '@/api/intellApproval'
import { useUserStoreHook } from "@/store/modules/user";

const userStore = useUserStoreHook();
let userId = userStore.user.id;

const route = useRoute();
const router = useRouter();

const type = ref('add')
const initPageParam = reactive({
  title: '新增',
  edit: true,
  type: 2 // 1有详情数据-更新   2无详情数据-新增
})
const dateRange = ref([])
const form = ref({
  taxAuthority: '1', // 主管税务机关
  limitType: '', // 申请额度调整类型
  companyName: '1', // 申请单位
  adjustType:'', // 发票短期调整类型
  registerAddress: '1', // 注册地址
  validDateStart: '', // 起始有效期-开始
  validDateEnd: '', // 起始有效期-结束
  applyUserName: '1', // 操作人
  reason: '', // 申请理由
  bankStatementMapResponseList: [], // 银行流水
  invoiceMapResponseList: [], // 发票
  orderMapResponseList: [], // 订单
  transactionCertificateMapResponseList: [], // 合同
  warehouseMapResponseList: [], // 仓储
  otherMaterialsResponseList: [], // 其他资料
})
const defaultKey = ref('3'); // 默认打开的tab
const showAdd = ref(false); // 新增资料弹窗
const showRecord = ref(false); // 审批记录

// 添加资料
function handleAdd() {
  showAdd.value = true;
}

function handleTab(v: any) {
  console.log('当前的tab：', v)
}

function updateAdd() {
  showAdd.value = false;
}

// 新增暂存、新增提交
function handleSave(type: any) {
  // 1暂存 2提交
  form.value.dataStatus = type;
  if(initPageParam.type == 1) {
    // 更新
    form.value.id = initPageParam.id
    handleUpdate();
  } else {
    // 新增
    handleAddNew()
  }
}

function handleUpdate() {
  update(form.value).then(res => {

  })
}

function handleAddNew() {
  add(form.value).then(res => {

  })
}


// 时间选择
function onChange(dateString, date) {
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
      form.value = res.data as any
    }
  }).catch(err => {})
}

function init() {
  type.value = route.query.type as any;
  let id = route.query.id // 申请人发票ID
  let applyUserId = route.query.applyUserId; // 申请人ID
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

