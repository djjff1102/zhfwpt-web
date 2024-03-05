<template>
  <div id="tendencyChart"></div>
</template>
<script setup>
import * as echarts from "echarts";
import { onMounted } from "vue";
import option from "./option";

onMounted(() => {
  const tendencyDom = document.querySelector("#tendencyChart");
  const tendencyChart = echarts.init(tendencyDom, null, {
    width: "auto",
    height: "400",
  });

  tendencyChart.setOption(option());
});
</script>
<style lang="scss">
</style>
