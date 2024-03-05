<template>
  <div class="riskChart" id="riskChart"></div>
</template>
<script setup>
import * as echarts from "echarts";
import { onMounted } from "vue";
import option from "./option";

onMounted(() => {
  const riskDom = document.querySelector("#riskChart");
  const riskChart = echarts.init(riskDom, null, {
    width: "364",
    height: "364",
  });

  riskChart.setOption(option());
});
</script>
<style lang="scss">
</style>
