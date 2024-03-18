<template>
  <div class="riskChart" id="riskChart"></div>
</template>
<script setup>
import * as echarts from "echarts";
import { onMounted, ref } from "vue";
// import option from "./option";

const props = defineProps({
  riskData: {
    default: 0
  }
})

watch(
  () => props.riskData,
  (d) => {
    option.value.series[0].data[0].value =  Math.floor(d);
    init();
  }
);

const option = ref({
  series: [
      {
        type: "gauge",
        // axisLine: {
        //   lineStyle: {
        //     width: 20,
        //     color: [
        //       [0.8, "#fd666d"],
        //       [1, "#eee"],
        //     ],
        //   },
        // },
        progress: {
          show: true,
          itemStyle: {
            color: "#fd666d",
          },
        },
        pointer: {
          itemStyle: {
            color: "#fd666d",
          },
        },
        axisTick: {
          distance: 10,
          length: 8,
          lineStyle: {
            color: "red",
            width: 2,
          },
        },
        splitLine: {
          show: false,
          distance: -20,
          length: 20,
          lineStyle: {
            color: "red",
            width: 4,
          },
        },
        axisLabel: {
          color: "#fd666d",
          distance: 50,
          fontSize: 16,
        },
        detail: {
          valueAnimation: true,
          fontSize: 30,
          formatter: "{value}",
          color: "#fd666d",
        },
        data: [
          {
            value: 0,
          },
        ],
      },
  ]
})

function init() {
  const riskDom = document.querySelector("#riskChart");
  const riskChart = echarts.init(riskDom, null, {
    width: "364",
    height: "364",
  });
  riskChart.setOption(option.value);
}

</script>
<style lang="scss">
</style>
