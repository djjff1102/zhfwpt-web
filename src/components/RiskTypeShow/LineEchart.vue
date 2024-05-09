<template>
  <div>
    <div :id="chartId">
      <no-data></no-data>
    </div>
  </div>
</template>
<script setup>
import * as echarts from "echarts";
import { onMounted, watch, onUnmounted } from "vue";

const props = defineProps({
  echartData: {
    default: {
      left: [],
      right: [],
      yValue: [],
    },
  },
  chartId: {
    default: "tendencyChartLine",
  },
});

watch(
  () => props.echartData,
  (v) => {
    if (v) {
      barNum.value = v.left.length;
      echartData.value.series[0].name = "1";
      echartData.value.series[1].name = "2";
      echartData.value.series[0].data = v.left;
      echartData.value.series[1].data = v.right;
      echartData.value.yAxis[1].data = v.yValue;
      console.log("echartData--------------:", echartData.value);
      init();
    }
  },
  {
    deep: true,
  }
);

const barNum = ref(1); // 柱子的个数
const echartData = ref({
  tooltip: {
    show: false,
  },
  legend: {
    show: false,
  },
  grid: [
    // 左
    {
      top: "0%",
      bottom: "0%",
      left: "2%",
      width: "36%",
      height: "100%",
      // containLabel: true,
    },
    // 中
    {
      top: "0%",
      bottom: "0%",
      left: "50%",
      // left: "center",
      width: "12%",
      height: "100%",
    },
    // 右
    {
      top: "0%",
      bottom: "0%",
      right: "2%",
      width: "36%",
      height: "100%",
      // containLabel: true,
    },
  ],
  xAxis: [
    {
      type: "value",
      inverse: true,
      show: false,
    },
    {
      gridIndex: 1,
      show: false,
    },
    {
      gridIndex: 2,
      type: "value",
      show: false,
    },
  ],
  yAxis: [
    {
      axisLabel: {
        show: false,
      },
      align: "center",
      type: "category",
      axisTick: {
        //y轴刻度线
        show: false,
      },
      axisLine: {
        //轴线
        show: false,
        lineStyle: {
          color: "rgba(25, 35, 57,0.2)",
        },
      },
    },
    {
      axisLabel: {
        color: "#333",
        fontSize: "16",
        align: "center",
        formatter: function (value) {
          var ret = ""; // 拼接加\n返回的类目项
          var maxLength = 8; // 每项显示文字个数，自定义
          var valLength = value.length; // X轴类目项的文字个数
          var rowN = Math.ceil(valLength / maxLength); // 类目项需要换行的行数
          if (valLength > maxLength) {
            let ret = value.substring(0, maxLength) + "...";
            return ret;
          } else {
            return value;
          }
        },
      },
      nameTextStyle: {
        verticalAlign: "center",
      },
      gridIndex: 1,
      position: "center",
      axisLine: {
        show: false,
      },
      type: "category",
      inverse: false,
      axisTick: {
        //y轴刻度线
        show: false,
      },
      data: [1, 2, 2, 2],
    },
    {
      gridIndex: 2,
      position: "left",
      axisLabel: {
        show: false,
      },
      type: "category",
      inverse: false,
      axisTick: {
        //y轴刻度线
        show: false,
      },
      axisLine: {
        //轴线
        show: false,
        lineStyle: {
          color: "rgba(25, 35, 57,0.2)",
        },
      },
      data: [],
    },
  ],
  series: [
    {
      type: "bar",
      barWidth: 24,
      name: "",
      itemStyle: {
        color: "#3470FF",
      },
      data: [],
      label: {
        show: true,
        color: "#fff",
      },
    },
    {
      type: "bar",
      barWidth: 24,
      xAxisIndex: 2,
      yAxisIndex: 2,
      name: "",
      itemStyle: {
        color: "#FF9100",
      },
      data: [],
      label: {
        show: true,
        color: "#fff",
      },
    },
  ],
});

onMounted(() => {
  init();
});

function init() {
  const tendencyDom = document.getElementById(props.chartId);
  const tendencyChart = echarts.init(tendencyDom, null, {
    width: "800",
    height: 48, // 每根柱子宽24，间距24  计算画布的高
  });
  tendencyChart.setOption(echartData.value);
  handleResize();
  window.addEventListener("resize", handleResize);
}

function handleResize() {
  const chart = echarts.getInstanceByDom(
    document.getElementById(props.chartId)
  );
  if (chart) {
    chart.resize();
  }
}
onUnmounted(() => {
  window.removeEventListener("resize", handleResize);
});
</script>
<style lang="scss"></style>
