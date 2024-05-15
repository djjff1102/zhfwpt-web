<!-- 
  暂时保留
  如果企业资信和风险监控的公司详情差别较大
  则不共用一个页面
  风险监控单独使用该页面，做企业详情
 -->
<template>
  <div class="risk-detail">
    <div class="company-name">莱佛金属（天津）有限公司</div>
    <div class="risk-center">
      <div class="company-content">
        <h1>企业风险</h1>
        <div>风险值评估</div>
        <RiskValueAssessment />
        <div class="title">风险分类项展示</div>
        <RiskPoint></RiskPoint>
      </div>
      <SliderNavRisk></SliderNavRisk>
    </div>
  </div>
</template>
<script setup>
import RiskValueAssessment from "@/components/RiskValueAssessment/index.vue";
import RiskPoint from "./components/RiskPoint.vue";
import SliderNavRisk from '@/components/SlideNavRisk.vue'
</script>
<style lang="scss" scoped>
.risk-detail {
  height: 100%;
  overflow: auto;
  position: relative;
  background-color: #fff;
}
.risk-center {
  padding: 33px 19px 24px 19px;
  display: flex;
}

.risk-slide {
  padding: 0px 30px;
  width: 146px;
  background: #dddfe7;
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
