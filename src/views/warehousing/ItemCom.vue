<template>
<div class="card-item">
  <div class="item-img"></div>
  <div class="item-center">
    <div class="item-top">
      <div class="title">{{ data.name }}</div>
      <div style="display: flex; gap: 8px">
        <el-tag round effect="light" type="primary">优选</el-tag>
        <el-tag round effect="light" type="success">可免风险扫描</el-tag>
        <el-tag round effect="light" type="info" v-for="item in data.tab" :key="item">{{ item }}</el-tag>
        <!-- <el-tag round effect="light" type="info">价格面议</el-tag>
        <el-tag round effect="light" type="info">可以分隔</el-tag>
        <el-tag round effect="light" type="info">随时可看</el-tag> -->
      </div>
    </div>
    <div class="item-top">
      <div class="item-top-left">{{ data.position }}</div>
      <div class="item-top-right area-font">
        {{ data.area }}
      </div>
      <div v-if="data.priceType == 1" class="item-top-right">
        <span class="price-new">{{ data.newPrice }}</span>
        <span class="price-old">{{ data.oldPrice }}</span>
        <span class="price-unit">{{ data.unit }}</span>
      </div>
      <div v-if="data.priceType == 2" class="item-top-right">
        <span class="price-new">{{ data.newPrice }}{{ data.unit }}</span>
        <!-- <span class="price-unit">{{ data.unit }}</span> -->
      </div>
    </div>
    <div class="item-top">
      <div class="item-top-left">
        胡家河 | 天津市东丽区新立街新兴村中国纺织物资天津公司仓库
      </div>
      <div class="item-top-right">
        {{ data.areaDescript }}
      </div>
      <div v-if="data.priceType == 1" class="item-top-right">
        <span>1.08</span>
        <span class="disable-text">1.1</span>
        <span>万/月</span>
      </div>
      <div v-if="data.priceType == 2" class="item-top-right">
        <span class="price-old">{{ data.oldPrice }}{{ data.unit }}</span>
      </div>
    </div>
  </div>
  <div class="item-right">
    <el-button type="primary">联系TA</el-button>
  </div>
</div>
</template>

<script setup>

const props = defineProps({
  data: {}
})
</script>

<style lang="scss" scoped>
.card-item {
    padding: 24px 0;
    border-bottom: solid 1px rgba(0,0,0, 0.1);
    display: flex;
    justify-content: flex-start;
    align-items: center;
    .item-img {
      width: 140px;
      height: 82px;
      background-image: url('@/assets/cangchu.png');
      background-size: cover;
    }
    .item-center {
      flex-grow: 1;
      padding: 0 24px;
    }
    .item-right {
      width: 100px;
    }
    .item-top {
      display: flex;
      align-items: center;
      justify-content: flex-start;
      height: 24px;
      &:first-child {
        height: 34px;
      }
    }
}
.title {
  font-size: 18px;
  color: #333;
  padding-right: 24px;
}
.item-top-right {
  color: #999;
  font-size: 12px;
  width: 200px;
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
  .disable-text {
    padding: 0 4px;
    text-decoration: line-through;
  }
}
.item-top-left {
  color: #999;
  font-size: 12px;
  flex-grow: 1;
}

.area-font {
  font-size: 18px;
  font-weight: bold;
  color: #333;
}
.split {
  height: 1px;
  width: 100%;
  background: rgba(0,0,0, 0.1);
  margin: 12px 0;
}
.city-select {
  display: flex;
  align-items: center;
  .city-select-label {
    width: 94px;
    text-align: right;
  }
}
:deep(.el-select) {
  width: 200px;
}
</style>

