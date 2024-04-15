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
        data: props.time,
      },
    ],
    yAxis: [
      {
        name: "",
        type: "value",
      },
    ],
    series: [
      // {
      //   name: "",
      //   type: "line",
      //   symbolSize: 8,
      //   data: [],
      // },
      // {
      //   name: "",
      //   type: "line",
      //   symbolSize: 8,
      //   data: [],
      // },
    ],
  })

watch(
  () => props.dataList,
  (v) => {
    nextTick(() => {
      echartData.value.series = props.dataList.series;
      echartData.value.xAxis[0].data = props.time;
      init()
    })
  }, {
    deep: true,
  }
);

function init() {
  const tendencyDom = document.getElementById(props.chartId);
  const tendencyChart = echarts.init(tendencyDom, null, {
    width: "auto",
    height: "400",
  });
  tendencyChart.setOption(echartData.value);
  window.addEventListener('resize', handleResize);
}

function handleResize() {
  const chart = echarts.getInstanceByDom(document.getElementById(props.chartId));
  if (chart) {
    chart.resize();
  }
}
onUnmounted(() => {
  window.removeEventListener('resize', handleResize);
})

</script>
<style lang="scss">
</style>
