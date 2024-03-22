<template>
  <div class="company-detail">
    <el-button class="absolute right-20 top-22px" :type="btnType(companyMsg?.attention)" @click.stop="handleAttention(companyMsg)">
        <template #icon>
        <i  v-if="comData?.attention" class="iconfont icon-guanzhu-mian"></i>
        <i v-else class="iconfont icon-guanzhu-xian"></i>
        </template>
        <template #default>{{ companyMsg?.attention ? '已关注' : '关注' }}</template>
      </el-button>
    <!-- <el-button class="absolute right-20px top-20px" type="primry">
      <template #icon>
        <el-icon><StarFilled /></el-icon>
      </template>
      <template #default>关注</template>
    </el-button> -->
    <div class="company-name">{{ companyMsg?.companyName }}</div>
    <div class="company-content">
      <el-backtop target=".company-content" :right="40" :bottom="100" />
      <div id="BusinessInformation">
        <div class="title"><img :src="qygsxx">企业工商信息</div>
        <BusinessInformation :data="companyMsg"></BusinessInformation>
      </div>
      <div id="RiskValueAssessment">
        <div class="title"><img :src="fxzpg">风险值评估</div>
        <RiskValueAssessment :companyName="companyMsg?.companyName" :companyId="companyMsg?.companyId"></RiskValueAssessment>
      </div>
      <div id="ExcessInvoiceApproval">
        <div class="title"><img :src="fpcxlsp">发票审批信息</div>
        <ExcessInvoiceApproval :companyId="companyMsg?.companyId"></ExcessInvoiceApproval>
      </div>
      <div id="ManagementInformation">
        <div class="title"><img :src="jyxx">经营信息</div>
        <ManagementInformation :companyName="companyMsg?.companyName"></ManagementInformation>
      </div>
      <div id="OrderInformation">
        <div class="title"><img :src="ddxx">订单信息</div>
        <OrderInformation :companyName="companyMsg?.companyName"></OrderInformation>
      </div>
      <div id="InvoiceInformation">
        <div class="title"><img :src="fpxx">发票信息</div>
        <InvoiceInformation></InvoiceInformation>
      </div>
      <div id="LogisticsWarehousingInformation">
        <div class="title"><img :src="wlccxx">物流仓储信息</div>
        <LogisticsWarehousingInformation :companyName="companyMsg?.companyName"></LogisticsWarehousingInformation>
      </div>
      <div id="GoodsInformation">
        <div class="title"><img :src="zyspxx">主营商品信息</div>
        <GoodsInformation :companyName="companyMsg?.companyName"></GoodsInformation>
      </div>
      <div id="TransactionVoucher">
        <div class="title"><img :src="jjpz">合同信息</div>
        <TransactionVoucher :companyName="companyMsg?.companyName"></TransactionVoucher>
      </div>
      <div id="AccountStatement">
        <div class="title"><img :src="yhls">银行流水</div>
        <AccountStatement :companyName="companyMsg?.companyName"></AccountStatement>
      </div>
    </div>
    <SlideNav></SlideNav>
  </div>
</template>
<script setup>
import { ref } from 'vue';
import BusinessInformation from "./components/BusinessInformation.vue";
import ExcessInvoiceApproval from "@/components/ExcessInvoiceApproval/index.vue";
import RiskValueAssessment from "@/components/RiskValueAssessment/index.vue";
import OrderInformation from "@/components/OrderInformation/index.vue";
import TransactionVoucher from "@/components/TransactionVoucher/index.vue";
import AccountStatement from "@/components/AccountStatement/index.vue";
import LogisticsWarehousingInformation from "@/components/LogisticsWarehousingInformation/index.vue";
import ManagementInformation from "./components/ManagementInformation/index.vue";
import InvoiceInformation from "./components/InvoiceInformation/index.vue";
import GoodsInformation from "./components/GoodsInformation.vue";
import SlideNav from "./components/SlideNav.vue";
import { payAttention } from '@/api/archives'
import { useRouter, useRoute } from 'vue-router';
import { useUserStoreHook } from "@/store/modules/user";
import qygsxx from "@/assets/images/moduleIcon/企业工商信息.png";
import fxzpg from "@/assets/images/moduleIcon/风险值评估.png";
import fpcxlsp from "@/assets/images/moduleIcon/发票审批信息.png";
import jyxx from "@/assets/images/moduleIcon/经营信息.png";
import ddxx from "@/assets/images/moduleIcon/订单信息.png";
import fpxx from "@/assets/images/moduleIcon/发票信息.png";
import wlccxx from "@/assets/images/moduleIcon/物流仓储信息.png";
import zyspxx from "@/assets/images/moduleIcon/主营商品信息.png";
import jjpz from "@/assets/images/moduleIcon/交易凭证.png";
import yhls from "@/assets/images/moduleIcon/银行流水.png";

const userStore = useUserStoreHook();
// const router = useRouter();
const route = useRoute();
const companyMsg = ref({}) // 公司信息

// 关注按钮类型 已关注/未关注
function btnType(v) {
  return v ? 'primary' : 'outline'
}

// 关注、取消关注
function handleAttention(d) {
  const data = {
    companyIdList: [d?.companyId],
    userId: userStore?.user?.id,
    attention: !d?.attention
  }
  payAttention(data).then(res => {
    if(d?.attention) {
      ElMessage.warning("已取消关注该企业");
    } else {
      ElMessage.success("已关注该企业, 您关注的企业收录在[ 我关注的]模块");
    }
  }).catch(err => {
    
  })
}

function init() {
  companyMsg.value =  JSON.parse(route.query.company);
}

// 页面初始化
init()
</script>
<style lang="scss" scoped>
.company-detail {
  height: calc(100vh - 120px);
  overflow-y: hidden;
  transform: translate(0);
  position: relative;
  background-color: #fff;
}
.company-name {
  text-align: center;
  line-height: 72px;
  height: 72px;
  font-weight: 500;
  font-size: 18px;
  color: #333333;
  border-bottom: 1px solid #edf1fc;
}
.title {
  display: flex;
  align-items: center;
  // position: relative;
  margin: 32px 0 16px 0;
  // padding-left: 11px;
  font-family: PingFangSC, PingFang SC;
  font-weight: 500;
  font-size: 18px;
  color: #333333;
  line-height: 22px;
  img {
    width: 22px;
    display: block;
    margin-right: 8px;;
  }
  // &::before {
  //   content: "";
  //   position: absolute;
  //   left: 0px;
  //   top: 50%;
  //   transform: translateY(-50%);
  //   width: 3px;
  //   height: 18px;
  //   background-color: #1890ff;
  // }
}
.company-content {
  position: relative;
  overflow-x: hidden;
  height: calc(100% - 72px);
  overflow-y: scroll;
  padding: 16px 90px;
}
:deep(.w-input-wrapper) {
  width: 188px;
  height: 32px;
}
:deep(.w-picker) {
  width: 240px;
  height: 32px;
}
:deep(.w-select-view) {
  width: 132px;
  height: 32px;
}
:deep(.w-form-item-label) {
  height: 32px;
  color: #000;
  font-weight: 500;
}
</style>
