<template>
  <div>风险企业列表</div>
</template>

<script setup>
import { fxjkIndexFxzph } from '@/api/riskmonitor'

function init() {
  fxjkIndexFxzph({}).then(res => {
    
  }).catch(err => {
    console.log('获取风险企业列表异常：', err)
  })
}

init()
</script>
