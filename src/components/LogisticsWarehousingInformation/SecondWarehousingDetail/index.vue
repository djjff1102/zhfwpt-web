<template>
  <div class="second-warehousing-container">
    <div class="title">基本信息</div>
    <BaseInfo :info="info"></BaseInfo>
    <div class="title">关联订单</div>
    <RelationOrderInformation :list="info.asscoiationOrderList"></RelationOrderInformation>
  </div>
</template>
<script setup>
import BaseInfo from "../detail/components/BaseInfo.vue";
import RelationOrderInformation from "@/components/OrderInformation/relationOrder/index.vue";
import { getwarehouseList } from '@/api/archives'
import { ref } from 'vue'


const info = ref({})

function init() {
  // const data =  {
  //   company_name: route.query.companyName,
  //   shortName: route.query.shortName,
  //   locationAddress: route.query.locationAddress
  // }
  // TODO: 测试传参
  const data = {
    company_name :"天津东疆供应链服务有限公司",
    shortName: "cangchu01",
    locationAddress: "camgchuadd01",
  }
  getwarehouseList( data ).then(res => {
    info.value = res.data
  }).catch(err => {
    ElMessage.error(JSON.stringify(err))
  })
}
init()
</script>
<style lang="scss" scoped>
.second-warehousing-container {
  background-color: #fff;
  padding: 16px 90px;
}

.title {
  position: relative;
  margin: 16px 0;
  padding-left: 11px;
  font-family: PingFangSC, PingFang SC;
  font-weight: 500;
  font-size: 18px;
  color: #333333;
  line-height: 22px;
  &::before {
    content: "";
    position: absolute;
    left: 0px;
    top: 50%;
    transform: translateY(-50%);
    width: 3px;
    height: 18px;
    background-color: #1890ff;
  }
}
</style>
