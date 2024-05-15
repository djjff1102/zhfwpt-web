<template>
  <div class="risk-card">
    <div class="risk-card-item">
      <div class="content">
        <div class="num">3,512</div>
        <div class="title">授权企业</div>
      </div>
      <div class="icon">
        <img :src="qysq" style="width: 92px; height: 92px" />
      </div>
    </div>
    <div class="risk-card-item">
      <div class="content">
        <div class="num">3,512</div>
        <div class="title">高信用企业(81-100)</div>
      </div>
      <div class="icon">
        <svg-icon size="92px" iconClass="high" />
      </div>
    </div>
    <div class="risk-card-item">
      <div class="content">
        <div class="num">3,512</div>
        <div class="title">中信用企业(46-80)</div>
      </div>
      <div class="icon">
        <svg-icon size="92px" iconClass="middle" />
      </div>
    </div>
    <div class="risk-card-item">
      <div class="content">
        <div class="num">3,512</div>
        <div class="title">低信用企业(0-45)</div>
      </div>
      <div class="icon">
        <svg-icon size="92px" iconClass="low" />
      </div>
    </div>
  </div>
</template>
<script setup>
import qysq from "@/assets/images/企业授权.png";
import { attentionCreditInfo } from '@/api/riskmonitor'

function init() {
  attentionCreditInfo({}).then(res => {
    
  }).catch(err => {
    console.log('重点关注企业信用值异常：', err)
  })
}

init()
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
    color: #f76161;
    background: #feefef;
  }
  &:nth-child(3) {
    color: #ff9100;
    background: #feefef;
  }
  &:nth-child(4) {
    color: #0594eb;
    background: #e6f4fd;
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
    width: 96px;
  }
  .content {
    padding-top: 12px;
  }
}
</style>
