<template>
  <!-- 订单基本信息 -->
  <el-descriptions class="margin-top" :column="2" border>
    <el-descriptions-item label="订单编号">
      {{ order?.code || '--' }}
    </el-descriptions-item>
    <el-descriptions-item label="订单创建日期">{{ order?.orderCreateDate || '--' }}</el-descriptions-item>
    
    <el-descriptions-item label="买方信息" :span="4"></el-descriptions-item>
    <el-descriptions-item label="买方名称">
      {{ order?.buyerCompanyName || '--' }}
    </el-descriptions-item>
    <el-descriptions-item label="交易商编号">
      {{ order?.buyerTransactNo || '--' }}
    </el-descriptions-item>
    <el-descriptions-item label="营业执照号">
      {{  order?.buyerCreditNo || '--' }}
    </el-descriptions-item>
    <el-descriptions-item label="注册地省">
      {{ order?.buyerRegisterProvince || '--' }}
    </el-descriptions-item>
    <el-descriptions-item label="注册地市">
      {{  order?.buyerRegisterCity ||'--' }}
    </el-descriptions-item>
    <el-descriptions-item label="注册地址">
      {{  order?.buyerRegisterAddress || '--' }}
    </el-descriptions-item>
    <el-descriptions-item label="操作人">
      {{  order?.buyerUserName || '--' }}
    </el-descriptions-item>
    <el-descriptions-item label="订单确认时间">
      {{ order?.buyerOrderConfirmDate || '--' }}
    </el-descriptions-item>


    <el-descriptions-item label="卖方信息"  :span="4">
      {{  '--' }}
    </el-descriptions-item>
        <el-descriptions-item label="买方名称">
      {{ order?.buyerCompanyName || '--' }}
    </el-descriptions-item>
    <el-descriptions-item label="交易商编号">
      {{ order?.sellerTransactNo ||'--' }}
    </el-descriptions-item>
    <el-descriptions-item label="营业执照号">
      {{ order?.sellerCreditNo || '--' }}
    </el-descriptions-item>
    <el-descriptions-item label="注册地省">
      {{ order?.sellerRegisterProvince || '--' }}
    </el-descriptions-item>
    <el-descriptions-item label="注册地市">
      {{  order?.sellerRegisterCity || '--' }}
    </el-descriptions-item>
    <el-descriptions-item label="注册地址">
      {{  order?.sellerRegisterAddress || '' }}
    </el-descriptions-item>
    <el-descriptions-item label="操作人">
      {{ order?.sellerUserName || '--' }}
    </el-descriptions-item>
    <el-descriptions-item label="订单确认时间">
      {{ order?.sellerOrderConfirmDate || '--'  }}
    </el-descriptions-item>
  </el-descriptions>
</template>
<script setup>
import { formatNumber } from '@/utils/common'
const props = defineProps({
  order: {
    default: {}
  }
})
</script>
<style lang="">
</style>
