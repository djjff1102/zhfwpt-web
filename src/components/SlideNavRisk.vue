<template>
  <div class="risk-slide">
    <div class="slide-item" v-for="(item) in navList" :key="item.id">
      <img :src="item.src" alt="" />
      <span class="module-name">{{ item.name }}</span>
    </div>
  </div>
</template>

<script setup>
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

let navList = ref([
  {
    id: "BusinessInformation",
    name: "企业工商信息",
    scoll: 0,
    show: true,
    src: qygsxx
  },
  {
    id: "RiskValueAssessment",
    name: "信用值评估",
    scoll: 0,
    show: true,
    src: fxzpg
  },
  {
    id: "ExcessInvoiceApproval",
    name: "发票审批信息",
    scoll: 0,
    show: true,
    src: fpcxlsp
  },
  {
    id: "ManagementInformation",
    name: "经营信息",
    scoll: 0,
    show: true,
    src: jyxx
  },
  {
    id: "OrderInformation",
    name: "订单信息",
    scoll: 0,
    show: true,
    src: ddxx
  },
  {
    id: "InvoiceInformation",
    name: "发票信息",
    scoll: 0,
    show: true,
    src: fpxx
  },
  {
    id: "LogisticsWarehousingInformation",
    name: "物流仓储信息",
    scoll: 0,
    show: true,
    src: wlccxx
  },
  {
    id: "good",
    name: "主营商品信息",
    scoll: 0,
    show: true,
    src: zyspxx
  },
    {
    id: "TransactionVoucher",
    name: "合同信息",
    scoll: 0,
    show: true,
    src: jjpz
  },
  {
    id: "AccountStatement",
    name: "银行流水",
    scoll: 0,
    show: true,
    src: yhls
  },
]);


</script>
<style lang="scss" scoped>
.risk-slide {
  padding: 0px 30px;
  width: 146px;
  background: rgba(221, 223, 231, 0.11);
  .slide-item {
    cursor: pointer;
    padding: 16px 0;
    display: flex;
    align-items: center;
    flex-direction: column;
    border-bottom: 1px solid #edf1fc;
    &:last-child {
      border-bottom: none;
    }

    img {
      width: 44px;
      height: 44px;
    }
    .module-name {
      font-weight: 400;
      font-size: 14px;
      line-height: 20px;
      color: #999999;
      text-align: center;
    }
  }
}
.company-name {
  text-align: center;
  line-height: 72px;
  height: 72;
  font-weight: 500;
  font-size: 18px;
  color: #333333;
  border-bottom: 1px solid #edf1fc;
}
.company-content {
  width: calc(100% - 146px);
  height: calc(100% - 72px);
  padding: 0px 23px 0 80px;
  overflow-y: scroll;
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
</style>
