<template>
  <div class="wrap-border">
  <div class="des-wrap">
    <div id="second" class="cell">
      <div class="title">商品描述</div>
      <div class="content">
        <div class="half-line"><span class="label">业务：</span>物流运输</div>
        <div class="half-line"><span class="label">品质：</span>保障</div>
        <div class="half-line"><span class="label">公司：</span>保障</div>
        <div class="half-line"><span class="label">服务时间：</span>7*24小时</div>
        <div class="half-line"><span class="label">客服在线：</span>全天</div>
        <div class="half-line"><span class="label">服务：</span>保障</div>
        <div class="half-line"><span class="label">驾驶：</span>娴熟</div>
        <div class="half-line"><span class="label">速度：</span>快捷</div>
        <div class="half-line"><span class="label">进车情况：</span>19m</div>
        <div class="half-line"><span class="label">售后：</span>完善</div>
        <div class="half-line"><span class="label">可售卖实地：</span>北京、天津、河北、山西、内蒙古、上海...</div>
      </div>
    </div>

    <div id="third" class="cell">
      <div class="title">详细信息</div>
      <div class="content">
        <div class="one-line">价格：商品在爱采购的展示标价，具体的成交价格可能因商品参加活动等情况发生变化，也可能随着购买数量不同或所选规格不同而发生变化，如用户与商家线下达成协议，以线下协议的结算价格为准，如用户在爱采购上完成线上购买，则最终以订单结算页价格为准。</div>
        <div class="one-line">抢购价：商品参与营销活动的活动价格，也可能随着购买数量不同或所选规格不同而发生变化，最终以订单结算页价格为准。</div>
        <div class="one-line">特别提示：商品详情页中（含主图）以文字或者图片形式标注的抢购价等价格可能是在特定活动时段下的价格，商品的具体价格以订单结算页价格为准或者是您与商家联系后协商达成的实际成交价格为准；如您发现活动商品价格或活动信息有异常，建议购买前先咨询商家。</div>
      </div>
    </div>

    <div id="fourth" class="cell">
      <div class="title">图片</div>
      <div class="content">
        <div class="des-img-1"></div>
        <div class="des-img-2"></div>
      </div>
    </div>
  </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
const activeName = ref('first')

function handleClick(tab) {
  window.location.href = `#${tab}`
}
</script>

<style scoped lang="scss">
.wrap-border {
  background: #fff;
  padding: 24px;
  padding-top: 0px;
  margin-top: 24px;
  border-radius: 8px;
}
.des-wrap {
  margin-bottom: 40px;
}
.cell {
  margin-top: 12px;;
}
.title {
  font-size: 18px;
  line-height: 60px;
}
.content {
  display: flex;
  flex-wrap: wrap;
  .half-line {
    width: 50%;
    height: 32px;
  }
  .one-line {
    width: 100%;
    line-height: 32px;
  }
}
.label {
  display: inline-block;
  color: #999;
}
.des-img-1 {
  width: 510px;
  height: 360px;
  background-image: url('@/assets/warehouse/des3.png');
  background-size: cover;
  margin-right: 32px;
}
.des-img-2 {
  width: 510px;
  height: 360px;
  background-image: url('@/assets/warehouse/des4.png');
  background-size: cover;
}
</style>