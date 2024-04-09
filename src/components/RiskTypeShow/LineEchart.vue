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
let manData = [100, 200, 300, 400, 500];
let womanData = [100, 200, 300, 400, 500];
const echartData = ref({
  tooltip: {
    show: false
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
      show: false
    },
    {
      gridIndex: 1,
      show: false,
    },
    {
      gridIndex: 2,
      type: "value",
      show: false
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
      // data: ["技术", "人才", "数据", "存储", "运输"],
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
            let ret = value.substring(0, maxLength) + '...'
            return ret;
          } else {
            return value;
          }
        }
      },
      nameTextStyle: {
        verticalAlign: 'center',
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
      data: [
        "技术技术技术技术技",
        "人才",
        "数据",
        "运输",
        "存储",
      ]
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
      data: ["16-20", "21-30", "31-40", "41-50", "51-60"],
    },
  ],
  series: [
    {
      type: "bar",
      barWidth: 24,
      name: "男",
      itemStyle: {
        color: "#3470FF",
      },
      data: manData,
      label: {
        show: true,
        color: '#fff'
      }
    },
    {
      type: "bar",
      barWidth: 24,
      xAxisIndex: 2,
      yAxisIndex: 2,
      name: "女",
      itemStyle: {
        color: "#FF9100",
      },
      data: womanData,
      label: {
        show: true,
        color: '#fff'
      }
    },
  ]
})

// watch(
//   () => props.dataList,
//   (v) => {
//     if(v && v.length > 0 ) {
//       echartData.value.series[0].data = v;
//       echartData.value.xAxis[0].data = props.time;
//       init()
//     }
//   }, {
//     deep: true,
//   }
// );

onMounted(() => {
  init();
})

function init() {
  const tendencyDom = document.getElementById(props.chartId);
  const tendencyChart = echarts.init(tendencyDom, null, {
    width: "1000",
    height: 48 * 5, // 每根柱子宽24，间距24  计算画布的高
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
