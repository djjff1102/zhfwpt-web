<template>
  <div class="warehouse-wrap">
    <div v-if="type == 'Warehousing'" class="search-wrap">
      <div class="city-select">
        <span class="city-select-label">城市：</span>
        <!-- <el-select v-model="currentcity" placeholder="请选择" clearable>
            <el-option v-for="(item, i) in ['天津市']" :key="i" :value="item"></el-option>
          </el-select> -->


        <el-select v-model="currentcity" placeholder="Select" style="width: 240px">
          <el-option
            v-for="item in cities"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
            <span style="float: left">{{ item.label }}</span>
            <span
              style="
                float: right;
                color: var(--el-text-color-secondary);
                font-size: 13px;
              "
            >
             <div class="area-right">
              <span class="area-right-item" v-for="ch in item.child" type="primary" link :key="ch">{{ ch }}</span>
             </div>
            </span>
          </el-option>
        </el-select>
      </div>

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
const cities = ref(
  [
  {
    value: 'Beijing',
    label: '华北地区',
    child: [
      '北京',
      '天津',
      '大连',
      '石家庄',
      '哈尔滨',
      '沈阳',
      '太原',
      '长春',
      '威海',
      '呼和浩特',
      '烟台'
    ]
  },
  {
    value: 'Shanghai',
    label: '华东地区',
    child: [
      '上海',
      '杭州',
      '苏州',
      '南京',
      '无锡',
      '济南',
      '青岛',
      '昆山',
      '宁波',
      '南昌',
      '福州',
      '合肥',
      '徐州',
      '淄博'
    ]
  },
  {
    value: 'Nanjing',
    label: '华南地区',
    child: [
      '深圳',
      '广州',
      '佛山',
      '长沙',
      '三亚',
      '惠州',
      '东菀',
      '海口',
      '珠海',
      '中山',
    ]
  },
  {
    value: 'Chengdu',
    label: '中西部',
    child: [
      '成都',
      '重庆',
      '武汉',
      '郑州'
    ]
  }
]
)

const props = defineProps({
  type: ''
})

</script>

<style lang="scss" scoped>
.area-right-item {
  display: inline-block;
  width: 60px;
}
li{
  height: auto !important;
}
.area-right {
  max-width: 270px;
  height: AUTO;
  padding: 0px 12px;
  display: flex;
  flex-wrap: wrap;
}
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
  font-size: 14px;
  width: 200px;
  .price-new {
    font-size: 20px;
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
  font-size: 20px;
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
