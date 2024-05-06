<template>
  <div class="order-detail-container">
    <div class="title">基本信息 
      <span v-if="fileUrl"> <fileDownLoad :fileUrl="fileUrl" :fileName="fileName"></fileDownLoad></span>
    </div>
    <BaseInfo :order="order"></BaseInfo>
    <div>
      <div class="title">产品详情</div>
      <chanpin :certificateCode="code"></chanpin>
    </div>
    <div>
      <div class="title">关联发票</div>
      <invoiceGL :certificateCode="code"></invoiceGL>
    </div>
    <div>
      <div class="title">关联流水</div>
      <liushui :certificateCode="code"></liushui>
    </div>
    </div>
</template>
<script setup>
import  { ref } from 'vue';
import BaseInfo from "./components/BaseInfo.vue"
import SecondWarehousing from "./components/SecondWarehousing.vue";
import { useRoute } from 'vue-router'
import { qyzxTransactionCertificate } from '@/api/archives'
import chanpin from './components/chanpin.vue'

const route = useRoute();

const order = ref({}) // 合同信息
const code = ref(); // 合同编号
const fileUrl = ref('') // 文件下载路径
const fileName = ref('') // 文件名

// 获取主订单列表及详情
function getqyzxTransactionCertificate() {
  qyzxTransactionCertificate({
    page_size: 10,
    page: 1,
    code: code.value
  }).then(res => {
    order.value = res.data[0] || {}
    fileName.value = order.value?.material?.fileName || ''
    fileUrl.value = order.value?.material?.fileUrl || ''
  }).catch(err => {
  })
}

function init() {
  code.value = route.query.parentCode;
  getqyzxTransactionCertificate()
}

init()
</script>
<style lang="scss" scoped>
.file-load {
  font-size: 14px;
  color: #1890ff;
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
.order-detail-container {
  height: 100%;
  overflow: auto;
  background-color: #fff;
  padding: 16px 90px;
}
:deep(.w-input-wrapper) {
  width: 188px;
  height: 32px;
}
:deep(.w-picker) {
  width: 240px;
  height: 32px;
}
:deep(.w-select-view) {
  width: 132px;
  height: 32px;
}
:deep(.w-form-item-label) {
  height: 32px;
  color: #000;
  font-weight: 500;
}
</style>
