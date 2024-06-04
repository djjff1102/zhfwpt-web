<template>
<div class="card-item" @click ="handleDetail">
  <div class="item-img"></div>
  <div class="item-center">
    <div class="item-top">
      <div class="title">{{ data.name }}</div>
      <div style="display: flex; gap: 8px">
        <el-tag round effect="light" type="primary">优选</el-tag>
        <el-tag round effect="light" type="success">可免风险扫描</el-tag>
        <el-tag round effect="light" type="info" v-for="item in data.tab" :key="item">{{ item }}</el-tag>
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
        <el-icon><Avatar /></el-icon>
        胡家河 | <el-icon><Location /></el-icon> {{ data.location }}
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
  <div class="item-right" @click.stop="stopProp">
    <RelationCom :data="data"></RelationCom>
  </div>
</div>
</template>

<script setup>
import { useRouter, useRoute } from 'vue-router';
import RelationCom from './RelationCom.vue'

const router = useRouter()
const route = useRoute()

const props = defineProps({
  data: {}
})

// 跳转详情
function handleDetail() {
  router.push({
    path: props.data.path
  })
}

// 阻止冒泡
function stopProp() {}
</script>

<style lang="scss" scoped>
.card-item {
    padding: 24px 0;
    border-bottom: solid 1px rgba(0,0,0, 0.1);
    display: flex;
    justify-content: flex-start;
    align-items: center;
    cursor: pointer;
    .item-img {
      width: 140px;
      height: 82px;
      background-image: url('@/assets/warehouse/cangchu.png');
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
  display: flex;
  align-items: center;
  gap: 4px;
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

