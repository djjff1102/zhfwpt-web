<template>
  <div class="top-wrap wrap-border">
    <div class="item-top">
      <div class="title">{{ data.name }}</div>
      <div style="display: flex; gap: 8px">
        <el-tag round effect="light" type="primary">优选</el-tag>
        <el-tag round effect="light" type="success">可免风险扫描</el-tag>
        <el-tag round effect="light" type="info" v-for="item in data.tab" :key="item">{{ item }}</el-tag>
      </div>
    </div>
    <div class="top-content">
      <div class="top-content-left">
        <div v-if="data.priceType == 1" class="price-cell">
          <div class="price-cell-item">
            <span class="price-new">{{ data.newPrice }}</span>
            <span class="price-old">{{ data.oldPrice }}</span>
            <span class="price-unit">{{ data.unit }}</span>
          </div>
          <div class="price-cell-item">
            <span class="price-base">{{ data.newArea }}</span>
            <span class="disable-text price-base">{{ data.oldArea }}</span>
            <span class="price-base">{{ data.areaUnit }}</span>
          </div>
        </div>
        <div v-if="data.priceType == 1" class="price-cell">
          <div class="price-cell-item">{{ data.area }}</div>
          <div class="price-cell-item">{{ data.areaType }}</div>
          <div class="price-cell-item">{{ data.area }}</div>
        </div>
        <div v-if="data.priceType == 1" class="price-cell">
          <div class="price-cell-item price-base">{{ data.areaBuild }}</div>
          <div class="price-cell-item price-base">仓库类型</div>
          <div class="price-cell-item price-base">{{ data.areaStart }}</div>
        </div>
        <div v-if="data.priceType == 1" class="price-cell">
          <div class="price-cell-item price-base">{{ data.areaBuild }}</div>
          <div class="price-cell-item price-base">仓库类型</div>
          <div class="price-cell-item price-base">{{ data.areaStart }}</div>
        </div>
        <div v-if="data.priceType == 2" class="price-cell">
          <div class="price-cell-item price-base">价格</div>
          <div class="price-cell-item price-base">
            <span class="price-new">5</span>
            <span class="price-old">7</span>
            <span class="price-unit">元</span>
          </div>
          <div class="price-cell-item price-base">
            <span class="price-new">4</span>
            <span class="price-old">6</span>
            <span class="price-unit">元</span>
          </div>
          <div class="price-cell-item price-base">
            <span class="price-new">3</span>
            <span class="price-old">5</span>
            <span class="price-unit">元</span>
          </div>
        </div>

        <div v-if="data.priceType == 2" class="price-cell">
          <div class="price-cell-item price-base">起订量</div>
          <div class="price-cell-item">10件起批</div>
          <div class="price-cell-item">100件起批</div>
          <div class="price-cell-item">1000件起批</div>
        </div>

        <div class="split"></div>
        <div class="price-cell"><span class="price-base">区域：</span>{{ data.city }}</div>
        <div class="price-cell"><span class="price-base">地区：</span>{{ data.location }}</div>
        <div class="split"></div>
        <div class="price-cell">
          <img src="@/assets/warehouse/head.jpg" alt="" style="width: 100px">
          <div>
            <div >{{ data.user.name }}</div>
            <div style="margin-top: 12px"><span class="price-base">所属公司：</span>{{ data.user.company }}</div>
            <div style="margin-top: 12px"><span class="price-base">营业执照编码：</span>{{ data.user.code }}</div>
          </div>
        </div>
        <div :style="{marginTop: '12px'}">
          <RelationCom :width="300" :data="data"></RelationCom>
        </div>
      </div>
      <div class="top-content-right"></div>
    </div>
  </div>
</template>

<script setup>
import RelationCom from './RelationCom.vue'
const props = defineProps({
  data: {}
})
</script>

<style lang="scss" scoped>
.wrap-border {
  background: #fff;
  padding: 24px;
  padding-top: 0;
  border-radius: 8px;
}
.title {
  margin-right: 8px;
  font-size: 18px;
}
.item-top {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  border-bottom: solid 1px rgba(0,0,0, 0.1);
  height: 66px;
  margin-bottom: 24px;
}
.top-content {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
}
.top-content-left {
  flex-grow: 1;
}
.top-content-right {
  width: 600px;
  height: 360px;
  background-image: url('@/assets/warehouse/warehouse.png');
  background-size: cover;
}
.price-cell {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  margin-bottom: 4px;
  .price-cell-item {
    width: 33%;
  }
}
.price-cell:first-child {
  margin-bottom: 12px;
}
.price-new {
  font-size: 18px;
  color: #f76161;
}
.price-old {
  color: #f76161;
  text-decoration: line-through;
  display: inline-block;
  padding: 0 4px;
}
.price-unit {
  color: #f76161;
}
.price-base {
  color: #999;
}

.disable-text {
  padding: 0 4px;
  text-decoration: line-through;
}
.split {
  height: 1px;
  width: 100%;
  background: rgba(0,0,0, 0.1);
  margin: 24px 0;
  width: 85%;
}
</style>