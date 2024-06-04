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
    </div>
    <div class="content-wrap">
      <ItemCom v-for="(item, i) in data" :key="i" :data="item"></ItemCom>
    </div>
  </div>
</template>

<script setup>
import { serveType, transType } from './baseType'
import ItemCom from './components/ItemCom.vue'

const currentcity = ref('天津市')
const choiceList = ref(['天津市'])

const props = defineProps({
  type: '',
  data: []
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
