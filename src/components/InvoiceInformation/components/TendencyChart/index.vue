<template>
  <div :id="chartId">
    <no-data></no-data>
  </div>
</template>
<script setup>
import * as echarts from "echarts";
import { onMounted, watch, onUnmounted } from "vue";

const props = defineProps({
  time: {
    default: []
  },
  dataList: {
    default: []
  },
  chartId: {
    default: 'tendencyChart'
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
        animation: true,
      },
    },
    grid: [
      {
        left: 120,
        right: 20,
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
    series: [],
  })

watch(
  () => props.dataList,
  (v) => {
    nextTick(() => {
      echartData.value.series = v.series;
      echartData.value.xAxis[0].data = props.time;
      init()
    })
  }, {
    deep: true,
  }
);
const TChert = ref()
function init() {
  const tendencyDom = document.getElementById(props.chartId);
  const tendencyChart = echarts.init(tendencyDom, null, {
    width: "auto",
    height: "400",
  });
  TChert.value = tendencyChart
  tendencyChart.setOption(echartData.value);
  window.addEventListener('resize', handleResize);
}

function handleResize() {
  const chart = echarts.getInstanceByDom(document.getElementById(props.chartId));
  if (chart) {
    chart.resize();
  }
}

// onMounted(() => {
//   init()
// })

onUnmounted(() => {
  window.removeEventListener('resize', handleResize);
})

</script>
<style lang="scss">
</style>
