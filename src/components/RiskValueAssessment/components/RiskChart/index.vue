<template>
  <div class="riskChart" id="riskChart">
    <img src="@/assets/base/empty.png" class="empty-img">
  </div>
</template>
<script setup>
import * as echarts from "echarts";
import { onMounted, ref, reactive } from "vue";
// import option from "./option";

const props = defineProps({
  riskData: {
    default: 0
  },
  leval: { // 1高风险 2 中风险 3低风险
    default: -1
  }
})

const colorArr = reactive(['#F76161', '#FF9100', '#5ECF69']) // leval-1分别取颜色值 1高风险 2 中风险 3低风险

watch(
  () => props.riskData,
  (d) => {
    handleColor()
    option.value.series[0].data[0].value =  Math.floor(d);
    init();
  }
);

function handleColor() {
  switch (props.leval) {
    case 1:
      setColor('#F76161')
      break;
    case 2:
      setColor('#FF9100')
      break;
    case 3: 
      setColor('#5ECF69')
      break;
  }
}

function setColor(col) {
  option.value.series[0].progress.itemStyle.color = col;
  option.value.series[0].pointer.itemStyle.color = col;
  option.value.series[0].axisTick.lineStyle.color = col;
  option.value.series[0].axisLabel.color = col;
  option.value.series[0].detail.color = col;
}

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
.empty-img {
  width: 256px;
  display: block;
  margin-top: 40px;
}
</style>
