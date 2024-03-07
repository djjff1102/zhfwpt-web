<template>
  <div>
    <div id="RiskValueAssessment">
      <div class="title base-title">风险值评估</div>
      <RiskValueAssessment></RiskValueAssessment>
      <div class="title base-title">风险分类项展示</div>
      <RiskPoint></RiskPoint>
      <div class="title base-title">企业进销项发票趋势</div>
      <div class="tendencyChart w-full h-400px">
        <TendencyChart></TendencyChart>
      </div>
      <div class="title base-title">历史审批</div>
      <historyList></historyList>
    </div>
  </div>
</template>

<script setup>
import RiskValueAssessment from "@/components/RiskValueAssessment/index.vue";
import historyList from './historyList.vue'
</script>