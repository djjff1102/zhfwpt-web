<template>
  <div id="tendencyChart">
    <no-data></no-data>
  </div>
</template>
<script setup>
import * as echarts from "echarts";
import { onMounted, watch } from "vue";

const props = defineProps({
  time: {
    default: []
  },
  dataList: {
    default: []
  }
})

const echartData = ref({
    title: {
      text: "近12个月开票总额度",
      left: "left",
      textStyle: {
        fontSize: 14,
        color: "#999",
        fontWeight: 500,
        fontStyle: "normal",
      },
    },
    tooltip: {
      trigger: "axis",
      axisPointer: {
        animation: false,
      },
    },
    grid: [
      {
        left: 60,
        right: 50,
      },
    ],
    xAxis: [
      {
        type: "category",
        boundaryGap: false,
        data: [],
      },
    ],
    yAxis: [
      {
        name: "",
        type: "value",
      },
    ],
    series: [
      {
        name: "Evaporation",
        type: "line",
        symbolSize: 8,
        data: [12, 0, 23, 2, 45],
      },
    ],
  })

watch(
  () => props.dataList,
  (v) => {
    if(v && v.length > 0 ) {
      echartData.value.series[0].data = v;
      echartData.value.xAxis[0].data = props.time;
      init()
    }
  }, {
    deep: true,
  }
);

function init() {
  const tendencyDom = document.querySelector("#tendencyChart");
  const tendencyChart = echarts.init(tendencyDom, null, {
    width: "auto",
    height: "400",
  });
  tendencyChart.setOption(echartData.value);
}
// onMounted(() => {
//   init()
// })

</script>
<style lang="scss">
</style>
