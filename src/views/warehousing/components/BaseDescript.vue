<template>
  <div class="wrap-border">
    <!-- <el-tabs v-model="activeName" class="demo-tabs" @tab-change="handleClick">
      <el-tab-pane label="基础信息" name="first"></el-tab-pane>
      <el-tab-pane label="内部详情" name="second"></el-tab-pane>
      <el-tab-pane label="详细信息" name="third"></el-tab-pane>
      <el-tab-pane label="图片" name="fourth"></el-tab-pane>
    </el-tabs> -->
  <div class="des-wrap">
    <div id="first" class="cell">
      <div class="title">基础信息</div>
      <div class="content">
        <div class="half-line"><span class="label">建筑面积：</span>2550m²</div>
        <div class="half-line"><span class="label">起租期：</span>12个月</div>
        <div class="half-line"><span class="label">租赁方式：</span>整租</div>
        <div class="half-line"><span class="label">地址：</span>天津市东丽区新立街新兴村中国纺织物资天津公司仓库</div>
      </div>
    </div>

    <div id="second" class="cell">
      <div class="title">内部详情</div>
      <div class="content">
        <div class="half-line"><span class="label">楼层：</span>单层</div>
        <div class="half-line"><span class="label">首层层高：</span>9m</div>
        <div class="half-line"><span class="label">起租面积：</span>2550m²</div>
        <div class="half-line"><span class="label">仓库结构：</span>砖混结构</div>
        <div class="half-line"><span class="label">进车情况：</span>19m</div>
        <div class="half-line"><span class="label">地平材质：</span>金刚砂</div>
        <div class="half-line"><span class="label">地平称重：</span>1t/m²</div>
        <div class="half-line"><span class="label">消防等级：</span>丙二类</div>
        <div class="half-line"><span class="label">保税仓：</span>否</div>
        <div class="half-line"><span class="label">卸货：</span>单面卸货</div>
        <div class="half-line"><span class="label">卸货设备</span>备用发电机、货梯、电瓶叉车</div>
        <div class="half-line"><span class="label">仓库特色：</span>可以分隔、证件齐全、物流仓储、可以改造、大型楼库</div>
      </div>
    </div>

    <div id="third" class="cell">
      <div class="title">详细信息</div>
      <div class="content">
        <div class="one-line">天津东丽空港经济区库房出租</div>
        <div class="one-line">园区占地面积：31236.2㎡，建筑面积：50463.48㎡</div>
        <div class="one-line">现出租面积：20000㎡，分为高台库和立体楼库，最小分租面积100㎡起租，办公楼单间办公室40平米，1500一个月。整层1200平米。</div>
        <div class="one-line">适合组装包装，物流仓储，城市配送，电商库房等行业！</div>
        <div class="one-line">附近地理位置优越，临近京津塘高速，宁静高速，交通便利，进出车辆方便。</div>
        <div class="one-line">价格优惠面议，欢迎有意者详谈！</div>
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
    height: 32px;
  }
}
.label {
  color: #999;
}
.des-img-1 {
  width: 510px;
  height: 360px;
  background-image: url('@/assets/warehouse/des1.png');
  background-size: cover;
  margin-right: 32px;
}
.des-img-2 {
  width: 510px;
  height: 360px;
  background-image: url('@/assets/warehouse/des2.png');
  background-size: cover;
}
</style>