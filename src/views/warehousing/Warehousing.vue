<template>
  <div class="warehouse-wrap">
    <div v-if="type == 'Warehousing'" class="search-wrap">
      <div class="city-select">
        <span class="city-select-label">城市：</span>
        <el-select v-model="currentcity" placeholder="请选择" clearable>
            <el-option v-for="(item, i) in ['天津市']" :key="i" :value="item"></el-option>
          </el-select>
      </div>
      <!-- <div class="split"></div> -->
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
    <div v-if="type == 'Logistics'" class="search-wrap">
      <div class="city-select">
        <span class="city-select-label">公司名称：</span>
        <el-input placeholder="请输入" style="width: 200px;"></el-input>
      </div>
      <SingleSelect
        title="发货地"
        :list="cityType"
      ></SingleSelect>
      <SingleSelect
        title="服务类型"
        :list="serveType"
      ></SingleSelect>
      <SingleSelect
        title="运输方式"
        :list="transType"
      ></SingleSelect>
      <div class="city-select">
        <span class="city-select-label">已筛选条件：</span>
        <div class="choice-list">
          <w-tag v-for="item in choiceList" :key="item" closable color="winboxblue" size="small" >{{ item }}</w-tag >
        </div>
      </div>
      <div class="split"></div>
    </div>
    <div class="content-wrap">
      <ItemCom v-bind="$attrs"></ItemCom>
    </div>
  </div>
</template>

<script setup>
import { positionData, wareHouseType, areatype, rentType, leaseType, wareHouseCharact, sourceType, cityType,serveType, transType } from './baseType'
import ItemCom from './components/ItemCom.vue'

const currentcity = ref('天津市')
const choiceList = ref(['天津市'])

const props = defineProps({
  type: ''
})

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

.split {
  height: 1px;
  width: 100%;
  background: rgba(0,0,0, 0.1);
  margin: 12px 0;
}
.city-select {
  display: flex;
  align-items: center;
  padding-bottom: 12px;
  .city-select-label {
    width: 94px;
    text-align: right;
  }
}
:deep(.el-select) {
  width: 200px;
}
</style>
