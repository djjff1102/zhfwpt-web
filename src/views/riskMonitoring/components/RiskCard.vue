<template>
  <div class="risk-card">
    <div class="risk-card-item" @click="toCompanyList('')">
      <div class="content">
        <div class="num">{{ formatNumber(riskData.sumary) }}</div>
        <div class="title">授权企业</div>
      </div>
      <div class="icon">
        <img :src="qysq" style="width: 92px; height: 92px" />
      </div>
    </div>
    <div class="risk-card-item" @click="toCompanyList('1')">
      <div class="content">
        <div class="num">{{ formatNumber(riskData.high.count) }}</div>
        <div class="title">高信用企业({{ riskData.high.scoreMin }}-{{ riskData.high.scoreMax }})</div>
      </div>
      <div class="icon">
        <img style="width: 52px" src="@/assets/low-risk.svg">
        <!-- <svg-icon size="92px" iconClass="high" /> -->
      </div>
    </div>
    <div class="risk-card-item" @click="toCompanyList('2')">
      <div class="content">
        <div class="num">{{ formatNumber(riskData.middle.count) }}</div>
        <div class="title">中信用企业({{ riskData.middle.scoreMin }}-{{ riskData.middle.scoreMax }})</div>
      </div>
      <div class="icon">
        <svg-icon size="52px" iconClass="middle" />
      </div>
    </div>
    <div class="risk-card-item" @click="toCompanyList('3')">
      <div class="content">
        <div class="num">{{ formatNumber(riskData.low.count) }}</div>
        <div class="title">低信用企业({{ riskData.low.scoreMin }}-{{ riskData.low.scoreMax }})</div>
      </div>
      <div class="icon">
        <svg-icon size="52px" iconClass="high" />
      </div>
    </div>
  </div>
</template>
<script setup>
import qysq from "@/assets/images/企业授权.png";
import { formatNumber } from '@/utils/common'
import { useRouter } from "vue-router";

const router = useRouter();

const props = defineProps({
  riskData: {
    sumary: 0, // 授权企业总数
    low: {},
    middle: {},
    high: {}
  }
})

// 跳转公司列表
function toCompanyList(type) {
  router.push({ 
    path: '/riskMonitoring/companylist', 
    query: {
      type
      // companyId: d.riskCompanyId,
      // companyName: d.riskCompanyName,
      // type: 'risk'
    }
  });
}
</script>
<style lang="scss" scoped>
.risk-card {
  width: 100%;
  display: flex;
  gap: 16px;
  .risk-card-item {
    flex: 1;
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    min-width: 268px;
    padding: 12px 8px 0 32px;
    height: 126px;
    background: linear-gradient(132deg, #579aff 0%, #90caff 100%);
    &:hover {
      box-shadow: 0px 10px 20px 0px rgba(0, 107, 231, 0.19);
    }
    border-radius: 8px;
  }
}
.risk-card-item {
  color: #fff;
  &:nth-child(2) {
    color: #5ECF69;
    background: #EAFDE6;
  }
  &:nth-child(3) {
    color: #ff9100;
    background: #FFFAF2;
  }
  &:nth-child(4) {
    color: #f76161;
    background: #feefef;
  }

  .num {
    font-weight: bold;
    font-size: 42px;
    line-height: 48px;
  }
  .title {
    font-weight: 500;
    font-size: 14px;
    line-height: 20px;
  }
  .icon {
    // width: 96px;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .content {
    padding-top: 12px;
  }
}
</style>
