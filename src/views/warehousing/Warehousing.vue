<template>
  <div class="warehouse-wrap">
    <div class="search-wrap">
      <div class="city-select">
        <span class="city-select-label">城市：</span>
        <el-select v-model="currentcity" placeholder="请选择" clearable>
            <el-option v-for="(item, i) in ['天津市']" :key="i" :value="item"></el-option>
          </el-select>
      </div>
      <div class="split"></div>
      <SingleSelect
        title="位置"
        :list="positionData"
      ></SingleSelect>
      <SingleSelect
        title="类型"
        :list="wareHouseType"
      ></SingleSelect>
      <SingleSelect
        title="面积"
        :list="areatype"
        :customFun="true"
        customFunType="number"
      ></SingleSelect>
      <SingleSelect
        title="租金"
        :list="rentType"
        :customFun="true"
        customFunType="number"
      ></SingleSelect>
      <SingleSelect
        title="租赁方式"
        :list="leaseType"
      ></SingleSelect>
      <SingleSelect
        title="仓库特点"
        :list="wareHouseCharact"
      ></SingleSelect>
      <SingleSelect
        title="来源"
        :list="sourceType"
      ></SingleSelect>
      <div class="split"></div>
      <div class="city-select">
        <span class="city-select-label">已筛选条件：</span>
        <div class="choice-list">
          <w-tag v-for="item in choiceList" :key="item" closable color="winboxblue" size="small" >{{ item }}</w-tag >
        </div>
      </div>
    </div>
    <div class="content-wrap">
      <div class="card-item">
        <div class="item-img"></div>
        <div class="item-center">
          <div class="item-top">
            <div class="title">仓储出租</div>
            <div style="display: flex; gap: 8px">
              <el-tag round effect="light" type="primary">优选</el-tag>
              <el-tag round effect="light" type="success">可免风险扫描</el-tag>
              <el-tag round effect="light" type="info">价格面议</el-tag>
              <el-tag round effect="light" type="info">可以分隔</el-tag>
              <el-tag round effect="light" type="info">随时可看</el-tag>
            </div>
          </div>
          <div class="item-top">
            <div class="item-top-left">东丽区-新立街 | 天津市瑞和仓储有限公司 | 楼库</div>
            <div class="item-top-right area-font">
              2550m²
            </div>
            <div class="item-top-right">
              <span class="price-new">0.6</span>
              <span class="price-old">0.8</span>
              <span class="price-unit">元/m²/天</span>
            </div>
          </div>
          <div class="item-top">
            <div class="item-top-left">
              胡家河 | 天津市东丽区新立街新兴村中国纺织物资天津公司仓库
            </div>
            <div class="item-top-right">
              建筑面积
            </div>
            <div class="item-top-right">
              <span class="price-new">1.08</span>
              <span class="price-old">1.1</span>
              <span class="price-unit">万/月</span>
            </div>
          </div>
        </div>
        <div class="item-right">
          <el-button type="primary">联系TA</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { positionData, wareHouseType, areatype, rentType, leaseType, wareHouseCharact, sourceType } from './baseType'

const currentcity = ref('天津市')
const choiceList = ref(['天津市'])

</script>

<style lang="scss" scoped>
.warehouse-wrap {
  height: calc(100vh - 180px);
}
.content-wrap {
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

:deep(.warehousing) {
  padding: 24px 0;
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
