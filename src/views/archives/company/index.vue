<template>
  <div class="company-detail">
    <w-button class="absolute right-20 top-22px" :type="btnType(companyMsg?.attention)" @click.stop="handleAttention(companyMsg)">
        <template #icon>
        <i  v-if="comData?.attention" class="iconfont icon-guanzhu-mian"></i>
        <i v-else class="iconfont icon-guanzhu-xian"></i>
        </template>
        <template #default>关注</template>
      </w-button>
    <!-- <w-button class="absolute right-20px top-20px" type="primry">
      <template #icon>
        <el-icon><StarFilled /></el-icon>
      </template>
      <template #default>关注</template>
    </w-button> -->
    <div class="company-name">{{ companyMsg?.companyName }}</div>
    <div class="company-content">
      <el-backtop target=".company-content" :right="40" :bottom="100" />
      <div id="BusinessInformation">
        <div class="title">企业工商信息</div>
        <BusinessInformation :data="companyMsg"></BusinessInformation>
      </div>
      <div id="RiskValueAssessment">
        <div class="title">风险值评估</div>
        <RiskValueAssessment :companyName="companyMsg?.companyName" :companyId="companyMsg?.companyId"></RiskValueAssessment>
      </div>
      <div id="ExcessInvoiceApproval">
        <div class="title">发票超限量审批</div>
        <ExcessInvoiceApproval></ExcessInvoiceApproval>
      </div>
      <div id="ManagementInformation">
        <div class="title">经营信息</div>
        <ManagementInformation></ManagementInformation>
      </div>
      <div id="OrderInformation">
        <div class="title">订单信息</div>
        <OrderInformation :companyName="companyMsg?.companyName"></OrderInformation>
      </div>
      <div id="InvoiceInformation">
        <div class="title">发票信息</div>
        <InvoiceInformation></InvoiceInformation>
      </div>
      <div id="LogisticsWarehousingInformation">
        <div class="title">物流仓储信息</div>
        <LogisticsWarehousingInformation :companyName="companyMsg?.companyName"></LogisticsWarehousingInformation>
      </div>
      <div id="GoodsInformation">
        <div class="title">主营商品信息</div>
        <GoodsInformation :companyName="companyMsg?.companyName"></GoodsInformation>
      </div>
      <div id="TransactionVoucher">
        <div class="title">交易凭证</div>
        <TransactionVoucher :companyName="companyMsg?.companyName"></TransactionVoucher>
      </div>
      <div id="AccountStatement">
        <div class="title">银行流水</div>
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
    alert('关注')
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
  height: 100%;
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
  position: relative;
  margin: 16px 0;
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
.company-content {
  position: relative;
  overflow-x: hidden;
  height: calc(100% - 72px);
  overflow-y: scroll;
  padding: 16px 90px;
}
</style>
